import { ParametrosNoAdministrables } from '../../genericos/VariablesGlobales';

export default class ENotaExpedienteLogico {

  public static getValoresNuevaNota(
    nota: string,
    expedienteId: number,
    usuarioRegistroId: number,
  ) {
    return {
      EstadoElemento: ParametrosNoAdministrables.ValoresEstadosElemento.Activo,
      ExpedienteId: expedienteId,
      FechaRegistro: new Date(),
      Nota: nota,
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
}
