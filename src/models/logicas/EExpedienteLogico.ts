import ELookupMultiple from './ELookupMultiple';
import { ParametrosNoAdministrables } from '../../genericos/VariablesGlobales';

export default class EExpedienteLogico {

  public static getValoresExpedienteDejaDesatendido() {
    return {
      Desatendido: false
    }
  }

  public static getValorDelegar(idUsuarioDelegar: number) {
    return {
      UsuarioDelegadoId: idUsuarioDelegar,
    }
  }

  public static getValorRechazarExpediente(estado: string) {
    return {
      EstadoExpediente: estado,
      UsuarioDelegadoId: null
    }
  }

  public static getValorEstadoExpediente(estado: string) {
    return {
      EstadoExpediente: estado,
    }
  }

  public static getValorReasignarDirectva(estado: string, idResponsable: number, areaTexto: string, divisionTexto: string, idsResponsablesAuxiliares: number[], responsablesAuxiliaresJson: string) {
    return {
      AreaTexto: areaTexto,
      DivisionTexto: divisionTexto,
      EstadoExpediente: estado,
      ResponsableId: idResponsable,
      ResponsablesAuxiliaresId: new ELookupMultiple<number>(idsResponsablesAuxiliares),
      ResponsablesAuxiliaresJson: responsablesAuxiliaresJson
    }
  }

  public static getValorAceptarAmpliacion(fechaPlazoOtorgado: Date) {
    return {
      FechaPlazo: fechaPlazoOtorgado,
      EstadoExpediente: ParametrosNoAdministrables.ModuloDirectivas.ValoresEstados.EstadoExpedienteEnElaboracion,
    }
  }

  public static getValorAmpliacionDirecta(fechaPlazoOtorgado: Date) {
    return {
      FechaPlazo: fechaPlazoOtorgado,
    }
  }

  public static getValorCompartidoCon(listaIdUsuariosCompartidoCon: number[]) {
    return {
      CompartidoConId: new ELookupMultiple<number>(listaIdUsuariosCompartidoCon),
    }
  }

  public static getValorResponderExpediente(comentario: string) {
    return {
      ComentarioRespuesta: comentario,
      EstadoExpediente: ParametrosNoAdministrables.ModuloDirectivas.ValoresEstados.EstadoExpedienteRespondida,
      FechaRespuesta: new Date(),
    }
  }

  public static getValorValidarRespuestaExpediente(fechaCierre: Date) {
    return {
      EstadoExpediente: ParametrosNoAdministrables.ModuloDirectivas.ValoresEstados.EstadoExpedienteFinalizada,
      FechaCierre: fechaCierre,
    }
  }

  public static getValorFinalizarDirectivaSinRespuestaResponsable(fechaRespuesta: Date) {
    return {
      EstadoExpediente: ParametrosNoAdministrables.ModuloDirectivas.ValoresEstados.EstadoExpedienteFinalizada,
      FechaCierre: new Date(),
      FechaRespuesta: fechaRespuesta,
    }
  }

  public static getValorFinalizarNoDirectivaSinRespuestaResponsable() {
    return {
      EstadoExpediente: ParametrosNoAdministrables.ModuloDirectivas.ValoresEstados.EstadoExpedienteFinalizada,
      FechaCierre: new Date(),
      FechaRespuesta: new Date(),
    }
  }

  public static getValorFinalizarNoDirectivaConRespuestaResponsable() {
    return {
      EstadoExpediente: ParametrosNoAdministrables.ModuloDirectivas.ValoresEstados.EstadoExpedienteFinalizada,
      FechaCierre: new Date(),
      FechaRespuesta: new Date(),
    }
  }

  public Archivos: string;
  public AreaTexto: string;
  public Codigo: string;
  public CompartidoConId: ELookupMultiple<number>;
  public Desatendido: boolean;
  // public Descripcion: string;
  public DivisionTexto: string;
  public EmpresaId: number;
  public EntidadId: number;
  public EsIncumplimiento: boolean;
  public EsConfidencial: boolean;
  public EstadoExpediente: string;
  public ExpedientesRelacionadosId: ELookupMultiple<number>;
  public FechaPlazo: Date;
  public FechaRecepcion: Date;
  public FechaRegistro: Date;
  public GrupoGestionId: number;
  public GrupoGrupoGestionId: number;
  public IncidentesAsociadosIds: string;
  public NombreDocumento: string;
  public NormasRelacionadasId: ELookupMultiple<number>;
  public OrigenPlazo: string;
  public PalabrasClaves: string;
  public ProyectosAsociadosIds: string;
  public ReportesAsociadosIds: string;
  public ResponsableId: number;
  public ResponsablesAuxiliaresId: ELookupMultiple<number>;
  public ResponsablesAuxiliaresJson: string;
  public TipoDirectivaId: number;
  public Title: string;
  public UsuarioRegistroId: ELookupMultiple<number>;

  public EstadoProyecto: string;
  public NombreProyecto: string;
  public Descripcion: string;
  public UsuarioResponsableId: ELookupMultiple<number>;
  public AreaId: number;
  public Detalle: string;
  public ProyectoId: number;

  constructor() {
    this.Archivos = "";
    this.AreaTexto = "";
    this.Codigo = "";
    this.CompartidoConId = new ELookupMultiple<number>();
    this.Desatendido = true;
    // this.Descripcion = "";
    this.DivisionTexto = "";
    this.EmpresaId = 0;
    this.EntidadId = 0;
    this.EsIncumplimiento = false;
    this.EsConfidencial = false;
    this.EstadoExpediente = "";
    this.ExpedientesRelacionadosId = new ELookupMultiple<number>();
    this.FechaPlazo = new Date();
    this.FechaRecepcion = new Date();
    this.FechaRegistro = new Date();
    this.GrupoGestionId = 0;
    this.GrupoGrupoGestionId = 0;
    this.IncidentesAsociadosIds = "";
    this.NombreDocumento = "";
    this.NormasRelacionadasId = new ELookupMultiple<number>();
    this.OrigenPlazo = "";
    this.PalabrasClaves = "";
    this.ProyectosAsociadosIds = "";
    this.ReportesAsociadosIds = "";
    this.TipoDirectivaId = 0;
    this.Title = "";
    this.ResponsableId = 0;
    this.ResponsablesAuxiliaresId = new ELookupMultiple<number>();
    this.ResponsablesAuxiliaresJson = "";
    this.UsuarioRegistroId = new ELookupMultiple<number>();
    this.Descripcion = "";
    this.UsuarioResponsableId = new ELookupMultiple<number>();
    this.AreaId = 0;
    this.Detalle = "";
    this.ProyectoId = 0;

  }

  public setValoresNuevoExpediente(
    Archivos: string,
    EstadoExpediente: string,
    NombreDocumento: string,
    UsuarioRegistroId: number,
  ) {
    this.Archivos = Archivos;
    this.EstadoExpediente = EstadoExpediente;
    this.FechaRegistro = new Date();
    this.NombreDocumento = NombreDocumento;
    // this.UsuarioRegistroId = UsuarioRegistroId;
  }

  public getValoresNuevoExpediente() {
    return {
      Archivos: this.Archivos,
      EstadoExpediente: this.EstadoExpediente,
      FechaRegistro: this.FechaRegistro,
      NombreDocumento: this.NombreDocumento,
      UsuarioRegistroId: this.UsuarioRegistroId,
    }
  }

  public setValoreRegistroActividadNuevoProyecto(

    UsuarioRegistroId: number[],
    Detalle: string,
    ProyectoId: number,

  ) {
    this.Detalle = Detalle;
    this.UsuarioRegistroId = new ELookupMultiple<number>(UsuarioRegistroId);
    this.ProyectoId = ProyectoId;
    this.FechaRegistro = new Date();
  }

  public getValoresRegistroActividadNuevoProyecto() {
    return {

      FechaRegistro: this.FechaRegistro,
      UsuarioRegistroId: this.UsuarioRegistroId,
      Detalle: this.Detalle,
      ProyectoId: this.ProyectoId,

    }
  }

  public setValoresNuevoProyecto(
    EstadoProyecto: string,
    NombreProyecto: string,
    UsuarioRegistroId: number[],
    Descripcion: string,
    // UsuarioResponsableId: number[],
    AreaId: number,
    Codigo: string

  ) {
    this.EstadoProyecto = EstadoProyecto;
    this.FechaRegistro = new Date();
    this.NombreProyecto = NombreProyecto;
    this.UsuarioRegistroId = new ELookupMultiple<number>(UsuarioRegistroId);
    this.Descripcion = Descripcion;
    // this.UsuarioResponsableId = new ELookupMultiple<number>(UsuarioResponsableId);
    this.AreaId = AreaId;
    this.Codigo = Codigo;
  }



  public getValoresNuevoProyecto() {
    return {
      EstadoProyecto: this.EstadoProyecto,
      FechaRegistro: this.FechaRegistro,
      NombreProyecto: this.NombreProyecto,
      UsuarioRegistroId: this.UsuarioRegistroId,
      Descripcion: this.Descripcion,
      // UsuarioResponsableId: this.UsuarioResponsableId,
      AreaId: this.AreaId,
      Codigo: this.Codigo
    }
  }


  public setValoresEditarProyecto(
    NombreProyecto: string,
    Descripcion: string,
    AreaId: number,

  ) {
    this.NombreProyecto = NombreProyecto;
    this.Descripcion = Descripcion;
    this.AreaId = AreaId;
  }



  public getValoresEditarProyecto() {
    return {
      NombreProyecto: this.NombreProyecto,
      Descripcion: this.Descripcion,
      AreaId: this.AreaId,
    }
  }

  public setValoresEditarEstado(
    EstadoProyecto: string

  ) {
    this.EstadoProyecto = EstadoProyecto;

  }



  public getValoresEditarEstado() {
    return {
      EstadoProyecto: this.EstadoProyecto,

    }
  }

  public setValoresTipoDirectiva(
    Archivos: string,
    AreaTexto: string,
    Codigo: string,
    CompartidoConId: ELookupMultiple<number>,
    DivisionTexto: string,
    EmpresaId: number,
    EntidadId: number,
    EsIncumplimiento: boolean,
    EsConfidencial: boolean,
    ExpedientesRelacionadosId: ELookupMultiple<number>,
    FechaPlazo: Date,
    FechaRecepcion: Date,
    GrupoGestionId: number,
    GrupoGrupoGestionId: number,
    IncidentesAsociadosIds: string,
    NombreDocumento: string,
    NormasRelacionadasId: ELookupMultiple<number>,
    OrigenPlazo: string,
    PalabrasClaves: string,
    ProyectosAsociadosIds: string,
    ReportesAsociadosIds: string,
    TipoDirectivaId: number,
    Titulo: string,
    ResponsableId: number,
    ResponsablesAuxiliaresId: number[],
    ResponsablesAuxiliaresJson: string,
    EstadoExpediente: string
  ) {
    this.Archivos = Archivos;
    this.AreaTexto = AreaTexto;
    if (Codigo) {
      this.Codigo = Codigo;
    }

    this.CompartidoConId = CompartidoConId;
    this.DivisionTexto = DivisionTexto;
    this.EmpresaId = EmpresaId;
    this.EntidadId = EntidadId;
    this.EsIncumplimiento = EsIncumplimiento;
    this.EsConfidencial = EsConfidencial;
    this.ExpedientesRelacionadosId = ExpedientesRelacionadosId;
    this.FechaPlazo = FechaPlazo;
    this.FechaRecepcion = FechaRecepcion;
    this.GrupoGestionId = GrupoGestionId;
    this.GrupoGrupoGestionId = GrupoGrupoGestionId;
    this.IncidentesAsociadosIds = IncidentesAsociadosIds;
    this.NombreDocumento = NombreDocumento;
    this.NormasRelacionadasId = NormasRelacionadasId;
    this.OrigenPlazo = OrigenPlazo;
    this.PalabrasClaves = PalabrasClaves;
    this.ProyectosAsociadosIds = ProyectosAsociadosIds;
    this.TipoDirectivaId = TipoDirectivaId;
    this.Title = Titulo;
    this.ReportesAsociadosIds = ReportesAsociadosIds;
    this.ResponsableId = ResponsableId;
    this.ResponsablesAuxiliaresId = new ELookupMultiple<number>(ResponsablesAuxiliaresId);
    this.ResponsablesAuxiliaresJson = ResponsablesAuxiliaresJson;
    this.EstadoExpediente = EstadoExpediente;
  }

  public getValoresTipoDirectiva(): any {
    return {
      Archivos: this.Archivos,
      AreaTexto: this.AreaTexto,
      Codigo: this.Codigo,
      CompartidoConId: this.CompartidoConId,
      DivisionTexto: this.DivisionTexto,
      EmpresaId: this.EmpresaId,
      EntidadId: this.EntidadId,
      EsIncumplimiento: this.EsIncumplimiento,
      EsConfidencial: this.EsConfidencial,
      ExpedientesRelacionadosId: this.ExpedientesRelacionadosId,
      FechaPlazo: this.FechaPlazo,
      FechaRecepcion: this.FechaRecepcion,
      GrupoGestionId: this.GrupoGestionId,
      GrupoGrupoGestionId: this.GrupoGrupoGestionId,
      IncidentesAsociadosIds: this.IncidentesAsociadosIds,
      NombreDocumento: this.NombreDocumento,
      NormasRelacionadasId: this.NormasRelacionadasId,
      OrigenPlazo: this.OrigenPlazo,
      PalabrasClaves: this.PalabrasClaves,
      ProyectosAsociadosIds: this.ProyectosAsociadosIds,
      ReportesAsociadosIds: this.ReportesAsociadosIds,
      TipoDirectivaId: this.TipoDirectivaId,
      Title: this.Title,
      ResponsableId: this.ResponsableId,
      ResponsablesAuxiliaresId: this.ResponsablesAuxiliaresId,
      ResponsablesAuxiliaresJson: this.ResponsablesAuxiliaresJson,
      EstadoExpediente: this.EstadoExpediente
    }
  }

  public setValoresTipoNoDirectiva(
    Archivos: string,
    AreaTexto: string,
    Codigo: string,
    CompartidoConId: ELookupMultiple<number>,
    DivisionTexto: string,
    EmpresaId: number,
    EntidadId: number,
    EsIncumplimiento: boolean,
    EsConfidencial: boolean,
    ExpedientesRelacionadosId: ELookupMultiple<number>,
    FechaRecepcion: Date,
    GrupoGestionId: number,
    GrupoGrupoGestionId: number,
    IncidentesAsociadosIds: string,
    NombreDocumento: string,
    NormasRelacionadasId: ELookupMultiple<number>,
    PalabrasClaves: string,
    ProyectosAsociadosIds: string,
    ReportesAsociadosIds: string,
    ResponsableId: number,
    ResponsablesAuxiliaresId: number[],
    ResponsablesAuxiliaresJson: string,
    TipoDirectivaId: number,
    Title: string,
    EstadoExpediente: string
  ) {
    this.Archivos = Archivos;
    this.AreaTexto = AreaTexto;
    this.Codigo = Codigo;
    this.CompartidoConId = CompartidoConId;
    this.DivisionTexto = DivisionTexto;
    this.CompartidoConId = CompartidoConId;
    this.EmpresaId = EmpresaId;
    this.EntidadId = EntidadId;
    this.EsIncumplimiento = EsIncumplimiento;
    this.EsConfidencial = EsConfidencial;
    this.ExpedientesRelacionadosId = ExpedientesRelacionadosId;
    this.FechaRecepcion = FechaRecepcion;
    this.GrupoGestionId = GrupoGestionId;
    this.GrupoGrupoGestionId = GrupoGrupoGestionId;
    this.IncidentesAsociadosIds = IncidentesAsociadosIds;
    this.NombreDocumento = NombreDocumento;
    this.NormasRelacionadasId = NormasRelacionadasId;
    this.PalabrasClaves = PalabrasClaves;
    this.ProyectosAsociadosIds = ProyectosAsociadosIds;
    this.ReportesAsociadosIds = ReportesAsociadosIds;
    this.ResponsableId = ResponsableId;
    this.ResponsablesAuxiliaresId = new ELookupMultiple<number>(ResponsablesAuxiliaresId);
    this.ResponsablesAuxiliaresJson = ResponsablesAuxiliaresJson;
    this.TipoDirectivaId = TipoDirectivaId;
    this.Title = Title;
    this.EstadoExpediente = EstadoExpediente;
  }

  public getValoresTipoNoDirectiva(): any {
    return {
      Archivos: this.Archivos,
      AreaTexto: this.AreaTexto,
      Codigo: this.Codigo,
      CompartidoConId: this.CompartidoConId,
      DivisionTexto: this.DivisionTexto,
      EmpresaId: this.EmpresaId,
      EntidadId: this.EntidadId,
      EsIncumplimiento: this.EsIncumplimiento,
      EsConfidencial: this.EsConfidencial,
      ExpedientesRelacionadosId: this.ExpedientesRelacionadosId,
      FechaAsignacion: new Date(),
      FechaRecepcion: this.FechaRecepcion,
      GrupoGestionId: this.GrupoGestionId,
      GrupoGrupoGestionId: this.GrupoGrupoGestionId,
      IncidentesAsociadosIds: this.IncidentesAsociadosIds,
      NombreDocumento: this.NombreDocumento,
      NormasRelacionadasId: this.NormasRelacionadasId,
      PalabrasClaves: this.PalabrasClaves,
      ProyectosAsociadosIds: this.ProyectosAsociadosIds,
      ReportesAsociadosIds: this.ReportesAsociadosIds,
      ResponsableId: this.ResponsableId,
      ResponsablesAuxiliaresId: this.ResponsablesAuxiliaresId,
      ResponsablesAuxiliaresJson: this.ResponsablesAuxiliaresJson,
      TipoDirectivaId: this.TipoDirectivaId,
      Title: this.Title,
      EstadoExpediente: this.EstadoExpediente,
    }
  }

  public setValoresTipoComunicacion(
    Archivos: string,
    Codigo: string,
    CompartidoConId: ELookupMultiple<number>,
    EmpresaId: number,
    EntidadId: number,
    EsIncumplimiento: boolean,
    EsConfidencial: boolean,
    ExpedientesRelacionadosId: ELookupMultiple<number>,
    FechaRecepcion: Date,
    IncidentesAsociadosIds: string,
    NombreDocumento: string,
    NormasRelacionadasId: ELookupMultiple<number>,
    PalabrasClaves: string,
    ProyectosAsociadosIds: string,
    ReportesAsociadosIds: string,
    TipoDirectivaId: number,
    Title: string,
    EstadoExpediente: string
  ) {
    this.Archivos = Archivos,
      this.Codigo = Codigo;
    this.CompartidoConId = CompartidoConId;
    this.EmpresaId = EmpresaId;
    this.EntidadId = EntidadId;
    this.EsIncumplimiento = EsIncumplimiento;
    this.EsConfidencial = EsConfidencial;
    this.ExpedientesRelacionadosId = ExpedientesRelacionadosId;
    this.FechaRecepcion = FechaRecepcion;
    this.IncidentesAsociadosIds = IncidentesAsociadosIds;
    this.NombreDocumento = NombreDocumento;
    this.NormasRelacionadasId = NormasRelacionadasId;
    this.PalabrasClaves = PalabrasClaves;
    this.ProyectosAsociadosIds = ProyectosAsociadosIds;
    this.ReportesAsociadosIds = ReportesAsociadosIds;
    this.TipoDirectivaId = TipoDirectivaId;
    this.Title = Title;
    this.EstadoExpediente = EstadoExpediente;
  }

  public getValoresTipoComunicacion(): any {
    return {
      Archivos: this.Archivos,
      Codigo: this.Codigo,
      CompartidoConId: this.CompartidoConId,
      EmpresaId: this.EmpresaId,
      EntidadId: this.EntidadId,
      EsIncumplimiento: this.EsIncumplimiento,
      EsConfidencial: this.EsConfidencial,
      ExpedientesRelacionadosId: this.ExpedientesRelacionadosId,
      FechaRecepcion: this.FechaRecepcion,
      IncidentesAsociadosIds: this.IncidentesAsociadosIds,
      NombreDocumento: this.NombreDocumento,
      NormasRelacionadasId: this.NormasRelacionadasId,
      PalabrasClaves: this.PalabrasClaves,
      ProyectosAsociadosIds: this.ProyectosAsociadosIds,
      ReportesAsociadosIds: this.ReportesAsociadosIds,
      TipoDirectivaId: this.TipoDirectivaId,
      Title: this.Title,
      EstadoExpediente: this.EstadoExpediente,
    }
  }

}
