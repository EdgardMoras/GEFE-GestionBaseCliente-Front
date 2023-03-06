
export default class EAlertaExpedientes {

  public static getValoresAlertaDirectiva(
    cantidad: number,
    tipoCondicionAlerta: string,
    esNotificarTodosResponsables: boolean,
    esExcluirVP: boolean,
    esExcluirVPE: boolean,
  ) {
    return {
      Cantidad: cantidad,
      TipoCondicionAlerta: tipoCondicionAlerta,
      EsNotificarTodosResponsables: esNotificarTodosResponsables,
      EsExcluirVP: esExcluirVP,
      EsExcluirVPE: esExcluirVPE,
    }
  }


  public static getValoresAlertaNoDirectiva(
    cantidad: number,
    esNotificarTodosResponsables: boolean,
    esExcluirVP: boolean,
    esExcluirVPE: boolean,
  ) {
    return {
      Cantidad: cantidad,
      EsNotificarTodosResponsables: esNotificarTodosResponsables,
      EsExcluirVP: esExcluirVP,
      EsExcluirVPE: esExcluirVPE,
    }
  }

}
