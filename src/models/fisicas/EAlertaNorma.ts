import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { Deferred } from "ts-deferred";
import { RestFiltros } from "src/genericos/RestFiltros";
import Funciones from "src/genericos/Funciones";
import { EBaseEntidad } from '../Base/EBaseEntidad';

export default class EAlertaNorma extends EBaseEntidad {
  public static Campos = {
    Cantidad: ParametrosNoAdministrables.ColumnasSitio.Cantidad,
    TipoAlertaNorma: ParametrosNoAdministrables.ColumnasSitio.TipoAlertaNorma,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
  };
  public static CamposExpand = {

  };
  public static CamposRest = {
    Cantidad: ParametrosNoAdministrables.ColumnasSitio.Cantidad,
    TipoAlertaNorma: ParametrosNoAdministrables.ColumnasSitio.TipoAlertaNorma,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
  };


  public static getValoresAlertaNorma(
    cantidad: number,
    tipoAlertaNorma: string,
  ) {
    return {
      Cantidad: cantidad,
      TipoAlertaNorma: tipoAlertaNorma,
    }
  }

  public static async obtenerRegistros(): Promise<EAlertaNorma[]> {
    const dfd: Deferred<EAlertaNorma[]> = new Deferred<EAlertaNorma[]>();

    const filtroPorYEstadoActivo: string = RestFiltros.obtenerFiltroPorEstadoActivo();
    const listaFieldsExpand = Funciones.obtenerListaCampos(
      EAlertaNorma.CamposExpand
    );
    /* const listaFieldsSelect = Funciones.obtenerListaCampos(EAlertaNorma.CamposRest);

    const listaFieldsSelectExpand = [
      RestFiltros.obtenerFieldExpandUsuario(EAlertaNorma.CamposExpand.Responsable),
      RestFiltros.obtenerFieldExpandUsuario(EAlertaNorma.CamposExpand.Usuario)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsSelectExpand
    );*/

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      ParametrosNoAdministrables.Listas.ConfiguracionAlertasNormas,
      listaFieldsExpand.join(","),
      filtroPorYEstadoActivo
    );

    Promise.all([Funciones.ObtenerElementoPorRest(url)])
      .then(([resultadosRegistros]) => {
        if (resultadosRegistros.length === 0) {
          dfd.resolve([]);
          return;
        }

        const listaRegistros: EAlertaNorma[] = []

        resultadosRegistros.forEach((elementoItemLista: any) => {
          const ampliacion = new EAlertaNorma();
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
  public Cantidad: number;
  public TipoAlertaNorma: string;

  constructor() {
    super();

    this.ID = 0;
    this.Cantidad = 0;
    this.TipoAlertaNorma = ParametrosNoAdministrables.ModuloNormas.TipoAlertaNormas.Antes;
  }

  public setearValoresRest(elementoItemLista: any) {
    this.ID = elementoItemLista[EAlertaNorma.Campos.ID];
    const cantidad = RestFiltros.parsearTexto(
      elementoItemLista,
      EAlertaNorma.Campos.Cantidad
    );
    this.Cantidad = parseInt(cantidad, 10);
    this.TipoAlertaNorma = RestFiltros.parsearTexto(
      elementoItemLista,
      EAlertaNorma.Campos.TipoAlertaNorma
    );
  }

}
