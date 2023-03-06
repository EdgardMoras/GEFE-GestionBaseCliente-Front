import { EBaseEntidad } from "../Base/EBaseEntidad";

export default class EElementoCombo extends EBaseEntidad {
    public datosObjeto: any;
    // public esSeleccionado: boolean;

    constructor(id?: number, title?: string, datosObjeto?: any, esSeleccionado?: boolean) {
        super();

        this.ID = 0;
        this.Title = "Seleccione";
        this.datosObjeto = null
        // this.esSeleccionado = false;

        if (id) {
            this.ID = id;
        }
        if (title) {
            this.Title = title;
        }
        if (datosObjeto) {
            this.datosObjeto = datosObjeto;
        }
        if (esSeleccionado) {
            // this.esSeleccionado = true;
        }
    }

    public EElementoCombo() {
        this.ID = 0;
        this.Title = "Seleccione";
        this.datosObjeto = null
        // this.esSeleccionado = false;
    }

    public inicializarElementoCombo(id: number, title: string, datosObjeto: any, esSeleccionado?: boolean): void {
        this.ID = id;
        this.Title = title;
        this.datosObjeto = datosObjeto
        // this.esSeleccionado = false;

        /* if (esSeleccionado) {
            this.esSeleccionado = true;
        }*/
    }
}
