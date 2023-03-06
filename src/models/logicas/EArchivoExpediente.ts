import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { EBaseEntidad } from "src/models/Base/EBaseEntidad";
import EArchivo from './EArchivo';

export default class EArchivoExpediente extends EBaseEntidad {
  public static Campos = {
    NombreDocumento: ParametrosNoAdministrables.ColumnasSitio.Title,
    Archivos: ParametrosNoAdministrables.ColumnasSitio.Archivos,
    Estado: ParametrosNoAdministrables.ColumnasSitio.EstadoExpediente,
    Responsable: ParametrosNoAdministrables.ColumnasSitio.Responsable,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro
  };

  public static obtenerClaseTipoArchivo(nombreArchivoConExtension: string) {
    const claseTipoPdf = ParametrosNoAdministrables.ValoresGenericos.urlImagenes + "/img/icons/ico-pdf.png";
    let claseArchivos = ParametrosNoAdministrables.ValoresGenericos.urlImagenes + "/img/icons/ico-pdf.png";;

    let extensionArchivo = nombreArchivoConExtension.split('.').pop();

    if (extensionArchivo) {
      extensionArchivo = extensionArchivo.toString().toUpperCase();

      if (extensionArchivo === "PDF") {
        claseArchivos = claseTipoPdf;
      }
    }


    return claseArchivos;
  }

  public Nombre: string;
  public ArrayBufferArchivo: any;
  public Ruta: string;
  public Size: number;
  public CodigoExpediente: string;
  public Eliminado: boolean;

  public EArchivoExpediente() {
    this.Nombre = "";
    this.ArrayBufferArchivo = null;
    this.Ruta = "";
    this.Size = 0;
    this.CodigoExpediente = "";
    this.Eliminado = false;
  }

  public setValores(id: number, nombre: string, ruta: string, size: number) {
    this.ID = id;
    this.Nombre = nombre;
    this.ArrayBufferArchivo = null;
    this.Ruta = ruta;
    this.Size = size;
    this.CodigoExpediente = "";
    this.Eliminado = false;
  }

  public setValoresDesdeEArchivo(archivo: EArchivo) {
    this.ID = archivo.ID;
    this.Nombre = archivo.Nombre;
    this.Ruta = archivo.Ruta;
    this.Size = archivo.Size;
    this.Eliminado = archivo.Eliminado;

    if (archivo.ArrayBufferArchivo) {
      this.ArrayBufferArchivo = archivo.ArrayBufferArchivo;
    }
  }

  public clone(): EArchivoExpediente {
    return {
      ID: this.ID,
      Nombre: this.Nombre,
      ArrayBufferArchivo: this.ArrayBufferArchivo,
      Ruta: this.Ruta,
      Size: this.Size,
      CodigoExpediente: this.CodigoExpediente,
      Eliminado: this.Eliminado
    } as EArchivoExpediente
  }

}
