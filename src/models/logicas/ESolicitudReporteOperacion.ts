import ESolicitudReporte from '../fisicas/ESolicitudReporte';
import EElementoCombo from './EElementoCombo';

export default class ESolicitudReporteOperacion {

  public registro: ESolicitudReporte;
  public esEditado: boolean;

  public empresa: EElementoCombo | null;
  public entidad: EElementoCombo | null;
  public destinatario: EElementoCombo | null;
  public frecuencia: EElementoCombo | null;
  public tipoReporte: EElementoCombo | null;
  public tipoSolicitud: EElementoCombo | null;

  constructor(registro: ESolicitudReporte) {
    this.registro = registro;
    this.esEditado = false;
  }
}
