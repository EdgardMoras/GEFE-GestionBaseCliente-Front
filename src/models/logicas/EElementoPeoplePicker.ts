
export default class EElementoPeoplePicker {


    public Email: string;
    public ID: number;
    public Title: string;

    public get getArea(): string {
        return this.area;
    }
    public set setArea(value: string) {
        this.area = value;
    }
    public get getDivision(): string {
        return this.division;
    }
    public set setDivision(value: string) {
        this.division = value;
    }
    public get getEmpresa(): string {
        return this.empresa;
    }
    public set setEmpresa(value: string) {
        this.empresa = value;
    }
    public get getEsUsuario(): boolean {
        return this.esUsuario;
    }
    public get getJefe(): string {
        return this.jefe;
    }
    public set esJefe(value: string) {
        this.jefe = value;
    }
    public get getPuesto(): string {
        return this.puesto;
    }
    public set setPuesto(value: string) {
        this.puesto = value;
    }

    private area: string;
    private division: string;
    private empresa: string;
    private esUsuario: boolean;
    private jefe: string;
    private puesto: string;

    constructor(esUsuario: boolean | false, id?: number, title?: string, email?: string) {
        this.area = "";
        this.division = "";
        this.Email = "";
        this.empresa = "";
        this.esUsuario = true;
        this.ID = 0;
        this.Title = "";

        if (id) {
            this.ID = id;
        }
        if (title) {
            this.Title = title;
        }

        this.esUsuario = esUsuario;

        if (email) {
            this.Email = email;
        }
    }

}
