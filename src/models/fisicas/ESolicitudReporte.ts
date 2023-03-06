import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import Usuario from "src/models/Base/Usuario";
import Lookup from "../Base/Lookup";
import Util from "src/genericos/Util";
import { Deferred } from "ts-deferred";
import { RestFiltros } from "../../genericos/RestFiltros";
import Funciones from "../../genericos/Funciones";
import EEmpresa from "./EEmpresa";
import EEntidad from "./EEntidad";

export default class ESolicitudReporte {
  public static Campos = {
    Reporte: ParametrosNoAdministrables.ColumnasSitio.Reporte,
    CodigoReporte: "CodigoReporte",
    TituloReporte: "TituloReporte",
    Title: ParametrosNoAdministrables.ColumnasSitio.Title,
    Empresa: ParametrosNoAdministrables.ColumnasSitio.Empresa,
    Entidad: ParametrosNoAdministrables.ColumnasSitio.Entidad,
    TipoReporte: ParametrosNoAdministrables.ColumnasSitio.TipoReporte,
    Destinatario: ParametrosNoAdministrables.ColumnasSitio.Destinatario,
    Frecuencia: ParametrosNoAdministrables.ColumnasSitio.Frecuencia,
    TipoSolicitud: ParametrosNoAdministrables.ColumnasSitio.TipoSolicitud,
    FechaSolicitud: ParametrosNoAdministrables.ColumnasSitio.FechaSolicitud,
    EstadoSolicitud: ParametrosNoAdministrables.ColumnasSitio.EstadoReporte,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    Norma: ParametrosNoAdministrables.ColumnasSitio.Norma,
    FechaInicioVigencia: ParametrosNoAdministrables.ColumnasSitio.FechaInicioVigencia,
    FechaFinVigencia: ParametrosNoAdministrables.ColumnasSitio.FechaFinVigencia
  };

  public static getValoresNuevaObligacionReporte(tipoSolicitud: string, codigo: string, nombre: string, tipoReporte: string, empresaId: number, entidadId: number, destinatarioId: number, frecuencia: string, fechaInicioVigencia: Date, comentario: string, normaId: number, usuarioRegistroId: number) {
    return {
      TipoSolicitud: tipoSolicitud,
      CodigoReporte: codigo,
      TituloReporte: nombre,
      TipoReporte: tipoReporte,
      EmpresaId: empresaId,
      EntidadId: entidadId,
      DestinatarioId: destinatarioId,
      Frecuencia: frecuencia,
      FechaInicioVigencia: fechaInicioVigencia,
      Comentario: comentario,
      NormaId: normaId,
      EstadoSolicitud: "",
      FechaRegistro: new Date(),
      UsuarioRegistroId: usuarioRegistroId
    };
  }

  public static getValoresEditarObligacionReporte(tipoSolicitud: string, codigo: string, nombre: string, tipoReporte: string, empresaId: number, entidadId: number, destinatarioId: number, frecuencia: string, fechaInicioVigencia: Date, comentario: string) {
    return {
      TipoSolicitud: tipoSolicitud,
      CodigoReporte: codigo,
      TituloReporte: nombre,
      TipoReporte: tipoReporte,
      EmpresaId: empresaId,
      EntidadId: entidadId,
      DestinatarioId: destinatarioId,
      Frecuencia: frecuencia,
      FechaInicioVigencia: fechaInicioVigencia,
      Comentario: comentario
    };
  }

  public static getValoresActualizarEstadoObligacionReporte() {
    return {
      EstadoSolicitud: ParametrosNoAdministrables.ModuloNormas.ValoresTareas.Pendiente
    };
  }

  public static obtenerFiltroPorLookupId(nombreColumnaLookup: string, id: number): string {
    const valorFilter = `${nombreColumnaLookup}/${ParametrosNoAdministrables.ColumnasSitio.ID} eq ${id}`;
    // and EstadoSolicitud eq '${ParametrosNoAdministrables.EstadoSolicitud.EnBorrador}'

    return valorFilter;
  }

  public static async obtenerPorIdNorma(idRegistro: number): Promise<ESolicitudReporte[]> {
    const dfd: Deferred<ESolicitudReporte[]> = new Deferred<ESolicitudReporte[]>();

    const CamposRest = {
      CodigoReporte: "CodigoReporte",
      Comentario: "Comentario",
      ID: "ID",
      TituloReporte: "TituloReporte",
      Title: ParametrosNoAdministrables.ColumnasSitio.Title,
      TipoReporte: ParametrosNoAdministrables.ColumnasSitio.TipoReporte,
      FechaSolicitud: ParametrosNoAdministrables.ColumnasSitio.FechaSolicitud,
      Frecuencia: ParametrosNoAdministrables.ColumnasSitio.Frecuencia,
      TipoSolicitud: ParametrosNoAdministrables.ColumnasSitio.TipoSolicitud,
      EstadoSolicitud: "EstadoSolicitud",
      FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
      FechaInicioVigencia: ParametrosNoAdministrables.ColumnasSitio.FechaInicioVigencia
    };

    const CamposExpand = {
      Empresa: ParametrosNoAdministrables.ColumnasSitio.Empresa,
      Entidad: ParametrosNoAdministrables.ColumnasSitio.Entidad,
      Destinatario: ParametrosNoAdministrables.ColumnasSitio.Destinatario,
      UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
      Norma: ParametrosNoAdministrables.ColumnasSitio.Norma
    };

    const filtroPorIdYEstadoActivo: string = this.obtenerFiltroPorLookupId(this.Campos.Norma, idRegistro);
    const listaFieldsExpand = Funciones.obtenerListaCampos(CamposExpand);
    const listaFieldsSelect = Funciones.obtenerListaCampos(CamposRest);

    const listaFieldsSelectExpand = [RestFiltros.obtenerFieldExpandLookup(CamposExpand.Empresa), RestFiltros.obtenerFieldExpandLookup(CamposExpand.Entidad), RestFiltros.obtenerFieldExpandLookup(CamposExpand.Destinatario), RestFiltros.obtenerFieldExpandLookup(CamposExpand.Norma), RestFiltros.obtenerFieldExpandUsuario(CamposExpand.UsuarioRegistro)];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(listaFieldsSelectExpand);

    const url: string = String.format(ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterOrderByFechaRegistro, ParametrosNoAdministrables.Listas.SolicitudesReporte, listaFieldsSelectYFieldsExpand.join(","), listaFieldsExpand.join(","), filtroPorIdYEstadoActivo);
    const listaRegistros: ESolicitudReporte[] = [];

    Promise.all([Funciones.ObtenerElementoPorRest(url)])
      .then(([resultadoObtener]) => {
        resultadoObtener.forEach((elemento: any) => {
          const registro: ESolicitudReporte = new ESolicitudReporte();
          registro.setearValoresRest(elemento);

          listaRegistros.push(registro);
        });

        dfd.resolve(listaRegistros);
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public ID: number;
  public Title: string;
  public CodigoReporte: string;
  public TituloReporte: string;
  public Reporte: Lookup;
  public Destinatario: Lookup;
  public Empresa: Lookup;
  public Entidad: Lookup;
  public EstadoSolicitud: string;
  public FechaFinVigencia: any;
  public FechaInicioVigencia: any;
  public FechaSolicitud: any;
  public Frecuencia: string;
  public Norma: Lookup;
  public TipoReporte: string;
  public TipoSolicitud: string;
  public FechaRegistro: any;
  public UsuarioRegistro: Usuario;
  public Comentario: string;
  public FechaAtencion: any;
  public AccionRealizada: string;
  public UsuarioAtencion: Usuario;

  constructor() {
    this.ID = 0;
    this.Title = "";
    this.CodigoReporte = "";
    this.TituloReporte = "";
    this.Reporte = new Lookup();
    this.Destinatario = new Lookup();
    this.Empresa = new Lookup();
    this.Entidad = new Lookup();
    this.EstadoSolicitud = "";
    this.FechaFinVigencia = "";
    this.FechaInicioVigencia = "";
    this.FechaSolicitud = "";
    this.Frecuencia = "";
    this.Norma = new Lookup();
    this.TipoReporte = "";
    this.TipoSolicitud = "";
    this.FechaRegistro = "";
    this.UsuarioRegistro = new Usuario();
    this.Comentario = "";
    this.FechaAtencion = "";
    this.AccionRealizada = "";
    this.UsuarioAtencion = new Usuario();
  }

  public obtenerDatosSolicitudReporte(elementoItemLista: any) {
    this.ID = elementoItemLista.ID;
    this.Title = Util.ObtenerTexto(elementoItemLista.Title);
    this.CodigoReporte = Util.ObtenerTexto(elementoItemLista.CodigoReporte);
    this.TituloReporte = Util.ObtenerTexto(elementoItemLista.TituloReporte);
    this.Reporte = Util.ObtenerLookup(elementoItemLista.Reporte);
    this.Empresa = Util.ObtenerLookup(elementoItemLista.Empresa);
    this.Entidad = Util.ObtenerLookup(elementoItemLista.Entidad);
    this.Norma = Util.ObtenerLookup(elementoItemLista.Norma);
    this.TipoReporte = Util.ObtenerTexto(elementoItemLista.TipoReporte);
    this.Destinatario = Util.ObtenerLookup(elementoItemLista.Destinatario);
    this.Frecuencia = Util.ObtenerTexto(elementoItemLista.Frecuencia);
    this.FechaInicioVigencia = Util.ObtenerTexto(elementoItemLista.FechaInicioVigencia);
    this.TipoSolicitud = Util.ObtenerTexto(elementoItemLista.TipoSolicitud);
    this.FechaSolicitud = Util.ObtenerTexto(elementoItemLista.FechaSolicitud);
    this.UsuarioRegistro = Util.ObtenerUsuario(elementoItemLista.UsuarioRegistro) as Usuario;
    this.EstadoSolicitud = Util.ObtenerTexto(elementoItemLista.EstadoSolicitud);
    this.FechaRegistro = Util.ObtenerTexto(elementoItemLista.FechaRegistro);
    this.Comentario = Util.ObtenerTexto(elementoItemLista.Comentario);
    this.FechaAtencion = Util.ObtenerTexto(elementoItemLista.FechaAtencion);
    this.AccionRealizada = Util.ObtenerTexto(elementoItemLista.AccionRealizada);
    this.UsuarioAtencion = Util.ObtenerUsuario(elementoItemLista.UsuarioAtencion) as Usuario;
  }

  public obtenerSolicitudReporte(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Title = elementoItemLista.Title;
    this.CodigoReporte = elementoItemLista.CodigoReporte;
    this.TituloReporte = elementoItemLista.TituloReporte;
    this.Reporte = Util.ObtenerLookup(elementoItemLista.Reporte);
    this.Empresa = Util.ObtenerLookup(elementoItemLista.Empresa);
    this.Entidad = Util.ObtenerLookup(elementoItemLista.Entidad);
    this.Norma = Util.ObtenerLookup(elementoItemLista.Norma);
    this.TipoReporte = elementoItemLista.TipoReporte;
    this.Destinatario = Util.ObtenerLookup(elementoItemLista.Destinatario);
    this.Frecuencia = elementoItemLista.Frecuencia;
    this.FechaInicioVigencia = elementoItemLista.FechaInicioVigencia;
    this.TipoSolicitud = elementoItemLista.TipoSolicitud;
    this.FechaSolicitud = elementoItemLista.FechaSolicitud;
    this.UsuarioRegistro = Util.ObtenerUsuario(elementoItemLista.UsuarioRegistro) as Usuario;
    this.EstadoSolicitud = elementoItemLista.EstadoSolicitud;
    this.FechaRegistro = elementoItemLista.FechaRegistro;
  }

  public ObtenerSolicitudReporteAExportar(elementoItemLista: any): any {
    const itemExportar = {
      "Código Reporte": elementoItemLista.CodigoReporte,
      "Título Reporte": elementoItemLista.TituloReporte,
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
      "Usuario Registro": Util.ObtenerUsuario(elementoItemLista.UsuarioRegistro).Title,
      "Estado Solicitud": elementoItemLista.EstadoSolicitud,
      "Fecha Registro": elementoItemLista.FechaRegistro
    };

    return itemExportar;
  }

  public setearValoresRest(elementoItemLista: any) {
    this.CodigoReporte = RestFiltros.parsearTexto(elementoItemLista, ESolicitudReporte.Campos.CodigoReporte);
    this.Comentario = RestFiltros.parsearTexto(elementoItemLista, "Comentario");
    this.TituloReporte = RestFiltros.parsearTexto(elementoItemLista, ESolicitudReporte.Campos.TituloReporte);
    this.Empresa = RestFiltros.parsearLookup(elementoItemLista, ESolicitudReporte.Campos.Empresa, EEmpresa);
    this.Entidad = RestFiltros.parsearLookup(elementoItemLista, ESolicitudReporte.Campos.Entidad, EEntidad);
    this.Destinatario = RestFiltros.parsearLookup(elementoItemLista, ESolicitudReporte.Campos.Destinatario, EEmpresa);
    this.TipoReporte = RestFiltros.parsearTexto(elementoItemLista, ESolicitudReporte.Campos.TipoReporte);
    this.FechaSolicitud = RestFiltros.parsearTexto(elementoItemLista, ESolicitudReporte.Campos.FechaSolicitud);
    this.Frecuencia = RestFiltros.parsearTexto(elementoItemLista, ESolicitudReporte.Campos.Frecuencia);
    this.TipoSolicitud = RestFiltros.parsearTexto(elementoItemLista, ESolicitudReporte.Campos.TipoSolicitud);
    this.EstadoSolicitud = RestFiltros.parsearTexto(elementoItemLista, "EstadoSolicitud");
    this.FechaRegistro = RestFiltros.parsearTexto(elementoItemLista, ESolicitudReporte.Campos.FechaRegistro);
    this.FechaInicioVigencia = RestFiltros.parsearTexto(elementoItemLista, ESolicitudReporte.Campos.FechaInicioVigencia);
    this.Norma = RestFiltros.parsearLookup(elementoItemLista, ESolicitudReporte.Campos.Norma, EEmpresa);

    this.ID = elementoItemLista["ID"];

    this.UsuarioRegistro = RestFiltros.parsearUsuario(elementoItemLista, ESolicitudReporte.Campos.UsuarioRegistro);
  }
}
