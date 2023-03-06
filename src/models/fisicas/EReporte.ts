import Usuario from "src/models/Base/Usuario";
import Lookup from "../Base/Lookup";
import Util from "src/genericos/Util";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import ParseJsom from "src/genericos/ParseJsom";
import { Deferred } from "ts-deferred";
import { RestFiltros } from "src/genericos/RestFiltros";
import Funciones from "src/genericos/Funciones";

export default class EReporte {
  public static Campos = {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    Title: ParametrosNoAdministrables.ColumnasSitio.Title,
    CodigoReporte: ParametrosNoAdministrables.ColumnasSitio.CodigoReporte,
    Empresa: ParametrosNoAdministrables.ColumnasSitio.Empresa,
    Entidad: ParametrosNoAdministrables.ColumnasSitio.Entidad,
    EstadoReporte: ParametrosNoAdministrables.ColumnasSitio.EstadoReporte
  };

  public static CamposExpand = {
    Empresa: ParametrosNoAdministrables.ColumnasSitio.Empresa,
    Entidad: ParametrosNoAdministrables.ColumnasSitio.Entidad
  };

  public static async obtenerPorIdsReportes(idsReporte: number[]): Promise<EReporte[]> {
    const dfd: Deferred<EReporte[]> = new Deferred<EReporte[]>();

    const filtrosIds = idsReporte
      .map((id: number) => {
        return `${ParametrosNoAdministrables.ColumnasSitio.ID} eq ${id}`;
      })
      .join(" or ");
    const filtroPorId: string = `${filtrosIds}`;

    const listaFieldsSelect = "ID,Title,CodigoReporte";

    const url: string = String.format(ParametrosNoAdministrables.RestEstructuras.SelectFilter, ParametrosNoAdministrables.Listas.Reportes, listaFieldsSelect, filtroPorId);

    const listaResultado: EReporte[] = [];

    if (idsReporte.length === 0) {
      dfd.resolve([]);
    } else {
      Promise.all([Funciones.ObtenerElementoPorRest(url)])
        .then(([resultadoReporte]) => {
          if (resultadoReporte.length === 0) {
            dfd.resolve([]);
            return;
          }

          resultadoReporte.forEach((element: any) => {
            const reporte = new EReporte();
            reporte.setearValoresRest(element);
            listaResultado.push(reporte);
          });

          dfd.resolve(listaResultado);
        })
        .catch(error => {
          dfd.reject(error);
        });
    }

    return dfd.promise;
  }

  public Anexo: string;
  public ArticuloRelacionado: string;
  public CodigoReporte: string;
  public Consideraciones: string;
  public Destinatario: Lookup;
  public Empresa: Lookup;
  public Entidad: Lookup;
  public EstadoReporte: string;
  public FechaFinVigencia: any;
  public FechaInicioVigencia: any;
  public FechaRegistro: any;
  public FechaSolicitud: any;
  public Formato: string;
  public Frecuencia: string;
  public ID: number;
  public NombreAplicativo: string;
  public Norma: Lookup;
  public PeriodoPrimerEnvio: string;
  public PeriodoPrimerEnvioTemp: string;
  public OpcionRadio: string;
  public Programacion: string;
  public DatosProgramacion: string;
  public TipoEnvio: Lookup;
  public TipoReporte: string;
  public TipoSolicitud: string;
  public Title: string;
  public UsuarioRegistro: Usuario;
  public ElaboradoresNombres: string;
  public EnviadoresNombres: string;
  public Version: number;
  public GeneroVersion: boolean;
  public NormasRelacionadas: number[];
  public ExpedientesRelacionados: number[];
  public IncidentesAsociados: number[];
  public ReportesAsociados: number[];
  public ProyectoAsociados: number[];

  constructor() {
    this.Anexo = "";
    this.ArticuloRelacionado = "";
    this.CodigoReporte = "";
    this.Consideraciones = "";
    this.Destinatario = new Lookup();
    this.Empresa = new Lookup();
    this.Entidad = new Lookup();
    this.EstadoReporte = "";
    this.FechaFinVigencia = "";
    this.FechaInicioVigencia = "";
    this.FechaRegistro = "";
    this.FechaSolicitud = "";
    this.Formato = "";
    this.Frecuencia = "";
    this.ID = 0;
    this.NombreAplicativo = "";
    this.Norma = new Lookup();
    this.PeriodoPrimerEnvio = "";
    this.PeriodoPrimerEnvioTemp = "";
    this.OpcionRadio = "";
    this.Programacion = "";
    this.DatosProgramacion = "";
    this.TipoEnvio = new Lookup();
    this.TipoReporte = "";
    this.TipoSolicitud = "";
    this.Title = "";
    this.UsuarioRegistro = new Usuario();
    this.ElaboradoresNombres = "";
    this.EnviadoresNombres = "";
    this.Version = 0;
    this.GeneroVersion = false;
    this.NormasRelacionadas = [];
    this.ExpedientesRelacionados = [];
    this.IncidentesAsociados = [];
    this.ReportesAsociados = [];
    this.ProyectoAsociados = [];
  }

  public obtenerDatosReporte(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.CodigoReporte = Util.ObtenerTexto(elementoItemLista.CodigoReporte);
    this.Title = Util.ObtenerTexto(elementoItemLista.Title);
    this.ArticuloRelacionado = Util.ObtenerTexto(elementoItemLista.ArticuloRelacionado);
    this.Empresa = Util.ObtenerLookup(elementoItemLista.Empresa);
    this.Entidad = Util.ObtenerLookup(elementoItemLista.Entidad);
    this.Norma = Util.ObtenerLookup(elementoItemLista.Norma);
    this.NombreAplicativo = Util.ObtenerTexto(elementoItemLista.NombreAplicativo);
    this.Consideraciones = Util.ObtenerTexto(elementoItemLista.Consideraciones);
    this.FechaInicioVigencia = elementoItemLista.FechaInicioVigencia;
    this.FechaFinVigencia = Util.ObtenerTexto(elementoItemLista.FechaFinVigencia);
    this.TipoReporte = Util.ObtenerTexto(elementoItemLista.TipoReporte);
    this.Formato = Util.ObtenerTexto(elementoItemLista.Formato);
    this.Anexo = Util.ObtenerTexto(elementoItemLista.Anexo);
    this.PeriodoPrimerEnvio = Util.ObtenerTexto(elementoItemLista.PeriodoPrimerEnvio);
    this.PeriodoPrimerEnvioTemp = elementoItemLista.PeriodoPrimerEnvio;
    this.Destinatario = Util.ObtenerLookup(elementoItemLista.Destinatario);
    this.Frecuencia = Util.ObtenerTexto(elementoItemLista.Frecuencia);
    this.EstadoReporte = Util.ObtenerTexto(elementoItemLista.EstadoReporte);
    this.Programacion = Util.ObtenerTexto(elementoItemLista.Programacion);
    this.DatosProgramacion = Util.ObtenerTexto(elementoItemLista.DatosProgramacion);
    this.TipoEnvio = Util.ObtenerLookup(elementoItemLista.TipoEnvio);
    this.ElaboradoresNombres = Util.ObtenerUsuarioMultipleString(elementoItemLista.Elaboradores);
    this.EnviadoresNombres = Util.ObtenerUsuarioMultipleString(elementoItemLista.Enviadores);
    this.Version = Util.ObtenerEntero(elementoItemLista.Version);
    this.GeneroVersion = elementoItemLista.GeneroVersion === "No" ? false : true;
  }

  public obtenerDatosDocumentos(elementoItemLista: any) {
    this.NormasRelacionadas = Util.ObtenerNumberMultiple(elementoItemLista.NormasRelacionadas);
    this.ExpedientesRelacionados = Util.ObtenerNumberMultiple(elementoItemLista.ExpedientesRelacionados);
    this.IncidentesAsociados = Util.ObtenerNumberMultiple(elementoItemLista.IncidentesAsociados);
    this.ReportesAsociados = Util.ObtenerNumberMultiple(elementoItemLista.ReportesAsociados);
    this.ProyectoAsociados = Util.ObtenerNumberMultiple(elementoItemLista.ProyectoAsociados);
  }

  public obtenerProgramacionesReporte(elementoItemLista: any) {
    this.ID = elementoItemLista.ID;
    this.CodigoReporte = elementoItemLista.CodigoReporte;
    this.Title = elementoItemLista.Title;
    this.Empresa = Util.ObtenerLookup(elementoItemLista.Empresa);
    this.Entidad = Util.ObtenerLookup(elementoItemLista.Entidad);
    this.Norma = Util.ObtenerLookup(elementoItemLista.Norma);
    this.TipoReporte = elementoItemLista.TipoReporte;
    this.Formato = elementoItemLista.Formato;
    this.Anexo = elementoItemLista.Anexo;
    this.Destinatario = Util.ObtenerLookup(elementoItemLista.Destinatario);
    this.Frecuencia = elementoItemLista.Frecuencia;
    this.EstadoReporte = elementoItemLista.EstadoReporte;
    this.Programacion = elementoItemLista.Programacion;
    this.ElaboradoresNombres = Util.ObtenerUsuarioMultipleString(elementoItemLista.Elaboradores);
    this.EnviadoresNombres = Util.ObtenerUsuarioMultipleString(elementoItemLista.Enviadores);
  }

  public ObtenerSolicitudReporteAExportar(elementoItemLista: any): any {
    const itemExportar = {
      Código: elementoItemLista.CodigoReporte,
      Título: elementoItemLista.Title,
      Empresa: Util.ObtenerLookup(elementoItemLista.Empresa).Title,
      Entidad: Util.ObtenerLookup(elementoItemLista.Entidad).Title,
      Norma: Util.ObtenerLookup(elementoItemLista.Norma).Title,
      "Tipo Reporte": elementoItemLista.TipoReporte,
      Destinatario: Util.ObtenerLookup(elementoItemLista.Destinatario).Title,
      Frecuencia: elementoItemLista.Frecuencia,
      "F. Fin Vigencia": elementoItemLista.FechaFinVigencia,
      "F. Inicio Vigencia": elementoItemLista.FechaInicioVigencia,
      "Tipo Solicitud": elementoItemLista.TipoSolicitud,
      "Fecha Solicitud": elementoItemLista.FechaSolicitud,
      "Tipo Envío": Util.ObtenerLookup(elementoItemLista.TipoEnvio),
      "Usuario Registro": Util.ObtenerUsuario(elementoItemLista.UsuarioRegistro).Title,
      "Nombre de Aplicativo": elementoItemLista.NombreAplicativo,
      "Artículo Relacionado": elementoItemLista.ArticuloRelacionado,
      Anexo: elementoItemLista.Anexo,
      Formato: elementoItemLista.Formato,
      Consideraciones: elementoItemLista.Consideraciones,
      "Estado Reporte": elementoItemLista.EstadoReporte,
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

  public setearValoresBusquedaReporteAsociadas(elementoItemLista: SP.ListItem, objeto: EReporte) {
    objeto.ID = ParseJsom.parsearNumber(elementoItemLista, EReporte.Campos.ID);
    objeto.CodigoReporte = ParseJsom.parsearString(elementoItemLista, EReporte.Campos.CodigoReporte);
    objeto.Title = ParseJsom.parsearString(elementoItemLista, EReporte.Campos.Title);
    objeto.Empresa = ParseJsom.parsearLookup(elementoItemLista, EReporte.CamposExpand.Empresa);
    objeto.Entidad = ParseJsom.parsearLookup(elementoItemLista, EReporte.CamposExpand.Entidad);
    objeto.EstadoReporte = ParseJsom.parsearString(elementoItemLista, EReporte.Campos.EstadoReporte);
  }

  public setearValoresRest(elementoItemLista: any) {
    this.ID = RestFiltros.parsearNumero(elementoItemLista, EReporte.Campos.ID);
    this.CodigoReporte = RestFiltros.parsearTexto(elementoItemLista, EReporte.Campos.CodigoReporte);
    this.Title = RestFiltros.parsearTexto(elementoItemLista, EReporte.Campos.Title);
  }
}
