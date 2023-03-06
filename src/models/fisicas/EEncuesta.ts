import Usuario from "src/models/Base/Usuario";
import Util from "src/genericos/Util";
import EArchivoEncuesta from "./EArchivoEncuesta";

export default class EEncuesta {
  public ID: number;
  public Title: string;
  public CodigoEncuesta: string;
  public Tema: string;
  public EstadoEncuesta: string;
  public VigenciaDesde: any;
  public VigenciaHasta: any;
  public EncuestasPendientes: any;
  public EncuestasRespondidas: any;
  public UsuarioRegistro: Usuario;
  public FechaRegistro: any;
  public Objetivo: string;
  public FechaEnvio: any;
  public FechaLimite: any;
  public TituloEncuesta: string;
  public DescripcionEncuesta: string;
  public Archivos: EArchivoEncuesta[];

  constructor() {
    this.ID = 0;
    this.Title = "";
    this.CodigoEncuesta = "";
    this.Tema = "";
    this.EstadoEncuesta = "";
    this.VigenciaDesde = "";
    this.VigenciaHasta = "";
    this.EncuestasPendientes = "";
    this.EncuestasRespondidas = "";
    this.UsuarioRegistro = new Usuario();
    this.FechaRegistro = "";
    this.Objetivo = "";
    this.FechaEnvio = "";
    this.FechaLimite = "";
    this.TituloEncuesta = "";
    this.DescripcionEncuesta = "";
    this.Archivos = [];
  }

  public obtenerDatosEncuesta(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Title = Util.ObtenerTexto(elementoItemLista.Title);
    this.CodigoEncuesta = Util.ObtenerTexto(elementoItemLista.CodigoEncuesta);
    this.Tema = Util.ObtenerTexto(elementoItemLista.Tema);
    this.TituloEncuesta = Util.ObtenerTexto(elementoItemLista.TituloEncuesta);
    this.DescripcionEncuesta = Util.ObtenerTexto(
      elementoItemLista.DescripcionEncuesta
    );
    this.EstadoEncuesta = Util.ObtenerTexto(elementoItemLista.EstadoEncuesta);
    this.VigenciaDesde = Util.ObtenerTexto(elementoItemLista.VigenciaDesde);
    this.VigenciaHasta = Util.ObtenerTexto(elementoItemLista.VigenciaHasta);
    this.EncuestasPendientes = Util.ObtenerTexto(
      elementoItemLista.EncuestasPendientes
    );
    this.EncuestasRespondidas = Util.ObtenerTexto(
      elementoItemLista.EncuestasRespondidas
    );
    this.UsuarioRegistro = Util.ObtenerUsuario(
      elementoItemLista.UsuarioRegistro
    );
    this.FechaRegistro = Util.ObtenerTexto(elementoItemLista.FechaRegistro);
    this.Objetivo = Util.ObtenerTexto(elementoItemLista.Objetivo);
    this.FechaEnvio = Util.ObtenerTexto(elementoItemLista.FechaEnvio);
    this.FechaLimite = Util.ObtenerTexto(elementoItemLista.VigenciaHasta);
  }

  public ObtenerEncuestaAExportar(elementoItemLista: any): any {
    const itemExportar = {
      Código: Util.ObtenerTexto(elementoItemLista.CodigoEncuesta),
      Tema: Util.ObtenerTexto(elementoItemLista.Tema),
      Estado: Util.ObtenerTexto(elementoItemLista.EstadoEncuesta),
      "Vigencia Desde": Util.ObtenerTexto(elementoItemLista.VigenciaDesde),
      "Vigencia Hasta": Util.ObtenerTexto(elementoItemLista.VigenciaHasta),
      Pendientes: Util.ObtenerTexto(elementoItemLista.EncuestasPendientes),
      Respondidas: Util.ObtenerTexto(elementoItemLista.EncuestasRespondidas),
      "Usuario Registro": Util.ObtenerUsuario(elementoItemLista.UsuarioRegistro)
        .Title,
      "Fecha Registro": Util.ObtenerTexto(elementoItemLista.FechaRegistro)
    };

    return itemExportar;
  }
}
