// import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import Usuario from "src/models/Base/Usuario";
// import Lookup from "src/models/Base/Lookup";
// import { Deferred } from "ts-deferred";
// import Funciones from "src/genericos/Funciones";
import FiltroBusqueda, { TipoFiltro } from "src/models/Base/FiltroBusqueda";
import ParseJsom from "src/genericos/ParseJsom";
import { RestFiltros } from "src/genericos/RestFiltros";
import { EBaseEntidadTransaccional } from "src/models/Base/EBaseEntidadTransaccional";
import Funciones from "src/genericos/Funciones";
import { Deferred } from "ts-deferred";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";

export default class EActividad extends EBaseEntidadTransaccional {

  public static Campos = {
    ID: "ID",
    Detalle: "Detalle",
    FechaRegistro: "FechaRegistro",
    UsuarioRegistro: "UsuarioRegistro",
    EstadoElemento: "EstadoElemento",

  };
  public static CamposExpand = {
    UsuarioRegistro: "UsuarioRegistro",
    Proyecto: "Proyecto"
  };

  public static Fields = [
    "ID",
    "Detalle",
    "FechaRegistro",
    "UsuarioRegistro",
    "EstadoElemento",
  ];


  public static getListaActividadFiltrado(idProyecto: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(EActividad.Campos);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      EActividad.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        EActividad.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandLookuptest(EActividad.CamposExpand.Proyecto),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const valorFilter = `${ParametrosNoAdministrables.ColumnasSitio.EstadoElemento} eq '${ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo}' and Proyecto/ID eq '${idProyecto}'`;

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterByID,
      "Actividad",
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      valorFilter

    );

    return endPoint;
  }


  public FechaRegistro: string;
  public UsuarioRegistro: Usuario[];
  public Detalle: string;




  constructor() {
    super();
    this.ID = 0;
    this.Detalle = "";
    this.UsuarioRegistro = [];
    this.FechaRegistro = "";
  }

  public setearValores(elementoItemLista: SP.ListItem) {
    this.Detalle = ParseJsom.parsearString(
      elementoItemLista,
      EActividad.Campos.Detalle
    );


    this.UsuarioRegistro = ParseJsom.parsearUsuarioMultiple(
      elementoItemLista,
      EActividad.CamposExpand.UsuarioRegistro
    );

    this.FechaRegistro = ParseJsom.parsearFechaString(
      elementoItemLista,
      EActividad.Campos.FechaRegistro
    );



    this.ID = ParseJsom.parsearNumber(elementoItemLista, EActividad.Campos.ID);
  }

  public setearValoresRest(elementoItemLista: any) {
    this.ID = RestFiltros.parsearNumero(
      elementoItemLista,
      EActividad.Campos.ID
    );
    this.Detalle = RestFiltros.parsearTexto(
      elementoItemLista,
      EActividad.Campos.Detalle
    );
    this.FechaRegistro = RestFiltros.parsearTexto(
      elementoItemLista,
      EActividad.Campos.FechaRegistro
    );
    this.UsuarioRegistro = RestFiltros.parsearUsuarios(
      elementoItemLista,
      EActividad.CamposExpand.UsuarioRegistro
    );
  }

  public obtenerFiltro(Id: number): FiltroBusqueda[] {
    const filtros: FiltroBusqueda[] = [];

    filtros.push(
      new FiltroBusqueda(TipoFiltro.esIgualLookupId, "ID", Id)
    );

    return filtros;
  }

  public ObtenerActividadDetalle(idProyecto: number): Promise<EActividad[]> {
    const dfd: Deferred<EActividad[]> = new Deferred<EActividad[]>();

    const endPoint = EActividad.getListaActividadFiltrado(idProyecto);

    Funciones.ObtenerElementoPorRest(endPoint)
      .then((resultado) => {
        const Result = (resultado as any[]);
        const Listareturn: any = [];

        Result.forEach((element2, i) => {

          const element = new EActividad;
          element.FechaRegistro = element2.FechaRegistro;
          element.ID = element2.ID;
          element.UsuarioRegistro = element2.UsuarioRegistro;
          element.Detalle = element2.Detalle;
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
