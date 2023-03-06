import * as React from "react";

import { tsXLXS } from "ts-xlsx-export";
import { loadPageContext } from "sp-rest-proxy/dist/utils/env";
import Util from "src/genericos/Util";
import ColumnaTablaResultados from "src/models/Base/ColumnaTablaResultados";
import BaseEntidad from "src/models/Base/BaseEntidad";
import Funciones from "src/genericos/Funciones";
import { UtilCamlQuery } from "src/genericos/UtilCamlQuery";
import PaginaDirectiva from "../../paginas/mis_pendientes/ClientesNoAcceden/PaginaDirectiva";
import EMaestro from "../../../models/fisicas/EMaestro";
import ECampoExportar from "../../../models/logicas/ECampoExportar";
import EElementoPeoplePicker from "../../../models/logicas/EElementoPeoplePicker";
import { RouteComponentProps } from "react-router";

export interface IStatusPagina<T> {
  MostrarProgreso: boolean;
  NombreLista: string;
  CantidadElementoPorPagina: number;
  TipoEntidad: new () => T;
  CamlQuery: {
    PagingInfo?: SP.ListItemCollectionPosition;
    SubQuery: string;
    Fields: string[];
    OrderBy: string;
  };
  Datos: {
    ListaResultados: T[];
    ListaElementosSeleccionados?: T[];
    Maestros: EMaestro;
  };
  variables: {
    Archivos: {
      cantidadCarga: number;
      extensiones: string;
    };
  };
  ListaColumnasTablaResultados: ColumnaTablaResultados[];
  RedireccionarPaginaA?: string;

  MostrarModalExportar: boolean;
  MostrarModalReasignar?: boolean;
  ListaCampos: ECampoExportar[];

  EsMostrarPopupNuevoExpediente: boolean;
  EsMostrarPopupInformacionUsuario: boolean;
  UsuarioSeleccionadoInformacionUsuario: EElementoPeoplePicker | null;
}

export interface IPaginaBandeja {
  ObtenerColumnasViewFields: () => string[];
  ObtenerColumnasTablaResultados: () => ColumnaTablaResultados[];
}

class PaginaBandeja<T extends BaseEntidad>
  extends PaginaDirectiva<RouteComponentProps, IStatusPagina<T>>
  implements IPaginaBandeja {
  public ObtenerColumnasViewFields: () => string[];
  public ObtenerColumnasTablaResultados: () => ColumnaTablaResultados[];

  constructor(props: RouteComponentProps<{}>, estado: IStatusPagina<T>) {
    super(props);
  }

  public ObtenerQueryBusqueda(subQuery: string, orderBy?: string): string {
    if (!orderBy) {
      orderBy = this.obtenerQueryOrden();
    }
    const viewFields = this.obtenerViewFields();

    this.state.CamlQuery.OrderBy = orderBy;
    this.state.CamlQuery.SubQuery = subQuery;

    const query = UtilCamlQuery.obtenerEstructuraQueryConPaginacion(
      subQuery,
      viewFields,
      orderBy,
      this.state.CantidadElementoPorPagina
    );
    return query;
  }

  public OrdenarPorColumna(cabecera: ColumnaTablaResultados): void {
    if (cabecera.TipoOrdenamiento === 0) {
      cabecera.TipoOrdenamiento = 1;
    } else if (cabecera.TipoOrdenamiento === 1) {
      cabecera.TipoOrdenamiento = -1;
    } else {
      cabecera.TipoOrdenamiento = 0;
    }

    this.setState(this.state);
  }

  public ObtenerClaseTipoOrdenamiento(opcion: ColumnaTablaResultados): string {
    if (opcion.TipoOrdenamiento === 1) {
      return "fa-sort-asc";
    } else if (opcion.TipoOrdenamiento === -1) {
      return "fa-sort-desc";
    }
    return "";
  }

  public obtenerQueryOrden = (): string => {
    let valor = UtilCamlQuery.EstructurasQuery.OrderByAbrir;

    this.state.ListaColumnasTablaResultados.filter(cabecera => {
      return cabecera.TipoOrdenamiento !== 0;
    }).forEach(elemento => {
      const esAscendente = elemento.TipoOrdenamiento === 1;
      valor += UtilCamlQuery.getFieldRefOrderBy(
        elemento.NombreInternoColumna,
        esAscendente
      );
    });

    valor += UtilCamlQuery.EstructurasQuery.OrderByCerrar;

    return valor;
  };

  public obtenerViewFields = (): string => {
    const viewFields = this.state.CamlQuery.Fields.map(field => {
      return UtilCamlQuery.getFieldRef(field);
    }).join("");

    return viewFields;
  };

  public EsVisibleBotonVerMas(): boolean {
    if (!Util.esNullOUndefined(this.state.CamlQuery.PagingInfo)) {
      return true;
    }
    return false;
  }

  public InicializarValoresCamlQuery() {
    this.state.Datos.ListaResultados = [];
    this.state.CamlQuery.SubQuery = "";
    this.state.CamlQuery.PagingInfo = undefined;
  }

  public EventoBuscar = (
    subQuery: string,
    orderBy?: string | null,
    esNuevaBusqueda?: boolean
  ) => {
    if (esNuevaBusqueda) {
      this.InicializarValoresCamlQuery();
    } else {
      subQuery = this.state.CamlQuery.SubQuery;
    }

    const viewQuery = this.ObtenerQueryBusqueda(subQuery);
    this.Buscar(viewQuery);
  };

  public EventoLimpiar = (subQuery: string, orderBy: string) => {
    this.InicializarValoresCamlQuery();

    const queryPorDefecto = subQuery;
    this.EventoBuscar(queryPorDefecto, orderBy, true);
  };

  public ExportarExcel(nombreArchivoReporte: string, datosReporte: any[]) {
    tsXLXS()
      .exportAsExcelFile(datosReporte)
      .saveAsExcelFile(nombreArchivoReporte);
  }

  public Buscar(
    viewQuery: string,
    funcionSetearValores?: (
      elementoItemLista: SP.ListItem,
      objeto: BaseEntidad
    ) => void
  ) {
    this.MostrarProgreso();

    loadPageContext()
      .then(async _ => {
        Funciones.obtenerElementosListaConPaginasJSOM(
          this.state.NombreLista,
          viewQuery,
          this.state.CamlQuery.PagingInfo
        )
          .then(resultado => {
            this.state.CamlQuery.PagingInfo = resultado.posicion;

            while (resultado.iterador.moveNext()) {
              const item: SP.ListItem = resultado.iterador.get_current();
              const objeto = new this.state.TipoEntidad();

              if (funcionSetearValores) {
                funcionSetearValores(item, objeto);
              } else {
                objeto.setearValores(item);
              }

              this.state.Datos.ListaResultados.push(objeto);
            }

            this.OcultarProgreso();
            this.setState(this.state);
          })
          .catch(error => {
            this.MostrarMensajeError("pagina bandeja - buscar", error);
          });
      })
      .catch(error => {
        this.MostrarMensajeError(
          "pagina bandeja - buscar loadPageContext",
          error
        );
      });
  }

  public render() {
    return <div>{super.render()}</div>;
  }
}

export default PaginaBandeja;
