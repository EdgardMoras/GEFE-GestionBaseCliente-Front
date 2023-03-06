import { ParametrosNoAdministrables } from 'src/genericos/VariablesGlobales';

export default class ERegistroIncidentesLogic {

  public UsuarioRegistroId: number;
  public FechaRegistro: Date;
  public Codigo: string;
  public Descripcion: string;
  public EstadoIncidencia: string;
  public FechaReporte: Date;
  public FechaOcurrencia: Date;
  public MultaAsociada: string;
  public RiesgoOperacional: boolean;
  public RequiereSeguimiento: boolean;
  public PalabrasClaves: string;
  public AlcanceId: {};
  public EntidadId: number;
  public EvaluacionIncidenteId: number;
  public Title: string;

  public NormasRelacionadasId: {};
  public ExpedientesRelacionadosId: {};
  public IncidentesAsociadosId: {};
  public ReportesAsociadosId: {};
  public ProyectoAsociadosId: {};

  /* constructor() {
    (this.DirectivaId = 0), (this.Detalle = "");
    this.UsuarioRegistroId = 0;
    this.FechaRegistro = new Date();
  }*/

  public setearValores(
     UsuarioRegistroId: number,
     Codigo: string,
     Descripcion: string,
     FechaReporte: Date,
     FechaOcurrencia: Date,
     MultaAsociada: string,
     RiesgoOperacional: boolean,
     RequiereSeguimiento: boolean,
     PalabraClave: string,
     AlcanceId: {},
     EntidadId: number,
     EvaluacionIncidenteId: number,
     Estado: string,
     NormasRelacionadas : {},
     ExpedientesRelacionados : {},
     IncidentesAsociados : {},
     ReportesAsociados : {},
     ProyectoAsociados : {}
  ) 
  {
     this.UsuarioRegistroId = UsuarioRegistroId;
     this.FechaRegistro = new Date();
     this.Codigo = Codigo;
     this.Descripcion = Descripcion;
     this.EstadoIncidencia = Estado;
     this.FechaReporte = FechaReporte;
     this.FechaOcurrencia = FechaOcurrencia;
     this.MultaAsociada = MultaAsociada;
     this.RiesgoOperacional = RiesgoOperacional;
     this.RequiereSeguimiento = RequiereSeguimiento;
     this.PalabrasClaves = PalabraClave;
     this.AlcanceId = AlcanceId;
     this.EntidadId = EntidadId;
     this.EvaluacionIncidenteId = EvaluacionIncidenteId;
     this.Title = Codigo;
     this.NormasRelacionadasId=NormasRelacionadas;
     this.ExpedientesRelacionadosId = ExpedientesRelacionados;
     this.ReportesAsociadosId = ReportesAsociados;
     this.IncidentesAsociadosId = IncidentesAsociados;
     this.ProyectoAsociadosId = ProyectoAsociados;
  }

  public setearValoresEditar(
  
     Descripcion: string,
     FechaReporte: Date,
     FechaOcurrencia: Date,
     MultaAsociada: string,
     RiesgoOperacional: boolean,
     RequiereSeguimiento: boolean,
     PalabraClave: string,
     AlcanceId: {},
     EntidadId: number,
     EvaluacionIncidenteId: number,
     Estado:string,
     NormasRelacionadas : {},
     ExpedientesRelacionados : {},
     IncidentesAsociados : {},
     ReportesAsociados : {},
     ProyectoAsociados : {}
  ) {
   
    this.Descripcion = Descripcion;
    this.FechaReporte = FechaReporte;
    this.FechaOcurrencia = FechaOcurrencia;
    this.MultaAsociada = MultaAsociada;
    this.RiesgoOperacional = RiesgoOperacional;
    this.RequiereSeguimiento = RequiereSeguimiento;
    this.PalabrasClaves = PalabraClave;
    this.AlcanceId = AlcanceId;
    this.EntidadId = EntidadId;
    this.EvaluacionIncidenteId = EvaluacionIncidenteId;
    this.EstadoIncidencia = Estado;
    this.NormasRelacionadasId=NormasRelacionadas;
    this.ExpedientesRelacionadosId = ExpedientesRelacionados;
    this.ReportesAsociadosId = ReportesAsociados;
    this.IncidentesAsociadosId = IncidentesAsociados;
    this.ProyectoAsociadosId = ProyectoAsociados;
  }


  public setearValoresAnular(
    Estado:string
 ) {
   this.EstadoIncidencia = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstados.EstadoIncidenteAnulado;
 }
}
