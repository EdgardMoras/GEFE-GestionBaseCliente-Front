import Lookup from "../Base/Lookup";
import EArchivoSolicitudAmpliacionExpedienteReporte from "../logicas/EArchivoSolicitudAmpliacionExpedienteReporte";
import Usuario from "../Base/Usuario";
import Util from "src/genericos/Util";
import EExpedienteReporte from "./EExpedienteReporte";

export default class ESolicitudAmpliacionExpedienteReporte {
  public ID: number;
  public Comentario: string;
  public MotivoRechazo: string;
  public Reporte: Lookup;
  public ExpedienteReporte: Lookup;
  public FechaPlazoActual: any;
  public FechaPlazo: any;
  public EstadoSolicitudAmpliacionReporte: string;
  public FechaRegistro: string;
  public RegistradoPor: Usuario;
  public Archivos: EArchivoSolicitudAmpliacionExpedienteReporte[];

  public ItemsExpedienteReporte: EExpedienteReporte[];
  public SeleccionarTodos: boolean;
  public AmpliacionValidoOtrosReportes: boolean;

  constructor() {
    this.ID = 0;
    this.Comentario = "";
    this.MotivoRechazo = "";
    this.Reporte = new Lookup();
    this.ExpedienteReporte = new Lookup();
    this.FechaPlazoActual = "";
    this.FechaPlazo = "";
    this.EstadoSolicitudAmpliacionReporte = "";
    this.FechaRegistro = "";
    this.RegistradoPor = new Usuario();
    this.Archivos = [];

    this.ItemsExpedienteReporte = [];
    this.SeleccionarTodos = false;
    this.AmpliacionValidoOtrosReportes = false;
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Comentario = Util.ObtenerTexto(elementoItemLista.Comentario);
    this.FechaRegistro = Util.ObtenerTexto(elementoItemLista.Created);
    this.RegistradoPor = Util.ObtenerUsuario(elementoItemLista.Author);
    this.Reporte = Util.ObtenerLookup(elementoItemLista.Reporte);
    this.ExpedienteReporte = Util.ObtenerLookup(
      elementoItemLista.ExpedienteReporte
    );
    this.FechaPlazoActual = Util.ObtenerTexto(
      elementoItemLista.FechaPlazoActual
    );
    this.FechaPlazo = Util.ObtenerTexto(elementoItemLista.FechaPlazo);
    this.EstadoSolicitudAmpliacionReporte = Util.ObtenerTexto(
      elementoItemLista.EstadoSolicitudAmpliacionReporte
    );
  }
}
