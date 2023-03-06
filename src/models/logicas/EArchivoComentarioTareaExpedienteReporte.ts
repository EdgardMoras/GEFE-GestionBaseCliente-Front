import Lookup from "../Base/Lookup";
import Util from "src/genericos/Util";

export default class EArchivoComentarioTareaExpedienteReporte {
  public ID: number;
  public Title: string;
  public Nombre: string;
  public ArrayBufferArchivo: any;
  public Ruta: string;
  public Size: number;
  public FechaRegistro: string;
  public RegistradoPor: string;
  public Reporte: Lookup;
  public ExpedienteReporte: Lookup;
  public TareaExpedienteReporte: Lookup;
  public ComentarioTareaExpedienteReporte: Lookup;
  public Eliminar: boolean;
  public IDTemporal: number;

  constructor() {
    this.ID = 0;
    this.Title = "";
    this.Nombre = "";
    this.ArrayBufferArchivo = "";
    this.Ruta = "";
    this.Size = 0;
    this.FechaRegistro = "";
    this.RegistradoPor = "";
    this.Reporte = new Lookup();
    this.ExpedienteReporte = new Lookup();
    this.TareaExpedienteReporte = new Lookup();
    this.ComentarioTareaExpedienteReporte = new Lookup();
    this.Eliminar = false;
    this.IDTemporal = 0;
  }

  public obtenerDatos(file: any) {
    this.ID = Util.ObtenerEntero(file.ListItemAllFields.ID);
    this.Title = Util.ObtenerTexto(file.ListItemAllFields.Title);
    this.Nombre = Util.ObtenerTexto(file.ListItemAllFields.Title);
    this.Ruta = Util.ObtenerTexto(file.ServerRelativeUrl);
    this.Size = file.Length;
    this.FechaRegistro = Util.ObtenerTexto(file.ListItemAllFields.Created);
    this.TareaExpedienteReporte.ID = Util.ObtenerEntero(
      file.ListItemAllFields.TareaExpedienteReporteId
    );
    this.Reporte.ID = Util.ObtenerEntero(file.ListItemAllFields.ReporteId);
    this.ExpedienteReporte.ID = Util.ObtenerEntero(
      file.ListItemAllFields.ExpedienteReporteId
    );
    this.ComentarioTareaExpedienteReporte.ID = Util.ObtenerEntero(
      file.ListItemAllFields.ComentarioTareaExpedienteReporteId
    );
  }
}
