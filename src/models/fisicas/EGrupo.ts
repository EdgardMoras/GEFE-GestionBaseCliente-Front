import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { EBaseEntidad } from "src/models/Base/EBaseEntidad";
import ParseJsom from "src/genericos/ParseJsom";
import Funciones from '../../genericos/Funciones';
import { RestFiltros } from '../../genericos/RestFiltros';
import { Grupo } from '../Base/Grupo';
import ELookupMultiple from '../logicas/ELookupMultiple';

export default class EGrupo extends EBaseEntidad {
    public static NombreLista: string = ParametrosNoAdministrables.Listas.Grupos;

    public static Campos = {
        EstadoElemento:
            ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
        ID: ParametrosNoAdministrables.ColumnasSitio.ID,
        Grupo: ParametrosNoAdministrables.ColumnasSitio.Grupo,
        RolGrupo: ParametrosNoAdministrables.ColumnasSitio.RolGrupo,
        Title:
            ParametrosNoAdministrables.ColumnasSitio.Title,
    };

    public static CamposSelect = {
        EstadoElemento:
            ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
        ID: ParametrosNoAdministrables.ColumnasSitio.ID,
        RolGrupo: ParametrosNoAdministrables.ColumnasSitio.RolGrupo,
        Title:
            ParametrosNoAdministrables.ColumnasSitio.Title,
    };

    public static CamposExpand = {
        Grupo: ParametrosNoAdministrables.ColumnasSitio.Grupo,
    };

    public static getActualizarGrupo(EstadoElemento: boolean,
        RolGrupo: ELookupMultiple<string>,
        Title: string) {
        return {
            EstadoElemento,
            RolGrupo,
            Title
        }
    }

    public static getNuevoGrupo(EstadoElemento: boolean,
        GrupoId: number,
        RolGrupo: ELookupMultiple<string>,
        Title: string) {
        return {
            EstadoElemento,
            GrupoId,
            RolGrupo,
            Title
        }
    }

    public static getEndPointFiltrarPorRolElementosActivos(rol: string) {

        const valorFiltroPorRolGestorDirectivas = `${
            this.Campos.RolGrupo
            } eq '${
            rol
            }' and ${RestFiltros.obtenerFiltroPorEstadoActivo()}`;

        const listaFieldsExpand = Funciones.obtenerListaCampos(
            EGrupo.CamposExpand
        );
        const listaFieldsSelect = Funciones.obtenerListaCampos(EGrupo.CamposSelect);

        const listaFieldsSelectExpand = [
            RestFiltros.obtenerFieldExpandUsuario(
                EGrupo.CamposExpand.Grupo
            )
        ];

        const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
            listaFieldsSelectExpand
        );

        const endPoint: string = String.format(
            ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter,
            this.NombreLista,
            listaFieldsSelectYFieldsExpand.join(","),
            listaFieldsExpand.join(","),
            valorFiltroPorRolGestorDirectivas
        );
        return endPoint;
    }

    public static getEndPointElementos() {
        const listaFieldsExpand = Funciones.obtenerListaCampos(
            EGrupo.CamposExpand
        );
        const listaFieldsSelect = Funciones.obtenerListaCampos(EGrupo.CamposSelect);

        const listaFieldsSelectExpand = [
            RestFiltros.obtenerFieldExpandUsuario(
                EGrupo.CamposExpand.Grupo
            )
        ];

        const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
            listaFieldsSelectExpand
        );

        const endPointObtenerDivisiones: string = String.format(
            ParametrosNoAdministrables.RestEstructuras.SelectExpand,
            this.NombreLista,
            listaFieldsSelectYFieldsExpand.join(","),
            listaFieldsExpand.join(","),
            RestFiltros.obtenerFiltroPorEstadoActivo()
        );
        return endPointObtenerDivisiones;
    }

    public static getEndPointElementosActivos() {
        const listaFieldsExpand = Funciones.obtenerListaCampos(
            EGrupo.CamposExpand
        );
        const listaFieldsSelect = Funciones.obtenerListaCampos(EGrupo.CamposSelect);

        const listaFieldsSelectExpand = [
            RestFiltros.obtenerFieldExpandUsuario(
                EGrupo.CamposExpand.Grupo
            )
        ];

        const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
            listaFieldsSelectExpand
        );

        const endPointObtenerDivisiones: string = String.format(
            ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter,
            this.NombreLista,
            listaFieldsSelectYFieldsExpand.join(","),
            listaFieldsExpand.join(","),
            RestFiltros.obtenerFiltroPorEstadoActivo()
        );
        return endPointObtenerDivisiones;
    }

    public EmpresaTexto: string;
    public Grupo: Grupo;
    public RolGrupo: string[];

    public EGrupo() {
        this.EmpresaTexto = "";
        this.Grupo = new EGrupo();
        this.RolGrupo = [];
    }

    public setearValores(elementoItemLista: SP.ListItem) {
        const campos = EGrupo.Campos

        this.EstadoElemento = ParseJsom.parsearString(
            elementoItemLista,
            campos.EstadoElemento
        );
        this.Grupo = ParseJsom.parsearGrupo(
            elementoItemLista,
            campos.RolGrupo
        );
        this.RolGrupo = ParseJsom.parsearStringMultiple(
            elementoItemLista,
            campos.RolGrupo
        );
        this.Title = ParseJsom.parsearString(
            elementoItemLista,
            campos.Title
        );
    }

    public setearValoresConRest(elementoItemLista: any): void {
        const campos = EGrupo.Campos

        this.EstadoElemento = elementoItemLista[campos.EstadoElemento];
        this.ID = elementoItemLista[campos.ID];
        this.Grupo = elementoItemLista[campos.Grupo];
        this.RolGrupo = elementoItemLista[campos.RolGrupo];
        this.Title = elementoItemLista[campos.Title];
    }
}
