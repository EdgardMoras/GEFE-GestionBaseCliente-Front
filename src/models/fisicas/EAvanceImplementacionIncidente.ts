// import { EBaseEntidadTransaccional } from "../Base/EBaseEntidadTransaccional";
import { RestFiltros } from "../../genericos/RestFiltros";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import EIncidente from "./EIncidente";
import ESeguimientoIncidente from "./ESeguimientoIncidente";
import Usuario from '../Base/Usuario';
// import EArchivoIncidencia from "src/models/logicas/EArchivoIncidencia";
import EArchivo from "src/models/logicas/EArchivo";
import { EBaseEntidad } from '../Base/EBaseEntidad';
// import { BlockOverflowProperty } from 'csstype';
export default class EAvanceImplementacionIncidente  {


  // public static NombreLista: string = ParametrosNoAdministrables.Listas.SeguimientoIncidente;
  public static Campos = {
    Codigo: ParametrosNoAdministrables.ColumnaSitioIncidenteAvanceImplementacion.Codigo,
    DetalleImplementacion: ParametrosNoAdministrables.ColumnaSitioIncidenteAvanceImplementacion.DetalleImplementacion,
    FechaRegistro: ParametrosNoAdministrables.ColumnaSitioIncidenteAvanceImplementacion.FechaRegistro,
    ProponerCierre: ParametrosNoAdministrables.ColumnaSitioIncidenteAvanceImplementacion.ProponerCierre,
    TipoComentario:ParametrosNoAdministrables.ColumnaSitioIncidenteAvanceImplementacion.TipoComentario,
    ID: ParametrosNoAdministrables.ColumnaSitioIncidenteAvanceImplementacion.ID,
  };
  public static CamposExpand = {
    Incidente: ParametrosNoAdministrables.ColumnaSitioIncidenteAvanceImplementacion.Incidente,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnaSitioIncidenteAvanceImplementacion.UsuarioRegistro,
    SeguimientoIncidente: ParametrosNoAdministrables.ColumnaSitioIncidenteAvanceImplementacion.SeguimientoIncidente,
    TareasPlanAccion: ParametrosNoAdministrables.ColumnaSitioIncidenteAvanceImplementacion.TareasPlanAccion,
  };
  
  public Incidente: EIncidente;
  public DetalleImplementacion: string;
  public Codigo: string;
  public ProponerCierre: boolean;
  public TipoComentario: string;
  public ListaArchivos: EArchivo[];
  public ID: number;
  public UsuarioRegistro: Usuario;
  public UsuarioRegistroId: number;
  public SeguimientoIncidente: EBaseEntidad;
  public FechaRegistro: Date;
  public SeguimientoIncidenteId: number;
  public IncidenteId:number;
  public Title:string;
  public TareasPlanAccion: EBaseEntidad;
  public TareasPlanAccionId:number;
  

  public constructor(){
    this.Incidente=new EIncidente;
    this.DetalleImplementacion = "";
    this.Codigo= "";
    this.ProponerCierre = false;
    this.TipoComentario = "";
    this.ID= 0;
    this.UsuarioRegistro = new Usuario;
    this.UsuarioRegistroId= 0;
    this.SeguimientoIncidente= new EBaseEntidad;
    this.FechaRegistro=  new Date(Date.now());
    this.SeguimientoIncidenteId=0;
    this.IncidenteId=0;
    this.Title="";
    this.ListaArchivos=[];
    this.TareasPlanAccion = new EBaseEntidad;
    this.TareasPlanAccionId=0;
  }
  
  

  public setearValoresConRest(elementoItemLista: any): void {
    this.Incidente = RestFiltros.parsearLookup(
      elementoItemLista,
      EAvanceImplementacionIncidente.CamposExpand.Incidente,
      EIncidente
    );

    this.TareasPlanAccion = RestFiltros.parsearLookup(
      elementoItemLista,
      EAvanceImplementacionIncidente.CamposExpand.TareasPlanAccion,
      EBaseEntidad
    );

    this.DetalleImplementacion = RestFiltros.parsearTexto(
      elementoItemLista,
      EAvanceImplementacionIncidente.Campos.DetalleImplementacion,
    );

    this.Codigo = RestFiltros.parsearTexto(
      elementoItemLista,
      EAvanceImplementacionIncidente.Campos.Codigo,
    );
    this.FechaRegistro= elementoItemLista.FechaRegistro;

    this.ProponerCierre = RestFiltros.parsearBooleano(
      elementoItemLista,
      EAvanceImplementacionIncidente.Campos.ProponerCierre,
    );

    this.TipoComentario = RestFiltros.parsearTexto(
      elementoItemLista,
      EAvanceImplementacionIncidente.Campos.TipoComentario,
    );

    this.ID = elementoItemLista.ID;

    this.UsuarioRegistro = RestFiltros.parsearUsuario(
      elementoItemLista,
      ESeguimientoIncidente.CamposExpand.UsuarioRegistro
    );


    this.SeguimientoIncidente = RestFiltros.parsearLookup(
      elementoItemLista,
      EAvanceImplementacionIncidente.CamposExpand.SeguimientoIncidente,
      EBaseEntidad
    );
  }

  public setearValoresGuardar(
     UsuarioRegistroId: number,
     Codigo: string,
     Detalle: string,
     ProponerCierre : boolean,
     SeguimientoIncidenteId: number,
     IncidenteId:number,
     
  ) {
    this.UsuarioRegistroId = UsuarioRegistroId;
    this.FechaRegistro = new Date(Date.now());
    this.Codigo = Codigo;
    this.DetalleImplementacion = Detalle;
    this.ProponerCierre = ProponerCierre;
    this.TipoComentario = "AvanceImplementacion";
    this.SeguimientoIncidenteId = SeguimientoIncidenteId;
    this.Title = Codigo;
    this.IncidenteId = IncidenteId;

  
  }

  public geteValoresGuardar() {
   return {
 
    FechaRegistro: this.FechaRegistro,
    UsuarioRegistroId: this.UsuarioRegistroId,
    Codigo: this.Codigo,
    DetalleImplementacion :this.DetalleImplementacion,
    ProponerCierre:  this.ProponerCierre,
    TipoComentario: "AvanceImplementacion",
    SeguimientoIncidenteId: this.SeguimientoIncidenteId,
    Title: this.Codigo,
    IncidenteId : this.IncidenteId,
   }

  }


  public setearValoresAprobarImplementadaPorVerificar(
    UsuarioRegistroId: number,
    Codigo: string,
    Detalle: string,
    ProponerCierre : boolean,
    SeguimientoIncidenteId: number,
    IncidenteId:number,
    
 ) {
   this.UsuarioRegistroId = UsuarioRegistroId;
   this.FechaRegistro = new Date(Date.now());
   this.Codigo = Codigo;
   this.DetalleImplementacion = Detalle;
   this.ProponerCierre = ProponerCierre;
   this.TipoComentario = "AprobarImplementacion";
   this.SeguimientoIncidenteId = SeguimientoIncidenteId;
   this.Title = Codigo;
   this.IncidenteId = IncidenteId;

 
 }

 public geteValoresAprobarImplementadaPorVerificar() {
  return {

   FechaRegistro: this.FechaRegistro,
   UsuarioRegistroId: this.UsuarioRegistroId,
   Codigo: this.Codigo,
   DetalleImplementacion :this.DetalleImplementacion,
   ProponerCierre:  this.ProponerCierre,
   TipoComentario: this.TipoComentario,
   SeguimientoIncidenteId: this.SeguimientoIncidenteId,
   Title: this.Codigo,
   IncidenteId : this.IncidenteId,
  }

 }

 public setearValoresRechazarImplementadaPorVerificar(
  UsuarioRegistroId: number,
  Codigo: string,
  Detalle: string,
  ProponerCierre : boolean,
  SeguimientoIncidenteId: number,
  IncidenteId:number,
  
) {
 this.UsuarioRegistroId = UsuarioRegistroId;
 this.FechaRegistro = new Date(Date.now());
 this.Codigo = Codigo;
 this.DetalleImplementacion = Detalle;
 this.ProponerCierre = ProponerCierre;
 this.TipoComentario = "RechazarImplementacion";
 this.SeguimientoIncidenteId = SeguimientoIncidenteId;
 this.Title = Codigo;
 this.IncidenteId = IncidenteId;


}

public geteValoresRechazarImplementadaPorVerificar() {
return {

 FechaRegistro: this.FechaRegistro,
 UsuarioRegistroId: this.UsuarioRegistroId,
 Codigo: this.Codigo,
 DetalleImplementacion :this.DetalleImplementacion,
 ProponerCierre:  this.ProponerCierre,
 TipoComentario: this.TipoComentario,
 SeguimientoIncidenteId: this.SeguimientoIncidenteId,
 Title: this.Codigo,
 IncidenteId : this.IncidenteId,
}

}



  public setearValoresGuardarFinalizarPlanAccion(
    UsuarioRegistroId: number,
    Codigo: string,
    Detalle: string,
    SeguimientoIncidenteId: number,
    IncidenteId:number,
    
 ) {
   this.UsuarioRegistroId = UsuarioRegistroId;
   this.FechaRegistro = new Date(Date.now());
   this.Codigo = Codigo;
   this.DetalleImplementacion = Detalle;
   this.TipoComentario = "FinalizarPlanAccion";
   this.SeguimientoIncidenteId = SeguimientoIncidenteId;
   this.Title = Codigo;
   this.IncidenteId = IncidenteId;

 
 }




 



 public geteValoresGuardarFinalizarPlanAccion() {
  return {

   FechaRegistro: this.FechaRegistro,
   UsuarioRegistroId: this.UsuarioRegistroId,
   Codigo: this.Codigo,
   DetalleImplementacion :this.DetalleImplementacion,
   ProponerCierre:  this.ProponerCierre,
   TipoComentario: "FinalizarPlanAccion",
   SeguimientoIncidenteId: this.SeguimientoIncidenteId,
   Title: this.Codigo,
   IncidenteId : this.IncidenteId,
  }
}





public setearValoresGuardarComentario(
  UsuarioRegistroId: number,
  Codigo: string,
  Detalle: string,
  SeguimientoIncidenteId: number,
  IncidenteId:number,
  
) {
 this.UsuarioRegistroId = UsuarioRegistroId;
 this.FechaRegistro = new Date(Date.now());
 this.Codigo = Codigo;
 this.DetalleImplementacion = Detalle;
 this.TipoComentario = "Comentario";
 this.SeguimientoIncidenteId = SeguimientoIncidenteId;
 this.Title = Codigo;
 this.IncidenteId = IncidenteId;


}

public geteValoresGuardarComentario() {
  return {
  
   FechaRegistro: this.FechaRegistro,
   UsuarioRegistroId: this.UsuarioRegistroId,
   Codigo: this.Codigo,
   DetalleImplementacion :this.DetalleImplementacion,
   ProponerCierre:  this.ProponerCierre,
   TipoComentario: "Comentario",
   SeguimientoIncidenteId: this.SeguimientoIncidenteId,
   Title: this.Codigo,
   IncidenteId : this.IncidenteId,
  }
  }


public setearValoresGuardarComentarioTarea(
  UsuarioRegistroId: number,
  Codigo: string,
  Detalle: string,
  SeguimientoIncidenteId: number,
  IncidenteId:number,
  TareaPlanAccionId:number
  
) {
    this.UsuarioRegistroId = UsuarioRegistroId;
    this.FechaRegistro = new Date(Date.now());
    this.Codigo = Codigo;
    this.DetalleImplementacion = Detalle;
    this.TipoComentario = "ComentarioTarea";
    this.SeguimientoIncidenteId = SeguimientoIncidenteId;
    this.Title = Codigo;
    this.IncidenteId = IncidenteId;
    this.TareasPlanAccionId = TareaPlanAccionId;
}


public geteValoresGuardarComentarioTarea() {
      return {
      FechaRegistro: this.FechaRegistro,
      UsuarioRegistroId: this.UsuarioRegistroId,
      Codigo: this.Codigo,
      DetalleImplementacion :this.DetalleImplementacion,
      ProponerCierre:  this.ProponerCierre,
      TipoComentario: "ComentarioTarea",
      SeguimientoIncidenteId: this.SeguimientoIncidenteId,
      Title: this.Codigo,
      IncidenteId : this.IncidenteId,
      TareasPlanAccionId : this.TareasPlanAccionId,
      }
  }


  public setearValoresGuardarAtenderTarea(
    UsuarioRegistroId: number,
    Codigo: string,
    Detalle: string,
    SeguimientoIncidenteId: number,
    IncidenteId:number,
    TareaPlanAccionId:number
    
  ) {
      this.UsuarioRegistroId = UsuarioRegistroId;
      this.FechaRegistro = new Date(Date.now());
      this.Codigo = Codigo;
      this.DetalleImplementacion = Detalle;
      this.TipoComentario = "FinalizarTarea";
      this.SeguimientoIncidenteId = SeguimientoIncidenteId;
      this.Title = Codigo;
      this.IncidenteId = IncidenteId;
      this.TareasPlanAccionId = TareaPlanAccionId;
  }
  
  
  public geteValoresGuardarAtenderTarea() {
        return {
        FechaRegistro: this.FechaRegistro,
        UsuarioRegistroId: this.UsuarioRegistroId,
        Codigo: this.Codigo,
        DetalleImplementacion :this.DetalleImplementacion,
        ProponerCierre:  this.ProponerCierre,
        TipoComentario: this.TipoComentario,
        SeguimientoIncidenteId: this.SeguimientoIncidenteId,
        Title: this.Codigo,
        IncidenteId : this.IncidenteId,
        TareasPlanAccionId : this.TareasPlanAccionId,
        }
    }




public setearValoresGuardarAnularPA(
  UsuarioRegistroId: number,
  Codigo: string,
  Detalle: string,
  SeguimientoIncidenteId: number,
  IncidenteId:number,
  
) {
 this.UsuarioRegistroId = UsuarioRegistroId;
 this.FechaRegistro = new Date(Date.now());
 this.Codigo = Codigo;
 this.DetalleImplementacion = Detalle;
 this.TipoComentario = "Comentario";
 this.SeguimientoIncidenteId = SeguimientoIncidenteId;
 this.Title = Codigo;
 this.IncidenteId = IncidenteId;


}



public geteValoresGuardarAnularPA() {
return {

 FechaRegistro: this.FechaRegistro,
 UsuarioRegistroId: this.UsuarioRegistroId,
 Codigo: this.Codigo,
 DetalleImplementacion :this.DetalleImplementacion,
 ProponerCierre:  this.ProponerCierre,
 TipoComentario: "Comentario",
 SeguimientoIncidenteId: this.SeguimientoIncidenteId,
 Title: this.Codigo,
 IncidenteId : this.IncidenteId,
}
}

 



}
