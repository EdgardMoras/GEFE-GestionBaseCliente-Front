import { EBaseEntidad } from "../Base/EBaseEntidad";

export default class EEmpresa extends EBaseEntidad {

  public static getValoresEmpresa(
    Title: string,
    EstadoElemento: boolean,
  ) {
    return {
      Title,
      EstadoElemento,
    }
  }

  constructor() {
    super();
  }



  public setearValoresConRest(elementoItemLista: any): void {
    this.ID = parseInt(elementoItemLista.ID, 10);
    this.Title = elementoItemLista.Title;
    this.EstadoElemento = elementoItemLista.EstadoElemento;
  }
}
