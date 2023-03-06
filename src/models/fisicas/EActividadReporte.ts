import Util from "src/genericos/Util";
import Usuario from "../Base/Usuario";

export default class EActividadReporte {
  public ID: number;
  public Title: string;
  public Detalle: string;
  public FechaRegistro: any;
  public UsuarioRegistro: Usuario;

  constructor() {
    this.ID = 0;
    this.Title = "";
    this.Detalle = "";
    this.FechaRegistro = "";
    this.UsuarioRegistro = new Usuario();
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Title = Util.ObtenerTexto(elementoItemLista.Title);
    this.Detalle = Util.ObtenerTexto(elementoItemLista.Detalle);
    this.FechaRegistro = elementoItemLista.FechaRegistro;
    this.UsuarioRegistro = Util.ObtenerUsuario(
      elementoItemLista.UsuarioRegistro
    );
  }
}
