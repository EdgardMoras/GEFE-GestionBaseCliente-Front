import { ParametrosNoAdministrables } from '../../genericos/VariablesGlobales';

export default class ERegistroAsistenteLogico {

  public static getValoresNuevoAsistente(
    usuarioId: number,
    responsableId: number,
  ) {
    return {
      UsuarioId: usuarioId,
      ResponsableId: responsableId
    }
  }

  public UsuarioId: number;
  public ResponsableId: number;
  public EstadoElemento: string;

  constructor() {
    this.EstadoElemento = ParametrosNoAdministrables.ValoresEstadosElemento.Activo;
    this.UsuarioId = 0;
    this.ResponsableId = 0;
  }

}
