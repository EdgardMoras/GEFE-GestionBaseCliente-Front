import PaginaBandeja, {
  IPaginaBandeja,
  IStatusPagina
} from "src/components/paginas/mis_pendientes/consultar Reversiones/PaginaProyecto";
import ESolicitud from "src/models/fisicas/ESolicitud";
import OpcionesBusquedaIncidencias from "./OpcionesBusquedaReversiones";
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
import * as XLSX from 'xlsx';
import EReprogramaciones from 'src/models/fisicas/EReversiones';


// import Util from 'src/genericos/Util';

class PaginaBuscadorIncidencias extends PaginaBandeja<EReprogramaciones>
  implements IPaginaBandeja {
  private childOpcionesBusqueda: React.RefObject<OpcionesBusquedaIncidencias>;
  // private esMostrarPopupuNuevoProyecto: boolean = false;
  // private esMostrarPopupExportarIncidencias: boolean = false;



  constructor(props: {}, estado: IStatusPagina<EReprogramaciones>) {
    super(props, estado);

    this.childOpcionesBusqueda = React.createRef();

    this.state = {

      MostrarProgreso: false,
      NombreLista: "Reversiones",
      CantidadElementoPorPagina:
        ParametrosNoAdministrables.ValoresGenericos.ElementosPorPagina,
      TipoEntidad: EReprogramaciones,
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
    lista.push(EReprogramaciones.Campos.ID);
    lista.push(EReprogramaciones.Campos.Title);
    lista.push(EReprogramaciones.Campos.Cliente);
    lista.push(EReprogramaciones.Campos.DNI);
    lista.push(EReprogramaciones.Campos.Producto);
    lista.push(EReprogramaciones.Campos.Celular);
    lista.push(EReprogramaciones.Campos.CodigoVerificadorDNI);
    lista.push(EReprogramaciones.Campos.CodCredito);
    lista.push(EReprogramaciones.Campos.RevertirReprogramacionCompleta);
    lista.push(EReprogramaciones.Campos.RevertirReprogramacionGenerando1);
    lista.push(EReprogramaciones.Campos.RevertirReprogramacionGenerando2);
    lista.push(EReprogramaciones.Campos.GeneralReclamo);
    lista.push(EReprogramaciones.Campos.Created);

    return lista;
  };

  public ObtenerColumnasTablaResultados = (): ColumnaTablaResultados[] => {
    const lista: ColumnaTablaResultados[] = [];
    lista.push(new ColumnaTablaResultados("CodigoSolicitud", EReprogramaciones.Campos.Title, 2));
    lista.push(
      new ColumnaTablaResultados("DNI", EReprogramaciones.Campos.DNI)
    );
    lista.push(
      new ColumnaTablaResultados("Cliente", EReprogramaciones.Campos.Cliente)
    );
    lista.push(
      new ColumnaTablaResultados("Producto", EReprogramaciones.Campos.Producto)
    );
    lista.push(
      new ColumnaTablaResultados("Celular", EReprogramaciones.Campos.Celular)
    );
    lista.push(
      new ColumnaTablaResultados("CodigoVerificadorDNI", EReprogramaciones.Campos.CodigoVerificadorDNI)
    );
    lista.push(
      new ColumnaTablaResultados("CodCredito", EReprogramaciones.Campos.CodCredito)
    );
    lista.push(
      new ColumnaTablaResultados("RevertirReprogramacionCompleta", EReprogramaciones.Campos.RevertirReprogramacionCompleta)
    );
    lista.push(
      new ColumnaTablaResultados("RevertirReprogramacionGenerando1", EReprogramaciones.Campos.RevertirReprogramacionGenerando1)
    );
    lista.push(
      new ColumnaTablaResultados("RevertirReprogramacionGenerando2", EReprogramaciones.Campos.RevertirReprogramacionGenerando2)
    );
    lista.push(
      new ColumnaTablaResultados("GeneralReclamo", EReprogramaciones.Campos.GeneralReclamo)
    );
    lista.push(
      new ColumnaTablaResultados("FechaRegistro", ESolicitud.Campos.Created)
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
      if (this.estado.datosUsuario.esGrupo1 || this.estado.datosUsuario.esGrupo2) {
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


  public ExportarProyecto = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.MostrarProgreso();



    if (this.state.Datos.ListaResultados.length > 0) {
      const fileName = 'OfertasReversion.xlsx';
      const lista: any[] = [];

      this.state.Datos.ListaResultados.map((vendedor: any) => {

        if (vendedor.RevertirReprogramacionCompleta === "Seleccionado") {
          lista.push({
            "CodCredito": vendedor.CodCredito, "Opcion": "Revertir la reprogramación completa"
          });
        }
        else if (vendedor.RevertirReprogramacionGenerando1 === "Seleccionado") {
          lista.push({
            "CodCredito": vendedor.CodCredito, "Opcion": "Revertir la reprogramación generando 1 cuota adicional a pagar "
          });
        } else if (vendedor.RevertirReprogramacionGenerando2 === "Seleccionado") {
          lista.push({
            "CodCredito": vendedor.CodCredito, "Opcion": "Revertir la reprogramación generando 2 cuotas adicionales a pagar"
          });
        } else if (vendedor.GeneralReclamo === "Seleccionado") {
          lista.push({
            "CodCredito": vendedor.CodCredito, "Opcion": "Generar reclamo "
          });
        }




      })

      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(lista);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Reprogramaciones');
      XLSX.writeFile(wb, fileName);
      this.OcultarProgreso();




    }
    else {
      this.MostrarMensajeInformativoConAccion("No se encontraron datos para exportar");
      this.OcultarProgreso();
    }


  }

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
                    Reprogramaciones Especializadas
                    <span className="migaja">/ Bandeja de Reversiones de reprogramaciones</span>
                  </h2>
                  <div className="alinea-botones">

                    <button
                      type="button"
                      className="btn btn-primary btn80 ripple ml5 mb5 mt5 btn-w110"
                      onClick={this.ExportarProyecto}
                    >
                      Exportar
                        </button>
                  </div>
                  <div className="nbsp" />
                </div>
                <div className="clearfix mb20" />


                <OpcionesBusquedaIncidencias
                  EventoBuscar={this.EventoBuscar}
                  EventoLimpiar={this.EventoLimpiar}
                  datosUsuario={this.estado.datosUsuario}
                  datosMaestros={this.state.Datos.Maestros}
                  ref={this.childOpcionesBusqueda}
                />

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
                                  Codigo Solicitud:
                                </dd>
                                <dt className="text-desc-bandeja ng-binding">
                                  {item.Title}
                                </dt>
                              </dl>
                            </div>
                            <div className="colnew10">
                              <dl className="data-marg-bandeja">
                                <dd className="text-label-bandeja">
                                  Cliente:
                                </dd>
                                <dt className="text-desc-bandeja ng-binding">
                                  {item.Cliente}
                                </dt>
                              </dl>
                            </div>


                            <div className="colnew10">
                              <dl className="data-marg-bandeja">
                                <dd className="text-label-bandeja">
                                  DNI:
                                </dd>
                                <dt className="text-desc-bandeja ng-binding">
                                  {item.DNI}
                                </dt>
                              </dl>
                            </div>

                            <div className="colnew10">
                              <dl className="data-marg-bandeja">
                                <dd className="text-label-bandeja">Codigo Credito:</dd>
                                <dt className="text-desc-bandeja ng-binding">
                                  {item.CodCredito}
                                </dt>
                              </dl>
                            </div>
                            {item.RevertirReprogramacionCompleta !== "" &&

                              <div className="colnew10">
                                <dl className="data-marg-bandeja">
                                  <dd className="text-label-bandeja">Revertir la reprogramación completa :</dd>
                                  <dt className="text-desc-bandeja ng-binding">
                                    {item.RevertirReprogramacionCompleta}
                                  </dt>
                                </dl>
                              </div>
                            }


                            {item.RevertirReprogramacionGenerando1 !== "" &&
                              <div className="colnew10">
                                <dl className="data-marg-bandeja">
                                  <dd className="text-label-bandeja">Revertir la reprogramación generando 1 cuota adicional :</dd>
                                  <dt className="text-desc-bandeja ng-binding">
                                    {item.RevertirReprogramacionGenerando1}
                                  </dt>
                                </dl>
                              </div>
                            }
                            {item.RevertirReprogramacionGenerando2 !== "" &&
                              <div className="colnew10">
                                <dl className="data-marg-bandeja">
                                  <dd className="text-label-bandeja">Revertir la reprogramación generando 2 cuotas adicionales :</dd>
                                  <dt className="text-desc-bandeja ng-binding">
                                    {item.RevertirReprogramacionGenerando2}
                                  </dt>
                                </dl>
                              </div>
                            }
                            {item.GeneralReclamo !== "" &&

                              <div className="colnew10">
                                <dl className="data-marg-bandeja">
                                  <dd className="text-label-bandeja">General Reclamo:</dd>
                                  <dt className="text-desc-bandeja ng-binding">
                                    {item.GeneralReclamo}
                                  </dt>
                                </dl>
                              </div>
                            }


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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="clearfix mb20" />

                <div className="clearfix" />

                {seccionVerMas}
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
