import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { Deferred } from "ts-deferred";
import { RestFiltros } from "src/genericos/RestFiltros";
import Funciones from "src/genericos/Funciones";
import { EBaseEntidad } from '../Base/EBaseEntidad';

export default class EConfiguracionIncidentes extends EBaseEntidad {
  public static Campos = {
   ID: ParametrosNoAdministrables.ColumnaSitioConfiguracionIncidente.ID,
   esHabilitarAlerta: ParametrosNoAdministrables.ColumnaSitioConfiguracionIncidente.esHabilitarAlerta,
  };
  public static CamposExpand = {

  };
  public static CamposRest = {
    ID: ParametrosNoAdministrables.ColumnaSitioConfiguracionIncidente.ID,
   esHabilitarAlerta: ParametrosNoAdministrables.ColumnaSitioConfiguracionIncidente.esHabilitarAlerta,
  };

  public static getActualizarConfiguracionIncidentes = (esHabilitarAlertas: boolean) => {
    return {
      esHabilitarAlerta: esHabilitarAlertas
    }
  }

  /*public static getActualizarConfiguracionAlertasNormas = (esHabilitadoAlertasNormas: boolean) => {
    return {
      EsHabilitadoAlertasNormas: esHabilitadoAlertasNormas
    }
  }

  public static getActualizarConfiguracionCalificacionNorma = (probabilidad: number, impacto: number) => {
    return {
      NormaImpacto: probabilidad,
      NormaProbabilidad: impacto
    }
  }*/

  public static async obtenerRegistros(): Promise<EConfiguracionIncidentes> {
    const dfd: Deferred<EConfiguracionIncidentes> = new Deferred<EConfiguracionIncidentes>();

    const filtroPorYEstadoActivo: string = RestFiltros.obtenerFiltroPorEstadoActivo();

    const listaFieldsSelect = Funciones.obtenerListaCampos(EConfiguracionIncidentes.CamposRest);

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      ParametrosNoAdministrables.Listas.ConfiguracionIncidente,
      listaFieldsSelect.join(","),
      filtroPorYEstadoActivo
    );

    Promise.all([Funciones.ObtenerElementoPorRest(url)])
      .then(([resultadosRegistros]) => {

        const registro = new EConfiguracionIncidentes();
        resultadosRegistros.forEach((elementoItemLista: any) => {
          registro.setearValoresRest(elementoItemLista);
        });

        dfd.resolve(registro);
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public ID: number;
  public esHabilitarAlerta: boolean;


  constructor() {
    super();

    this.ID = 0;
    this.esHabilitarAlerta = false;
  }

  public setearValoresRest(elementoItemLista: any) {
    this.ID = elementoItemLista[EConfiguracionIncidentes.Campos.ID];
    this.esHabilitarAlerta = RestFiltros.parsearBooleano(
      elementoItemLista,
      EConfiguracionIncidentes.Campos.esHabilitarAlerta
    );
  }
}
