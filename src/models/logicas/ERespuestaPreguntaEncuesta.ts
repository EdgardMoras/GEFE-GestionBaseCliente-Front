import Util from "src/genericos/Util";
import Lookup from "../Base/Lookup";

export default class ERespuestaPreguntaEncuesta {
  public ID: number;
  public Respuesta: string;
  public Puntaje: any;
  public Orden: number;
  public PreguntaEncuesta: Lookup;
  public Encuesta: Lookup;
  public Seleccionado: boolean;
  public Eliminar: boolean;

  constructor() {
    this.ID = 0;
    this.Respuesta = "";
    this.Puntaje = "";
    this.Orden = 0;
    this.PreguntaEncuesta = new Lookup();
    this.Encuesta = new Lookup();
    this.Seleccionado = false;
    this.Eliminar = false;
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Respuesta = Util.ObtenerTexto(elementoItemLista.Respuesta);
    this.Puntaje = Util.ObtenerEntero(elementoItemLista.Puntaje);
    this.Orden = Util.ObtenerEntero(elementoItemLista.Orden);
    this.PreguntaEncuesta = Util.ObtenerLookup(
      elementoItemLista.PreguntaEncuesta
    );
    this.Encuesta = Util.ObtenerLookup(elementoItemLista.Encuesta);
    this.Seleccionado = Util.ObtenerBoolean(elementoItemLista.Seleccionado);
  }
}
