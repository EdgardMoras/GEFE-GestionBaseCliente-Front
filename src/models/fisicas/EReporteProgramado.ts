import Util from "src/genericos/Util";

export default class EReporteProgramado {
  public ID: number;
  public Title: string;
  public Periodo: string;
  public PeriodoAdicional: string;
  public FechaProgramada: any;
  public FechaProgramadaInicial: any;
  public FechaCorte: any;
  public FechaSiguienteCorte: any;
  public FechaSiguienteCorte2: any;
  public Enviado: boolean;
  public AplicaExcepcion: boolean;
  public Eliminar: boolean;
  public Oculto: boolean;

  constructor() {
    this.ID = 0;
    this.Title = "";
    this.Periodo = "";
    this.PeriodoAdicional = "";
    this.FechaProgramada = "";
    this.FechaProgramadaInicial = "";
    this.FechaCorte = "";
    this.FechaSiguienteCorte = "";
    this.FechaSiguienteCorte2 = "";
    this.Enviado = false;
    this.AplicaExcepcion = false;
    this.Eliminar = false;
    this.Oculto = false;
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Title = Util.ObtenerTexto(elementoItemLista.Title);
    this.Periodo = Util.ObtenerTexto(elementoItemLista.Periodo);
    this.PeriodoAdicional = Util.ObtenerTexto(
      elementoItemLista.PeriodoAdicional
    );
    this.FechaProgramada = Util.ConvertirStringToDate(
      elementoItemLista.FechaProgramada
    );
    this.FechaProgramadaInicial = Util.ConvertirStringToDate(
      elementoItemLista.FechaProgramadaInicial
    );
    this.FechaCorte =
      elementoItemLista.FechaCorte !== ""
        ? Util.ConvertirStringToDate(elementoItemLista.FechaCorte)
        : "";
    this.FechaSiguienteCorte = Util.ConvertirStringToDate(
      elementoItemLista.FechaSiguienteCorte
    );
    this.FechaSiguienteCorte2 = Util.ConvertirStringToDate(
      elementoItemLista.FechaSiguienteCorte2
    );
    this.AplicaExcepcion =
      elementoItemLista.AplicaExcepcion === "No" ? false : true;
    this.Enviado = false;
    this.Eliminar = false;
    this.Oculto = false;
  }
}
