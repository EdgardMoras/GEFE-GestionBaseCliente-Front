import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import ParseJsom from "src/genericos/ParseJsom";
import { EBaseEntidad } from "src/models/Base/EBaseEntidad";
import Funciones from '../../genericos/Funciones';
import { RestFiltros } from '../../genericos/RestFiltros';
import { Deferred } from 'ts-deferred';

export default class ETipoNorma extends EBaseEntidad {

  public static Campos = {
    EstadoElemento: ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    Title: ParametrosNoAdministrables.ColumnasSitio.Title,
  };

  public static getValores(
    titulo: string,
    estado: string,
  ) {
    return {
      Title: titulo,
      EstadoElemento: estado
    }
  }

  public static getEndPointElementosActivos() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ETipoNorma.Campos);

    const endPointObtenerDivisiones: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      ParametrosNoAdministrables.Listas.TiposNormas,
      listaFieldsSelect.join(","),
      RestFiltros.obtenerFiltroPorEstadoActivo()
    );
    return endPointObtenerDivisiones;
  }

  public static async obtenerRegistros(): Promise<ETipoNorma[]> {
    const dfd: Deferred<ETipoNorma[]> = new Deferred<ETipoNorma[]>();

  
    const listaFieldsSelect = Funciones.obtenerListaCampos(ETipoNorma.Campos);

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.Select,
      ParametrosNoAdministrables.Listas.TiposNormas,
      listaFieldsSelect.join(","),
    );

    Promise.all([Funciones.ObtenerElementoPorRest(url)])
      .then(([resultadosRegistros]) => {
        if (resultadosRegistros.length === 0) {
          dfd.resolve([]);
          return;
        }

        const listaRegistros: ETipoNorma[] = []

        resultadosRegistros.forEach((elementoItemLista: any) => {
          const registro = new ETipoNorma();
          registro.setearValoresConRest(elementoItemLista);

          listaRegistros.push(registro);
        });

        dfd.resolve(listaRegistros);
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }
  
  constructor() {
    super();
  }

  
  public setearValoresItem(elementoItemLista: any) {
    this.ID = Number(elementoItemLista.ID);
    this.Title = elementoItemLista.Title;
    this.EstadoElemento = elementoItemLista.EstadoElemento;
  }

  public setearValores(elementoItemLista: SP.ListItem) {
    this.Title = ParseJsom.parsearString(
      elementoItemLista,
      ETipoNorma.Campos.Title
    );
    this.EstadoElemento = ParseJsom.parsearString(
      elementoItemLista,
      ETipoNorma.Campos.EstadoElemento
    );
  }

  public setearValoresConRest(elementoItemLista: any): void {
    this.ID = Number(elementoItemLista.ID);
    this.Title = elementoItemLista.Title;
    this.EstadoElemento = elementoItemLista.EstadoElemento;
  }
}
