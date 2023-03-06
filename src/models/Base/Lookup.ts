export default class Lookup {
  public ID: number;
  public Title: string;

  constructor() {
    this.ID = 0;
    this.Title = "";
  }

  public setearValores(id: number, title: string) {
    this.ID = id;
    this.Title = title;
  }

  public setearValoresConRest(elementoItemLista: any): void {
    this.ID = elementoItemLista.ID;
    this.Title = elementoItemLista.Title;
  }
}
