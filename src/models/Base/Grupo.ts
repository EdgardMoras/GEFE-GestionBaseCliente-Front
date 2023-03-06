import { EBaseEntidad } from 'src/models/Base/EBaseEntidad';


export class Grupo extends EBaseEntidad {
    public setearValoresConRest(elementoItemLista: any): void {
        this.ID = elementoItemLista.ID;
        this.Title = elementoItemLista.Title;
    }
}
