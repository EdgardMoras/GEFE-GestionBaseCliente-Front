import * as React from "react";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import PaginaBase from "src/components/ui/pagecontrol/PaginaBase";
import {
  RouteComponentProps
  , Redirect
} from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import EElementoCombo from '../../../models/logicas/EElementoCombo';
import ControlValidadorTexto from "src/components/ui/formcontrol/ControlValidadorTexto";
// import ControlValidadorSelect from "../../../ui/formcontrol/ControlValidadorSelect";
// import { RestFiltros } from "src/genericos/RestFiltros";

import { Grupo } from "src/models/Base/Grupo";
import Util from 'src/genericos/Util';
// import ECorrelativos from 'src/models/fisicas/ECorrelativos';
import ESolicitudExtraible from 'src/models/fisicas/ESolicitudExtraible';
import Funciones from 'src/genericos/Funciones';
// import { Correos } from 'src/genericos/Correos';
// import ControlPeoplePicker from 'src/components/ui/formcontrol/ControlPeoplePicker';

import { loadPageContext } from 'sp-rest-proxy/dist/utils/env';
// import { Correos } from 'src/genericos/Correos';
// import ControlPeoplePicker from 'src/components/ui/formcontrol/ControlPeoplePicker';
import { Deferred } from 'ts-deferred';
import ControlSelect from 'src/components/ui/formcontrol/ControlSelect';
import ControlCargarArchivos from 'src/components/ui/formcontrol/ControlCargarArchivos';
import EArchivo from 'src/models/logicas/EArchivo';
import EArchivoIncidencia from 'src/models/logicas/EArchivoIncidencia';
import EPlanAccion from 'src/models/fisicas/EPlanAccion';
import ControlValidadorSelect from 'src/components/ui/formcontrol/ControlValidadorSelect';


export interface IPropsDetalleProyecto {
  id: string;
  tab: string;
}

interface IState {
  Solicitud: {
    EstadoSolicitud: string;
    TipoSolicitud: string;
    Codigo: string;
    EmailSolicitante: string;
  }
  Campos: {
    Id: number;
    NumeroDocumento: string;
    Nombre: string;
    Direccion: string;
    Telefono: string;
    Correo: string;

    Banco: EElementoCombo;
    CuentaBancaria: string;
    CCI: string;
    ValidarIdentidad: boolean;
    ValidarLavado: boolean;
    CmbIdentidad: EElementoCombo;
    CmbLavado: EElementoCombo;
    EstadoTexto: string;
    Estado: EElementoCombo;
    TerminoyCondicion: string;
    TerminosCondicionesAceptadas: string;
    Actividad: any[];
    listaArchivos: EArchivo[];
  }
  itemsListas: {
    listaEstado: EElementoCombo[];
    listaLavado: EElementoCombo[];
    listaBanco: EElementoCombo[];
    listaIdentidad: EElementoCombo[];

  };
  Redireccion:
  {
    Bandeja: boolean;
    DetalleIncidentePagina: boolean;
    redireccionarID: string;
  }
  Permiso:
  {
    esUsuario: boolean;
    esAdministrador: boolean;
  }

}
class PaginaRegistrarIncidencia extends PaginaBase<RouteComponentProps<IPropsDetalleProyecto>, IState> {
  public state: IState = {
    Solicitud: {
      EstadoSolicitud: "",
      TipoSolicitud: "",
      Codigo: "",
      EmailSolicitante: "",
    },
    Campos: {
      Id: 0,
      NumeroDocumento: "",
      Nombre: "",
      Direccion: "",
      Telefono: "",
      Correo: "",
      EstadoTexto: "",
      TerminoyCondicion: "",
      TerminosCondicionesAceptadas: "",

      Banco: new EElementoCombo,
      CuentaBancaria: "",
      CCI: "",
      ValidarIdentidad: false,
      ValidarLavado: false,
      Estado: new EElementoCombo,
      CmbIdentidad: new EElementoCombo,
      CmbLavado: new EElementoCombo,
      Actividad: [],
      listaArchivos: [],

    },
    itemsListas: {
      listaEstado: [],
      listaLavado: [],
      listaIdentidad: [],
      listaBanco: [],

    },
    Redireccion: { Bandeja: false, DetalleIncidentePagina: false, redireccionarID: "", },
    Permiso: { esUsuario: false, esAdministrador: false },

  }
  public mensajes = {

    Confirmacion_GuardarSolicitud: "Se procederá con el registro de la solicitud en el sistema. ¿Desea continuar?",
    Confirmacion_GuardarExitoso: "Se ha registrado la solicitud con éxito.",
  };

  public controlesPagina = {

    cmbLavado: "cmbLavado",
    cmbEstado: "cmbEstado",
    cmbIdentidad: "cmbIdentidad",
    cmbBanco: "cmbBanco",
    txtCodigoEmpleado: "txtCodigoEmpleado",
    txtNombreUsuario: "txtNombreUsuario",
    txtDatosBeneficiario: "txtDatosBeneficiario",
    txtArea: "txtArea",
    txtCargo: "txtCargo",
    txtMotivo: "txtMotivo",
    txtHostName: "txtHostName",
    txtTipoAccesos: "txtTipoAccesos",
    txtIp: "txtIp",
    txtEmpresa: "txtEmpresa",
    txtFechaInicioAcceso: "txtFechaReporte",
    txtFechaFinAcceso: "txtFechaOcurrencia",
    txtObservacion: "txtObservacion",
    txtTermino: "txtTermino",
    txtDireccion: "txtDireccion",
    txtTelefono: "txtTelefono",
    txtCorreo: "txtCorreo",

    txtBanco: "txtBanco",
    txtCuentaBancaria: "txtCuentaBancaria",
    txtCCI: "txtCCI",

  };

  // private validadorTipoAcceso: React.RefObject<ControlValidadorSelect>;

  private childrenControlCargarArchivos: React.RefObject<ControlCargarArchivos>;
  private validadorCuentaBancaria: React.RefObject<ControlValidadorTexto>;
  private validadorCCI: React.RefObject<ControlValidadorTexto>;


  constructor(props: RouteComponentProps<IPropsDetalleProyecto>) {
    super(props);

    //   this.validadorTipoAcceso = React.createRef();


    this.validadorCuentaBancaria = React.createRef();
    this.validadorCCI = React.createRef();


  }

  public componentDidMount() {
    loadPageContext().then(async _ => {
      Funciones.ObtenerUsuarioActual().then(resultado => {
        // this.state.NombreUsuario = resultado.Title;
        //  this.setState(this.state);
        this.inicializarControles();
      });
    });

  }

  public inicializarControles(): void {

    this.MostrarProgreso();
    const idProyecto: number = Number(this.props.match.params.id);
    if (isNaN(idProyecto)) {
      this.MostrarMensajeInformativo(
        ParametrosNoAdministrables.Mensajes.mensajeErrorParametrosNoValidos,
        false
      );
      return;
    }
    // this.eventoCargar();

    console.dir(ESolicitudExtraible.getEndPointElementosActividadxID(idProyecto));

    this.validarAccesoPaginaAuditora().then(() => {
      if (this.estado.datosUsuario.esGrupo1 || this.estado.datosUsuario.esGrupo2) {

        const promesas = [];
        promesas.push(Funciones.ObtenerUsuarioActual());
        promesas.push(Funciones.ObtenerElementoPorRest(ESolicitudExtraible.getEndPointElementosActivosxID(idProyecto)));
        promesas.push(Funciones.ObtenerElementoPorRest(ESolicitudExtraible.getEndPointElementosActividadxID(idProyecto)));
        promesas.push(Funciones.ObtenerFiles("Archivos", idProyecto.toString()));
        Promise.all(promesas)
          .then(([ResultadoUsuario, ResultadoVendedores, resultadoActividad, ResultadosFiles]) => {

            resultadoActividad.forEach((element: any) => {
              this.state.Campos.Actividad.push(element);
            });

            console.dir(resultadoActividad);
            console.dir(ResultadoVendedores);
            console.dir(ResultadosFiles);


            for (const file of ResultadosFiles.Files) {
              const archivo: EArchivoIncidencia = new EArchivoIncidencia();
              archivo.setValores(
                file.ListItemAllFields.ID,
                file.ListItemAllFields.Title,
                file.ServerRelativeUrl,
                file.length
              );

              this.state.Campos.listaArchivos.push(archivo);
            }


            this.state.Campos.NumeroDocumento = ResultadoVendedores[0].NumeroDocumento;
            this.state.Campos.Nombre = ResultadoVendedores[0].Nombre;
            this.state.Campos.Telefono = ResultadoVendedores[0].Telefono;
            this.state.Campos.Direccion = ResultadoVendedores[0].Direccion;
            this.state.Campos.Correo = ResultadoVendedores[0].Correo;
            this.state.Campos.EstadoTexto = ResultadoVendedores[0].Estado;
            this.state.Campos.TerminoyCondicion = Util.getTextoBool(ResultadoVendedores[0].TerminoCondiciones);
            this.state.Campos.TerminosCondicionesAceptadas = ResultadoVendedores[0].TerminosCondiciones;

            if (this.estado.datosUsuario.esGrupo1) {
              this.state.Permiso.esAdministrador = true;
            }
            if (this.estado.datosUsuario.esGrupo2) {
              this.state.Permiso.esUsuario = true;
            }


            console.dir(Util.validarValor(ResultadoVendedores[0].Estado));


            if (Util.validarValor(ResultadoVendedores[0].CuentaBancaria) !== "") {
              this.state.Campos.CuentaBancaria = ResultadoVendedores[0].CuentaBancaria;
            }
            if (Util.validarValor(ResultadoVendedores[0].CCI) !== "") {
              this.state.Campos.CCI = ResultadoVendedores[0].CCI;
            }






            const tipoAcceso: EElementoCombo[] = [];
            const cmbLavado: EElementoCombo[] = [];
            const cmbIdentidad: EElementoCombo[] = [];
            const cmbBanco: EElementoCombo[] = [];

            ParametrosNoAdministrables.ListaValores.EstadosSolicitudes.map((element, i) => {
              tipoAcceso.push(new EElementoCombo(i, element));
              if (element.toUpperCase() === ResultadoVendedores[0].Estado.toUpperCase()) {
                this.state.Campos.Estado = new EElementoCombo(i, element);
              }
            });

            ParametrosNoAdministrables.ListaValores.EstadosLogicos.map((element, i) => {
              cmbIdentidad.push(new EElementoCombo(i, element));
              if (element === Util.getTextoBool(ResultadoVendedores[0].ValidacionIdentidad)) {
                this.state.Campos.CmbIdentidad = new EElementoCombo(i, element);
              }
            });

            ParametrosNoAdministrables.ListaValores.EstadosLogicos.map((element, i) => {
              cmbLavado.push(new EElementoCombo(i, element));
              if (element === Util.getTextoBool(ResultadoVendedores[0].ValidacionLavado)) {
                this.state.Campos.CmbLavado = new EElementoCombo(i, element);
              }
            });
            ParametrosNoAdministrables.ListaValores.Bancos.map((element, i) => {
              cmbBanco.push(new EElementoCombo(i, element));
              if (Util.validarValor(ResultadoVendedores[0].Banco) !== "") {
                if (element.toUpperCase() === ResultadoVendedores[0].Banco.toUpperCase()) {
                  this.state.Campos.Banco = new EElementoCombo(i, element);
                }
              }
            });

            this.setState(this.state);

            this.setState({ itemsListas: { ...this.state.itemsListas, listaEstado: tipoAcceso } });
            this.setState({ itemsListas: { ...this.state.itemsListas, listaLavado: cmbLavado } });
            this.setState({ itemsListas: { ...this.state.itemsListas, listaIdentidad: cmbIdentidad } });
            this.setState({ itemsListas: { ...this.state.itemsListas, listaBanco: cmbBanco } });


            this.OcultarProgreso();

            console.dir(this.state);


          }).catch(error => {
            this.MostrarMensajeError("Error al procesar datos", error);
          });

      }
      else {

        this.MostrarMensajeInformativoConAccion(ParametrosNoAdministrables.Mensajes.mensajeInformativoNoTieneAccesoPagina, () => {
          window.location.replace(ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.ValoresGenericos.PathBaseName + '/Vendedor/Bandeja');
        });


      }
    });





  }
  public validarGruposConfiguracionDirectivasPerteneceUsuario(listaGruposPerteneceUsuario: Grupo[]): void {
    listaGruposPerteneceUsuario.forEach(grupo => {
      if (grupo.Title.toUpperCase() === ParametrosNoAdministrables.ModuloDirectivas.Grupos.Grupo1.toUpperCase()) {
        this.estado.datosUsuario.esGrupo1 = true;
      }
      else if (grupo.Title.toUpperCase() === ParametrosNoAdministrables.ModuloDirectivas.Grupos.Grupo2.toUpperCase()) {
        this.estado.datosUsuario.esGrupo2 = true;
      }
    }
    );
  }

  public validarAccesoPaginaAuditora(): Promise<boolean> {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    loadPageContext().then(async _ => {
      const listaGruposPerteneceUsuario: Grupo[] = [];
      const listaTodosGrupos: Grupo[] = [];
      Funciones.obtenerGruposPerteneceUsuario(_spPageContextInfo.userId, listaGruposPerteneceUsuario, listaTodosGrupos).then(resultado => {

        const grupoAdminitradoresAudirotira = listaTodosGrupos.filter(grupo => {
          return (grupo.Title.toUpperCase() === ParametrosNoAdministrables.ModuloDirectivas.Grupos.Grupo1.toUpperCase());
        })[0];

        const grupoUsuarioSistema = listaTodosGrupos.filter(grupo => {
          return (grupo.Title.toUpperCase() === ParametrosNoAdministrables.ModuloDirectivas.Grupos.Grupo2.toUpperCase());
        })[0];


        const idgrupoAdminitradoresAudirotira = grupoAdminitradoresAudirotira.ID;
        const idgrupoUsuarioSistema = grupoUsuarioSistema.ID;


        Promise.all([
          Funciones.obtenerUsuariosPertenecenGrupo(idgrupoAdminitradoresAudirotira),
          Funciones.obtenerUsuariosPertenecenGrupo(idgrupoUsuarioSistema),
          Funciones.ObtenerUsuarioActual()
        ])
          .then(
            ([
              listaUsuariosPertenecenGrupoCumplimientoNormativo,
              listaUsuariosPertenecenGrupoResponsablesExpendientesProvincia,
              datosUsuarioActual
            ]) => {
              this.validarGruposConfiguracionDirectivasPerteneceUsuario(listaGruposPerteneceUsuario);

              this.estado.datosUsuario.listaGruposPerteneceUsuario = listaGruposPerteneceUsuario;
              this.estado.datosUsuario.listaUsuarioGrupo1 = listaUsuariosPertenecenGrupoCumplimientoNormativo;
              this.estado.datosUsuario.listaUsuarioGrupo2 = listaUsuariosPertenecenGrupoResponsablesExpendientesProvincia;
              this.estado.datosUsuario.usuario = datosUsuarioActual;

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

  public validarUsuarioPerteneceGrupo1(): boolean {
    if (this.estado.datosUsuario.esGrupo1) {
      return true;
    }
    return false;
  }




  public validarCampos() {
    let camposValidos = true;
    if (this.state.Campos.Banco.Title === "Seleccione"
    ) {
      camposValidos = false;
    }

    if (this.state.Campos.CuentaBancaria === ""
    ) {
      camposValidos = false;
    }

    if (this.state.Campos.CCI === ""
    ) {
      camposValidos = false;
    }

    if (this.state.Campos.Nombre === ""
    ) {
      camposValidos = false;
    }
    if (this.state.Campos.Direccion === ""
    ) {
      camposValidos = false;
    }
    if (this.state.Campos.Telefono === ""
    ) {
      camposValidos = false;
    }
    if (this.state.Campos.Correo === ""
    ) {
      camposValidos = false;
    }

    return camposValidos;
  }


  public eventoGuardar = (e: React.FormEvent<HTMLButtonElement>) => {

    e.preventDefault();

    const idSolicitud: number = Number(this.props.match.params.id);
    const solicitud = new ESolicitudExtraible()
    const camposValidados = this.validarCampos();


    let mensaje = "¿Esta seguro que quiere enviar la solicitud a la gerencia solicitante?";

    if (this.state.Campos.EstadoTexto === "Aprobado") {
      mensaje = "¿Esta seguro que desea actualizar los datos del vendedor?";
      solicitud.setValoresActividadRegistro2(new Date(), _spPageContextInfo.userId, idSolicitud, "Se actualizo los datos del vendedor");
    } else {

      if (this.state.Campos.Estado.Title === "Aprobado") {

        if (this.state.Campos.CmbIdentidad.Title === "Sí" && this.state.Campos.CmbLavado.Title === "Sí") {
          if (!camposValidados) {
            this.MostrarMensajeInformativo(ParametrosNoAdministrables.Mensajes.mensajeInformativoCompletarCampos)
            return;
          } else {

            mensaje = "¿Esta seguro que desea aprobar al vendedor?";
            solicitud.setValoresActividadRegistro2(new Date(), _spPageContextInfo.userId, idSolicitud, "Se aprobo la solicitud del vendedor");
          }
        } else {
          mensaje = "Para aprobar al vendedor es necesario que los datos de validación (Identidad y lavado) se encuentren revisados.";
          this.MostrarMensajeInformativo(mensaje)
          return;
        }


      }
      else if (this.state.Campos.Estado.Title === "Rechazado") {
        mensaje = "¿Esta seguro que desea rechazar al vendedor?";
        solicitud.setValoresActividadRegistro2(new Date(), _spPageContextInfo.userId, idSolicitud, "Se rechazo la solicitud del vendedor");
      } else if (this.state.Campos.Estado.Title === "Pendiente") {
        mensaje = "¿Esta seguro que desea actualizar los datos del vendedor?";
        solicitud.setValoresActividadRegistro2(new Date(), _spPageContextInfo.userId, idSolicitud, "Se actualizo los datos del vendedor");
      }
    }


    this.MostrarMensajeConfirmacion(mensaje, () => {

      this.MostrarProgreso();






      // solicitud.setValoresActividadRegistro2(new Date(), _spPageContextInfo.userId, idSolicitud, this.state.Campos.Observacion);

      let Lavado: boolean = false;
      let Identidad: boolean = false;

      if (this.state.Campos.CmbLavado.Title === "No") {
        Lavado = false;
      }
      else {
        Lavado = true;
      }
      if (this.state.Campos.CmbIdentidad.Title === "No") {
        Identidad = false;
      }
      else {
        Identidad = true;
      }


      solicitud.setValoresVendedoresActualizar(this.state.Campos.Banco.Title, this.state.Campos.CuentaBancaria, this.state.Campos.CCI, this.state.Campos.Estado.Title, Lavado, Identidad, this.state.Campos.Nombre, this.state.Campos.Direccion, this.state.Campos.Telefono, this.state.Campos.Correo);

      const promesaGuardar2: Array<Promise<string>> = [];
      promesaGuardar2.push(
        Funciones.ActualizarElemento(
          "Vendedores",
          solicitud.getValoresVendedoresActualizar(),
          idSolicitud
        )
      );

      promesaGuardar2.push(
        Funciones.GuardarElemento(
          "Actividad",
          solicitud.getValoresActividadRegistro()
        )
      );



      Promise.all(promesaGuardar2)
        .then(([resultadoActualizar, resultadoActividad]) => {


          if (this.state.Campos.Actividad.length === 1) {
            EPlanAccion.crearCarpetaPlanAccion(idSolicitud.toString()).then(resultadoCrearCarpeta2 => {

              const promesaCargar: Array<Promise<string>> = [];
              if (this.state.Campos.listaArchivos.length > 0) {

                this.state.Campos.listaArchivos
                  .filter(archivo => {
                    return !archivo.Eliminado;
                  }).forEach(archivo => {
                    const datos = {
                      Title: archivo.Nombre
                    };

                    promesaCargar.push(
                      Funciones.AdjuntarArchivo(
                        "Archivos",
                        archivo.ArrayBufferArchivo,
                        datos,
                        idSolicitud.toString()
                      )
                    );
                  });

              }

              Promise.all(promesaCargar)
                .then(([]) => {


                  if (this.state.Campos.Estado.Title === "Aprobado") {
                    const promesaGuardarAprobar: Array<Promise<string>> = [];

                    const oDatos = {
                      "usu_codigo": this.state.Campos.NumeroDocumento,
                      "usu_apepat": "",
                      "usu_apemat": "",
                      "usu_nombre": this.state.Campos.Nombre,
                      "usu_email": this.state.Campos.Correo,
                      "usu_rol": "",
                      "usu_plaza": "",
                      "usu_clave": this.state.Campos.NumeroDocumento,
                      "usu_activo": true,
                      "usu_tienda": "",
                      "usu_fechalogin": "",
                      "usu_intentosfallidos": 0,
                      "usu_primerinicio": 1,
                      "NomRol": "",
                      "CodApp": "",
                      "NomApp": "",
                      "usu_telefono": this.state.Campos.Telefono,
                    } as any

                    promesaGuardarAprobar.push(
                      Funciones.EnviarDatosPost(ParametrosNoAdministrables.ValoresGenericos.urlServicio + "/appVext/bridge/NuevoUsuario", oDatos)
                    );

                    Promise.all(promesaGuardarAprobar)
                      .then(([resultado]) => {

                        // this.MostrarMensajeInformativo("Servicio OK", true);

                      }).catch(error => {
                        this.MostrarMensajeError("Servicio", error, "Error del servicio");
                      });

                  }

                  else if (this.state.Campos.Estado.Title === "Rechazado") {
                    const promesaGuardarAprobar: Array<Promise<string>> = [];

                    const oDatos = {
                      "usu_codigo": this.state.Campos.NumeroDocumento,
                      "usu_apepat": "",
                      "usu_apemat": "",
                      "usu_nombre": this.state.Campos.Nombre,
                      "usu_email": this.state.Campos.Correo,
                      "usu_rol": "",
                      "usu_plaza": "",
                      "usu_clave": this.state.Campos.NumeroDocumento,
                      "usu_activo": true,
                      "usu_tienda": "",
                      "usu_fechalogin": "",
                      "usu_intentosfallidos": 0,
                      "usu_primerinicio": 1,
                      "NomRol": "",
                      "CodApp": "",
                      "NomApp": "",
                      "usu_telefono": this.state.Campos.Telefono,
                    } as any

                    promesaGuardarAprobar.push(
                      Funciones.EnviarDatosPost(ParametrosNoAdministrables.ValoresGenericos.urlServicio + "/appVext/bridge/DesactivarUsuario", oDatos)
                    );

                    Promise.all(promesaGuardarAprobar)
                      .then(([resultado]) => {

                        // this.MostrarMensajeInformativo("Servicio OK", true);

                      }).catch(error => {
                        this.MostrarMensajeError("Servicio", error, "Error del servicio");
                      });


                  }

                  this.MostrarMensajeInformativoConAccion("Se guardaron los datos correctamente", () => {
                    window.location.replace(ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.ValoresGenericos.PathBaseName + '/Vendedor/Bandeja');
                  });

                }).catch(error => {
                  this.MostrarMensajeError("loadPageContext", error);
                });




            }).catch(error => {
              this.MostrarMensajeError("loadPageContext", error);
            });

          } else {

            const promesaCargar: Array<Promise<any>> = [];
            if (this.state.Campos.listaArchivos.length > 0) {
              console.dir(this.state.Campos.listaArchivos);

              this.state.Campos.listaArchivos
                .filter(archivo => {
                  return archivo.Eliminado && archivo.ID !== 0;
                }).forEach(archivo => {
                  promesaCargar.push(
                    Funciones.EliminarItem("Archivos", archivo.ID)
                  );
                });


              this.state.Campos.listaArchivos
                .filter(archivo => {
                  return !archivo.Eliminado && archivo.ID === 0;
                }).forEach(archivo => {
                  const datos = {
                    Title: archivo.Nombre
                  };

                  promesaCargar.push(
                    Funciones.AdjuntarArchivo(
                      "Archivos",
                      archivo.ArrayBufferArchivo,
                      datos,
                      idSolicitud.toString()
                    )
                  );
                });

            }

            Promise.all(promesaCargar)
              .then(([]) => {

                if (this.state.Campos.Estado.Title === "Aprobado") {
                  const promesaGuardarAprobar: Array<Promise<string>> = [];

                  const oDatos = {
                    "usu_codigo": this.state.Campos.NumeroDocumento,
                    "usu_apepat": "",
                    "usu_apemat": "",
                    "usu_nombre": this.state.Campos.Nombre,
                    "usu_email": this.state.Campos.Correo,
                    "usu_rol": "",
                    "usu_plaza": "",
                    "usu_clave": this.state.Campos.NumeroDocumento,
                    "usu_activo": true,
                    "usu_tienda": "",
                    "usu_fechalogin": "",
                    "usu_intentosfallidos": 0,
                    "usu_primerinicio": 1,
                    "NomRol": "",
                    "CodApp": "",
                    "NomApp": "",
                    "usu_telefono": this.state.Campos.Telefono,
                  } as any

                  promesaGuardarAprobar.push(
                    Funciones.EnviarDatosPost(ParametrosNoAdministrables.ValoresGenericos.urlServicio + "/appVext/bridge/NuevoUsuario", oDatos)
                  );

                  Promise.all(promesaGuardarAprobar)
                    .then(([resultado]) => {

                      // this.MostrarMensajeInformativo("Servicio OK", true);

                    }).catch(error => {
                      this.MostrarMensajeError("Servicio", error, "Error del servicio");
                    });

                }

                else if (this.state.Campos.Estado.Title === "Rechazado") {
                  const promesaGuardarAprobar: Array<Promise<string>> = [];

                  const oDatos = {
                    "usu_codigo": this.state.Campos.NumeroDocumento,
                    "usu_apepat": "",
                    "usu_apemat": "",
                    "usu_nombre": this.state.Campos.Nombre,
                    "usu_email": this.state.Campos.Correo,
                    "usu_rol": "",
                    "usu_plaza": "",
                    "usu_clave": this.state.Campos.NumeroDocumento,
                    "usu_activo": true,
                    "usu_tienda": "",
                    "usu_fechalogin": "",
                    "usu_intentosfallidos": 0,
                    "usu_primerinicio": 1,
                    "NomRol": "",
                    "CodApp": "",
                    "NomApp": "",
                    "usu_telefono": this.state.Campos.Telefono,
                  } as any

                  promesaGuardarAprobar.push(
                    Funciones.EnviarDatosPost(ParametrosNoAdministrables.ValoresGenericos.urlServicio + "/appVext/bridge/DesactivarUsuario", oDatos)
                  );

                  Promise.all(promesaGuardarAprobar)
                    .then(([resultado]) => {

                      // this.MostrarMensajeInformativo("Servicio OK", true);

                    }).catch(error => {
                      this.MostrarMensajeError("Servicio", error, "Error del servicio");
                    });


                }
                this.MostrarMensajeInformativoConAccion("Se guardaron los datos correctamente", () => {
                  window.location.replace(ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.ValoresGenericos.PathBaseName + '/Vendedor/Bandeja');
                });

              }).catch(error => {
                this.MostrarMensajeError("loadPageContext", error);
              });


          }






        }).catch(error => {
          this.MostrarMensajeError("loadPageContext", error);
        });







    });

  };

  public eventoRegresar = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    window.location.replace(ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.ValoresGenericos.PathBaseName + '/Vendedor/Bandeja');
  };


  public eventoCargar = () => {
    const tipoAcceso: EElementoCombo[] = [];
    const cmbLavado: EElementoCombo[] = [];
    const cmbIdentidad: EElementoCombo[] = [];
    ParametrosNoAdministrables.ListaValores.EstadosSolicitudes.map((element, i) => {
      tipoAcceso.push(new EElementoCombo(i, element));
    });
    this.setState({ itemsListas: { ...this.state.itemsListas, listaEstado: tipoAcceso } });

    ParametrosNoAdministrables.ListaValores.EstadosLogicos.map((element, i) => {
      cmbLavado.push(new EElementoCombo(i, element));
    });
    this.setState({ itemsListas: { ...this.state.itemsListas, listaLavado: cmbLavado } });

    ParametrosNoAdministrables.ListaValores.EstadosLogicos.map((element, i) => {
      cmbIdentidad.push(new EElementoCombo(i, element));
    });
    this.setState({ itemsListas: { ...this.state.itemsListas, listaIdentidad: cmbIdentidad } });


  };


  public handleInputText = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, name }: any = e.target;
    const Campos = Object.assign({}, this.state.Campos);

    if (name === this.controlesPagina.txtBanco) {


      Campos.Banco = value;



    } else if (name === this.controlesPagina.txtNombreUsuario) {

      Campos.Nombre = value;
    }

    else if (name === this.controlesPagina.txtDireccion) {

      Campos.Direccion = value;
    } else if (name === this.controlesPagina.txtTelefono) {

      Campos.Telefono = value;
    } else if (name === this.controlesPagina.txtCorreo) {

      Campos.Correo = value;
    }


    else
      if (name === this.controlesPagina.txtCuentaBancaria) {
        if (value === "") {
          Campos.CuentaBancaria = value;
        }
        if (Util.SoloNumeros(value)) {
          Campos.CuentaBancaria = value;
        }

      }
      else
        if (name === this.controlesPagina.txtCCI) {
          if (value === "") {
            Campos.CCI = value;
          }
          if (Util.SoloNumeros(value)) {
            Campos.CCI = value;

          }
        }
    // else if (name === this.controlesPagina.txtNombreUsuario) {
    //   Campos.NombreUsuario = value;
    // } else if (name === this.controlesPagina.txtCargo) {
    //   Campos.Cargo = value;
    // } else if (name === this.controlesPagina.txtArea) {
    //   Campos.Area = value;
    // } else if (name === this.controlesPagina.txtEmpresa) {
    //   Campos.Empresa = value;
    // } else if (name === this.controlesPagina.txtMotivo) {
    //   Campos.Motivo = value;
    // } else if (name === this.controlesPagina.txtHostName) {
    //   Campos.HostName = value;
    // } else if (name === this.controlesPagina.txtDatosBeneficiario) {
    //   Campos.DatosBeneficiario = value;
    // } else if (name === this.controlesPagina.txtFechaInicioAcceso) {


    //   if (Util.ConvertirStringToDateAsarti(value) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
    //     this.MostrarMensajeInformativo("Por favor de ingresar una fecha valida", true);
    //   } else {
    //     Campos.FechaInicioAcceso = value;
    //   }

    // } else if (name === this.controlesPagina.txtFechaFinAcceso) {

    //   if (this.state.Campos.FechaInicioAcceso === "") {
    //     this.MostrarMensajeInformativo("Por favor de ingresar una fecha de inicio de acceso.", true);
    //   } else if (Util.ConvertirStringToDateAsarti(value) > Util.addMonths(Util.ConvertirStringToDateAsarti(this.state.Campos.FechaInicioAcceso), 6, null)) {
    //     this.MostrarMensajeInformativo("Por favor de ingresar una fecha valida.", true);
    //   } else if (Util.ConvertirStringToDateAsarti(value) < Util.ConvertirStringToDateAsarti(this.state.Campos.FechaInicioAcceso)) {
    //     this.MostrarMensajeInformativo("Por favor de ingresar una fecha valida.", true);
    //   }

    //   else {
    //     Campos.FechaFinAcceso = value;
    //   }
    // } else if (name === this.controlesPagina.txtIp) {
    //   Campos.Ip = value;
    // }
    this.setState({ Campos });
  };


  public eventoChangeCombos = (nombreControl: string, elementoClick: EElementoCombo | null,
    elementosSeleccionados: EElementoCombo[], elementoSeleccionado: EElementoCombo | null) => {
    if (nombreControl === this.controlesPagina.cmbEstado) {
      this.setState({ Campos: { ...this.state.Campos, Estado: elementosSeleccionados[0] } })
    }
    else if (nombreControl === this.controlesPagina.cmbLavado) {
      this.setState({ Campos: { ...this.state.Campos, CmbLavado: elementosSeleccionados[0] } })
    }
    else if (nombreControl === this.controlesPagina.cmbIdentidad) {
      this.setState({ Campos: { ...this.state.Campos, CmbIdentidad: elementosSeleccionados[0] } })
    }
    else if (nombreControl === this.controlesPagina.cmbBanco) {
      this.setState({ Campos: { ...this.state.Campos, Banco: elementosSeleccionados[0] } })
    }

    // else if (nombreControl === this.controlesPagina.cmbArea) {
    //   this.setState({ Campos: { ...this.state.Campos, Area: elementosSeleccionados } })
    // }

  };


  public eventoChangeCargarArchivos = (nombreControl: string, listaArchivos: EArchivo[], idIncidente?: number, idIncidenteTarea?: number) => {

    if (nombreControl === "caArchivos") {


      const listaArchivosIncidente: EArchivo[] = listaArchivos.map((archivo: EArchivo) => {
        const archivoIncidente = new EArchivo();
        archivoIncidente.setValoresDesdeEArchivo(archivo);
        return archivoIncidente;
      });


      this.setState({ Campos: { ...this.state.Campos, listaArchivos: listaArchivosIncidente } });

    }
  }

  public render() {


    if (this.state.Redireccion.Bandeja) {
      const ruta = ParametrosNoAdministrables.Paginas.BandejaIncidentePagina;
      return <Redirect to={ruta} />;
    }

    if (this.state.Redireccion.DetalleIncidentePagina) {
      const ruta = ParametrosNoAdministrables.Paginas.DetalleIncidentePagina.replace("[ID]", this.state.Redireccion.redireccionarID);
      return <Redirect to={ruta} />;
    }

    return (

      <div className="container container-full">
        <div className="page-container">
          <div className="main-content body-full">
            <div className="content contentTG left-sidebar-toggle">
              <div className="container container-full">
                <div className="header-content mb20">
                  <h2 className="alinea-titulo">
                    Vendedores{" "}
                    <span className="migaja">/ Datos</span>
                  </h2>


                  {
                    this.state.Campos.EstadoTexto === "Pendiente" &&
                    <div className="alinea-botones">
                      <button
                        type="button"
                        className="btn btn-default btn80 rippledefault ml5 mb5 mt5 btn-w110"
                        onClick={this.eventoRegresar}
                      >
                        Regresar
                                        </button>

                      {this.state.Campos.EstadoTexto === "Pendiente" && this.state.Permiso.esUsuario &&

                        <button
                          type="button"
                          className="btn btn-primary btn80 ripple ml5 mb5 mt5 btn-w110"
                          onClick={this.eventoGuardar}
                        >
                          Guardar
                                      </button>
                      }

                      {this.state.Campos.EstadoTexto === "Pendiente" && this.state.Permiso.esAdministrador &&

                        <button
                          type="button"
                          className="btn btn-primary btn80 ripple ml5 mb5 mt5 btn-w110"
                          onClick={this.eventoGuardar}
                        >
                          Guardar
                                      </button>
                      }

                    </div>
                  }



                  {
                    this.state.Campos.EstadoTexto !== "Pendiente" &&
                    <div className="alinea-botones">
                      <button
                        type="button"
                        className="btn btn-default btn80 rippledefault ml5 mb5 mt5 btn-w110"
                        onClick={this.eventoRegresar}
                      >
                        Regresar
                                        </button>

                      {this.state.Campos.EstadoTexto !== "Pendiente" && this.state.Permiso.esAdministrador &&

                        <button
                          type="button"
                          className="btn btn-primary btn80 ripple ml5 mb5 mt5 btn-w110"
                          onClick={this.eventoGuardar}
                        >
                          Guardar
                                      </button>
                      }



                    </div>
                  }


                  <div className="nbsp" />
                  <h2 className="alinea-titulo">
                    Estado :  <span className="migaja"> {this.state.Campos.EstadoTexto} </span>
                  </h2>
                  <div className="nbsp" />
                </div>
                <div className="clearfix" />
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div id="tabmodal2">
                      <ul className="nav nav-pills nav-justified">
                        <li role="presentation" className="active">
                          <a data-toggle="tab" href="#uno">
                            Datos del vendedor
                                                    </a>
                        </li>
                        <li role="presentation" className="">
                          <a data-toggle="tab" href="#tres">
                            Historial de actividad
                                                    </a>
                        </li>
                      </ul>
                      <div className="tab-content mt10">
                        <div id="uno" className="tab-pane fade in active">
                          <div className="well ">
                            <div className="row">
                              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div className="form-group">
                                  <label className="text-label">
                                    DNI:{" "}
                                  </label>
                                  {
                                    this.state.Campos.EstadoTexto === "Pendiente" &&
                                    <input
                                      className="form-control"
                                      name={this.controlesPagina.txtCodigoEmpleado}
                                      value={this.state.Campos.NumeroDocumento}
                                      onChange={this.handleInputText}
                                      readOnly
                                    />
                                  }
                                  {
                                    this.state.Campos.EstadoTexto !== "Pendiente" &&
                                    <input
                                      className="form-control"
                                      name={this.controlesPagina.txtCodigoEmpleado}
                                      value={this.state.Campos.NumeroDocumento}
                                      onChange={this.handleInputText}
                                      readOnly
                                    />
                                  }


                                </div>
                              </div>

                              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div className="form-group">
                                  <label className="text-label">
                                    Nombre:{" "}
                                  </label>
                                  {
                                    this.state.Campos.EstadoTexto === "Pendiente" &&
                                    <input
                                      className="form-control"
                                      name={this.controlesPagina.txtNombreUsuario}
                                      value={this.state.Campos.Nombre}
                                      onChange={this.handleInputText}
                                    />
                                  }

                                  {
                                    this.state.Campos.EstadoTexto !== "Pendiente" &&
                                    <input
                                      className="form-control"
                                      name={this.controlesPagina.txtNombreUsuario}
                                      value={this.state.Campos.Nombre}
                                      onChange={this.handleInputText}
                                      readOnly
                                    />
                                  }

                                </div>
                              </div>

                              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div className="form-group">
                                  <label className="text-label">
                                    Dirección:{" "}
                                  </label>
                                  {
                                    this.state.Campos.EstadoTexto === "Pendiente" &&
                                    <input
                                      className="form-control"
                                      name={this.controlesPagina.txtDireccion}
                                      value={this.state.Campos.Direccion}
                                      onChange={this.handleInputText}

                                    />
                                  }
                                  {
                                    this.state.Campos.EstadoTexto !== "Pendiente" &&
                                    <input
                                      className="form-control"
                                      name={this.controlesPagina.txtDireccion}
                                      value={this.state.Campos.Direccion}
                                      onChange={this.handleInputText}
                                      readOnly
                                    />
                                  }

                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div className="form-group">
                                  <label className="text-label">
                                    Telefono:{" "}
                                  </label>
                                  {
                                    this.state.Campos.EstadoTexto === "Pendiente" &&
                                    <input
                                      className="form-control"
                                      name={this.controlesPagina.txtTelefono}
                                      value={this.state.Campos.Telefono}
                                      onChange={this.handleInputText}

                                    />
                                  }
                                  {
                                    this.state.Campos.EstadoTexto !== "Pendiente" &&
                                    <input
                                      className="form-control"
                                      name={this.controlesPagina.txtTelefono}
                                      value={this.state.Campos.Telefono}
                                      onChange={this.handleInputText}
                                      readOnly
                                    />
                                  }
                                </div>
                              </div>

                              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div className="form-group">
                                  <label className="text-label">
                                    Correo:{" "}
                                  </label>
                                  {
                                    this.state.Campos.EstadoTexto === "Pendiente" &&
                                    <input
                                      className="form-control"
                                      name={this.controlesPagina.txtCorreo}
                                      value={this.state.Campos.Correo}
                                      onChange={this.handleInputText}

                                    />
                                  }
                                  {
                                    this.state.Campos.EstadoTexto !== "Pendiente" &&
                                    <input
                                      className="form-control"
                                      name={this.controlesPagina.txtCorreo}
                                      value={this.state.Campos.Correo}
                                      onChange={this.handleInputText}
                                      readOnly
                                    />
                                  }

                                </div>
                              </div>

                              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div className="form-group">
                                  <label className="text-label">
                                    Terminos y condiciones:{" "}
                                  </label>
                                  {
                                    this.state.Campos.EstadoTexto === "Pendiente" &&
                                    <input
                                      className="form-control"
                                      name={this.controlesPagina.txtTermino}
                                      value={this.state.Campos.TerminoyCondicion}
                                      onChange={this.handleInputText}
                                      readOnly
                                    />
                                  }
                                  {
                                    this.state.Campos.EstadoTexto !== "Pendiente" &&
                                    <input
                                      className="form-control"
                                      name={this.controlesPagina.txtTermino}
                                      value={this.state.Campos.TerminoyCondicion}
                                      onChange={this.handleInputText}
                                      readOnly
                                    />
                                  }

                                </div>
                              </div>



                            </div>


                            <div className="row">
                              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                  <label className="text-label">
                                    Terminos y condiciones:{" "}
                                  </label>
                                  <textarea
                                    className="form-control"
                                    name={this.controlesPagina.txtObservacion}
                                    value={this.state.Campos.TerminosCondicionesAceptadas}
                                    cols={30}
                                    rows={5}
                                    readOnly
                                  />
                                </div>
                              </div>




                            </div>

                          </div>
                          <div className="well ">
                            <div className="row">
                              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div className="form-group">
                                  <label className="text-label">
                                    Banco:{" "}
                                  </label>
                                  {
                                    this.state.Campos.EstadoTexto === "Pendiente" &&
                                    <div>
                                      <ControlSelect
                                        cantidadElementosSeleccionables={1}
                                        elementoSeleccionado={this.state.Campos.Banco}
                                        eventoChange={this.eventoChangeCombos}
                                        habilitarBuscador={true}
                                        listaOrigenElementos={this.state.itemsListas.listaBanco}
                                        nombreControl={this.controlesPagina.cmbBanco}
                                        propiedadMostrar={'Title'}
                                      />

                                      <ControlValidadorSelect
                                        valor={this.state.Campos.Banco}
                                      />
                                    </div>

                                  }
                                  {
                                    this.state.Campos.EstadoTexto !== "Pendiente" &&
                                    <ControlSelect
                                      cantidadElementosSeleccionables={1}
                                      elementoSeleccionado={this.state.Campos.Banco}
                                      eventoChange={this.eventoChangeCombos}
                                      habilitarBuscador={true}
                                      listaOrigenElementos={this.state.itemsListas.listaBanco}
                                      nombreControl={this.controlesPagina.cmbBanco}
                                      propiedadMostrar={'Title'}
                                      esDeshabilitado={true}
                                    />
                                  }


                                </div>
                              </div>

                              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div className="form-group">
                                  <label className="text-label">
                                    Cuenta Bancaria:{" "}
                                  </label>
                                  {
                                    this.state.Campos.EstadoTexto === "Pendiente" &&
                                    <div>
                                      <input
                                        className="form-control"
                                        name={this.controlesPagina.txtCuentaBancaria}
                                        value={this.state.Campos.CuentaBancaria}
                                        onChange={this.handleInputText}

                                      />
                                      <ControlValidadorTexto
                                        valor={this.state.Campos.CuentaBancaria}
                                        ref={this.validadorCuentaBancaria}
                                      />
                                    </div>
                                  }

                                  {
                                    this.state.Campos.EstadoTexto !== "Pendiente" &&
                                    <input
                                      className="form-control"
                                      name={this.controlesPagina.txtCuentaBancaria}
                                      value={this.state.Campos.CuentaBancaria}
                                      onChange={this.handleInputText}
                                      readOnly
                                    />
                                  }

                                </div>
                              </div>

                              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div className="form-group">
                                  <label className="text-label">
                                    CCI:{" "}
                                  </label>
                                  {
                                    this.state.Campos.EstadoTexto === "Pendiente" &&
                                    <div>
                                      <input
                                        className="form-control"
                                        name={this.controlesPagina.txtCCI}
                                        value={this.state.Campos.CCI}
                                        onChange={this.handleInputText}

                                      />
                                      <ControlValidadorTexto
                                        valor={this.state.Campos.CCI}
                                        ref={this.validadorCCI}
                                      />
                                    </div>
                                  }
                                  {
                                    this.state.Campos.EstadoTexto !== "Pendiente" &&
                                    <input
                                      className="form-control"
                                      name={this.controlesPagina.txtCCI}
                                      value={this.state.Campos.CCI}
                                      onChange={this.handleInputText}
                                      readOnly
                                    />
                                  }

                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div className="form-group">
                                  <label className="text-label">
                                    Validación de Identidad:{" "}
                                  </label>
                                  {
                                    this.state.Campos.EstadoTexto === "Pendiente" &&
                                    <ControlSelect
                                      cantidadElementosSeleccionables={1}
                                      elementoSeleccionado={this.state.Campos.CmbIdentidad}
                                      eventoChange={this.eventoChangeCombos}
                                      habilitarBuscador={true}
                                      listaOrigenElementos={this.state.itemsListas.listaIdentidad}
                                      nombreControl={this.controlesPagina.cmbIdentidad}
                                      propiedadMostrar={'Title'}
                                    />
                                  }
                                  {
                                    this.state.Campos.EstadoTexto !== "Pendiente" &&
                                    <ControlSelect
                                      cantidadElementosSeleccionables={1}
                                      elementoSeleccionado={this.state.Campos.CmbIdentidad}
                                      eventoChange={this.eventoChangeCombos}
                                      habilitarBuscador={true}
                                      listaOrigenElementos={this.state.itemsListas.listaIdentidad}
                                      nombreControl={this.controlesPagina.cmbIdentidad}
                                      propiedadMostrar={'Title'}
                                      esDeshabilitado={true}
                                    />
                                  }

                                </div>
                              </div>

                              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div className="form-group">
                                  <label className="text-label">
                                    Validación de Lavado:{" "}
                                  </label>
                                  {
                                    this.state.Campos.EstadoTexto === "Pendiente" &&
                                    <ControlSelect
                                      cantidadElementosSeleccionables={1}
                                      elementoSeleccionado={this.state.Campos.CmbLavado}
                                      eventoChange={this.eventoChangeCombos}
                                      habilitarBuscador={true}
                                      listaOrigenElementos={this.state.itemsListas.listaLavado}
                                      nombreControl={this.controlesPagina.cmbLavado}
                                      propiedadMostrar={'Title'}
                                    />
                                  }
                                  {
                                    this.state.Campos.EstadoTexto !== "Pendiente" &&
                                    <ControlSelect
                                      cantidadElementosSeleccionables={1}
                                      elementoSeleccionado={this.state.Campos.CmbLavado}
                                      eventoChange={this.eventoChangeCombos}
                                      habilitarBuscador={true}
                                      listaOrigenElementos={this.state.itemsListas.listaLavado}
                                      nombreControl={this.controlesPagina.cmbLavado}
                                      propiedadMostrar={'Title'}
                                      esDeshabilitado={true}
                                    />
                                  }


                                </div>
                              </div>

                              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div className="form-group">
                                  <label className="text-label">
                                    Estado:{" "}
                                  </label>
                                  {
                                    this.state.Campos.EstadoTexto === "Pendiente" &&
                                    <ControlSelect
                                      cantidadElementosSeleccionables={1}
                                      elementoSeleccionado={this.state.Campos.Estado}
                                      eventoChange={this.eventoChangeCombos}
                                      habilitarBuscador={true}
                                      listaOrigenElementos={this.state.itemsListas.listaEstado}
                                      nombreControl={this.controlesPagina.cmbEstado}
                                      propiedadMostrar={'Title'}
                                    />
                                  }
                                  {
                                    this.state.Campos.EstadoTexto !== "Pendiente" && this.state.Permiso.esUsuario &&
                                    <ControlSelect
                                      cantidadElementosSeleccionables={1}
                                      elementoSeleccionado={this.state.Campos.Estado}
                                      eventoChange={this.eventoChangeCombos}
                                      habilitarBuscador={true}
                                      listaOrigenElementos={this.state.itemsListas.listaEstado}
                                      nombreControl={this.controlesPagina.cmbEstado}
                                      propiedadMostrar={'Title'}
                                      esDeshabilitado={true}
                                    />
                                  }

                                  {
                                    this.state.Campos.EstadoTexto !== "Pendiente" && this.state.Permiso.esAdministrador &&
                                    <ControlSelect
                                      cantidadElementosSeleccionables={1}
                                      elementoSeleccionado={this.state.Campos.Estado}
                                      eventoChange={this.eventoChangeCombos}
                                      habilitarBuscador={true}
                                      listaOrigenElementos={this.state.itemsListas.listaEstado}
                                      nombreControl={this.controlesPagina.cmbEstado}
                                      propiedadMostrar={'Title'}
                                    />
                                  }

                                </div>
                              </div>



                            </div>

                          </div>

                          <div className="well ">
                            <div className="row">
                              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div className="form-group">
                                  <label className="text-label">
                                    Evidencias:{" "}
                                  </label>
                                  {
                                    this.state.Campos.EstadoTexto === "Pendiente" &&

                                    <ControlCargarArchivos
                                      claseContenedor="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb10"
                                      eventoChange={this.eventoChangeCargarArchivos}
                                      esMultiple={true}
                                      esObligatorio={false}
                                      esHabilitado={true}
                                      nombreControl="caArchivos"
                                      etiquetaControl=""
                                      etiquetaBotonAdjuntarArchivo="Adjuntar Archivo"
                                      extensionesNoPermitidas={""}
                                      tamanoMaximoArchivosEnMegas={3}
                                      listaArchivos={this.state.Campos.listaArchivos}
                                      ref={this.childrenControlCargarArchivos}

                                    />

                                  }
                                  {
                                    this.state.Campos.EstadoTexto !== "Pendiente" &&
                                    this.state.Campos.listaArchivos !== undefined &&
                                    this.state.Campos.listaArchivos.filter(itemarchivo => {
                                      return itemarchivo.Eliminado === false && itemarchivo.ID > 0;
                                    }).map((itemArchivoTarea, i5) => (

                                      <div className="checkcolor4">
                                        <label className="labeladjunto"><a href={Util.obtenerUrlDescarga(itemArchivoTarea.Ruta)}>{itemArchivoTarea.Nombre}</a></label>
                                      </div>
                                    ))
                                  }


                                </div>
                              </div>

                            </div>

                          </div>



                        </div>


                        <div id="tres" className="tab-pane">
                          <div className="well well-lg">
                            <div className="row">
                              <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 mt20">
                                <ul className="timeline" >

                                  {this.state.Campos.Actividad.map((item, i) => (

                                    <li>
                                      <p className="timeline-date">{Util.mostrarFechaHoraNew(item.FechaRegistro)}</p>
                                      <div className="timeline-content">
                                        <div className=" mb10">

                                          <div className="comentbor ta-content">
                                            <div id="largo" className="text-comment ta-largo">
                                              <p className="text-name2">
                                                {item.Detalle}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="col-md-12 bgfile">
                                            {
                                              this.state.Campos.Actividad.length - 1 === i &&
                                              <div className="ttcod2">{this.state.Campos.Nombre}</div>
                                            }
                                            {
                                              this.state.Campos.Actividad.length - 1 !== i &&
                                              <div className="ttcod2">{item.UsuarioRegistro.Title}</div>
                                            }

                                          </div>
                                          <div className="clearfix" />
                                        </div>
                                      </div>
                                    </li>
                                  ))
                                  }
                                </ul>

                              </div>
                            </div>

                            <div className="clearfix" />
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {super.render()}
      </div>

    );
  };
}
export default PaginaRegistrarIncidencia;   