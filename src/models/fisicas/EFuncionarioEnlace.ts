import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import Usuario from "src/models/Base/Usuario";
import { Deferred } from "ts-deferred";
import { RestFiltros } from "src/genericos/RestFiltros";
import Funciones from "src/genericos/Funciones";
import { EBaseEntidad } from '../Base/EBaseEntidad';

export default class EFuncionarioEnlace extends EBaseEntidad {
  public static Campos = {
    Usuario: ParametrosNoAdministrables.ColumnasSitio.Usuario,
    Title: ParametrosNoAdministrables.ColumnasSitio.Title,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
  };
  public static CamposExpand = {
    Usuario: ParametrosNoAdministrables.ColumnasSitio.Usuario,
  };
  public static CamposRest = {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    Title: ParametrosNoAdministrables.ColumnasSitio.Title,
  };

  public static getValoresNuevoFuncionarioEnlace(
    nombreDivision: string,
    usuarioId: number,
  ) {
    return {
      Title: nombreDivision,
      UsuarioId: usuarioId,
    }
  }

  public static async obtenerRegistros(): Promise<EFuncionarioEnlace[]> {
    const dfd: Deferred<EFuncionarioEnlace[]> = new Deferred<EFuncionarioEnlace[]>();

    const filtroPorYEstadoActivo: string = RestFiltros.obtenerFiltroPorEstadoActivo();
    const listaFieldsExpand = Funciones.obtenerListaCampos(
      EFuncionarioEnlace.CamposExpand
    );
    const listaFieldsSelect = Funciones.obtenerListaCampos(EFuncionarioEnlace.CamposRest);

    const listaFieldsSelectExpand = [
      RestFiltros.obtenerFieldExpandUsuario(EFuncionarioEnlace.CamposExpand.Usuario)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsSelectExpand
    );

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter,
      ParametrosNoAdministrables.Listas.FuncionariosEnlace,
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

        const listaRegistros: EFuncionarioEnlace[] = []

        resultadosRegistros.forEach((elementoItemLista: any) => {
          const ampliacion = new EFuncionarioEnlace();
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

  constructor() {
    super();

    this.ID = 0;
    this.Usuario = new Usuario();
  }

  public setearValoresRest(elementoItemLista: any) {
    this.ID = elementoItemLista[EFuncionarioEnlace.Campos.ID];
    this.Title = RestFiltros.parsearTexto(
      elementoItemLista,
      EFuncionarioEnlace.Campos.Title
    );
    this.Usuario = RestFiltros.parsearUsuario(
      elementoItemLista,
      EFuncionarioEnlace.Campos.Usuario
    );    
  }

}
