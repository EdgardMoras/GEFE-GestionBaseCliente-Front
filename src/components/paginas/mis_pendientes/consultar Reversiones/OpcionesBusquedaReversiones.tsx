import * as React from "react";
import { IStatusPagina } from "src/components/paginas/mis_pendientes/ClientesNoAcceden/PaginaProyecto";
import FiltroBusqueda, { TipoFiltro } from "src/models/Base/FiltroBusqueda";
import EIncidente from "../../../../models/fisicas/EIncidente";
import Usuario from "src/models/Base/Usuario";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { ComponenteAT } from "src/components/ui/formcontrol/ComponenteAT";
import { UtilCamlQuery } from "../../../../genericos/UtilCamlQuery";
import EMaestro from "../../../../models/fisicas/EMaestro";
import EElementoCombo from "../../../../models/logicas/EElementoCombo";
// import ControlSelect from "../../../ui/formcontrol/ControlSelect";
// import ExportarIncidente from "src/components/paginas/modulo_incidencias/consultar incidencias/Modal";
import { ContenedorBusquedaAvanzada } from "../../../ui/formcontrol/ContenedorBusquedaAvanzada";
import { ContenedorFiltrosBusquedaAvanzada } from "../../../ui/formcontrol/ContenedorFiltrosBusquedaAvanzada";
import { ContenedorControlFormatoA } from "../../../ui/formcontrol/ContenedorControlFormatoA";
// import EArea from 'src/models/fisicas/EArea';
// import Funciones from "src/genericos/Funciones";
import ESolicitud from 'src/models/fisicas/ESolicitud';
import EReprogramaciones from 'src/models/fisicas/EReversiones';

export interface IPropsOpcionesBusqueda {
  EventoBuscar: (
    subQuery: string,
    orderBy: string | null,
    esNuevaBusqueda: boolean,
    datosUsuario: any,
  ) => void;
  EventoLimpiar: (subQuery: string, datosUsuario: any,) => void;
  datosUsuario: {
    usuario: Usuario;
    esGrupo1: boolean;
    esGrupo2: boolean;
    esGrupo3: boolean;
    esGrupo4: boolean;
    esGrupo5: boolean;
    esGrupo6: boolean;
    listaUsuarioGrupo3: Usuario[];
  };
  datosMaestros: EMaestro;

}

export interface IStatesOpcionesBusqueda {
  ItemsListas: {
    ListaEstados: EElementoCombo[];
    ListaAlcance: EElementoCombo[];
    ListaArea: EElementoCombo[];
  };
  Filtros: {
    FechaRegistroInicio: string;
    FechaRegistroFin: string;
    IDsFiltro: number[];
    CodigoSolicitud: string;
    DNI: string;
    Cliente: string;
    CodigoCredito: string;

  };
}

class OpcionesBusquedaIncidencias extends ComponenteAT<
  IPropsOpcionesBusqueda,
  IStatesOpcionesBusqueda
  > {
  // private childCmbEntidad: React.RefObject<ControlSelect>;
  // private esMostrarPopupuExportarIncidente: boolean = false;

  private childTxtDni: React.RefObject<HTMLInputElement>;
  private childTxtNombre: React.RefObject<HTMLInputElement>;
  private childTxtDireccion: React.RefObject<HTMLInputElement>;

  //  private childTxtDescripcion: React.RefObject<HTMLInputElement>;
  // private childTxtPalabrasclaves: React.RefObject<HTMLInputElement>;

  constructor(
    props: IPropsOpcionesBusqueda,
    estado: IStatusPagina<EIncidente>
  ) {
    super(props, estado);

    // this.childCmbEntidad = React.createRef();

    // this.childCmbAlcance = React.createRef();

    this.state = {
      ItemsListas: {
        ListaEstados: [],
        ListaAlcance: [],
        ListaArea: []
      },
      Filtros: {

        FechaRegistroInicio: "",
        FechaRegistroFin: "",
        CodigoSolicitud: "",
        DNI: "",
        Cliente: "",
        CodigoCredito: "",
        IDsFiltro: [],


      }
    };

    /*  this.handleInputText = this.handleInputText.bind(this);
      this.handleSelectEstado = this.handleSelectEstado.bind(this);
      this.handleSelectAlcance = this.handleSelectAlcance.bind(this);
      this.handleSelectEntidad = this.handleSelectEntidad.bind(this);*/
  }

  public componentDidMount() {
    this.inicializarControles(this.props.datosMaestros);
  }

  public componentWillReceiveProps(nuevoProps: any) {
    if (
      JSON.stringify(this.props.datosMaestros) !==
      JSON.stringify(nuevoProps.datosMaestros)
    ) {
      this.inicializarControles(nuevoProps.datosMaestros);
    }
  }


  public inicializarControles(datosMaestros: EMaestro): void {
    if (datosMaestros === undefined) {
      return;
    }






    const itemsListaEstados = ParametrosNoAdministrables.ListaValores.EstadosSolicitudes.map(
      (elemento, indice) => {
        return new EElementoCombo(indice + 1, elemento);
      }
    );



    this.setState({
      ItemsListas: {
        ...this.state.ItemsListas,
        ListaEstados: itemsListaEstados
      },
      Filtros: {
        ...this.state.Filtros,
        CodigoSolicitud: "",
        CodigoCredito: "",
        DNI: "",
        Cliente: "",
        FechaRegistroInicio: "",
        FechaRegistroFin: "",
      }
    });




  }

  public handleInputText = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, name }: any = e.target;

    if (name === "txtCodSolicitud") {
      // this.state.Filtros.Codigo = value;
      this.setState({ Filtros: { ...this.state.Filtros, CodigoSolicitud: value } }, () => {
        const test: string = value;
        if (test.length > 10) {
          this.handleBuscar();
        }
      });


    } else if (name === "txtDni") {
      // this.state.Filtros.Descripcion = value;
      this.setState({ Filtros: { ...this.state.Filtros, DNI: value } });

    } else if (name === "txtCliente") {
      // this.state.Filtros.Descripcion = value;
      this.setState({ Filtros: { ...this.state.Filtros, Cliente: value } });
    } else if (name === "txtCodCredito") {
      // this.state.Filtros.Descripcion = value;
      this.setState({ Filtros: { ...this.state.Filtros, CodigoCredito: value } });
    } else if (name === "txtFechaRegistroInicio") {
      //  this.state.Filtros.FechaRegistroInicio = value;
      this.setState({
        Filtros: { ...this.state.Filtros, FechaRegistroInicio: value }
      });
    } else if (name === "txtFechaRegistroFin") {
      //  this.state.Filtros.FechaRegistroFin = value;
      this.setState({
        Filtros: { ...this.state.Filtros, FechaRegistroFin: value }
      });
    }
    // this.setState(this.state);
  };



  public obtenerFiltrosBusqueda(): FiltroBusqueda[] {
    const filtros: FiltroBusqueda[] = [];

    if (this.state.Filtros.IDsFiltro.length > 0) {
      filtros.push(
        new FiltroBusqueda(
          TipoFiltro.ContieneIdLookupMultiple,
          EIncidente.Campos.ID,
          null,
          this.state.Filtros.IDsFiltro
        )
      );
    }

    if (this.state.Filtros.CodigoSolicitud.length > 0) {
      filtros.push(
        new FiltroBusqueda(
          TipoFiltro.Contiene,
          EReprogramaciones.Campos.Title,
          this.state.Filtros.CodigoSolicitud
        )
      );
    }

    if (this.state.Filtros.DNI.length > 0) {
      filtros.push(
        new FiltroBusqueda(
          TipoFiltro.Contiene,
          EReprogramaciones.Campos.DNI,
          this.state.Filtros.DNI
        )
      );
    }

    if (this.state.Filtros.Cliente.length > 0) {
      filtros.push(
        new FiltroBusqueda(
          TipoFiltro.Contiene,
          EReprogramaciones.Campos.Cliente,
          this.state.Filtros.Cliente
        )
      );
    }
    if (this.state.Filtros.CodigoCredito.length > 0) {
      filtros.push(
        new FiltroBusqueda(
          TipoFiltro.Contiene,
          EReprogramaciones.Campos.CodCredito,
          this.state.Filtros.CodigoCredito
        )
      );
    }


    if (this.state.Filtros.FechaRegistroInicio.length > 0) {
      filtros.push(
        new FiltroBusqueda(
          TipoFiltro.esMayorIgualAFecha,
          ESolicitud.Campos.Created,
          this.state.Filtros.FechaRegistroInicio
        )
      );
    }
    if (this.state.Filtros.FechaRegistroFin.length > 0) {
      filtros.push(
        new FiltroBusqueda(
          TipoFiltro.esMenorIgualAFecha,
          ESolicitud.Campos.Created,
          this.state.Filtros.FechaRegistroFin
        )
      );
    }






    return filtros;
  }

  public obtenerQueryBusqueda(): string {
    let subquery: string = "";
    let subqueryFin: string = "";



    const filtrosQuery = this.obtenerFiltrosBusqueda();
    // const filtrosQuerySelect = this.obtenerFiltrosBusquedaSelect();
    const cantidad: number = filtrosQuery.length;

    filtrosQuery.forEach((filtro, i) => {
      if (cantidad > 1 && i !== cantidad - 1) {
        subquery += UtilCamlQuery.EstructurasQuery.AndAbrir;
      }

      subquery += filtro.getFiltro();

      if (cantidad > 1 && i !== cantidad - 1) {
        subqueryFin += UtilCamlQuery.EstructurasQuery.AndCerrar;
      }
    });

    const query = subquery + subqueryFin;
    // const queryFinal = this.obtenerQueryBusquedaGrupos(query, cantidad);

    return query;
  }

  public obtenerQueryBusquedaGrupos(query: string, cantidad: number) {
    let queryFinal: string = "";

    if (this.props.datosUsuario.esGrupo1) {
      queryFinal = query;
    } else if (this.props.datosUsuario.esGrupo2) {
      if (cantidad > 0) {
        queryFinal += UtilCamlQuery.EstructurasQuery.AndAbrir;
      }

      const filtroUsuario = new FiltroBusqueda(
        TipoFiltro.EsIgualIdUsuario,
        EIncidente.CamposExpand.UsuarioRegistro,
        this.props.datosUsuario.usuario.ID
      );

      queryFinal += filtroUsuario.getFiltro();
      queryFinal += query;

      if (cantidad > 0) {
        queryFinal += UtilCamlQuery.EstructurasQuery.AndCerrar;
      }
    } else if (
      this.props.datosUsuario.esGrupo3 &&
      this.props.datosUsuario.listaUsuarioGrupo3.length > 0
    ) {
      if (cantidad > 0) {
        queryFinal += UtilCamlQuery.EstructurasQuery.AndAbrir;
      }

      const listaUsuarioGrupo3 = this.props.datosUsuario.listaUsuarioGrupo3;
      const queryUsuarioGrupo3 = this.obtenerQueryUsuarioGrupo(
        listaUsuarioGrupo3
      );

      queryFinal += queryUsuarioGrupo3;
      queryFinal += query;

      if (cantidad > 0) {
        queryFinal += UtilCamlQuery.EstructurasQuery.AndCerrar;
      }
    }

    return queryFinal;
  }

  public obtenerQueryUsuarioGrupo(listaUsuarioGrupo: Usuario[]) {
    const cantidad = listaUsuarioGrupo.length;
    let subquery: string = "";
    let subqueryFin: string = "";

    listaUsuarioGrupo.forEach((usuario, i) => {
      if (cantidad > 1 && i !== cantidad - 1) {
        subquery += UtilCamlQuery.EstructurasQuery.OrAbrir;
      }

      const filtroUsuario = new FiltroBusqueda(
        TipoFiltro.EsIgualIdUsuario,
        EIncidente.CamposExpand.UsuarioRegistro,
        usuario.ID
      );

      subquery += filtroUsuario.getFiltro();

      if (cantidad > 1 && i !== cantidad - 1) {
        subqueryFin += UtilCamlQuery.EstructurasQuery.OrCerrar;
      }
    });

    const query = subquery + subqueryFin;

    return query;
  }

  public handleBuscar = (e?: React.FormEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }

    const queryWhere = this.obtenerQueryBusqueda();
    this.props.EventoBuscar(queryWhere, null, true, this.props.datosUsuario);
  };

  public handleLimpiar = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    this.inicializarControles(this.props.datosMaestros);

    this.state.Filtros.DNI = "";
    this.state.Filtros.Cliente = "";
    this.state.Filtros.CodigoCredito = "";
    this.state.Filtros.CodigoSolicitud = "";
    this.state.Filtros.FechaRegistroFin = "";
    this.state.Filtros.FechaRegistroInicio = "";
    this.setState(this.state);
    const queryWhere = this.obtenerQueryBusqueda();
    this.props.EventoLimpiar(queryWhere, this.props.datosUsuario);
  };

  public render() {
    return (
      <ContenedorBusquedaAvanzada>
        <ContenedorControlFormatoA etiqueta="Codigo de Solicitud:">
          <input
            type="text"
            className="form-control"
            placeholder={"Ingrese un codigo de solicitud"}
            name={"txtCodSolicitud"}
            value={this.state.Filtros.CodigoSolicitud}
            onChange={this.handleInputText}
            ref={this.childTxtDni}
          />
        </ContenedorControlFormatoA>

        <ContenedorFiltrosBusquedaAvanzada>
          <ContenedorControlFormatoA etiqueta="Dni:">
            <input
              type="text"
              className="form-control"
              placeholder={"Ingrese un dni"}
              name={"txtDni"}
              value={this.state.Filtros.DNI}
              onChange={this.handleInputText}
              ref={this.childTxtDni}
            />
          </ContenedorControlFormatoA>
          <ContenedorControlFormatoA etiqueta="Cliente:">
            <input
              type="text"
              className="form-control"
              placeholder={"Ingrese un cliente"}
              name={"txtCliente"}
              value={this.state.Filtros.Cliente}
              onChange={this.handleInputText}
              ref={this.childTxtNombre}
            />
          </ContenedorControlFormatoA>
          <ContenedorControlFormatoA etiqueta="Codigo Credito:">
            <input
              type="text"
              className="form-control"
              placeholder={"Ingrese un codigo de credito"}
              name={"txtCodCredito"}
              value={this.state.Filtros.CodigoCredito}
              onChange={this.handleInputText}
              ref={this.childTxtDireccion}
            />
          </ContenedorControlFormatoA>

          {/* 
          <ContenedorControlFormatoA etiqueta="Nombre:">
            <input
              type="text"
              className="form-control"
              placeholder={"Ingrese el nombre del proyecto"}
              name={"txtDescripcion"}
              value={this.state.Filtros.Descripcion}
              onChange={this.handleInputText}
              ref={this.childTxtDescripcion}
            />
          </ContenedorControlFormatoA>

          <ContenedorControlFormatoA etiqueta="Area:">
            <ControlSelect
              cantidadElementosSeleccionables={0}
              eventoChange={this.eventoCambiarFiltroCombo}
              habilitarBuscador={true}
              listaOrigenElementos={this.state.ItemsListas.ListaArea}
              listaElementosSeleccionados={this.state.Filtros.Area}
              nombreControl="cmbEntidad"
              propiedadMostrar={"Title"}
              ref={this.childCmbEntidad}
            />
          </ContenedorControlFormatoA> */}
          <div className="clearfix" />

          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-8">
            <label className="text-label">
              Fecha de Registro (Desde-Hasta):
            </label>
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-12 p4">
                <div className="form-group">
                  <div className="pl15x pr15x">
                    <div className="input-group date" id="datetimepicker1">
                      <input
                        name="txtFechaRegistroInicio"
                        value={this.state.Filtros.FechaRegistroInicio}
                        type="date"
                        className="form-control"
                        onChange={this.handleInputText}
                      />
                      <span className="input-group-addon input-group-addon-reset">
                        <a href="#" className="input-group-icon">
                          <img
                            src={
                              ParametrosNoAdministrables.ValoresGenericos
                                .urlImagenes + "/img/icons/ico-date.png"
                            }
                            width="16"
                            height="16"
                          />
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-sm-6 col-xs-12 p4">
                <div className="form-group">
                  <div className="pr15x pl15x">
                    <div className="input-group date" id="datetimepicker2">
                      <input
                        name="txtFechaRegistroFin"
                        value={this.state.Filtros.FechaRegistroFin}
                        type="date"
                        className="form-control"
                        onChange={this.handleInputText}
                        min={this.state.Filtros.FechaRegistroInicio}
                      />
                      <span className="input-group-addon input-group-addon-reset">
                        <a href="#" className="input-group-icon">
                          <img
                            src={
                              ParametrosNoAdministrables.ValoresGenericos
                                .urlImagenes + "/img/icons/ico-date.png"
                            }
                            width="16"
                            height="16"
                          />
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="nbsp" />
          <div className="alinea-botones-panel">
            <button
              type="button"
              className="btn btn-default  ml5 mb5 mt5 btn-w110 rippledefault"
              onClick={this.handleLimpiar}
            >
              Limpiar
            </button>
            <button
              type="button"
              className="btn btn-primary  ml5 mb5 mt5 btn-w110 ripple"
              onClick={this.handleBuscar}
            >
              Buscar
            </button>
            <div className="espacio" />
          </div>
          <div className="clearfix" />
        </ContenedorFiltrosBusquedaAvanzada>
      </ContenedorBusquedaAvanzada>
    );
  }


}

export default OpcionesBusquedaIncidencias;
