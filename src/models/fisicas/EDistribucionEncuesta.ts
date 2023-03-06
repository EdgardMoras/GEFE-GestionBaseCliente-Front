import Util from "src/genericos/Util";

export default class EDistribucionEncuesta {
  public ID: number;
  public CorreoElectronico: string;
  public NombreUsuario: string;
  public FechaEnvio: string;
  public FechaLimite: string;
  public FechaRespuestaEncuesta: string;
  public Token: string;
  public Puntaje: any;
  public Eliminar: boolean;

  constructor() {
    this.ID = 0;
    this.CorreoElectronico = "";
    this.NombreUsuario = "";
    this.FechaEnvio = "";
    this.FechaLimite = "";
    this.FechaRespuestaEncuesta = "";
    this.Token = "";
    this.Puntaje = "";
    this.Eliminar = false;
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.CorreoElectronico = Util.ObtenerTexto(
      elementoItemLista.CorreoElectronico
    );
    this.NombreUsuario = Util.ObtenerTexto(elementoItemLista.NombreUsuario);
    this.FechaEnvio = Util.ObtenerTexto(elementoItemLista.FechaEnvio);
    this.FechaLimite = Util.ObtenerTexto(elementoItemLista.FechaLimite);
    this.FechaRespuestaEncuesta = Util.ObtenerTexto(
      elementoItemLista.FechaRespuestaEncuesta
    );
    this.Token = Util.ObtenerTexto(elementoItemLista.Token);
    this.Puntaje = Util.ObtenerTexto(elementoItemLista.Puntaje);
    this.Eliminar = false;
  }
}
