import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import Usuario from "src/models/Base/Usuario";
import { Deferred } from "ts-deferred";
import { RestFiltros } from "src/genericos/RestFiltros";
import Funciones from "src/genericos/Funciones";
import { EBaseEntidad } from '../Base/EBaseEntidad';

export default class EAsistente extends EBaseEntidad {
  public static Campos = {
    Usuario: ParametrosNoAdministrables.ColumnasSitio.Usuario,
    Responsable: ParametrosNoAdministrables.ColumnasSitio.Responsable,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
  };
  public static CamposExpand = {
    Usuario: ParametrosNoAdministrables.ColumnasSitio.Usuario,
    Responsable: ParametrosNoAdministrables.ColumnasSitio.Responsable,
  };
  public static CamposRest = {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
  };


  public static async obtenerRegistros(): Promise<EAsistente[]> {
    const dfd: Deferred<EAsistente[]> = new Deferred<EAsistente[]>();

    const filtroPorYEstadoActivo: string = RestFiltros.obtenerFiltroPorEstadoActivo();
    const listaFieldsExpand = Funciones.obtenerListaCampos(
      EAsistente.CamposExpand
    );
    const listaFieldsSelect = Funciones.obtenerListaCampos(EAsistente.CamposRest);

    const listaFieldsSelectExpand = [
      RestFiltros.obtenerFieldExpandUsuario(EAsistente.CamposExpand.Responsable),
      RestFiltros.obtenerFieldExpandUsuario(EAsistente.CamposExpand.Usuario)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsSelectExpand
    );

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter,
      ParametrosNoAdministrables.Listas.Asistentes,
      listaFieldsSelectYFieldsExpand.join(","),
      listaFieldsExpand.join(","),
      filtroPorYEstadoActivo
    );

    Promise.all([Funciones.ObtenerElementoPorRest(url)])
      .then(([resultadosRegistros]) => {
        if (resultadosRegistros.length === 0) {
          dfd.resolve([]);
          return;
        }

        const listaRegistros: EAsistente[] = []

        resultadosRegistros.forEach((elementoItemLista: any) => {
          const ampliacion = new EAsistente();
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
  public Usuario: Usuario;
  public Responsable: Usuario;

  constructor() {
    super();

    this.ID = 0;
    this.Usuario = new Usuario();
    this.Responsable = new Usuario();
  }

  public setearValoresRest(elementoItemLista: any) {
    this.ID = elementoItemLista[EAsistente.Campos.ID];
    this.Usuario = RestFiltros.parsearUsuario(
      elementoItemLista,
      EAsistente.Campos.Usuario
    );
    this.Responsable = RestFiltros.parsearUsuario(
      elementoItemLista,
      EAsistente.Campos.Responsable
    );
  }

}
