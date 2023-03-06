import * as React from "react";
import { loadPageContext } from "sp-rest-proxy/dist/utils/env";
import Util from "src/genericos/Util";
import ColumnaTablaResultados from "src/models/Base/ColumnaTablaResultados";
import BaseEntidad from "src/models/Base/BaseEntidad";
import Funciones from "src/genericos/Funciones";
import { UtilCamlQuery } from "src/genericos/UtilCamlQuery";
import PaginaDirectiva from "./PaginaDirectiva";
import EMaestro from "../../../../models/fisicas/EMaestro";
// import EProyecto from 'src/models/fisicas/EProyecto';
// import EPlanAccion from 'src/models/fisicas/EPlanAccion';
// import EReprogramaciones from 'src/models/fisicas/EReprogramaciones';
import ECargaExcel from 'src/models/fisicas/ECargaExcel';
// import ETareaPlanAccion from "src/models/fisicas/ETareaPlanAccion";

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
    ListaResultados: ECargaExcel[];
    Maestros: EMaestro;
  };
  ListaColumnasTablaResultados: ColumnaTablaResultados[];
  RedireccionarPaginaA?: string;
  Modal: {
    mostrar: boolean;
    cerrar: boolean;
  };
  redireccion: {
    DetalleProyectoPagina: boolean;
    redireccionarID: string;
    NuevoProyecto: boolean;
  };
  EsMostrarPopupNuevoProyecto: boolean;
}

export interface IPaginaBandeja {
  ObtenerColumnasViewFields: () => string[];
  ObtenerColumnasTablaResultados: () => ColumnaTablaResultados[];
}

class PaginaBandeja<T extends BaseEntidad>
  extends PaginaDirectiva<{}, IStatusPagina<T>>
  implements IPaginaBandeja {
  // public ParametrosNoAdministrables: ParametrosNoAdministrables = new ParametrosNoAdministrables();

  public ObtenerColumnasViewFields: () => string[];
  public ObtenerColumnasTablaResultados: () => ColumnaTablaResultados[];

  constructor(props: {}, estado: IStatusPagina<T>) {
    super(props);
  }

  public ObtenerQueryBusqueda(subQuery: string): string {
    const orderBy = this.obtenerQueryOrden();
    const viewFields = this.obtenerViewFields();

    this.state.CamlQuery.OrderBy = orderBy;
    this.state.CamlQuery.SubQuery = subQuery;

    const query = UtilCamlQuery.obtenerEstructuraQuerySimple(
      subQuery,
      viewFields,
      orderBy
      // this.state.CantidadElementoPorPagina
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
      valor += UtilCamlQuery.getFieldRefOrderBy("ID", esAscendente);
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
    orderBy: string | null,
    esNuevaBusqueda: boolean,
    datosUsuario: any,
  ) => {
    if (esNuevaBusqueda) {
      this.InicializarValoresCamlQuery();
    } else {
      subQuery = this.state.CamlQuery.SubQuery;
    }

    const viewQuery = this.ObtenerQueryBusqueda(subQuery);
    this.Buscar(viewQuery, datosUsuario);
  };



  public EventoLimpiar = (subQuery: string, datosUsuario: any) => {
    this.InicializarValoresCamlQuery();

    const queryPorDefecto = subQuery;
    this.EventoBuscar(queryPorDefecto, null, true, datosUsuario);
  };


  public Buscar(
    viewQuery: string,
    datosUsuario: any,
    funcionSetearValores?: (
      elementoItemLista: SP.ListItem,
      objeto: BaseEntidad,
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
            // const resultadoProyecto: ESolicitud[] = [];
            while (resultado.iterador.moveNext()) {
              const item: SP.ListItem = resultado.iterador.get_current();
              const objeto = new ECargaExcel();

              if (funcionSetearValores) {
                funcionSetearValores(item, objeto);
              } else {
                objeto.setearValores(item);
              }
              this.state.Datos.ListaResultados.push(objeto);
            }
            this.setState(this.state);
            // this.FiltrarBusqueda(resultadoProyecto);
            this.OcultarProgreso();
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

  // public FiltrarBusqueda(proyecto: ESolicitud[]) {
  //   proyecto.forEach(proyect => {
  //     if (this.estado.datosUsuario.esGrupo1 || this.estado.datosUsuario.esGrupo3) {
  //       this.state.Datos.ListaResultados.push(proyect);
  //     } else if (this.estado.datosUsuario.esGrupo2) {
  //       const promesasprocesar: Array<Promise<ESolicitud[]>> = [];
  //       const ePAValidacion = new ESolicitud();

  //       promesasprocesar.push(ePAValidacion.ObtenerPlanAccionBandeja(proyect.ID))

  //       Promise.all(promesasprocesar)
  //         .then(([resultadoProceso]) => {

  //           if (resultadoProceso.length > 0) {
  //             resultadoProceso.forEach(element => {
  //               element.UsuarioResponsable.forEach(usu => {
  //                 if (usu.ID === this.estado.datosUsuario.usuario.ID) {
  //                   this.state.Datos.ListaResultados.push(proyect);
  //                   this.setState(this.state);
  //                 }
  //               });
  //             });
  //           }
  //         })

  //     }
  //   });


  //   this.OcultarProgreso();
  // }

  public render() {
    return <div>{super.render()}</div>;
  }
}

export default PaginaBandeja;
