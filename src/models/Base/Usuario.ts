export default class Usuario {
  public ID: number;
  public Title: string;
  public Email: string;

  constructor() {
    this.ID = 0;
    this.Title = "";
    this.Email = "";
  }

  public setearValores(id: number, title: string, email: string) {
    this.ID = id;
    this.Title = title;
    this.Email = email;
  }

  public setearValoresConRest(elementoItemLista: any): void {
    this.ID = elementoItemLista.ID;
    this.Title = elementoItemLista.Title;
    this.Email = elementoItemLista.EMail;
  }
}
