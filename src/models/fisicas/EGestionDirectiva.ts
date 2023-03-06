import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import ParseJsom from "src/genericos/ParseJsom";
import { EBaseEntidad } from "src/models/Base/EBaseEntidad";

export default class EGestionDirectiva extends EBaseEntidad 
{
  public static Campos = 
  {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    EsAdministrador: ParametrosNoAdministrables.ColumnasSitio.EsAdministrador,
    Title: ParametrosNoAdministrables.ColumnasSitio.Title,
  };

  public EsAdministrador: boolean;

  constructor() 
  {
    super();
  }

  public setearValoresItem(elementoItemLista: any) 
  {
    this.ID = Number(elementoItemLista.ID);
    this.Title = elementoItemLista.Title;
    this.EsAdministrador = elementoItemLista.EsAdministrador;
  }

  public setearValores(elementoItemLista: SP.ListItem) 
  {
    this.Title = ParseJsom.parsearString(elementoItemLista, EGestionDirectiva.Campos.Title);
    this.EsAdministrador = ParseJsom.parsearString(elementoItemLista, EGestionDirectiva.Campos.EsAdministrador);
  }

  public setearValoresConRest(elementoItemLista: any): void 
  {
    this.ID = Number(elementoItemLista.ID);
    this.Title = elementoItemLista.Title;
    this.EsAdministrador = elementoItemLista.EsAdministrador;
  }
}
