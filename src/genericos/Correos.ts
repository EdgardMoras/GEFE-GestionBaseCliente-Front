import { RestFiltros } from "src/genericos/RestFiltros";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import Funciones from "src/genericos/Funciones";
import EPlantillaCorreo from "src/models/fisicas/EPlantillaCorreo";
import { Deferred } from "ts-deferred";
import EEnvioCorreo from "../models/fisicas/EEnvioCorreo";
export class Correos {
  public static ParametrosCorreo = {
    Detalle: "[DetalleProyecto]",
    Responsable: "[Responsables]",
    Usuarios: "[Usuarios]",
    Codigo: "[CodigoProyecto]",
    CodigoObservacion: "[CodigoObs]",
    NivelRiesgo: "[NRiesgo]",
    TipoRiesgo: "[TRiesgo]",
    CodigoRecomendacion: "[CodigoRecomendacion]",
    CodigoPlanAccion: "[CodigoPlanAccion]",

    CodigoSolicitud: "[CodigoSolicitud]",
    TipoSolicitud: "[TipoSolicitud]",
    Usuario: "[Usuario]",
    Url: "[URL]",
    CodigoSolicitudUrl: "[CodigoSolicitudUrl]",
    Observacion: "[Observacion]",


    // Extraibles
    MotivoSolicitud: "[MotivoSolicitud]",
    TipoAcceso: "[TipoAcceso]",
    HostName: "[Hostname]",
    FechaInicioAcceso: "[FechaInicioAcceso]",
    FechaFinAcceso: "[FechaFinAcceso]",

    // Fin Extraibles

    // ERI

    TipoConexion: "[TipoConexion]",
    Nombre: "[Nombre]",
    Empresa: "[Empresa]",
    Cargo: "[Cargo]",
    Correo: "[Correo]",


    // Fin ERI

    // CRE

    // Fin CRE

    // VPN
    TipoConectividad: "[TipoConectividad]",
    // Fin VPN

    // SAP
    Sistema: "[Sistema]",
    DatosBeneficiario: "[DatosBeneficiario]",
    Roles: "[Roles]",

    // Fin SAP
    // AIT
    Plataforma: "[Plataforma]",
    TipoAccesoAIT: "[TipoAcceso]",
    Ambiente: "[Ambiente]",
    TipoPerfil: "[TipoPerfil]",
    TiempoAcceso: "[TiempoAcceso]",
    // FIN AIT

  };

  public static getUrlTenant() {
    return ParametrosNoAdministrables.ValoresGenericos.urlDescarga;
  }
  public static async obtenerPlantillaCorreoPorTitulo(tituloPlantillaCorreo: string, tipoSolicitud: string) {
    const dfd: Deferred<EPlantillaCorreo> = new Deferred<EPlantillaCorreo>();

    const filtroPorTituloYEstadoActivo: string = RestFiltros.obtenerFiltroPorTituloYEstadoActivo(tituloPlantillaCorreo, tipoSolicitud);

    const url: string = String.format(ParametrosNoAdministrables.RestEstructuras.SelectFilter, ParametrosNoAdministrables.Listas.PlatillaCorreos, EPlantillaCorreo.ListaCampos.join(","), filtroPorTituloYEstadoActivo);

    Funciones.ObtenerElementoPorRest(url)
      .then(resultado => {
        if (resultado.length === 0) {
          Funciones.GuardarExcepcion("obtenerPlantillaCorreoPorTitulo:" + ParametrosNoAdministrables.ModuloDirectivas.Correos.NuevoExpediente, ParametrosNoAdministrables.Mensajes.noSeEncontroPlantillaCorreo);

          dfd.reject();
          return;
        }

        const plantillaCorreo = new EPlantillaCorreo();
        plantillaCorreo.setearValoresRest(resultado[0]);

        dfd.resolve(plantillaCorreo);
      })
      .catch(error => {
        Funciones.GuardarExcepcion("obtenerPlantillaCorreoPorTitulo:" + tituloPlantillaCorreo, error);

        dfd.reject();
      });

    return dfd.promise;
  }

  public static async enviarCorreoNuevoProyecto(codigo: string, detalle: string, usuario: string, usuarioEnvio: string, usuarioCopia: string, usuarioregistro: number[]) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo;

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, ""));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.Codigo, valor: codigo },
          { etiqueta: this.ParametrosCorreo.Detalle, valor: detalle },
          // { etiqueta: this.ParametrosCorreo.Usuarios, valor: usuario },
          // { etiqueta: this.ParametrosCorreo.Responsable, valor: usuario },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, "");

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoNuevoObservacion(codigo: string, codigoObs: string, NivelRiesgo: string, TipoRiesgo: string, usuarioEnvio: string, usuarioCopia: string, usuarioregistro: number[]) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = ParametrosNoAdministrables.ModuloNormas.Correos.ObservacionNuevo;

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, ""));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.Codigo, valor: codigo },
          { etiqueta: this.ParametrosCorreo.CodigoObservacion, valor: codigoObs },
          { etiqueta: this.ParametrosCorreo.NivelRiesgo, valor: NivelRiesgo },
          { etiqueta: this.ParametrosCorreo.TipoRiesgo, valor: TipoRiesgo },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, "");

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }


  public static async enviarCorreoEdicionObservacion(codigo: string, codigoObs: string, NivelRiesgo: string, TipoRiesgo: string, usuarioEnvio: string, usuarioCopia: string, usuarioregistro: number[]) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = ParametrosNoAdministrables.ModuloNormas.Correos.ObservacionEditar;

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, ""));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.Codigo, valor: codigo },
          { etiqueta: this.ParametrosCorreo.CodigoObservacion, valor: codigoObs },
          { etiqueta: this.ParametrosCorreo.NivelRiesgo, valor: NivelRiesgo },
          { etiqueta: this.ParametrosCorreo.TipoRiesgo, valor: TipoRiesgo },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, "");

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEditarProyecto(codigo: string, detalle: string, usuario: string, usuarioEnvio: string, usuarioCopia: string, usuarioregistro: number[]) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoEditar;

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, ""));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.Codigo, valor: codigo },
          { etiqueta: this.ParametrosCorreo.Detalle, valor: detalle },
          { etiqueta: this.ParametrosCorreo.Usuarios, valor: usuario },
          { etiqueta: this.ParametrosCorreo.Responsable, valor: usuario },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, "");

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoNuevoRecomendacion(codigo: string, codigoObs: string, codigoRecomenacion: string, usuarioResponsable: string, usuarioEnvio: string, usuarioCopia: string, usuarioregistro: number[]) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = ParametrosNoAdministrables.ModuloNormas.Correos.RecomendacionNuevo;

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, ""));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.Codigo, valor: codigo },
          { etiqueta: this.ParametrosCorreo.CodigoObservacion, valor: codigoObs },
          { etiqueta: this.ParametrosCorreo.CodigoRecomendacion, valor: codigoRecomenacion },
          { etiqueta: this.ParametrosCorreo.Responsable, valor: usuarioResponsable },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, "");

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEditarRecomendacion(codigo: string, codigoObs: string, codigoRecomenacion: string, usuarioResponsable: string, usuarioEnvio: string, usuarioCopia: string, usuarioregistro: number[]) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = ParametrosNoAdministrables.ModuloNormas.Correos.RecomendacionEditar;

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, ""));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.Codigo, valor: codigo },
          { etiqueta: this.ParametrosCorreo.CodigoObservacion, valor: codigoObs },
          { etiqueta: this.ParametrosCorreo.CodigoRecomendacion, valor: codigoRecomenacion },
          { etiqueta: this.ParametrosCorreo.Responsable, valor: usuarioResponsable },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, "");

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }


  public static async enviarCorreoNuevoPlanAccion(codigo: string, codigoObs: string, codigoRecomenacion: string, usuarioResponsable: string, usuarioEnvio: string, usuarioCopia: string, usuarioregistro: number[], codigoPA: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = ParametrosNoAdministrables.ModuloNormas.Correos.PlanAccionNuevo;

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, ""));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.Codigo, valor: codigo },
          { etiqueta: this.ParametrosCorreo.CodigoObservacion, valor: codigoObs },
          { etiqueta: this.ParametrosCorreo.CodigoRecomendacion, valor: codigoRecomenacion },
          { etiqueta: this.ParametrosCorreo.Responsable, valor: usuarioResponsable },
          { etiqueta: this.ParametrosCorreo.CodigoPlanAccion, valor: codigoPA },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, "");

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEditarPlanAccion(codigo: string, codigoObs: string, codigoRecomenacion: string, usuarioResponsable: string, usuarioEnvio: string, usuarioCopia: string, usuarioregistro: number[], codigoPA: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = ParametrosNoAdministrables.ModuloNormas.Correos.PlanAccionEditar;

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, ""));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.Codigo, valor: codigo },
          { etiqueta: this.ParametrosCorreo.CodigoObservacion, valor: codigoObs },
          { etiqueta: this.ParametrosCorreo.CodigoRecomendacion, valor: codigoRecomenacion },
          { etiqueta: this.ParametrosCorreo.Responsable, valor: usuarioResponsable },
          { etiqueta: this.ParametrosCorreo.CodigoPlanAccion, valor: codigoPA },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, "");

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }


  public static async enviarCorreoIniciarImplementacion(codigo: string, codigoObs: string, codigoRecomenacion: string, usuarioResponsable: string, usuarioEnvio: string, usuarioCopia: string, usuarioregistro: number[], codigoPA: string) {
    const dfd: Deferred<string> = new Deferred<string>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = ParametrosNoAdministrables.ModuloNormas.Correos.IniciarImplementacion;

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, ""));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.Codigo, valor: codigo },
          { etiqueta: this.ParametrosCorreo.CodigoObservacion, valor: codigoObs },
          { etiqueta: this.ParametrosCorreo.CodigoRecomendacion, valor: codigoRecomenacion },
          { etiqueta: this.ParametrosCorreo.Responsable, valor: usuarioResponsable },
          { etiqueta: this.ParametrosCorreo.CodigoPlanAccion, valor: codigoPA },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, "");

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve("ok");
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioGerenciaSolicitanteERI(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    motivoSolicitud: string, tipoConexion: string, nombre: string, empresa: string, cargo: string, correo: string, hostname: string, fechainicioacceso: string, fechafinacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Gerencia Solicitante";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoConexion, valor: tipoConexion },
          { etiqueta: this.ParametrosCorreo.Nombre, valor: nombre },
          { etiqueta: this.ParametrosCorreo.Empresa, valor: empresa },
          { etiqueta: this.ParametrosCorreo.Cargo, valor: cargo },
          { etiqueta: this.ParametrosCorreo.Correo, valor: correo },
          { etiqueta: this.ParametrosCorreo.HostName, valor: hostname },
          { etiqueta: this.ParametrosCorreo.FechaInicioAcceso, valor: fechainicioacceso },
          { etiqueta: this.ParametrosCorreo.FechaFinAcceso, valor: fechafinacceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudExternoRedInterna.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }


  public static async enviarCorreoEnvioGerenciaSolicitante(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Gerencia Solicitante";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudExternoRedInterna.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioAprobacionGerenciaSolicitanteERI(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    motivoSolicitud: string, tipoConexion: string, nombre: string, empresa: string, cargo: string, correo: string, hostname: string, fechainicioacceso: string, fechafinacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a analista seguridad";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoConexion, valor: tipoConexion },
          { etiqueta: this.ParametrosCorreo.Nombre, valor: nombre },
          { etiqueta: this.ParametrosCorreo.Empresa, valor: empresa },
          { etiqueta: this.ParametrosCorreo.Cargo, valor: cargo },
          { etiqueta: this.ParametrosCorreo.Correo, valor: correo },
          { etiqueta: this.ParametrosCorreo.HostName, valor: hostname },
          { etiqueta: this.ParametrosCorreo.FechaInicioAcceso, valor: fechainicioacceso },
          { etiqueta: this.ParametrosCorreo.FechaFinAcceso, valor: fechafinacceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudExternoRedInterna.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioAprobacionGerenciaSolicitante(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a analista seguridad";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudExternoRedInterna.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioRechazoGerenciaSolicitante(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string, observacion: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Registrado";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Observacion, valor: observacion },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudExternoRedInterna.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioRechazoGerenciaSolicitanteERI(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string, observacion: string, motivoSolicitud: string, tipoConexion: string, nombre: string, empresa: string, cargo: string, correo: string, hostname: string, fechainicioacceso: string, fechafinacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Registrado";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoConexion, valor: tipoConexion },
          { etiqueta: this.ParametrosCorreo.Nombre, valor: nombre },
          { etiqueta: this.ParametrosCorreo.Empresa, valor: empresa },
          { etiqueta: this.ParametrosCorreo.Cargo, valor: cargo },
          { etiqueta: this.ParametrosCorreo.Correo, valor: correo },
          { etiqueta: this.ParametrosCorreo.HostName, valor: hostname },
          { etiqueta: this.ParametrosCorreo.FechaInicioAcceso, valor: fechainicioacceso },
          { etiqueta: this.ParametrosCorreo.FechaFinAcceso, valor: fechafinacceso },
          { etiqueta: this.ParametrosCorreo.Observacion, valor: observacion },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudExternoRedInterna.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioRechazado(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string, observacion: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Rechazado";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Observacion, valor: observacion },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.Paginas.DetalleSolicitudExternoRedInterna.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioRechazadoERI(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string, motivoSolicitud: string, tipoConexion: string, nombre: string, empresa: string, cargo: string, correo: string, hostname: string, fechainicioacceso: string, fechafinacceso: string, observacion: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Rechazado";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoConexion, valor: tipoConexion },
          { etiqueta: this.ParametrosCorreo.Nombre, valor: nombre },
          { etiqueta: this.ParametrosCorreo.Empresa, valor: empresa },
          { etiqueta: this.ParametrosCorreo.Cargo, valor: cargo },
          { etiqueta: this.ParametrosCorreo.Correo, valor: correo },
          { etiqueta: this.ParametrosCorreo.HostName, valor: hostname },
          { etiqueta: this.ParametrosCorreo.FechaInicioAcceso, valor: fechainicioacceso },
          { etiqueta: this.ParametrosCorreo.FechaFinAcceso, valor: fechafinacceso },
          { etiqueta: this.ParametrosCorreo.Observacion, valor: observacion },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.Paginas.DetalleSolicitudExternoRedInterna.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioAprobacionAnalistaSeguridadERI(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    motivoSolicitud: string, tipoConexion: string, nombre: string, empresa: string, cargo: string, correo: string, hostname: string, fechainicioacceso: string, fechafinacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Oficial Seguridad";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoConexion, valor: tipoConexion },
          { etiqueta: this.ParametrosCorreo.Nombre, valor: nombre },
          { etiqueta: this.ParametrosCorreo.Empresa, valor: empresa },
          { etiqueta: this.ParametrosCorreo.Cargo, valor: cargo },
          { etiqueta: this.ParametrosCorreo.Correo, valor: correo },
          { etiqueta: this.ParametrosCorreo.HostName, valor: hostname },
          { etiqueta: this.ParametrosCorreo.FechaInicioAcceso, valor: fechainicioacceso },
          { etiqueta: this.ParametrosCorreo.FechaFinAcceso, valor: fechafinacceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudExternoRedInterna.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioAprobacionAnalistaSeguridad(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Oficial Seguridad";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudExternoRedInterna.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }
  public static async enviarCorreoEnvioAprobacionOficialSeguridadERI(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    motivoSolicitud: string, tipoConexion: string, nombre: string, empresa: string, cargo: string, correo: string, hostname: string, fechainicioacceso: string, fechafinacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Mesa de Ayuda";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoConexion, valor: tipoConexion },
          { etiqueta: this.ParametrosCorreo.Nombre, valor: nombre },
          { etiqueta: this.ParametrosCorreo.Empresa, valor: empresa },
          { etiqueta: this.ParametrosCorreo.Cargo, valor: cargo },
          { etiqueta: this.ParametrosCorreo.Correo, valor: correo },
          { etiqueta: this.ParametrosCorreo.HostName, valor: hostname },
          { etiqueta: this.ParametrosCorreo.FechaInicioAcceso, valor: fechainicioacceso },
          { etiqueta: this.ParametrosCorreo.FechaFinAcceso, valor: fechafinacceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlServicio + "/api/pdf/ERI/" + idSolicitud.toString() },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioAprobacionOficialSeguridad(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Mesa de Ayuda";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlServicio + "/api/pdf/ERI/" + idSolicitud.toString() },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioGerenciaSolicitanteExtraible(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    MotivoSolicitud: string, TipoAcceso: string, HostName: string, FechaInicioAcceso: string, FechaFinAcceso: string
  ) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Gerencia Solicitante";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: MotivoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: TipoAcceso },
          { etiqueta: this.ParametrosCorreo.HostName, valor: HostName },
          { etiqueta: this.ParametrosCorreo.FechaInicioAcceso, valor: FechaInicioAcceso },
          { etiqueta: this.ParametrosCorreo.FechaFinAcceso, valor: FechaFinAcceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudExtraible.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioAprobacionGerenciaSolicitanteExtraible(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    MotivoSolicitud: string, TipoAcceso: string, HostName: string, FechaInicioAcceso: string, FechaFinAcceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Oficial Seguridad";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: MotivoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: TipoAcceso },
          { etiqueta: this.ParametrosCorreo.HostName, valor: HostName },
          { etiqueta: this.ParametrosCorreo.FechaInicioAcceso, valor: FechaInicioAcceso },
          { etiqueta: this.ParametrosCorreo.FechaFinAcceso, valor: FechaFinAcceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudExtraible.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioRechazoGerenciaSolicitanteExtraible(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    MotivoSolicitud: string, TipoAcceso: string, HostName: string, FechaInicioAcceso: string, FechaFinAcceso: string, observacion: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Registrado";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: MotivoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: TipoAcceso },
          { etiqueta: this.ParametrosCorreo.HostName, valor: HostName },
          { etiqueta: this.ParametrosCorreo.FechaInicioAcceso, valor: FechaInicioAcceso },
          { etiqueta: this.ParametrosCorreo.FechaFinAcceso, valor: FechaFinAcceso },
          { etiqueta: this.ParametrosCorreo.Observacion, valor: observacion },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudExtraible.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioRechazadoExtraible(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    MotivoSolicitud: string, TipoAcceso: string, HostName: string, FechaInicioAcceso: string, FechaFinAcceso: string, observacion: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Rechazado";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: MotivoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: TipoAcceso },
          { etiqueta: this.ParametrosCorreo.HostName, valor: HostName },
          { etiqueta: this.ParametrosCorreo.FechaInicioAcceso, valor: FechaInicioAcceso },
          { etiqueta: this.ParametrosCorreo.FechaFinAcceso, valor: FechaFinAcceso },
          { etiqueta: this.ParametrosCorreo.Observacion, valor: observacion },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudExtraible.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioAprobacionOficialSeguridadExtraible(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string, MotivoSolicitud: string, TipoAcceso: string, HostName: string, FechaInicioAcceso: string, FechaFinAcceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Mesa de Ayuda";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: MotivoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: TipoAcceso },
          { etiqueta: this.ParametrosCorreo.HostName, valor: HostName },
          { etiqueta: this.ParametrosCorreo.FechaInicioAcceso, valor: FechaInicioAcceso },
          { etiqueta: this.ParametrosCorreo.FechaFinAcceso, valor: FechaFinAcceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlServicio + "/api/pdf/USB/" + idSolicitud.toString() },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }


  public static async enviarCorreoEnvioGerenciaSolicitanteVPN(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string, motivo: string, tipoconectividad: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Gerencia Solicitante";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivo },
          { etiqueta: this.ParametrosCorreo.TipoConectividad, valor: tipoconectividad },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudVPN.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioAprobacionGerenciaSolicitanteVPN(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string, motivo: string, tipoconectividad: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Oficial Seguridad";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivo },
          { etiqueta: this.ParametrosCorreo.TipoConectividad, valor: tipoconectividad },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudVPN.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioRechazoGerenciaSolicitanteVPN(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string, motivo: string, tipoconectividad: string, observacion: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Registrado";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivo },
          { etiqueta: this.ParametrosCorreo.TipoConectividad, valor: tipoconectividad },
          { etiqueta: this.ParametrosCorreo.Observacion, valor: observacion },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudVPN.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioRechazadoVPN(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string, motivo: string, tipoconectividad: string, observacion: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Rechazado";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Observacion, valor: observacion },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivo },
          { etiqueta: this.ParametrosCorreo.TipoConectividad, valor: tipoconectividad },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudVPN.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioAprobacionOficialSeguridadVPN(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string, motivo: string, tipoconectividad: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Mesa de Ayuda";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivo },
          { etiqueta: this.ParametrosCorreo.TipoConectividad, valor: tipoconectividad },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlServicio + "/api/pdf/VPN/" + idSolicitud.toString() },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioGerenciaSolicitanteCRE(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    motivosolicitud: string, tipoacceso: string, hostname: string, fechainicioacceso: string, fechafinacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Gerencia Solicitante";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivosolicitud },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.FechaInicioAcceso, valor: fechainicioacceso },
          { etiqueta: this.ParametrosCorreo.FechaFinAcceso, valor: fechafinacceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudCuentaExterno.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioAprobacionGerenciaSolicitanteCRE(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    motivosolicitud: string, tipoacceso: string, hostname: string, fechainicioacceso: string, fechafinacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Oficial Seguridad";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivosolicitud },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.FechaInicioAcceso, valor: fechainicioacceso },
          { etiqueta: this.ParametrosCorreo.FechaFinAcceso, valor: fechafinacceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudCuentaExterno.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioRechazoGerenciaSolicitanteCRE(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string, observacion: string
    , motivosolicitud: string, tipoacceso: string, hostname: string, fechainicioacceso: string, fechafinacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Registrado";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivosolicitud },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.FechaInicioAcceso, valor: fechainicioacceso },
          { etiqueta: this.ParametrosCorreo.FechaFinAcceso, valor: fechafinacceso },
          { etiqueta: this.ParametrosCorreo.Observacion, valor: observacion },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudCuentaExterno.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioRechazadoCRE(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string, observacion: string,
    motivosolicitud: string, tipoacceso: string, hostname: string, fechainicioacceso: string, fechafinacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Rechazado";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivosolicitud },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.FechaInicioAcceso, valor: fechainicioacceso },
          { etiqueta: this.ParametrosCorreo.FechaFinAcceso, valor: fechafinacceso },
          { etiqueta: this.ParametrosCorreo.Observacion, valor: observacion },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudCuentaExterno.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioAprobacionOficialSeguridadCRE(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    motivosolicitud: string, tipoacceso: string, hostname: string, fechainicioacceso: string, fechafinacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Mesa de Ayuda";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivosolicitud },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.FechaInicioAcceso, valor: fechainicioacceso },
          { etiqueta: this.ParametrosCorreo.FechaFinAcceso, valor: fechafinacceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlServicio + "/api/pdf/CRE/" + idSolicitud.toString() },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }


  public static async enviarCorreoEnvioGerenciaSolicitanteSAP(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    sistema: string, tipoacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Gerencia Solicitante";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Sistema, valor: sistema },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudSap.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioAnalistaSeguridadSAP(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    sistema: string, tipoacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Analista Seguridad";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Sistema, valor: sistema },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudSap.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoFaltaLicenciaSAP(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    sistema: string, tipoacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Falta Licencia";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Sistema, valor: sistema },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudSap.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoGestionLicenciaSAP(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    sistema: string, tipoacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Gestion de Licencia";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Sistema, valor: sistema },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudSap.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoGestionRolesSAP(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    sistema: string, tipoacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Gestion de Roles";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Sistema, valor: sistema },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudSap.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoRolesRegistradosSAP(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    sistema: string, tipoacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Roles Registrados";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Sistema, valor: sistema },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudSap.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnviadoOficialSeguridadSAP(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    sistema: string, tipoacceso: string, datosbeneficiario: string, roles: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Oficial Seguridad";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Sistema, valor: sistema },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.DatosBeneficiario, valor: datosbeneficiario },
          { etiqueta: this.ParametrosCorreo.Roles, valor: roles },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudSap.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoGestionUsuarioSAP(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    sistema: string, tipoacceso: string, datosbeneficiario: string, roles: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Gestion de Usuario";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Sistema, valor: sistema },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.DatosBeneficiario, valor: datosbeneficiario },
          { etiqueta: this.ParametrosCorreo.Roles, valor: roles },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudSap.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoAprobadoSAP(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    sistema: string, tipoacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Aprobado";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Sistema, valor: sistema },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudSap.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoRechazadoGerenteSolicitanteSAP(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    sistema: string, tipoacceso: string, observacion: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Registrado";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Sistema, valor: sistema },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.Observacion, valor: observacion },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudSap.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoRechazadoSAP(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string,
    sistema: string, tipoacceso: string, observacion: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Rechazado";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Sistema, valor: sistema },
          { etiqueta: this.ParametrosCorreo.TipoAcceso, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.Observacion, valor: observacion },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudExternoRedInterna.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }


  public static async enviarCorreoEnvioGerenciaSolicitanteAIT(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string, motivo: string, tipoconectividad: string,
    plataforma: string, tipoacceso: string, ambiente: string, tipoperfi: string, tiempoacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Gerencia Solicitante";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivo },

          { etiqueta: this.ParametrosCorreo.Plataforma, valor: plataforma },
          { etiqueta: this.ParametrosCorreo.TipoAccesoAIT, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.Ambiente, valor: ambiente },
          { etiqueta: this.ParametrosCorreo.TipoPerfil, valor: tipoperfi },
          { etiqueta: this.ParametrosCorreo.TiempoAcceso, valor: tiempoacceso },

          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudAIT.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioAprobacionGerenciaSolicitanteAIT(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string, motivo: string, tipoconectividad: string,
    plataforma: string, tipoacceso: string, ambiente: string, tipoperfi: string, tiempoacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Oficial Seguridad";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivo },

          { etiqueta: this.ParametrosCorreo.Plataforma, valor: plataforma },
          { etiqueta: this.ParametrosCorreo.TipoAccesoAIT, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.Ambiente, valor: ambiente },
          { etiqueta: this.ParametrosCorreo.TipoPerfil, valor: tipoperfi },
          { etiqueta: this.ParametrosCorreo.TiempoAcceso, valor: tiempoacceso },

          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudAIT.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioRechazoGerenciaSolicitanteAIT(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string, motivo: string, tipoconectividad: string, observacion: string,
    plataforma: string, tipoacceso: string, ambiente: string, tipoperfi: string, tiempoacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Registrado";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivo },

          { etiqueta: this.ParametrosCorreo.Plataforma, valor: plataforma },
          { etiqueta: this.ParametrosCorreo.TipoAccesoAIT, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.Ambiente, valor: ambiente },
          { etiqueta: this.ParametrosCorreo.TipoPerfil, valor: tipoperfi },
          { etiqueta: this.ParametrosCorreo.TiempoAcceso, valor: tiempoacceso },

          { etiqueta: this.ParametrosCorreo.Observacion, valor: observacion },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudAIT.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioRechazadoAIT(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string, motivo: string, tipoconectividad: string, observacion: string, plataforma: string, tipoacceso: string, ambiente: string, tipoperfi: string, tiempoacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Rechazado";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.Observacion, valor: observacion },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivo },
          { etiqueta: this.ParametrosCorreo.Plataforma, valor: plataforma },
          { etiqueta: this.ParametrosCorreo.TipoAccesoAIT, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.Ambiente, valor: ambiente },
          { etiqueta: this.ParametrosCorreo.TipoPerfil, valor: tipoperfi },
          { etiqueta: this.ParametrosCorreo.TiempoAcceso, valor: tiempoacceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.Paginas.DetalleSolicitudAIT.replace("[ID]", idSolicitud.toString()) },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }

  public static async enviarCorreoEnvioAprobacionOficialSeguridadAIT(idSolicitud: number, codigoSolicitud: string, tipoSolicitud: string, usuarioRegistro: string, usuarioEnvio: string, usuarioCopia: string, motivo: string, tipoconectividad: string,
    plataforma: string, tipoacceso: string, ambiente: string, tipoperfi: string, tiempoacceso: string) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const promesas: Array<Promise<EPlantillaCorreo>> = [];
    const nombrePlantilla = "Enviado a Mesa de Ayuda";

    promesas.push(this.obtenerPlantillaCorreoPorTitulo(nombrePlantilla, tipoSolicitud));

    Promise.all(promesas)
      .then(([plantillaReasignada]) => {
        const parametros = [
          { etiqueta: this.ParametrosCorreo.CodigoSolicitud, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.CodigoSolicitudUrl, valor: codigoSolicitud },
          { etiqueta: this.ParametrosCorreo.TipoSolicitud, valor: tipoSolicitud },
          { etiqueta: this.ParametrosCorreo.Usuario, valor: usuarioRegistro },
          { etiqueta: this.ParametrosCorreo.MotivoSolicitud, valor: motivo },
          { etiqueta: this.ParametrosCorreo.Plataforma, valor: plataforma },
          { etiqueta: this.ParametrosCorreo.TipoAccesoAIT, valor: tipoacceso },
          { etiqueta: this.ParametrosCorreo.Ambiente, valor: ambiente },
          { etiqueta: this.ParametrosCorreo.TipoPerfil, valor: tipoperfi },
          { etiqueta: this.ParametrosCorreo.TiempoAcceso, valor: tiempoacceso },
          { etiqueta: this.ParametrosCorreo.Url, valor: ParametrosNoAdministrables.ValoresGenericos.urlServicio + "/api/pdf/AIT/" + idSolicitud.toString() },
        ];

        let contenidoPlantilla = plantillaReasignada.ContenidoCorreo;

        const asuntoCorreo = plantillaReasignada.AsuntoCorreo;
        parametros.forEach(parametro => {
          contenidoPlantilla = contenidoPlantilla.replace(parametro.etiqueta, parametro.valor);
        });


        const envioCorreoCompartido = new EEnvioCorreo();
        envioCorreoCompartido.setearValoresCampos(asuntoCorreo, usuarioEnvio, usuarioCopia, contenidoPlantilla, idSolicitud.toString());

        const promesasEnvioCorreo: Array<Promise<string>> = [];
        promesasEnvioCorreo.push(Funciones.GuardarElemento("ADM_EnvioCorreo", envioCorreoCompartido.getValoresValoresCampos()));

        Promise.all(promesasEnvioCorreo)
          .then(([resultadoEnvioCorreoCompartido]) => {
            dfd.resolve(true);
          })
          .catch(error => {
            Funciones.GuardarExcepcion("enviarCorreoCompartirNorma:" + ParametrosNoAdministrables.ModuloNormas.Correos.ProyectoNuevo, error);
            dfd.reject(false);
          });
      })
      .catch((error: any) => {
        dfd.reject(false);
      });

    return dfd.promise;
  }




}