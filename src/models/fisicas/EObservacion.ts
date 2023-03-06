import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { EBaseEntidad } from "src/models/Base/EBaseEntidad";
// import ParseJsom from "src/genericos/ParseJsom";
import Funciones from "../../genericos/Funciones";
import ELookupMultiple from '../logicas/ELookupMultiple';
import { RestFiltros } from "../../genericos/RestFiltros";
import { Deferred } from "ts-deferred";
import Usuario from '../Base/Usuario';

export default class EObservacion extends EBaseEntidad {
  public static NombreLista: string = "Observacion";

  public static Campos = {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    Title: ParametrosNoAdministrables.ColumnasSitio.Title,
    Criterio: "Criterio",
    Efecto: "Efecto",
    EstadoElemento: ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
    EstadoObservacion: "EstadoObservacion",
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    Hallazgo: "Hallazgo",
    NivelRiesgo: "NivelRiesgo",
    Proyecto: "Proyecto",
    TipoRiesgo: "TipoRiesgo",
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
    Codigo: "Codigo"
  };

  public static CamposExpand = {
    UsuarioRegistro: "UsuarioRegistro",
    Proyecto: "Proyecto",
  };

  public static Fields = [
    "ID",
    "Criterio",
    "Efecto",
    "FechaRegistro",
    "UsuarioRegistro",
    "EstadoObservacion",
    "EstadoElemento",
    "Hallazgo",
    "NivelRiesgo",
    "Proyecto",
    "TipoRiesgo",
    "Codigo"
  ];


  public static getEndPointElementosActivos() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(EObservacion.Campos);

    const endPointObtenerDivisiones: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      this.NombreLista,
      listaFieldsSelect.join(","),
      RestFiltros.obtenerFiltroPorEstadoActivo()
    );
    return endPointObtenerDivisiones;
  }



  public static async crearCarpetaObservacion(
    CodigoProyecto: string, CodigoObservacion: string, IdProyecto: string
  ): Promise<boolean> {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    Funciones.CrearSubCarpeta(
      "ArchivosProyectos",
      CodigoObservacion,
      IdProyecto + "/" + CodigoProyecto
    )
      .then(resultadoCrearCarpetaPrincipal => {

        dfd.resolve(true);

      })
      .catch(error => {
        dfd.reject(error)
      });

    return dfd.promise;
  }

  public static getListaObservacionesFiltrado(idProyecto: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(EObservacion.Campos);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      EObservacion.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        EObservacion.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandLookup(EObservacion.CamposExpand.Proyecto)

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const valorFilter = `${ParametrosNoAdministrables.ColumnasSitio.EstadoElemento} eq '${ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo}' and Proyecto/ID eq '${idProyecto}'`;

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterByID,
      "Observacion",
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      valorFilter
    );

    return endPoint;
  }


  public EmpresaTexto: string;
  public Criterio: string;
  public Hallazgo: string;
  public Efecto: string;
  public UsuarioRegistroId: ELookupMultiple<number>;
  public NivelRiesgo: string;
  public TipoRiesgo: string;
  public EstadoObservacion: string;
  public Codigo: string;
  public FechaRegistro: Date;
  public ProyectoId: number;
  public UsuarioRegistro: Usuario[];
  public EsMostrarPopupEditarObservacion: boolean;

  constructor() {
    super();
    this.ID = 0;
    this.EsMostrarPopupEditarObservacion = false;
  }



  public setValoresNuevaObservacion(
    Criterio: string,
    Hallazgo: string,
    Efecto: string,
    UsuarioRegistroId: number[],
    NivelRiesgo: string,
    TipoRiesgo: string,
    EstadoObservacion: string,
    Codigo: string,
    ProyectoId: number,
  ) {
    this.Criterio = Criterio;
    this.Hallazgo = Hallazgo;
    this.UsuarioRegistroId = new ELookupMultiple<number>(UsuarioRegistroId);
    this.Efecto = Efecto;
    this.NivelRiesgo = NivelRiesgo;
    this.TipoRiesgo = TipoRiesgo;
    this.EstadoObservacion = EstadoObservacion;
    this.FechaRegistro = new Date();
    this.Codigo = Codigo;
    this.ProyectoId = ProyectoId;
  }

  public getValoresNuevaObservacion() {
    return {
      Criterio: this.Criterio,
      Hallazgo: this.Hallazgo,
      UsuarioRegistroId: this.UsuarioRegistroId,
      Efecto: this.Efecto,
      NivelRiesgo: this.NivelRiesgo,
      TipoRiesgo: this.TipoRiesgo,
      EstadoObservacion: this.EstadoObservacion,
      FechaRegistro: this.FechaRegistro,
      Codigo: this.Codigo,
      ProyectoId: this.ProyectoId,
    }
  }

  public setValoresEditarObservacion(
    Criterio: string,
    Hallazgo: string,
    Efecto: string,
    NivelRiesgo: string,
    TipoRiesgo: string,
  ) {
    this.Criterio = Criterio;
    this.Hallazgo = Hallazgo;
    this.Efecto = Efecto;
    this.NivelRiesgo = NivelRiesgo;
    this.TipoRiesgo = TipoRiesgo;
  }

  public getValoresEditarObservacion() {
    return {
      Criterio: this.Criterio,
      Hallazgo: this.Hallazgo,
      Efecto: this.Efecto,
      NivelRiesgo: this.NivelRiesgo,
      TipoRiesgo: this.TipoRiesgo
    }
  }


  public setValoresIniciarImplementacion(
    EstadoObservacion: string
  ) {
    this.EstadoObservacion = EstadoObservacion;

  }

  public getValoresIniciarImplementacion() {
    return {
      EstadoObservacion: this.EstadoObservacion,
    }
  }


  public getValoresFinalizar() {
    return {
      EstadoObservacion: "Implementado",
    }
  }


  public ObtenerObservaciones(idProyecto: number): Promise<EObservacion[]> {
    const dfd: Deferred<EObservacion[]> = new Deferred<EObservacion[]>();

    const endPoint = EObservacion.getListaObservacionesFiltrado(idProyecto);

    Funciones.ObtenerElementoPorRest(endPoint)
      .then((resultado) => {
        const Result = (resultado as any[]);
        const Listareturn: any = [];

        Result.forEach((element2, i) => {

          const element = new EObservacion;

          element.Codigo = element2.Codigo;
          element.Criterio = element2.Criterio;
          element.Efecto = element2.Efecto;
          element.EstadoObservacion = element2.EstadoObservacion;
          element.FechaRegistro = element2.FechaRegistro;
          element.Hallazgo = element2.Hallazgo;
          element.NivelRiesgo = element2.NivelRiesgo;
          element.TipoRiesgo = element2.TipoRiesgo;
          element.UsuarioRegistro = element2.UsuarioRegistro;
          element.ID = element2.ID
          element.EsMostrarPopupEditarObservacion = false;

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
