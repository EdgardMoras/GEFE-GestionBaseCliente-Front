import { EBaseEntidad } from "src/models/Base/EBaseEntidad";
import EElementoPeoplePicker from './EElementoPeoplePicker';

export default class ERegistroAsistente extends EBaseEntidad {  

  public usuario: EElementoPeoplePicker | null;
  public asistente: EElementoPeoplePicker | null;

  constructor(){
      super();

      this.usuario = null;
      this.asistente = null;
  }
 
}
