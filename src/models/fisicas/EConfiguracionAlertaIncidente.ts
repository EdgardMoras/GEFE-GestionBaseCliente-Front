import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { Deferred } from "ts-deferred";
import { RestFiltros } from "src/genericos/RestFiltros";
import Funciones from "src/genericos/Funciones";
import { EBaseEntidad } from '../Base/EBaseEntidad';

export default class EConfiguracionAlertaIncidente extends EBaseEntidad {
  public static Campos = {
   ID: ParametrosNoAdministrables.ColumnaSitioConfiguracionAlertaIncidente.ID,
   diasUtiles: ParametrosNoAdministrables.ColumnaSitioConfiguracionAlertaIncidente.diasUtiles,
   CopiaJefe: ParametrosNoAdministrables.ColumnaSitioConfiguracionAlertaIncidente.CopiaJefe,
   TipoVencimiento: ParametrosNoAdministrables.ColumnaSitioConfiguracionAlertaIncidente.TipoVencimiento,
   
  };
  public static CamposExpand = {

  };
  public static CamposRest = {
    ID: ParametrosNoAdministrables.ColumnaSitioConfiguracionIncidente.ID,
    diasUtiles: ParametrosNoAdministrables.ColumnaSitioConfiguracionAlertaIncidente.diasUtiles,
    CopiaJefe: ParametrosNoAdministrables.ColumnaSitioConfiguracionAlertaIncidente.CopiaJefe,
    TipoVencimiento: ParametrosNoAdministrables.ColumnaSitioConfiguracionAlertaIncidente.TipoVencimiento,
  };

  public static async obtenerRegistros(): Promise<EConfiguracionAlertaIncidente[]> {
    const dfd: Deferred<EConfiguracionAlertaIncidente[]> = new Deferred<EConfiguracionAlertaIncidente[]>();

    const filtroPorYEstadoActivo: string = RestFiltros.obtenerFiltroPorEstadoActivo();

    const listaFieldsSelect = Funciones.obtenerListaCampos(EConfiguracionAlertaIncidente.CamposRest);

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      ParametrosNoAdministrables.Listas.ConfiguracionAlertasIncidentes,
      listaFieldsSelect.join(","),
      filtroPorYEstadoActivo
    );

    Promise.all([Funciones.ObtenerElementoPorRest(url)])
      .then(([resultadosRegistros]) => {

        if (resultadosRegistros.length === 0) {
          dfd.resolve([]);
          return;
        }
        const listaRegistros: EConfiguracionAlertaIncidente[] = []
        
        
        resultadosRegistros.forEach((elementoItemLista: any) => {
          const registro = new EConfiguracionAlertaIncidente();
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
  public diasUtiles: number;
  public CopiaJefe: boolean;
  public TipoVencimiento: string;


  constructor() {
    super();

    this.ID = 0;
    this.diasUtiles = 0;
    this.CopiaJefe =false;
    this.TipoVencimiento = "";
  }

  public setearValoresRest(elementoItemLista: any) {
    this.ID = elementoItemLista[EConfiguracionAlertaIncidente.Campos.ID];
    this.diasUtiles = elementoItemLista[EConfiguracionAlertaIncidente.Campos.diasUtiles];
    
    this.CopiaJefe = RestFiltros.parsearBooleano(
      elementoItemLista,
      EConfiguracionAlertaIncidente.Campos.CopiaJefe
    );

    this.TipoVencimiento = RestFiltros.parsearTexto(
      elementoItemLista,
      EConfiguracionAlertaIncidente.Campos.TipoVencimiento
    );
  }
}
