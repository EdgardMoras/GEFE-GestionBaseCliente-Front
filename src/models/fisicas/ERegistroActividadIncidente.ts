import { EBaseEntidadTransaccional } from "../Base/EBaseEntidadTransaccional";
import { RestFiltros } from "../../genericos/RestFiltros";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import EIncidente from "./EIncidente";

export default class ERegistroActividadIncidente extends EBaseEntidadTransaccional {
  public static Campos = {
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    Detalle: ParametrosNoAdministrables.ColumnasSitio.Detalle
  };
  public static CamposExpand = {
    Incidente: ParametrosNoAdministrables.ColumnasSitio.Incidente,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro
  };

  public Incidente: EIncidente;
  public Detalle: string;

  constructor() {
    super();
    this.Incidente = new EIncidente();
    this.Detalle = "";
  }



  public setearValoresConRest(elementoItemLista: any): void {
    this.Incidente = RestFiltros.parsearLookup(
      elementoItemLista,
      ERegistroActividadIncidente.CamposExpand.Incidente,
      EIncidente
    );

    this.ID = elementoItemLista.ID;
    this.Detalle = elementoItemLista.Detalle;
  }
}
