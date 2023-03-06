export default class ERegistroActividadIncidentesLogic {

  public UsuarioRegistroId: number;
  public FechaRegistro: Date;
  public Detalle: string;
  public IncidenteId: number;

  /* constructor() {
    (this.DirectivaId = 0), (this.Detalle = "");
    this.UsuarioRegistroId = 0;
    this.FechaRegistro = new Date();
  }*/

  public setearValores(
    UsuarioRegistroId: number,
    Detalle: string,
    IncidenteId: number
   
  ) {
    this.UsuarioRegistroId = UsuarioRegistroId;
    this.FechaRegistro = new Date();
    this.Detalle = Detalle;
    this.IncidenteId=IncidenteId;

  }
}
