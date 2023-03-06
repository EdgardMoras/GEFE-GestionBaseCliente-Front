import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { Deferred } from "ts-deferred";
import { RestFiltros } from "src/genericos/RestFiltros";
import Funciones from "src/genericos/Funciones";
import { EBaseEntidad } from '../Base/EBaseEntidad';

export default class EAlertaDirectiva extends EBaseEntidad {
  public static Campos = {
    Cantidad: ParametrosNoAdministrables.ColumnasSitio.Cantidad,
    EsNotificarTodosResponsables: ParametrosNoAdministrables.ColumnasSitio.EsNotificarTodosResponsables,
    EsExcluirVP: ParametrosNoAdministrables.ColumnasSitio.EsExcluirVP,
    EsExcluirVPE: ParametrosNoAdministrables.ColumnasSitio.EsExcluirVPE,
    TipoCondicionAlerta: ParametrosNoAdministrables.ColumnasSitio.TipoCondicionAlerta,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
  };
  public static CamposExpand = {
    
  };
  public static CamposRest = {
    Cantidad: ParametrosNoAdministrables.ColumnasSitio.Cantidad,
    EsNotificarTodosResponsables: ParametrosNoAdministrables.ColumnasSitio.EsNotificarTodosResponsables,
    EsExcluirVP: ParametrosNoAdministrables.ColumnasSitio.EsExcluirVP,
    EsExcluirVPE: ParametrosNoAdministrables.ColumnasSitio.EsExcluirVPE,
    TipoCondicionAlerta: ParametrosNoAdministrables.ColumnasSitio.TipoCondicionAlerta,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
  };


  public static async obtenerRegistros(): Promise<EAlertaDirectiva[]> {
    const dfd: Deferred<EAlertaDirectiva[]> = new Deferred<EAlertaDirectiva[]>();

    const filtroPorYEstadoActivo: string = RestFiltros.obtenerFiltroPorEstadoActivo();
    const listaFieldsExpand = Funciones.obtenerListaCampos(
      EAlertaDirectiva.CamposExpand
    );
    /* const listaFieldsSelect = Funciones.obtenerListaCampos(EAlertaDirectiva.CamposRest);

    const listaFieldsSelectExpand = [
      RestFiltros.obtenerFieldExpandUsuario(EAlertaDirectiva.CamposExpand.Responsable),
      RestFiltros.obtenerFieldExpandUsuario(EAlertaDirectiva.CamposExpand.Usuario)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsSelectExpand
    );*/

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      ParametrosNoAdministrables.Listas.ConfiguracionAlertasDirectivas,
      listaFieldsExpand.join(","),
      filtroPorYEstadoActivo
    );

    Promise.all([Funciones.ObtenerElementoPorRest(url)])
      .then(([resultadosRegistros]) => {
        if (resultadosRegistros.length === 0) {
          dfd.resolve([]);
          return;
        }

        const listaRegistros: EAlertaDirectiva[] = []

        resultadosRegistros.forEach((elementoItemLista: any) => {
          const ampliacion = new EAlertaDirectiva();
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
  public TipoCondicionAlerta: string;

  constructor() {
    super();

    this.ID = 0;
    this.Cantidad = 0;
    this.EsNotificarTodosResponsables = false;
    this.EsExcluirVP = true;
    this.EsExcluirVPE = true;
    this.TipoCondicionAlerta = ParametrosNoAdministrables.ModuloDirectivas.TipoAlertaDirectivas.Antes;
  }

  public setearValoresRest(elementoItemLista: any) {
    this.ID = elementoItemLista[EAlertaDirectiva.Campos.ID];
    const cantidad = RestFiltros.parsearTexto(
      elementoItemLista,
      EAlertaDirectiva.Campos.Cantidad
    );
    this.Cantidad = parseInt(cantidad, 10);
    this.EsNotificarTodosResponsables = RestFiltros.parsearBooleano(
      elementoItemLista,
      EAlertaDirectiva.Campos.EsNotificarTodosResponsables
    );
    this.EsExcluirVP = RestFiltros.parsearBooleano(
      elementoItemLista,
      EAlertaDirectiva.Campos.EsExcluirVP
    );
    this.EsExcluirVPE = RestFiltros.parsearBooleano(
      elementoItemLista,
      EAlertaDirectiva.Campos.EsExcluirVPE
    );
    this.TipoCondicionAlerta = RestFiltros.parsearTexto(
      elementoItemLista,
      EAlertaDirectiva.Campos.TipoCondicionAlerta
    );
  }

}
