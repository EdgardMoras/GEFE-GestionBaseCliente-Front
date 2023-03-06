import EExpedienteReporte from "./EExpedienteReporte";
import EArchivoAtencionExpedienteReporte from "../logicas/EArchivoAtencionExpedienteReporte";
import Lookup from "../Base/Lookup";
import Usuario from "../Base/Usuario";
import Util from "src/genericos/Util";

export default class EAtenderExpedienteReporte {
  public ID: number;
  public Comentario: string;
  public MotivoRechazo: string;
  public FechaEnvio: any;
  public UsuarioAtencion: Usuario;
  public FechaAtencion: any;
  public Reporte: Lookup;
  public ExpedienteReporte: Lookup;
  public EstadoAtencion: string;
  public Archivos: EArchivoAtencionExpedienteReporte[];

  public ItemsExpedienteReporte: EExpedienteReporte[];
  public SeleccionarTodos: boolean;
  public CargoValidoOtrosReportes: boolean;

  constructor() {
    this.ID = 0;
    this.Comentario = "";
    this.MotivoRechazo = "";
    this.FechaEnvio = "";
    this.FechaAtencion = "";
    this.UsuarioAtencion = new Usuario();
    this.Reporte = new Lookup();
    this.ExpedienteReporte = new Lookup();
    this.EstadoAtencion = "";
    this.Archivos = [];

    this.ItemsExpedienteReporte = [];
    this.SeleccionarTodos = false;
    this.CargoValidoOtrosReportes = false;
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Comentario = Util.ObtenerTexto(elementoItemLista.Comentario);
    this.FechaEnvio = Util.ObtenerTexto(elementoItemLista.FechaEnvio);
    this.FechaAtencion = Util.ObtenerTexto(elementoItemLista.FechaAtencion);
    this.UsuarioAtencion = Util.ObtenerUsuario(elementoItemLista.Author);
    this.Reporte = Util.ObtenerLookup(elementoItemLista.Reporte);
    this.ExpedienteReporte = Util.ObtenerLookup(
      elementoItemLista.ExpedienteReporte
    );
    this.EstadoAtencion = Util.ObtenerTexto(elementoItemLista.EstadoAtencion);
  }
}
