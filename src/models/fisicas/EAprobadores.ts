import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { EBaseEntidad } from "src/models/Base/EBaseEntidad";
// import ParseJsom from "src/genericos/ParseJsom";
import Funciones from '../../genericos/Funciones';
import { RestFiltros } from '../../genericos/RestFiltros';
// import { Grupo } from '../Base/Grupo';
import ELookupMultiple from '../logicas/ELookupMultiple';

export default class EAprobadores extends EBaseEntidad {
    public static NombreLista: string = "ADM_Aprobadores";

    public static Campos = {
        EstadoElemento: ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
        ID: ParametrosNoAdministrables.ColumnasSitio.ID,
        Area: "Area",
        FechaRegistro: "FechaRegistro",
        UsuarioAprobador: "UsuarioAprobador",
        UsuarioRegistro: "UsuarioRegistro",
        Empresa: "Empresa",
        CargoAprobador: "CargoAprobador",
        GrupoAprobador: "GrupoAprobador",
    };

    public static CamposSelect = {
        EstadoElemento: ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
        ID: ParametrosNoAdministrables.ColumnasSitio.ID,
        Area: "Area",
        FechaRegistro: "FechaRegistro",
        UsuarioAprobador: "UsuarioAprobador",
        UsuarioRegistro: "UsuarioRegistro",
        Empresa: "Empresa",
        CargoAprobador: "CargoAprobador",
        GrupoAprobador: "GrupoAprobador",
    };

    public static CamposExpand = {
        GrupoAprobador: "GrupoAprobador",
        UsuarioRegistro: "UsuarioRegistro",
        UsuarioAprobador: "UsuarioAprobador",
        Area: "Area",
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

    public static getAprobadoresNew(EstadoElemento: boolean,
        GrupoAprobadorId: number,
        UsuarioAprobadorId: number,
        FechaRegistro: Date,
        UsuarioRegistroId: number,
        Empresa: string,
        CargoAprobador: string) {
        return {
            EstadoElemento,
            GrupoAprobadorId,
            UsuarioAprobadorId,
            FechaRegistro,
            UsuarioRegistroId,
            Empresa,
            CargoAprobador
        }
    }

    // public static getEndPointFiltrarPorRolElementosActivos(rol: string) {

    //     const valorFiltroPorRolGestorDirectivas = `${
    //         this.Campos.RolGrupo
    //         } eq '${
    //         rol
    //         }' and ${RestFiltros.obtenerFiltroPorEstadoActivo()}`;

    //     const listaFieldsExpand = Funciones.obtenerListaCampos(
    //         EGrupo.CamposExpand
    //     );
    //     const listaFieldsSelect = Funciones.obtenerListaCampos(EGrupo.CamposSelect);

    //     const listaFieldsSelectExpand = [
    //         RestFiltros.obtenerFieldExpandUsuario(
    //             EGrupo.CamposExpand.Grupo
    //         )
    //     ];

    //     const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
    //         listaFieldsSelectExpand
    //     );

    //     const endPoint: string = String.format(
    //         ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter,
    //         this.NombreLista,
    //         listaFieldsSelectYFieldsExpand.join(","),
    //         listaFieldsExpand.join(","),
    //         valorFiltroPorRolGestorDirectivas
    //     );
    //     return endPoint;
    // }
    public static getEndPointElementos2() {
        const listaFieldsExpand = Funciones.obtenerListaCampos(
            EAprobadores.CamposExpand
        );
        const listaFieldsSelect = Funciones.obtenerListaCampos(EAprobadores.CamposSelect);
        const listaFieldsSelectExpand = [
            RestFiltros.obtenerFieldExpandUsuario(
                EAprobadores.CamposExpand.GrupoAprobador
            ),
            RestFiltros.obtenerFieldExpandLookup(
                EAprobadores.CamposExpand.Area
            ),
            RestFiltros.obtenerFieldExpandUsuario(
                EAprobadores.CamposExpand.UsuarioAprobador
            ),
            RestFiltros.obtenerFieldExpandUsuario(
                EAprobadores.CamposExpand.UsuarioRegistro
            ),
        ];

        const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
            listaFieldsSelectExpand
        );

        const endPointObtenerDivisiones: string = String.format(
            ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter,
            this.NombreLista,
            listaFieldsSelectYFieldsExpand.join(","),
            listaFieldsExpand.join(","),
            RestFiltros.obtenerFiltroPorGrupo()
        );
        return endPointObtenerDivisiones;
    }
    public static getEndPointElementos() {
        const listaFieldsExpand = Funciones.obtenerListaCampos(
            EAprobadores.CamposExpand
        );
        const listaFieldsSelect = Funciones.obtenerListaCampos(EAprobadores.CamposSelect);
        const listaFieldsSelectExpand = [
            RestFiltros.obtenerFieldExpandUsuario(
                EAprobadores.CamposExpand.GrupoAprobador
            ),
            RestFiltros.obtenerFieldExpandLookup(
                EAprobadores.CamposExpand.Area
            ),
            RestFiltros.obtenerFieldExpandUsuario(
                EAprobadores.CamposExpand.UsuarioAprobador
            ),
            RestFiltros.obtenerFieldExpandUsuario(
                EAprobadores.CamposExpand.UsuarioRegistro
            ),
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

    // public EmpresaTexto: string;
    // public Grupo: Grupo;
    // public RolGrupo: string[];

    // public EGrupo() {
    //     this.EmpresaTexto = "";
    //     this.Grupo = new EGrupo();
    //     this.RolGrupo = [];
    // }

    // public setearValores(elementoItemLista: SP.ListItem) {
    //     const campos = EGrupo.Campos

    //     this.EstadoElemento = ParseJsom.parsearString(
    //         elementoItemLista,
    //         campos.EstadoElemento
    //     );
    //     this.Grupo = ParseJsom.parsearGrupo(
    //         elementoItemLista,
    //         campos.RolGrupo
    //     );
    //     this.RolGrupo = ParseJsom.parsearStringMultiple(
    //         elementoItemLista,
    //         campos.RolGrupo
    //     );
    //     this.Title = ParseJsom.parsearString(
    //         elementoItemLista,
    //         campos.Title
    //     );
    // }

    // public setearValoresConRest(elementoItemLista: any): void {
    //     const campos = EGrupo.Campos

    //     this.EstadoElemento = elementoItemLista[campos.EstadoElemento];
    //     this.ID = elementoItemLista[campos.ID];
    //     this.Grupo = elementoItemLista[campos.Grupo];
    //     this.RolGrupo = elementoItemLista[campos.RolGrupo];
    //     this.Title = elementoItemLista[campos.Title];
    // }
}
