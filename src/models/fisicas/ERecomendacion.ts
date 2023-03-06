import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { EBaseEntidad } from "src/models/Base/EBaseEntidad";
// import ParseJsom from "src/genericos/ParseJsom";
import Funciones from "../../genericos/Funciones";
import ELookupMultiple from '../logicas/ELookupMultiple';
import { RestFiltros } from "../../genericos/RestFiltros";
import { Deferred } from "ts-deferred";
import Usuario from '../Base/Usuario';
import EArchivoIncidencia from '../logicas/EArchivoIncidencia';
import EObservacion from './EObservacion';
import EProyecto from './EProyecto';
import EComentario from './EComentario';
import EPlanAccion from './EPlanAccion';
import EElementoCombo from 'src/models/logicas/EElementoCombo';
import Util from "src/genericos/Util";

// import Usuario from '../Base/Usuario';


export default class ERecomendacion extends EBaseEntidad {
  public static NombreLista: string = "Recomendacion";

  public static Campos = {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    Title: ParametrosNoAdministrables.ColumnasSitio.Title,
    Codigo: ParametrosNoAdministrables.ColumnasSitio.Codigo,
    Detalle: "Detalle",
    EstadoElemento: ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
    EstadoRecomendacion: "EstadoRecomendacion",
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    Observacion: "Observacion",
    PruebaEfectividad: "PruebaEfectividad",
    UsuarioRegistro: "UsuarioRegistro",
    UsuarioResponsable: "UsuarioResponsable",
    Proyecto: "Proyecto"
  }

  public static CamposExpand = {
    UsuarioRegistro: "UsuarioRegistro",
    UsuarioResponsable: "UsuarioResponsable",
    Observacion: "Observacion",
    Proyecto: "Proyecto"
  }

  public static Fields = [
    "ID",
    "Codigo",
    "Detalle",
    "EstadoElemento",
    "EstadoRecomendacion",
    "FechaRegistro",
    "Observacion",
    "PruebaEfectividad",
    "UsuarioRegistro",
    "UsuarioResponsable",
    "Proyecto"
  ];

  public static getEndPointElementosActivos() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ERecomendacion.Campos);

    const endPointObtenerDivisiones: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      this.NombreLista,
      listaFieldsSelect.join(","),
      RestFiltros.obtenerFiltroPorEstadoActivo()
    );
    return endPointObtenerDivisiones;
  }

  public static async crearCarpetaRecomendacion(
    CodigoProyecto: string, CodigoObservacion: string, IdProyecto: string, CodigoRecomendacion: string
  ): Promise<boolean> {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    Funciones.CrearSubCarpeta(
      "ArchivosProyectos",
      CodigoRecomendacion,
      IdProyecto + "/" + CodigoProyecto + "/" + CodigoObservacion
    )
      .then(resultadoCrearCarpetaPrincipal => {

        Funciones.CrearSubCarpeta(
          "ArchivosProyectos",
          "Comentario",
          IdProyecto + "/" + CodigoProyecto + "/" + CodigoObservacion + "/" + CodigoRecomendacion
        ).then(resultadoCrearCarpetaPrincipal2 => {
          Funciones.CrearSubCarpeta(
            "ArchivosProyectos",
            "PlanAccion",
            IdProyecto + "/" + CodigoProyecto + "/" + CodigoObservacion + "/" + CodigoRecomendacion
          ).then(resultadoCrearCarpetaPrincipal3 => {

            dfd.resolve(true);
          })
        })

      })
      .catch(error => {
        dfd.reject(error)
      });

    return dfd.promise;
  }

  public static getListaRecomendacionFiltrado(idProyecto: number, idUsuario: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ERecomendacion.Campos);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      ERecomendacion.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ERecomendacion.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandUsuario(
        ERecomendacion.CamposExpand.UsuarioResponsable
      ),
      RestFiltros.obtenerFieldExpandLookup(ERecomendacion.CamposExpand.Observacion),
      RestFiltros.obtenerFieldExpandLookup(ERecomendacion.CamposExpand.Proyecto)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    let valorFilter: string = "";
    if (idUsuario === 0) {
      valorFilter = `${ParametrosNoAdministrables.ColumnasSitio.EstadoElemento} eq '${ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo}' and Proyecto/ID eq '${idProyecto}'`;

    } else {
      valorFilter = `${ParametrosNoAdministrables.ColumnasSitio.EstadoElemento} eq '${ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo}' and Proyecto/ID eq '${idProyecto}' and UsuarioResponsable/ID eq '${idUsuario}'`;
    }

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterByID,
      "Recomendacion",
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      valorFilter
    );

    return endPoint;
  }




  public Codigo: string;
  public Detalle: string;
  public EstadoRecomendacion: string;
  public FechaRegistro: Date;
  public UsuarioRegistroId: ELookupMultiple<number>;
  public UsuarioRegistro: Usuario[];
  public ObservacionId: number;
  public ProyectoId: number;
  public UsuarioResponsableId: ELookupMultiple<number>;
  public UsuarioResponsable: Usuario[];
  public EsMostrarPopupEditarRecomendacion: boolean;
  public EsMostrarPopupNuevoComentario: boolean;
  public EsMostrarPopupNuevoPlanAccion: boolean;
  public PruebaEfectividad: boolean;
  public Observacion: EObservacion;
  public ListaArchivos: EArchivoIncidencia[];
  public Proyecto: EProyecto;
  public TotalComentario: number;
  public TotalPlanAccion: number;
  public UsuarioResponsableMostrar: string;


  constructor() {
    super();
    this.ID = 0;
    this.EsMostrarPopupEditarRecomendacion = false;
    this.EsMostrarPopupNuevoComentario = false;
    this.EsMostrarPopupNuevoPlanAccion = false;
    this.ListaArchivos = [];
    this.Observacion = new EObservacion;
    this.Proyecto = new EProyecto;
    this.TotalComentario = 0;
    this.TotalPlanAccion = 0;
    this.UsuarioResponsableMostrar = "";
  }

  public setValoresNuevaRecomendacion(
    Codigo: string,
    Detalle: string,
    EstadoRecomendacion: string,
    UsuarioRegistroId: number[],
    ObservacionId: number,
    ProyectoId: number,
    UsuarioResponsableId: number[],
    PruebaEfectividad: boolean,

  ) {
    this.FechaRegistro = new Date();
    this.Codigo = Codigo;
    this.ProyectoId = ProyectoId;
    this.ObservacionId = ObservacionId;
    this.Detalle = Detalle;
    this.UsuarioRegistroId = new ELookupMultiple<number>(UsuarioRegistroId);
    this.EstadoRecomendacion = EstadoRecomendacion;
    this.UsuarioResponsableId = new ELookupMultiple<number>(UsuarioResponsableId);
    this.PruebaEfectividad = PruebaEfectividad;
  }

  public getValoresNuevaRecomendacion() {
    return {
      FechaRegistro: this.FechaRegistro,
      Codigo: this.Codigo,
      ProyectoId: this.ProyectoId,
      ObservacionId: this.ObservacionId,
      Detalle: this.Detalle,
      UsuarioRegistroId: this.UsuarioRegistroId,
      UsuarioResponsableId: this.UsuarioResponsableId,
      EstadoRecomendacion: this.EstadoRecomendacion,
      PruebaEfectividad: this.PruebaEfectividad
    }
  }

  public setValoresEditarRecomendacion(
    Detalle: string,
    UsuarioResponsableId: number[],
    PruebaEfectividad: boolean,
  ) {
    this.Detalle = Detalle;
    this.UsuarioResponsableId = new ELookupMultiple<number>(UsuarioResponsableId);
    this.PruebaEfectividad = PruebaEfectividad;
  }

  public getValoresEditarRecomendacion() {
    return {

      ObservacionId: this.ObservacionId,
      Detalle: this.Detalle,
      UsuarioResponsableId: this.UsuarioResponsableId,
      PruebaEfectividad: this.PruebaEfectividad,
    }
  }



  public getValoresEliminarRecomendacion() {
    return {
      EstadoElemento: false
    }
  }

  public getValoresFinalizarRecomendacion() {
    return {
      EstadoRecomendacion: "Implementado"
    }
  }


  public setValoresIniciarImplementacion(
    EstadoRecomendacion: string,

  ) {
    this.EstadoRecomendacion = EstadoRecomendacion;

  }
  public getValoresIniciarImplementacion() {
    return {
      EstadoRecomendacion: this.EstadoRecomendacion
    }
  }


  public ObtenerRecomendaciones(idProyecto: number, CodigoProyecto: string, estado: EElementoCombo[], fechaini: string, fechafin: string, esUsuario: boolean, idUsuario: number): Promise<ERecomendacion[]> {
    const dfd: Deferred<ERecomendacion[]> = new Deferred<ERecomendacion[]>();

    let endPoint: string = "";
    if (esUsuario) {
      endPoint = ERecomendacion.getListaRecomendacionFiltrado(idProyecto, idUsuario);
    }
    else {
      endPoint = ERecomendacion.getListaRecomendacionFiltrado(idProyecto, 0);
    }


    const Promises: any = [];

    Promises.push(Funciones.ObtenerElementoPorRest(endPoint));
    Promises.push(Funciones.ObtenerFolderAndFiles("ArchivosProyectos/" + idProyecto.toString(), CodigoProyecto));


    Promise.all(Promises)
      .then(([result1, result2]) => {
        const Result = (result1 as any[]);
        const Listareturn: any = [];
        Result.forEach((element2, i) => {
          if (estado.length === 0) {

            if (fechaini !== "" && fechafin !== "") {

              if (Util.ConvertirStringToDateAuditoriaINI(Util.FormatearDateToddMMYYYY(fechaini))
                <= Util.ConvertirStringToDateAuditoriaINI(Util.ConvertirDateToString(element2.FechaRegistro))
                && Util.ConvertirStringToDateAuditoriaINI(Util.FormatearDateToddMMYYYY(fechafin))
                > Util.ConvertirStringToDateAuditoriaINI(Util.ConvertirDateToString(element2.FechaRegistro))
              ) {
                const element = new ERecomendacion;
                element.ID = element2.ID
                element.Codigo = element2.Codigo;
                element.Detalle = element2.Detalle;
                element.EstadoRecomendacion = element2.EstadoRecomendacion;
                element.FechaRegistro = element2.FechaRegistro;
                element.UsuarioRegistro = element2.UsuarioRegistro;
                element.UsuarioResponsable = element2.UsuarioResponsable;
                element.Observacion.ID = element2.Observacion.ID;
                element.Observacion.Codigo = element2.Observacion.Codigo;
                element.EsMostrarPopupEditarRecomendacion = false;
                element.EsMostrarPopupNuevoComentario = false;
                element.EsMostrarPopupNuevoPlanAccion = false;
                element.PruebaEfectividad = element2.PruebaEfectividad;
                element.Proyecto.ID = element2.Proyecto.ID;
                element.Proyecto.Codigo = element2.Proyecto.Codigo;


                const endPointComentario = EComentario.getListaComentarioFiltrado(element.ID, 0);
                Funciones.ObtenerElementoPorRest(endPointComentario).then(ResultComentario => {
                  element.TotalComentario = ResultComentario.length;

                })

                const endPointPlanAccion = EPlanAccion.getListaComentarioFiltrado(element.ID);
                Funciones.ObtenerElementoPorRest(endPointPlanAccion).then(ResultPA => {
                  element.TotalPlanAccion = ResultPA.length;
                })

                const usuResponsable: string[] = [];
                element2.UsuarioResponsable.forEach((usu: Usuario) => {

                  usuResponsable.push(usu.Title);
                });

                element.UsuarioResponsableMostrar = usuResponsable.join(",");



                const Folders: any = result2;
                for (const nivel1 of Folders.Folders) {
                  if (nivel1.Name === element.Observacion.Codigo) {
                    for (const Nivel2 of nivel1.Folders) {
                      if (Nivel2.Name === element.Codigo) {
                        for (const file of Nivel2.Files) {
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
                  }
                }



                Listareturn.push(element);
              }

            } else {



              const element = new ERecomendacion;
              element.ID = element2.ID
              element.Codigo = element2.Codigo;
              element.Detalle = element2.Detalle;
              element.EstadoRecomendacion = element2.EstadoRecomendacion;
              element.FechaRegistro = element2.FechaRegistro;
              element.UsuarioRegistro = element2.UsuarioRegistro;
              element.UsuarioResponsable = element2.UsuarioResponsable;
              element.Observacion.ID = element2.Observacion.ID;
              element.Observacion.Codigo = element2.Observacion.Codigo;
              element.EsMostrarPopupEditarRecomendacion = false;
              element.EsMostrarPopupNuevoComentario = false;
              element.EsMostrarPopupNuevoPlanAccion = false;
              element.PruebaEfectividad = element2.PruebaEfectividad;
              element.Proyecto.ID = element2.Proyecto.ID;
              element.Proyecto.Codigo = element2.Proyecto.Codigo;

              const endPointComentario = EComentario.getListaComentarioFiltrado(element.ID, 0);
              Funciones.ObtenerElementoPorRest(endPointComentario).then(ResultComentario => {

                element.TotalComentario = ResultComentario.length;
              })

              const endPointPlanAccion = EPlanAccion.getListaComentarioFiltrado(element.ID);
              Funciones.ObtenerElementoPorRest(endPointPlanAccion).then(ResultPA => {


                element.TotalPlanAccion = ResultPA.length;
              })

              const usuResponsable: string[] = [];
              element2.UsuarioResponsable.forEach((usu: Usuario) => {

                usuResponsable.push(usu.Title);
              });

              element.UsuarioResponsableMostrar = usuResponsable.join(",");

              const Folders: any = result2;
              for (const nivel1 of Folders.Folders) {
                if (nivel1.Name === element.Observacion.Codigo) {
                  for (const Nivel2 of nivel1.Folders) {
                    if (Nivel2.Name === element.Codigo) {
                      for (const file of Nivel2.Files) {
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
                }
              }



              Listareturn.push(element);
            }

          } else {

            estado.forEach(estadoItem => {
              if (estadoItem.Title === element2.EstadoRecomendacion) {


                if (fechaini !== "" && fechafin !== "") {

                  if (Util.ConvertirStringToDateAuditoriaINI(Util.FormatearDateToddMMYYYY(fechaini))
                    <= Util.ConvertirStringToDateAuditoriaINI(Util.ConvertirDateToString(element2.FechaRegistro))
                    && Util.ConvertirStringToDateAuditoriaINI(Util.FormatearDateToddMMYYYY(fechafin))
                    > Util.ConvertirStringToDateAuditoriaINI(Util.ConvertirDateToString(element2.FechaRegistro))
                  ) {


                    const element = new ERecomendacion;
                    element.ID = element2.ID
                    element.Codigo = element2.Codigo;
                    element.Detalle = element2.Detalle;
                    element.EstadoRecomendacion = element2.EstadoRecomendacion;
                    element.FechaRegistro = element2.FechaRegistro;
                    element.UsuarioRegistro = element2.UsuarioRegistro;
                    element.UsuarioResponsable = element2.UsuarioResponsable;
                    element.Observacion.ID = element2.Observacion.ID;
                    element.Observacion.Codigo = element2.Observacion.Codigo;
                    element.EsMostrarPopupEditarRecomendacion = false;
                    element.EsMostrarPopupNuevoComentario = false;
                    element.EsMostrarPopupNuevoPlanAccion = false;
                    element.PruebaEfectividad = element2.PruebaEfectividad;
                    element.Proyecto.ID = element2.Proyecto.ID;
                    element.Proyecto.Codigo = element2.Proyecto.Codigo;

                    const endPointComentario = EComentario.getListaComentarioFiltrado(element.ID, 0);
                    Funciones.ObtenerElementoPorRest(endPointComentario).then(ResultComentario => {

                      element.TotalComentario = ResultComentario.length;
                    })
                    const endPointPlanAccion = EPlanAccion.getListaComentarioFiltrado(element.ID);
                    Funciones.ObtenerElementoPorRest(endPointPlanAccion).then(ResultPA => {
                      element.TotalPlanAccion = ResultPA.length;
                    })

                    const usuResponsable: string[] = [];
                    element2.UsuarioResponsable.forEach((usu: Usuario) => {

                      usuResponsable.push(usu.Title);
                    });

                    element.UsuarioResponsableMostrar = usuResponsable.join(",");

                    const Folders: any = result2;
                    for (const nivel1 of Folders.Folders) {
                      if (nivel1.Name === element.Observacion.Codigo) {
                        for (const Nivel2 of nivel1.Folders) {
                          if (Nivel2.Name === element.Codigo) {
                            for (const file of Nivel2.Files) {
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
                      }
                    }
                    Listareturn.push(element);

                  }
                } else {
                  const element = new ERecomendacion;
                  element.ID = element2.ID
                  element.Codigo = element2.Codigo;
                  element.Detalle = element2.Detalle;
                  element.EstadoRecomendacion = element2.EstadoRecomendacion;
                  element.FechaRegistro = element2.FechaRegistro;
                  element.UsuarioRegistro = element2.UsuarioRegistro;
                  element.UsuarioResponsable = element2.UsuarioResponsable;
                  element.Observacion.ID = element2.Observacion.ID;
                  element.Observacion.Codigo = element2.Observacion.Codigo;
                  element.EsMostrarPopupEditarRecomendacion = false;
                  element.EsMostrarPopupNuevoComentario = false;
                  element.EsMostrarPopupNuevoPlanAccion = false;
                  element.PruebaEfectividad = element2.PruebaEfectividad;
                  element.Proyecto.ID = element2.Proyecto.ID;
                  element.Proyecto.Codigo = element2.Proyecto.Codigo;

                  const endPointComentario = EComentario.getListaComentarioFiltrado(element.ID, 0);
                  Funciones.ObtenerElementoPorRest(endPointComentario).then(ResultComentario => {

                    element.TotalComentario = ResultComentario.length;
                  })
                  const endPointPlanAccion = EPlanAccion.getListaComentarioFiltrado(element.ID);
                  Funciones.ObtenerElementoPorRest(endPointPlanAccion).then(ResultPA => {
                    element.TotalPlanAccion = ResultPA.length;
                  })

                  const usuResponsable: string[] = [];
                  element2.UsuarioResponsable.forEach((usu: Usuario) => {

                    usuResponsable.push(usu.Title);
                  });

                  element.UsuarioResponsableMostrar = usuResponsable.join(",");

                  const Folders: any = result2;
                  for (const nivel1 of Folders.Folders) {
                    if (nivel1.Name === element.Observacion.Codigo) {
                      for (const Nivel2 of nivel1.Folders) {
                        if (Nivel2.Name === element.Codigo) {
                          for (const file of Nivel2.Files) {
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
                    }
                  }
                  Listareturn.push(element);

                }
              }
            });
          }
        })
        dfd.resolve(Listareturn);
      }).catch(error => {
        dfd.reject(error);
      });



    return dfd.promise;
  }







}
