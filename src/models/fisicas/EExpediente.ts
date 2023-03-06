import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import ParseJsom from "src/genericos/ParseJsom";
import { EBaseEntidadTransaccional } from "src/models/Base/EBaseEntidadTransaccional";
import Usuario from "src/models/Base/Usuario";
import { Deferred } from "ts-deferred";
import { RestFiltros } from "src/genericos/RestFiltros";
import Funciones from "src/genericos/Funciones";
import EArchivoExpediente from "src/models/logicas/EArchivoExpediente";
import EEmpresa from "./EEmpresa";
import EEntidad from "./EEntidad";
import ETipoDirectiva from "./ETipoDirectiva";
import EGrupo from './EGrupo';
import { Grupo } from '../Base/Grupo';
import ENorma from './ENorma';
import EProyecto from './EProyecto';
import EReporte from './EReporte';
import EIncidentes from './EIncidente';

export default class EExpediente extends EBaseEntidadTransaccional {
  public static Campos = {
    Archivos: ParametrosNoAdministrables.ColumnasSitio.Archivos,
    AreaTexto: ParametrosNoAdministrables.ColumnasSitio.AreaTexto,
    CantidadAmpliaciones: ParametrosNoAdministrables.ColumnasSitio.CantidadAmpliaciones,
    Codigo: ParametrosNoAdministrables.ColumnasSitio.Codigo,
    CompartidoCon: ParametrosNoAdministrables.ColumnasSitio.CompartidoCon,
    ComentarioRespuesta: ParametrosNoAdministrables.ColumnasSitio.ComentarioRespuesta,
    Desatendido: ParametrosNoAdministrables.ColumnasSitio.Desatendido,
    DivisionTexto: ParametrosNoAdministrables.ColumnasSitio.DivisionTexto,
    Empresa: ParametrosNoAdministrables.ColumnasSitio.Empresa,
    Entidad: ParametrosNoAdministrables.ColumnasSitio.Entidad,
    EsConfidencial: ParametrosNoAdministrables.ColumnasSitio.EsConfidencial,
    EsIncumplimiento: ParametrosNoAdministrables.ColumnasSitio.EsIncumplimiento,
    EstadoElemento: ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
    EstadoExpediente: ParametrosNoAdministrables.ColumnasSitio.EstadoExpediente,
    EstadoExpedienteCalculado: ParametrosNoAdministrables.ColumnasSitio.EstadoExpedienteCalculado,
    ExpedientesRelacionados: ParametrosNoAdministrables.ColumnasSitio.ExpedientesRelacionados,
    FechaCierre: ParametrosNoAdministrables.ColumnasSitio.FechaCierre,
    FechaPlazo: ParametrosNoAdministrables.ColumnasSitio.FechaPlazo,
    FechaRecepcion: ParametrosNoAdministrables.ColumnasSitio.FechaRecepcion,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    FechaRespuesta: ParametrosNoAdministrables.ColumnasSitio.FechaRespuesta,
    GrupoGestion: ParametrosNoAdministrables.ColumnasSitio.GrupoGestion,
    GrupoGrupoGestion: ParametrosNoAdministrables.ColumnasSitio.GrupoGrupoGestion,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    IncidentesAsociadosIds: ParametrosNoAdministrables.ColumnasSitio.IncidentesAsociadosIds,
    Modified: ParametrosNoAdministrables.ColumnasSitio.Modified,
    NombreDocumento: ParametrosNoAdministrables.ColumnasSitio.NombreDocumento,
    NormasRelacionadas: ParametrosNoAdministrables.ColumnasSitio.NormasRelacionadas,
    OrigenPlazo: ParametrosNoAdministrables.ColumnasSitio.OrigenPlazo,
    PalabrasClaves: ParametrosNoAdministrables.ColumnasSitio.PalabrasClaves,
    ProyectosAsociadosIds: ParametrosNoAdministrables.ColumnasSitio.ProyectosAsociadosIds,
    ReportesAsociadosIds: ParametrosNoAdministrables.ColumnasSitio.ReportesAsociadosIds,
    Responsable: ParametrosNoAdministrables.ColumnasSitio.Responsable,
    ResponsablesAuxiliares: ParametrosNoAdministrables.ColumnasSitio.ResponsablesAuxiliares,
    ResponsablesAuxiliaresJson: ParametrosNoAdministrables.ColumnasSitio.ResponsablesAuxiliaresJson,
    TipoDirectiva: ParametrosNoAdministrables.ColumnasSitio.TipoDirectiva,
    Title: ParametrosNoAdministrables.ColumnasSitio.Title,
    UsuarioDelegado: ParametrosNoAdministrables.ColumnasSitio.UsuarioDelegado,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro
  };
  public static CamposExpand = {
    CompartidoCon: ParametrosNoAdministrables.ColumnasSitio.CompartidoCon,
    Empresa: ParametrosNoAdministrables.ColumnasSitio.Empresa,
    Entidad: ParametrosNoAdministrables.ColumnasSitio.Entidad,
    ExpedientesRelacionados: ParametrosNoAdministrables.ColumnasSitio.ExpedientesRelacionados,
    GrupoGestion: ParametrosNoAdministrables.ColumnasSitio.GrupoGestion,
    GrupoGrupoGestion: ParametrosNoAdministrables.ColumnasSitio.GrupoGrupoGestion,
    NormasRelacionadas: ParametrosNoAdministrables.ColumnasSitio.NormasRelacionadas,
    Responsable: ParametrosNoAdministrables.ColumnasSitio.Responsable,
    ResponsablesAuxiliares: ParametrosNoAdministrables.ColumnasSitio.ResponsablesAuxiliares,
    TipoDirectiva: ParametrosNoAdministrables.ColumnasSitio.TipoDirectiva,
    UsuarioDelegado: ParametrosNoAdministrables.ColumnasSitio.UsuarioDelegado,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
  };
  public static CamposRest = {
    Archivos: ParametrosNoAdministrables.ColumnasSitio.Archivos,
    AreaTexto: ParametrosNoAdministrables.ColumnasSitio.AreaTexto,
    Codigo: ParametrosNoAdministrables.ColumnasSitio.Codigo,
    CompartidoCon: ParametrosNoAdministrables.ColumnasSitio.CompartidoCon,
    ComentarioRespuesta: ParametrosNoAdministrables.ColumnasSitio.ComentarioRespuesta,
    DivisionTexto: ParametrosNoAdministrables.ColumnasSitio.DivisionTexto,
    Desatendido: ParametrosNoAdministrables.ColumnasSitio.Desatendido,
    Descripcion: ParametrosNoAdministrables.ColumnasSitio.Descripcion,
    EsConfidencial: ParametrosNoAdministrables.ColumnasSitio.EsConfidencial,
    EsIncumplimiento: ParametrosNoAdministrables.ColumnasSitio.EsIncumplimiento,
    EstadoExpediente: ParametrosNoAdministrables.ColumnasSitio.EstadoExpediente,
    FechaCierre: ParametrosNoAdministrables.ColumnasSitio.FechaCierre,
    FechaPlazo: ParametrosNoAdministrables.ColumnasSitio.FechaPlazo,
    FechaRecepcion: ParametrosNoAdministrables.ColumnasSitio.FechaRecepcion,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    FechaRespuesta: ParametrosNoAdministrables.ColumnasSitio.FechaRespuesta,
    GrupoGestion: ParametrosNoAdministrables.ColumnasSitio.GrupoGestion,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    IncidentesAsociadosIds: ParametrosNoAdministrables.ColumnasSitio.IncidentesAsociadosIds,
    Modified: ParametrosNoAdministrables.ColumnasSitio.Modified,
    NombreDocumento: ParametrosNoAdministrables.ColumnasSitio.NombreDocumento,
    OrigenPlazo: ParametrosNoAdministrables.ColumnasSitio.OrigenPlazo,
    PalabrasClaves: ParametrosNoAdministrables.ColumnasSitio.PalabrasClaves,
    ProyectosAsociadosIds: ParametrosNoAdministrables.ColumnasSitio.ProyectosAsociadosIds,
    ReportesAsociadosIds: ParametrosNoAdministrables.ColumnasSitio.ReportesAsociadosIds,
    Title: ParametrosNoAdministrables.ColumnasSitio.Title,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro
  };

  public static setearValoresBusquedaDirectivasAsociadas(elementoItemLista: SP.ListItem, objeto: EExpediente) {

    objeto.Codigo = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.Codigo
    );
    /* objeto.Descripcion = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.Descripcion
    );*/
    const empresaLookup = ParseJsom.parsearLookup(
      elementoItemLista,
      EExpediente.Campos.Empresa
    );
    objeto.Empresa = new EEmpresa();
    objeto.Empresa.setearValoresDesdeLookup(empresaLookup);

    const entidadLookup = ParseJsom.parsearLookup(
      elementoItemLista,
      EExpediente.Campos.Entidad
    );
    objeto.Entidad = new EEntidad();
    objeto.Entidad.setearValoresDesdeLookup(entidadLookup);

    objeto.EstadoExpediente = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.EstadoExpediente
    );

    objeto.ID = ParseJsom.parsearNumber(
      elementoItemLista,
      EExpediente.Campos.ID
    );
    objeto.NombreDocumento = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.NombreDocumento
    );
    objeto.Title = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.Title
    );
    const tipoDirectivaLookup = ParseJsom.parsearLookup(
      elementoItemLista,
      EExpediente.Campos.TipoDirectiva
    );
    objeto.TipoDirectiva = new ETipoDirectiva();
    objeto.TipoDirectiva.setearValoresDesdeLookup(tipoDirectivaLookup);

    if (objeto.EstadoExpediente.toUpperCase() === ParametrosNoAdministrables.ModuloDirectivas.ValoresEstados.EstadoExpedienteNoIniciado.toUpperCase()) {
      objeto.Codigo = "PEND.";
    }
  }

  public static setearValoresConsultarDirecticas(elementoItemLista: SP.ListItem, objeto: EExpediente) {
    objeto.AreaTexto = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.AreaTexto
    );
    objeto.Codigo = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.Codigo
    );
    /* objeto.Descripcion = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.Descripcion
    );*/
    objeto.DivisionTexto = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.DivisionTexto
    );
    const empresaLookup = ParseJsom.parsearLookup(
      elementoItemLista,
      EExpediente.Campos.Empresa
    );
    objeto.Empresa = new EEmpresa();
    objeto.Empresa.setearValoresDesdeLookup(empresaLookup);

    const entidadLookup = ParseJsom.parsearLookup(
      elementoItemLista,
      EExpediente.Campos.Entidad
    );
    objeto.Entidad = new EEntidad();
    objeto.Entidad.setearValoresDesdeLookup(entidadLookup);

    objeto.EsConfidencial = ParseJsom.parsearBooleano(
      elementoItemLista,
      EExpediente.Campos.EsConfidencial
    );
    objeto.EstadoExpediente = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.EstadoExpediente
    );
    objeto.FechaPlazo = ParseJsom.parsearFechaStringSoloFecha(
      elementoItemLista,
      EExpediente.Campos.FechaPlazo
    );
    objeto.FechaRecepcion = ParseJsom.parsearFechaStringSoloFecha(
      elementoItemLista,
      EExpediente.Campos.FechaRecepcion
    );
    objeto.FechaRegistro = ParseJsom.parsearFechaString(
      elementoItemLista,
      EExpediente.Campos.FechaRegistro
    );
    const grupoGestionLookup = ParseJsom.parsearLookup(
      elementoItemLista,
      EExpediente.Campos.GrupoGestion
    );
    objeto.GrupoGestion = new EGrupo();
    objeto.GrupoGestion.setearValoresDesdeLookup(grupoGestionLookup);

    objeto.ID = ParseJsom.parsearNumber(
      elementoItemLista,
      EExpediente.Campos.ID
    );
    objeto.NombreDocumento = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.NombreDocumento
    );
    objeto.Responsable = ParseJsom.parsearUsuario(
      elementoItemLista,
      EExpediente.CamposExpand.Responsable
    );
    objeto.Title = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.Title
    );
    const tipoDirectivaLookup = ParseJsom.parsearLookup(
      elementoItemLista,
      EExpediente.Campos.TipoDirectiva
    );
    objeto.TipoDirectiva = new ETipoDirectiva();
    objeto.TipoDirectiva.setearValoresDesdeLookup(tipoDirectivaLookup);

 

    if (objeto.EstadoExpediente.toUpperCase() === ParametrosNoAdministrables.ModuloDirectivas.ValoresEstados.EstadoExpedienteNoIniciado.toUpperCase()) {
      objeto.Codigo = "PEND.";
    }
  }

  public static setearValoresConsultarDirecticasExportar(elementoItemLista: SP.ListItem, objeto: EExpediente) {
    objeto.AreaTexto = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.AreaTexto
    );
    objeto.CantidadAmpliaciones = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.CantidadAmpliaciones
    );
    objeto.Codigo = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.Codigo
    );

    objeto.Desatendido = ParseJsom.parsearBooleano(
      elementoItemLista,
      EExpediente.Campos.Desatendido
    );
    /* objeto.Descripcion = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.Descripcion
    );*/
    objeto.DivisionTexto = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.DivisionTexto
    );
    const empresaLookup = ParseJsom.parsearLookup(
      elementoItemLista,
      EExpediente.Campos.Empresa
    );
    objeto.Empresa = new EEmpresa();
    objeto.Empresa.setearValoresDesdeLookup(empresaLookup);

    const entidadLookup = ParseJsom.parsearLookup(
      elementoItemLista,
      EExpediente.Campos.Entidad
    );
    objeto.Entidad = new EEntidad();
    objeto.Entidad.setearValoresDesdeLookup(entidadLookup);

    objeto.EsConfidencial = ParseJsom.parsearBooleano(
      elementoItemLista,
      EExpediente.Campos.EsConfidencial
    );

    objeto.EsIncumplimiento = ParseJsom.parsearBooleano(
      elementoItemLista,
      EExpediente.Campos.EsIncumplimiento
    );

    objeto.EstadoExpediente = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.EstadoExpediente
    );
    objeto.FechaCierre = ParseJsom.parsearFechaString(
      elementoItemLista,
      EExpediente.Campos.FechaCierre
    );
    objeto.FechaPlazo = ParseJsom.parsearFechaString(
      elementoItemLista,
      EExpediente.Campos.FechaPlazo
    );
    objeto.FechaRecepcion = ParseJsom.parsearFechaString(
      elementoItemLista,
      EExpediente.Campos.FechaRecepcion
    );
    objeto.FechaRespuesta = ParseJsom.parsearFechaString(
      elementoItemLista,
      EExpediente.Campos.FechaRespuesta
    );
    objeto.FechaRegistro = ParseJsom.parsearFechaString(
      elementoItemLista,
      EExpediente.Campos.FechaRegistro
    );
    const grupoGestionLookup = ParseJsom.parsearLookup(
      elementoItemLista,
      EExpediente.Campos.GrupoGestion
    );
    objeto.GrupoGestion = new EGrupo();
    objeto.GrupoGestion.setearValoresDesdeLookup(grupoGestionLookup);

    objeto.ID = ParseJsom.parsearNumber(
      elementoItemLista,
      EExpediente.Campos.ID
    );
    objeto.NombreDocumento = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.NombreDocumento
    );
    objeto.OrigenPlazo = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.OrigenPlazo
    );
    objeto.PalabrasClaves = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.PalabrasClaves
    );
    objeto.Responsable = ParseJsom.parsearUsuario(
      elementoItemLista,
      EExpediente.CamposExpand.Responsable
    );
    objeto.Title = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.Title
    );
    const tipoDirectivaLookup = ParseJsom.parsearLookup(
      elementoItemLista,
      EExpediente.Campos.TipoDirectiva
    );
    objeto.TipoDirectiva = new ETipoDirectiva();
    objeto.TipoDirectiva.setearValoresDesdeLookup(tipoDirectivaLookup);

    objeto.UsuarioDelegado = ParseJsom.parsearUsuario(
      elementoItemLista,
      EExpediente.CamposExpand.UsuarioDelegado
    );


    if (objeto.EstadoExpediente.toUpperCase() === ParametrosNoAdministrables.ModuloDirectivas.ValoresEstados.EstadoExpedienteNoIniciado.toUpperCase()) {
      objeto.Codigo = "PEND.";
    }
  }

  public static setearValoresConsultarExpedientes(elementoItemLista: SP.ListItem, objeto: EExpediente) {
    objeto.Archivos = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.Archivos
    );
    objeto.EstadoExpediente = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.EstadoExpediente
    );

    objeto.EstadoExpedienteCalculado = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.EstadoExpedienteCalculado
    );

    if (objeto.EstadoExpediente !== ParametrosNoAdministrables.ModuloDirectivas.ValoresEstados.EstadoExpedienteNoIniciado) {
      objeto.EstadoExpediente = ParametrosNoAdministrables.ModuloDirectivas.ValoresEstados.EstadoExpedienteAtendido;
    }

    objeto.FechaRegistro = ParseJsom.parsearFechaString(
      elementoItemLista,
      EExpediente.Campos.FechaRegistro
    );
    objeto.ID = ParseJsom.parsearNumber(
      elementoItemLista,
      EExpediente.Campos.ID
    );
    objeto.Responsable = ParseJsom.parsearUsuario(
      elementoItemLista,
      EExpediente.CamposExpand.Responsable
    );
    objeto.NombreDocumento = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.NombreDocumento
    );


  }

  public static setearValoresConsultarExpedientesExportar(elementoItemLista: SP.ListItem, objeto: EExpediente) {
    objeto.Archivos = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.Archivos
    );
    objeto.EstadoExpediente = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.EstadoExpediente
    );

    objeto.EstadoExpedienteCalculado = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.EstadoExpedienteCalculado
    );

    if (objeto.EstadoExpediente !== ParametrosNoAdministrables.ModuloDirectivas.ValoresEstados.EstadoExpedienteNoIniciado) {
      objeto.EstadoExpediente = ParametrosNoAdministrables.ModuloDirectivas.ValoresEstados.EstadoExpedienteAtendido;
    }

    objeto.FechaRegistro = ParseJsom.parsearFechaString(
      elementoItemLista,
      EExpediente.Campos.FechaRegistro
    );
    objeto.ID = ParseJsom.parsearNumber(
      elementoItemLista,
      EExpediente.Campos.ID
    );
    objeto.Responsable = ParseJsom.parsearUsuario(
      elementoItemLista,
      EExpediente.CamposExpand.Responsable
    );
    objeto.NombreDocumento = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.NombreDocumento
    );

  }

  public static async obtenerExpediente(idExpediente: number): Promise<EExpediente> {
    const dfd: Deferred<EExpediente> = new Deferred<EExpediente>();

    const filtroPorIdYEstadoActivo: string = RestFiltros.obtenerFiltroPorIdYEstadoActivo(
      idExpediente
    );
    const listaCamposExpand = Funciones.obtenerListaCampos(
      EExpediente.CamposExpand
    );
    const listaFieldsSelect = Funciones.obtenerListaCampos(EExpediente.CamposRest);

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        EExpediente.CamposExpand.CompartidoCon
      ),
      RestFiltros.obtenerFieldExpandLookup(EExpediente.CamposExpand.Empresa),
      RestFiltros.obtenerFieldExpandLookup(EExpediente.CamposExpand.Entidad),
      RestFiltros.obtenerFieldExpandLookup(EExpediente.CamposExpand.GrupoGestion),
      RestFiltros.obtenerFieldExpandGrupo(EExpediente.CamposExpand.GrupoGrupoGestion),
      RestFiltros.obtenerFieldExpandUsuario(EExpediente.CamposExpand.Responsable),
      RestFiltros.obtenerFieldExpandUsuario(EExpediente.CamposExpand.ResponsablesAuxiliares),
      RestFiltros.obtenerFieldExpandLookup(EExpediente.CamposExpand.TipoDirectiva),
      RestFiltros.obtenerFieldExpandUsuario(EExpediente.CamposExpand.UsuarioRegistro),
      RestFiltros.obtenerFieldExpandUsuario(EExpediente.CamposExpand.UsuarioDelegado),

      this.obtenerFieldExpandLookupExpedienteRelacionado(ENorma.CamposExpand.ExpedientesRelacionados),
      this.obtenerFieldExpandLookupNormaRelacionado(ENorma.CamposExpand.NormasRelacionadas),
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter,
      ParametrosNoAdministrables.Listas.Expedientes,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      filtroPorIdYEstadoActivo
    );

    const expediente = new EExpediente();

    if (idExpediente === 0) {
      dfd.resolve(expediente);
    }
    else {
      Promise.all([
        Funciones.ObtenerElementoPorRest(url),
      ])
        .then(([resultadoObtenerExpediente]) => {
          if (resultadoObtenerExpediente.length === 0) {
            dfd.resolve(expediente);
            return;
          }

          expediente.setearValoresRest(resultadoObtenerExpediente[0]);

          dfd.resolve(expediente);
        })
        .catch(error => {
          dfd.reject(error);
        });
    }

    return dfd.promise;
  }

  public static async obtenerPorIdsExpedientes(idsExpedientes: number[]): Promise<EExpediente[]> {
    const dfd: Deferred<EExpediente[]> = new Deferred<EExpediente[]>();

    const filtrosIds = idsExpedientes.map((id: number) => {
      return `${ParametrosNoAdministrables.ColumnasSitio.ID} eq ${id}`;
    }).join(" or ");
    const filtroPorIdYEstadoActivo: string = `${filtrosIds} and ${RestFiltros.obtenerFiltroPorEstadoActivo()}`;

    const listaCamposExpand = Funciones.obtenerListaCampos(
      EExpediente.CamposExpand
    );
    const listaFieldsSelect = Funciones.obtenerListaCampos(EExpediente.CamposRest);

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        EExpediente.CamposExpand.CompartidoCon
      ),
      RestFiltros.obtenerFieldExpandLookup(EExpediente.CamposExpand.Empresa),
      RestFiltros.obtenerFieldExpandLookup(EExpediente.CamposExpand.Entidad),
      RestFiltros.obtenerFieldExpandLookup(EExpediente.CamposExpand.GrupoGestion),
      RestFiltros.obtenerFieldExpandGrupo(EExpediente.CamposExpand.GrupoGrupoGestion),
      RestFiltros.obtenerFieldExpandUsuario(EExpediente.CamposExpand.Responsable),
      RestFiltros.obtenerFieldExpandUsuario(EExpediente.CamposExpand.ResponsablesAuxiliares),
      RestFiltros.obtenerFieldExpandLookup(EExpediente.CamposExpand.TipoDirectiva),
      RestFiltros.obtenerFieldExpandUsuario(EExpediente.CamposExpand.UsuarioRegistro),
      RestFiltros.obtenerFieldExpandUsuario(EExpediente.CamposExpand.UsuarioDelegado),

      this.obtenerFieldExpandLookupExpedienteRelacionado(ENorma.CamposExpand.ExpedientesRelacionados),
      this.obtenerFieldExpandLookupNormaRelacionado(ENorma.CamposExpand.NormasRelacionadas),
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter,
      ParametrosNoAdministrables.Listas.Expedientes,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      filtroPorIdYEstadoActivo
    );

    const listaResultado: EExpediente[] = [];

    if (idsExpedientes.length === 0) {
      dfd.resolve([]);
    }
    else {
      Promise.all([
        Funciones.ObtenerElementoPorRest(url),
      ])
        .then(([resultadoExpedientes]) => {
          if (resultadoExpedientes.length === 0) {
            dfd.resolve([]);
            return;
          }

          resultadoExpedientes.forEach((element: any) => {
            const expediente = new EExpediente();
            expediente.setearValoresRest(element);
            listaResultado.push(expediente);
          });

          dfd.resolve(listaResultado);
        })
        .catch(error => {
          dfd.reject(error);
        });
    }

    return dfd.promise;
  }

  public static obtenerFieldExpandLookupExpedienteRelacionado(nombreColumnaExpand: string) {
    return `${nombreColumnaExpand}/${
      ParametrosNoAdministrables.ColumnasSitio.ID
      },${nombreColumnaExpand}/${EExpediente.Campos.NombreDocumento}`;
  }
  public static obtenerFieldExpandLookupNormaRelacionado(nombreColumnaExpand: string) {
    return `${nombreColumnaExpand}/${
      ParametrosNoAdministrables.ColumnasSitio.ID
      },${nombreColumnaExpand}/${ENorma.Campos.Codigo}`;
  }

  public static async obtenerExpedienteConArchivos(
    idExpediente: number
  ): Promise<EExpediente> {
    const dfd: Deferred<EExpediente> = new Deferred<EExpediente>();

    const filtroPorIdYEstadoActivo: string = RestFiltros.obtenerFiltroPorIdYEstadoActivo(
      idExpediente
    );
    const listaCamposExpand = Funciones.obtenerListaCampos(
      EExpediente.CamposExpand
    );
    const listaFieldsSelect = Funciones.obtenerListaCampos(EExpediente.CamposRest);

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        EExpediente.CamposExpand.CompartidoCon
      ),
      RestFiltros.obtenerFieldExpandLookup(EExpediente.CamposExpand.Empresa),
      RestFiltros.obtenerFieldExpandLookup(EExpediente.CamposExpand.Entidad),
      RestFiltros.obtenerFieldExpandLookup(EExpediente.CamposExpand.GrupoGestion),
      RestFiltros.obtenerFieldExpandGrupo(EExpediente.CamposExpand.GrupoGrupoGestion),
      RestFiltros.obtenerFieldExpandUsuario(EExpediente.CamposExpand.Responsable),
      RestFiltros.obtenerFieldExpandUsuario(EExpediente.CamposExpand.ResponsablesAuxiliares),
      RestFiltros.obtenerFieldExpandLookup(EExpediente.CamposExpand.TipoDirectiva),
      RestFiltros.obtenerFieldExpandUsuario(EExpediente.CamposExpand.UsuarioRegistro),
      RestFiltros.obtenerFieldExpandUsuario(EExpediente.CamposExpand.UsuarioDelegado),

      this.obtenerFieldExpandLookupExpedienteRelacionado(ENorma.CamposExpand.ExpedientesRelacionados),
      this.obtenerFieldExpandLookupNormaRelacionado(ENorma.CamposExpand.NormasRelacionadas),
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter,
      ParametrosNoAdministrables.Listas.Expedientes,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      filtroPorIdYEstadoActivo
    );

    const expediente = new EExpediente();

    if (idExpediente === 0) {
      dfd.resolve(expediente);
    }
    else {
      const nombreCarpetaExpediente = `${idExpediente}/${ParametrosNoAdministrables.ModuloDirectivas.CarpetasExpediente.Expediente}`;
      const nombreCarpetaRespuesta = `${idExpediente}/${ParametrosNoAdministrables.ModuloDirectivas.CarpetasExpediente.Respuesta}`;
      Promise.all([
        Funciones.ObtenerElementoPorRest(url),
        this.obtenerArchivos(nombreCarpetaExpediente),
        this.obtenerArchivos(nombreCarpetaRespuesta),
      ])
        .then(([resultadoObtenerExpediente, resultadoListaArchivosExpediente, resultadoListaArchivosRespuesta]) => {
          if (resultadoObtenerExpediente.length === 0) {
            dfd.resolve(expediente);
            return;
          }

          expediente.setearValoresRest(resultadoObtenerExpediente[0]);
          expediente.ListaArchivosExpediente = resultadoListaArchivosExpediente;

          if (resultadoListaArchivosRespuesta.length > 0) {
            expediente.AchivosRespuesta = resultadoListaArchivosRespuesta[0];
          }

          const listaIdsIncidentes: number[] = expediente.IncidentesAsociadosIds.split(";").filter(x => x !== "").map(x => parseInt(x, 10));
          const listaIdsReportes: number[] = expediente.ReportesAsociadosIds.split(";").filter(x => x !== "").map(x => parseInt(x, 10));
          // const listaIdsProyectos: number[] = expediente.ProyectosAsociadosIds.split(";").filter(x => x !== "").map(x => parseInt(x, 10));

          Promise.all([
            EExpediente.obtenerPorIdsExpedientes(expediente.ExpedientesRelacionados.map(x => x.ID)),
            ENorma.obtenerPorIdsNormas(expediente.NormasRelacionadas.map(x => x.ID)),
            EIncidentes.obtenerPorIdsIncidentes(listaIdsIncidentes),
            EReporte.obtenerPorIdsReportes(listaIdsReportes),
            // EProyecto.obtenerPorIdsProyecto(listaIdsProyectos),
          ])
            .then(([resultadoObtenerExpedientesRelacionados, resultadoObtenerNormasRelacionadas,
              resultadoObtenerIncidentesRelacionados, resultadoObtenerReportesRelacionados
            ]) => {

              expediente.ExpedientesRelacionados = resultadoObtenerExpedientesRelacionados;
              expediente.NormasRelacionadas = resultadoObtenerNormasRelacionadas;
              expediente.IncidentesAsociados = resultadoObtenerIncidentesRelacionados;
              expediente.ReportesAsociados = resultadoObtenerReportesRelacionados;
              // expediente.ProyectosAsociados = resultadoObtenerProyectosRelacionados;

              dfd.resolve(expediente);
            })
            .catch(error => {
              dfd.reject(error);
            });
        })
        .catch(error => {
          dfd.reject(error);
        });
    }

    return dfd.promise;
  }

  public static async crearCarpetasProyecto(
    idProyecto: number
  ): Promise<boolean> {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    Funciones.CrearCarpeta(
      "Proyectos",
      idProyecto.toString()
    )
      .then(resultadoCrearCarpetaPrincipal => {

        if (idProyecto === 0) {
          dfd.resolve(false);
        }
        else {
          const promesas: Array<Promise<any>> = [];
          ParametrosNoAdministrables.ModuloDirectivas.ListaValoresCarpetasProyectos.forEach(nombreCarpeta => {
            promesas.push(Funciones.CrearSubCarpeta("Proyectos", nombreCarpeta, idProyecto.toString()));
          })

          Promise.all(promesas)
            .then(([resultadoCrearSubCarpetas]) => {

              ParametrosNoAdministrables.ModuloDirectivas.ListaValoresCarpetasProyectosPLaneacion.forEach(nombreCarpeta => {
                promesas.push(Funciones.CrearSubCarpeta("Proyectos", nombreCarpeta, idProyecto.toString() + "/" + ParametrosNoAdministrables.ModuloDirectivas.ListaValoresCarpetasProyectos[0].toString()));
              })

              ParametrosNoAdministrables.ModuloDirectivas.ListaValoresCarpetasProyectosEjecucion.forEach(nombreCarpeta => {
                promesas.push(Funciones.CrearSubCarpeta("Proyectos", nombreCarpeta, idProyecto.toString() + "/" + ParametrosNoAdministrables.ModuloDirectivas.ListaValoresCarpetasProyectos[1].toString()));
              })

              ParametrosNoAdministrables.ModuloDirectivas.ListaValoresCarpetasProyectosCierre.forEach(nombreCarpeta => {
                promesas.push(Funciones.CrearSubCarpeta("Proyectos", nombreCarpeta, idProyecto.toString() + "/" + ParametrosNoAdministrables.ModuloDirectivas.ListaValoresCarpetasProyectos[2].toString()));
              })


              dfd.resolve(true);
            })
            .catch(error => {
              dfd.reject(error);
            });
        }
      })
      .catch(error => {
        dfd.reject(error)
      });

    return dfd.promise;
  }



  public static async crearCarpetasExpediente(
    idExpediente: number
  ): Promise<boolean> {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    Funciones.CrearCarpeta(
      ParametrosNoAdministrables.Bibliotecas.ArchivosExpediente,
      idExpediente.toString()
    )
      .then(resultadoCrearCarpetaPrincipal => {

        if (idExpediente === 0) {
          dfd.resolve(false);
        }
        else {
          const promesas: Array<Promise<any>> = [];
          ParametrosNoAdministrables.ModuloDirectivas.ListaValoresCarpetasExpediente.forEach(nombreCarpeta => {
            promesas.push(Funciones.CrearSubCarpeta(ParametrosNoAdministrables.Bibliotecas.ArchivosExpediente, nombreCarpeta, idExpediente.toString()));
          })

          Promise.all(promesas)
            .then(([resultadoCrearSubCarpetas]) => {
              dfd.resolve(true);
            })
            .catch(error => {
              dfd.reject(error);
            });
        }
      })
      .catch(error => {
        dfd.reject(error)
      });

    return dfd.promise;
  }

  public static async obtenerArchivos(
    nombreCarpeta: string
  ): Promise<EArchivoExpediente[]> {
    const dfd: Deferred<EArchivoExpediente[]> = new Deferred<
      EArchivoExpediente[]
    >();

    Funciones.ObtenerFiles(
      ParametrosNoAdministrables.Bibliotecas.ArchivosExpediente,
      nombreCarpeta.toString()
    )
      .then(result => {
        const listaArchivos: EArchivoExpediente[] = [];

        for (const file of result.Files) {
          const archivo: EArchivoExpediente = new EArchivoExpediente();
          archivo.setValores(
            file.ListItemAllFields.ID,
            file.ListItemAllFields.Title,
            file.ServerRelativeUrl,
            file.Length
          );

          listaArchivos.push(archivo);
        }

        dfd.resolve(listaArchivos);
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }


  public Archivos: string;
  public AreaTexto: string;
  public CantidadAmpliaciones: string;
  public Codigo: string;
  public CompartidoCon: Usuario[];
  public ComentarioRespuesta: string;
  public Desatendido: boolean;
  // public Descripcion: string;
  public DivisionTexto: string;
  public EsConfidencial: boolean;
  public EsIncumplimiento: boolean;
  public EstadoExpediente: string;
  public EstadoExpedienteCalculado: string;
  public NombreDocumento: string;
  public FechaAsignacion: string;
  public FechaCierre: string;
  public FechaPlazo: string;
  public FechaRecepcion: string;
  public FechaRespuesta: string;
  public OrigenPlazo: string;
  public PalabrasClaves: string;

  public ExpedientesRelacionados: EExpediente[];
  public IncidentesAsociados: EIncidentes[];
  public IncidentesAsociadosIds: string;
  public NormasRelacionadas: ENorma[];
  public ProyectosAsociados: EProyecto[];
  public ProyectosAsociadosIds: string;
  public ReportesAsociados: EReporte[];
  public ReportesAsociadosIds: string;

  public Empresa: EEmpresa;
  public Entidad: EEntidad;
  public GrupoGestion: EGrupo;
  public GrupoGrupoGestion: Grupo;
  public Responsable: Usuario;
  public ResponsablesAuxiliares: Usuario[];
  public TipoDirectiva: ETipoDirectiva;
  public UsuarioDelegado: Usuario;

  public ListaArchivosExpediente: EArchivoExpediente[];
  public AchivosRespuesta: EArchivoExpediente | null;

  constructor() {
    super();

    this.Archivos = "";
    this.CantidadAmpliaciones = "";
    this.Desatendido = true;
    // this.Descripcion = "";
    this.EsConfidencial = false;
    this.EsIncumplimiento = false;
    this.EstadoExpediente = "";
    this.EstadoExpedienteCalculado = "";
    this.NombreDocumento = "";
    this.FechaAsignacion = "";
    this.FechaCierre = "";
    this.FechaPlazo = "";
    this.FechaRecepcion = "";
    this.FechaRespuesta = "";
    this.OrigenPlazo = "";
    this.PalabrasClaves = "";
    this.Title = "";

    this.ExpedientesRelacionados = [];
    this.NormasRelacionadas = [];
    this.IncidentesAsociados = [];
    this.IncidentesAsociadosIds = "";
    this.ProyectosAsociados = [];
    this.ProyectosAsociadosIds = "";
    this.ReportesAsociados = [];
    this.ReportesAsociadosIds = "";

    this.CompartidoCon = [];
    this.Empresa = new EEmpresa();
    this.Entidad = new EEntidad();
    this.GrupoGestion = new EGrupo();
    this.GrupoGrupoGestion = new Grupo();
    this.Responsable = new Usuario();
    this.ResponsablesAuxiliares = [];
    this.TipoDirectiva = new ETipoDirectiva();
    this.UsuarioDelegado = new Usuario()

    this.ListaArchivosExpediente = [];
    this.AchivosRespuesta = null;
  }

  public setearValores(elementoItemLista: SP.ListItem) {
    this.AreaTexto = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.AreaTexto
    );
    this.Archivos = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.Archivos
    );
    this.DivisionTexto = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.DivisionTexto
    );
    this.EstadoExpediente = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.EstadoExpediente
    );
    this.FechaRegistro = ParseJsom.parsearFechaString(
      elementoItemLista,
      EExpediente.Campos.FechaRegistro
    );
    this.NombreDocumento = ParseJsom.parsearString(
      elementoItemLista,
      EExpediente.Campos.NombreDocumento
    );
    this.Responsable = ParseJsom.parsearUsuario(
      elementoItemLista,
      EExpediente.CamposExpand.Responsable
    );
    this.UsuarioDelegado = ParseJsom.parsearUsuario(
      elementoItemLista,
      EExpediente.CamposExpand.UsuarioDelegado
    );
 
  }

  public setearValoresRest(elementoItemLista: any) {
    this.AreaTexto = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.Campos.AreaTexto
    );
    this.Archivos = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.Campos.Archivos
    );
    this.CantidadAmpliaciones = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.Campos.CantidadAmpliaciones
    );
    this.Codigo = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.Campos.Codigo
    );
    this.CompartidoCon = RestFiltros.parsearUsuarios(
      elementoItemLista,
      EExpediente.Campos.CompartidoCon
    );
    this.ComentarioRespuesta = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.Campos.ComentarioRespuesta
    );
    this.Desatendido = RestFiltros.parsearBooleano(
      elementoItemLista,
      EExpediente.Campos.Desatendido
    );
    /* this.Descripcion = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.Campos.Descripcion
    );*/
    this.DivisionTexto = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.Campos.DivisionTexto
    );
    this.EsConfidencial = RestFiltros.parsearBooleano(
      elementoItemLista,
      EExpediente.Campos.EsConfidencial
    );
    this.EsIncumplimiento = RestFiltros.parsearBooleano(
      elementoItemLista,
      EExpediente.Campos.EsIncumplimiento
    );
    this.EstadoExpediente = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.Campos.EstadoExpediente
    );
    this.ExpedientesRelacionados = RestFiltros.parsearLookupMultiple(
      elementoItemLista,
      EExpediente.Campos.ExpedientesRelacionados,
      EExpediente
    );
    this.FechaCierre = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.Campos.FechaCierre
    );
    this.FechaPlazo = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.Campos.FechaPlazo
    );
    this.FechaRecepcion = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.Campos.FechaRecepcion
    );
    this.FechaRegistro = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.Campos.FechaRegistro
    );
    this.FechaRespuesta = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.Campos.FechaRespuesta
    );
    this.ID = elementoItemLista[EExpediente.Campos.ID];
    this.IncidentesAsociadosIds = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.CamposRest.IncidentesAsociadosIds
    );
    this.OrigenPlazo = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.Campos.OrigenPlazo
    );
    this.Modified = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.Campos.Modified
    );
    this.NombreDocumento = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.Campos.NombreDocumento
    );
    this.NormasRelacionadas = RestFiltros.parsearLookupMultiple(
      elementoItemLista,
      EExpediente.Campos.NormasRelacionadas,
      ENorma
    );
    this.PalabrasClaves = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.Campos.PalabrasClaves
    );

    this.Empresa = RestFiltros.parsearLookup(
      elementoItemLista,
      EExpediente.CamposExpand.Empresa,
      EEmpresa
    );
    this.Entidad = RestFiltros.parsearLookup(
      elementoItemLista,
      EExpediente.CamposExpand.Entidad,
      EEntidad
    );
    this.GrupoGestion = RestFiltros.parsearLookup(
      elementoItemLista,
      EExpediente.CamposExpand.GrupoGestion,
      EGrupo
    );
    this.GrupoGrupoGestion = RestFiltros.parsearGrupo(
      elementoItemLista,
      EExpediente.CamposExpand.GrupoGrupoGestion
    );
    this.ProyectosAsociadosIds = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.CamposRest.ProyectosAsociadosIds
    );
    this.ReportesAsociadosIds = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.CamposRest.ReportesAsociadosIds
    );
    this.Responsable = RestFiltros.parsearUsuario(
      elementoItemLista,
      EExpediente.CamposExpand.Responsable
    );
    this.ResponsablesAuxiliares = RestFiltros.parsearUsuarios(
      elementoItemLista,
      EExpediente.CamposExpand.ResponsablesAuxiliares
    );
    this.TipoDirectiva = RestFiltros.parsearLookup(
      elementoItemLista,
      EExpediente.CamposExpand.TipoDirectiva,
      ETipoDirectiva
    );
    this.Title = RestFiltros.parsearTexto(
      elementoItemLista,
      EExpediente.Campos.Title
    );
    this.UsuarioDelegado = RestFiltros.parsearUsuario(
      elementoItemLista,
      EExpediente.CamposExpand.UsuarioDelegado
    );
 
  }

  public setearValoresConRest(elementoItemLista: any): void {
    this.ID = elementoItemLista.ID;
    this.Title = elementoItemLista.Title;
    this.Codigo = (elementoItemLista.Codigo ? elementoItemLista.Codigo : "");
    this.NombreDocumento = (elementoItemLista.NombreDocumento ? elementoItemLista.NombreDocumento : "");
  }

}
