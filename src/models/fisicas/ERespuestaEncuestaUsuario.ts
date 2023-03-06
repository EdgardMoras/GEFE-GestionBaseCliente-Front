import Util from "src/genericos/Util";
import Lookup from "../Base/Lookup";

export default class ERespuestaEncuestaUsuario {
  public ID: number;
  public NombreUsuario: string;
  public CorreoElectronico: any;
  public Encuesta: Lookup;
  public OrdenPregunta: number;
  public PreguntaEncuesta: Lookup;
  public RespuestasPregunta: Lookup[];
  public Puntaje: number;

  constructor() {
    this.ID = 0;
    this.NombreUsuario = "";
    this.CorreoElectronico = "";
    this.Encuesta = new Lookup();
    this.OrdenPregunta = 0;
    this.PreguntaEncuesta = new Lookup();
    this.RespuestasPregunta = [];
    this.Puntaje = 0;
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.NombreUsuario = Util.ObtenerTexto(elementoItemLista.NombreUsuario);
    this.CorreoElectronico = Util.ObtenerTexto(
      elementoItemLista.CorreoElectronico
    );
    this.Encuesta = Util.ObtenerLookup(elementoItemLista.Encuesta);
    this.OrdenPregunta = Util.ObtenerEntero(
      elementoItemLista.PreguntaEncuesta_x003a_Orden
    );
    this.PreguntaEncuesta = Util.ObtenerLookup(
      elementoItemLista.PreguntaEncuesta
    );
    this.RespuestasPregunta = Util.ObtenerLookupMultiple(
      elementoItemLista.RespuestasPregunta
    );
    this.Puntaje = Util.ObtenerPuntaje(
      elementoItemLista.RespuestasPregunta_x003a_Puntaje
    );
  }
}
