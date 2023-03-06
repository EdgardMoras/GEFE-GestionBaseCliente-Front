import Usuario from "src/models/Base/Usuario";
import Lookup from "../Base/Lookup";
import Util from "src/genericos/Util";

export default class EExpedienteReporte {
  public Anexo: string;
  public Reporte: Lookup;
  public Destinatario: Lookup;
  public Empresa: Lookup;
  public Entidad: Lookup;
  public EstadoExpedienteReporte: string;
  public FechaLimite: any;
  public FechaEnvio: any;
  public FechaEnvioValidado: any;
  public FechaCierre: any;
  public FechaRegistro: any;
  public Formato: string;
  public Frecuencia: string;
  public Periodo: string;
  public ID: number;
  public Norma: Lookup;
  public Programacion: string;
  public ProgramacionReporte: Lookup;
  public TipoReporte: string;
  public Title: string;
  public TituloReporte: string;
  public UsuarioRegistro: Usuario;
  public ElaboradoresNombres: string;
  public EnviadoresNombres: string;
  public DivisionElaborador: string;
  public VersionReporte: number;
  public Ampliaciones: number;
  public Seleccionado: boolean;
  public Responsables: Usuario[];
  public FechaNuevoPlazo: any;

  constructor() {
    this.Anexo = "";
    this.Reporte = new Lookup();
    this.Destinatario = new Lookup();
    this.Empresa = new Lookup();
    this.Entidad = new Lookup();
    this.EstadoExpedienteReporte = "";
    this.FechaLimite = "";
    this.FechaEnvio = "";
    this.FechaEnvioValidado = "";
    this.FechaCierre = "";
    this.FechaRegistro = "";
    this.Formato = "";
    this.Frecuencia = "";
    this.Periodo = "";
    this.ID = 0;
    this.Norma = new Lookup();
    this.Programacion = "";
    this.ProgramacionReporte = new Lookup();
    this.TipoReporte = "";
    this.Title = "";
    this.TituloReporte = "";
    this.UsuarioRegistro = new Usuario();
    this.ElaboradoresNombres = "";
    this.EnviadoresNombres = "";
    this.DivisionElaborador = "";
    this.VersionReporte = 0;
    this.Ampliaciones = 0;
    this.Seleccionado = false;
    this.Responsables = [];
    this.FechaNuevoPlazo = "";
  }

  public obtenerDatosExpediente(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Anexo = Util.ObtenerTexto(elementoItemLista.Anexo);
    this.Destinatario = Util.ObtenerLookup(elementoItemLista.Destinatario);
    this.Empresa = Util.ObtenerLookup(elementoItemLista.Empresa);
    this.Entidad = Util.ObtenerLookup(elementoItemLista.Entidad);
    this.EstadoExpedienteReporte = Util.ObtenerTexto(elementoItemLista.EstadoExpedienteReporte);
    this.FechaLimite = Util.ObtenerTexto(elementoItemLista.FechaLimite);
    this.FechaEnvio = Util.ObtenerTexto(elementoItemLista.FechaEnvio);
    this.FechaEnvioValidado = Util.ObtenerTexto(elementoItemLista.FechaEnvioValidado);
    this.FechaCierre = Util.ObtenerTexto(elementoItemLista.FechaCierre);
    this.FechaRegistro = Util.ObtenerTexto(elementoItemLista.FechaRegistro);
    this.Formato = Util.ObtenerTexto(elementoItemLista.Formato);
    this.Frecuencia = Util.ObtenerTexto(elementoItemLista.Frecuencia);
    this.Periodo = Util.ObtenerTexto(elementoItemLista.Periodo);
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Norma = Util.ObtenerLookup(elementoItemLista.Norma);
    this.Programacion = Util.ObtenerTexto(elementoItemLista.Programacion);
    this.ProgramacionReporte = Util.ObtenerLookup(elementoItemLista.ProgramacionReporte);
    this.Reporte = Util.ObtenerLookup(elementoItemLista.Reporte);
    this.TituloReporte = Util.ObtenerTexto(elementoItemLista.TituloReporte);
    this.TipoReporte = Util.ObtenerTexto(elementoItemLista.TipoReporte);
    this.Title = Util.ObtenerTexto(elementoItemLista.Title);
    this.UsuarioRegistro = Util.ObtenerUsuario(elementoItemLista.UsuarioRegistro);
    this.ElaboradoresNombres = Util.ObtenerUsuarioMultipleString(elementoItemLista.Elaboradores);
    this.EnviadoresNombres = Util.ObtenerUsuarioMultipleString(elementoItemLista.Enviadores);
    this.DivisionElaborador = Util.ObtenerTexto(elementoItemLista.DivisionElaborador);
    this.VersionReporte = Util.ObtenerEntero(elementoItemLista.VersionReporte);
    this.Ampliaciones = Util.ObtenerEntero(elementoItemLista.Ampliaciones);
    this.FechaNuevoPlazo = Util.ObtenerTexto(elementoItemLista.FechaNuevoPlazo);
    const elaboradores = Util.ObtenerUsuarioMultiple(elementoItemLista.Elaboradores);
    const aprobadores = Util.ObtenerUsuarioMultiple(elementoItemLista.Aprobadores);
    const enviadores = Util.ObtenerUsuarioMultiple(elementoItemLista.Enviadores);
    const consolidadores = Util.ObtenerUsuarioMultiple(elementoItemLista.Consolidadores);
    this.Responsables = elaboradores
      .concat(aprobadores)
      .concat(enviadores)
      .concat(consolidadores);
  }

  public obtenerExpedienteReporte(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Anexo = Util.ObtenerTexto(elementoItemLista.Anexo);
    this.Destinatario = Util.ObtenerLookup(elementoItemLista.Destinatario);
    this.Empresa = Util.ObtenerLookup(elementoItemLista.Empresa);
    this.Entidad = Util.ObtenerLookup(elementoItemLista.Entidad);
    this.EstadoExpedienteReporte = Util.ObtenerTexto(elementoItemLista.EstadoExpedienteReporte);
    this.FechaLimite = Util.ObtenerTexto(elementoItemLista.FechaLimite);
    this.FechaEnvio = Util.ObtenerTexto(elementoItemLista.FechaEnvio);
    this.FechaEnvioValidado = Util.ObtenerTexto(elementoItemLista.FechaEnvioValidado);
    this.FechaCierre = elementoItemLista.FechaCierre;
    this.FechaRegistro = elementoItemLista.FechaRegistro;
    this.Formato = Util.ObtenerTexto(elementoItemLista.Formato);
    this.Frecuencia = Util.ObtenerTexto(elementoItemLista.Frecuencia);
    this.Periodo = Util.ObtenerTexto(elementoItemLista.Periodo);
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Norma = Util.ObtenerLookup(elementoItemLista.Norma);
    this.Programacion = Util.ObtenerTexto(elementoItemLista.Programacion);
    this.ProgramacionReporte = Util.ObtenerLookup(elementoItemLista.ProgramacionReporte);
    this.Reporte = Util.ObtenerLookup(elementoItemLista.Reporte);
    this.TituloReporte = Util.ObtenerTexto(elementoItemLista.TituloReporte);
    this.TipoReporte = Util.ObtenerTexto(elementoItemLista.TipoReporte);
    this.Title = Util.ObtenerTexto(elementoItemLista.Title);
    this.UsuarioRegistro = Util.ObtenerUsuario(elementoItemLista.UsuarioRegistro);
    this.ElaboradoresNombres = Util.ObtenerUsuarioMultipleString(elementoItemLista.Elaboradores);
    this.EnviadoresNombres = Util.ObtenerUsuarioMultipleString(elementoItemLista.Enviadores);
    this.DivisionElaborador = Util.ObtenerTexto(elementoItemLista.DivisionElaborador);
    this.VersionReporte = Util.ObtenerEntero(elementoItemLista.VersionReporte);
  }

  public ObtenerExpedienteReporteAExportar(elementoItemLista: any): any {
    const itemExportar = {
      "Código Reporte": Util.ObtenerLookup(elementoItemLista.Reporte).Title,
      "Título Reporte": Util.ObtenerTexto(elementoItemLista.TituloReporte),
      Empresa: Util.ObtenerLookup(elementoItemLista.Empresa).Title,
      Entidad: Util.ObtenerLookup(elementoItemLista.Entidad).Title,
      Norma: Util.ObtenerLookup(elementoItemLista.Norma).Title,
      "Tipo Reporte": Util.ObtenerTexto(elementoItemLista.TipoReporte),
      Destinatario: Util.ObtenerLookup(elementoItemLista.Destinatario).Title,
      Frecuencia: Util.ObtenerTexto(elementoItemLista.Frecuencia),
      Periodo: Util.ObtenerTexto(elementoItemLista.Periodo),
      "Fecha Límite": elementoItemLista.FechaLimite,
      "Fecha Envío": elementoItemLista.FechaEnvio,
      "Fecha Cierre": elementoItemLista.FechaCierre,
      Anexo: Util.ObtenerTexto(elementoItemLista.Anexo),
      Formato: Util.ObtenerTexto(elementoItemLista.Formato),
      Estado: Util.ObtenerTexto(elementoItemLista.EstadoExpedienteReporte),
      "Usuario Registro": Util.ObtenerUsuario(elementoItemLista.UsuarioRegistro).Title,
      "Fecha Registro": elementoItemLista.FechaRegistro,
      Elaboradores: Util.ObtenerUsuarioMultipleString(elementoItemLista.Elaboradores),
      Aprobadores: Util.ObtenerUsuarioMultipleString(elementoItemLista.Aprobadores),
      Enviadores: Util.ObtenerUsuarioMultipleString(elementoItemLista.Enviadores),
      "Área (Aprobador)": elementoItemLista.AreaAprobador,
      "División (Aprobador)": elementoItemLista.DivisionAprobador,
      "Área (Enviador)": elementoItemLista.AreaEnviador,
      "División (Enviador)": elementoItemLista.DivisionEnviador
    };

    return itemExportar;
  }
}
