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
import EComentario from './EComentario';
import ERecomendacion from './ERecomendacion';
import Util from 'src/genericos/Util'
// import Usuario from '../Base/Usuario';


export default class EPlanAccion extends EBaseEntidad {
  public static NombreLista: string = "PlanAccion";

  public static Campos = {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    Title: ParametrosNoAdministrables.ColumnasSitio.Title,
    Codigo: ParametrosNoAdministrables.ColumnasSitio.Codigo,
    Detalle: "Detalle",
    EstadoElemento: ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    EstadoPlanAccion: "EstadoPlanAccion",
    Recomendacion: "Recomendacion",
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
    UsuarioResponsable: "UsuarioResponsable",
    FechaFin: "FechaFin",
    FechaCompromiso: "FechaCompromiso",
    NuevaFechaCompromiso: "NuevaFechaCompromiso"
  }

  public static CamposExpand = {
    UsuarioRegistro: "UsuarioRegistro",
    UsuarioResponsable: "UsuarioResponsable",
    Recomendacion: "Recomendacion"
  }


  public static getEndPointElementosActivos() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(EPlanAccion.Campos);

    const endPointObtenerDivisiones: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      this.NombreLista,
      listaFieldsSelect.join(","),
      RestFiltros.obtenerFiltroPorEstadoActivo()
    );
    return endPointObtenerDivisiones;
  }

  public static getListaComentarioFiltrado(IdRecomendacion: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(EPlanAccion.Campos);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      EPlanAccion.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        EPlanAccion.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandUsuario(EPlanAccion.CamposExpand.UsuarioResponsable),
      RestFiltros.obtenerFieldExpandLookup(EPlanAccion.CamposExpand.Recomendacion)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );
    let valorFilter;

    valorFilter = `${ParametrosNoAdministrables.ColumnasSitio.EstadoElemento} eq '${ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo}' and Recomendacion/ID eq '${IdRecomendacion}'`;



    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterByID,
      this.NombreLista,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      valorFilter
    );

    return endPoint;
  }

  public static getListaPlanxProyecto(IdProyecto: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(EPlanAccion.Campos);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      EPlanAccion.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        EPlanAccion.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandUsuario(EPlanAccion.CamposExpand.UsuarioResponsable),
      RestFiltros.obtenerFieldExpandLookup(EPlanAccion.CamposExpand.Recomendacion)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );
    let valorFilter;

    valorFilter = `${ParametrosNoAdministrables.ColumnasSitio.EstadoElemento} eq '${ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo}' and Proyecto/ID eq '${IdProyecto}'`;



    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterByID,
      this.NombreLista,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      valorFilter
    );

    return endPoint;
  }


  public static async crearCarpetaPlanAccion(id: string): Promise<boolean> {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    Funciones.CrearCarpeta(
      "Archivos",
      id
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
  public UsuarioResponsable: Usuario[];
  public PlanAccionId: number;
  public RecomendacionId: number;
  public Recomendacion: ERecomendacion;
  public PlanAccion: ERecomendacion;
  public ListaArchivos: EArchivoIncidencia[];
  public EstadoPlanAccion: string;
  public FechaCompromiso: Date | null;
  public UsuarioResponsableId: ELookupMultiple<number>;
  public EsMostrarPopupEditarPA: boolean;
  public EsMostrarPopupNuevoComentario: boolean;
  public EsMostrarPopupRegistrarAvanceImplementacion: boolean;
  public EsMostrarPopupAprobarPropuestaCierre: boolean;
  public EsMostrarPopupSolicitarAmpliacion: boolean;
  public EsMostrarPopupAprobarSolicitudAmpliacion: boolean;
  public FechaFin: Date;
  public TotalComentario: number;
  public NuevaFechaCompromiso: Date;
  public UsuarioResponsableMostrar: string;
  public ProyectoId: number;

  constructor() {
    super();
    this.ID = 0;
    this.Codigo = "";
    this.ListaArchivos = [];
    this.FechaRegistro = new Date;
    this.ListaArchivos = [];
    this.EstadoPlanAccion = "";
    this.EsMostrarPopupNuevoComentario = false;
    this.TotalComentario = 0;
    this.EsMostrarPopupEditarPA = false;
    this.EsMostrarPopupRegistrarAvanceImplementacion = false;
    this.EsMostrarPopupAprobarPropuestaCierre = false;
    this.EsMostrarPopupSolicitarAmpliacion = false;
    this.EsMostrarPopupAprobarSolicitudAmpliacion = false;
    this.UsuarioResponsableMostrar = "";
  }

  public setValoresNuevoPlanAccion(
    Codigo: string,
    Detalle: string,
    UsuarioRegistroId: number[],
    RecomendacionId: number,
    EstadoPlanAccion: string,
    FechaCompromiso: Date | null,
    UsuarioResponsableId: number[],
    ProyectoId: number,

  ) {
    this.Codigo = Codigo;
    this.Detalle = Detalle;
    this.UsuarioRegistroId = new ELookupMultiple<number>(UsuarioRegistroId);
    this.RecomendacionId = RecomendacionId;
    this.EstadoPlanAccion = EstadoPlanAccion;
    this.FechaRegistro = new Date();
    this.FechaCompromiso = FechaCompromiso;
    this.UsuarioResponsableId = new ELookupMultiple<number>(UsuarioResponsableId);
    this.ProyectoId = ProyectoId;

  }

  public getValoresNuevoPlanAccion() {
    return {
      Codigo: this.Codigo,
      Detalle: this.Detalle,
      UsuarioRegistroId: this.UsuarioRegistroId,
      RecomendacionId: this.RecomendacionId,
      EstadoPlanAccion: this.EstadoPlanAccion,
      FechaRegistro: this.FechaRegistro,
      FechaCompromiso: this.FechaCompromiso,
      UsuarioResponsableId: this.UsuarioResponsableId,
      FechaCompromisoTexto: Util.ConvertirDateToString(this.FechaCompromiso!),
      ProyectoId: this.ProyectoId,

    }
  }

  public setValoresEditarPlanAccion(
    Detalle: string,
    UsuarioResponsableId: number[],
    FechaCompromiso: Date | null,

  ) {
    this.Detalle = Detalle;
    this.UsuarioResponsableId = new ELookupMultiple<number>(UsuarioResponsableId);
    this.FechaCompromiso = FechaCompromiso;
  }

  public getValoresEditarPlanAccion() {
    return {
      Detalle: this.Detalle,
      UsuarioResponsableId: this.UsuarioResponsableId,
      FechaCompromiso: this.FechaCompromiso,
      FechaCompromisoTexto: Util.ConvertirDateToString(this.FechaCompromiso!)
    }
  }


  public getValoresEliminarPlanAccion() {
    return {
      EstadoElemento: false,
    }
  }

  public getValoresProponerCierrePlanAccion() {
    return {
      EstadoPlanAccion: "Implementado por revisar",
    }
  }

  public getValoresAprobarPropuestadecierrePlanAccion() {
    return {
      EstadoPlanAccion: "Implementado",
      FechaFin: new Date()
    }
  }

  public getValoresRechazarPropuestadecierrePlanAccion() {
    return {
      EstadoPlanAccion: "En Proceso",
    }
  }


  public setValoresAmpliacionPlanAccion(
    NuevaFechaCompromiso: Date,

  ) {
    this.NuevaFechaCompromiso = NuevaFechaCompromiso;
  }


  public getValoresAmpliacionPlanAccion() {
    return {
      EstadoPlanAccion: "En Ampliación",
      NuevaFechaCompromiso: this.NuevaFechaCompromiso
    }
  }

  public setValoresAprobarAmpliacionPlanAccion(
    FechaCompromiso: Date,

  ) {
    this.FechaCompromiso = FechaCompromiso;
  }
  public getValoresAprobarSolicitudAmpliacionPlanAccion() {
    return {
      EstadoPlanAccion: "En Proceso",
      FechaCompromiso: this.FechaCompromiso
    }
  }



  public setValoresIniciarImplementacion(
    EstadoPlanAccion: string,

  ) {
    this.EstadoPlanAccion = EstadoPlanAccion;

  }
  public getValoresIniciarImplementacion() {
    return {
      EstadoPlanAccion: this.EstadoPlanAccion
    }
  }


  public ObtenerPlanAccion(IdProyecto: number, IdRecomendacion: number,
    CodigoObservacion: string, CodigoProyecto: string, CodigoRecomendacion: string): Promise<EPlanAccion[]> {
    const dfd: Deferred<EPlanAccion[]> = new Deferred<EPlanAccion[]>();

    const endPoint = EPlanAccion.getListaComentarioFiltrado(IdRecomendacion);

    const Promises: any = [];

    Promises.push(Funciones.ObtenerElementoPorRest(endPoint));

    Promises.push(Funciones.ObtenerFolderAndFiles("ArchivosProyectos/" + IdProyecto.toString() + "/" + CodigoProyecto + "/" + CodigoObservacion + "/" + CodigoRecomendacion, "PlanAccion"));


    Promise.all(Promises)
      .then(([result1, result2]) => {
        const Result = (result1 as any[]);
        const Listareturn: any = [];
        Result.forEach((element2, i) => {

          const element = new EPlanAccion;
          element.ID = element2.ID
          element.Codigo = element2.Codigo;
          element.Detalle = element2.Detalle;
          element.FechaRegistro = element2.FechaRegistro;
          element.UsuarioRegistro = element2.UsuarioRegistro;
          element.UsuarioResponsable = element2.UsuarioResponsable;
          element.Recomendacion = new ERecomendacion;
          element.Recomendacion.ID = element2.Recomendacion.ID;
          element.Recomendacion.Codigo = element2.Recomendacion.Codigo;
          element.EstadoPlanAccion = element2.EstadoPlanAccion;
          element.FechaCompromiso = element2.FechaCompromiso;
          element.EsMostrarPopupNuevoComentario = false;
          element.EsMostrarPopupEditarPA = false;
          element.EsMostrarPopupRegistrarAvanceImplementacion = false;
          element.EsMostrarPopupAprobarPropuestaCierre = false;
          element.FechaFin = element2.FechaFin;
          element.NuevaFechaCompromiso = element2.NuevaFechaCompromiso;
          element.EsMostrarPopupSolicitarAmpliacion = false;
          element.EsMostrarPopupAprobarSolicitudAmpliacion = false;

          const usuResponsable: string[] = [];
          element2.UsuarioResponsable.forEach((usu: Usuario) => {

            usuResponsable.push(usu.Title);
          });

          element.UsuarioResponsableMostrar = usuResponsable.join(",");


          const endPointComentario = EComentario.getListaComentarioFiltrado(element.Recomendacion.ID, element.ID);
          Funciones.ObtenerElementoPorRest(endPointComentario).then(ResultComentario => {

            element.TotalComentario = ResultComentario.length;
          })

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



  public ObtenerPlanAccionBandeja(IdProyecto: number): Promise<EPlanAccion[]> {
    const dfd: Deferred<EPlanAccion[]> = new Deferred<EPlanAccion[]>();

    const endPoint = EPlanAccion.getListaPlanxProyecto(IdProyecto);

    const Promises: any = [];

    Promises.push(Funciones.ObtenerElementoPorRest(endPoint));

    Promise.all(Promises)
      .then(([result1]) => {
        const Result = (result1 as any[]);
        const Listareturn: any = [];
        Result.forEach((element2, i) => {

          const element = new EPlanAccion;
          element.ID = element2.ID
          element.Codigo = element2.Codigo;
          element.Detalle = element2.Detalle;
          element.FechaRegistro = element2.FechaRegistro;
          element.UsuarioRegistro = element2.UsuarioRegistro;
          element.UsuarioResponsable = element2.UsuarioResponsable;
          element.Recomendacion = new ERecomendacion;
          element.Recomendacion.ID = element2.Recomendacion.ID;
          element.Recomendacion.Codigo = element2.Recomendacion.Codigo;
          element.EstadoPlanAccion = element2.EstadoPlanAccion;
          element.FechaCompromiso = element2.FechaCompromiso;
          element.EsMostrarPopupNuevoComentario = false;
          element.EsMostrarPopupEditarPA = false;
          element.EsMostrarPopupRegistrarAvanceImplementacion = false;
          element.EsMostrarPopupAprobarPropuestaCierre = false;
          element.FechaFin = element2.FechaFin;
          element.NuevaFechaCompromiso = element2.NuevaFechaCompromiso;
          element.EsMostrarPopupSolicitarAmpliacion = false;
          element.EsMostrarPopupAprobarSolicitudAmpliacion = false;

          const usuResponsable: string[] = [];
          element2.UsuarioResponsable.forEach((usu: Usuario) => {

            usuResponsable.push(usu.Title);
          });

          element.UsuarioResponsableMostrar = usuResponsable.join(",");


          Listareturn.push(element);

        })

        dfd.resolve(Listareturn);
      }).catch(error => {
        dfd.reject(error);
      });



    return dfd.promise;
  }







}
