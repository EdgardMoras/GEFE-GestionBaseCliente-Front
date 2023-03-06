import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { Deferred } from "ts-deferred";
import { RestFiltros } from "src/genericos/RestFiltros";
import Funciones from "src/genericos/Funciones";
import { EBaseEntidad } from '../Base/EBaseEntidad';

export default class EAlertaTarea extends EBaseEntidad {
  public static Campos = {
    NumeroDias: ParametrosNoAdministrables.ColumnasSitio.Cantidad,
    TipoAlerta: ParametrosNoAdministrables.ColumnasSitio.TipoCondicionAlerta,
    CopiaJefe: "CopiaJefe",
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
  };
  public static CamposExpand = {

  };
  public static CamposRest = {
    NumeroDias: ParametrosNoAdministrables.ColumnasSitio.Cantidad,
    TipoAlerta: ParametrosNoAdministrables.ColumnasSitio.TipoCondicionAlerta,
    CopiaJefe: "CopiaJefe",
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
  };


  public static getValoresAlertaTarea(
    NumeroDias: number,
    TipoAlerta: string,
    CopiaJefe: boolean,

  ) {
    return {
      NumeroDias,
      TipoAlerta,
      CopiaJefe,
      FechaRegistro: new Date(),
    }
  }

  public static getValoresAlertaTareaActualizar(
    NumeroDias: number,
    TipoAlerta: string,
    CopiaJefe: boolean,

  ) {
    return {
      NumeroDias,
      TipoAlerta,
      CopiaJefe,
    }
  }

  public static async obtenerRegistros(): Promise<EAlertaTarea[]> {
    const dfd: Deferred<EAlertaTarea[]> = new Deferred<EAlertaTarea[]>();

    const filtroPorYEstadoActivo: string = RestFiltros.obtenerFiltroPorEstadoActivo();
    const listaFieldsExpand = Funciones.obtenerListaCampos(
      EAlertaTarea.CamposRest
    );

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      "ADM_Alertas",
      listaFieldsExpand.join(","),
      filtroPorYEstadoActivo
    );

    Promise.all([Funciones.ObtenerElementoPorRest(url)])
      .then(([resultadosRegistros]) => {
        if (resultadosRegistros.length === 0) {
          dfd.resolve([]);
          return;
        }

        const listaRegistros: EAlertaTarea[] = []

        resultadosRegistros.forEach((elementoItemLista: any) => {
          const ampliacion = new EAlertaTarea();
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
  public NumeroDias: number;
  public TipoAlerta: string;
  public CopiaJefe: boolean;

  constructor() {
    super();

    this.ID = 0;
    this.NumeroDias = 0;
    this.TipoAlerta = ParametrosNoAdministrables.ModuloDirectivas.TipoAlertaDirectivas.Antes;
    this.CopiaJefe = false;
  }

  public setearValoresRest(elementoItemLista: any) {
    this.ID = elementoItemLista[EAlertaTarea.Campos.ID];
    const cantidad = RestFiltros.parsearTexto(
      elementoItemLista,
      EAlertaTarea.Campos.NumeroDias
    );
    this.NumeroDias = parseInt(cantidad, 10);
    this.TipoAlerta = RestFiltros.parsearTexto(
      elementoItemLista,
      EAlertaTarea.Campos.TipoAlerta
    );

    this.CopiaJefe = RestFiltros.parsearBooleano(
      elementoItemLista,
      EAlertaTarea.Campos.CopiaJefe
    );
  }

}
