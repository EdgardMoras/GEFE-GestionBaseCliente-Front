import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { EBaseEntidad } from "src/models/Base/EBaseEntidad";

export default class EArchivo extends EBaseEntidad {

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
  public Eliminado: boolean;

  public constructor() {
    super();

    this.Nombre = "";
    this.ArrayBufferArchivo = null;
    this.Ruta = "";
    this.Size = 0;
    this.Eliminado = false;
  }

  public setValores(id: number, nombre: string, ruta: string, size: number, arrayBufferArchivo: any, eliminado?: boolean) {
    this.ID = id;
    this.Nombre = nombre;
    this.ArrayBufferArchivo = arrayBufferArchivo;
    this.Ruta = ruta;
    this.Size = size;

    if (eliminado) {
      this.Eliminado = eliminado;
    } else {
      this.Eliminado = false;
    }
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
  public clone(): EArchivo {
    return {
      ID: this.ID,
      Nombre: this.Nombre,
      ArrayBufferArchivo: this.ArrayBufferArchivo,
      Ruta: this.Ruta,
      Size: this.Size,
      Eliminado: this.Eliminado
    } as EArchivo
  }

}
