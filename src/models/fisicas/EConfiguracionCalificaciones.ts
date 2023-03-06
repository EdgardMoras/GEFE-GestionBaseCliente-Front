import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { Deferred } from "ts-deferred";
import { RestFiltros } from "src/genericos/RestFiltros";
import Funciones from "src/genericos/Funciones";
import { EBaseEntidad } from '../Base/EBaseEntidad';

export default class EConfiguracionCalificaciones extends EBaseEntidad {
  public static Campos = {
    ID: ParametrosNoAdministrables.ColumnaSitioConfiguracionEvaluacion.ID,
    NombreEvaluacion: ParametrosNoAdministrables.ColumnaSitioConfiguracionEvaluacion.NombreEvaluacion,
    OrdenEvaluacion: ParametrosNoAdministrables.ColumnaSitioConfiguracionEvaluacion.OrdenEvaluacion,
    EstadoElemento: ParametrosNoAdministrables.ColumnaSitioConfiguracionEvaluacion.EstadoElemento,

  };
  public static CamposExpand = {

  };
  public static CamposRest = {
    ID: ParametrosNoAdministrables.ColumnaSitioConfiguracionEvaluacion.ID,
    NombreEvaluacion: ParametrosNoAdministrables.ColumnaSitioConfiguracionEvaluacion.NombreEvaluacion,
    OrdenEvaluacion: ParametrosNoAdministrables.ColumnaSitioConfiguracionEvaluacion.OrdenEvaluacion,
    EstadoElemento: ParametrosNoAdministrables.ColumnaSitioConfiguracionEvaluacion.EstadoElemento,
  };

  public static async obtenerRegistros(): Promise<EConfiguracionCalificaciones[]> {
    const dfd: Deferred<EConfiguracionCalificaciones[]> = new Deferred<EConfiguracionCalificaciones[]>();

    // const filtroPorYEstadoActivo: string = RestFiltros.obtenerFiltroPorEstadoActivo();

    const listaFieldsSelect = Funciones.obtenerListaCampos(EConfiguracionCalificaciones.CamposRest);

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterOrderByOrden,
      ParametrosNoAdministrables.Listas.ConfiguracionEvaluacion,
      listaFieldsSelect.join(",")
      // filtroPorYEstadoActivo
    );

    Promise.all([Funciones.ObtenerElementoPorRest(url)])
      .then(([resultadosRegistros]) => {

        if (resultadosRegistros.length === 0) {
          dfd.resolve([]);
          return;
        }
        const listaRegistros: EConfiguracionCalificaciones[] = []


        resultadosRegistros.forEach((elementoItemLista: any) => {
          const registro = new EConfiguracionCalificaciones();
          registro.setearValoresRest(elementoItemLista);
          listaRegistros.push(registro);
        });

        dfd.resolve(listaRegistros);
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public ID: number;
  public NombreEvaluacion: string;
  public OrdenEvaluacion: string;
  public Estado: boolean;


  constructor() {
    super();

    this.ID = 0;
    this.NombreEvaluacion = "";
    this.OrdenEvaluacion = "";
    this.Estado = false;
  }

  public setearValoresRest(elementoItemLista: any) {
    this.ID = elementoItemLista[EConfiguracionCalificaciones.Campos.ID];

    this.OrdenEvaluacion = RestFiltros.parsearTexto(
      elementoItemLista,
      EConfiguracionCalificaciones.Campos.OrdenEvaluacion
    );

    this.NombreEvaluacion = RestFiltros.parsearTexto(
      elementoItemLista,
      EConfiguracionCalificaciones.Campos.NombreEvaluacion
    );

    this.Estado = RestFiltros.parsearBooleano(
      elementoItemLista,
      EConfiguracionCalificaciones.Campos.EstadoElemento
    );
  }
}
