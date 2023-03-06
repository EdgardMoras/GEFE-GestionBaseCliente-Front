import { ParametrosNoAdministrables } from '../../genericos/VariablesGlobales';

export default class ENotaTareaExpedienteLogico {

  public static getValoresNuevaNota(
    nota: string,
    expedienteId: number,
    tareaExpedienteId: number,
    usuarioRegistroId: number,
  ) {
    return {
      EstadoElemento: ParametrosNoAdministrables.ValoresEstadosElemento.Activo,
      ExpedienteId: expedienteId,
      FechaRegistro: new Date(),
      Nota: nota,
      TareaExpedienteId: tareaExpedienteId,
      UsuarioRegistroId: usuarioRegistroId
    }
  }

  public static getValoresEditarNota(
    nota: string,
  ) {
    return {
      Nota: nota,
    }
  }

  public Nota: string;
  public EstadoElemento: string;
  public ExpedienteId: number;
  public FechaRegistro: Date;
  public TareaExpedienteId: number;
  public UsuarioRegistroId: number;
}
