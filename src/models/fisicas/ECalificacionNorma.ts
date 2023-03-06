import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { Deferred } from "ts-deferred";
import { RestFiltros } from "src/genericos/RestFiltros";
import Funciones from "src/genericos/Funciones";
import { EBaseEntidad } from '../Base/EBaseEntidad';

export default class ECalificacionNorma extends EBaseEntidad {
  public static Campos = {
    CalificacionNorma: ParametrosNoAdministrables.ColumnasSitio.CalificacionNorma,
    RequiereSeguimiento: ParametrosNoAdministrables.ColumnasSitio.RequiereSeguimiento,
    ValorMinimo: ParametrosNoAdministrables.ColumnasSitio.ValorMinimo,
    ValorMaximo: ParametrosNoAdministrables.ColumnasSitio.ValorMaximo,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
  };
  public static CamposExpand = {

  };
  public static CamposRest = {
    CalificacionNorma: ParametrosNoAdministrables.ColumnasSitio.CalificacionNorma,
    RequiereSeguimiento: ParametrosNoAdministrables.ColumnasSitio.RequiereSeguimiento,
    ValorMinimo: ParametrosNoAdministrables.ColumnasSitio.ValorMinimo,
    ValorMaximo: ParametrosNoAdministrables.ColumnasSitio.ValorMaximo,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
  };


  public static getValoresCalificacionNorma(
    calificacionNorma: string,
    requiereSeguimiento: boolean,
    valorMinimo: number,
    valorMaximo: number
  ) {
    return {
      CalificacionNorma: calificacionNorma,
      RequiereSeguimiento: requiereSeguimiento,
      ValorMinimo: valorMinimo,
      ValorMaximo: valorMaximo
    }
  }

  public static async obtenerRegistros(): Promise<ECalificacionNorma[]> {
    const dfd: Deferred<ECalificacionNorma[]> = new Deferred<ECalificacionNorma[]>();

    const filtroPorYEstadoActivo: string = RestFiltros.obtenerFiltroPorEstadoActivo();    
    const listaFieldsSelect = Funciones.obtenerListaCampos(ECalificacionNorma.CamposRest);

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      ParametrosNoAdministrables.Listas.CalificacionesNorma,
      listaFieldsSelect.join(","),
      filtroPorYEstadoActivo
    );

    Promise.all([Funciones.ObtenerElementoPorRest(url)])
      .then(([resultadosRegistros]) => {
        if (resultadosRegistros.length === 0) {
          dfd.resolve([]);
          return;
        }

        const listaRegistros: ECalificacionNorma[] = []

        resultadosRegistros.forEach((elementoItemLista: any) => {
          const ampliacion = new ECalificacionNorma();
          ampliacion.setearValoresRest(elementoItemLista);

          listaRegistros.push(ampliacion);
        });

        dfd.resolve(listaRegistros);
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public ID: number;
  public CalificacionNorma: string;
  public RequiereSeguimiento: boolean;
  public ValorMinimo: number;
  public ValorMaximo: number;

  constructor() {
    super();

    this.ID = 0;
    this.CalificacionNorma = "";
    this.RequiereSeguimiento = false;
    this.ValorMinimo = 0;
    this.ValorMaximo = 0;
  }

  public setearValoresRest(elementoItemLista: any) {
    this.ID = elementoItemLista[ECalificacionNorma.Campos.ID];
    this.CalificacionNorma = RestFiltros.parsearTexto(
      elementoItemLista,
      ECalificacionNorma.Campos.CalificacionNorma
    );
    this.RequiereSeguimiento = RestFiltros.parsearBooleano(
      elementoItemLista,
      ECalificacionNorma.Campos.RequiereSeguimiento
    );
    this.ValorMinimo = RestFiltros.parsearNumeroDecimal(
      elementoItemLista,
      ECalificacionNorma.Campos.ValorMinimo
    );
    this.ValorMaximo = RestFiltros.parsearNumeroDecimal(
      elementoItemLista,
      ECalificacionNorma.Campos.ValorMaximo
    );
  }

}
