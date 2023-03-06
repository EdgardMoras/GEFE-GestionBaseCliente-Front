import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { EBaseEntidad } from "src/models/Base/EBaseEntidad";
import ParseJsom from "src/genericos/ParseJsom";
import Funciones from '../../genericos/Funciones';
import { RestFiltros } from '../../genericos/RestFiltros';

export default class EDivision extends EBaseEntidad {
    public static NombreLista: string = ParametrosNoAdministrables.Listas.Divisiones;

    public static Campos = {
        EmpresaTexto: ParametrosNoAdministrables.ColumnasSitio.EmpresaTexto,
        EstadoElemento:
            ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
        ID: ParametrosNoAdministrables.ColumnasSitio.ID,
        Title:
            ParametrosNoAdministrables.ColumnasSitio.Title,
    };

    public static getEndPointElementosActivos() {
        const listaFieldsSelect = Funciones.obtenerListaCampos(EDivision.Campos);

        const endPointObtenerDivisiones: string = String.format(
            ParametrosNoAdministrables.RestEstructuras.SelectFilter,
            this.NombreLista,
            listaFieldsSelect.join(","),
            RestFiltros.obtenerFiltroPorEstadoActivo()
        );
        return endPointObtenerDivisiones;
    }

    public EmpresaTexto: string;

    public EDivision() {
        this.EmpresaTexto = "";
    }

    public setearValores(elementoItemLista: SP.ListItem) {
        const campos = EDivision.Campos;

        this.EmpresaTexto = ParseJsom.parsearString(
            elementoItemLista,
            campos.EmpresaTexto
        );
        this.EstadoElemento = ParseJsom.parsearString(
            elementoItemLista,
            campos.EstadoElemento
        );
        this.Title = ParseJsom.parsearString(
            elementoItemLista,
            campos.Title
        );
    }

    public setearValoresRest(elementoItemLista: any) {
        const campos = EDivision.Campos;

        this.EmpresaTexto = elementoItemLista[campos.EmpresaTexto];
        this.EstadoElemento = elementoItemLista[campos.EstadoElemento];
        this.ID = elementoItemLista[campos.ID];
        this.Title = elementoItemLista[campos.Title];
    }
}
