import Lookup from "../Base/Lookup";
import Util from "src/genericos/Util";
import Usuario from "../Base/Usuario";

export default class EBusquedaTareaExpedienteReporte {
  public ID: number;
  public Title: string;
  public DetalleTarea: string;
  public Responsable: Usuario;
  public EstadoTareaExpedienteReporte: string;
  public FechaLimite: any;
  public FechaAtencion: any;
  public Reporte: Lookup;
  public ExpedienteReporte: Lookup;
  public FechaRegistro: any;
  public RegistradoPor: Usuario;

  constructor() {
    this.ID = 0;
    this.Title = "";
    this.DetalleTarea = "";
    this.Responsable = new Usuario();
    this.FechaLimite = "";
    this.FechaAtencion = "";
    this.EstadoTareaExpedienteReporte = "";
    this.Reporte = new Lookup();
    this.ExpedienteReporte = new Lookup();
    this.FechaRegistro = "";
    this.RegistradoPor = new Usuario();
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Title = Util.ObtenerTexto(elementoItemLista.Title);
    this.DetalleTarea = Util.ObtenerTexto(elementoItemLista.DetalleTarea);
    this.Responsable = Util.ObtenerUsuario(elementoItemLista.Responsable);
    this.FechaLimite = Util.ObtenerTexto(elementoItemLista.FechaLimite);
    this.FechaAtencion = Util.ObtenerTexto(elementoItemLista.FechaAtencion);
    this.EstadoTareaExpedienteReporte = Util.ObtenerTexto(
      elementoItemLista.EstadoTareaExpedienteReporte
    );
    this.FechaRegistro = elementoItemLista.Created;
    this.RegistradoPor = Util.ObtenerUsuario(elementoItemLista.Author);
    this.Reporte = Util.ObtenerLookup(elementoItemLista.Reporte);
    this.ExpedienteReporte = Util.ObtenerLookup(
      elementoItemLista.ExpedienteReporte
    );
  }

  public ObtenerTareaAExportar(elementoItemLista: any): any {
    const itemExportar = {
      "Código Reporte": Util.ObtenerLookup(elementoItemLista.Reporte).Title,
      "Código Tarea": Util.ObtenerTexto(elementoItemLista.Title),
      "Detalle Tarea": Util.ObtenerTexto(elementoItemLista.DetalleTarea),
      Responsable: Util.ObtenerUsuario(elementoItemLista.Responsable).Title,
      "Asignado Por": Util.ObtenerLookup(elementoItemLista.Author).Title,
      "Fecha Asignación": Util.ObtenerTexto(elementoItemLista.Created),
      "Fecha Límite": Util.ObtenerTexto(elementoItemLista.FechaLimite)
    };
    return itemExportar;
  }
}
