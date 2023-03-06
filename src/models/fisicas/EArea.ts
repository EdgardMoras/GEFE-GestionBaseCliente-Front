// import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import Usuario from "src/models/Base/Usuario";
// import Lookup from "src/models/Base/Lookup";
// import { Deferred } from "ts-deferred";
// import Funciones from "src/genericos/Funciones";
import { RestFiltros } from "src/genericos/RestFiltros";
import { EBaseEntidadTransaccional } from "src/models/Base/EBaseEntidadTransaccional";
import Funciones from "src/genericos/Funciones";
import { Deferred } from "ts-deferred";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";

export default class EArea extends EBaseEntidadTransaccional {

  public static Campos = {
    ID: "ID",
    Title: "Title",
    FechaRegistro: "FechaRegistro",
    UsuarioRegistro: "UsuarioRegistro",
    EstadoElemento: "EstadoElemento",

  };

  public static CamposExpand = {
    UsuarioRegistro: "UsuarioRegistro"
  };

  public static Fields = [
    "ID",
    "Title",
    "FechaRegistro",
    "UsuarioRegistro",
    "EstadoElemento"
  ];


  public static getListaProyectoFiltrado() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(EArea.Campos);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      EArea.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        EArea.CamposExpand.UsuarioRegistro
      ),
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const valorFilter = `${ParametrosNoAdministrables.ColumnasSitio.EstadoElemento} eq '${ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo}'`;

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterByID,
      "ADM_Area",
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      valorFilter

    );

    return endPoint;
  }



  public FechaRegistro: string;
  public UsuarioRegistro: Usuario[];




  constructor() {
    super();
    this.ID = 0;
    this.Title = "";
    this.UsuarioRegistro = [];
    this.FechaRegistro = "";
  }

  public ObtenerProyectoDetalle(): Promise<any> {
    const dfd: Deferred<any> = new Deferred<any>();

    const endPoint = EArea.getListaProyectoFiltrado();

    Funciones.ObtenerElementoPorRest(endPoint)
      .then((resultado) => {
        const Result = (resultado as any[]);
        const Listareturn: any = [];

        Result.forEach((element2, i) => {

          const element = new EArea;

          element.Title = element2.Title;
          element.FechaRegistro = element2.FechaRegistro;
          element.ID = element2.ID;
          element.UsuarioRegistro = element2.UsuarioRegistro;

          Listareturn.push(element);

        });

        dfd.resolve(Listareturn);
      })
      .catch(error => {
        dfd.reject(error);
      });



    return dfd.promise;
  }

}
