import { ParametrosNoAdministrables } from '../../genericos/VariablesGlobales';

export default class ENotaNormaLogico {

  public static getValoresNuevaNota(
    nota: string,
    registroId: number,
    usuarioRegistroId: number,
  ) {
    return {
      EstadoElemento: ParametrosNoAdministrables.ValoresEstadosElemento.Activo,
      NormaId: registroId,
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
