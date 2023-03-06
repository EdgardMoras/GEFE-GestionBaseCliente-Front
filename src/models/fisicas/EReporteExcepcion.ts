import Util from "src/genericos/Util";

export default class EReporteExcepcion {
  public ID: number;
  public Title: string;
  public Periodo: string;
  public PeriodoAdicional: string;
  public Programacion: string;
  public DatosProgramacion: string;
  public NroMes: number;
  public Eliminar: boolean;

  constructor() {
    this.ID = 0;
    this.Title = "";
    this.Periodo = "";
    this.PeriodoAdicional = "";
    this.Programacion = "";
    this.DatosProgramacion = "";
    this.NroMes = 0;
    this.Eliminar = false;
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = elementoItemLista.ID;
    this.Title = Util.ObtenerTexto(elementoItemLista.Title);
    this.Periodo = Util.ObtenerTexto(elementoItemLista.Periodo);
    this.PeriodoAdicional = Util.ObtenerTexto(
      elementoItemLista.PeriodoAdicional
    );
    this.Programacion = Util.ObtenerTexto(elementoItemLista.Programacion);
    this.DatosProgramacion = Util.ObtenerTexto(
      elementoItemLista.DatosProgramacion
    );
    this.NroMes = Util.ObtenerEntero(elementoItemLista.NroMes);
    this.Eliminar = false;
  }
}
