
export default class EAlertaIncidente {

  public static getValoresAlertaIncidente(
    diasUtiles2: number,
    tipoVencimiento2: string,
    CopiaJefe2: boolean,
  ) {
    return {
      diasUtiles: diasUtiles2,
      TipoVencimiento: tipoVencimiento2,
      CopiaJefe: CopiaJefe2,
      
    }
  }
}
