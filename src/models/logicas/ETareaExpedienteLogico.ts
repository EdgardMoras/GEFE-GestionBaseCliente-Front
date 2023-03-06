import { ParametrosNoAdministrables } from '../../genericos/VariablesGlobales';

export default class ETareaExpedienteLogico {

  public static getValoresNuevaTarea(
    codigo: string,
    expedienteId: number,
    fechaLimite: Date,
    solicitud: string,
    responsableId: number,
    usuarioRegistroId: number,
  ) {
    return {
      Codigo: codigo,
      EstadoElemento: ParametrosNoAdministrables.ValoresEstadosElemento.Activo,
      EstadoTarea: ParametrosNoAdministrables.ModuloDirectivas.ValoresTareas.Pendiente,
      ExpedienteId: expedienteId,
      FechaLimite: fechaLimite,
      FechaRegistro: new Date(),
      Solicitud: solicitud,
      ResponsableId: responsableId,
      UsuarioRegistroId: usuarioRegistroId
    }
  }

  public static getValoresEditarTarea(
    fechaLimite: Date,
    solicitud: string,
    responsableId: number,
  ) {
    return {
      FechaLimite: fechaLimite,
      Solicitud: solicitud,
      ResponsableId: responsableId,
    }
  }

  public static getValoresAtenderTarea() {
    return {
      FechaAtencion: new Date(),
      EstadoTarea: ParametrosNoAdministrables.ModuloDirectivas.ValoresTareas.Finalizado,
    }
  }

  public Codigo: string;
  public EstadoElemento: string;
  public EstadoTarea: string;
  public ExpedienteId: number;
  public FechaAtencion: Date;
  public FechaLimite: Date;
  public FechaRegistro: Date;
  public ResponsableId: number;
  public Solicitud: string;
  public UsuarioRegistroId: number;
}
