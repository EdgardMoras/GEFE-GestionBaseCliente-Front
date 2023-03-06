import Util from "src/genericos/Util";
import Lookup from "../Base/Lookup";
import EElementoCombo from "../logicas/EElementoCombo";
import ERespuestaPreguntaEncuesta from "../logicas/ERespuestaPreguntaEncuesta";

export default class EPreguntaEncuesta {
  public ID: number;
  public Pregunta: string;
  public Tipo: EElementoCombo | null;
  public TipoPregunta: Lookup;
  public OrientacionRespuesta: string;
  public SeleccionMultiple: boolean;
  public TextoMenorValor: string;
  public TextoMayorValor: string;
  public AplicaTextoMenorMayor: boolean;
  public Orden: number;
  public HabilitarOpciones: boolean;
  public Respuestas: ERespuestaPreguntaEncuesta[];
  public Eliminar: boolean;

  constructor() {
    this.ID = 0;
    this.Pregunta = "";
    this.Tipo = null;
    this.TipoPregunta = new Lookup();
    this.OrientacionRespuesta = "";
    this.SeleccionMultiple = false;
    this.TextoMenorValor = "";
    this.TextoMayorValor = "";
    this.AplicaTextoMenorMayor = false;
    this.Orden = 0;
    this.HabilitarOpciones = false;
    this.Respuestas = [];
    this.Eliminar = false;
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Pregunta = Util.ObtenerTexto(elementoItemLista.Pregunta);
    this.Orden = Util.ObtenerEntero(elementoItemLista.Orden);
    this.TipoPregunta = Util.ObtenerLookup(elementoItemLista.TipoPregunta);
    this.OrientacionRespuesta = Util.ObtenerTexto(
      elementoItemLista.OrientacionRespuesta
    );
    this.SeleccionMultiple = Util.ObtenerBoolean(
      elementoItemLista.SeleccionMultiple
    );
    this.TextoMenorValor = Util.ObtenerTexto(elementoItemLista.TextoMenorValor);
    this.TextoMayorValor = Util.ObtenerTexto(elementoItemLista.TextoMayorValor);
    this.AplicaTextoMenorMayor = Util.ObtenerBoolean(
      elementoItemLista.AplicaTextoMenorMayor
    );
  }
}
