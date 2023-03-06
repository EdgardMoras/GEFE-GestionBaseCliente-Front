import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { Deferred } from "ts-deferred";
import { RestFiltros } from "src/genericos/RestFiltros";
import Funciones from "src/genericos/Funciones";
import { EBaseEntidad } from '../Base/EBaseEntidad';

export default class EFeriadoLogico extends EBaseEntidad {
  public static Campos = {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    Fecha: ParametrosNoAdministrables.ColumnasSitio.Fecha,
    Recurrente: ParametrosNoAdministrables.ColumnasSitio.Recurrente,
    Title: ParametrosNoAdministrables.ColumnasSitio.Title,
  };
  public static CamposExpand = {

  };
  public static CamposRest = {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    Fecha: ParametrosNoAdministrables.ColumnasSitio.Fecha,
    Recurrente: ParametrosNoAdministrables.ColumnasSitio.Recurrente,
    Title: ParametrosNoAdministrables.ColumnasSitio.Title,
  };


  public static getValoresFeriado(
    Title: string,
    Fecha: Date,
    Recurrente: boolean,
  ) {
    return {
      Title,
      Fecha,
      Recurrente,
    }
  }

  public static async obtenerRegistros(): Promise<EFeriadoLogico[]> {
    const dfd: Deferred<EFeriadoLogico[]> = new Deferred<EFeriadoLogico[]>();

    const listaFieldsSelect = Funciones.obtenerListaCampos(EFeriadoLogico.CamposRest);

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.Select,
      ParametrosNoAdministrables.Listas.Feriados,
      listaFieldsSelect.join(",")
    );

    Promise.all([Funciones.ObtenerElementoPorRest(url)])
      .then(([resultadosRegistros]) => {
        if (resultadosRegistros.length === 0) {
          dfd.resolve([]);
          return;
        }

        const listaRegistros: EFeriadoLogico[] = []

        resultadosRegistros.forEach((elementoItemLista: any) => {
          const elemento = new EFeriadoLogico();
          elemento.setearValoresRest(elementoItemLista);

          listaRegistros.push(elemento);
        });

        dfd.resolve(listaRegistros);
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public ID: number;
  public Title: string;
  public Fecha: string;
  public Recurrente: boolean;

  constructor() {
    super();

    this.ID = 0;
    this.Title = "";
    this.Fecha = "";
    this.Recurrente = false;
  }

  public setearValoresRest(elementoItemLista: any) {
    this.Fecha = RestFiltros.parsearTexto(
      elementoItemLista,
      EFeriadoLogico.Campos.Fecha
    );
    this.ID = elementoItemLista[EFeriadoLogico.Campos.ID];
    this.Recurrente = RestFiltros.parsearBooleano(
      elementoItemLista,
      EFeriadoLogico.Campos.Recurrente
    );
    this.Title = RestFiltros.parsearTexto(
      elementoItemLista,
      EFeriadoLogico.Campos.Title
    );
  }

}
