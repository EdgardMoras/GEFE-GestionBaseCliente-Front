import { RestFiltros } from "../../genericos/RestFiltros";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import EIncidente from "./EIncidente";
import Usuario from '../Base/Usuario';
import EArchivoIncidente from "src/models/logicas/EArchivoIncidencia";
// import EArchivo from "src/models/logicas/EArchivo";
import EAvanceImplementacionIncidente from './EAvanceImplementacionIncidente';
import { EBaseEntidad } from '../Base/EBaseEntidad';
import EElementoPeoplePicker from 'src/models/logicas/EElementoPeoplePicker';

export default class ETareaPlanAccion  {

  public static Campos = {
    Codigo: ParametrosNoAdministrables.ColumnaSitioTareaIncidenteSeguimiento.Codigo,
    Detalle: ParametrosNoAdministrables.ColumnaSitioTareaIncidenteSeguimiento.Detalle,
    FechaCompromiso: ParametrosNoAdministrables.ColumnaSitioTareaIncidenteSeguimiento.FechaCompromiso,
    FechaRegistro: ParametrosNoAdministrables.ColumnaSitioTareaIncidenteSeguimiento.FechaRegistro,
    EstadoTareaPlanAccion: ParametrosNoAdministrables.ColumnaSitioTareaIncidenteSeguimiento.EstadoTareaPlanAccion,
    ID: ParametrosNoAdministrables.ColumnaSitioTareaIncidenteSeguimiento.ID,
    FechaLimite:ParametrosNoAdministrables.ColumnaSitioTareaIncidenteSeguimiento.FechaLimite,
  };
  public static CamposExpand = {
    Incidente: ParametrosNoAdministrables.ColumnaSitioTareaIncidenteSeguimiento.Incidente,
    SeguimientoIncidente: ParametrosNoAdministrables.ColumnaSitioTareaIncidenteSeguimiento.SeguimientoIncidente,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnaSitioTareaIncidenteSeguimiento.UsuarioRegistro,
    ResponsableTarea: ParametrosNoAdministrables.ColumnaSitioTareaIncidenteSeguimiento.ResponsableTarea,
  };
  
  public Incidente: EIncidente;
  public SeguimientoIncidente: EBaseEntidad;
  public Detalle: string;
  public Codigo: string;
  public FechaRegistro: Date;
  public FechaCompromiso: Date;
  public EstadoTareaPlanAccion: string;
  public EstadoElemento: string;
  public UsuarioRegistro: Usuario;
  public ResponsableTarea: EElementoPeoplePicker[];
  public ListaArchivos: EArchivoIncidente[];

  public ResponsableTareaId: number;
  public UsuarioRegistroId: number;
  public IncidenteId:number;
  public SeguimientoIncidenteId:number;
  public EstadoElementoId:number;
  public Title:string;
  public ID: number;
  public esEditar: boolean;
  public esNuevoComentario: boolean;
  public esFinalizar:boolean;

  public RegistroComentario: EAvanceImplementacionIncidente;
  public RegistroComentariolista: EAvanceImplementacionIncidente[];
  public RegistroAtenderTarea: EAvanceImplementacionIncidente;

  public FechaLimite: Date;

 public constructor()
 {
  this.Incidente= new EIncidente;
  this.SeguimientoIncidente= new EBaseEntidad;
  this.Detalle="";
  this.Codigo="";
  this.FechaRegistro= new Date;
  this.FechaCompromiso= new Date;
  this.FechaLimite= new Date;
  this.EstadoTareaPlanAccion ="";
  this.EstadoElemento="";
  this.UsuarioRegistro= new Usuario;
  this.ResponsableTarea= [];
  this.ListaArchivos= [];

  this.ResponsableTareaId= 0;
  this.UsuarioRegistroId= 0;
  this.IncidenteId=0;
  this.SeguimientoIncidenteId=0;
  this.EstadoElementoId=0;
  this.Title= "";
  this.ID = 0;
  this.esEditar = false;
  this.esNuevoComentario=false;
  this.esFinalizar=false;

  this.RegistroComentario = new EAvanceImplementacionIncidente;
  this.RegistroComentariolista = [];
  this.RegistroAtenderTarea = new EAvanceImplementacionIncidente;


 }

  public setearValoresConRest(elementoItemLista: any): void {
    this.Incidente = RestFiltros.parsearLookup(
      elementoItemLista,
      ETareaPlanAccion.CamposExpand.Incidente,
      EIncidente
    );

    this.SeguimientoIncidente = RestFiltros.parsearLookup(
      elementoItemLista,
      ETareaPlanAccion.CamposExpand.SeguimientoIncidente,
      EBaseEntidad
    );

    this.UsuarioRegistro = RestFiltros.parsearUsuario(
      elementoItemLista,
      ETareaPlanAccion.CamposExpand.UsuarioRegistro
    );

    /*this.ResponsableTarea = RestFiltros.parsearUsuario(
      elementoItemLista,
      ETareaPlanAccion.CamposExpand.ResponsableTarea
    );*/

    this.ID = elementoItemLista.ID;
    this.Detalle = elementoItemLista.Detalle;
    this.FechaCompromiso = elementoItemLista.FechaCompromiso;
    this.FechaRegistro= elementoItemLista.FechaRegistro;
    this.FechaLimite= elementoItemLista.FechaLimite;
    this.EstadoTareaPlanAccion = elementoItemLista.EstadoTareaPlanAccion;
  }

  public setearValoresGuardar(
    UsuarioRegistroId: number,
     Codigo: string,
     Detalle: string,
     FechaCompromiso: Date,
     EstadoTareaPlanAccion: string,
     ResponsableTareaId: number,
     IncidenteId:number,
     SeguimientoIncidenteId: number,
  ) {
    this.UsuarioRegistroId = UsuarioRegistroId;
    this.FechaRegistro = new Date(Date.now());
    this.Codigo = Codigo;
    this.FechaCompromiso = FechaCompromiso;
    this.ResponsableTareaId = ResponsableTareaId;
    this.Detalle = Detalle;
    this.EstadoTareaPlanAccion = EstadoTareaPlanAccion;
    this.Title = Codigo;
    this.IncidenteId = IncidenteId;
    this.SeguimientoIncidenteId=SeguimientoIncidenteId;
  }
  public getValoresGuardar(){
    return{
      UsuarioRegistroId: this.UsuarioRegistroId,
      FechaRegistro: this.FechaRegistro,
      FechaCompromiso: this.FechaCompromiso,
      Codigo: this.Codigo,
      ResponsableTareaId: this.ResponsableTareaId,
      Detalle: this.Detalle,
      EstadoTareaPlanAccion: this.EstadoTareaPlanAccion,
      Title: this.Title,
      IncidenteId: this.IncidenteId,
      SeguimientoIncidenteId: this.SeguimientoIncidenteId,
    }

  }


  public setearValoresEditar(
     Detalle: string,
     FechaCompromiso: Date,
     ResponsableTareaId: number, 
  ) {
    this.FechaCompromiso = FechaCompromiso;
    this.ResponsableTareaId = ResponsableTareaId;
    this.Detalle = Detalle;
  }

  public getValoresEditar(){
    return{FechaCompromiso: this.FechaCompromiso,
      ResponsableTareaId: this.ResponsableTareaId,
      Detalle: this.Detalle
    }

  }


  public setearValoresAtenderTarea() {
   this.EstadoTareaPlanAccion = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosTareasPlanAccion.EstadoTareaPlanAccionFinalizado;
   this.FechaLimite = new Date(Date.now());   
 }

 public getValoresAtenderTarea(){
   return{
     EstadoTareaPlanAccion: this.EstadoTareaPlanAccion,
     FechaLimite: this.FechaLimite,
   }

 }



/*
  public setearValoresEliminar() {
    this.EstadoElemento = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosPlanAccion.EstadoPlanAccionAnulado;
  }

  public setearValoresIniciarImplementacion() {
      this.EstadoSeguimientoIncidente = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosPlanAccion.EstadoPlanAccionEnProceso;
    }

    public GetearValoresIniciarImplementacion(){
      return{EstadoSeguimientoIncidente: this.EstadoSeguimientoIncidente}

    }

    public setearValoresAmpliarPlanAccion() {
      this.EstadoSeguimientoIncidente = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosPlanAccion.EstadoPlanAccionEnAmpliacion;
    }

    public GetValoresAmpliarPlanAccion(){
      return{EstadoSeguimientoIncidente: this.EstadoSeguimientoIncidente}

    }

    public setearValoresAprobarAmpliarPlanAccion(
      FechaCompromiso: Date,
    ) {
      this.FechaCompromiso = FechaCompromiso;
      this.EstadoSeguimientoIncidente = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosPlanAccion.EstadoPlanAccionEnProceso;
    }

    public GetValoresAprobarAmpliarPlanAccion(){
      return{EstadoSeguimientoIncidente: this.EstadoSeguimientoIncidente,
      FechaCompromiso: this.FechaCompromiso,
      }

    }

    public setearValoresRechazarAmpliarPlanAccion() {
      this.EstadoSeguimientoIncidente = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosPlanAccion.EstadoPlanAccionEnProceso;
    }

    public GetValoresRechazarAmpliarPlanAccion(){
      return{EstadoSeguimientoIncidente: this.EstadoSeguimientoIncidente}

    }


    public setearValoresFinalizarPlanAccion() {
      this.EstadoSeguimientoIncidente = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosPlanAccion.EstadoPlanAccionImplementada;
    }

    public GetValoresFinalizarPlanAccion(){
      return{EstadoSeguimientoIncidente: this.EstadoSeguimientoIncidente}

    }

    public setearValoresEliminarSeguimiento() {
      this.EstadoSeguimientoIncidente = ParametrosNoAdministrables.ModuloIncidentes.ValoresEstadosPlanAccion.EstadoPlanAccionAnulado;
    }

    public GetearValoresEliminarSeguimiento(){
      return{EstadoSeguimientoIncidente: this.EstadoSeguimientoIncidente}

    }*/
}
