import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import Usuario from "src/models/Base/Usuario";
import Lookup from "src/models/Base/Lookup";

export default class EActividadProyecto {
    public static Campos = {
        Detalle: ParametrosNoAdministrables.ColumnasSitioProyecto.Detalle,
        FechaRegistro: ParametrosNoAdministrables.ColumnasSitioProyecto.FechaRegistro,
        ID: ParametrosNoAdministrables.ColumnasSitio.ID,
        Proyecto: ParametrosNoAdministrables.ColumnasSitioProyecto.Proyecto,
        Title: ParametrosNoAdministrables.ColumnasSitioProyecto.Title,
        UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitioProyecto.UsuarioRegistro
    }

    public static Fields = [
        ParametrosNoAdministrables.ColumnasSitioProyecto.Detalle,
        ParametrosNoAdministrables.ColumnasSitioProyecto.FechaRegistro,
        ParametrosNoAdministrables.ColumnasSitio.ID,
        ParametrosNoAdministrables.ColumnasSitioProyecto.Proyecto + "/ID",
        ParametrosNoAdministrables.ColumnasSitioProyecto.Proyecto + "/Title",
        ParametrosNoAdministrables.ColumnasSitioProyecto.Title,
        ParametrosNoAdministrables.ColumnasSitioProyecto.UsuarioRegistro + "/ID",
        ParametrosNoAdministrables.ColumnasSitioProyecto.UsuarioRegistro + "/Title"
    ];

    public static Expand = [
        ParametrosNoAdministrables.ColumnasSitioProyecto.Proyecto,
        ParametrosNoAdministrables.ColumnasSitioProyecto.UsuarioRegistro
    ];

    public Detalle: string;
    public FechaRegistro: Date;
    public ID: number;
    public Proyecto: Lookup;
    public Title: string;
    public UsuarioRegistro: Usuario;

    constructor() {
        this.Detalle = "";
        this.FechaRegistro = new Date();
        this.ID = 0;
        this.Proyecto = {ID: 0, Title: ""} as Lookup;
        this.Title = "";       
        this.UsuarioRegistro = new Usuario();
    }
}