import Util from "src/genericos/Util";

export default class EConfiguracionCreacionExpediente {
  public ID: number;
  public Frecuencia: string;
  public CantidadDias: any;
  public HabilitarOpciones: boolean;

  constructor() {
    this.ID = 0;
    this.Frecuencia = "";
    this.CantidadDias = 0;
    this.HabilitarOpciones = false;
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Frecuencia = Util.ObtenerTexto(elementoItemLista.Frecuencia);
    this.CantidadDias = Util.ObtenerEntero(elementoItemLista.CantidadDias);
  }
}
