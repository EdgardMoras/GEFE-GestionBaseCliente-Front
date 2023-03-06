import Lookup from "../Base/Lookup";
import EArchivoNotaExpedienteReporte from "./EArchivoNotaExpedienteReporte";
import Usuario from "../Base/Usuario";
import Util from "src/genericos/Util";

export default class ENotaExpedienteReporte {
  public ID: number;
  public Nota: string;
  public Reporte: Lookup;
  public ExpedienteReporte: Lookup;
  public FechaRegistro: string;
  public RegistradoPor: Usuario;
  public Archivos: EArchivoNotaExpedienteReporte[];
  public EnLectura: boolean;
  public Eliminar: boolean;
  public IDTemporal: number;
  public HabilitarOpciones: boolean;

  constructor() {
    this.ID = 0;
    this.Nota = "";
    this.Reporte = new Lookup();
    this.ExpedienteReporte = new Lookup();
    this.FechaRegistro = "";
    this.RegistradoPor = new Usuario();
    this.Archivos = [];
    this.EnLectura = true;
    this.Eliminar = false;
    this.IDTemporal = 0;
    this.HabilitarOpciones = true;
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Nota = Util.ObtenerTexto(elementoItemLista.Nota);
    this.FechaRegistro = Util.ObtenerTexto(elementoItemLista.Created);
    this.RegistradoPor = Util.ObtenerUsuario(elementoItemLista.Author);
    this.Reporte = Util.ObtenerLookup(elementoItemLista.Reporte);
    this.ExpedienteReporte = Util.ObtenerLookup(
      elementoItemLista.ExpedienteReporte
    );
  }
}
