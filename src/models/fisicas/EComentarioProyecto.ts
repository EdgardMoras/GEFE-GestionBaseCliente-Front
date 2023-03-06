import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import Usuario from "src/models/Base/Usuario";
import Lookup from "src/models/Base/Lookup";

export default class EComentarioProyecto {
    public static Campos = {
        Comentario: ParametrosNoAdministrables.ColumnasSitioProyecto.Comentario,
        FechaRegistro: ParametrosNoAdministrables.ColumnasSitioProyecto.FechaRegistro,
        ID: ParametrosNoAdministrables.ColumnasSitio.ID,
        Proyecto: ParametrosNoAdministrables.ColumnasSitioProyecto.Proyecto,
        UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitioProyecto.UsuarioRegistro
    }

    public static Fields = [
        ParametrosNoAdministrables.ColumnasSitioProyecto.Comentario,
        ParametrosNoAdministrables.ColumnasSitioProyecto.FechaRegistro,
        ParametrosNoAdministrables.ColumnasSitio.ID,
        ParametrosNoAdministrables.ColumnasSitioProyecto.Proyecto + "/ID",
        ParametrosNoAdministrables.ColumnasSitioProyecto.Proyecto + "/Title",
        ParametrosNoAdministrables.ColumnasSitioProyecto.SolicitudProyecto + "/ID",
        ParametrosNoAdministrables.ColumnasSitioProyecto.SolicitudProyecto + "/Title",
        ParametrosNoAdministrables.ColumnasSitioProyecto.UsuarioRegistro + "/ID",
        ParametrosNoAdministrables.ColumnasSitioProyecto.UsuarioRegistro + "/Title"
    ];

    public static Expand = [
        ParametrosNoAdministrables.ColumnasSitioProyecto.Proyecto,
        ParametrosNoAdministrables.ColumnasSitioProyecto.SolicitudProyecto,
        ParametrosNoAdministrables.ColumnasSitioProyecto.UsuarioRegistro
    ];

    public Comentario: string;
    public FechaRegistro: Date;
    public ID: number;
    public Proyecto: Lookup;
    public SolicitudProyecto: Lookup;
    public Title: string;
    public UsuarioRegistro: Usuario;

    constructor() {
        this.Comentario = "";
        this.FechaRegistro = new Date();
        this.ID = 0;
        this.Proyecto = {ID: 0, Title: ""} as Lookup;
        this.SolicitudProyecto = {ID: 0, Title: ""} as Lookup;
        this.Title = "";       
        this.UsuarioRegistro = new Usuario();
    }
}