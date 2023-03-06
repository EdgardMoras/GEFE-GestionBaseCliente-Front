// import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import Usuario from "src/models/Base/Usuario";
// import Lookup from "src/models/Base/Lookup";
// import { Deferred } from "ts-deferred";
// import Funciones from "src/genericos/Funciones";
import FiltroBusqueda, { TipoFiltro } from "src/models/Base/FiltroBusqueda";
import ParseJsom from "src/genericos/ParseJsom";
import { RestFiltros } from "src/genericos/RestFiltros";
import { EBaseEntidadTransaccional } from "src/models/Base/EBaseEntidadTransaccional";
import Lookup from '../Base/Lookup';
import Funciones from "src/genericos/Funciones";
import { Deferred } from "ts-deferred";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";

export default class EProyecto extends EBaseEntidadTransaccional {

  public static Campos = {
    ID: "ID",
    NombreProyecto: "NombreProyecto",
    EstadoProyecto: "EstadoProyecto",
    FechaRegistro: "FechaRegistro",
    UsuarioRegistro: "UsuarioRegistro",
    Area: "Area",
    Codigo: "Codigo",
    EstadoElemento: "EstadoElemento",
    UsuarioResponsable: "UsuarioResponsable",
    Descripcion: "Descripcion"

  };
  public static CamposExpand = {
    UsuarioRegistro: "UsuarioRegistro",
    UsuarioResponsable: "UsuarioResponsable",
    Area: "Area"
  };

  public static Fields = [
    "ID",
    "NombreProyecto",
    "EstadoProyecto",
    "FechaRegistro",
    "UsuarioRegistro",
    "UsuarioResponsable",
    "EstadoElemento",
    "Area",
    "Codigo",
    "EstadoElemento",
    "Descripcion"

  ];


  public static async crearCarpetasProyecto(
    idProyecto: number
  ): Promise<boolean> {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    Funciones.CrearCarpeta(
      "Proyectos",
      idProyecto.toString()
    )
      .then(resultadoCrearCarpetaPrincipal => {

        if (idProyecto === 0) {
          dfd.resolve(false);
        }
        else {
          const promesas: Array<Promise<any>> = [];
          ParametrosNoAdministrables.ModuloDirectivas.ListaValoresCarpetasProyectos.forEach(nombreCarpeta => {
            promesas.push(Funciones.CrearSubCarpeta("Proyectos", nombreCarpeta, idProyecto.toString()));
          })

          Promise.all(promesas)
            .then(([resultadoCrearSubCarpetas]) => {

              ParametrosNoAdministrables.ModuloDirectivas.ListaValoresCarpetasProyectosPLaneacion.forEach(nombreCarpeta => {
                promesas.push(Funciones.CrearSubCarpeta("Proyectos", nombreCarpeta, idProyecto.toString() + "/" + ParametrosNoAdministrables.ModuloDirectivas.ListaValoresCarpetasProyectos[0].toString()));
              })

              ParametrosNoAdministrables.ModuloDirectivas.ListaValoresCarpetasProyectosEjecucion.forEach(nombreCarpeta => {
                promesas.push(Funciones.CrearSubCarpeta("Proyectos", nombreCarpeta, idProyecto.toString() + "/" + ParametrosNoAdministrables.ModuloDirectivas.ListaValoresCarpetasProyectos[1].toString()));
              })

              ParametrosNoAdministrables.ModuloDirectivas.ListaValoresCarpetasProyectosCierre.forEach(nombreCarpeta => {
                promesas.push(Funciones.CrearSubCarpeta("Proyectos", nombreCarpeta, idProyecto.toString() + "/" + ParametrosNoAdministrables.ModuloDirectivas.ListaValoresCarpetasProyectos[2].toString()));
              })


              dfd.resolve(true);
            })
            .catch(error => {
              dfd.reject(error);
            });
        }
      })
      .catch(error => {
        dfd.reject(error)
      });

    return dfd.promise;
  }

  public static async crearArchivosSeguimientoProyecto(
    idProyecto: number, CodigoProyecto: string
  ): Promise<boolean> {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    Funciones.CrearCarpeta(
      "ArchivosProyectos",
      idProyecto.toString()
    )
      .then(resultadoCrearCarpetaPrincipal => {

        if (idProyecto === 0) {
          dfd.resolve(false);
        }
        else {
          const promesas: Array<Promise<any>> = [];

          promesas.push(Funciones.CrearSubCarpeta("ArchivosProyectos", CodigoProyecto, idProyecto.toString()));


          Promise.all(promesas)
            .then(([resultadoCrearSubCarpetas]) => {
              dfd.resolve(true);
            })
            .catch(error => {
              dfd.reject(error);
            });
        }
      })
      .catch(error => {
        dfd.reject(error)
      });

    return dfd.promise;
  }

  public static getListaProyectoFiltrado(idProyecto: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(EProyecto.Campos);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      EProyecto.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        EProyecto.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandLookuptest(EProyecto.CamposExpand.Area),
      RestFiltros.obtenerFieldExpandUsuario(
        EProyecto.CamposExpand.UsuarioResponsable
      ),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const valorFilter = `${ParametrosNoAdministrables.ColumnasSitio.EstadoElemento} eq '${ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo}' and ID eq '${idProyecto}'`;

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterByID,
      "Proyecto",
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      valorFilter

    );

    return endPoint;
  }


  public NombreProyecto: string;
  public EstadoProyecto: string;
  public FechaRegistro: string;
  public UsuarioRegistro: Usuario[];
  public UsuarioResponsable: Usuario[];
  public Area: Lookup;
  public Codigo: string;
  public Descripcion: string;
  public UsuarioRegistroMostrar: string;
  public UsuarioResponsableMostrar: string;



  constructor() {
    super();
    this.ID = 0;
    this.NombreProyecto = "";
    this.UsuarioRegistro = [];
    this.FechaRegistro = "";
    this.Descripcion = "";
    this.Codigo = "";
    this.Area = new Lookup();
    this.UsuarioResponsable = [];
    this.UsuarioRegistroMostrar = "";
    this.UsuarioResponsableMostrar = "";
  }

  public setearValores(elementoItemLista: SP.ListItem) {
    this.NombreProyecto = ParseJsom.parsearString(
      elementoItemLista,
      EProyecto.Campos.NombreProyecto
    );
    this.EstadoProyecto = ParseJsom.parsearString(
      elementoItemLista,
      EProyecto.Campos.EstadoProyecto
    );

    this.UsuarioRegistro = ParseJsom.parsearUsuarioMultiple(
      elementoItemLista,
      EProyecto.CamposExpand.UsuarioRegistro
    );

    this.FechaRegistro = ParseJsom.parsearFechaString(
      elementoItemLista,
      EProyecto.Campos.FechaRegistro
    );

    this.Descripcion = ParseJsom.parsearString(
      elementoItemLista,
      EProyecto.Campos.Descripcion
    );

    this.Codigo = ParseJsom.parsearString(
      elementoItemLista,
      EProyecto.Campos.Codigo
    );

    this.Area = ParseJsom.parsearLookup(
      elementoItemLista,
      EProyecto.Campos.Area
    );

    this.UsuarioResponsable = ParseJsom.parsearUsuarioMultiple(
      elementoItemLista,
      EProyecto.CamposExpand.UsuarioResponsable
    );

    this.ID = ParseJsom.parsearNumber(elementoItemLista, EProyecto.Campos.ID);
  }

  public setearValoresRest(elementoItemLista: any) {
    this.ID = RestFiltros.parsearNumero(
      elementoItemLista,
      EProyecto.Campos.ID
    );
    this.NombreProyecto = RestFiltros.parsearTexto(
      elementoItemLista,
      EProyecto.Campos.NombreProyecto
    );
    this.EstadoProyecto = RestFiltros.parsearTexto(
      elementoItemLista,
      EProyecto.Campos.EstadoProyecto
    );
    this.FechaRegistro = RestFiltros.parsearTexto(
      elementoItemLista,
      EProyecto.Campos.FechaRegistro
    );

    this.Descripcion = RestFiltros.parsearTexto(
      elementoItemLista,
      EProyecto.Campos.Descripcion
    );

    this.Codigo = RestFiltros.parsearTexto(
      elementoItemLista,
      EProyecto.Campos.Codigo
    );

    this.UsuarioRegistro = RestFiltros.parsearUsuarios(
      elementoItemLista,
      EProyecto.CamposExpand.UsuarioRegistro
    );

    this.UsuarioResponsable = RestFiltros.parsearUsuarios(
      elementoItemLista,
      EProyecto.CamposExpand.UsuarioResponsable
    );
  }

  public obtenerFiltro(Id: number): FiltroBusqueda[] {
    const filtros: FiltroBusqueda[] = [];

    filtros.push(
      new FiltroBusqueda(TipoFiltro.esIgualLookupId, "ID", Id)
    );

    return filtros;
  }

  public setValoresIniciarImplementacion(
    EstadoProyecto: string,

  ) {
    this.EstadoProyecto = EstadoProyecto;
  }


  public getValoresIniciarImplementacion() {
    return {
      EstadoProyecto: "Pendiente",
    }
  }


  public getValoresValores() {
    return {
      EstadoProyecto: this.EstadoProyecto,
    }
  }



  public ObtenerProyectoDetalle(idProyecto: number): Promise<EProyecto> {
    const dfd: Deferred<EProyecto> = new Deferred<EProyecto>();

    const endPoint = EProyecto.getListaProyectoFiltrado(idProyecto);

    Funciones.ObtenerElementoPorRest(endPoint)
      .then((resultado) => {
        const Result = (resultado as any[]);
        const Listareturn: any = [];

        Result.forEach((element2, i) => {

          const element = new EProyecto;

          element.Codigo = element2.Codigo;
          element.Descripcion = element2.Descripcion;
          element.EstadoProyecto = element2.EstadoProyecto;
          element.FechaRegistro = element2.FechaRegistro;
          element.ID = element2.ID;
          element.UsuarioRegistro = element2.UsuarioRegistro;
          // element.UsuarioResponsable = element2.UsuarioResponsable;
          element.NombreProyecto = element2.NombreProyecto;
          element.Area = new Lookup();
          element.Area = element2.Area;
          element.Area.ID = element2.Area.ID;
          element.Area.Title = element2.Area.Title;

          const UsuarioRegistro = element2.UsuarioRegistro.map((usu: Usuario) => {
            return usu.Title
          })

          // const UsuarioResponsable = element2.UsuarioResponsable.map((usu2: Usuario) => {
          //   return usu2.Title
          // })

          element.UsuarioRegistroMostrar = UsuarioRegistro.join(",");
          // element.UsuarioResponsableMostrar = UsuarioResponsable.join(",");

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
