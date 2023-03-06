import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { Deferred } from "ts-deferred";
import { RestFiltros } from "src/genericos/RestFiltros";
import Funciones from "src/genericos/Funciones";
import { EBaseEntidad } from '../Base/EBaseEntidad';

export default class EConfiguracion extends EBaseEntidad {
  public static Campos = {
    EsHabilitadoAlertasDirectivas: ParametrosNoAdministrables.ColumnasSitio.EsHabilitadoAlertasDirectivas,
    EsHabilitadoAlertasNoDirectivas: ParametrosNoAdministrables.ColumnasSitio.EsHabilitadoAlertasNoDirectivas,
    EsHabilitadoAlertasNormas: ParametrosNoAdministrables.ColumnasSitio.EsHabilitadoAlertasNormas,
    ExtensionArchivosNoPermitidas: ParametrosNoAdministrables.ColumnasSitio.ExtensionArchivosNoPermitidas,
    NormaImpacto: ParametrosNoAdministrables.ColumnasSitio.NormaImpacto,
    NormaProbabilidad: ParametrosNoAdministrables.ColumnasSitio.NormaProbabilidad,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    TamanoMaximoPermitido: ParametrosNoAdministrables.ColumnasSitio.TamanoMaximoPermitido,
  };
  public static CamposExpand = {

  };
  public static CamposRest = {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    EsHabilitadoAlertasDirectivas: ParametrosNoAdministrables.ColumnasSitio.EsHabilitadoAlertasDirectivas,
    EsHabilitadoAlertasNoDirectivas: ParametrosNoAdministrables.ColumnasSitio.EsHabilitadoAlertasNoDirectivas,
    EsHabilitadoAlertasNormas: ParametrosNoAdministrables.ColumnasSitio.EsHabilitadoAlertasNormas,
    ExtensionArchivosNoPermitidas: ParametrosNoAdministrables.ColumnasSitio.ExtensionArchivosNoPermitidas,
    NormaImpacto: ParametrosNoAdministrables.ColumnasSitio.NormaImpacto,
    NormaProbabilidad: ParametrosNoAdministrables.ColumnasSitio.NormaProbabilidad,
    TamanoMaximoPermitido: ParametrosNoAdministrables.ColumnasSitio.TamanoMaximoPermitido,
  };

  public static getActualizarConfiguracionExtensionArchivosNoPermitidas = (ExtensionArchivosNoPermitidas: string) => {
    return {
      ExtensionArchivosNoPermitidas,
    }
  }

  public static getActualizarConfiguracionTamanoMaximoPermitido = (TamanoMaximoPermitido: number) => {
    return {
      TamanoMaximoPermitido,
    }
  }

  public static getActualizarConfiguracionAlertasTareas = (EsHabilitadoAlertasTareas: boolean) => {
    return {
      EsHabilitadoAlertasTareas,
    }
  }

  public static getActualizarConfiguracionAlertasExpedientes = (esHabilitadoAlertasDirectivas: boolean, esHabilitadoAlertasNoDirectivas: boolean) => {
    return {
      EsHabilitadoAlertasDirectivas: esHabilitadoAlertasDirectivas,
      EsHabilitadoAlertasNoDirectivas: esHabilitadoAlertasNoDirectivas
    }
  }

  public static getActualizarConfiguracionAlertasNormas = (esHabilitadoAlertasNormas: boolean) => {
    return {
      EsHabilitadoAlertasNormas: esHabilitadoAlertasNormas
    }
  }

  public static getActualizarConfiguracionCalificacionNorma = (probabilidad: number, impacto: number) => {
    return {
      NormaProbabilidad: probabilidad,
      NormaImpacto : impacto
    }
  }

  public static async obtenerRegistros(): Promise<EConfiguracion> {
    const dfd: Deferred<EConfiguracion> = new Deferred<EConfiguracion>();

    const filtroPorYEstadoActivo: string = RestFiltros.obtenerFiltroPorEstadoActivo();
    /* const listaFieldsExpand = Funciones.obtenerListaCampos(
      EConfiguracion.CamposExpand
    );*/
    const listaFieldsSelect = Funciones.obtenerListaCampos(EConfiguracion.CamposRest);

    /* const listaFieldsSelectExpand = [
      RestFiltros.obtenerFieldExpandUsuario(EConfiguracion.CamposExpand.Responsable),
      RestFiltros.obtenerFieldExpandUsuario(EConfiguracion.CamposExpand.Usuario)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsSelectExpand
    );*/

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      ParametrosNoAdministrables.Listas.Configuracion,
      listaFieldsSelect.join(","),
      filtroPorYEstadoActivo
    );

    Promise.all([Funciones.ObtenerElementoPorRest(url)])
      .then(([resultadosRegistros]) => {

        const registro = new EConfiguracion();
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
  public EsHabilitadoAlertasDirectivas: boolean;
  public EsHabilitadoAlertasNoDirectivas: boolean;
  public EsHabilitadoAlertasNormas: boolean;
  public ExtensionArchivosNoPermitidas: string;
  public NormaImpacto: number;
  public NormaProbabilidad: number;
  public TamanoMaximoPermitido: number;

  constructor() {
    super();

    this.ID = 0;
    this.EsHabilitadoAlertasDirectivas = false;
    this.EsHabilitadoAlertasNoDirectivas = false;
    this.EsHabilitadoAlertasNormas = false;
    this.ExtensionArchivosNoPermitidas = "";
    this.NormaImpacto = 0;
    this.NormaProbabilidad = 0;
    this.TamanoMaximoPermitido = 10;
  }

  public setearValoresRest(elementoItemLista: any) {
    this.ID = elementoItemLista[EConfiguracion.Campos.ID];
    this.EsHabilitadoAlertasDirectivas = RestFiltros.parsearBooleano(
      elementoItemLista,
      EConfiguracion.Campos.EsHabilitadoAlertasDirectivas
    );
    this.EsHabilitadoAlertasNoDirectivas = RestFiltros.parsearBooleano(
      elementoItemLista,
      EConfiguracion.Campos.EsHabilitadoAlertasNoDirectivas
    );
    this.EsHabilitadoAlertasNormas = RestFiltros.parsearBooleano(
      elementoItemLista,
      EConfiguracion.Campos.EsHabilitadoAlertasNormas
    );
    this.ExtensionArchivosNoPermitidas = RestFiltros.parsearTexto(
      elementoItemLista,
      EConfiguracion.Campos.ExtensionArchivosNoPermitidas
    );
    this.NormaImpacto = RestFiltros.parsearNumeroDecimal(
      elementoItemLista,
      EConfiguracion.Campos.NormaImpacto
    );
    this.NormaProbabilidad = RestFiltros.parsearNumeroDecimal(
      elementoItemLista,
      EConfiguracion.Campos.NormaProbabilidad
    );
    this.TamanoMaximoPermitido = RestFiltros.parsearNumero(
      elementoItemLista,
      EConfiguracion.Campos.TamanoMaximoPermitido
    );
  }
}
