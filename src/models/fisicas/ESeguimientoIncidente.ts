// import { EBaseEntidadTransaccional } from "../Base/EBaseEntidadTransaccional";
import { RestFiltros } from "../../genericos/RestFiltros";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import EIncidente from "./EIncidente";
import Usuario from '../Base/Usuario';
import EArchivoIncidente from "src/models/logicas/EArchivoIncidencia";
import EAvanceImplementacionIncidente from './EAvanceImplementacionIncidente';
import EAmpliacionPlanAccionIncidente from './EAmpliacionPlanAccionIncidente';
import ETareaPlanAccion from './ETareaPlanAccion';
import EElementoPeoplePicker from 'src/models/logicas/EElementoPeoplePicker';
// import { EBaseEntidadTransaccional } from "src/models/Base/EBaseEntidadTransaccional";
export default class ESeguimientoIncidente {


  // public static NombreLista: string = ParametrosNoAdministrables.Listas.SeguimientoIncidente;
  public static Campos = {
    Codigo: ParametrosNoAdministrables.ColumnaSitioIncidenteSeguimiento.Codigo,
    Detalle: ParametrosNoAdministrables.ColumnaSitioIncidenteSeguimiento.Detalle,
    FechaCompromiso: ParametrosNoAdministrables.ColumnaSitioIncidenteSeguimiento.FechaCompromiso,
    FechaRegistro: ParametrosNoAdministrables.ColumnaSitioIncidenteSeguimiento.FechaRegistro,
    EstadoSeguimientoIncidente: ParametrosNoAdministrables.ColumnaSitioIncidenteSeguimiento.EstadoSeguimientoIncidente,
    EstadoElemento: ParametrosNoAdministrables.ColumnaSitioIncidenteSeguimiento.EstadoElemento,
    ID: ParametrosNoAdministrables.ColumnaSitioIncidenteSeguimiento.ID,
    FechaFinal: ParametrosNoAdministrables.ColumnaSitioIncidenteSeguimiento.FechaFinal,
  };
  public static CamposExpand = {
    Incidente: ParametrosNoAdministrables.ColumnasSitio.Incidente,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnaSitioIncidenteSeguimiento.UsuarioRegistro,
    ResponsableSeguimiento: ParametrosNoAdministrables.ColumnaSitioIncidenteSeguimiento.ReponsableSeguimiento,
  };

  public Incidente: EIncidente;
  public Detalle: string;
  public Codigo: string;
  public FechaRegistro: Date;
  public FechaCompromiso: Date | null;
  public FechaCompromisoString: string;
  public EstadoSeguimientoIncidente: string;
  public EstadoElemento: string;
  public UsuarioRegistro: Usuario;
  public ResponsableUsuario: Usuario;
  public ResponsableSeguimiento: EElementoPeoplePicker[];
  public ListaArchivos: EArchivoIncidente[];

  public ResponsableSeguimientoId: number;
  public UsuarioRegistroId: number;
  public IncidenteId: number;
  public EstadoElementoId: number;
  public Title: string;
  public ID: number;
  public esEditar: boolean;
  public esAvanceImplementacion: boolean;
  public esAmpliarPlanAccion: boolean;
  public esAprobarPlanAccion: boolean;
  public esReasignar: boolean;
  public esNuevaTarea: boolean;
  public esNuevoComentario: boolean;
  public esFinalizar: boolean;
  public esImplementadaPorVerificar: boolean;

  public RegistroAvanceImplementacion: EAvanceImplementacionIncidente[];
  public RegistroAvanceImplementacionGuardar: EAvanceImplementacionIncidente;
  public RegistroAmpliacionPlanAccionGuardar: EAmpliacionPlanAccionIncidente;
  public RegistroAmpliacionPlanAccion: EAmpliacionPlanAccionIncidente;
  public RegistroAprobarAmpliacionPlanAccion: EAmpliacionPlanAccionIncidente;

  public RegistroFinalizarPlanAccion: EAvanceImplementacionIncidente;
  public RegistroComentario: EAvanceImplementacionIncidente;
  public RegistroComentariolista: EAvanceImplementacionIncidente[];
  public FechaFinal: Date;

  public RegistroNuevaTarea: ETareaPlanAccion;
  public RegistroNuevaTarealista: ETareaPlanAccion[];

  public RegistroImplementacionPorVerificar: EAvanceImplementacionIncidente;


  public constructor() {
    this.Incidente = new EIncidente;
    this.Detalle = "";
    this.Codigo = "";
    this.FechaRegistro = new Date;
    this.FechaCompromiso = new Date;
    this.FechaCompromisoString = "";
    this.FechaFinal = new Date;
    this.EstadoSeguimientoIncidente = "";
    this.EstadoElemento = "";
    this.UsuarioRegistro = new Usuario;
    this.ResponsableUsuario = new Usuario;
    this.ResponsableSeguimiento = [];
    this.ListaArchivos = [];

    this.ResponsableSeguimientoId = 0;
    this.UsuarioRegistroId = 0;
    this.IncidenteId = 0;
    this.EstadoElementoId = 0;
    this.Title = "";
    this.ID = 0;
    this.esEditar = false;
    this.esAvanceImplementacion = false;
    this.esAmpliarPlanAccion = false;
    this.esAprobarPlanAccion = false;
    this.esReasignar = false;
    this.esNuevaTarea = false;
    this.esNuevoComentario = false;
    this.esFinalizar = false;
    this.esImplementadaPorVerificar = false;
    this.RegistroAvanceImplementacion = [];
    this.RegistroAvanceImplementacionGuardar = {} as EAvanceImplementacionIncidente;
    this.RegistroAmpliacionPlanAccionGuardar = {} as EAmpliacionPlanAccionIncidente;
    this.RegistroAmpliacionPlanAccion = {} as EAmpliacionPlanAccionIncidente;
    this.RegistroAprobarAmpliacionPlanAccion = {} as EAmpliacionPlanAccionIncidente;
    this.RegistroFinalizarPlanAccion = {} as EAvanceImplementacionIncidente;
    this.RegistroComentario = {} as EAvanceImplementacionIncidente;
    this.RegistroComentariolista = [];
    this.RegistroNuevaTarea = {} as ETareaPlanAccion;
    this.RegistroNuevaTarealista = [];
  }

  public setearValoresConRest(elementoItemLista: any): void {
    this.Incidente = RestFiltros.parsearLookup(
      elementoItemLista,
      ESeguimientoIncidente.CamposExpand.Incidente,
      EIncidente
    );

    this.UsuarioRegistro = RestFiltros.parsearUsuario(
      elementoItemLista,
      ESeguimientoIncidente.CamposExpand.UsuarioRegistro
    );

    this.ResponsableUsuario = RestFiltros.parsearUsuario(
      elementoItemLista,
      ESeguimientoIncidente.CamposExpand.ResponsableSeguimiento
    );

    this.ID = elementoItemLista.ID;
    this.Detalle = elementoItemLista.Detalle;
    this.FechaCompromiso = elementoItemLista.FechaCompromiso;
    this.FechaRegistro = elementoItemLista.FechaRegistro;
    this.FechaFinal = elementoItemLista.FechaFinal;
    this.EstadoElemento = elementoItemLista.EstadoElemento;
    this.EstadoSeguimientoIncidente = elementoItemLista.EstadoSeguimientoIncidente;
  }

  public setearValoresGuardar(
    UsuarioRegistroId: number,
    Codigo: string,
    Detalle: string,
    FechaCompromiso: Date,
    EstadoSeguimientoIncidente: string,
    ResponsableSeguimientoId: number,
    IncidenteId: number,
  ) {
    this.UsuarioRegistroId = UsuarioRegistroId;
    this.FechaRegistro = new Date(Date.now());
    this.Codigo = Codigo;
    this.FechaCompromiso = FechaCompromiso;
    this.ResponsableSeguimientoId = ResponsableSeguimientoId;
    this.Detalle = Detalle;
    this.EstadoSeguimientoIncidente = EstadoSeguimientoIncidente;
    this.Title = Codigo;
    this.IncidenteId = IncidenteId;
  }
  public getValoresGuardar() {
    return {
      UsuarioRegistroId: this.UsuarioRegistroId,
      FechaRegistro: this.FechaRegistro,
      FechaCompromiso: this.FechaCompromiso,
      Codigo: this.Codigo,
      ResponsableSeguimientoId: this.ResponsableSeguimientoId,
      Detalle: this.Detalle,
      EstadoSeguimientoIncidente: this.EstadoSeguimientoIncidente,
      Title: this.Title,
      IncidenteId: this.IncidenteId

    }

  }


  public setearValoresEditar(
    Detalle: string,
    FechaCompromiso: Date,
    ResponsableSeguimientoId: number,
  ) {
    this.FechaCompromiso = FechaCompromiso;
    this.ResponsableSeguimientoId = ResponsableSeguimientoId;
    this.Detalle = Detalle;
  }

  public getValoresEditar() {
    return {
      FechaCompromiso: this.FechaCompromiso,
      ResponsableSeguimientoId: this.ResponsableSeguimientoId,
      Detalle: this.Detalle
    }

  }


  public setearValoresEliminar() {
    this.EstadoElemento = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosPlanAccion.EstadoPlanAccionAnulado;
  }

  public setearValoresImplementadaPorVerificar() {
    this.EstadoSeguimientoIncidente = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosPlanAccion.EstadoPlanAccionImplementadaPorVerificar;

  }

  public GetearValoresImplementadaPorVerificar() {
    return { EstadoSeguimientoIncidente: this.EstadoSeguimientoIncidente }

  }

  public setearValoresAprobarImplementadaPorVerificar() {
    this.EstadoSeguimientoIncidente = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosPlanAccion.EstadoPlanAccionImplementada;
    this.FechaFinal = new Date(Date.now());
  }

  public GetearValoresAprobarImplementadaPorVerificar() {
    return {
      EstadoSeguimientoIncidente: this.EstadoSeguimientoIncidente,
      FechaFinal: this.FechaFinal
    }

  }

  public setearValoresRechazarImplementadaPorVerificar() {
    this.EstadoSeguimientoIncidente = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosPlanAccion.EstadoPlanAccionEnProceso;
  }

  public GetearValoresRechazarImplementadaPorVerificar() {
    return { EstadoSeguimientoIncidente: this.EstadoSeguimientoIncidente }

  }

  public setearValoresIniciarImplementacion() {
    this.EstadoSeguimientoIncidente = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosPlanAccion.EstadoPlanAccionEnProceso;
  }

  public setearValoresIniciarImplementacion2() {
    this.EstadoSeguimientoIncidente = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosPlanAccion.EstadoPlanAccionAnulado;
  }

  public GetearValoresIniciarImplementacion() {
    return { EstadoSeguimientoIncidente: this.EstadoSeguimientoIncidente }

  }

  public setearValoresAmpliarPlanAccion() {
    this.EstadoSeguimientoIncidente = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosPlanAccion.EstadoPlanAccionEnAmpliacion;
  }

  public GetValoresAmpliarPlanAccion() {
    return { EstadoSeguimientoIncidente: this.EstadoSeguimientoIncidente }

  }

  public setearValoresAprobarAmpliarPlanAccion(
    FechaCompromiso: Date,
  ) {
    this.FechaCompromiso = FechaCompromiso;
    this.EstadoSeguimientoIncidente = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosPlanAccion.EstadoPlanAccionEnProceso;
  }

  public GetValoresAprobarAmpliarPlanAccion() {
    return {
      EstadoSeguimientoIncidente: this.EstadoSeguimientoIncidente,
      FechaCompromiso: this.FechaCompromiso,
    }

  }

  public setearValoresRechazarAmpliarPlanAccion() {
    this.EstadoSeguimientoIncidente = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosPlanAccion.EstadoPlanAccionEnProceso;
  }

  public GetValoresRechazarAmpliarPlanAccion() {
    return { EstadoSeguimientoIncidente: this.EstadoSeguimientoIncidente }

  }


  public setearValoresFinalizarPlanAccion() {
    this.EstadoSeguimientoIncidente = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosPlanAccion.EstadoPlanAccionImplementada;
    this.FechaFinal = new Date(Date.now());
  }

  public GetValoresFinalizarPlanAccion() {
    return { EstadoSeguimientoIncidente: this.EstadoSeguimientoIncidente, FechaFinal: this.FechaFinal }

  }

  public setearValoresEliminarSeguimiento() {
    this.EstadoSeguimientoIncidente = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosPlanAccion.EstadoPlanAccionAnulado;
  }

  public GetearValoresEliminarSeguimiento() {
    return { EstadoSeguimientoIncidente: this.EstadoSeguimientoIncidente }

  }
}
