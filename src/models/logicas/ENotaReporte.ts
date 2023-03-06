import Lookup from "../Base/Lookup";
import Util from "src/genericos/Util";
import EArchivoNota from "./EArchivoNota";

export default class ENotaReporte {
  public ID: number;
  public Nota: string;
  public Reporte: Lookup;
  public FechaRegistro: string;
  public RegistradoPor: string;
  public Archivos: EArchivoNota[];

  public EnLectura: boolean;
  public Eliminar: boolean;
  public IDTemporal: number;
  public NotaTemporal: string;
  public ArchivosTemporal: EArchivoNota[];
  public HabilitarOpciones: boolean;

  constructor() {
    this.ID = 0;
    this.Nota = "";
    this.Reporte = new Lookup();
    this.FechaRegistro = "";
    this.RegistradoPor = "";
    this.Archivos = [];

    this.EnLectura = true;
    this.Eliminar = false;
    this.IDTemporal = 0;
    this.NotaTemporal = "";
    this.ArchivosTemporal = [];
    this.HabilitarOpciones = true;
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Nota = Util.ObtenerTexto(elementoItemLista.Nota);
    this.FechaRegistro = Util.ObtenerTexto(elementoItemLista.Created);
    this.RegistradoPor = Util.ObtenerUsuario(elementoItemLista.Author).Title;
    this.Reporte = Util.ObtenerLookup(elementoItemLista.Reporte);
  }
}
