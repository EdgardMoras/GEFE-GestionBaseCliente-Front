// import { EBaseEntidadTransaccional } from "../Base/EBaseEntidadTransaccional";
import { RestFiltros } from "../../genericos/RestFiltros";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
// import EIncidente from "./EIncidente";
import ESeguimientoIncidente from "./ESeguimientoIncidente";
import Usuario from '../Base/Usuario';
import EArchivoIncidente from "src/models/logicas/EArchivoIncidencia";
import { EBaseEntidad } from '../Base/EBaseEntidad';

export default class EAmpliacionPlanAccionIncidente  {

  public static Campos = {
    ID: ParametrosNoAdministrables.ColumnaSitioHistorialAmpliacionPlanAccionIncidente.ID,
    FechaRegistro: ParametrosNoAdministrables.ColumnaSitioHistorialAmpliacionPlanAccionIncidente.FechaRegistro,
    CargoEnvioSolicitudIncidente: ParametrosNoAdministrables.ColumnaSitioHistorialAmpliacionPlanAccionIncidente.CargoEnvioSolicitudIncidente,
    ComentarioSolicitudIncidente: ParametrosNoAdministrables.ColumnaSitioHistorialAmpliacionPlanAccionIncidente.ComentarioSolicitudIncidente,
    EstadoSolicitudIncidente: ParametrosNoAdministrables.ColumnaSitioHistorialAmpliacionPlanAccionIncidente.EstadoSolicitudIncidente,
    FechaPlazoActualIncidente: ParametrosNoAdministrables.ColumnaSitioHistorialAmpliacionPlanAccionIncidente.FechaPlazoActualIncidente,
    FechaPlazoSolicitadoIncidente: ParametrosNoAdministrables.ColumnaSitioHistorialAmpliacionPlanAccionIncidente.FechaPlazoSolicitadoIncidente,
    
  };
  public static CamposExpand = {
    SeguimientoIncidente: ParametrosNoAdministrables.ColumnaSitioHistorialAmpliacionPlanAccionIncidente.SeguimientoIncidente,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnaSitioHistorialAmpliacionPlanAccionIncidente.UsuarioRegistro,
    Incidente: ParametrosNoAdministrables.ColumnaSitioHistorialAmpliacionPlanAccionIncidente.Incidente,
  };
  

  public ID: number;
  public UsuarioRegistro: Usuario;
  public UsuarioRegistroId: number;
  public FechaRegistro: Date;
  public SeguimientoIncidente: EBaseEntidad;
  public SeguimientoIncidenteId: number;
  public ListaArchivos: EArchivoIncidente[];
  public CargoEnvioSolicitudIncidente: string;
  public ComentarioSolicitudIncidente: string;
  public EstadoSolicitudIncidente: string;
  public FechaPlazoActualIncidente: Date | null;
  public FechaPlazoSolicitadoIncidente: Date | null;
  public Incidente : EBaseEntidad;
  public IncidenteId: number;
 

  public constructor(){
    this.ID= 0;
    this.UsuarioRegistro = new Usuario;
    this.UsuarioRegistroId= 0;
    this.SeguimientoIncidente= new EBaseEntidad;
    this.FechaRegistro=  new Date(Date.now());
    this.SeguimientoIncidenteId=0;
    this.ListaArchivos=[];
    this.CargoEnvioSolicitudIncidente="";
    this.ComentarioSolicitudIncidente="";
    this.EstadoSolicitudIncidente="";
    this.FechaPlazoActualIncidente= new Date(Date.now());
    this.FechaPlazoSolicitadoIncidente = new Date(Date.now());
    this.Incidente = new EBaseEntidad;
    this.IncidenteId= 0;
  }
  
  

  public setearValoresConRest(elementoItemLista: any): void {

    this.ID = elementoItemLista.ID;

    this.UsuarioRegistro = RestFiltros.parsearUsuario(
      elementoItemLista,
      ESeguimientoIncidente.CamposExpand.UsuarioRegistro
    );


    this.SeguimientoIncidente = RestFiltros.parsearLookup(
      elementoItemLista,
      EAmpliacionPlanAccionIncidente.CamposExpand.SeguimientoIncidente,
      EBaseEntidad
    );

    this.Incidente = RestFiltros.parsearLookup(
      elementoItemLista,
      EAmpliacionPlanAccionIncidente.CamposExpand.Incidente,
      EBaseEntidad
    );

    this.FechaRegistro= elementoItemLista.FechaRegistro;


    this.CargoEnvioSolicitudIncidente = RestFiltros.parsearTexto(
      elementoItemLista,
      EAmpliacionPlanAccionIncidente.Campos.CargoEnvioSolicitudIncidente,
    );

    this.ComentarioSolicitudIncidente = RestFiltros.parsearTexto(
      elementoItemLista,
      EAmpliacionPlanAccionIncidente.Campos.ComentarioSolicitudIncidente,
    );

    this.EstadoSolicitudIncidente = RestFiltros.parsearTexto(
      elementoItemLista,
      EAmpliacionPlanAccionIncidente.Campos.EstadoSolicitudIncidente,
    );

    this.FechaPlazoActualIncidente= elementoItemLista.FechaPlazoActualIncidente;
    this.FechaPlazoSolicitadoIncidente= elementoItemLista.FechaPlazoSolicitadoIncidente;
 

   
  }

  public setearValoresGuardar(
     UsuarioRegistroId: number,
     CargoEnvioSolicitudIncidente: string,
     ComentarioSolicitudIncidente: string,
     FechaPlazoActualIncidente : Date,
     FechaPlazoSolicitadoIncidente: Date,
     SeguimientoIncidenteId:number,
     IncidenteId:number,
     
  ) {
    this.UsuarioRegistroId = UsuarioRegistroId;
    this.FechaRegistro = new Date(Date.now());
    this.CargoEnvioSolicitudIncidente = CargoEnvioSolicitudIncidente;
    this.ComentarioSolicitudIncidente = ComentarioSolicitudIncidente;
    this.FechaPlazoActualIncidente = FechaPlazoActualIncidente;
    this.FechaPlazoSolicitadoIncidente = FechaPlazoSolicitadoIncidente;
    this.SeguimientoIncidenteId = SeguimientoIncidenteId;
    this.EstadoSolicitudIncidente = "Por Validar";
    this.IncidenteId = IncidenteId;
  }

  public geteValoresGuardar() {
   return {
 
    FechaRegistro: this.FechaRegistro,
    UsuarioRegistroId: this.UsuarioRegistroId,
    CargoEnvioSolicitudIncidente: this.CargoEnvioSolicitudIncidente,
    ComentarioSolicitudIncidente: this.ComentarioSolicitudIncidente,
    FechaPlazoActualIncidente: this.FechaPlazoActualIncidente,
    FechaPlazoSolicitadoIncidente: this.FechaPlazoSolicitadoIncidente,
    EstadoSolicitudIncidente: this.EstadoSolicitudIncidente,
    SeguimientoIncidenteId: this.SeguimientoIncidenteId,
    IncidenteId: this.IncidenteId,
   }
 }


 
 public setearValoresAprobar() {
 this.EstadoSolicitudIncidente = "Aprobado";
}

public geteValoresAprobar() {
return {
 EstadoSolicitudIncidente: this.EstadoSolicitudIncidente,
}
}

public setearValoresRechazar() {
  this.EstadoSolicitudIncidente = "Rechazado";
 }
 
 public geteValoresRechazar() {
 return {
  EstadoSolicitudIncidente: this.EstadoSolicitudIncidente,
 }
 }



}
