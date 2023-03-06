import { EBaseEntidad } from "../Base/EBaseEntidad";

export default class EEntidad extends EBaseEntidad {

  public static getValoresEntidad(
    Title: string,
    EstadoElemento: string,
  ) {
    return {
      Title,
      EstadoElemento,
      ContentTypeId: "0x010060D16729C1639846B1B3CA3A2667EF7E03"
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
