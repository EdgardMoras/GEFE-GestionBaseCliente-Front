import Util from "src/genericos/Util";
import EElementoCombo from "../logicas/EElementoCombo";

export default class EConfiguracionAlertaReporte {
  public ID: number;
  public CantidadDias: any;
  public CondicionAlerta: string;
  public NotificarInformados: boolean;
  public NotificarSupervisores: boolean;
  public CondicionAlertaCombo: EElementoCombo | null;
  public Eliminar: boolean;
  public HabilitarOpciones: boolean;

  constructor() {
    this.ID = 0;
    this.CantidadDias = "";
    this.CondicionAlerta = "";
    this.NotificarInformados = true;
    this.NotificarSupervisores = true;
    this.CondicionAlertaCombo = new EElementoCombo();
    this.Eliminar = false;
    this.HabilitarOpciones = false;
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.CantidadDias = Util.ObtenerEntero(elementoItemLista.CantidadDias);
    this.CondicionAlerta = Util.ObtenerTexto(elementoItemLista.CondicionAlerta);
    this.NotificarInformados = Util.ObtenerBoolean(
      elementoItemLista.NotificarInformados
    );
    this.NotificarSupervisores = Util.ObtenerBoolean(
      elementoItemLista.NotificarSupervisores
    );
  }
}
