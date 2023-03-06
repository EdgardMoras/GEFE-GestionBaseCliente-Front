import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { EBaseEntidad } from "src/models/Base/EBaseEntidad";
import ELookupMultiple from '../logicas/ELookupMultiple';

export default class EEnvioCorreo extends EBaseEntidad {
  public static Campos = {
    AsuntoCorreo: ParametrosNoAdministrables.ColumnasSitio.AsuntoCorreo,
    CorreoUsuariosDestino:
      ParametrosNoAdministrables.ColumnasSitio.CorreoUsuariosDestino,
    CorreoUsuariosCopia:
      ParametrosNoAdministrables.ColumnasSitio.CorreoUsuariosCopia,
    ContenidoCorreo: ParametrosNoAdministrables.ColumnasSitio.ContenidoCorreo
  };

  public static ListaCampos = [
    ParametrosNoAdministrables.ColumnasSitio.AsuntoCorreo,
    ParametrosNoAdministrables.ColumnasSitio.CorreoUsuariosDestino,
    ParametrosNoAdministrables.ColumnasSitio.CorreoUsuariosCopia,
    ParametrosNoAdministrables.ColumnasSitio.ContenidoCorreo
  ];

  public AsuntoCorreo: string;
  public CorreoUsuarioDestino: string;
  public CorreoUsuarioCopia: string;
  public ContenidoCorreo: string;
  public FechaRegistro: Date | null;
  public UsuarioRegistroId: ELookupMultiple<number>;
  public SolicitudText: string;



  constructor() {
    super();
    this.ID = 0;
    this.AsuntoCorreo = "";
    this.ContenidoCorreo = "";
    this.FechaRegistro = null;
    this.CorreoUsuarioCopia = "";
    this.CorreoUsuarioDestino = "";

  }



  public setearValoresCampos(
    AsuntoCorreo: string,
    CorreoUsuariosDestino: string,
    CorreoUsuariosCopia: string,
    ContenidoCorreo: string,
    SolicitudText: string,
    // UsuarioRegistroId: number[],
  ) {
    this.AsuntoCorreo = AsuntoCorreo;
    this.CorreoUsuarioDestino = CorreoUsuariosDestino;
    this.CorreoUsuarioCopia = CorreoUsuariosCopia;
    this.ContenidoCorreo = ContenidoCorreo;
    this.FechaRegistro = new Date();
    this.SolicitudText = SolicitudText;
    //  this.UsuarioRegistroId = new ELookupMultiple<number>(UsuarioRegistroId);
  }

  public getValoresValoresCampos() {
    return {
      AsuntoCorreo: this.AsuntoCorreo,
      CorreoUsuarioEnvio: this.CorreoUsuarioDestino,
      CorreoUsuarioCopia: this.CorreoUsuarioCopia,
      ContenidoCorreo: this.ContenidoCorreo,
      FechaRegistro: this.FechaRegistro,
      SolicitudText: this.SolicitudText,
      // UsuarioRegistroId: this.UsuarioRegistroId,
    }
  }

}
