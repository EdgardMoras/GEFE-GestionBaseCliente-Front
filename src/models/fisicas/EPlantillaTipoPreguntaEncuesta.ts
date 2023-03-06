import Util from "src/genericos/Util";
import Lookup from "../Base/Lookup";

export default class EPlantillaTipoPreguntaEncuesta {
  public ID: number;
  public Respuesta: string;
  public Puntaje: any;
  public Orden: number;
  public TipoPregunta: Lookup;

  constructor() {
    this.ID = 0;
    this.Respuesta = "";
    this.Puntaje = "";
    this.Orden = 0;
    this.TipoPregunta = new Lookup();
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Respuesta = Util.ObtenerTexto(elementoItemLista.Respuesta);
    this.Puntaje = Util.ObtenerEntero(elementoItemLista.Puntaje);
    this.Orden = Util.ObtenerEntero(elementoItemLista.Orden);
    this.TipoPregunta = Util.ObtenerLookup(elementoItemLista.TipoPregunta);
  }
}
