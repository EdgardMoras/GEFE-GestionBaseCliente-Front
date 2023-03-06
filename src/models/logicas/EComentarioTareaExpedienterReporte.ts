import Lookup from "../Base/Lookup";
import EArchivoComentarioTareaExpedienteReporte from "./EArchivoComentarioTareaExpedienteReporte";
import Usuario from "../Base/Usuario";
import Util from "src/genericos/Util";

export default class EComentarioTareaExpedienterReporte {
  public ID: number;
  public Comentario: string;
  public Reporte: Lookup;
  public ExpedienteReporte: Lookup;
  public TareaExpedienteReporte: Lookup;
  public FechaRegistro: string;
  public RegistradoPor: Usuario;
  public Archivos: EArchivoComentarioTareaExpedienteReporte[];
  public Eliminar: boolean;

  constructor() {
    this.ID = 0;
    this.Comentario = "";
    this.Reporte = new Lookup();
    this.ExpedienteReporte = new Lookup();
    this.TareaExpedienteReporte = new Lookup();
    this.FechaRegistro = "";
    this.RegistradoPor = new Usuario();
    this.Archivos = [];
    this.Eliminar = false;
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Comentario = Util.ObtenerTexto(elementoItemLista.Comentario);
    this.FechaRegistro = Util.ObtenerTexto(elementoItemLista.Created);
    this.RegistradoPor = Util.ObtenerUsuario(elementoItemLista.Author);
    this.Reporte = Util.ObtenerLookup(elementoItemLista.Reporte);
    this.ExpedienteReporte = Util.ObtenerLookup(
      elementoItemLista.ExpedienteReporte
    );
    this.TareaExpedienteReporte = Util.ObtenerLookup(
      elementoItemLista.TareaExpedienteReporte
    );
  }
}
