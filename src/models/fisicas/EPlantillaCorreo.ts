import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import ParseJsom from "src/genericos/ParseJsom";
import { EBaseEntidad } from "src/models/Base/EBaseEntidad";

export default class EPlantillaCorreo extends EBaseEntidad {
  public static Campos = {
    Title: ParametrosNoAdministrables.ColumnasSitio.Title,
    AsuntoCorreo: ParametrosNoAdministrables.ColumnasSitio.AsuntoCorreo,
    ContenidoCorreo: ParametrosNoAdministrables.ColumnasSitio.ContenidoCorreo
  };

  public static ListaCampos = [
    "TipoCorreo",
    ParametrosNoAdministrables.ColumnasSitio.AsuntoCorreo,
    ParametrosNoAdministrables.ColumnasSitio.ContenidoCorreo
  ];

  public AsuntoCorreo: string;
  public ContenidoCorreo: string;

  public EPlantillaCorreo() {
    this.AsuntoCorreo = "";
    this.ContenidoCorreo = "";
  }

  public setearValores(elementoItemLista: SP.ListItem) {
    this.AsuntoCorreo = ParseJsom.parsearString(
      elementoItemLista,
      EPlantillaCorreo.Campos.AsuntoCorreo
    );
    this.ContenidoCorreo = ParseJsom.parsearString(
      elementoItemLista,
      EPlantillaCorreo.Campos.ContenidoCorreo
    );
  }

  public setearValoresRest(elementoItemLista: any) {
    this.AsuntoCorreo = elementoItemLista[EPlantillaCorreo.Campos.AsuntoCorreo];
    this.ContenidoCorreo =
      elementoItemLista[EPlantillaCorreo.Campos.ContenidoCorreo];
  }
}
