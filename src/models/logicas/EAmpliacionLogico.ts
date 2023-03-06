import { ParametrosNoAdministrables } from '../../genericos/VariablesGlobales';

export default class EExpedienteLogico {

  public static getValoresNuevaAmpliacion(comentarioSolicitud: string,
    expedienteId: number,
    fechaNuevoPlazo: Date,
    fechaPlazoActual: Date,
    usuarioRegistroId: number,
  ) {
    return {
      ComentarioSolicitud: comentarioSolicitud,
      EstadoSolicitudAmpliacion: ParametrosNoAdministrables.ModuloDirectivas.ValoresEstadosAmpliacion.EstadoPorValidar,
      ExpedienteId: expedienteId,
      FechaNuevoPlazo: fechaNuevoPlazo,
      FechaPlazoActual: fechaPlazoActual,
      FechaRegistro: new Date(),
      UsuarioRegistroId: usuarioRegistroId
    }
  }

  public static getValoresAprobarAmpliacion(
    fechaPlazoOtorgado: Date,
    usuarioRegistroId: number,
  ) {
    return {
      EstadoSolicitudAmpliacion: ParametrosNoAdministrables.ModuloDirectivas.ValoresEstadosAmpliacion.EstadoAceptada,
      FechaNuevoPlazoOtorgado: fechaPlazoOtorgado,
      FechaHoraValidacion: new Date(),
      UsuarioValidacionId: usuarioRegistroId
    }
  }

  public static getValoresRechazarAmpliacion(
    usuarioRegistroId: number,
  ) {
    return {
      EstadoSolicitudAmpliacion: ParametrosNoAdministrables.ModuloDirectivas.ValoresEstadosAmpliacion.EstadoRechazada,
      FechaHoraValidacion: new Date(),
      UsuarioValidacionId: usuarioRegistroId
    }
  }

  public static getValoresAmpliacionDirecta(
    expedienteId: number,
    comentarioSolicitud: string,
    fechaPlazoActual: Date,
    fechaPlazoOtorgado: Date,
    usuarioRegistroId: number,
  ) {
    return {
      ComentarioSolicitud: comentarioSolicitud,
      EstadoSolicitudAmpliacion: ParametrosNoAdministrables.ModuloDirectivas.ValoresEstadosAmpliacion.EstadoRegistroDirecto,
      ExpedienteId: expedienteId,
      FechaHoraValidacion: new Date(),
      FechaNuevoPlazo: fechaPlazoOtorgado,
      FechaNuevoPlazoOtorgado: fechaPlazoOtorgado,
      FechaPlazoActual: fechaPlazoActual,
      FechaRegistro: new Date(),
      UsuarioRegistroId: usuarioRegistroId,
      UsuarioValidacionId: usuarioRegistroId
    }
  }

  public ComentarioSolicitud: string;
  public EstadoSolicitudAmpliacion: string;
  public ExpedienteId: number;
  public FechaHoraValidacion: Date;
  public FechaNuevoPlazo: Date;
  public FechaNuevoPlazoOtorgado: Date;
  public FechaPlazoActual: Date;
  public FechaRegistro: Date;
  public UsuarioRegistroId: number;
  public UsuarioValidacionId: number;

  constructor() {
    this.ComentarioSolicitud = "";
    this.EstadoSolicitudAmpliacion = "";
    this.ExpedienteId = 0;
    this.FechaHoraValidacion = new Date();
    this.FechaNuevoPlazo = new Date();
    this.FechaNuevoPlazoOtorgado = new Date();
    this.FechaPlazoActual = new Date();
    this.FechaRegistro = new Date();
    this.UsuarioRegistroId = 0;
    this.UsuarioValidacionId = 0;
  }

}
