import { EBaseEntidad } from "src/models/Base/EBaseEntidad";
import { Deferred } from 'ts-deferred';
import { ParametrosNoAdministrables } from '../../genericos/VariablesGlobales';
import { RestFiltros } from '../../genericos/RestFiltros';
import Funciones from '../../genericos/Funciones';

export class EBaseEntidadTransaccional extends EBaseEntidad {

  public static async obtenerFechaModificacion(nombreLista: string, idElemento: number): Promise<string> {
    const dfd: Deferred<string> = new Deferred<string>();

    const filtroPorIdYEstadoActivo: string = RestFiltros.obtenerFiltroPorIdYEstadoActivo(
      idElemento
    );
    const listaFieldsSelect = ParametrosNoAdministrables.ColumnasSitio.Modified;

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      nombreLista,
      listaFieldsSelect,
      filtroPorIdYEstadoActivo
    );

    Promise.all([Funciones.ObtenerElementoPorRest(url)])
      .then(([resultadoObtenerExpediente]) => {
        if (resultadoObtenerExpediente.length === 0) {
          dfd.resolve("");
          return;
        }

        const Modified = RestFiltros.parsearTexto(
          resultadoObtenerExpediente[0],
          ParametrosNoAdministrables.ColumnasSitio.Modified
        );

        dfd.resolve(Modified);
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  // public UsuarioRegistro: Usuario;
  public FechaRegistro?: string;
  public Modified: string;

  constructor() {
    super();
    // this.UsuarioRegistro = new Usuario();
    this.FechaRegistro = "";
    this.Modified = "";
  }


}
