import { EBaseEntidadTransaccional } from "../Base/EBaseEntidadTransaccional";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import Funciones from '../../genericos/Funciones';
import { Deferred } from 'ts-deferred';
import { RestFiltros } from "src/genericos/RestFiltros";
import EAmpliacionPlanAccionIncidente from './EAmpliacionPlanAccionIncidente';
import ESeguimientoIncidente from './ESeguimientoIncidente';
import EAvanceImplementacionIncidente from './EAvanceImplementacionIncidente';
import EArchivoIncidente from "src/models/logicas/EArchivoIncidencia";

export default class EAvanceImplementacionIncidenteLista extends EBaseEntidadTransaccional {



public static obtenerFiltroPorIdVencimientoYPorIdPlanAccionYEstadoActivo(IdVencimiento: number,idPlanAccion: number): string {
    const valorFilter = `${EAmpliacionPlanAccionIncidente.CamposExpand.Incidente}/ID eq '${IdVencimiento}' and ${EAmpliacionPlanAccionIncidente.CamposExpand.SeguimientoIncidente}/ID eq '${idPlanAccion}'`;
    return valorFilter;
}

public static obtenerFiltroPorIdVencimientoYPorIdPlanAccionYEstadoActivoTarea(IdVencimiento: number,idPlanAccion: number,idTareaPlanAccion:number): string {
  const valorFilter = `(${EAmpliacionPlanAccionIncidente.CamposExpand.Incidente}/ID eq '${IdVencimiento}' and ${EAmpliacionPlanAccionIncidente.CamposExpand.SeguimientoIncidente}/ID eq '${idPlanAccion}' and ${EAvanceImplementacionIncidente.CamposExpand.TareasPlanAccion}/ID eq '${idTareaPlanAccion}' and ${EAvanceImplementacionIncidente.Campos.TipoComentario} eq 'ComentarioTarea') or (${EAmpliacionPlanAccionIncidente.CamposExpand.Incidente}/ID eq '${IdVencimiento}' and ${EAmpliacionPlanAccionIncidente.CamposExpand.SeguimientoIncidente}/ID eq '${idPlanAccion}' and ${EAvanceImplementacionIncidente.CamposExpand.TareasPlanAccion}/ID eq '${idTareaPlanAccion}' and ${EAvanceImplementacionIncidente.Campos.TipoComentario} eq 'FinalizarTarea')`;
  return valorFilter;
}

public static getListaComentarios(IdVencimiento: number,idPlanAccion: number) {
  const listaFieldsSelect = Funciones.obtenerListaCampos(EAvanceImplementacionIncidente.Campos);
  const listaCamposExpand = Funciones.obtenerListaCampos(
    EAvanceImplementacionIncidente.CamposExpand
  );

  const listaFieldsExpand = [
    RestFiltros.obtenerFieldExpandUsuario(
      EAvanceImplementacionIncidente.CamposExpand.UsuarioRegistro
    ),
    RestFiltros.obtenerFieldExpandLookup(EAvanceImplementacionIncidente.CamposExpand.Incidente),
    RestFiltros.obtenerFieldExpandLookup(EAvanceImplementacionIncidente.CamposExpand.SeguimientoIncidente),
    RestFiltros.obtenerFieldExpandLookup(EAvanceImplementacionIncidente.CamposExpand.TareasPlanAccion),

  ];

  const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
    listaFieldsExpand
  );

  const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterOrderByFechaRegistro,
      ParametrosNoAdministrables.Listas.RegistroAvanceImplementacionIncidente,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      this.obtenerFiltroPorIdVencimientoYPorIdPlanAccionYEstadoActivo(IdVencimiento,idPlanAccion)
  );
  return endPoint;
}

public static getListaComentariosTarea(IdVencimiento: number,idPlanAccion: number,idTareaPlanAccion:number) {
  const listaFieldsSelect = Funciones.obtenerListaCampos(EAvanceImplementacionIncidente.Campos);
  const listaCamposExpand = Funciones.obtenerListaCampos(
    EAvanceImplementacionIncidente.CamposExpand
  );

  const listaFieldsExpand = [
    RestFiltros.obtenerFieldExpandUsuario(
      EAvanceImplementacionIncidente.CamposExpand.UsuarioRegistro
    ),
    RestFiltros.obtenerFieldExpandLookup(EAvanceImplementacionIncidente.CamposExpand.Incidente),
    RestFiltros.obtenerFieldExpandLookup(EAvanceImplementacionIncidente.CamposExpand.SeguimientoIncidente),
    RestFiltros.obtenerFieldExpandLookup(EAvanceImplementacionIncidente.CamposExpand.TareasPlanAccion),

  ];

  const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
    listaFieldsExpand
  );

  const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter,
      ParametrosNoAdministrables.Listas.RegistroAvanceImplementacionIncidente,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      this.obtenerFiltroPorIdVencimientoYPorIdPlanAccionYEstadoActivoTarea(IdVencimiento,idPlanAccion,idTareaPlanAccion)
  );
  return endPoint;
}


public async obtenerArchivos(
  nombreCarpeta: string,
  FolderPader:string,
  item: ESeguimientoIncidente,
  i:number
): Promise<EArchivoIncidente[]> {
  const dfd: Deferred<EArchivoIncidente[]> = new Deferred<
  EArchivoIncidente[]
    >();

  Funciones.ObtenerFiles(
    ParametrosNoAdministrables.Bibliotecas.ArchivosIncidente+"/"+FolderPader,
    nombreCarpeta
  )
    .then(result => {
      const listaArchivos: EArchivoIncidente[] = [];
      for (const file of result.Files) {
        const archivo: EArchivoIncidente = new EArchivoIncidente();
        archivo.setValores(
          file.ListItemAllFields.ID,
          file.ListItemAllFields.Title,
          file.ServerRelativeUrl,
          file.length
        );

        listaArchivos.push(archivo);
      }

      item.RegistroComentariolista[i].ListaArchivos = listaArchivos;
      dfd.resolve(listaArchivos);
    })
    .catch(error => {
      dfd.reject(error);
    });

  return dfd.promise;
}


public async obtenerArchivosTarea(
  nombreCarpeta: string,
  FolderPader:string,
  item: ESeguimientoIncidente,
  i:number
): Promise<EArchivoIncidente[]> {
  const dfd: Deferred<EArchivoIncidente[]> = new Deferred<
  EArchivoIncidente[]
    >();

  Funciones.ObtenerFiles(
    ParametrosNoAdministrables.Bibliotecas.ArchivosIncidente+"/"+FolderPader,
    nombreCarpeta
  )
    .then(result => {
      const listaArchivos: EArchivoIncidente[] = [];
      item.RegistroComentariolista[i].ListaArchivos = [];
      for (const file of result.Files) {
        const archivo: EArchivoIncidente = new EArchivoIncidente();
        archivo.setValores(
          file.ListItemAllFields.ID,
          file.ListItemAllFields.Title,
          file.ServerRelativeUrl,
          file.length
        );

        listaArchivos.push(archivo);
      }
      
      item.RegistroComentariolista[i].ListaArchivos = listaArchivos;
      dfd.resolve(listaArchivos);
    })
    .catch(error => {
      dfd.reject(error);
    });

  return dfd.promise;
}






  public ObtenerListaComentarios(IdVencimiento: number,idPlanAccion:number): Promise<EAvanceImplementacionIncidente[]> {
    const dfd: Deferred<EAvanceImplementacionIncidente[]> = new Deferred<EAvanceImplementacionIncidente[]>();

  //  const eAvanceImplementacionIncidenteLista = new EAvanceImplementacionIncidenteLista();
    

    const endPoint = EAvanceImplementacionIncidenteLista.getListaComentarios(IdVencimiento,idPlanAccion);

    Funciones.ObtenerElementoPorRest(endPoint)
    .then((resultado) => {
      const Result = (resultado as EAvanceImplementacionIncidente[]);

      dfd.resolve(Result);
    })
    .catch(error => {
        dfd.reject(error);
    });



    return dfd.promise;
  }


  public ObtenerListaComentariosTareas(IdVencimiento: number,idPlanAccion:number,idTareaPlanAccion:number,item: ESeguimientoIncidente): Promise<EAvanceImplementacionIncidente[]> {
    const dfd: Deferred<EAvanceImplementacionIncidente[]> = new Deferred<EAvanceImplementacionIncidente[]>();

    const eAvanceImplementacionIncidenteLista = new EAvanceImplementacionIncidenteLista();

    const endPoint = EAvanceImplementacionIncidenteLista.getListaComentariosTarea(IdVencimiento,idPlanAccion,idTareaPlanAccion);

    Funciones.ObtenerElementoPorRest(endPoint)
    .then((resultado) => {
      const Result = (resultado as EAvanceImplementacionIncidente[]);

      item.RegistroComentariolista = Result;

      Result.forEach((element,i) => {
        
        const promesasObtenerArchivos: any = [];
        promesasObtenerArchivos.push(eAvanceImplementacionIncidenteLista.obtenerArchivosTarea(element.Codigo,IdVencimiento.toString()+"/"+element.SeguimientoIncidente.Title+"/"+element.Codigo, item,i));
      });

      dfd.resolve(Result);
    })
    .catch(error => {
        dfd.reject(error);
    });



    return dfd.promise;
  }



  
}
