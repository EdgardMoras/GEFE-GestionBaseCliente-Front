import Lookup from "../Base/Lookup";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { EBaseEntidad } from "src/models/Base/EBaseEntidad";
import Util from "src/genericos/Util";
import EArchivo from './EArchivo';

export default class EArchivoProyecto extends EBaseEntidad {
    public static Campos = {
        NombreDocumento: ParametrosNoAdministrables.ColumnasSitio.Title,
        Archivos: ParametrosNoAdministrables.ColumnasSitio.Archivos,
        Estado: ParametrosNoAdministrables.ColumnasSitio.EstadoExpediente,
        Responsable: ParametrosNoAdministrables.ColumnasSitio.Responsable,
        UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
        FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro
    };
    
    public ID: number;
    public Title: string;
    public Nombre: string;
    public ArrayBufferArchivo: any;
    public Ruta: string;
    public Size: number;
    public Proyecto: Lookup;
    public Eliminado: boolean;    

    public EArchivoProyecto() {
        this.ID = 0;
        this.Title = "";
        this.Nombre = "";
        this.ArrayBufferArchivo = null;
        this.Ruta = "";
        this.Size = 0;
        this.Proyecto = new Lookup();
        this.Eliminado = false;
    }

    public setValores(id: number, nombre: string, ruta: string, size: number) {
        this.ID = id;
        this.Nombre = nombre;
        this.ArrayBufferArchivo = null;
        this.Ruta = ruta;
        this.Size = size;
        this.Eliminado = false;
    }
    
    public setValoresDesdeEArchivo(archivo: EArchivo) {
        this.ID = archivo.ID;
        this.Nombre = archivo.Nombre;
        this.Ruta = archivo.Ruta;
        this.Size = archivo.Size;
    
        if (archivo.ArrayBufferArchivo) {
          this.ArrayBufferArchivo = archivo.ArrayBufferArchivo;
        }
        this.Eliminado = archivo.Eliminado;
    }

    public obtenerDatos(file: any) {
        this.ID = Util.ObtenerEntero(file.ListItemAllFields.ID);
        this.Title = Util.ObtenerTexto(file.ListItemAllFields.Title);
        this.Nombre = Util.ObtenerTexto(file.ListItemAllFields.Title);
        this.Ruta = Util.ObtenerTexto(file.ServerRelativeUrl);
        this.Size = file.Length;
    }

    public clone(): EArchivoProyecto {
        return {
          ID: this.ID,
          Nombre: this.Nombre,
          ArrayBufferArchivo: this.ArrayBufferArchivo,
          Ruta: this.Ruta,
          Size: this.Size,
          Eliminado: this.Eliminado
        } as EArchivoProyecto
    }
}