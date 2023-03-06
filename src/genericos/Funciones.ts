import axios, { AxiosResponse } from "axios";
import {
  Web,
  ItemAddResult,
  ItemUpdateResult,
  ODataDefaultParser
} from "sp-pnp-js/lib/pnp";
import { loadPageContext } from "sp-rest-proxy/dist/utils/env";
import { Deferred } from "ts-deferred";
import { ResultadoJsom } from "src/genericos/ResultadoJsom";
import Usuario from "../models/Base/Usuario";
import Util from "src/genericos/Util";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { EBaseEntidad } from "src/models/Base/EBaseEntidad";
import EMaestro from "src/models/fisicas/EMaestro";
import ETipoDirectiva from "../models/fisicas/ETipoDirectiva";
import EGestionDirectiva from "../models/fisicas/EGestionDirectiva";
import EArchivoNota from "src/models/logicas/EArchivoNota";
import EElementoPeoplePicker from "../models/logicas/EElementoPeoplePicker";
import EArea from "src/models/fisicas/EEmpresa_2";
import EDivision from "src/models/fisicas/EDivision";
import EFeriado from "src/models/fisicas/EFeriado";
import pnp from "sp-pnp-js";
import EArchivoNotaExpedienteReporte from "src/models/logicas/EArchivoNotaExpedienteReporte";
import EArchivoTareaExpedienteReporte from "src/models/logicas/EArchivoTareaExpedienteReporte";
import EArchivoComentarioTareaExpedienteReporte from "src/models/logicas/EArchivoComentarioTareaExpedienteReporte";
import EArchivoSolicitudAmpliacionExpedienteReporte from "src/models/logicas/EArchivoSolicitudAmpliacionExpedienteReporte";
import EArchivoAtencionExpedienteReporte from "src/models/logicas/EArchivoAtencionExpedienteReporte";
import ETipoPregunta from "src/models/fisicas/ETipoPregunta";
import EPlantillaTipoPreguntaEncuesta from "src/models/fisicas/EPlantillaTipoPreguntaEncuesta";
import ERespuestaPreguntaEncuesta from "src/models/logicas/ERespuestaPreguntaEncuesta";
import EEmpresa from "src/models/fisicas/EEmpresa";
import EEntidad from "src/models/fisicas/EEntidad";

export default class Funciones {
  public static obtenerListaCampos(objetoKeyValue: {}) {
    const listaCampos = Object.keys(objetoKeyValue).map(key => {
      return key;
    });

    return listaCampos;
  }

  public static obtenerElementosListaConPaginasJSOM(
    nombreLista: string,
    viewQuery: string,
    position: any
  ) {
    const dfd: Deferred<ResultadoJsom> = new Deferred<ResultadoJsom>();

    const context: SP.ClientContext = new SP.ClientContext();
    const list: SP.List = context
      .get_web()
      .get_lists()
      .getByTitle(nombreLista);

    const query = new SP.CamlQuery();
    query.set_viewXml(viewQuery);
    query.set_listItemCollectionPosition(position);
    const collListItem = list.getItems(query);
    context.load(collListItem);

    context.executeQueryAsync(
      (sender: any, args: SP.ClientRequestSucceededEventArgs): void => {
        const listEnumerator: IEnumerator<
          SP.ListItem
        > = collListItem.getEnumerator();
        const listItemCollectionPosition = collListItem.get_listItemCollectionPosition();
        const resultadoJsom = new ResultadoJsom(
          listEnumerator,
          listItemCollectionPosition
        );
        dfd.resolve(resultadoJsom);
      },
      (sender: any, args: SP.ClientRequestFailedEventArgs): void => {
        dfd.reject(
          args.get_message() + ". StackTrace: " + args.get_stackTrace()
        );
      }
    );

    return dfd.promise;
  }

  public static AdjuntarArchivoRaiz(
    nombreLista: string,
    file: any,
    datos: {},
    nombre: string
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        const ruta: string = `${
          _spPageContextInfo.webServerRelativeUrl
          }/${nombreLista}`;

        const nombreArchivo = nombre;

        if (file.size <= 5485760) {
          // small upload
          web
            .getFolderByServerRelativeUrl(ruta)
            .files.add(nombreArchivo, file, true)
            .then(f => {
              f.file.getItem().then(item => {
                item.update(datos).then(result => {
                  d.resolve(result);
                });
              });
            })
            .catch((errorResult: any) => {
              d.reject(errorResult.data.responseBody["odata.error"]);
            });
        } else {
          // large upload
          web
            .getFolderByServerRelativeUrl(ruta)
            .files.addChunked(
              nombreArchivo,
              file,
              datosProgresoCarga => {
                console.dir(datosProgresoCarga);
              },
              true
            )
            .then(f => {
              web
                .getFolderByServerRelativeUrl(
                  ruta + "/" + nombreArchivo
                )
                .getItem()
                .then(item => {
                  item
                    .update(datos)
                    .then(result => {
                      d.resolve(result);
                    })
                    .catch((errorResult: any) => {
                      d.reject(errorResult);
                    });
                });
            })
            .catch((errorResult: any) => {
              d.reject(errorResult);
            });
        }
      })
      .catch((errorResult: any) => {
        d.reject(errorResult);
      });

    return d.promise;
  }
  public static actualizarElementosListaConJSOM(
    nombreLista: string,
    viewQuery: string,
    columna: string,
    valor: any
  ) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    const context: SP.ClientContext = new SP.ClientContext();
    const list: SP.List = context
      .get_web()
      .get_lists()
      .getByTitle(nombreLista);

    const query = new SP.CamlQuery();
    query.set_viewXml(viewQuery);
    const collListItem = list.getItems(query);
    context.load(collListItem);

    context.executeQueryAsync(
      (sender: any, args: SP.ClientRequestSucceededEventArgs): void => {
        const listEnumerator: IEnumerator<
          SP.ListItem
        > = collListItem.getEnumerator();
        const itemArray = [];

        while (listEnumerator.moveNext()) {
          const item: SP.ListItem = listEnumerator.get_current();
          item.set_item(columna, valor);
          item.update();

          itemArray.push(item);
          context.load(itemArray[itemArray.length - 1]);
        }

        context.executeQueryAsync(
          (sender2: any, args2: SP.ClientRequestSucceededEventArgs): void => {
            dfd.resolve(true);
          },
          (sender3: any, args3: SP.ClientRequestFailedEventArgs): void => {
            dfd.reject(
              args3.get_message() + ". StackTrace: " + args3.get_stackTrace()
            );
          }
        );
      },
      (sender: any, args: SP.ClientRequestFailedEventArgs): void => {
        dfd.reject(
          args.get_message() + ". StackTrace: " + args.get_stackTrace()
        );
      }
    );

    return dfd.promise;
  }

  public static obtenerTodosGruposSharepoint() {
    const dfd: Deferred<EBaseEntidad[]> = new Deferred<EBaseEntidad[]>();

    const listaGruposTodosGrupos: EBaseEntidad[] = [];
    const context = new SP.ClientContext();
    const grupos = context.get_web().get_siteGroups();
    context.load(grupos);

    context.executeQueryAsync(
      (sender: any, args: SP.ClientRequestSucceededEventArgs): void => {
        const TodosGroupsEnumerator = grupos.getEnumerator();

        while (TodosGroupsEnumerator.moveNext()) {
          const group = TodosGroupsEnumerator.get_current();
          const entidad = new EBaseEntidad();
          entidad.ID = group.get_id();
          entidad.Title = group.get_title();
          listaGruposTodosGrupos.push(entidad);
        }

        dfd.resolve(listaGruposTodosGrupos);
      },
      (sender: any, args: SP.ClientRequestFailedEventArgs): void => {
        dfd.reject(
          args.get_message() + ". StackTrace: " + args.get_stackTrace()
        );
      }
    );

    return dfd.promise;
  }

  public static obtenerGruposPerteneceUsuario(
    idUsuario: number,
    listaGruposPerteneceUsuario: EBaseEntidad[],
    listaGruposTodosGrupos: EBaseEntidad[]
  ) {
    const dfd: Deferred<EBaseEntidad[]> = new Deferred<EBaseEntidad[]>();

    const context = new SP.ClientContext();
    const grupos = context.get_web().get_siteGroups();
    const user = context
      .get_web()
      .get_siteUsers()
      .getById(idUsuario);
    context.load(grupos);
    context.load(user);

    const userGroups = user.get_groups();
    context.load(userGroups);

    context.executeQueryAsync(
      (sender: any, args: SP.ClientRequestSucceededEventArgs): void => {
        const TodosGroupsEnumerator = grupos.getEnumerator();
        const groupsEnumerator = userGroups.getEnumerator();

        while (TodosGroupsEnumerator.moveNext()) {
          const group = TodosGroupsEnumerator.get_current();
          const entidad = new EBaseEntidad();
          entidad.ID = group.get_id();
          entidad.Title = group.get_title();
          listaGruposTodosGrupos.push(entidad);
        }

        while (groupsEnumerator.moveNext()) {
          const group = groupsEnumerator.get_current();
          const entidad = new EBaseEntidad();
          entidad.ID = group.get_id();
          entidad.Title = group.get_title();
          listaGruposPerteneceUsuario.push(entidad);
        }

        dfd.resolve(listaGruposPerteneceUsuario);
      },
      (sender: any, args: SP.ClientRequestFailedEventArgs): void => {
        dfd.reject(
          args.get_message() + ". StackTrace: " + args.get_stackTrace()
        );
      }
    );

    return dfd.promise;
  }

  public static obtenerUsuariosPertenecenGrupo(idGrupo: number) {
    const dfd: Deferred<Usuario[]> = new Deferred<Usuario[]>();

    const context = new SP.ClientContext();
    const collGroup = context.get_web().get_siteGroups();
    const group = collGroup.getById(idGrupo);
    context.load(group);

    const groupUsers = group.get_users();
    context.load(groupUsers);

    context.executeQueryAsync(
      (sender: any, args: SP.ClientRequestSucceededEventArgs): void => {
        const listaUsuarios: Usuario[] = [];
        const groupUserEnumerator = groupUsers.getEnumerator();

        while (groupUserEnumerator.moveNext()) {
          const groupUser = groupUserEnumerator.get_current();
          const usuario = new Usuario();
          usuario.setearValores(
            groupUser.get_id(),
            groupUser.get_title(),
            groupUser.get_email()
          );

          listaUsuarios.push(usuario);
        }

        dfd.resolve(listaUsuarios);
      },
      (sender: any, args: SP.ClientRequestFailedEventArgs): void => {
        dfd.reject(
          args.get_message() + ". StackTrace: " + args.get_stackTrace()
        );
      }
    );

    return dfd.promise;
  }

  public static async CargarEntidadMaestra(): Promise<EMaestro> {
    const d: Deferred<EMaestro> = new Deferred<EMaestro>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<Eq><FieldRef Name="EstadoElemento" /><Value Type="Text">Activo</Value></Eq>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="Title" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name="ID" /><FieldRef Name="Title" /><FieldRef Name="' +
      ETipoDirectiva.Campos.TipoFlujoDirectiva +
      '" /><FieldRef Name="' +
      EGestionDirectiva.Campos.EsAdministrador +
      '" /><FieldRef Name="' +
      ParametrosNoAdministrables.ColumnasSitio.EstadoElemento +
      '" /><FieldRef Name="ContentType" /><FieldRef Name="ContentTypeId" />' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(ParametrosNoAdministrables.Listas.ListaMaestros)
          .renderListData(viewQuery)
          .then(data => {
            const maestros = new EMaestro();

            data.Row.forEach(ent => {
              const item = new EBaseEntidad();
              item.setearValoresItem(ent);

              if (
                ent.ContentType ===
                ParametrosNoAdministrables.TiposContenido.Destinatario
              ) {
                maestros.ListaDestinatario.push(item);
              } else if (
                ent.ContentType ===
                ParametrosNoAdministrables.TiposContenido.Empresa
              ) {
                const empresa: EEmpresa = new EEmpresa();
                empresa.setearValoresConRest(ent);
                maestros.ListaEmpresa.push(empresa);
              } else if (
                ent.ContentType ===
                ParametrosNoAdministrables.TiposContenido.Entidad
              ) {
                const entidad: EEntidad = new EEntidad();
                entidad.setearValoresConRest(ent);
                maestros.ListaEntidad.push(entidad);
              } else if (
                ent.ContentType ===
                ParametrosNoAdministrables.TiposContenido.TipoEnvio
              ) {
                maestros.ListaTipoEnvio.push(item);
              } else if (
                ent.ContentType ===
                ParametrosNoAdministrables.TiposContenido.Alcance
              ) {
                maestros.ListaAlcance.push(item);
              } else if (
                ent.ContentType ===
                ParametrosNoAdministrables.TiposContenido.Evaluacion
              ) {
                maestros.ListaEvaluacion.push(item);
              } else if (
                ent.ContentType ===
                ParametrosNoAdministrables.TiposContenido.Area
              ) {
                const area: EArea = new EArea();
                area.setearValoresItem(ent);
                maestros.ListaAreas.push(area);
              } else if (
                ent.ContentType ===
                ParametrosNoAdministrables.TiposContenido.Division
              ) {
                const division: EDivision = new EDivision();
                division.setearValoresItem(ent);
                maestros.ListaDivisiones.push(division);
              } else if (
                ent.ContentType ===
                ParametrosNoAdministrables.TiposContenido.TipoDirectiva
              ) {
                const tipoDirectiva: ETipoDirectiva = new ETipoDirectiva();
                tipoDirectiva.setearValoresItem(ent);
                maestros.ListaTipoDirectiva.push(tipoDirectiva);
              } else if (
                ent.ContentType ===
                ParametrosNoAdministrables.TiposContenido.GestionDirectiva
              ) {
                const gestionDirectiva: EGestionDirectiva = new EGestionDirectiva();
                gestionDirectiva.setearValoresItem(ent);
                maestros.ListaGestionDirectivas.push(gestionDirectiva);
              }
            });

            maestros.ListaEstadoSolicitudReporte =
              ParametrosNoAdministrables.ListaEstadoSolicitudReporte;
            maestros.ListaEstadoReporte =
              ParametrosNoAdministrables.ListaEstadoReporte;
            maestros.ListaEstadoExpedienteReporte =
              ParametrosNoAdministrables.ListaEstadoExpedienteReporte;
            maestros.ListaMeses = ParametrosNoAdministrables.ListaMeses;
            maestros.ListaFrecuencia =
              ParametrosNoAdministrables.ListaFrecuencia;
            maestros.ListaTipoReporte =
              ParametrosNoAdministrables.ListaTipoReporte;
            maestros.ListaTipoSolicitud =
              ParametrosNoAdministrables.ListaTipoSolicitud;
            maestros.ListaTipoDia = ParametrosNoAdministrables.ListaTipoDia;
            maestros.ListaTipoPeriodo =
              ParametrosNoAdministrables.ListaTipoPeriodo;
            maestros.ListaDias = ParametrosNoAdministrables.ListaDias;
            maestros.ListaSemanas = ParametrosNoAdministrables.ListaSemanas;
            maestros.ListaPeriodosFrecuencia =
              ParametrosNoAdministrables.ListaPeriodoFrecuencia;

            d.resolve(maestros);
          })
          .catch((errorResult: any) => {
            d.reject(errorResult);
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async CargarEntidadMaestraSinFiltroEstado(): Promise<EMaestro> {
    const d: Deferred<EMaestro> = new Deferred<EMaestro>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      "</Where>" +
      '<OrderBy><FieldRef Name="Title" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name="ID" /><FieldRef Name="Title" /><FieldRef Name="' +
      ParametrosNoAdministrables.ColumnasSitio.EstadoElemento +
      '" />' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle("ADM_Area")
          .renderListData(viewQuery)
          .then(data => {
            const maestros = new EMaestro();

            data.Row.forEach(ent => {
              const item = new EBaseEntidad();
              item.setearValoresItem(ent);

              const empresa: EEmpresa = new EEmpresa();
              empresa.setearValoresConRest(ent);
              maestros.ListaEmpresa.push(empresa);

            })
            d.resolve(maestros);
          })
          .catch((errorResult: any) => {
            d.reject(errorResult);
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async CargarEntidadPlantillaTipoPreguntaEncuesta(): Promise<
    EPlantillaTipoPreguntaEncuesta[]
  > {
    const d: Deferred<EPlantillaTipoPreguntaEncuesta[]> = new Deferred<
      EPlantillaTipoPreguntaEncuesta[]
    >();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<Eq><FieldRef Name="Title" /><Value Type="Text">Plantilla</Value></Eq>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="TipoPregunta" Ascending="True" /><FieldRef Name="Orden" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name="ID" /><FieldRef Name="Title" /><FieldRef Name="Respuesta" /><FieldRef Name="Puntaje" /><FieldRef Name="Orden" /><FieldRef Name="TipoPregunta" />' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(
            ParametrosNoAdministrables.Listas.PlantillaTipoPreguntaEncuesta
          )
          .renderListData(viewQuery)
          .then(data => {
            const ItemsPlantillaTipoPregunta: EPlantillaTipoPreguntaEncuesta[] = [];

            data.Row.forEach(ent => {
              const item = new EPlantillaTipoPreguntaEncuesta();
              item.obtenerDatos(ent);
              ItemsPlantillaTipoPregunta.push(item);
            });

            d.resolve(ItemsPlantillaTipoPregunta);
          })
          .catch((errorResult: any) => {
            d.reject(errorResult);
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async CargarEntidadTipoPreguntaEncuesta(): Promise<
    ETipoPregunta[]
  > {
    const d: Deferred<ETipoPregunta[]> = new Deferred<ETipoPregunta[]>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<Eq><FieldRef Name="EstadoElemento" /><Value Type="Text">Activo</Value></Eq>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="Orden" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name="ID" /><FieldRef Name="Title" /><FieldRef Name="AplicaTextoMenorMayor" /><FieldRef Name="TextoMenorValor" /><FieldRef Name="TextoMayorValor" />' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(ParametrosNoAdministrables.Listas.TipoPregunta)
          .renderListData(viewQuery)
          .then(data => {
            const ItemsTipoPregunta: ETipoPregunta[] = [];

            data.Row.forEach(ent => {
              const item = new ETipoPregunta();
              item.obtenerDatos(ent);
              ItemsTipoPregunta.push(item);
            });

            d.resolve(ItemsTipoPregunta);
          })
          .catch((errorResult: any) => {
            d.reject(errorResult);
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async CargarListaReportes(): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<IsNotNull><FieldRef Name="CodigoReporte" /></IsNotNull>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="CodigoReporte" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name = "ID" /><FieldRef Name = "Title" /><FieldRef Name = "CodigoReporte" />' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(ParametrosNoAdministrables.Listas.Reportes)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.CodigoReporte
              });
              elementos.push({
                ID: ent.ID,
                Title: ent.Title
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(errorResult);
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async CargarListaReportesConVersiones(): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<IsNotNull><FieldRef Name="CodigoReporte" /></IsNotNull>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="CodigoReporte" Ascending="True" /><FieldRef Name="Version" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name = "ID" /><FieldRef Name = "Title" /><FieldRef Name = "CodigoReporte" /><FieldRef Name = "Version" />' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(ParametrosNoAdministrables.Listas.Reportes)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.CodigoReporte + " - " + ent.Version
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(errorResult);
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async CargarListaSolicitudesReportes(): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      "<And>" +
      '<IsNotNull><FieldRef Name="CodigoReporte" /></IsNotNull>' +
      '<IsNotNull><FieldRef Name="TituloReporte" /></IsNotNull>' +
      "</And>" +
      "</Where>" +
      '<OrderBy><FieldRef Name="CodigoReporte" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name = "ID" /><FieldRef Name = "TituloReporte" /><FieldRef Name = "CodigoReporte" />' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(ParametrosNoAdministrables.Listas.SolicitudesReporte)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.CodigoReporte
              });
              elementos.push({
                ID: ent.ID,
                Title: ent.TituloReporte
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(errorResult);
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async CargarEntidadNorma(): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<IsNotNull><FieldRef Name="Codigo" /></IsNotNull>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="Codigo" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name = "ID" /><FieldRef Name = "NumeroNorma" /><FieldRef Name = "Entidad" />' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(ParametrosNoAdministrables.Listas.Normas)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.NumeroNorma + " | " + Util.ObtenerLookup(ent.Entidad).Title
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(errorResult);
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async CargarListaNormas(): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<IsNotNull><FieldRef Name="Codigo" /></IsNotNull>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="Codigo" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name = "ID" /><FieldRef Name = "NumeroNorma" /><FieldRef Name = "Entidad" />' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(ParametrosNoAdministrables.Listas.Normas)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.NumeroNorma + " | " + Util.ObtenerLookup(ent.Entidad).Title
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(errorResult);
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async CargarListaEncuestas(): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<IsNotNull><FieldRef Name="CodigoEncuesta" /></IsNotNull>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="CodigoEncuesta" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name = "ID" /><FieldRef Name = "CodigoEncuesta" />' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(ParametrosNoAdministrables.Listas.Encuestas)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.CodigoEncuesta
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(errorResult);
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static CargarEntidadMaestraUsuarios(
    nombreLista: string
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<Eq><FieldRef Name="Habilitado" /><Value Type="bool">1</Value></Eq>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="Usuario" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name = "ID" /><FieldRef Name = "Usuario" /><FieldRef Name = "PerfilSistema" /><FieldRef Name = "Jefe" />' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              elementos.push({
                Usuario: { ID: ent.Usuario[0].id, Title: ent.Usuario[0].title },
                PerfilSistema: ent.PerfilSistema,
                Jefe:
                  ent.Jefe !== ""
                    ? { ID: ent.Jefe[0].id, Title: ent.Jefe[0].title }
                    : { ID: "", Title: "" }
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async ObtenerFeriados(): Promise<EFeriado[]> {
    const d: Deferred<EFeriado[]> = new Deferred<EFeriado[]>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<IsNotNull><FieldRef Name="Fecha" /></IsNotNull>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="Fecha" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name = "ID" /><FieldRef Name = "Title" /><FieldRef Name = "Fecha" />' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(ParametrosNoAdministrables.Listas.Feriados)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              const feriado = new EFeriado();
              feriado.obtenerDatos(ent);
              elementos.push(feriado);
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(errorResult);
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async CargarEntidadMaestraProvincia(
    nombreLista: string
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<Eq><FieldRef Name="Habilitado" /><Value Type="bool">1</Value></Eq>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="Title" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name = "ID" /><FieldRef Name = "Title" /><FieldRef Name = "Departamento" />' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.Title,
                Departamento: {
                  ID: ent.Departamento[0].lookupId,
                  Title: ent.Departamento[0].lookupValue
                }
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async CargarEntidadMaestraDistrito(
    nombreLista: string
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<Eq><FieldRef Name="Habilitado" /><Value Type="bool">1</Value></Eq>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="Title" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name = "ID" /><FieldRef Name = "Title" /><FieldRef Name = "Departamento" /><FieldRef Name = "Provincia" />' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.Title,
                Departamento: {
                  ID: ent.Departamento[0].lookupId,
                  Title: ent.Departamento[0].lookupValue
                },
                Provincia: {
                  ID: ent.Provincia[0].lookupId,
                  Title: ent.Provincia[0].lookupValue
                }
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static CargarEntidadMaestraEPS(nombreLista: string): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<Eq><FieldRef Name="Habilitado" /><Value Type="bool">1</Value></Eq>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="Title" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name = "ID" /><FieldRef Name = "Title" /><FieldRef Name = "SolicitarDocumentacionCotizacion"/>' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.Title,
                SolicitarDocumentacionCotizacion:
                  ent.SolicitarDocumentacionCotizacion
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async CargarEntidadMaestraRangoPotencial(
    nombreLista: string
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<Eq><FieldRef Name="Habilitado" /><Value Type="bool">1</Value></Eq>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="Title" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name = "ID" /><FieldRef Name = "Title" /><FieldRef Name = "SolicitarDocumentacionOtraEPS"/>' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.Title,
                SolicitarDocumentacionOtraEPS: ent.SolicitarDocumentacionOtraEPS
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async CargarEntidadMaestraTiposTarea(
    nombreLista: string
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<Eq><FieldRef Name="Habilitado" /><Value Type="bool">1</Value></Eq>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="Title" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name = "ID" /><FieldRef Name = "Title" /><FieldRef Name = "Plazo" /><FieldRef Name = "Recordatorio" /><FieldRef Name = "UltimoUsuarioAsignado" />' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.Title,
                Plazo: ent.Plazo,
                Recordatorio: ent.Recordatorio,
                UltimoUsuarioAsignado: ent.UltimoUsuarioAsignado
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async CargarEntidadPlanPersonalizadoTramite(
    nombreLista: string,
    query: string,
    rowlimit: string
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    const viewQuery =
      "<View><Query>" +
      query +
      "<ViewFields>" +
      '<FieldRef Name = "ID" /><FieldRef Name = "Title" /><FieldRef Name = "RangoPrimaProyectada" /><FieldRef Name = "SiniestralidadProyectada" /><FieldRef Name = "Version" /><FieldRef Name = "Enviado" /><FieldRef Name = "FechaEnvio" /><FieldRef Name = "Author" /><FieldRef Name = "Created" />' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>" +
      rowlimit +
      "</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];
            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.Title,
                RangoPrimaProyectada: Util.ObtenerLookup(
                  ent.RangoPrimaProyectada
                ),
                SiniestralidadProyectada: ent.SiniestralidadProyectada.toString().replace(
                  ",",
                  "."
                ),
                Version: ent.Version,
                FechaRegistro: ent.Created,
                RegistradoPor: ent.Author[0].title,
                Enviado: ent.Enviado === "No" ? false : true,
                FechaEnvio: ent.FechaEnvio
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static CargarEntidadTareasTramite(
    nombreLista: string,
    query: string,
    rowlimit: string
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    const viewQuery =
      "<View><Query>" +
      query +
      "</Query>" +
      "<RowLimit>" +
      rowlimit +
      "</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];
            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.Title,
                EstadoTarea: ent.EstadoTarea,
                FechaAtencion: ent.FechaAtencion,
                FechaVencimiento: ent.FechaVencimiento,
                Responsable: {
                  ID: ent.Responsable[0].id,
                  Title: ent.Responsable[0].title
                },
                Etapa: ent.Etapa,
                FechaRegistro: ent.Created
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async CargarEntidadMaestraTipoPlanAnterior(
    nombreLista: string
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<Eq><FieldRef Name="Habilitado" /><Value Type="bool">1</Value></Eq>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="Title" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name = "ID" /><FieldRef Name = "Title" /><FieldRef Name = "DeEPS"/>' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.Title,
                DeEPS: ent.DeEPS
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async CargarEntidadMaestraDocumentoCotizacion(
    nombreLista: string
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<Eq><FieldRef Name="Habilitado" /><Value Type="bool">1</Value></Eq>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="Title" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name = "ID" /><FieldRef Name = "Title" /><FieldRef Name = "SolicitarEPS"/><FieldRef Name = "ObligatorioCotizacion"/>' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.Title,
                SolicitarEPS: ent.SolicitarEPS,
                ObligatorioCotizacion: ent.ObligatorioCotizacion
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static CargarTipoDocumentoImplementacionDeConcurso(
    nombreLista: string
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<Eq><FieldRef Name="Habilitado" /><Value Type="bool">1</Value></Eq>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="Title" Ascending="True" /></OrderBy>' +
      "<ViewFields>" +
      '<FieldRef Name = "ID" /><FieldRef Name = "Title" /><FieldRef Name = "ObligatorioImplementacion" /><FieldRef Name = "TipoConcurso" /><FieldRef Name = "RangoPotencialAfiliados" /><FieldRef Name = "TipoEntidadPredecesora" />' +
      "</ViewFields>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.Title,
                ObligatorioImplementacion: ent.ObligatorioImplementacion,
                TipoConcurso: {
                  ID: ent.TipoConcurso[0].lookupId,
                  Title: ent.TipoConcurso[0].lookupValue
                },
                RangoPotencialAfiliados: {
                  ID: ent.RangoPotencialAfiliados[0].lookupId,
                  Title: ent.RangoPotencialAfiliados[0].lookupValue
                },
                TipoEntidadPredecesora: {
                  ID: ent.TipoEntidadPredecesora[0].lookupId,
                  Title: ent.TipoEntidadPredecesora[0].lookupValue
                }
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static CargarEntidadMaestraPlanesMultiempresaEstandar(
    nombreLista: string,
    tipoPlan: string
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      "<And>" +
      '<Eq><FieldRef Name="Habilitado" /><Value Type="bool">1</Value></Eq>' +
      '<Eq><FieldRef Name="TipoPlan" /><Value Type="Lookup">' +
      tipoPlan +
      "</Value></Eq>" +
      "</And>" +
      "</Where>" +
      '<OrderBy><FieldRef Name="FechaPublicacion" Ascending="False" /></OrderBy>' +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(viewQuery)
          .then(data => {
            d.resolve(data);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static CargarEntidadDocumentosVarios(
    nombreLista: string,
    tipoDocumento: string
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<Eq><FieldRef Name="TipoDocumento" /><Value Type="Text">' +
      tipoDocumento +
      "</Value></Eq>" +
      "</Where>" +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(viewQuery)
          .then(data => {
            d.resolve(data);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async CargarEntidadMaestraParametroConcurso(
    nombreLista: string
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<Eq><FieldRef Name="Habilitado" /><Value Type="bool">1</Value></Eq>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="Title" Ascending="True" /></OrderBy>' +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.Title,
                TipoConcurso: {
                  ID: ent.TipoConcurso[0].lookupId,
                  Title: ent.TipoConcurso[0].lookupValue
                },
                RangoPotencialAfiliados: {
                  ID: ent.RangoPotencialAfiliados[0].lookupId,
                  Title: ent.RangoPotencialAfiliados[0].lookupValue
                },
                FacturacionEmpresa: {
                  ID: ent.FacturacionEmpresa[0].lookupId,
                  Title: ent.FacturacionEmpresa[0].lookupValue
                },
                TipoEntidadPredecesora: {
                  ID: ent.TipoEntidadPredecesora[0].lookupId,
                  Title: ent.TipoEntidadPredecesora[0].lookupValue
                }
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async CargarEntidadMaestraParametroCotizacion(
    nombreLista: string
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<Eq><FieldRef Name="Habilitado" /><Value Type="bool">1</Value></Eq>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="Title" Ascending="True" /></OrderBy>' +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.Title,
                TipoPlan: {
                  ID: ent.TipoPlan[0].lookupId,
                  Title: ent.TipoPlan[0].lookupValue
                },
                TipoEntidadPredecesora: {
                  ID: ent.TipoEntidadPredecesora[0].lookupId,
                  Title: ent.TipoEntidadPredecesora[0].lookupValue
                },
                RangoPotencialAfiliados: {
                  ID: ent.RangoPotencialAfiliados[0].lookupId,
                  Title: ent.RangoPotencialAfiliados[0].lookupValue
                },
                TipoPlanAnterior:
                  ent.TipoPlanAnterior !== ""
                    ? {
                      ID: ent.TipoPlanAnterior[0].lookupId,
                      Title: ent.TipoPlanAnterior[0].lookupValue
                    }
                    : {
                      ID: "",
                      Title: ""
                    },
                DiagnosticoAltoCosto: ent.DiagnosticoAltoCosto,
                TieneGrupoEconomico: ent.TieneGrupoEconomico,
                TipoTramite: ent.TipoTramiteE,
                CondicionesEspeciales: ent.CondicionesEspeciales
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static CargarEntidadMaestraAutonomiaCotizacion(
    nombreLista: string
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    const viewQuery =
      "<View><Query>" +
      "<Where>" +
      '<Eq><FieldRef Name="Habilitado" /><Value Type="bool">1</Value></Eq>' +
      "</Where>" +
      '<OrderBy><FieldRef Name="Title" Ascending="True" /></OrderBy>' +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(viewQuery)
          .then(data => {
            const elementos: any = [];

            data.Row.forEach(ent => {
              elementos.push({
                ID: ent.ID,
                Title: ent.Title,
                RangoPrima: {
                  ID: ent.RangoPrima[0].lookupId,
                  Title: ent.RangoPrima[0].lookupValue
                },
                PorcentajeMin: ent.PorcentajeMin,
                PorcentajeMax: ent.PorcentajeMax,
                ResponsableAprobacion: {
                  ID: ent.ResponsableAprobacion[0].id,
                  Title: ent.ResponsableAprobacion[0].title
                }
              });
            });

            d.resolve(elementos);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async ObtenerElemento(
    nombreLista: string,
    id: number,
    fields: string[]
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    const viewFields = Util.ViewFields(fields);

    let viewQuery = "";

    if (fields.length === 0) {
      viewQuery =
        "<View><Query>" +
        "<Where>" +
        '<Eq><FieldRef Name="ID" /><Value Type="Counter">' +
        id +
        "</Value></Eq>" +
        "</Where>" +
        "</Query>" +
        "<RowLimit>1</RowLimit>" +
        "</View>";
    } else {
      viewQuery =
        "<View><Query>" +
        "<Where>" +
        '<Eq><FieldRef Name="ID" /><Value Type="Counter">' +
        id +
        "</Value></Eq>" +
        "</Where>" +
        "<ViewFields>" +
        viewFields +
        "</ViewFields>" +
        "</Query>" +
        "<RowLimit>1</RowLimit>" +
        "</View>";
    }
    const CamlQuery = {
      ViewXml: viewQuery
    };

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListDataAsStream(CamlQuery)
          .then(result => {
            d.resolve(result);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async ObtenerElementoPorQuery(
    nombreLista: string,
    query: string,
    fields: string[]
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    const viewFields = Util.ViewFields(fields);

    let viewQuery = "";

    if (fields.length === 0) {
      viewQuery =
        "<View><Query>" +
        query +
        "</Query>" +
        "<RowLimit>4999</RowLimit>" +
        "</View>";
    } else {
      viewQuery =
        "<View><Query>" +
        query +
        "<ViewFields>" +
        viewFields +
        "</ViewFields>" +
        "</Query>" +
        "<RowLimit>4999</RowLimit>" +
        "</View>";
    }

    const CamlQuery = {
      ViewXml: viewQuery
    };

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListDataAsStream(CamlQuery)
          .then(result => {
            d.resolve(result);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async ObtenerElementoPorRest(
    urlRest: string,
    esDevolverResultadoSinFiltrar?: boolean
  ): Promise<any> {
    const dfd: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        const urlRestCompleto = _spPageContextInfo.webAbsoluteUrl + urlRest;
        //  const urlRestCompleto = "https://avancestec.sharepoint.com/sites/rimaccumplimientonormativo" + urlRest;
        axios
          .get(urlRestCompleto)
          .then(res => {
            if (esDevolverResultadoSinFiltrar) {
              dfd.resolve(res);
            } else {
              dfd.resolve(res.data.value);
            }
          })
          .catch((errorResult: any) => {
            dfd.reject(errorResult.response.data["odata.error"].message.value);
          });
      })
      .catch((errorResult: any) => {
        dfd.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return dfd.promise;
  }

  public static async ObtenerElementoPorRest2(
    urlRest: string,
    esDevolverResultadoSinFiltrar?: boolean
  ): Promise<any> {
    const dfd: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        // const urlRestCompleto = _spPageContextInfo.webAbsoluteUrl + urlRest;
        const urlRestCompleto = "https://avancestec.sharepoint.com/sites/rimaccumplimientonormativo" + urlRest;
        axios
          .get(urlRestCompleto)
          .then(res => {
            if (esDevolverResultadoSinFiltrar) {
              dfd.resolve(res);
            } else {
              dfd.resolve(res.data.value);
            }
          })
          .catch((errorResult: any) => {
            dfd.reject(errorResult.response.data["odata.error"].message.value);
          });
      })
      .catch((errorResult: any) => {
        dfd.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return dfd.promise;
  }

  public static async ObtenerElementoPorRestTipado<T>(
    urlRest: string
  ): Promise<T> {
    const dfd: Deferred<T> = new Deferred<T>();

    loadPageContext()
      .then(async _ => {
        const urlRestCompleto = _spPageContextInfo.webAbsoluteUrl + urlRest;
        axios
          .get(urlRestCompleto)
          .then(res => {
            dfd.resolve(res.data.value);
          })
          .catch((errorResult: any) => {
            dfd.reject(errorResult.response.data["odata.error"].message.value);
          });
      })
      .catch((errorResult: any) => {
        dfd.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return dfd.promise;
  }

  public static async ObtenerCorreoJefe(correo: string): Promise<string> {
    const dfd: Deferred<any> = new Deferred<any>();

    const promesas: Array<Promise<any>> = [];
    let correoJefe: string = "";

    const endPoint =
      "/_api/sp.userprofiles.peoplemanager/getuserprofilepropertyfor(accountName=@v,%20propertyname='Manager')?@v=%27i%3A0%23.f|membership|" +
      correo +
      "%27";
    promesas.push(Funciones.ObtenerElementoPorRest(endPoint));

    Promise.all(promesas)
      .then(([resultadoPromesa1]) => {
        correoJefe = resultadoPromesa1;
        correoJefe = correoJefe.replace("i:0#.f|membership|", "");

        dfd.resolve(correoJefe);
      })
      .catch((errorResult: any) => {
        dfd.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return dfd.promise;
  }

  /* public static async ObtenerTodosUsuariosSitio(): Promise<
    EElementoPeoplePicker[]
  > {
    const dfd: Deferred<any> = new Deferred<any>();

    const promesas: Array<Promise<any>> = [];
    const listaResultados: any[] = [];

    const endPoint = "/_api/web/siteusers";
    promesas.push(Funciones.ObtenerElementoPorRest(endPoint));

    Promise.all(promesas)
      .then(([resultadoPromesa1]) => {
        resultadoPromesa1.forEach((element: any) => {
          const titulo = RestFiltros.parsearTexto(element, "Title");
          const id = RestFiltros.parsearTexto(element, "Id");
          const email = RestFiltros.parsearTexto(element, "Email");

          const valorUsuario = new EElementoPeoplePicker(
            true,
            parseInt(id, 10),
            titulo,
            email
          );

          listaResultados.push(valorUsuario);
        });

        listaResultados.sort((a, b) => {
          if (a.Title > b.Title) {
            return 1;
          }
          if (a.Title < b.Title) {
            return -1;
          }
          return 0;
        });

        dfd.resolve(listaResultados);
      })
      .catch((errorResult: any) => {
        dfd.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return dfd.promise;
  }*/

  /* public static async ObtenerTodosUsuariosTenant(): Promise<
    EElementoPeoplePicker[]
  > {
    const dfd: Deferred<any> = new Deferred<any>();

    const promesas: Array<Promise<any>> = [];
    const listaResultados: any[] = [];

    let endPoint =
      "/_api/search/query?querytext='WorkEmail:*rimac.com.pe*'&rowlimit=500&startrow=0&trimduplicates=false&selectproperties='Title,PreferredName,WorkEmail,OfficeNumber,Department,JobTitle,Manager,CampoPersonalizado'&sourceid=%27B09A7990-05EA-4AF9-81EF-EDFAB16C4E31%27";
    promesas.push(Funciones.ObtenerElementoPorRest(endPoint, true));
    endPoint =
      "/_api/search/query?querytext='WorkEmail:*rimac.com.pe*'&rowlimit=500&startrow=500&trimduplicates=false&selectproperties='Title,PreferredName,WorkEmail,OfficeNumber,Department,JobTitle,Manager,CampoPersonalizado'&sourceid=%27B09A7990-05EA-4AF9-81EF-EDFAB16C4E31%27";
    promesas.push(Funciones.ObtenerElementoPorRest(endPoint, true));

    Promise.all(promesas)
      .then(([resultadoPromesa1, resultadoPromesa2]) => {
        resultadoPromesa1.data.PrimaryQueryResult.RelevantResults.Table.Rows.forEach(
          (element: any) => {
            const titulo = element.Cells.filter((keyValor: any) => {
              return keyValor.Key === "PreferredName";
            })[0].Value;
            const email = element.Cells.filter((keyValor: any) => {
              return keyValor.Key === "WorkEmail";
            })[0].Value;

            const empresa = element.Cells.filter((keyValor: any) => {
              return keyValor.Key === "OfficeNumber";
            })[0].Value;

            const puesto = element.Cells.filter((keyValor: any) => {
              return keyValor.Key === "JobTitle";
            })[0].Value;

            let division = "";
            let area = "";
            const divisionArea = element.Cells.filter((keyValor: any) => {
              return keyValor.Key === "Department";
            })[0].Value;

            if (divisionArea) {
              const valor = divisionArea.toString().split("/");
              if (valor.length > 0) {
                division = valor[0];
              }
              if (valor.length > 1) {
                area = valor[1];
              }
            }

            const valorUsuario = new EElementoPeoplePicker(
              true,
              0,
              titulo,
              email
            );
            valorUsuario.setEmpresa = empresa;
            valorUsuario.setPuesto = puesto;
            valorUsuario.setDivision = division;
            valorUsuario.setArea = area;

            listaResultados.push(valorUsuario);
          }
        );
        resultadoPromesa2.data.PrimaryQueryResult.RelevantResults.Table.Rows.forEach(
          (element: any) => {
            const titulo = element.Cells.filter((keyValor: any) => {
              return keyValor.Key === "PreferredName";
            })[0].Value;
            const email = element.Cells.filter((keyValor: any) => {
              return keyValor.Key === "WorkEmail";
            })[0].Value;

            const empresa = element.Cells.filter((keyValor: any) => {
              return keyValor.Key === "OfficeNumber";
            })[0].Value;

            const puesto = element.Cells.filter((keyValor: any) => {
              return keyValor.Key === "JobTitle";
            })[0].Value;

            let division = "";
            let area = "";
            const divisionArea = element.Cells.filter((keyValor: any) => {
              return keyValor.Key === "Department";
            })[0].Value;

            if (divisionArea) {
              const valor = divisionArea.toString().split("/");
              if (valor.length > 0) {
                division = valor[0];
              }
              if (valor.length > 1) {
                area = valor[1];
              }
            }

            const valorUsuario = new EElementoPeoplePicker(
              true,
              0,
              titulo,
              email
            );
            valorUsuario.setEmpresa = empresa;
            valorUsuario.setPuesto = puesto;
            valorUsuario.setDivision = division;
            valorUsuario.setArea = area;

            listaResultados.push(valorUsuario);
          }
        );

        listaResultados.sort((a, b) => {
          if (a.Title > b.Title) {
            return 1;
          }
          if (a.Title < b.Title) {
            return -1;
          }
          return 0;
        });

        dfd.resolve(listaResultados);
      })
      .catch((errorResult: any) => {
        dfd.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return dfd.promise;
  }*/

  public static async BuscarUsuarios(
    dato: string,
    esBuscarPorCorreo: boolean,
    esSeleccionMultiple: boolean
  ): Promise<EElementoPeoplePicker[]> {
    const d: Deferred<EElementoPeoplePicker[]> = new Deferred<
      EElementoPeoplePicker[]
    >();

    loadPageContext()
      .then(async _ => {
        axios({
          url:
            _spPageContextInfo.webAbsoluteUrl +
            "/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerResolveUser",
          method: "POST",
          data: JSON.stringify({
            queryParams: {
              __metadata: {
                type: "SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters"
              },
              AllowEmailAddresses: esBuscarPorCorreo,
              AllowMultipleEntities: esSeleccionMultiple,
              AllUrlZones: false,
              MaximumEntitySuggestions: 50,
              PrincipalSource: 15,
              PrincipalType: 15,
              QueryString: dato // <-- Search query from picker control
              // 'Required':false,
              // 'SharePointGroupID':null,
              // 'UrlZone':null,
              // 'UrlZoneSpecified':false,
              // 'Web':null,
              // 'WebApplicationID':null
            }
          }),
          headers: {
            accept: "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          }
        })
          .then((response: AxiosResponse<any>) => {
            const resultadosData = JSON.parse(response.data.value);

            d.resolve(resultadosData);
          })
          .catch((errorResult: any) => {
            d.reject(errorResult);
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async BuscarUsuarioPorLoginName(
    loginName: string
  ): Promise<number> {
    const dfd: Deferred<number> = new Deferred<number>();

    loadPageContext().then(async _ => {
      const clientContext = SP.ClientContext.get_current();
      const user = clientContext.get_web().ensureUser(loginName);
      clientContext.load(user);
      clientContext.executeQueryAsync(
        (sender: any, args: SP.ClientRequestFailedEventArgs): void => {
          dfd.resolve(user.get_id());
        },
        (sender: any, args: SP.ClientRequestFailedEventArgs): void => {
          dfd.reject(
            args.get_message() + ". StackTrace: " + args.get_stackTrace()
          );
        }
      );
    });

    return dfd.promise;
  }

  public static eliminarDuplicados(lista: string[]) {
    const unique = {};
    lista.forEach(function (i) {
      if (!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }

  public static GuardarGrupoSharepoint(titulo: string): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.siteGroups
          .add({
            Title: titulo,
            Description: "",
            AllowRequestToJoinLeave: true,
            AutoAcceptRequestToJoinLeave: true,
            AllowMembersEditMembership: false,
            OnlyAllowMembersViewMembership: false
          })
          .then((result: any) => {
            d.resolve(result.data);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch(err => {
        d.reject(err.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async ObtenerTodosUsuariosTenantPaginando(
    rowLimit: number,
    startRow: number,
    listaResultados?: any[]
  ): Promise<EElementoPeoplePicker[]> {
    const dfd: Deferred<any> = new Deferred<any>();

    const promesas: Array<Promise<any>> = [];
    listaResultados = listaResultados || [];

    const endPoint = `/_api/search/query?querytext='WorkEmail:*avances.com.pe*'&rowlimit=${rowLimit}&startrow=${startRow}&trimduplicates=false&selectproperties='Title,PreferredName,WorkEmail,OfficeNumber,Department,JobTitle,Manager,CampoPersonalizado'&sourceid=%27B09A7990-05EA-4AF9-81EF-EDFAB16C4E31%27`;
    promesas.push(Funciones.ObtenerElementoPorRest(endPoint, true));

    Promise.all(promesas)
      .then(([resultadoPromesa]) => {
        resultadoPromesa.data.PrimaryQueryResult.RelevantResults.Table.Rows.forEach(
          (element: any) => {
            const titulo = element.Cells.filter((keyValor: any) => {
              return keyValor.Key === "PreferredName";
            })[0].Value;
            const email = element.Cells.filter((keyValor: any) => {
              return keyValor.Key === "WorkEmail";
            })[0].Value;

            const empresa = element.Cells.filter((keyValor: any) => {
              return keyValor.Key === "OfficeNumber";
            })[0].Value;

            const puesto = element.Cells.filter((keyValor: any) => {
              return keyValor.Key === "JobTitle";
            })[0].Value;

            let division = "";
            let area = "";
            const divisionArea = element.Cells.filter((keyValor: any) => {
              return keyValor.Key === "Department";
            })[0].Value;

            if (divisionArea) {
              const valor = divisionArea.toString().split("/");
              if (valor.length > 0) {
                division = valor[0];
              }
              if (valor.length > 1) {
                area = valor[1];
              }
            }

            const valorUsuario = new EElementoPeoplePicker(
              true,
              0,
              titulo,
              email
            );
            valorUsuario.setEmpresa = empresa;
            valorUsuario.setPuesto = puesto;
            valorUsuario.setDivision = division;
            valorUsuario.setArea = area;

            // listaResultados.push(valorUsuario);
            if (listaResultados) {
              listaResultados.push(email);
            }
          }
        );

        if (
          resultadoPromesa.data.PrimaryQueryResult.RelevantResults.TotalRows >
          startRow +
          resultadoPromesa.data.PrimaryQueryResult.RelevantResults.RowCount
        ) {
          this.ObtenerTodosUsuariosTenantPaginando(
            rowLimit,
            startRow +
            resultadoPromesa.data.PrimaryQueryResult.RelevantResults.RowCount,
            listaResultados
          ).then((resultadoBusqueda: any[]) => {
            dfd.resolve(this.eliminarDuplicados(resultadoBusqueda));
          });
        } else {
          if (listaResultados) {
            dfd.resolve(this.eliminarDuplicados(listaResultados));
          }
        }
      })
      .catch((errorResult: any) => {
        dfd.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return dfd.promise;
  }

  public static GuardarElemento(
    nombreLista: string,
    data: {}
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .items.add(data)
          .then((result: ItemAddResult) => {
            d.resolve(result.data);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch(err => {
        d.reject(err.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static ActualizarElementosPorQuery(
    nombreLista: string,
    query: string,
    data: {}
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    const viewQuery =
      "<View><Query>" +
      query +
      "</Query>" +
      "<RowLimit>4999</RowLimit>" +
      "</View>";

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(viewQuery)
          .then(result => {
            d.resolve(result);

            const Items: any = result.Row;

            const funciones = [];

            if (Items.length > 0) {
              for (const Item of Items) {
                funciones.push(
                  Funciones.ActualizarElemento(nombreLista, data, Item.ID)
                );
              }

              if (funciones.length > 0) {
                Promise.all(funciones)
                  .then(([]) => {
                    d.resolve(result);
                  })
                  .catch(error => {
                    this.GuardarExcepcion("ActualizarElementosPorQuery", error);
                  });
              } else {
                d.resolve(result);
              }
            } else {
              d.resolve(result);
            }
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch(err => {
        d.reject(err.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static ActualizarElemento(
    nombreLista: string,
    data: {},
    id: number
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .items.getById(id)
          .update(data)
          .then((result: ItemUpdateResult) => {
            d.resolve(result.data);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch(err => {
        d.reject(err.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static GuardarExcepcion(
    codigoError: string,
    mensajeError: string
  ): void {
    const data = { Codigo: codigoError, Mensaje: mensajeError };
    const nombreLista = ParametrosNoAdministrables.Listas.Excepciones;

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .items.add(data)
          .then((result: ItemAddResult) => {
            console.log("Se registró la excepción.");
          });
      })
      .catch(err => {
        console.log("Error al guardar la excepción:", err);
      });
  }

  public static GuardarNota(
    data: {},
    archivos: EArchivoNota[],
    IdReporte: any
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(ParametrosNoAdministrables.Listas.NotasReporte)
          .items.add(data)
          .then((result: ItemAddResult) => {
            const IdNota = result.data.ID;

            const funciones = [];

            if (archivos.length > 0) {
              for (const archivo of archivos) {
                if (archivo.Eliminar === false && archivo.ID === 0) {
                  const datosAdjunto = {
                    Title: Util.replaceUnsupportedCharacters(archivo.Nombre),
                    IdNotaReporteId: IdNota,
                    ReporteId: IdReporte
                  };

                  funciones.push(
                    Funciones.AdjuntarArchivo(
                      ParametrosNoAdministrables.Listas.AdjuntosNotaReporte,
                      archivo.ArrayBufferArchivo,
                      datosAdjunto,
                      IdReporte.toString()
                    )
                  );
                }

                if (funciones.length > 0) {
                  Promise.all(funciones)
                    .then(([]) => {
                      d.resolve(result.data);
                    })
                    .catch(error => {
                      this.GuardarExcepcion(
                        "AdjuntarArchivoNotaReporte",
                        error
                      );
                    });
                } else {
                  d.resolve(result.data);
                }
              }
            } else {
              d.resolve(result.data);
            }
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch(err => {
        d.reject(err.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static AdjuntarArchivo(
    nombreLista: string,
    file: any,
    datos: {},
    carpeta?: string | ""
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        const ruta: string = `${
          _spPageContextInfo.webServerRelativeUrl
          }/${nombreLista}/${carpeta}`;

        const fecha = new Date();
        const fechahora =
          fecha.getDay() +
          "" +
          fecha.getDate() +
          "" +
          fecha.getFullYear() +
          "" +
          fecha.getHours() +
          "" +
          fecha.getMinutes() +
          "" +
          fecha.getSeconds();
        const nombreArchivo = Util.replaceUnsupportedCharacters(file.name);

        if (file.size <= 5485760) {
          // small upload
          web
            .getFolderByServerRelativeUrl(ruta)
            .files.add(fechahora + "_" + nombreArchivo, file, true)
            .then(f => {
              f.file.getItem().then(item => {
                item.update(datos).then(result => {
                  d.resolve(result);
                });
              });
            })
            .catch((errorResult: any) => {
              d.reject(errorResult.data.responseBody["odata.error"]);
            });
        } else {
          // large upload
          web
            .getFolderByServerRelativeUrl(ruta)
            .files.addChunked(
              fechahora + "_" + nombreArchivo,
              file,
              datosProgresoCarga => {
                console.dir(datosProgresoCarga);
              },
              true
            )
            .then(f => {
              web
                .getFolderByServerRelativeUrl(
                  ruta + "/" + fechahora + "_" + nombreArchivo
                )
                .getItem()
                .then(item => {
                  item
                    .update(datos)
                    .then(result => {
                      d.resolve(result);
                    })
                    .catch((errorResult: any) => {
                      d.reject(errorResult);
                    });
                });
            })
            .catch((errorResult: any) => {
              d.reject(errorResult);
            });
        }
      })
      .catch((errorResult: any) => {
        d.reject(errorResult);
      });

    return d.promise;
  }

  public static AdjuntarArchivoCustom(
    nombreLista: string,
    file: any,
    nombreArchivo: string,
    datos: {},
    carpeta?: string | ""
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        const ruta: string = `${
          _spPageContextInfo.webServerRelativeUrl
          }/${nombreLista}/${carpeta}`;

        const fecha = new Date();
        const fechahora =
          fecha.getDay() +
          "" +
          fecha.getDate() +
          "" +
          fecha.getFullYear() +
          "" +
          fecha.getHours() +
          "" +
          fecha.getMinutes() +
          "" +
          fecha.getSeconds();
        // const nombreArchivo = Util.replaceUnsupportedCharacters(file.name);

        if (file.size <= 5485760) {
          // small upload
          web
            .getFolderByServerRelativeUrl(ruta)
            .files.add(fechahora + "_" + nombreArchivo, file, true)
            .then(f => {
              f.file.getItem().then(item => {
                item.update(datos).then(result => {
                  d.resolve(result);
                });
              });
            })
            .catch((errorResult: any) => {
              d.reject(errorResult.data.responseBody["odata.error"]);
            });
        } else {
          // large upload
          web
            .getFolderByServerRelativeUrl(ruta)
            .files.addChunked(
              fechahora + "_" + nombreArchivo,
              file,
              data => {
                console.dir(data);
              },
              true
            )
            .then(f => {
              web
                .getFolderByServerRelativeUrl(
                  ruta + "/" + fechahora + "_" + nombreArchivo
                )
                .getItem()
                .then(item => {
                  item
                    .update(datos)
                    .then((result: any) => {
                      d.resolve(result);
                    })
                    .catch((errorResult: any) => {
                      d.reject(errorResult);
                    });
                });
            })
            .catch((errorResult: any) => {
              d.reject(errorResult);
            });
        }
      })
      .catch((errorResult: any) => {
        d.reject(errorResult);
      });

    return d.promise;
  }

  public static GuardarComentarioTareaExpedienteReporte(
    data: {},
    archivos: EArchivoComentarioTareaExpedienteReporte[],
    IdReporte: any,
    IdExpedienteReporte: any,
    IdTareaExpedienteReporte: number
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(
            ParametrosNoAdministrables.Listas.ComentariosTareaExpedienteReporte
          )
          .items.add(data)
          .then((result: ItemAddResult) => {
            const IdComentario = result.data.ID;

            const funciones = [];

            if (archivos.length > 0) {
              for (const archivo of archivos) {
                if (archivo.Eliminar === false && archivo.ID === 0) {
                  const datosAdjunto = {
                    Title: Util.replaceUnsupportedCharacters(archivo.Nombre),
                    ComentarioTareaExpedienteReporteId: IdComentario,
                    ReporteId: IdReporte,
                    ExpedienteReporteId: IdExpedienteReporte,
                    TareaExpedienteReporteId: IdTareaExpedienteReporte
                  };

                  funciones.push(
                    Funciones.AdjuntarArchivo(
                      ParametrosNoAdministrables.Listas
                        .AdjuntosComentarioTareaExpedienteReporte,
                      archivo.ArrayBufferArchivo,
                      datosAdjunto,
                      IdExpedienteReporte.toString()
                    )
                  );
                }
              }

              if (funciones.length > 0) {
                Promise.all(funciones)
                  .then(([]) => {
                    d.resolve(result.data);
                  })
                  .catch(error => {
                    this.GuardarExcepcion(
                      "AdjuntarArchivoComentarioTareaExpedienteReporte",
                      error
                    );
                  });
              } else {
                d.resolve(result.data);
              }
            } else {
              d.resolve(result.data);
            }
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch(err => {
        d.reject(err.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static ActualizarNotaReporte(
    data: {},
    id: number,
    archivos: EArchivoNota[],
    IdReporte: any
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(ParametrosNoAdministrables.Listas.NotasReporte)
          .items.getById(id)
          .update(data)
          .then((result: any) => {
            const IdNota = id;

            const funciones = [];

            if (archivos.length > 0) {
              for (const archivo of archivos) {
                if (archivo.Eliminar === false && archivo.ID === 0) {
                  const datosAdjunto = {
                    Title: Util.replaceUnsupportedCharacters(archivo.Nombre),
                    IdNotaReporteId: IdNota,
                    ReporteId: IdReporte
                  };

                  funciones.push(
                    Funciones.AdjuntarArchivo(
                      ParametrosNoAdministrables.Listas.AdjuntosNotaReporte,
                      archivo.ArrayBufferArchivo,
                      datosAdjunto,
                      IdReporte.toString()
                    )
                  );
                } else if (archivo.Eliminar === true && archivo.ID > 0) {
                  funciones.push(
                    Funciones.EliminarItem(
                      ParametrosNoAdministrables.Listas.AdjuntosNotaReporte,
                      archivo.ID
                    )
                  );
                }
              }
              if (funciones.length > 0) {
                Promise.all(funciones)
                  .then(([]) => {
                    d.resolve(result);
                  })
                  .catch(error => {
                    this.GuardarExcepcion("AdjuntarArchivoNotaReporte", error);
                  });
              } else {
                d.resolve(result);
              }
            } else {
              d.resolve(result);
            }
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch(err => {
        d.reject(err.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static ActualizarNotaExpedienteReporte(
    data: {},
    id: number,
    archivos: EArchivoNotaExpedienteReporte[],
    IdReporte: any,
    IdExpedienteReporte: any
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(ParametrosNoAdministrables.Listas.NotasExpedienteReporte)
          .items.getById(id)
          .update(data)
          .then((result: any) => {
            const IdNota = id;

            const funciones = [];

            if (archivos.length > 0) {
              for (const archivo of archivos) {
                if (archivo.Eliminar === false && archivo.ID === 0) {
                  const datosAdjunto = {
                    Title: Util.replaceUnsupportedCharacters(archivo.Nombre),
                    IdNotaExpedienteReporteId: IdNota,
                    ReporteId: IdReporte,
                    ExpedienteReporteId: IdExpedienteReporte
                  };

                  funciones.push(
                    Funciones.AdjuntarArchivo(
                      ParametrosNoAdministrables.Listas
                        .AdjuntosNotaExpedienteReporte,
                      archivo.ArrayBufferArchivo,
                      datosAdjunto,
                      IdExpedienteReporte.toString()
                    )
                  );
                } else if (archivo.Eliminar === true && archivo.ID > 0) {
                  funciones.push(
                    Funciones.EliminarItem(
                      ParametrosNoAdministrables.Listas
                        .AdjuntosNotaExpedienteReporte,
                      archivo.ID
                    )
                  );
                }
              }
              if (funciones.length > 0) {
                Promise.all(funciones)
                  .then(([]) => {
                    d.resolve(result);
                  })
                  .catch(error => {
                    this.GuardarExcepcion(
                      "AdjuntarArchivoNotaExpedienteReporte",
                      error
                    );
                  });
              } else {
                d.resolve(result);
              }
            } else {
              d.resolve(result);
            }
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch(err => {
        d.reject(err.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static GuardarSolicitudAmpliacionExpedienteReporte(
    data: {},
    archivos: EArchivoSolicitudAmpliacionExpedienteReporte[],
    IdReporte: any,
    IdExpedienteReporte: any
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(
            ParametrosNoAdministrables.Listas
              .SolicitudesAmpliacionExpedienteReporte
          )
          .items.add(data)
          .then((result: ItemAddResult) => {
            const IdSolicitud = result.data.ID;

            const funciones = [];

            if (archivos.length > 0) {
              for (const archivo of archivos) {
                if (archivo.Eliminar === false && archivo.ID === 0) {
                  const datosAdjunto = {
                    Title: Util.replaceUnsupportedCharacters(archivo.Nombre),
                    SolicitudAmpliacionReporteId: IdSolicitud,
                    ReporteId: IdReporte,
                    ExpedienteReporteId: IdExpedienteReporte
                  };

                  funciones.push(
                    Funciones.AdjuntarArchivo(
                      ParametrosNoAdministrables.Listas
                        .AdjuntosSolicitudAmpliacionReporte,
                      archivo.ArrayBufferArchivo,
                      datosAdjunto,
                      IdExpedienteReporte.toString()
                    )
                  );
                }
              }

              if (funciones.length > 0) {
                Promise.all(funciones)
                  .then(([]) => {
                    d.resolve(result.data);
                  })
                  .catch(error => {
                    this.GuardarExcepcion(
                      "AdjuntarArchivoTareaExpedienteReporte",
                      error
                    );
                  });
              } else {
                d.resolve(result.data);
              }
            } else {
              d.resolve(result.data);
            }
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch(err => {
        d.reject(err.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static GuardarAtencionExpedienteReporte(
    data: {},
    archivos: EArchivoAtencionExpedienteReporte[],
    IdReporte: any,
    IdExpedienteReporte: any
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(
            ParametrosNoAdministrables.Listas.AtencionesExpedienteReporte
          )
          .items.add(data)
          .then((result: ItemAddResult) => {
            const IdAtencion = result.data.ID;

            const funciones = [];

            if (archivos.length > 0) {
              for (const archivo of archivos) {
                if (archivo.Eliminar === false && archivo.ID === 0) {
                  const datosAdjunto = {
                    Title: Util.replaceUnsupportedCharacters(archivo.Nombre),
                    AtencionExpedienteReporteId: IdAtencion,
                    ReporteId: IdReporte,
                    ExpedienteReporteId: IdExpedienteReporte
                  };

                  funciones.push(
                    Funciones.AdjuntarArchivo(
                      ParametrosNoAdministrables.Listas
                        .AdjuntosAtencionExpedienteReporte,
                      archivo.ArrayBufferArchivo,
                      datosAdjunto,
                      IdExpedienteReporte.toString()
                    )
                  );
                }
              }

              if (funciones.length > 0) {
                Promise.all(funciones)
                  .then(([]) => {
                    d.resolve(result.data);
                  })
                  .catch(error => {
                    this.GuardarExcepcion(
                      "AdjuntarArchivoTareaExpedienteReporte",
                      error
                    );
                  });
              } else {
                d.resolve(result.data);
              }
            } else {
              d.resolve(result.data);
            }
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch(err => {
        d.reject(err.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static GuardarTareaExpedienteReporte(
    data: {},
    archivos: EArchivoTareaExpedienteReporte[],
    IdReporte: any,
    IdExpedienteReporte: any
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(ParametrosNoAdministrables.Listas.TareasExpedienteReporte)
          .items.add(data)
          .then((result: ItemAddResult) => {
            const IdTarea = result.data.ID;

            const funciones = [];

            if (archivos.length > 0) {
              for (const archivo of archivos) {
                if (archivo.Eliminar === false && archivo.ID === 0) {
                  const datosAdjunto = {
                    Title: Util.replaceUnsupportedCharacters(archivo.Nombre),
                    TareaExpedienteReporteId: IdTarea,
                    ReporteId: IdReporte,
                    ExpedienteReporteId: IdExpedienteReporte
                  };

                  funciones.push(
                    Funciones.AdjuntarArchivo(
                      ParametrosNoAdministrables.Listas
                        .AdjuntosTareaExpedienteReporte,
                      archivo.ArrayBufferArchivo,
                      datosAdjunto,
                      IdExpedienteReporte.toString()
                    )
                  );
                }
              }

              if (funciones.length > 0) {
                Promise.all(funciones)
                  .then(([]) => {
                    d.resolve(result.data);
                  })
                  .catch(error => {
                    this.GuardarExcepcion(
                      "AdjuntarArchivoTareaExpedienteReporte",
                      error
                    );
                  });
              } else {
                d.resolve(result.data);
              }
            } else {
              d.resolve(result.data);
            }
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch(err => {
        d.reject(err.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static ActualizarTareaExpedienteReporte(
    data: {},
    archivos: EArchivoTareaExpedienteReporte[],
    IdReporte: any,
    IdExpedienteReporte: any,
    IdTareaExpedienteReporte: number
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(ParametrosNoAdministrables.Listas.TareasExpedienteReporte)
          .items.getById(IdTareaExpedienteReporte)
          .update(data)
          .then((result: any) => {
            const funciones = [];

            if (archivos.length > 0) {
              for (const archivo of archivos) {
                if (archivo.Eliminar === false && archivo.ID === 0) {
                  const datosAdjunto = {
                    Title: Util.replaceUnsupportedCharacters(archivo.Nombre),
                    TareaExpedienteReporteId: IdTareaExpedienteReporte,
                    ReporteId: IdReporte,
                    ExpedienteReporteId: IdExpedienteReporte
                  };

                  funciones.push(
                    Funciones.AdjuntarArchivo(
                      ParametrosNoAdministrables.Listas
                        .AdjuntosTareaExpedienteReporte,
                      archivo.ArrayBufferArchivo,
                      datosAdjunto,
                      IdExpedienteReporte.toString()
                    )
                  );
                } else if (archivo.Eliminar === true && archivo.ID > 0) {
                  funciones.push(
                    Funciones.EliminarItem(
                      ParametrosNoAdministrables.Listas
                        .AdjuntosTareaExpedienteReporte,
                      archivo.ID
                    )
                  );
                }
              }

              if (funciones.length > 0) {
                Promise.all(funciones)
                  .then(([]) => {
                    d.resolve(result);
                  })
                  .catch(error => {
                    this.GuardarExcepcion(
                      "AdjuntarArchivoTareaExpedienteReporte",
                      error
                    );
                  });
              } else {
                d.resolve(result);
              }
            } else {
              d.resolve(result);
            }
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch(err => {
        d.reject(err.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static GuardarNotaExpedienteReporte(
    data: {},
    archivos: EArchivoNotaExpedienteReporte[],
    IdReporte: any,
    IdExpedienteReporte: any
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(ParametrosNoAdministrables.Listas.NotasExpedienteReporte)
          .items.add(data)
          .then((result: ItemAddResult) => {
            const IdNota = result.data.ID;

            const funciones = [];

            if (archivos.length > 0) {
              for (const archivo of archivos) {
                if (archivo.Eliminar === false && archivo.ID === 0) {
                  const datosAdjunto = {
                    Title: Util.replaceUnsupportedCharacters(archivo.Nombre),
                    IdNotaExpedienteReporteId: IdNota,
                    ReporteId: IdReporte,
                    ExpedienteReporteId: IdExpedienteReporte
                  };

                  funciones.push(
                    Funciones.AdjuntarArchivo(
                      ParametrosNoAdministrables.Listas
                        .AdjuntosNotaExpedienteReporte,
                      archivo.ArrayBufferArchivo,
                      datosAdjunto,
                      IdExpedienteReporte.toString()
                    )
                  );
                }
              }

              if (funciones.length > 0) {
                Promise.all(funciones)
                  .then(([]) => {
                    d.resolve(result.data);
                  })
                  .catch(error => {
                    this.GuardarExcepcion(
                      "AdjuntarArchivoNotaExpedienteReporte",
                      error
                    );
                  });
              } else {
                d.resolve(result.data);
              }
            } else {
              d.resolve(result.data);
            }
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch(err => {
        d.reject(err.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static GuardarNotaCargoAmpliacionExpedienteReporte(
    data: {},
    archivos: EArchivoSolicitudAmpliacionExpedienteReporte[],
    IdReporte: any,
    IdExpedienteReporte: any
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(ParametrosNoAdministrables.Listas.NotasExpedienteReporte)
          .items.add(data)
          .then((result: ItemAddResult) => {
            const IdNota = result.data.ID;

            const funciones = [];

            if (archivos.length > 0) {
              for (const archivo of archivos) {
                if (archivo.Eliminar === false && archivo.ID === 0) {
                  const datosAdjunto = {
                    Title: Util.replaceUnsupportedCharacters(archivo.Nombre),
                    IdNotaExpedienteReporteId: IdNota,
                    ReporteId: IdReporte,
                    ExpedienteReporteId: IdExpedienteReporte
                  };

                  funciones.push(
                    Funciones.AdjuntarArchivo(
                      ParametrosNoAdministrables.Listas
                        .AdjuntosNotaExpedienteReporte,
                      archivo.ArrayBufferArchivo,
                      datosAdjunto,
                      IdExpedienteReporte.toString()
                    )
                  );
                }
              }

              if (funciones.length > 0) {
                Promise.all(funciones)
                  .then(([]) => {
                    d.resolve(result.data);
                  })
                  .catch(error => {
                    this.GuardarExcepcion(
                      "AdjuntarArchivoNotaExpedienteReporte",
                      error
                    );
                  });
              } else {
                d.resolve(result.data);
              }
            } else {
              d.resolve(result.data);
            }
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch(err => {
        d.reject(err.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static GuardarNotaAmpliacionExpedienteReporte(
    data: {},
    nombresArchivo: string[],
    rutasArchivo: string[],
    IdReporte: any,
    IdExpedienteReporte: any
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(ParametrosNoAdministrables.Listas.NotasExpedienteReporte)
          .items.add(data)
          .then((result: ItemAddResult) => {
            const IdNota = result.data.ID;

            const funciones = [];

            if (nombresArchivo.length > 0) {
              let i;
              for (i = 0; i < nombresArchivo.length; i++) {
                const nombreArchivo = Util.replaceUnsupportedCharacters(
                  nombresArchivo[i]
                );
                const rutaArchivo = rutasArchivo[i];

                const datosAdjunto = {
                  Title: nombreArchivo,
                  IdNotaExpedienteReporteId: IdNota,
                  ReporteId: IdReporte,
                  ExpedienteReporteId: IdExpedienteReporte
                };

                funciones.push(
                  Funciones.CopiarArchivoExpediente(
                    ParametrosNoAdministrables.Listas
                      .AdjuntosNotaExpedienteReporte,
                    rutaArchivo,
                    nombreArchivo,
                    datosAdjunto,
                    IdExpedienteReporte
                  )
                );
              }

              if (funciones.length > 0) {
                Promise.all(funciones)
                  .then(([]) => {
                    d.resolve(result.data);
                  })
                  .catch(error => {
                    this.GuardarExcepcion(
                      "AdjuntarArchivoNotaExpedienteReporte",
                      error
                    );
                  });
              } else {
                d.resolve(result.data);
              }
            } else {
              d.resolve(result.data);
            }
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch(err => {
        d.reject(err.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static GuardarPreguntaEncuesta(
    data: {},
    ItemsRespuestas: ERespuestaPreguntaEncuesta[],
    IdEncuesta: number
  ): Promise<string> {
    const d: Deferred<string> = new Deferred<string>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(ParametrosNoAdministrables.Listas.PreguntasEncuesta)
          .items.add(data)
          .then((result: ItemAddResult) => {
            const IdPregunta = result.data.ID;

            const funciones = [];

            if (ItemsRespuestas.length > 0) {
              for (const ItemRespuesta of ItemsRespuestas) {
                const oRespuesta = {
                  Title: "Respuesta",
                  Respuesta: ItemRespuesta.Respuesta,
                  Puntaje: ItemRespuesta.Puntaje,
                  PreguntaEncuestaId: IdPregunta,
                  EncuestaId: IdEncuesta,
                  Orden: ItemRespuesta.Orden,
                  Seleccionado: false
                };

                funciones.push(
                  Funciones.GuardarElemento(
                    ParametrosNoAdministrables.Listas
                      .RespuestasPreguntaEncuesta,
                    oRespuesta
                  )
                );
              }

              if (funciones.length > 0) {
                Promise.all(funciones)
                  .then(([]) => {
                    d.resolve(result.data);
                  })
                  .catch(error => {
                    this.GuardarExcepcion(
                      "GuardarPreguntaConRespuestas",
                      error
                    );
                  });
              } else {
                d.resolve(result.data);
              }
            } else {
              d.resolve(result.data);
            }
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch(err => {
        d.reject(err.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static CopiarArchivoExpediente(
    nombreLista: string,
    FileRef: any,
    LinkFilename: any,
    datos: {},
    idExpedienteReporte: any
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    const fecha = new Date();
    const fechahora =
      fecha.getDay() +
      "" +
      fecha.getDate() +
      "" +
      fecha.getFullYear() +
      "" +
      fecha.getHours() +
      "" +
      fecha.getMinutes() +
      "" +
      fecha.getSeconds() +
      "" +
      fecha.getMilliseconds();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web
          .getFileByServerRelativeUrl(FileRef)
          .copyTo(
            ParametrosNoAdministrables.ValoresGenericos.pathSitio +
            "/" +
            nombreLista +
            "/" +
            idExpedienteReporte +
            "/" +
            fechahora +
            "_" +
            LinkFilename,
            true
          )
          .then(() => {
            web
              .getFileByServerRelativeUrl(
                ParametrosNoAdministrables.ValoresGenericos.pathSitio +
                "/" +
                nombreLista +
                "/" +
                idExpedienteReporte +
                "/" +
                fechahora +
                "_" +
                LinkFilename
              )
              .getItem()
              .then(item => {
                item.update(datos).then(result => {
                  d.resolve(result);
                });
              });
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static CopiarArchivo(
    nombreLista: string,
    FileRef: any,
    LinkFilename: any,
    datos: {}
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    const fecha = new Date();
    const fechahora =
      fecha.getDay() +
      "" +
      fecha.getDate() +
      "" +
      fecha.getFullYear() +
      "" +
      fecha.getHours() +
      "" +
      fecha.getMinutes() +
      "" +
      fecha.getSeconds();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web
          .getFileByServerRelativeUrl(FileRef)
          .copyTo(
            ParametrosNoAdministrables.ValoresGenericos.pathSitio +
            "/" +
            nombreLista +
            "/" +
            fechahora +
            "_" +
            LinkFilename,
            true
          )
          .then(() => {
            web
              .getFileByServerRelativeUrl(
                ParametrosNoAdministrables.ValoresGenericos.pathSitio +
                "/" +
                nombreLista +
                "/" +
                fechahora +
                "_" +
                LinkFilename
              )
              .getItem()
              .then(item => {
                item.update(datos).then(result => {
                  d.resolve(result);
                });
              });
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static EliminarItem(
    nombreLista: string,
    id: number
  ): Promise<boolean> {
    const d: Deferred<boolean> = new Deferred<boolean>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .items.getById(id)
          .delete()
          .then(result => {
            d.resolve(true);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });
    return d.promise;
  }

  /*public static AdjuntarFile(
    nombreLista: string,
    file: any,
    datos: {}
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);

        const fecha = new Date();
        const fechahora =
          fecha.getDay() +
          "" +
          fecha.getDate() +
          "" +
          fecha.getFullYear() +
          "" +
          fecha.getHours() +
          "" +
          fecha.getMinutes() +
          "" +
          fecha.getSeconds();

        if (file.size <= 10485760) {
          // small upload
          web
            .getFolderByServerRelativeUrl(
              _spPageContextInfo.webServerRelativeUrl + "/" + nombreLista + "/"
            )
            .files.add(fechahora + "_" + file.name, file, true)
            .then(f => {
              f.file.getItem().then(item => {
                item.update(datos).then((result: any) => {
                  const fileResult = {
                    ID: result.item.ID,
                    Url: f.data.ServerRelativeUrl
                  };
                  d.resolve(fileResult);
                });
              });
            });
        } else {
          // large upload
          web
            .getFolderByServerRelativeUrl(
              _spPageContextInfo.webServerRelativeUrl + "/" + nombreLista + "/"
            )
            .files.addChunked(
              fechahora + "_" + file.name,
              file,
              data => {
                console.dir(data);
              },
              true
            )
            .then(f => {
              f.file.getItem().then(item => {
                item
                  .update(datos)
                  .then((result: any) => {
                    const fileResult = {
                      ID: result.item.ID,
                      Url: f.data.ServerRelativeUrl
                    };
                    d.resolve(fileResult);
                  })
                  .catch((errorResult: any) => {
                    d.reject(
                      errorResult.data.responseBody["odata.error"].message.value
                    );
                  });
              });
            });
        }
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }*/

  public static EnviarDatosPost(url: string, datos: any): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    const jsonData = JSON.stringify(datos);

    const spRequest = new XMLHttpRequest();
    spRequest.open("POST", url, true);

    spRequest.setRequestHeader("Content-Type", "application/json");

    spRequest.onreadystatechange = () => {
      if (spRequest.readyState === 4 && spRequest.status === 200) {
        const resultOperacion = JSON.parse(spRequest.responseText);
        d.resolve(resultOperacion);
      } else if (spRequest.readyState === 4 && spRequest.status !== 200) {
        console.log("Error ocurrido !");
        d.reject(spRequest.readyState);
      }
    };
    spRequest.send(jsonData);

    return d.promise;
  }

  public static EnviarDatosGetPDF(url: string): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    const spRequest = new XMLHttpRequest();
    spRequest.open("GET", url, true);
    spRequest.setRequestHeader("Content-Type", "application/json");

    spRequest.onreadystatechange = () => {
      if (spRequest.readyState === 4 && spRequest.status === 200) {
        const resultOperacion = spRequest;
        d.resolve(resultOperacion);
      } else if (spRequest.readyState === 4 && spRequest.status !== 200) {
        console.log("Error ocurrido !");
        d.reject(spRequest.readyState);
      }
    };

    spRequest.send();

    return d.promise;
  }


  public static EnviarDatosGet(url: string): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    const spRequest = new XMLHttpRequest();
    spRequest.open("GET", url, true);
    spRequest.setRequestHeader("Content-Type", "application/json");

    spRequest.onreadystatechange = () => {
      if (spRequest.readyState === 4 && spRequest.status === 200) {
        const resultOperacion = JSON.parse(spRequest.responseText);
        d.resolve(resultOperacion);
      } else if (spRequest.readyState === 4 && spRequest.status !== 200) {
        console.log("Error ocurrido !");
        d.reject(spRequest.readyState);
      }
    };

    spRequest.send();

    return d.promise;
  }

  public static ActualizarCorrelativo(
    nombreLista: string,
    id: number
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .items.getById(id)
          .get()
          .then(item =>
            web.lists
              .getByTitle(nombreLista)
              .items.getById(id)
              .update({
                Correlativo: item.Correlativo + 1
              })
              .then((result: ItemUpdateResult) => {
                d.resolve({
                  Digitos: item.Digitos,
                  Correlativo: item.Correlativo + 1
                });
              })
          )
          .catch((errorResult: any) => {
            d.reject(errorResult.message);
          });
      })
      .catch(err => {
        d.reject(err.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async ObtenerElementos(
    nombreLista: string,
    query: string,
    fields: string[]
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    const viewFields = Util.ViewFields(fields);

    let viewQuery = "";

    if (fields.length === 0) {
      viewQuery =
        "<View><Query>" +
        query +
        "</Query>" +
        "<RowLimit>4999</RowLimit>" +
        "</View>";
    } else {
      viewQuery =
        "<View><Query>" +
        query +
        "<ViewFields>" +
        viewFields +
        "</ViewFields>" +
        "</Query>" +
        "<RowLimit>4999</RowLimit>" +
        "</View>";
    }

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(viewQuery)
          .then(result => {
            d.resolve(result);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async ObtenerElementosPorQuery(
    nombreLista: string,
    query: string
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListData(query)
          .then(result => {
            d.resolve(result);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static ObtenerFiles(
    nombreLista: string,
    nombreFolder: string
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);

        web
          .getFolderByServerRelativeUrl(
            _spPageContextInfo.webServerRelativeUrl +
            "/" +
            nombreLista +
            "/" +
            nombreFolder
          )
          .expand(
            "RootFolder,Folders,Folders,Files/ListItemAllFields,Files/Length"
          )
          .select(
            "Title,Name,RootFolder/ServerRelativeUrl,ParentWeb/Url,Files/Length,Files/ListItemAllFields,Files/ServerRelativeUrl"
          )
          .get()
          .then(result => {
            d.resolve(result);
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static ObtenerFolderAndFiles(
    nombreLista: string,
    nombreFolder: string
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);

        web
          .getFolderByServerRelativeUrl(
            _spPageContextInfo.webServerRelativeUrl +
            "/" +
            nombreLista +
            "/" +
            nombreFolder
          )
          .expand(
            "RootFolder,Folders,Folders,Folders/Name,Folders/Folders/Name,Folders/Folders/Folders/Name,Folders/Folders/Folders/Folders/Name,Folders/Folders/Folders/Folders/Folders/Name,Folders/Folders/Folders/Folders/Folders/Folders/Name,Folders/Files,Folders/Folders/Files,Folders/Folders/Folders/Files,Folders/Folders/Folders/Folders/Files,Folders/Folders/Folders/Folders/Folders/Files,Folders/Folders/Folders/Folders/Folders/Folders/Files,Files/ListItemAllFields,Folders/Files/ListItemAllFields,Folders/Folders/Files/ListItemAllFields,Folders/Folders/Folders/Files/ListItemAllFields,Folders/Folders/Folders/Folders/Files/ListItemAllFields,Folders/Folders/Folders/Folders/Folders/Files/ListItemAllFields,Folders/Folders/Folders/Folders/Folders/Folders/Files/ListItemAllFields,Folders/Files/Length,Folders/Folders/Files/Length,Folders/Folders/Folders/Files/Length,Folders/Folders/Folders/Folders/Files/Length,Folders/Folders/Folders/Folders/Folders/Files/Length,Folders/Folders/Folders/Folders/Folders/Folders/Files/Length"
          )
          .select(
            "*" // ID,Title,Name,RootFolder/ServerRelativeUrl,ParentWeb/Url,Folders/Name,Folders/Folders/Name,Folders/Files,Folders/Files/ListItemAllFields,Folders/Files/Length,Folders/Files/ServerRelativeUrl,Files/Length,Files/ListItemAllFields,Files/ServerRelativeUrl,Files/ID"
          )
          .get()
          .then(result => {
            d.resolve(result);
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static AgregarFile(
    nombreLista: string,
    nombreFolder: string,
    file: any,
    datos: {}
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);

        web
          .getFolderByServerRelativeUrl(
            _spPageContextInfo.webServerRelativeUrl +
            "/" +
            nombreLista +
            "/" +
            nombreFolder +
            "/"
          )
          .files.addChunked(
            file.name,
            file,
            data => {
              console.dir(data);
            },
            true
          )
          .then(f => {
            web
              .getFolderByServerRelativeUrl(
                _spPageContextInfo.webServerRelativeUrl +
                "/" +
                nombreLista +
                "/" +
                nombreFolder +
                "/" +
                file.name
              )
              .getItem()
              .then(item => {
                item
                  .update(datos)
                  .then((result: any) => {
                    const fileResult = {
                      ID: result.item.ID,
                      Url: f.data.ServerRelativeUrl
                    };
                    d.resolve(fileResult);
                  })
                  .catch((errorResult: any) => {
                    d.reject(
                      errorResult.data.responseBody["odata.error"].message.value
                    );
                  });
              });
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static ObtenerFilesTrama(
    nombreLista: string,
    nombreFolder: string
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);

        web
          .getFolderByServerRelativeUrl(
            _spPageContextInfo.webServerRelativeUrl +
            "/" +
            nombreLista +
            "/" +
            nombreFolder
          )
          .expand("RootFolder,Folders,Files/ListItemAllFields")
          .select("Title,Name,RootFolder/ServerRelativeUrl, ParentWeb/Url")
          .get()
          .then(result => {
            const results = result.Files.filter((file: any) => {
              return file.ListItemAllFields.TipoDocumento === "Trama";
            });
            d.resolve(results);
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static ObtenerUsuarioActual(): Promise<Usuario> {
    const d: Deferred<Usuario> = new Deferred<Usuario>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.currentUser
          .get()
          .then(data => {
            if (data != null) {
              const elemento = new Usuario();
              elemento.setearValores(
                _spPageContextInfo.userId,
                data.Title,
                data.Email
              );

              d.resolve(elemento);
            }
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async ObtenerElementosPaginados(
    nombreLista: string,
    viewQuery: string,
    pagingInfo: string
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    const CamlQuery = {
      ViewXml: viewQuery,
      Paging: pagingInfo
    };

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);
        web.lists
          .getByTitle(nombreLista)
          .renderListDataAsStream(CamlQuery)
          .then(result => {
            let tieneMasPaginas: boolean = false;

            if (result.Row.length > 0) {
              const id = result.Row[result.Row.length - 1].ID;
              const pagingInfoNext = "Paged=TRUE&p_ID=" + id;

              const CamlQueryNext = {
                ViewXml: viewQuery,
                Paging: pagingInfoNext
              };

              web.lists
                .getByTitle(nombreLista)
                .renderListDataAsStream(CamlQueryNext)
                .then(resultNext => {
                  tieneMasPaginas = resultNext.Row.length > 0;
                  d.resolve({
                    Result: result.Row,
                    TieneMasPaginas: tieneMasPaginas
                  });
                });
            } else {
              d.resolve({ Result: result.Row, TieneMasPaginas: false });
            }
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static ObtenerFilesTramaContratos(
    nombreLista: string,
    nombreFolder: string
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        const web = new Web(_spPageContextInfo.webAbsoluteUrl);

        web
          .getFolderByServerRelativeUrl(
            _spPageContextInfo.webServerRelativeUrl +
            "/" +
            nombreLista +
            "/" +
            nombreFolder
          )
          .expand("RootFolder,Folders,Files/ListItemAllFields")
          .select(
            "Title,Name,RootFolder/ServerRelativeUrl, ParentWeb/Url, TipoDocumento"
          )
          .get()
          .then(result => {
            const results = result.Files.filter((file: any) => {
              return (
                file.ListItemAllFields.TipoDocumento === "Trama" ||
                file.ListItemAllFields.TipoDocumento ===
                "Contrato Regular PDF" ||
                file.ListItemAllFields.TipoDocumento ===
                "Contrato Potestativo PDF"
              );
            });
            d.resolve(results);
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static CrearSubCarpeta(
    nombreBiblioteca: string,
    nombreCarpeta: string,
    nombreCarpetaPadre: string
  ) {
    const dfd: Deferred<SP.ListItem> = new Deferred<SP.ListItem>();

    loadPageContext()
      .then(async _ => {
        const clientContext = SP.ClientContext.get_current();
        const oList = clientContext
          .get_web()
          .get_lists()
          .getByTitle(nombreBiblioteca);
        clientContext.load(oList);
        const itemCreateInfo = new SP.ListItemCreationInformation();
        itemCreateInfo.set_underlyingObjectType(SP.FileSystemObjectType.folder);
        const rutaFolder =
          ParametrosNoAdministrables.ValoresGenericos.urlDescarga +
          _spPageContextInfo.webServerRelativeUrl +
          "/" +
          nombreBiblioteca +
          "/" +
          nombreCarpetaPadre;

        itemCreateInfo.set_folderUrl(rutaFolder);
        itemCreateInfo.set_leafName(nombreCarpeta);

        const item = oList.addItem(itemCreateInfo);
        item.set_item("ContentTypeId", "0x0120");
        item.set_item("Title", nombreCarpeta);

        item.update();
        clientContext.load(item);
        clientContext.executeQueryAsync(
          (sender: any, args: SP.ClientRequestFailedEventArgs): void => {
            dfd.resolve(item);
          },
          (sender: any, args: SP.ClientRequestFailedEventArgs): void => {
            dfd.reject(
              args.get_message() + ". StackTrace: " + args.get_stackTrace()
            );
          }
        );
      })
      .catch((errorResult: any) => {
        dfd.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return dfd.promise;
  }

  public static CrearCarpeta(nombreBiblioteca: string, nombreCarpeta: string) {
    const dfd: Deferred<SP.ListItem> = new Deferred<SP.ListItem>();

    loadPageContext()
      .then(async _ => {
        const clientContext = SP.ClientContext.get_current();
        const oList = clientContext
          .get_web()
          .get_lists()
          .getByTitle(nombreBiblioteca);
        clientContext.load(oList);
        const itemCreateInfo = new SP.ListItemCreationInformation();
        itemCreateInfo.set_underlyingObjectType(SP.FileSystemObjectType.folder);
        itemCreateInfo.set_leafName(nombreCarpeta);

        const item = oList.addItem(itemCreateInfo);
        item.set_item("ContentTypeId", "0x0120");
        item.set_item("Title", nombreCarpeta);

        item.update();
        clientContext.load(item);
        clientContext.executeQueryAsync(
          (sender: any, args: SP.ClientRequestFailedEventArgs): void => {
            dfd.resolve(item);
          },
          (sender: any, args: SP.ClientRequestFailedEventArgs): void => {
            dfd.reject(
              args.get_message() + ". StackTrace: " + args.get_stackTrace()
            );
          }
        );
      })
      .catch((errorResult: any) => {
        dfd.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return dfd.promise;
  }

  public static CopiarArchivos(
    rutaCarpetaOrigen: string,
    rutaCarpetaDestino: string
  ) {
    const dfd: Deferred<boolean> = new Deferred<boolean>();

    loadPageContext()
      .then(async _ => {
        const clientContext = SP.ClientContext.get_current();
        const web = clientContext.get_web();
        const folderSrc = web.getFolderByServerRelativeUrl(rutaCarpetaOrigen);
        clientContext.load(folderSrc, "Files");

        clientContext.executeQueryAsync(
          (sender: any, args: SP.ClientRequestFailedEventArgs): void => {
            const files = folderSrc.get_files();
            const e = files.getEnumerator();
            const dest = [];
            while (e.moveNext()) {
              const file = e.get_current();
              const destLibUrl = rutaCarpetaDestino + "/" + file.get_name();
              dest.push(destLibUrl);
              file.copyTo(destLibUrl, true);
            }
            clientContext.executeQueryAsync(
              (sender2: any, args2: SP.ClientRequestFailedEventArgs): void => {
                dfd.resolve(true);
              },
              (sender3: any, args3: SP.ClientRequestFailedEventArgs): void => {
                dfd.reject(
                  args3.get_message() +
                  ". StackTrace: " +
                  args3.get_stackTrace()
                );
              }
            );
          },
          (sender4: any, args4: SP.ClientRequestFailedEventArgs): void => {
            dfd.reject(
              args4.get_message() + ". StackTrace: " + args4.get_stackTrace()
            );
          }
        );
      })
      .catch((errorResult: any) => {
        dfd.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return dfd.promise;
  }

  public static ConvertirDateToStringReactES(fecha: Date): string {
    let result = "";
    const dia = fecha.getDate() > 9 ? fecha.getDate() : "0" + fecha.getDate();
    const mes =
      fecha.getMonth() + 1 > 9
        ? fecha.getMonth() + 1
        : "0" + (fecha.getMonth() + 1);

    result = [fecha.getFullYear(), mes, dia].join("-");
    return result;
  }

  public static async getItemsQuery(
    nombreLista: string,
    fields: string,
    fieldsExpand: any,
    query: string,
    top: number,
    order: string,
    tipoOrder: boolean
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        pnp.sp.web.lists
          .getByTitle(nombreLista)
          .items.select(fields)
          .expand(fieldsExpand)
          .filter(query)
          .top(top)
          .orderBy(order, tipoOrder)
          .get()
          .then(result => {
            d.resolve(result);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async getItems(nombreLista: string, top: number): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        pnp.sp.web.lists
          .getByTitle(nombreLista)
          .items.top(top)
          .orderBy("Created", false)
          .get()
          .then(result => {
            d.resolve(result);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async getItem(nombreLista: string, id: number): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        pnp.sp.web.lists
          .getByTitle(nombreLista)
          .items.getById(id)
          .get()
          .then(result => {
            d.resolve(result);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async deleteItem(
    nombreLista: string,
    id: number
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        pnp.sp.web.lists
          .getByTitle(nombreLista)
          .items.getById(id)
          .delete()
          .then(result => {
            d.resolve(true);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static UpdateItem(
    nombreLista: string,
    data: {},
    id: number
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        pnp.sp.web.lists
          .getByTitle(nombreLista)
          .items.getById(id)
          .update(data)
          .then(result => {
            d.resolve(result);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async getItemsConPaginacion(
    nombreLista: string,
    fields: string,
    fieldsExpand: any,
    query: string,
    top: number,
    order: string,
    tipoOrder: boolean
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        pnp.sp.web.lists
          .getByTitle(nombreLista)
          .items.select(fields)
          .expand(fieldsExpand)
          .filter(query)
          .top(top)
          .orderBy(order, tipoOrder)
          .getPaged()
          .then(result => {
            d.resolve(result);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async addItem(nombreLista: string, data: {}): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext()
      .then(async _ => {
        pnp.setup({
          sp: {
            headers: {
              Accept: "application/json; odata=verbose"
            }
          }
        });

        pnp.sp.web.lists
          .getByTitle(nombreLista)
          .items.add(data)
          .then((result: ItemAddResult) => {
            d.resolve(result.data);
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }

  public static async AddFileWithMetada(
    Library: string,
    folder: string,
    fileName: string,
    file: any,
    data: {}
  ): Promise<any> {
    const d: Deferred<any> = new Deferred<any>();

    loadPageContext();
    pnp.setup({
      sp: {
        headers: {
          Accept: "application/json; odata=verbose"
        }
      }
    });

    pnp.sp.web
      .getFolderByServerRelativeUrl(folder)
      .files.add(fileName, file, true)
      .then(f => {
        f.file.listItemAllFields
          .get(new ODataDefaultParser(), {
            headers: {
              "Cache-Control": "no-cache"
            }
          })
          .then(item => {
            const id = item.ID;
            pnp.sp.site.rootWeb.lists
              .getByTitle(Library)
              .items.getById(id)
              .update(data)
              .then(result => {
                d.resolve(true);
              })
              .catch((errorResult: any) => {
                d.reject(
                  errorResult.data.responseBody["odata.error"].message.value
                );
              });
          })
          .catch((errorResult: any) => {
            d.reject(
              errorResult.data.responseBody["odata.error"].message.value
            );
          });
      })
      .catch((errorResult: any) => {
        d.reject(errorResult.data.responseBody["odata.error"].message.value);
      });

    return d.promise;
  }
}
