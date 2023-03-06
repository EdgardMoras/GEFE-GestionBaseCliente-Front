import EElementoPeoplePicker from "./EElementoPeoplePicker";
import Util from "src/genericos/Util";
import Usuario from "../Base/Usuario";

export default class EConsolidador {
  public ID: number;
  public Consolidador: EElementoPeoplePicker | null;
  public UsuarioConsolidador: Usuario;
  public PuestoConsolidador: string;
  public AreaConsolidador: string;
  public DivisionConsolidador: string;
  public Eliminar: boolean;

  constructor() {
    this.ID = 0;
    this.Consolidador = null;
    this.UsuarioConsolidador = new Usuario();
    this.PuestoConsolidador = "";
    this.AreaConsolidador = "";
    this.DivisionConsolidador = "";
    this.Eliminar = false;
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Consolidador = Util.ObtenerPeoplePicker(
      elementoItemLista.Consolidador
    );
    this.UsuarioConsolidador = Util.ObtenerUsuario(
      elementoItemLista.Consolidador
    );
    this.PuestoConsolidador = Util.ObtenerTexto(
      elementoItemLista.PuestoConsolidador
    );
    this.AreaConsolidador = Util.ObtenerTexto(
      elementoItemLista.AreaConsolidador
    );
    this.DivisionConsolidador = Util.ObtenerTexto(
      elementoItemLista.DivisionConsolidador
    );
    this.Eliminar = false;
  }

  public obtenerDetalle(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.UsuarioConsolidador = Util.ObtenerUsuario(
      elementoItemLista.Consolidador
    );
    this.PuestoConsolidador = Util.ObtenerTexto(
      elementoItemLista.PuestoConsolidador
    );
    this.AreaConsolidador = Util.ObtenerTexto(
      elementoItemLista.AreaConsolidador
    );
    this.DivisionConsolidador = Util.ObtenerTexto(
      elementoItemLista.DivisionConsolidador
    );
    this.Eliminar = false;
  }
}
