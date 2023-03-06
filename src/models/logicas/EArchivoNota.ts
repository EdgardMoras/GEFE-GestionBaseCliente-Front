import Lookup from "../Base/Lookup";
import Util from "src/genericos/Util";

export default class EArchivoNota {
  public ID: number;
  public Title: string;
  public Nombre: string;
  public ArrayBufferArchivo: any;
  public Ruta: string;
  public Size: number;
  public FechaRegistro: string;
  public RegistradoPor: string;
  public IdNotaReporte: Lookup;
  public Reporte: Lookup;
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
    this.IdNotaReporte = new Lookup();
    this.Reporte = new Lookup();
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
    this.RegistradoPor = Util.ObtenerUsuario(
      file.ListItemAllFields.Author
    ).Title;
    this.IdNotaReporte.ID = Util.ObtenerEntero(
      file.ListItemAllFields.IdNotaReporteId
    );
    this.Reporte.ID = Util.ObtenerEntero(file.ListItemAllFields.ReporteId);
  }
}
