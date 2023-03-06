import EElementoPeoplePicker from "./EElementoPeoplePicker";
import Util from "src/genericos/Util";
import Usuario from "../Base/Usuario";

export default class ESeguimiento {
  public ID: number;
  public Seguimiento: EElementoPeoplePicker | null;
  public UsuarioSeguimiento: Usuario;
  public PuestoSeguimiento: string;
  public AreaSeguimiento: string;
  public DivisionSeguimiento: string;
  public Eliminar: boolean;

  constructor() {
    this.ID = 0;
    this.Seguimiento = null;
    this.UsuarioSeguimiento = new Usuario();
    this.PuestoSeguimiento = "";
    this.AreaSeguimiento = "";
    this.DivisionSeguimiento = "";
    this.Eliminar = false;
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Seguimiento = Util.ObtenerPeoplePicker(elementoItemLista.Seguimiento);
    this.UsuarioSeguimiento = Util.ObtenerUsuario(
      elementoItemLista.Seguimiento
    );
    this.PuestoSeguimiento = Util.ObtenerTexto(
      elementoItemLista.PuestoSeguimiento
    );
    this.AreaSeguimiento = Util.ObtenerTexto(elementoItemLista.AreaSeguimiento);
    this.DivisionSeguimiento = Util.ObtenerTexto(
      elementoItemLista.DivisionSeguimiento
    );
    this.Eliminar = false;
  }

  public obtenerDetalle(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.UsuarioSeguimiento = Util.ObtenerUsuario(
      elementoItemLista.Seguimiento
    );
    this.PuestoSeguimiento = Util.ObtenerTexto(
      elementoItemLista.PuestoSeguimiento
    );
    this.AreaSeguimiento = Util.ObtenerTexto(elementoItemLista.AreaSeguimiento);
    this.DivisionSeguimiento = Util.ObtenerTexto(
      elementoItemLista.DivisionSeguimiento
    );
    this.Eliminar = false;
  }
}
