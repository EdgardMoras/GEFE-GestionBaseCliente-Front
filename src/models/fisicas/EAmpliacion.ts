import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { EBaseEntidadTransaccional } from "src/models/Base/EBaseEntidadTransaccional";
import Usuario from "src/models/Base/Usuario";
import { Deferred } from "ts-deferred";
import { RestFiltros } from "src/genericos/RestFiltros";
import Funciones from "src/genericos/Funciones";
import EArchivoExpediente from "src/models/logicas/EArchivoExpediente";
import EExpediente from './EExpediente';

export default class EAmpliacion extends EBaseEntidadTransaccional {
  public static Campos = {
    ComentarioSolicitud: ParametrosNoAdministrables.ColumnasSitio.ComentarioSolicitud,
    EstadoSolicitudAmpliacion: ParametrosNoAdministrables.ColumnasSitio.EstadoSolicitudAmpliacion,
    Expediente: ParametrosNoAdministrables.ColumnasSitio.Expediente,
    FechaHoraValidacion: ParametrosNoAdministrables.ColumnasSitio.FechaHoraValidacion,
    FechaNuevoPlazo: ParametrosNoAdministrables.ColumnasSitio.FechaNuevoPlazo,
    FechaNuevoPlazoOtorgado: ParametrosNoAdministrables.ColumnasSitio.FechaNuevoPlazoOtorgado,
    FechaPlazoActual: ParametrosNoAdministrables.ColumnasSitio.FechaPlazoActual,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
    UsuarioValidacion: ParametrosNoAdministrables.ColumnasSitio.UsuarioValidacion,
  };
  public static CamposExpand = {
    Expediente: ParametrosNoAdministrables.ColumnasSitio.Expediente,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
    UsuarioValidacion: ParametrosNoAdministrables.ColumnasSitio.UsuarioValidacion
  };
  public static CamposRest = {
    ComentarioSolicitud: ParametrosNoAdministrables.ColumnasSitio.ComentarioSolicitud,
    EstadoSolicitudAmpliacion: ParametrosNoAdministrables.ColumnasSitio.EstadoSolicitudAmpliacion,
    FechaHoraValidacion: ParametrosNoAdministrables.ColumnasSitio.FechaHoraValidacion,
    FechaNuevoPlazo: ParametrosNoAdministrables.ColumnasSitio.FechaNuevoPlazo,
    FechaNuevoPlazoOtorgado: ParametrosNoAdministrables.ColumnasSitio.FechaNuevoPlazoOtorgado,
    FechaPlazoActual: ParametrosNoAdministrables.ColumnasSitio.FechaPlazoActual,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
  };


  public static async obtenerRegistros(idExpediente: number): Promise<EAmpliacion[]> {
    const dfd: Deferred<EAmpliacion[]> = new Deferred<EAmpliacion[]>();

    const filtroPorLookukIdYEstadoActivo: string = RestFiltros.obtenerFiltroPorLookupIdYEstadoActivo(
      this.Campos.Expediente,
      idExpediente
    );
    const listaFieldsExpand = Funciones.obtenerListaCampos(
      EAmpliacion.CamposExpand
    );
    const listaFieldsSelect = Funciones.obtenerListaCampos(EAmpliacion.CamposRest);

    const listaFieldsSelectExpand = [
      RestFiltros.obtenerFieldExpandLookup(EAmpliacion.CamposExpand.Expediente),
      RestFiltros.obtenerFieldExpandUsuario(EAmpliacion.CamposExpand.UsuarioRegistro),
      RestFiltros.obtenerFieldExpandUsuario(EAmpliacion.CamposExpand.UsuarioValidacion)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsSelectExpand
    );

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterOrderByFechaRegistro,
      ParametrosNoAdministrables.Listas.Ampliaciones,
      listaFieldsSelectYFieldsExpand.join(","),
      listaFieldsExpand.join(","),
      filtroPorLookukIdYEstadoActivo
    );

    Promise.all([Funciones.ObtenerElementoPorRest(url)])
      .then(([resultadosRegistros]) => {
        if (resultadosRegistros.length === 0) {
          dfd.resolve([]);
          return;
        }

        const listaRegistros: EAmpliacion[] = []
        let ampliacion = new EAmpliacion();
        resultadosRegistros.forEach((elementoItemLista: any) => {
          ampliacion = new EAmpliacion();
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

  public static async obtenerRegistroConArchivos(
    idExpediente: number,
    idAmpliacion: number
  ): Promise<EAmpliacion> {
    const dfd: Deferred<EAmpliacion> = new Deferred<EAmpliacion>();

    const filtroPorIdYEstadoActivo: string = RestFiltros.obtenerFiltroPorIdYEstadoActivo(
      idAmpliacion
    );
    const listaCamposExpand = Funciones.obtenerListaCampos(
      EAmpliacion.CamposExpand
    );
    const listaFieldsSelect = Funciones.obtenerListaCampos(EAmpliacion.CamposRest);

    const listaFieldsSelectExpand = [
      RestFiltros.obtenerFieldExpandLookup(EAmpliacion.CamposExpand.Expediente),
      RestFiltros.obtenerFieldExpandUsuario(EAmpliacion.CamposExpand.UsuarioRegistro),
      RestFiltros.obtenerFieldExpandUsuario(EAmpliacion.CamposExpand.UsuarioValidacion)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsSelectExpand
    );

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter,
      ParametrosNoAdministrables.Listas.Ampliaciones,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      filtroPorIdYEstadoActivo
    );

    if (idAmpliacion === 0) {
      dfd.resolve(new EAmpliacion());
    }
    else {
      Promise.all([
        Funciones.ObtenerElementoPorRest(url),
        this.obtenerArchivos(idExpediente + "/" + idAmpliacion)
      ])
        .then(([resultadoObtenerExpediente, resultadoListaArchivos]) => {
          if (resultadoObtenerExpediente.length === 0) {
            dfd.resolve(new EAmpliacion());
            return;
          }

          const ampliacion = new EAmpliacion();
          ampliacion.setearValoresRest(resultadoObtenerExpediente[0]);

          if (resultadoListaArchivos.length > 0) {
            ampliacion.ArchivoCargo = resultadoListaArchivos[0];
          }

          dfd.resolve(ampliacion);
        })
        .catch(error => {
          dfd.reject(error);
        });
    }

    return dfd.promise;
  }

  public static async obtenerArchivos(
    nombreCarpeta: string
  ): Promise<EArchivoExpediente[]> {
    const dfd: Deferred<EArchivoExpediente[]> = new Deferred<
      EArchivoExpediente[]
      >();

    Funciones.ObtenerFiles(
      ParametrosNoAdministrables.Bibliotecas.ArchivosExpediente,
      nombreCarpeta.toString()
    )
      .then(result => {
        const listaArchivos: EArchivoExpediente[] = [];

        for (const file of result.Files) {
          const archivo: EArchivoExpediente = new EArchivoExpediente();
          archivo.setValores(
            file.ListItemAllFields.ID,
            file.ListItemAllFields.Title,
            file.ServerRelativeUrl,
            file.length
          );

          listaArchivos.push(archivo);
        }

        dfd.resolve(listaArchivos);
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }


  public ComentarioSolicitud: string;
  public EstadoSolicitudAmpliacion: string;
  public Expediente: EExpediente;
  public FechaHoraValidacion: string;
  public FechaNuevoPlazo: string;
  public FechaNuevoPlazoOtorgado: string;
  public FechaPlazoActual: string;
  public FechaRegistro: string;
  public ID: number;
  public UsuarioRegistro: Usuario;
  public UsuarioValidacion: Usuario;

  public ArchivoCargo: EArchivoExpediente | null;

  constructor() {
    super();

    this.ArchivoCargo = null;

    this.ComentarioSolicitud = "";
    this.EstadoSolicitudAmpliacion = "";
    this.Expediente = new EExpediente();
    this.FechaHoraValidacion = "";
    this.FechaNuevoPlazo = "";
    this.FechaNuevoPlazoOtorgado = "";
    this.FechaPlazoActual = "";
    this.FechaRegistro = "";
    this.ID = 0;
    this.UsuarioRegistro = new Usuario();
    this.UsuarioValidacion = new Usuario();
  }

  public setearValoresRest(elementoItemLista: any) {
    this.ComentarioSolicitud = RestFiltros.parsearTexto(
      elementoItemLista,
      EAmpliacion.Campos.ComentarioSolicitud
    );
    this.EstadoSolicitudAmpliacion = RestFiltros.parsearTexto(
      elementoItemLista,
      EAmpliacion.Campos.EstadoSolicitudAmpliacion
    );
    this.Expediente = RestFiltros.parsearLookup(
      elementoItemLista,
      EAmpliacion.Campos.Expediente,
      EExpediente
    );
    this.FechaHoraValidacion = RestFiltros.parsearTexto(
      elementoItemLista,
      EAmpliacion.Campos.FechaHoraValidacion
    );
    this.FechaNuevoPlazo = RestFiltros.parsearTexto(
      elementoItemLista,
      EAmpliacion.Campos.FechaNuevoPlazo
    );
    this.FechaNuevoPlazoOtorgado = RestFiltros.parsearTexto(
      elementoItemLista,
      EAmpliacion.Campos.FechaNuevoPlazoOtorgado
    );
    this.FechaPlazoActual = RestFiltros.parsearTexto(
      elementoItemLista,
      EAmpliacion.Campos.FechaPlazoActual
    );
    this.FechaRegistro = RestFiltros.parsearTexto(
      elementoItemLista,
      EAmpliacion.Campos.FechaRegistro
    );
    this.ID = elementoItemLista[EAmpliacion.Campos.ID];
    this.UsuarioRegistro = RestFiltros.parsearUsuario(
      elementoItemLista,
      EAmpliacion.Campos.UsuarioRegistro
    );
    this.UsuarioValidacion = RestFiltros.parsearUsuario(
      elementoItemLista,
      EAmpliacion.Campos.UsuarioValidacion
    );
  }

  public setearValoresConRest(elementoItemLista: any): void {
    this.ID = elementoItemLista.ID;
    this.Title = elementoItemLista.Title;
  }

}
