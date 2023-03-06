export interface IEntidad {
  setearValores: (elementoItemLista: any) => void;
}

export default abstract class BaseEntidad implements IEntidad {
  public ID: number;
  public Title: string;

  constructor() {
    this.ID = 0;
    this.Title = "";
  }

  public setearValoresItem(elementoItemLista: any) {
    this.ID = Number(elementoItemLista.ID);
    this.Title = elementoItemLista.Title;
  }

  public abstract setearValores(elementoItemLista: any): void;

  public abstract setearValoresConRest(elementoItemLista: any): void;
}
