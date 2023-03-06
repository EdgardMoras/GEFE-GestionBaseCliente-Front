import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import Usuario from "src/models/Base/Usuario";
import Lookup from "src/models/Base/Lookup";
import EComentarioProyecto from "src/models/fisicas/EComentarioProyecto";

export default class ESolicitudComentario {

    public static Fields = [
        ParametrosNoAdministrables.ColumnasSitioProyecto.EstadoComentario,
        ParametrosNoAdministrables.ColumnasSitioProyecto.FechaAtencion,
        ParametrosNoAdministrables.ColumnasSitioProyecto.FechaLimite,
        ParametrosNoAdministrables.ColumnasSitioProyecto.FechaRegistro,
        ParametrosNoAdministrables.ColumnasSitioProyecto.FechaSolicitud,
        ParametrosNoAdministrables.ColumnasSitio.ID,
        ParametrosNoAdministrables.ColumnasSitioProyecto.Proyecto + "/ID",
        ParametrosNoAdministrables.ColumnasSitioProyecto.Proyecto + "/Title",       
        ParametrosNoAdministrables.ColumnasSitioProyecto.Usuario + "/ID",
        ParametrosNoAdministrables.ColumnasSitioProyecto.Usuario + "/Title",
        ParametrosNoAdministrables.ColumnasSitioProyecto.UsuarioRegistro + "/ID",
        ParametrosNoAdministrables.ColumnasSitioProyecto.UsuarioRegistro + "/Title"
    ];

    public static Expand = [
        ParametrosNoAdministrables.ColumnasSitioProyecto.Proyecto,
        ParametrosNoAdministrables.ColumnasSitioProyecto.Usuario,
        ParametrosNoAdministrables.ColumnasSitioProyecto.UsuarioRegistro
    ];

    public Comentarios: EComentarioProyecto[];
    public EstadoComentario: string;
    public FechaAtencion: Date;
    public FechaLimite: Date;
    public FechaRegistro: Date;
    public FechaSolicitud: Date;
    public ID: number;
    public Proyecto: Lookup;
    public Title: string;
    public Usuario: Usuario;
    public UsuarioRegistro: Usuario;
    
    constructor() {
        this.Comentarios = [];
        this.EstadoComentario = "";
        this.FechaAtencion = new Date();
        this.FechaLimite = new Date();
        this.FechaRegistro = new Date();
        this.FechaSolicitud = new Date();
        this.ID = 0;
        this.Proyecto = {ID: 0, Title: ""} as Lookup;
        this.Title = "";      
        this.Usuario = new Usuario(); 
        this.UsuarioRegistro = new Usuario();
    }
}