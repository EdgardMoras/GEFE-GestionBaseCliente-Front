import { EBaseEntidadTransaccional } from "../Base/EBaseEntidadTransaccional";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import Funciones from '../../genericos/Funciones';
import { Deferred } from 'ts-deferred';
import { RestFiltros } from "src/genericos/RestFiltros";
import EAmpliacionPlanAccionIncidente from './EAmpliacionPlanAccionIncidente';
// import ESeguimientoIncidente from './ESeguimientoIncidente';
export default class EAmpliacionPlanAccionIncidenteLista extends EBaseEntidadTransaccional {



public static obtenerFiltroPorIdVencimientoYPorIdPlanAccionYEstadoActivo(IdVencimiento: number,idPlanAccion: number): string {
    const valorFilter = `${EAmpliacionPlanAccionIncidente.CamposExpand.Incidente}/ID eq '${IdVencimiento}' and ${EAmpliacionPlanAccionIncidente.CamposExpand.SeguimientoIncidente}/ID eq '${idPlanAccion}' and EstadoSolicitudIncidente eq 'Por Validar'`;
    return valorFilter;
}

public static getListaAmpliacionPlanAccion(IdVencimiento: number,idPlanAccion: number) {
  const listaFieldsSelect = Funciones.obtenerListaCampos(EAmpliacionPlanAccionIncidente.Campos);
  const listaCamposExpand = Funciones.obtenerListaCampos(
    EAmpliacionPlanAccionIncidente.CamposExpand
  );

  const listaFieldsExpand = [
    RestFiltros.obtenerFieldExpandUsuario(
      EAmpliacionPlanAccionIncidente.CamposExpand.UsuarioRegistro
    ),
    RestFiltros.obtenerFieldExpandLookup(EAmpliacionPlanAccionIncidente.CamposExpand.Incidente),
    RestFiltros.obtenerFieldExpandLookup(EAmpliacionPlanAccionIncidente.CamposExpand.SeguimientoIncidente),

  ];

  const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
    listaFieldsExpand
  );

  const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter,
      ParametrosNoAdministrables.Listas.HistorialAmpliacionPlanAccionIncidente,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      this.obtenerFiltroPorIdVencimientoYPorIdPlanAccionYEstadoActivo(IdVencimiento,idPlanAccion)
  );
  return endPoint;
}


  public ObtenerAmpliacionPlanAccion(IdVencimiento: number,idPlanAccion:number): Promise<EAmpliacionPlanAccionIncidente> {
    const dfd: Deferred<EAmpliacionPlanAccionIncidente> = new Deferred<EAmpliacionPlanAccionIncidente>();

    const endPoint = EAmpliacionPlanAccionIncidenteLista.getListaAmpliacionPlanAccion(IdVencimiento,idPlanAccion);

    Funciones.ObtenerElementoPorRest(endPoint)
    .then((resultado) => {
      const Result = (resultado as EAmpliacionPlanAccionIncidente);

      dfd.resolve(Result[0]);
    })
    .catch(error => {
        dfd.reject(error);
    });



    return dfd.promise;
  }


  
}
