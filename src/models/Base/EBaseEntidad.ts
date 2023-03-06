import BaseEntidad from "src/models/Base/BaseEntidad";
import Lookup from './Lookup';

export class EBaseEntidad extends BaseEntidad {


  public EstadoElemento: boolean;

  constructor() {
    super();
    this.EstadoElemento = false;
  }

  public inicializar(): void {
    throw new Error("Method not implemented.");
  }
  public setearValores(elementoItemLista: any) {
    throw new Error("No implementa el metodo setearValores");
  }
  public setearValoresConRest(elementoItemLista: any): void {
    throw new Error("Method not implemented.");
  }
  public setearValoresDesdeLookup(elementoLookup: Lookup) {
    if (!elementoLookup) {
      return;
    }

    this.ID = elementoLookup.ID;
    this.Title = elementoLookup.Title;
  }
}
