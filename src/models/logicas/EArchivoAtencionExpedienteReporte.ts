import Lookup from "../Base/Lookup";
import Util from "src/genericos/Util";

export default class EArchivoAtencionExpedienteReporte {
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
  public AtencionExpedienteReporte: Lookup;
  public Eliminar: boolean;

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
    this.AtencionExpedienteReporte = new Lookup();
    this.Eliminar = false;
  }

  public obtenerDatos(file: any) {
    this.ID = Util.ObtenerEntero(file.ListItemAllFields.ID);
    this.Title = Util.ObtenerTexto(file.ListItemAllFields.Title);
    this.Nombre = Util.ObtenerTexto(file.ListItemAllFields.Title);
    this.Ruta = Util.ObtenerTexto(file.ServerRelativeUrl);
    this.Size = file.Length;
    this.FechaRegistro = Util.ObtenerTexto(file.ListItemAllFields.Created);
    this.Reporte.ID = Util.ObtenerEntero(file.ListItemAllFields.ReporteId);
    this.ExpedienteReporte.ID = Util.ObtenerEntero(file.ListItemAllFields.ExpedienteReporteId);
    this.AtencionExpedienteReporte.ID = Util.ObtenerEntero(file.ListItemAllFields.AtencionExpedienteReporteId);
  }
}
