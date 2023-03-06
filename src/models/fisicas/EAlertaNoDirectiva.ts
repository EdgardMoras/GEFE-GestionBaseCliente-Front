import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { Deferred } from "ts-deferred";
import { RestFiltros } from "src/genericos/RestFiltros";
import Funciones from "src/genericos/Funciones";
import { EBaseEntidad } from '../Base/EBaseEntidad';

export default class EAlertaNoDirectiva extends EBaseEntidad {
  public static Campos = {
    Cantidad: ParametrosNoAdministrables.ColumnasSitio.Cantidad,
    EsNotificarTodosResponsables: ParametrosNoAdministrables.ColumnasSitio.EsNotificarTodosResponsables,
    EsExcluirVP: ParametrosNoAdministrables.ColumnasSitio.EsExcluirVP,
    EsExcluirVPE: ParametrosNoAdministrables.ColumnasSitio.EsExcluirVPE,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
  };
  public static CamposExpand = {
    
  };
  public static CamposRest = {
    Cantidad: ParametrosNoAdministrables.ColumnasSitio.Cantidad,
    EsNotificarTodosResponsables: ParametrosNoAdministrables.ColumnasSitio.EsNotificarTodosResponsables,
    EsExcluirVP: ParametrosNoAdministrables.ColumnasSitio.EsExcluirVP,
    EsExcluirVPE: ParametrosNoAdministrables.ColumnasSitio.EsExcluirVPE,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
  };


  public static async obtenerRegistros(): Promise<EAlertaNoDirectiva[]> {
    const dfd: Deferred<EAlertaNoDirectiva[]> = new Deferred<EAlertaNoDirectiva[]>();

    const filtroPorYEstadoActivo: string = RestFiltros.obtenerFiltroPorEstadoActivo();
    const listaFieldsExpand = Funciones.obtenerListaCampos(
      EAlertaNoDirectiva.CamposExpand
    );
    /* const listaFieldsSelect = Funciones.obtenerListaCampos(EAlertaNoDirectiva.CamposRest);

    const listaFieldsSelectExpand = [
      RestFiltros.obtenerFieldExpandUsuario(EAlertaNoDirectiva.CamposExpand.Responsable),
      RestFiltros.obtenerFieldExpandUsuario(EAlertaNoDirectiva.CamposExpand.Usuario)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsSelectExpand
    );*/

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      ParametrosNoAdministrables.Listas.ConfiguracionAlertasNoDirectivas,
      listaFieldsExpand.join(","),
      filtroPorYEstadoActivo
    );

    Promise.all([Funciones.ObtenerElementoPorRest(url)])
      .then(([resultadosRegistros]) => {
        if (resultadosRegistros.length === 0) {
          dfd.resolve([]);
          return;
        }

        const listaRegistros: EAlertaNoDirectiva[] = []

        resultadosRegistros.forEach((elementoItemLista: any) => {
          const ampliacion = new EAlertaNoDirectiva();
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
  public EsNotificarTodosResponsables: boolean;
  public EsExcluirVP: boolean;
  public EsExcluirVPE: boolean;

  constructor() {
    super();

    this.ID = 0;
    this.Cantidad = 0;
    this.EsNotificarTodosResponsables = false;
    this.EsExcluirVP = true;
    this.EsExcluirVPE = true;
  }

  public setearValoresRest(elementoItemLista: any) {
    this.ID = elementoItemLista[EAlertaNoDirectiva.Campos.ID];
    const cantidad = RestFiltros.parsearTexto(
      elementoItemLista,
      EAlertaNoDirectiva.Campos.Cantidad
    );
    this.Cantidad = parseInt(cantidad, 10);
    this.EsNotificarTodosResponsables = RestFiltros.parsearBooleano(
      elementoItemLista,
      EAlertaNoDirectiva.Campos.EsNotificarTodosResponsables
    );
    this.EsExcluirVP = RestFiltros.parsearBooleano(
      elementoItemLista,
      EAlertaNoDirectiva.Campos.EsExcluirVP
    );
    this.EsExcluirVPE = RestFiltros.parsearBooleano(
      elementoItemLista,
      EAlertaNoDirectiva.Campos.EsExcluirVPE
    );
  }

}
