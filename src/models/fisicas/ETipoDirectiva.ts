import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import ParseJsom from "src/genericos/ParseJsom";
import { EBaseEntidad } from "src/models/Base/EBaseEntidad";

export default class ETipoDirectiva extends EBaseEntidad {
  public static Campos = {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    Title: ParametrosNoAdministrables.ColumnasSitio.Title,
    TipoFlujoDirectiva:
      ParametrosNoAdministrables.ColumnasSitio.TipoFlujoDirectiva
  };

  public TipoFlujoDirectiva: string;

  constructor() {
    super();

    this.TipoFlujoDirectiva = "";
  }

  public setearValoresItem(elementoItemLista: any) {
    this.ID = Number(elementoItemLista.ID);
    this.Title = elementoItemLista.Title;
    this.TipoFlujoDirectiva = elementoItemLista.TipoFlujoDirectiva;
  }

  public setearValores(elementoItemLista: SP.ListItem) {
    this.Title = ParseJsom.parsearString(
      elementoItemLista,
      ETipoDirectiva.Campos.Title
    );
    this.TipoFlujoDirectiva = ParseJsom.parsearString(
      elementoItemLista,
      ETipoDirectiva.Campos.TipoFlujoDirectiva
    );
  }

  public setearValoresConRest(elementoItemLista: any): void {
    this.ID = Number(elementoItemLista.ID);
    this.Title = elementoItemLista.Title;
    this.TipoFlujoDirectiva = elementoItemLista.TipoFlujoDirectiva;
  }
}
