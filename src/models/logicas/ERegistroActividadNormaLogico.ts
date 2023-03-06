export default class ERegistroActividadNormaLogico {

  public static getValores(
    NormaId: number,
    Detalle: string,
    UsuarioRegistroId: number
  ) {
    return {
      NormaId,
      Detalle,
      UsuarioRegistroId,
      FechaRegistro: new Date()
    }
  }

}
