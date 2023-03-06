export default class ERegistroActividadDirectivaLogico {
  public ExpedienteId: number;
  public Detalle: string;
  public UsuarioRegistroId: number;
  public FechaRegistro: Date;

  constructor() {
    (this.ExpedienteId = 0), (this.Detalle = "");
    this.UsuarioRegistroId = 0;
    this.FechaRegistro = new Date();
  }

  public setearValores(
    ExpedienteId: number,
    Detalle: string,
    UsuarioRegistroId: number
  ) {
    this.ExpedienteId = ExpedienteId;
    this.Detalle = Detalle;
    this.UsuarioRegistroId = UsuarioRegistroId;
    this.FechaRegistro = new Date();
  }
}
