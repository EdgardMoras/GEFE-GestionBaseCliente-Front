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
import EGrupo from "./EGrupo";
import ETipoNorma from "./ETipoNorma";
import Lookup from "../Base/Lookup";
import ELookupMultiple from "../logicas/ELookupMultiple";
import ENormaImpactada from "./ENormaImpactada";
import EExpediente from "./EExpediente";
import EIncidentes from "./EIncidente";
import EReporte from "./EReporte";
import EProyecto from "./EProyecto";

export default class ENorma extends EBaseEntidadTransaccional {
  public static Campos = {
    Alcance: ParametrosNoAdministrables.ColumnasSitio.Alcance,
    CalificacionNorma: ParametrosNoAdministrables.ColumnasSitio.CalificacionNorma,
    Codigo: ParametrosNoAdministrables.ColumnasSitio.Codigo,
    CompartidoCon: ParametrosNoAdministrables.ColumnasSitio.CompartidoCon,
    Consideraciones: ParametrosNoAdministrables.ColumnasSitio.Consideraciones,
    Descripcion: ParametrosNoAdministrables.ColumnasSitio.Descripcion,
    Entidad: ParametrosNoAdministrables.ColumnasSitio.Entidad,
    EstadoElemento: ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
    EstadoNorma: ParametrosNoAdministrables.ColumnasSitio.EstadoNorma,
    ExpedientesRelacionados: ParametrosNoAdministrables.ColumnasSitio.ExpedientesRelacionados,
    FechaCaducidad: ParametrosNoAdministrables.ColumnasSitio.FechaCaducidad,
    FechaInicioVigenciaTexto: ParametrosNoAdministrables.ColumnasSitio.FechaInicioVigenciaTexto,
    GeneraObligacionesDirectas: ParametrosNoAdministrables.ColumnasSitio.GeneraObligacionesDirectas,
    GeneraObligacionesInmediatas: ParametrosNoAdministrables.ColumnasSitio.GeneraObligacionesInmediatas,
    GeneraObligacionesReportes: ParametrosNoAdministrables.ColumnasSitio.GeneraObligacionesReportes,
    GrupoGestion: ParametrosNoAdministrables.ColumnasSitio.GrupoGestion,
    PlazoImplementacionTexto: ParametrosNoAdministrables.ColumnasSitio.PlazoImplementacionTexto,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    FechaPublicacion: ParametrosNoAdministrables.ColumnasSitio.FechaPublicacion,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    IncidentesAsociados: ParametrosNoAdministrables.ColumnasSitio.IncidentesAsociados,
    Modified: ParametrosNoAdministrables.ColumnasSitio.Modified,
    MotivoRealizarSeguimiento: ParametrosNoAdministrables.ColumnasSitio.MotivoRealizarSeguimiento,
    // NombreDocumento: ParametrosNoAdministrables.ColumnasSitio.NombreDocumento,
    NormaImpacto: ParametrosNoAdministrables.ColumnasSitio.NormaImpacto,
    NormaProbabilidad: ParametrosNoAdministrables.ColumnasSitio.NormaProbabilidad,
    NormasRelacionadas: ParametrosNoAdministrables.ColumnasSitio.NormasRelacionadas,
    NumeroNorma: ParametrosNoAdministrables.ColumnasSitio.NumeroNorma,
    PalabrasClaves: ParametrosNoAdministrables.ColumnasSitio.PalabrasClaves,
    ProyectosAsociadosIds: ParametrosNoAdministrables.ColumnasSitio.ProyectosAsociadosIds,
    ReportesAsociadosIds: ParametrosNoAdministrables.ColumnasSitio.ReportesAsociadosIds,
    RequiereSeguimiento: ParametrosNoAdministrables.ColumnasSitio.RequiereSeguimiento,
    TextoRequiereSeguimiento: ParametrosNoAdministrables.ColumnasSitio.TextoRequiereSeguimiento,
    TipoNorma: ParametrosNoAdministrables.ColumnasSitio.TipoNorma,
    Title: ParametrosNoAdministrables.ColumnasSitio.Title,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro
  };
  public static CamposExpand = {
    Alcance: ParametrosNoAdministrables.ColumnasSitio.Alcance,
    CompartidoCon: ParametrosNoAdministrables.ColumnasSitio.CompartidoCon,
    Entidad: ParametrosNoAdministrables.ColumnasSitio.Entidad,
    ExpedientesRelacionados: ParametrosNoAdministrables.ColumnasSitio.ExpedientesRelacionados,
    GrupoGestion: ParametrosNoAdministrables.ColumnasSitio.GrupoGestion,
    IncidentesAsociados: ParametrosNoAdministrables.ColumnasSitio.IncidentesAsociados,
    NormasRelacionadas: ParametrosNoAdministrables.ColumnasSitio.NormasRelacionadas,
    TipoNorma: ParametrosNoAdministrables.ColumnasSitio.TipoNorma,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro
  };
  public static CamposRest = {
    CalificacionNorma: ParametrosNoAdministrables.ColumnasSitio.CalificacionNorma,
    Codigo: ParametrosNoAdministrables.ColumnasSitio.Codigo,
    Consideraciones: ParametrosNoAdministrables.ColumnasSitio.Consideraciones,
    Descripcion: ParametrosNoAdministrables.ColumnasSitio.Descripcion,
    EstadoElemento: ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
    EstadoNorma: ParametrosNoAdministrables.ColumnasSitio.EstadoNorma,
    FechaCaducidad: ParametrosNoAdministrables.ColumnasSitio.FechaCaducidad,
    FechaInicioVigenciaTexto: ParametrosNoAdministrables.ColumnasSitio.FechaInicioVigenciaTexto,
    GeneraObligacionesDirectas: ParametrosNoAdministrables.ColumnasSitio.GeneraObligacionesDirectas,
    GeneraObligacionesInmediatas: ParametrosNoAdministrables.ColumnasSitio.GeneraObligacionesInmediatas,
    GeneraObligacionesReportes: ParametrosNoAdministrables.ColumnasSitio.GeneraObligacionesReportes,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    FechaPublicacion: ParametrosNoAdministrables.ColumnasSitio.FechaPublicacion,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    Modified: ParametrosNoAdministrables.ColumnasSitio.Modified,
    MotivoRealizarSeguimiento: ParametrosNoAdministrables.ColumnasSitio.MotivoRealizarSeguimiento,
    // NombreDocumento: ParametrosNoAdministrables.ColumnasSitio.NombreDocumento,
    NormaImpacto: ParametrosNoAdministrables.ColumnasSitio.NormaImpacto,
    NormaProbabilidad: ParametrosNoAdministrables.ColumnasSitio.NormaProbabilidad,
    NumeroNorma: ParametrosNoAdministrables.ColumnasSitio.NumeroNorma,
    PalabrasClaves: ParametrosNoAdministrables.ColumnasSitio.PalabrasClaves,
    PlazoImplementacionTexto: ParametrosNoAdministrables.ColumnasSitio.PlazoImplementacionTexto,
    ProyectosAsociadosIds: ParametrosNoAdministrables.ColumnasSitio.ProyectosAsociadosIds,
    ReportesAsociadosIds: ParametrosNoAdministrables.ColumnasSitio.ReportesAsociadosIds,
    RequiereSeguimiento: ParametrosNoAdministrables.ColumnasSitio.RequiereSeguimiento,
    TextoRequiereSeguimiento: ParametrosNoAdministrables.ColumnasSitio.TextoRequiereSeguimiento,
    Title: ParametrosNoAdministrables.ColumnasSitio.Title
  };

  public static getValoresRegistroNuevo(
    alcance: ELookupMultiple<number>,
    codigo: string,
    consideraciones: string,
    entidadId: number,
    estadoNorma: string,
    expedientesRelacionados: ELookupMultiple<number>,
    fechaCaducidad: Date,
    fechaInicioVigenciaTexto: string,
    fechaPublicacion: Date,
    grupoGestionId: number,
    incidentesAsociados: ELookupMultiple<number>,
    listaIdUsuariosCompartidoCon: number[],
    normasRelacionadas: ELookupMultiple<number>,
    numeroNorma: string,
    palabrasClaves: string,
    plazoImplementacionTexto: string,
    proyectosAsociadosIds: string,
    reportesAsociadosIds: string,
    tipoNormaId: number,
    titulo: string
  ): any {
    return {
      AlcanceId: alcance,
      Codigo: codigo,
      CompartidoConId: new ELookupMultiple(listaIdUsuariosCompartidoCon),
      Consideraciones: consideraciones,
      EntidadId: entidadId,
      EstadoElemento: ParametrosNoAdministrables.ValoresEstadosElemento.Activo,
      EstadoNorma: estadoNorma,
      ExpedientesRelacionadosId: expedientesRelacionados,
      FechaCaducidad: fechaCaducidad,
      FechaInicioVigenciaTexto: fechaInicioVigenciaTexto,
      GrupoGestionId: grupoGestionId,
      IncidentesAsociadosId: incidentesAsociados,
      PlazoImplementacionTexto: plazoImplementacionTexto,
      FechaPublicacion: fechaPublicacion,
      Descripcion: titulo,
      NormasRelacionadasId: normasRelacionadas,
      NumeroNorma: numeroNorma,
      PalabrasClaves: palabrasClaves,
      ProyectosAsociadosIds: proyectosAsociadosIds,
      ReportesAsociadosIds: reportesAsociadosIds,
      TipoNormaId: tipoNormaId
    };
  }

  public static getValorCompartidoConEstadoRegistrado(consideraciones: string, listaIdUsuariosCompartidoCon: number[]) {
    return {
      Consideraciones: consideraciones,
      CompartidoConId: new ELookupMultiple(listaIdUsuariosCompartidoCon),
      EstadoNorma: ParametrosNoAdministrables.ModuloNormas.ValoresEstados.EnEvaluacion
    };
  }

  public static getValorCompartidoCon(consideraciones: string, listaIdUsuariosCompartidoCon: number[]) {
    return {
      Consideraciones: consideraciones,
      CompartidoConId: new ELookupMultiple(listaIdUsuariosCompartidoCon)
    };
  }

  public static getValorUsuriosCompartidoCon(listaIdUsuariosCompartidoCon: number[]) {
    return {
      CompartidoConId: new ELookupMultiple(listaIdUsuariosCompartidoCon)
    };
  }

  public static getActualizarEvalucionCalificacionNorma = (probabilidad: number, impacto: number, calificacionNorma: string, textoRequiereSeguimiento: string, requiereSeguimiento: boolean, motivoRealizarSeguimiento: string) => {
    return {
      NormaImpacto: impacto,
      NormaProbabilidad: probabilidad,
      CalificacionNorma: calificacionNorma,
      TextoRequiereSeguimiento: textoRequiereSeguimiento,
      RequiereSeguimiento: requiereSeguimiento,
      MotivoRealizarSeguimiento: motivoRealizarSeguimiento
    };
  };

  public static getActualizarEvaluacionObligacionesDirectas = (generaObligacionesDirectas: boolean) => {
    return {
      GeneraObligacionesDirectas: generaObligacionesDirectas
    };
  };

  public static getActualizarEvaluacionObligacionesInmediatas = (generaObligacionesInmediatas: boolean) => {
    return {
      GeneraObligacionesInmediatas: generaObligacionesInmediatas
    };
  };

  public static getActualizarEvaluacionObligacionesReportes = (generaObligacionesReportes: boolean) => {
    return {
      GeneraObligacionesReportes: generaObligacionesReportes
    };
  };

  public static getFinalizarEvaluacionYNoRequerirSeguimiento = (datos: any, listaIdUsuariosCompartidoCon: number[]) => {
    return {
      ...datos,
      EstadoNorma: ParametrosNoAdministrables.ModuloNormas.ValoresEstados.Comunicada,
      CompartidoConId: new ELookupMultiple(listaIdUsuariosCompartidoCon)
    };
  };

  public static getFinalizarEvaluacionYRequerirSeguimiento = (datos: any, listaIdUsuariosCompartidoCon: number[]) => {
    return {
      ...datos,
      EstadoNorma: ParametrosNoAdministrables.ModuloNormas.ValoresEstados.EnSeguimiento,
      CompartidoConId: new ELookupMultiple(listaIdUsuariosCompartidoCon)
    };
  };

  public static getImplementada = () => {
    return {
      EstadoNorma: ParametrosNoAdministrables.ModuloNormas.ValoresEstados.Implementada
    };
  };

  public static getIniciarImplementacion = (listaIdUsuariosCompartidoCon: number[]) => {
    return {
      EstadoNorma: ParametrosNoAdministrables.ModuloNormas.ValoresEstados.EnProceso,
      CompartidoConId: new ELookupMultiple(listaIdUsuariosCompartidoCon)
    };
  };

  public static setearValoresBusquedaNormasAsociadas(elementoItemLista: SP.ListItem, objeto: ENorma) {
    const alcanceLookup = ParseJsom.parsearLookupMultiple(elementoItemLista, ENorma.Campos.Alcance);
    objeto.Alcance = [];
    alcanceLookup.forEach((elemento: Lookup) => {
      const empresa = new EEmpresa();
      empresa.setearValoresDesdeLookup(elemento);
      objeto.Alcance.push(empresa);
    });

    objeto.Codigo = ParseJsom.parsearString(elementoItemLista, ENorma.Campos.Codigo);
    objeto.Descripcion = ParseJsom.parsearString(elementoItemLista, ENorma.Campos.Descripcion);
    const entidadLookup = ParseJsom.parsearLookup(elementoItemLista, ENorma.Campos.Entidad);
    objeto.Entidad = new EEntidad();
    objeto.Entidad.setearValoresDesdeLookup(entidadLookup);

    objeto.EstadoNorma = ParseJsom.parsearString(elementoItemLista, ENorma.Campos.EstadoNorma);
    objeto.FechaPublicacion = ParseJsom.parsearFechaStringSoloFecha(elementoItemLista, ENorma.Campos.FechaPublicacion);
    objeto.FechaInicioVigenciaTexto = ParseJsom.parsearString(elementoItemLista, ENorma.Campos.FechaInicioVigenciaTexto);
    objeto.FechaRegistro = ParseJsom.parsearFechaString(elementoItemLista, ENorma.Campos.FechaRegistro);
    const grupoGestionLookup = ParseJsom.parsearLookup(elementoItemLista, ENorma.Campos.GrupoGestion);
    objeto.GrupoGestion = new EGrupo();
    objeto.GrupoGestion.setearValoresDesdeLookup(grupoGestionLookup);

    objeto.ID = ParseJsom.parsearNumber(elementoItemLista, ENorma.Campos.ID);
    /* objeto.NombreDocumento = ParseJsom.parsearString(
      elementoItemLista,
      ENorma.Campos.NombreDocumento
    );*/
    objeto.NumeroNorma = ParseJsom.parsearString(elementoItemLista, ENorma.Campos.NumeroNorma);

    const tipoNormaLookup = ParseJsom.parsearLookup(elementoItemLista, ENorma.Campos.TipoNorma);
    objeto.TipoNorma = new ETipoNorma();
    objeto.TipoNorma.setearValoresDesdeLookup(tipoNormaLookup);


  }

  public static setearValoresConsultarNormas(elementoItemLista: SP.ListItem, objeto: ENorma) {
    const alcanceLookup = ParseJsom.parsearLookupMultiple(elementoItemLista, ENorma.Campos.Alcance);
    objeto.Alcance = [];
    alcanceLookup.forEach((elemento: Lookup) => {
      const empresa = new EEmpresa();
      empresa.setearValoresDesdeLookup(elemento);
      objeto.Alcance.push(empresa);
    });

    objeto.Codigo = ParseJsom.parsearString(elementoItemLista, ENorma.Campos.Codigo);
    objeto.Descripcion = ParseJsom.parsearString(elementoItemLista, ENorma.Campos.Descripcion);
    const entidadLookup = ParseJsom.parsearLookup(elementoItemLista, ENorma.Campos.Entidad);
    objeto.Entidad = new EEntidad();
    objeto.Entidad.setearValoresDesdeLookup(entidadLookup);

    objeto.EstadoNorma = ParseJsom.parsearString(elementoItemLista, ENorma.Campos.EstadoNorma);
    objeto.FechaPublicacion = ParseJsom.parsearFechaStringSoloFecha(elementoItemLista, ENorma.Campos.FechaPublicacion);
    objeto.FechaInicioVigenciaTexto = ParseJsom.parsearString(elementoItemLista, ENorma.Campos.FechaInicioVigenciaTexto);
    objeto.FechaRegistro = ParseJsom.parsearFechaString(elementoItemLista, ENorma.Campos.FechaRegistro);
    const grupoGestionLookup = ParseJsom.parsearLookup(elementoItemLista, ENorma.Campos.GrupoGestion);
    objeto.GrupoGestion = new EGrupo();
    objeto.GrupoGestion.setearValoresDesdeLookup(grupoGestionLookup);

    objeto.ID = ParseJsom.parsearNumber(elementoItemLista, ENorma.Campos.ID);
    /* objeto.NombreDocumento = ParseJsom.parsearString(
      elementoItemLista,
      ENorma.Campos.NombreDocumento
    );*/
    objeto.NumeroNorma = ParseJsom.parsearString(elementoItemLista, ENorma.Campos.NumeroNorma);

    const tipoNormaLookup = ParseJsom.parsearLookup(elementoItemLista, ENorma.Campos.TipoNorma);
    objeto.TipoNorma = new ETipoNorma();
    objeto.TipoNorma.setearValoresDesdeLookup(tipoNormaLookup);



    const CompartidoCon = ParseJsom.parsearUsuarioMultiple(elementoItemLista, ENorma.CamposExpand.CompartidoCon);
    objeto.CompartidoCon = [];
    CompartidoCon.forEach(element => {
      const usuario = new Usuario();
      usuario.setearValoresConRest(element);
      objeto.CompartidoCon.push(usuario);
    });

  }

  public static setearValoresConsultarNormasExportar(elementoItemLista: SP.ListItem, objeto: ENorma) {
    const alcanceLookup = ParseJsom.parsearLookupMultiple(elementoItemLista, ENorma.Campos.Alcance);
    objeto.Alcance = [];
    alcanceLookup.forEach((elemento: Lookup) => {
      const empresa = new EEmpresa();
      empresa.setearValoresDesdeLookup(elemento);
      objeto.Alcance.push(empresa);
    });

    objeto.Codigo = ParseJsom.parsearString(elementoItemLista, ENorma.Campos.Codigo);
    objeto.Descripcion = ParseJsom.parsearString(elementoItemLista, ENorma.Campos.Descripcion);
    const entidadLookup = ParseJsom.parsearLookup(elementoItemLista, ENorma.Campos.Entidad);
    objeto.Entidad = new EEntidad();
    objeto.Entidad.setearValoresDesdeLookup(entidadLookup);

    objeto.EstadoNorma = ParseJsom.parsearString(elementoItemLista, ENorma.Campos.EstadoNorma);
    objeto.FechaCaducidad = ParseJsom.parsearFechaString(elementoItemLista, ENorma.Campos.FechaCaducidad);
    objeto.FechaInicioVigenciaTexto = ParseJsom.parsearString(elementoItemLista, ENorma.Campos.FechaInicioVigenciaTexto);
    objeto.FechaPublicacion = ParseJsom.parsearFechaStringSoloFecha(elementoItemLista, ENorma.Campos.FechaPublicacion);
    objeto.FechaRegistro = ParseJsom.parsearFechaString(elementoItemLista, ENorma.Campos.FechaRegistro);
    const grupoGestionLookup = ParseJsom.parsearLookup(elementoItemLista, ENorma.Campos.GrupoGestion);
    objeto.GrupoGestion = new EGrupo();
    objeto.GrupoGestion.setearValoresDesdeLookup(grupoGestionLookup);

    objeto.ID = ParseJsom.parsearNumber(elementoItemLista, ENorma.Campos.ID);
    /* objeto.NombreDocumento = ParseJsom.parsearString(
      elementoItemLista,
      ENorma.Campos.NombreDocumento
    );*/
    objeto.NumeroNorma = ParseJsom.parsearString(elementoItemLista, ENorma.Campos.NumeroNorma);
    objeto.PalabrasClaves = ParseJsom.parsearString(elementoItemLista, ENorma.Campos.PalabrasClaves);
    objeto.PlazoImplementacionTexto = ParseJsom.parsearString(elementoItemLista, ENorma.Campos.PlazoImplementacionTexto);
    const tipoNormaLookup = ParseJsom.parsearLookup(elementoItemLista, ENorma.Campos.TipoNorma);
    objeto.TipoNorma = new ETipoNorma();
    objeto.TipoNorma.setearValoresDesdeLookup(tipoNormaLookup);

  }

  public static async obtener(idNorma: number): Promise<ENorma> {
    const dfd: Deferred<ENorma> = new Deferred<ENorma>();

    const filtroPorIdYEstadoActivo: string = RestFiltros.obtenerFiltroPorIdYEstadoActivo(idNorma);
    const listaCamposExpand = Funciones.obtenerListaCampos(ENorma.CamposExpand);
    const listaFieldsSelect = Funciones.obtenerListaCampos(ENorma.CamposRest);

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.Alcance),
      RestFiltros.obtenerFieldExpandUsuario(ENorma.CamposExpand.CompartidoCon),
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.Entidad),
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.GrupoGestion),
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.TipoNorma),
      RestFiltros.obtenerFieldExpandUsuario(ENorma.CamposExpand.UsuarioRegistro),

      this.obtenerFieldExpandLookupExpedienteRelacionado(ENorma.CamposExpand.ExpedientesRelacionados),
      this.obtenerFieldExpandLookupNormaRelacionado(ENorma.CamposExpand.NormasRelacionadas),
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.IncidentesAsociados)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(listaFieldsExpand);

    const url: string = String.format(ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter, ParametrosNoAdministrables.Listas.Normas, listaFieldsSelectYFieldsExpand.join(","), listaCamposExpand.join(","), filtroPorIdYEstadoActivo);

    const registro = new ENorma();

    if (idNorma === 0) {
      dfd.resolve(registro);
    } else {
      Promise.all([Funciones.ObtenerElementoPorRest(url)])
        .then(([resultadoNorma, resultadoNormasImpactadas]) => {
          if (resultadoNorma.length === 0) {
            dfd.resolve(registro);
            return;
          }

          registro.setearValoresRest(resultadoNorma[0], []);

          dfd.resolve(registro);
        })
        .catch(error => {
          dfd.reject(error);
        });
    }

    return dfd.promise;
  }

  public static async obtenerPorIdsNormas(idsNormas: number[]): Promise<ENorma[]> {
    const dfd: Deferred<ENorma[]> = new Deferred<ENorma[]>();

    const filtrosIds = idsNormas
      .map((id: number) => {
        return `${ParametrosNoAdministrables.ColumnasSitio.ID} eq ${id}`;
      })
      .join(" or ");
    const filtroPorIdYEstadoActivo: string = `${filtrosIds} and ${RestFiltros.obtenerFiltroPorEstadoActivo()}`;

    const listaCamposExpand = Funciones.obtenerListaCampos(ENorma.CamposExpand);
    const listaFieldsSelect = Funciones.obtenerListaCampos(ENorma.CamposRest);

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.Alcance),
      RestFiltros.obtenerFieldExpandUsuario(ENorma.CamposExpand.CompartidoCon),
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.Entidad),
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.GrupoGestion),
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.TipoNorma),
      RestFiltros.obtenerFieldExpandUsuario(ENorma.CamposExpand.UsuarioRegistro),

      this.obtenerFieldExpandLookupExpedienteRelacionado(ENorma.CamposExpand.ExpedientesRelacionados),
      this.obtenerFieldExpandLookupNormaRelacionado(ENorma.CamposExpand.NormasRelacionadas),
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.IncidentesAsociados)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(listaFieldsExpand);

    const url: string = String.format(ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter, ParametrosNoAdministrables.Listas.Normas, listaFieldsSelectYFieldsExpand.join(","), listaCamposExpand.join(","), filtroPorIdYEstadoActivo);

    const listaResultado: ENorma[] = [];

    if (idsNormas.length === 0) {
      dfd.resolve([]);
    } else {
      Promise.all([Funciones.ObtenerElementoPorRest(url)])
        .then(([resultadosNorma, resultadoNormasImpactadas]) => {
          if (resultadosNorma.length === 0) {
            dfd.resolve([]);
            return;
          }

          resultadosNorma.forEach((element: any) => {
            const registro = new ENorma();
            registro.setearValoresRest(element, []);
            listaResultado.push(registro);
          });

          dfd.resolve(listaResultado);
        })
        .catch(error => {
          dfd.reject(error);
        });
    }

    return dfd.promise;
  }

  public static async obtenerNormas(): Promise<ENorma[]> {
    const dfd: Deferred<ENorma[]> = new Deferred<ENorma[]>();

    const filtroPorIdYEstadoActivo: string = RestFiltros.obtenerFiltroPorEstadoActivo();
    const listaFieldsSelect = Funciones.obtenerListaCampos(ENorma.CamposRest);

    const url: string = String.format(ParametrosNoAdministrables.RestEstructuras.SelectFilter, ParametrosNoAdministrables.Listas.Normas, listaFieldsSelect.join(","), filtroPorIdYEstadoActivo);

    Promise.all([Funciones.ObtenerElementoPorRest(url)])
      .then(([resultadoNorma]) => {
        const resultado: ENorma[] = [];
        resultadoNorma.forEach((elemento: ENorma) => {
          const registro = new ENorma();
          registro.setearValoresRest(elemento, []);
          resultado.push(registro);
        });

        dfd.resolve(resultado);
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public static obtenerFieldExpandLookupExpedienteRelacionado(nombreColumnaExpand: string) {
    return `${nombreColumnaExpand}/${ParametrosNoAdministrables.ColumnasSitio.ID},${nombreColumnaExpand}/${EExpediente.Campos.NombreDocumento}`;
  }
  public static obtenerFieldExpandLookupNormaRelacionado(nombreColumnaExpand: string) {
    return `${nombreColumnaExpand}/${ParametrosNoAdministrables.ColumnasSitio.ID},${nombreColumnaExpand}/${ENorma.Campos.Codigo}`;
  }

  public static async obtenerNormaConArchivos(idNorma: number): Promise<ENorma> {
    const dfd: Deferred<ENorma> = new Deferred<ENorma>();

    const filtroPorIdYEstadoActivo: string = RestFiltros.obtenerFiltroPorIdYEstadoActivo(idNorma);
    const listaCamposExpand = Funciones.obtenerListaCampos(ENorma.CamposExpand);
    const listaFieldsSelect = Funciones.obtenerListaCampos(ENorma.CamposRest);

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.Alcance),
      RestFiltros.obtenerFieldExpandUsuario(ENorma.CamposExpand.CompartidoCon),
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.Entidad),
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.GrupoGestion),
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.TipoNorma),
      RestFiltros.obtenerFieldExpandUsuario(ENorma.CamposExpand.UsuarioRegistro),

      this.obtenerFieldExpandLookupExpedienteRelacionado(ENorma.CamposExpand.ExpedientesRelacionados),
      this.obtenerFieldExpandLookupNormaRelacionado(ENorma.CamposExpand.NormasRelacionadas),
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.IncidentesAsociados)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(listaFieldsExpand);

    const url: string = String.format(ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter, ParametrosNoAdministrables.Listas.Normas, listaFieldsSelectYFieldsExpand.join(","), listaCamposExpand.join(","), filtroPorIdYEstadoActivo);

    const registro = new ENorma();

    if (idNorma === 0) {
      dfd.resolve(registro);
    } else {
      const nombreCarpetaNorma = `${idNorma}/${ParametrosNoAdministrables.ModuloNormas.Carpetas.Norma}`;
      const nombreCarpetaCompartir = `${idNorma}/${ParametrosNoAdministrables.ModuloNormas.Carpetas.Compartir}`;
      Promise.all([Funciones.ObtenerElementoPorRest(url), this.obtenerArchivos(nombreCarpetaNorma), this.obtenerArchivos(nombreCarpetaCompartir), ENormaImpactada.obtener(idNorma)])
        .then(([resultadoObtenerNorma, resultadoListaArchivosNorma, resultadoListaArchivosCompartidos, resultadoNormasImpactadas]) => {
          if (resultadoObtenerNorma.length === 0) {
            dfd.resolve(registro);
            return;
          }

          registro.setearValoresRest(resultadoObtenerNorma[0], resultadoNormasImpactadas as ENormaImpactada[]);
          registro.ListaArchivos = resultadoListaArchivosNorma;
          registro.ListaArchivosCompartidos = resultadoListaArchivosCompartidos;

          const listaIdsReportes: number[] = registro.ReportesAsociadosIds.split(";")
            .filter(x => x !== "")
            .map(x => parseInt(x, 10));


          Promise.all([EExpediente.obtenerPorIdsExpedientes(registro.ExpedientesRelacionados.map(x => x.ID)), ENorma.obtenerPorIdsNormas(registro.NormasRelacionadas.map(x => x.ID)), EIncidentes.obtenerPorIdsIncidentes(registro.IncidentesRelacionadas.map(x => x.ID)), EReporte.obtenerPorIdsReportes(listaIdsReportes)])
            .then(([resultadoObtenerExpedientesRelacionados, resultadoObtenerNormasRelacionadas, resultadoObtenerIncidentesRelacionados, resultadoObtenerReportesRelacionados]) => {
              registro.ExpedientesRelacionados = resultadoObtenerExpedientesRelacionados;
              registro.NormasRelacionadas = resultadoObtenerNormasRelacionadas;
              registro.IncidentesRelacionadas = resultadoObtenerIncidentesRelacionados;
              registro.ReportesAsociados = resultadoObtenerReportesRelacionados;

              dfd.resolve(registro);
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

  public static async obtenerIdsUsuariosCompartidos(idNorma: number): Promise<number[]> {
    const dfd: Deferred<number[]> = new Deferred<number[]>();

    const filtroPorIdYEstadoActivo: string = RestFiltros.obtenerFiltroPorIdYEstadoActivo(idNorma);
    const listaCamposExpand = Funciones.obtenerListaCampos(ENorma.CamposExpand);
    const listaFieldsSelect = Funciones.obtenerListaCampos(ENorma.CamposRest);

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.Alcance),
      RestFiltros.obtenerFieldExpandUsuario(ENorma.CamposExpand.CompartidoCon),
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.Entidad),
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.GrupoGestion),
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.TipoNorma),
      RestFiltros.obtenerFieldExpandUsuario(ENorma.CamposExpand.UsuarioRegistro),

      this.obtenerFieldExpandLookupExpedienteRelacionado(ENorma.CamposExpand.ExpedientesRelacionados),
      this.obtenerFieldExpandLookupNormaRelacionado(ENorma.CamposExpand.NormasRelacionadas),
      RestFiltros.obtenerFieldExpandLookup(ENorma.CamposExpand.IncidentesAsociados)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(listaFieldsExpand);

    const url: string = String.format(ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter, ParametrosNoAdministrables.Listas.Normas, listaFieldsSelectYFieldsExpand.join(","), listaCamposExpand.join(","), filtroPorIdYEstadoActivo);

    const registro = new ENorma();

    if (idNorma === 0) {
      dfd.resolve([]);
    } else {
      Promise.all([Funciones.ObtenerElementoPorRest(url)])
        .then(([resultadoObtenerNorma]) => {
          if (resultadoObtenerNorma.length === 0) {
            dfd.resolve([]);
            return;
          }

          registro.setearValoresRest(resultadoObtenerNorma[0], []);

          const listaIdsUsuariosCompartidos = registro.CompartidoCon.map((usuario: Usuario) => {
            return usuario.ID;
          });

          dfd.resolve(listaIdsUsuariosCompartidos);
        })
        .catch(error => {
          dfd.reject(error);
        });
    }

    return dfd.promise;
  }

  public static async crearCarpetasNorma(idNorma: number): Promise<boolean> {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    Funciones.CrearCarpeta(ParametrosNoAdministrables.Bibliotecas.ArchivosNormas, idNorma.toString())
      .then(resultadoCrearCarpetaPrincipal => {
        if (idNorma === 0) {
          dfd.resolve(false);
        } else {
          const promesas: Array<Promise<any>> = [];
          ParametrosNoAdministrables.ModuloNormas.ListaValoresCarpetas.forEach(nombreCarpeta => {
            promesas.push(Funciones.CrearSubCarpeta(ParametrosNoAdministrables.Bibliotecas.ArchivosNormas, nombreCarpeta, idNorma.toString()));
          });

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
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public static async obtenerArchivos(nombreCarpeta: string): Promise<EArchivoExpediente[]> {
    const dfd: Deferred<EArchivoExpediente[]> = new Deferred<EArchivoExpediente[]>();

    Funciones.ObtenerFiles(ParametrosNoAdministrables.Bibliotecas.ArchivosNormas, nombreCarpeta.toString())
      .then(result => {
        const listaArchivos: EArchivoExpediente[] = [];

        for (const file of result.Files) {
          const archivo: EArchivoExpediente = new EArchivoExpediente();
          archivo.setValores(file.ListItemAllFields.ID, file.ListItemAllFields.Title, file.ServerRelativeUrl, file.Length);

          listaArchivos.push(archivo);
        }

        dfd.resolve(listaArchivos);
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public CalificacionNorma: string;
  public Codigo: string;
  public Consideraciones: string;
  public Descripcion: string;
  public EstadoNorma: string;
  public FechaCaducidad: string;
  public FechaInicioVigenciaTexto: string;
  public FechaPublicacion: string;
  public GeneraObligacionesDirectas: boolean;
  public GeneraObligacionesInmediatas: boolean;
  public GeneraObligacionesReportes: boolean;
  public MotivoRealizarSeguimiento: string;
  // public NombreDocumento: string;
  public NormaImpacto: number;
  public NormaProbabilidad: number;
  public NumeroNorma: string;
  public OrigenPlazo: string;
  public PalabrasClaves: string;
  public PlazoImplementacionTexto: string;
  public RequiereSeguimiento: boolean;
  public TextoRequiereSeguimiento: string;

  public Alcance: EEmpresa[];
  public CompartidoCon: Usuario[];
  public Entidad: EEntidad;
  public GrupoGestion: EGrupo;
  public TipoNorma: ETipoNorma;

  public ExpedientesRelacionados: EExpediente[];
  public IncidentesRelacionadas: EIncidentes[];
  public NormasRelacionadas: ENorma[];
  public ProyectosAsociados: EProyecto[];
  public ProyectosAsociadosIds: string;
  public ReportesAsociados: EReporte[];
  public ReportesAsociadosIds: string;

  public EsCargoPlanes: boolean;


  public ListaArchivos: EArchivoExpediente[];
  public ListaArchivosCompartidos: EArchivoExpediente[];
  public ListaNormasImpactadas: ENormaImpactada[];
  public ListaUsuariosPertenecenGrupoGestion: Usuario[];
  public AchivosRespuesta: EArchivoExpediente | null;

  constructor() {
    super();

    this.Codigo = "";
    this.Consideraciones = "";
    this.Descripcion = "";
    this.EstadoNorma = "";
    this.FechaCaducidad = "";
    this.FechaInicioVigenciaTexto = "";
    this.PlazoImplementacionTexto = "";
    this.FechaPublicacion = "";
    // this.NombreDocumento = "";
    this.NormaImpacto = 0;
    this.NormaProbabilidad = 0;
    this.NumeroNorma = "";
    this.PalabrasClaves = "";

    this.Alcance = [];
    this.CompartidoCon = [];
    this.Entidad = new EEntidad();
    this.GrupoGestion = new EGrupo();
    this.NormasRelacionadas = [];

    this.ExpedientesRelacionados = [];
    this.NormasRelacionadas = [];
    this.IncidentesRelacionadas = [];
    this.ProyectosAsociados = [];
    this.ProyectosAsociadosIds = "";
    this.ReportesAsociados = [];
    this.ReportesAsociadosIds = "";

    this.EsCargoPlanes = false;


    this.ListaArchivos = [];
    this.ListaArchivosCompartidos = [];
    this.ListaNormasImpactadas = [];
    this.ListaUsuariosPertenecenGrupoGestion = [];
    this.AchivosRespuesta = null;
  }

  public setearValores(elementoItemLista: SP.ListItem) {
    this.Codigo = ParseJsom.parsearString(elementoItemLista, ENorma.Campos.Codigo);
  }

  public setearValoresRest(elementoItemLista: any, listaNormasImpactadas: ENormaImpactada[]) {
    this.ListaNormasImpactadas = listaNormasImpactadas;

    this.Alcance = RestFiltros.parsearLookupMultiple(elementoItemLista, ENorma.Campos.Alcance, EEmpresa);
    this.CalificacionNorma = RestFiltros.parsearTexto(elementoItemLista, ENorma.Campos.CalificacionNorma);
    this.Codigo = RestFiltros.parsearTexto(elementoItemLista, ENorma.Campos.Codigo);
    this.CompartidoCon = RestFiltros.parsearUsuarios(elementoItemLista, ENorma.Campos.CompartidoCon);
    this.Consideraciones = RestFiltros.parsearTexto(elementoItemLista, ENorma.Campos.Consideraciones);
    this.Descripcion = RestFiltros.parsearTexto(elementoItemLista, ENorma.Campos.Descripcion);
    this.Entidad = RestFiltros.parsearLookup(elementoItemLista, ENorma.Campos.Entidad, EEntidad);
    this.EstadoNorma = RestFiltros.parsearTexto(elementoItemLista, ENorma.Campos.EstadoNorma);
    this.ExpedientesRelacionados = RestFiltros.parsearLookupMultiple(elementoItemLista, ENorma.Campos.ExpedientesRelacionados, EExpediente);
    this.FechaCaducidad = RestFiltros.parsearTexto(elementoItemLista, ENorma.Campos.FechaCaducidad);
    this.FechaInicioVigenciaTexto = RestFiltros.parsearTexto(elementoItemLista, ENorma.Campos.FechaInicioVigenciaTexto);
    this.FechaRegistro = RestFiltros.parsearTexto(elementoItemLista, ENorma.Campos.FechaRegistro);
    this.GeneraObligacionesInmediatas = RestFiltros.parsearBooleano(elementoItemLista, ENorma.Campos.GeneraObligacionesInmediatas);
    this.GeneraObligacionesReportes = RestFiltros.parsearBooleano(elementoItemLista, ENorma.Campos.GeneraObligacionesReportes);
    this.GeneraObligacionesDirectas = RestFiltros.parsearBooleano(elementoItemLista, ENorma.Campos.GeneraObligacionesDirectas);
    this.GrupoGestion = RestFiltros.parsearLookup(elementoItemLista, ENorma.Campos.GrupoGestion, EGrupo);
    this.ID = elementoItemLista[ENorma.Campos.ID];
    this.IncidentesRelacionadas = RestFiltros.parsearLookupMultiple(elementoItemLista, ENorma.Campos.IncidentesAsociados, EIncidentes);
    this.FechaPublicacion = RestFiltros.parsearTexto(elementoItemLista, ENorma.Campos.FechaPublicacion);
    this.Modified = RestFiltros.parsearTexto(elementoItemLista, ENorma.Campos.Modified);
    this.MotivoRealizarSeguimiento = RestFiltros.parsearTexto(elementoItemLista, ENorma.Campos.MotivoRealizarSeguimiento);
    /* this.NombreDocumento = RestFiltros.parsearTexto(
      elementoItemLista,
      ENorma.Campos.NombreDocumento
    );*/
    this.NormaImpacto = RestFiltros.parsearNumeroDecimal(elementoItemLista, ENorma.Campos.NormaImpacto);
    this.NormaProbabilidad = RestFiltros.parsearNumeroDecimal(elementoItemLista, ENorma.Campos.NormaProbabilidad);
    this.NormasRelacionadas = RestFiltros.parsearLookupMultiple(elementoItemLista, ENorma.Campos.NormasRelacionadas, ENorma);
    this.NumeroNorma = RestFiltros.parsearTexto(elementoItemLista, ENorma.Campos.NumeroNorma);
    this.PalabrasClaves = RestFiltros.parsearTexto(elementoItemLista, ENorma.Campos.PalabrasClaves);
    this.PlazoImplementacionTexto = RestFiltros.parsearTexto(elementoItemLista, ENorma.Campos.PlazoImplementacionTexto);
    this.ProyectosAsociadosIds = RestFiltros.parsearTexto(elementoItemLista, ENorma.Campos.ProyectosAsociadosIds);
    this.RequiereSeguimiento = RestFiltros.parsearBooleano(elementoItemLista, ENorma.Campos.RequiereSeguimiento);
    this.ReportesAsociadosIds = RestFiltros.parsearTexto(elementoItemLista, ENorma.Campos.ReportesAsociadosIds);
    this.TextoRequiereSeguimiento = RestFiltros.parsearTexto(elementoItemLista, ENorma.Campos.TextoRequiereSeguimiento);
    this.TipoNorma = RestFiltros.parsearLookup(elementoItemLista, ENorma.Campos.TipoNorma, ETipoNorma);
  }

  public setearValoresConRest(elementoItemLista: any): void {
    this.ID = elementoItemLista.ID;
    this.Title = elementoItemLista.Title;
  }
}
