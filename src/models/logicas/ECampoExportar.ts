export default class ECampoExportar{
    public nombreInterno: string;
    public nombreMostrar: string;
    public esSeleccionado: boolean;

    constructor(nombreInterno: string, nombreMostrar: string, esSeleccionado: boolean){
this.nombreInterno= nombreInterno;
this.nombreMostrar = nombreMostrar;
this.esSeleccionado = esSeleccionado;
    }
}