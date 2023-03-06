import { EBaseEntidadTransaccional } from "../Base/EBaseEntidadTransaccional";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import Funciones from '../../genericos/Funciones';
import { Deferred } from 'ts-deferred';
import { RestFiltros } from "src/genericos/RestFiltros";
import ESeguimientoIncidente from './ESeguimientoIncidente';
import EArchivoIncidente from "src/models/logicas/EArchivoIncidencia";
import ETareaPlanAccion from "src/models/fisicas/ETareaPlanAccion";
/*import EAvanceImplementacionIncidente from './EAvanceImplementacionIncidente';
import EAvanceImplementacionIncidenteLista from 'src/models/fisicas/EAvanceImplementacionIncidenteLista';*/
export default class ETareaPlanAccionLista extends EBaseEntidadTransaccional {



  public obtenerFiltroPorIdVencimientoYPorIdPlanAccionYEstadoActivo(IdVencimiento: number, idPlanAccion: number): string {
    const valorFilter = `${ETareaPlanAccion.CamposExpand.Incidente}/ID eq '${IdVencimiento}' and SeguimientoIncidente/ID eq '${idPlanAccion}'`;
    return valorFilter;
  }

  public getListaTareas(IdVencimiento: number, idPlanAccion: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ETareaPlanAccion.Campos);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      ETareaPlanAccion.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ETareaPlanAccion.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandUsuario(
        ETareaPlanAccion.CamposExpand.ResponsableTarea
      ),
      RestFiltros.obtenerFieldExpandLookup(ETareaPlanAccion.CamposExpand.Incidente),
      RestFiltros.obtenerFieldExpandLookup(ETareaPlanAccion.CamposExpand.SeguimientoIncidente),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterOrderByFechaRegistro,
      ParametrosNoAdministrables.Listas.RegistroTareasPlanAccionIncidente,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      this.obtenerFiltroPorIdVencimientoYPorIdPlanAccionYEstadoActivo(IdVencimiento, idPlanAccion)
    );
    return endPoint;
  }


  public async obtenerArchivos(
    nombreCarpeta: string,
    FolderPader: string,
    item: ESeguimientoIncidente,
    i: number
  ): Promise<EArchivoIncidente[]> {
    const dfd: Deferred<EArchivoIncidente[]> = new Deferred<
      EArchivoIncidente[]
    >();

    Funciones.ObtenerFiles(
      ParametrosNoAdministrables.Bibliotecas.ArchivosIncidente + "/" + FolderPader,
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
            file.length,
          );

          listaArchivos.push(archivo);
        }

        item.RegistroNuevaTarealista[i].ListaArchivos = listaArchivos;
        dfd.resolve(listaArchivos);
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }



  public ObtenerListaTareas(IdVencimiento: number, idPlanAccion: number): Promise<ETareaPlanAccion[]> {
    const dfd: Deferred<ETareaPlanAccion[]> = new Deferred<ETareaPlanAccion[]>();

    const eTareaPlanAccionL = new ETareaPlanAccionLista();
    // const eAvanceImplementacionIncidenteLista = new EAvanceImplementacionIncidenteLista();

    const endPoint = eTareaPlanAccionL.getListaTareas(IdVencimiento, idPlanAccion);

    Funciones.ObtenerElementoPorRest(endPoint)
      .then((resultado) => {
        const Result = (resultado as ETareaPlanAccion[]);

        /*  Result.forEach((element,i) => {
      
       const promesasObtenerArchivos: any = [];
       // promesasObtenerArchivos.push(eTareaPlanAccionL.obtenerArchivos(element.Codigo,IdVencimiento.toString()+"/"+element.SeguimientoIncidente.Title, item,i));
        promesasObtenerArchivos.push(eAvanceImplementacionIncidenteLista.ObtenerListaComentariosTareas(item.Incidente.ID, item.ID,element.IncidenteId, item))
        element.RegistroComentario = new EAvanceImplementacionIncidente();
        element.RegistroComentariolista =  [];
        
        

    });*/


        dfd.resolve(Result);
      })
      .catch(error => {
        dfd.reject(error);
      });



    return dfd.promise;
  }



}
