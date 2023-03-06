import Util from "src/genericos/Util";

export default class EFeriado {
  public ID: number;
  public Title: string;
  public Fecha: Date;

  constructor() {
    this.ID = 0;
    this.Title = "";
    this.Fecha = new Date();
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = elementoItemLista.ID;
    this.Title = Util.ObtenerTexto(elementoItemLista.Title);
    this.Fecha = Util.ConvertirStringToDate(elementoItemLista.Fecha);
  }
}
