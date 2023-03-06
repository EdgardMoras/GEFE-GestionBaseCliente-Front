import EElementoPeoplePicker from "./EElementoPeoplePicker";
import Util from "src/genericos/Util";
import Usuario from "../Base/Usuario";

export default class EElaboradorAprobador {
  public ID: number;
  public Elaborador: EElementoPeoplePicker | null;
  public UsuarioElaborador: Usuario;
  public PuestoElaborador: string;
  public AreaElaborador: string;
  public DivisionElaborador: string;
  public Aprobador: EElementoPeoplePicker | null;
  public UsuarioAprobador: Usuario;
  public PuestoAprobador: string;
  public AreaAprobador: string;
  public DivisionAprobador: string;
  public Eliminar: boolean;

  constructor() {
    this.ID = 0;
    this.Elaborador = null;
    this.UsuarioElaborador = new Usuario();
    this.PuestoElaborador = "";
    this.AreaElaborador = "";
    this.DivisionElaborador = "";
    this.Aprobador = null;
    this.UsuarioAprobador = new Usuario();
    this.PuestoAprobador = "";
    this.AreaAprobador = "";
    this.DivisionAprobador = "";
    this.Eliminar = false;
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Elaborador = Util.ObtenerPeoplePicker(elementoItemLista.Elaborador);
    this.UsuarioElaborador = Util.ObtenerUsuario(elementoItemLista.Elaborador);
    this.PuestoElaborador = Util.ObtenerTexto(
      elementoItemLista.PuestoElaborador
    );
    this.AreaElaborador = Util.ObtenerTexto(elementoItemLista.AreaElaborador);
    this.DivisionElaborador = Util.ObtenerTexto(
      elementoItemLista.DivisionElaborador
    );
    this.Aprobador = Util.ObtenerPeoplePicker(elementoItemLista.Aprobador);
    this.UsuarioAprobador = Util.ObtenerUsuario(elementoItemLista.Aprobador);
    this.PuestoAprobador = Util.ObtenerTexto(elementoItemLista.PuestoAprobador);
    this.AreaAprobador = Util.ObtenerTexto(elementoItemLista.AreaAprobador);
    this.DivisionAprobador = Util.ObtenerTexto(
      elementoItemLista.DivisionAprobador
    );
    this.Eliminar = false;
  }

  public obtenerDetalle(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.UsuarioElaborador = Util.ObtenerUsuario(elementoItemLista.Elaborador);
    this.PuestoElaborador = Util.ObtenerTexto(
      elementoItemLista.PuestoElaborador
    );
    this.AreaElaborador = Util.ObtenerTexto(elementoItemLista.AreaElaborador);
    this.DivisionElaborador = Util.ObtenerTexto(
      elementoItemLista.DivisionElaborador
    );
    this.UsuarioAprobador = Util.ObtenerUsuario(elementoItemLista.Aprobador);
    this.PuestoAprobador = Util.ObtenerTexto(elementoItemLista.PuestoAprobador);
    this.AreaAprobador = Util.ObtenerTexto(elementoItemLista.AreaAprobador);
    this.DivisionAprobador = Util.ObtenerTexto(
      elementoItemLista.DivisionAprobador
    );
    this.Eliminar = false;
  }
}
