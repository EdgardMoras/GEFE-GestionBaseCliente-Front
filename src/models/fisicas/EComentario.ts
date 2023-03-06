import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { EBaseEntidad } from "src/models/Base/EBaseEntidad";
// import ParseJsom from "src/genericos/ParseJsom";
import Funciones from "../../genericos/Funciones";
import ELookupMultiple from '../logicas/ELookupMultiple';
import { RestFiltros } from "../../genericos/RestFiltros";
import { Deferred } from "ts-deferred";
import Usuario from '../Base/Usuario';
import EArchivoIncidencia from '../logicas/EArchivoIncidencia';
// import EObservacion from './EObservacion';
// import EProyecto from './EProyecto';
import ERecomendacion from './ERecomendacion';
// import Usuario from '../Base/Usuario';


export default class EComentario extends EBaseEntidad {
  public static NombreLista: string = "Comentarios";

  public static Campos = {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    Title: ParametrosNoAdministrables.ColumnasSitio.Title,
    Codigo: ParametrosNoAdministrables.ColumnasSitio.Codigo,
    Detalle: "Detalle",
    EstadoElemento: ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    Recomendacion: "Recomendacion",
    PlanAccion: "PlanAccion",
    TipoComentario: "TipoComentario",
    ProponerCierre: "ProponerCierre",
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
  }

  public static CamposExpand = {
    UsuarioRegistro: "UsuarioRegistro",
    PlanAccion: "PlanAccion",
    Recomendacion: "Recomendacion"
  }


  public static getEndPointElementosActivos() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(EComentario.Campos);

    const endPointObtenerDivisiones: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      this.NombreLista,
      listaFieldsSelect.join(","),
      RestFiltros.obtenerFiltroPorEstadoActivo()
    );
    return endPointObtenerDivisiones;
  }

  public static getListaComentarioFiltrado(IdRecomendacion: number, IdPlanAccion: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(EComentario.Campos);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      EComentario.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        EComentario.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandLookup(EComentario.CamposExpand.PlanAccion),
      RestFiltros.obtenerFieldExpandLookup(EComentario.CamposExpand.Recomendacion)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );
    let valorFilter;
    if (IdPlanAccion === 0) {
      valorFilter = `${ParametrosNoAdministrables.ColumnasSitio.EstadoElemento} eq '${ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo}' and Recomendacion/ID eq '${IdRecomendacion}' and PlanAccion eq null`;
    } else {
      valorFilter = `${ParametrosNoAdministrables.ColumnasSitio.EstadoElemento} eq '${ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo}' and Recomendacion/ID eq '${IdRecomendacion}' and PlanAccion/ID eq '${IdPlanAccion}'`;
    }


    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterByID,
      this.NombreLista,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      valorFilter
    );

    return endPoint;
  }

  public static getListaComentarioFiltradoPropuestaCierra(IdRecomendacion: number, IdPlanAccion: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(EComentario.Campos);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      EComentario.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        EComentario.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandLookup(EComentario.CamposExpand.PlanAccion),
      RestFiltros.obtenerFieldExpandLookup(EComentario.CamposExpand.Recomendacion)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );
    let valorFilter;

    valorFilter = `${ParametrosNoAdministrables.ColumnasSitio.EstadoElemento} eq '${ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo}' and Recomendacion/ID eq '${IdRecomendacion}' and PlanAccion/ID eq '${IdPlanAccion}' and ProponerCierre eq '1'`;



    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterByID,
      this.NombreLista,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      valorFilter
    );

    return endPoint;
  }

  public static getListaComentarioFiltradoSolicitudAmpliacion(IdRecomendacion: number, IdPlanAccion: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(EComentario.Campos);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      EComentario.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        EComentario.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandLookup(EComentario.CamposExpand.PlanAccion),
      RestFiltros.obtenerFieldExpandLookup(EComentario.CamposExpand.Recomendacion)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );
    let valorFilter;

    valorFilter = `${ParametrosNoAdministrables.ColumnasSitio.EstadoElemento} eq '${ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo}' and Recomendacion/ID eq '${IdRecomendacion}' and PlanAccion/ID eq '${IdPlanAccion}' and TipoComentario eq 'NuevaFechaCompromiso'`;



    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterByID,
      this.NombreLista,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      valorFilter
    );

    return endPoint;
  }


  public static async crearCarpetaComentario(
    CodigoProyecto: string, CodigoObservacion: string, IdProyecto: string, CodigoRecomendacion: string, CodigoComentario: string
  ): Promise<boolean> {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    Funciones.CrearSubCarpeta(
      "ArchivosProyectos",
      CodigoComentario,
      IdProyecto + "/" + CodigoProyecto + "/" + CodigoObservacion + "/" + CodigoRecomendacion + "/Comentario"
    )
      .then(resultadoCrearCarpetaPrincipal => {
        dfd.resolve(true);
      })
      .catch(error => {
        dfd.reject(error)
      });

    return dfd.promise;
  }


  public static async crearCarpetaComentarioPA(
    CodigoProyecto: string, CodigoObservacion: string, IdProyecto: string, CodigoRecomendacion: string, CodigoComentario: string, CodigoPlanAccion: string
  ): Promise<boolean> {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    Funciones.CrearSubCarpeta(
      "ArchivosProyectos",
      CodigoComentario,
      IdProyecto + "/" + CodigoProyecto + "/" + CodigoObservacion + "/" + CodigoRecomendacion + "/PlanAccion" + "/" + CodigoPlanAccion + "/Comentario"
    )
      .then(resultadoCrearCarpetaPrincipal => {
        dfd.resolve(true);
      })
      .catch(error => {
        dfd.reject(error)
      });

    return dfd.promise;
  }


  public Codigo: string;
  public Detalle: string;
  public FechaRegistro: Date;
  public UsuarioRegistroId: ELookupMultiple<number>;
  public UsuarioRegistro: Usuario[];
  public PlanAccionId: number;
  public RecomendacionId: number;
  public ProponerCierre: boolean;
  public Recomendacion: ERecomendacion;
  public PlanAccion: ERecomendacion;
  public ListaArchivos: EArchivoIncidencia[];
  public TipoComentario: string;


  constructor() {
    super();
    this.ID = 0;
    this.Codigo = "";
    this.ListaArchivos = [];
    this.FechaRegistro = new Date;
    this.ProponerCierre = false;
    this.ListaArchivos = [];
  }

  public setValoresNuevoComentarioRCM(
    Codigo: string,
    Detalle: string,
    UsuarioRegistroId: number[],
    RecomendacionId: number,
    ProponerCierre: boolean,
    TipoComentario: string,

  ) {
    this.FechaRegistro = new Date();
    this.Codigo = Codigo;
    this.RecomendacionId = RecomendacionId;
    this.Detalle = Detalle;
    this.UsuarioRegistroId = new ELookupMultiple<number>(UsuarioRegistroId);
    this.ProponerCierre = ProponerCierre;
    this.TipoComentario = TipoComentario;
    this.Recomendacion = new ERecomendacion;
  }

  public getValoresNuevoComentarioRCM() {
    return {
      FechaRegistro: this.FechaRegistro,
      Codigo: this.Codigo,
      RecomendacionId: this.RecomendacionId,
      Detalle: this.Detalle,
      UsuarioRegistroId: this.UsuarioRegistroId,
      ProponerCierre: this.ProponerCierre,
      TipoComentario: this.TipoComentario,

    }
  }

  public setValoresNuevoComentarioPA(
    Codigo: string,
    Detalle: string,
    UsuarioRegistroId: number[],
    RecomendacionId: number,
    PlanAccionId: number,
    ProponerCierre: boolean,
    TipoComentario: string,

  ) {
    this.FechaRegistro = new Date();
    this.Codigo = Codigo;
    this.PlanAccionId = PlanAccionId;
    this.RecomendacionId = RecomendacionId;
    this.Detalle = Detalle;
    this.UsuarioRegistroId = new ELookupMultiple<number>(UsuarioRegistroId);
    this.ProponerCierre = ProponerCierre;
    this.TipoComentario = TipoComentario;
    this.Recomendacion = new ERecomendacion;
  }

  public getValoresNuevoComentarioPA() {
    return {
      FechaRegistro: this.FechaRegistro,
      Codigo: this.Codigo,
      PlanAccionId: this.PlanAccionId,
      RecomendacionId: this.RecomendacionId,
      Detalle: this.Detalle,
      UsuarioRegistroId: this.UsuarioRegistroId,
      ProponerCierre: this.ProponerCierre,
      TipoComentario: this.TipoComentario,

    }
  }


  public ObtenerComentario(IdProyecto: number, IdRecomendacion: number, IdPlanAccion: number, CodigoObservacion: string, CodigoProyecto: string, CodigoRecomendacion: string, CodigoPlanAccion: string): Promise<EComentario[]> {
    const dfd: Deferred<EComentario[]> = new Deferred<EComentario[]>();

    const endPoint = EComentario.getListaComentarioFiltrado(IdRecomendacion, IdPlanAccion);

    const Promises: any = [];

    Promises.push(Funciones.ObtenerElementoPorRest(endPoint));
    if (IdPlanAccion === 0 && CodigoPlanAccion === "") {
      Promises.push(Funciones.ObtenerFolderAndFiles("ArchivosProyectos/" + IdProyecto.toString() + "/" + CodigoProyecto + "/" + CodigoObservacion + "/" + CodigoRecomendacion, "Comentario"));
    } else {
      Promises.push(Funciones.ObtenerFolderAndFiles("ArchivosProyectos/" + IdProyecto.toString() + "/" + CodigoProyecto + "/" + CodigoObservacion + "/" + CodigoRecomendacion + "/PlanAccion/" + CodigoPlanAccion, "Comentario"));
    }
    Promise.all(Promises)
      .then(([result1, result2]) => {
        const Result = (result1 as any[]);
        const Listareturn: any = [];
        Result.forEach((element2, i) => {

          const element = new EComentario;
          element.ID = element2.ID
          element.Codigo = element2.Codigo;
          element.Detalle = element2.Detalle;
          element.FechaRegistro = element2.FechaRegistro;
          element.UsuarioRegistro = element2.UsuarioRegistro;
          element.Recomendacion = new ERecomendacion;
          element.Recomendacion.ID = element2.Recomendacion.ID;
          element.Recomendacion.Codigo = element2.Recomendacion.Codigo;
          // element.PlanAccion.ID = element2.PlanAccion.ID;
          // element.PlanAccion.Codigo = element2.PlanAccion.Codigo;
          element.ProponerCierre = element2.ProponerCierre;
          element.TipoComentario = element2.TipoComentario;

          const Folders: any = result2;
          for (const nivel1 of Folders.Folders) {
            if (nivel1.Name === element.Codigo) {
              for (const file of nivel1.Files) {
                const archivo: EArchivoIncidencia = new EArchivoIncidencia();
                archivo.setValores(
                  file.ListItemAllFields.ID,
                  file.ListItemAllFields.Title,
                  file.ServerRelativeUrl,
                  file.length
                );

                element.ListaArchivos.push(archivo);
              }
            }
          }



          Listareturn.push(element);

        })

        dfd.resolve(Listareturn);
      }).catch(error => {
        dfd.reject(error);
      });



    return dfd.promise;
  }







}
