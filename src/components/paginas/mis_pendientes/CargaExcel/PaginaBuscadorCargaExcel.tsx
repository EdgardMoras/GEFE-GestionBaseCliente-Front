import PaginaBandeja, {
  IPaginaBandeja,
  IStatusPagina
} from "src/components/paginas/mis_pendientes/CargaExcel/PaginaProyecto";
import ESolicitud from "src/models/fisicas/ESolicitud";
import OpcionesBusquedaIncidencias from "./OpcionesBusquedaCargaExcel";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import * as React from "react";
import ColumnaTablaResultados from "src/models/Base/ColumnaTablaResultados";
import { loadPageContext } from "sp-rest-proxy/dist/utils/env";
import Funciones from "src/genericos/Funciones";
import SeccionVerMas from "./SeccionVerMas";
import EMaestro from '../../../../models/fisicas/EMaestro';
import { Deferred } from 'ts-deferred';
import { Grupo } from "src/models/Base/Grupo";
import ESeguimientoIncidenteLista from "src/models/fisicas/ESeguimientoIncidenteLista";
import ECargaExcel from 'src/models/fisicas/ECargaExcel';
import NuevoProyecto from "./NuevaCarga";
import Util from 'src/genericos/Util';

// import Util from 'src/genericos/Util';

class PaginaBuscadorIncidencias extends PaginaBandeja<ECargaExcel>
  implements IPaginaBandeja {
  private childOpcionesBusqueda: React.RefObject<OpcionesBusquedaIncidencias>;
  // private esMostrarPopupuNuevoProyecto: boolean = false;
  // private esMostrarPopupExportarIncidencias: boolean = false;



  constructor(props: {}, estado: IStatusPagina<ECargaExcel>) {
    super(props, estado);

    this.childOpcionesBusqueda = React.createRef();

    this.state = {

      MostrarProgreso: false,
      NombreLista: "CargasOfertas",
      CantidadElementoPorPagina:
        ParametrosNoAdministrables.ValoresGenericos.ElementosPorPagina,
      TipoEntidad: ECargaExcel,
      CamlQuery: {
        PagingInfo: undefined,
        SubQuery: "",
        Fields: this.ObtenerColumnasViewFields(),
        OrderBy: "",
      },
      Datos: {
        ListaResultados: [],
        Maestros: new EMaestro(),
      },

      ListaColumnasTablaResultados: this.ObtenerColumnasTablaResultados(),

      Modal: {
        mostrar: false,
        cerrar: false,

      },
      EsMostrarPopupNuevoProyecto: false,
      redireccion: {
        DetalleProyectoPagina: false,
        redireccionarID: "",
        NuevoProyecto: false,
      }
    };
  }

  public ObtenerColumnasViewFields = (): string[] => {
    const lista: string[] = [];
    lista.push(ECargaExcel.Campos.ID);
    lista.push(ECargaExcel.Campos.Title);
    lista.push(ECargaExcel.Campos.Estado);
    lista.push(ECargaExcel.Campos.Base);
    lista.push(ECargaExcel.Campos.Tipo);
    lista.push(ECargaExcel.Campos.RutaArchivo);
    lista.push(ECargaExcel.Campos.UsuarioRegistro);
    lista.push(ECargaExcel.Campos.Created);

    return lista;
  };

  public ObtenerColumnasTablaResultados = (): ColumnaTablaResultados[] => {
    const lista: ColumnaTablaResultados[] = [];
    lista.push(new ColumnaTablaResultados("Id", ECargaExcel.Campos.ID, 2));
    lista.push(
      new ColumnaTablaResultados("Title", ECargaExcel.Campos.Title)
    );
    lista.push(
      new ColumnaTablaResultados("Estado", ECargaExcel.Campos.Estado)
    );
    lista.push(
      new ColumnaTablaResultados("UsuarioRegistro", ECargaExcel.Campos.UsuarioRegistro)
    );
    lista.push(
      new ColumnaTablaResultados("FechaRegistro", ECargaExcel.Campos.Created)
    );
    lista.push(
      new ColumnaTablaResultados("RutaArchivo", ECargaExcel.Campos.RutaArchivo)
    );
    lista.push(
      new ColumnaTablaResultados("Base", ECargaExcel.Campos.Base)
    );
    lista.push(
      new ColumnaTablaResultados("Tipo", ECargaExcel.Campos.Tipo)
    );



    return lista;
  };

  public btnNuevoProyecto = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // this.state.redireccion.NuevoIncidente = true;

    this.setState(this.state);


  };
  public handleOcultarPopupNuevoProyecto = (iniciarBusqueda: boolean) => {
    this.setState({ EsMostrarPopupNuevoProyecto: false }, () => {
      if (iniciarBusqueda) {
        this.lanzarEventoBusquedaInicial();
      }
    });
  };



  public handleOrdenarPorColumna = (
    cabecera: ColumnaTablaResultados,
    e: React.FormEvent<HTMLTableHeaderCellElement>
  ) => {
    e.preventDefault();

    this.OrdenarPorColumna(cabecera);
    this.state.Datos.ListaResultados = [];
    this.state.CamlQuery.PagingInfo = undefined;
    this.EventoBuscar("", null, false, this.estado.datosUsuario);
  };

  public componentDidMount() {
    this.inicializarControles();
  }


  public validarBusqueda(): Promise<boolean> {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    loadPageContext().then(async _ => {
      const listaGruposPerteneceUsuario: Grupo[] = [];
      const listaTodosGrupos: Grupo[] = [];
      Funciones.obtenerGruposPerteneceUsuario(_spPageContextInfo.userId, listaGruposPerteneceUsuario, listaTodosGrupos).then(resultado => {

        const grupoCumplimientoNormativo = listaTodosGrupos.filter(grupo => {
          return (grupo.Title.toUpperCase() === ParametrosNoAdministrables.ModuloDirectivas.Grupos.Grupo1.toUpperCase());
        })[0];

        const idGrupoCumplimientoNormativo = grupoCumplimientoNormativo.ID;

        Promise.all([
          Funciones.obtenerUsuariosPertenecenGrupo(idGrupoCumplimientoNormativo),
        ])
          .then(
            ([
              listaUsuariosPertenecenGrupoCumplimientoNormativo
            ]) => {
              this.validarGruposConfiguracionDirectivasPerteneceUsuario(listaGruposPerteneceUsuario);

              this.estado.datosUsuario.listaGruposPerteneceUsuario = listaGruposPerteneceUsuario;
              this.estado.datosUsuario.listaUsuarioGrupo1 = listaUsuariosPertenecenGrupoCumplimientoNormativo;

              this.estado.datosUsuario.usuario.ID = _spPageContextInfo.userId;

              dfd.resolve(true);
            }
          ).catch(error => {
            this.MostrarMensajeError("obtenerUsuariosPertenecenGrupo", error);
            dfd.reject(false);
          });
      }).catch(error => {
        this.MostrarMensajeError("obtenerGruposPerteneceUsuario", error);
        dfd.reject(false);
      });
    }).catch(error => {
      this.MostrarMensajeError("loadPageContext", error);
      dfd.reject(false);
    });

    return dfd.promise;
  }


  public lanzarEventoBusquedaInicial = (): void => {

    let subQuery = "";
    if (
      this.childOpcionesBusqueda !== null &&
      this.childOpcionesBusqueda.current !== null
    ) {
      subQuery = this.childOpcionesBusqueda.current.obtenerQueryBusqueda();
    }
    this.EventoBuscar(subQuery, "ID", true, this.estado.datosUsuario);
  };


  public lanzarEventoBusquedaInicialPlanAccion = (): void => {


    const eSeguimientoIncidenteLista = new ESeguimientoIncidenteLista();
    eSeguimientoIncidenteLista
      .ObtenerListadoSeguimientoList(_spPageContextInfo.userId)
      .then(VencimientoSeguimientoRegistro => {
        const lista: number[] = [];
        VencimientoSeguimientoRegistro.forEach(Item => {

          lista.push(Item.Incidente.ID);
        });

        /* const listafiltrada: number[] = [];
 
     $.each(lista, function(i, el){
         if($.inArray(el, listafiltrada) === -1) listafiltrada.push(el);
       });*/



        this.lanzarEventoBusquedaInicial();



      });
  };


  public inicializarControles() {
    this.MostrarProgreso();

    this.validarAccesoPaginaAuditora().then(() => {
      if (this.estado.datosUsuario.esGrupo1) {
        this.lanzarEventoBusquedaInicial();

      }
      else {
        this.MostrarMensajeInformativoConAccion(ParametrosNoAdministrables.Mensajes.mensajeInformativoNoTieneAccesoPagina, () => {
          window.location.replace(ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.ValoresGenericos.PathBaseName);
        });
      }

    });


  }

  public async obtenerDatosMaestros(): Promise<EMaestro> {
    const dfd: Deferred<EMaestro> = new Deferred<EMaestro>();

    const promesas = [];
    promesas.push(Funciones.CargarEntidadMaestra());


    Promise.all(promesas).then(([resultadoMaestros]) => {
      dfd.resolve(resultadoMaestros);


    })
      .catch(error => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public handleOcultarPopupExportarIncidencias = () => {
    this.state.Modal.mostrar = false;

    this.setState(this.state);
  };


  public DetalleIncidente = (elemento: ESolicitud) => {


    this.state.redireccion.DetalleProyectoPagina = true;
    this.state.redireccion.redireccionarID = elemento.ID.toString();


    const ruta = ParametrosNoAdministrables.Paginas.DetalleVendedor.replace("[ID]", elemento.ID.toString());
    window.location.replace(ruta);

  }




  public mostrarPopupuNuevoProyecto = (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    this.setState({ EsMostrarPopupNuevoProyecto: true });
  };




  public render() {
    let seccionVerMas;

    if (this.EsVisibleBotonVerMas()) {
      seccionVerMas = <SeccionVerMas EventoBuscar={this.EventoBuscar} datosUsuario={this.estado.datosUsuario} />;
    }



    return (
      <div className="container container-full">
        <div className="page-container">
          <div className="main-content body-full">
            <div className="content contentTG left-sidebar-toggle">
              <div className="container container-full">
                <div className="header-content mb20">
                  <h2 className="alinea-titulo">
                    Cargas
                    <span className="migaja">/ Bandeja de cargas</span>
                  </h2>
                  <div className="alinea-botones">

                    <button
                      type="button"
                      className="btn btn-primary btn80 ripple ml5 mb5 mt5 btn-w110"
                      onClick={this.mostrarPopupuNuevoProyecto}
                    >
                      Cargar
                        </button>
                  </div>
                  <div className="nbsp" />
                </div>
                <div className="clearfix mb20" />


                {/* <OpcionesBusquedaIncidencias
                  EventoBuscar={this.EventoBuscar}
                  EventoLimpiar={this.EventoLimpiar}
                  datosUsuario={this.estado.datosUsuario}
                  datosMaestros={this.state.Datos.Maestros}
                  ref={this.childOpcionesBusqueda}
                /> */}

                <div className="clearfix mb20" />
                {this.state.Datos.ListaResultados.length === 0 ? (
                  <div className="row" ng-show="resultadosBusqueda.length == 0">
                    <div className="col-lg-12 col-md-12">
                      <div
                        className="panel panel-opciones mb20 mt0"
                        style={{ padding: "15px", fontSize: "15px" }}
                      >
                        <i
                          data-toggle="tooltip"
                          title=""
                          className="fa fa-info-circle info"
                          aria-hidden="true"
                          style={{ paddingRight: "5px" }}
                        />
                        No se encontraron resultados.
                      </div>
                    </div>
                  </div>
                ) : null}


                {this.state.Datos.ListaResultados.map((item, i) => (
                  <div
                    // style={{ cursor: "pointer" }} 
                    className="row"
                  // onClick={this.DetalleIncidente.bind(this, item)}
                  >
                    <div className="col-lg-12 col-md-12 ng-scope">
                      <div
                        className={
                          "panel panel-opciones mb20 mt0"
                        }
                        id="dash_1"
                      >
                        <div className="panel-body panel-body-bandeja-tg">
                          <div className="row">
                            <div className="colnew10">
                              <dl className="data-marg-bandeja">
                                <dd className="text-label-bandeja">
                                  Descripción:
                                </dd>
                                <dt className="text-desc-bandeja ng-binding">
                                  {item.Title}
                                </dt>
                              </dl>
                            </div>
                            <div className="colnew10">
                              <dl className="data-marg-bandeja">
                                <dd className="text-label-bandeja">
                                  Estado:
                                </dd>
                                <dt className="text-desc-bandeja ng-binding">
                                  {item.Estado}
                                </dt>
                              </dl>
                            </div>

                            <div className="colnew10">
                              <dl className="data-marg-bandeja">
                                <dd className="text-label-bandeja">
                                  Base:
                                </dd>
                                <dt className="text-desc-bandeja ng-binding">
                                  {item.Base}
                                </dt>
                              </dl>
                            </div>

                            <div className="colnew10">
                              <dl className="data-marg-bandeja">
                                <dd className="text-label-bandeja">
                                  Tipo:
                                </dd>
                                <dt className="text-desc-bandeja ng-binding">
                                  {item.Tipo}
                                </dt>
                              </dl>
                            </div>


                            <div className="colnew10">
                              <dl className="data-marg-bandeja">
                                <dd className="text-label-bandeja">
                                  Usuario Registro:
                                </dd>
                                <dt className="text-desc-bandeja ng-binding">
                                  {item.UsuarioRegistro.Title}
                                </dt>
                              </dl>
                            </div>



                            <div className="colnew10">
                              <dl className="data-marg-bandeja">
                                <dd className="text-label-bandeja">Fecha de Registro:</dd>
                                <dt className="text-desc-bandeja ng-binding">
                                  {
                                    item.Created
                                  }
                                </dt>
                              </dl>
                            </div>

                            <div className="colnew7">
                              <dl className="data-marg-bandeja">
                                <dt className="text-desc-bandeja ng-binding">
                                  <a className="pointer" href={Util.obtenerUrlDescarga(item.RutaArchivo)}>
                                    <img
                                      src={
                                        ParametrosNoAdministrables.ValoresGenericos.urlImagenes +
                                        "/img/icons/ico-download.png"
                                      }
                                      style={{ width: "40px", height: "40px" }}
                                    />
                                  </a>
                                </dt>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="clearfix mb20" />

                <div className="clearfix" />

                {seccionVerMas}
                {this.state.EsMostrarPopupNuevoProyecto && (
                  <NuevoProyecto
                    eventoOcultarPopup={this.handleOcultarPopupNuevoProyecto}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {super.render()}
      </div>
    );
  }
}

export default PaginaBuscadorIncidencias;
