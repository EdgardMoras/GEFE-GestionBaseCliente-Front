import Usuario from '../Base/Usuario';

export default class EUsuarioTenant {
    public Area: string;
    public Division: string;
    public Puesto: string;
    public Usuario: Usuario;

    constructor() {
        this.Area = "";
        this.Division = "";
        this.Puesto = "";
        this.Usuario = new Usuario();
    }

    public setearValores(area: string, division: string, puesto: string) {
        this.Area = area;
        this.Division = division;
        this.Puesto = puesto;
    }

}
