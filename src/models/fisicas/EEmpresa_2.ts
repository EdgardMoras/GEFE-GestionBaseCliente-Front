import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { EBaseEntidad } from "src/models/Base/EBaseEntidad";
import ParseJsom from "src/genericos/ParseJsom";
import Funciones from "../../genericos/Funciones";
import { RestFiltros } from "../../genericos/RestFiltros";

export default class EEmpresa extends EBaseEntidad {
  public static NombreLista: string = "Empresa";

  public static Campos = {
    EstadoElemento: ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    Title: ParametrosNoAdministrables.ColumnasSitio.Title
  };

  public static CamposNew = {
    EstadoElemento: ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    Title: ParametrosNoAdministrables.ColumnasSitio.Title
  };


  public static getEndPointElementosActivos() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(EEmpresa.CamposNew);

    const endPointObtenerDivisiones: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      this.NombreLista,
      listaFieldsSelect.join(","),
      RestFiltros.obtenerFiltroPorEstadoActivo()
    );
    return endPointObtenerDivisiones;
  }

  public EmpresaTexto: string;

  public EDiEAreavision() {
    this.EmpresaTexto = "";
  }

  public setearValores(elementoItemLista: SP.ListItem) {
    const campos = EEmpresa.Campos;
    this.EstadoElemento = ParseJsom.parsearString(
      elementoItemLista,
      campos.EstadoElemento
    );
    this.Title = ParseJsom.parsearString(elementoItemLista, campos.Title);
  }

  public setearValoresRest(elementoItemLista: any) {
    const campos = EEmpresa.Campos;
    this.EstadoElemento = elementoItemLista[campos.EstadoElemento];
    this.ID = elementoItemLista[campos.ID];
    this.Title = elementoItemLista[campos.Title];
  }
}
