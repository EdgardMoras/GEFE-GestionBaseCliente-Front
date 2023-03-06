import EElementoPeoplePicker from "./EElementoPeoplePicker";
import Util from "src/genericos/Util";
import Usuario from "../Base/Usuario";

export default class EEnviador {
  public ID: number;
  public Enviador: EElementoPeoplePicker | null;
  public UsuarioEnviador: Usuario;
  public PuestoEnviador: string;
  public AreaEnviador: string;
  public DivisionEnviador: string;
  public Eliminar: boolean;

  constructor() {
    this.ID = 0;
    this.Enviador = null;
    this.UsuarioEnviador = new Usuario();
    this.PuestoEnviador = "";
    this.AreaEnviador = "";
    this.DivisionEnviador = "";
    this.Eliminar = false;
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Enviador = Util.ObtenerPeoplePicker(elementoItemLista.Enviador);
    this.UsuarioEnviador = Util.ObtenerUsuario(elementoItemLista.Enviador);
    this.PuestoEnviador = Util.ObtenerTexto(elementoItemLista.PuestoEnviador);
    this.AreaEnviador = Util.ObtenerTexto(elementoItemLista.AreaEnviador);
    this.DivisionEnviador = Util.ObtenerTexto(
      elementoItemLista.DivisionEnviador
    );
    this.Eliminar = false;
  }

  public obtenerDetalle(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.UsuarioEnviador = Util.ObtenerUsuario(elementoItemLista.Enviador);
    this.PuestoEnviador = Util.ObtenerTexto(elementoItemLista.PuestoEnviador);
    this.AreaEnviador = Util.ObtenerTexto(elementoItemLista.AreaEnviador);
    this.DivisionEnviador = Util.ObtenerTexto(
      elementoItemLista.DivisionEnviador
    );
    this.Eliminar = false;
  }
}
