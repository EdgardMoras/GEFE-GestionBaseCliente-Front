import Util from "src/genericos/Util";

export default class EArchivoEncuesta {
  public ID: number;
  public Title: string;
  public Nombre: string;
  public ArrayBufferArchivo: any;
  public Ruta: string;
  public Size: number;
  public FechaRegistro: string;
  public RegistradoPor: string;
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
    this.Eliminar = false;
  }

  public obtenerDatos(file: any) {
    this.ID = Util.ObtenerEntero(file.ListItemAllFields.ID);
    this.Title = Util.ObtenerTexto(file.ListItemAllFields.Title);
    this.Nombre = Util.ObtenerTexto(file.ListItemAllFields.Title);
    this.Ruta = Util.ObtenerTexto(file.ServerRelativeUrl);
    this.Size = file.Length;
    this.FechaRegistro = Util.ObtenerTexto(file.ListItemAllFields.Created);
  }
}
