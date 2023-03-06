import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import ParseJsom from "src/genericos/ParseJsom";
import { EBaseEntidadTransaccional } from "src/models/Base/EBaseEntidadTransaccional";
import Usuario from "src/models/Base/Usuario";
import { Deferred } from "ts-deferred";
import { RestFiltros } from "src/genericos/RestFiltros";
import Funciones from "src/genericos/Funciones";
import EEntidad from "src/models/fisicas/EEntidad";
import Lookup from "../Base/Lookup";
import FiltroBusqueda, { TipoFiltro } from "src/models/Base/FiltroBusqueda";
import EArchivoIncidente from "src/models/logicas/EArchivoIncidencia";
// import { UtilCamlQuery } from "src/genericos/UtilCamlQuery";
import EARegistroActividadIncidente from "src/models/fisicas/ERegistroActividadIncidente";
// import EEmpresa from './EEmpresa';
import EExpediente from "src/models/fisicas/EExpediente";
import ENorma from "src/models/fisicas/ENorma";
import EIncidente from "src/models/fisicas/EIncidente";
import EReporte from "./EReporte";
import EProyecto from "./EProyecto";
// import EReporte from './EReporte';

// import EReporte from './EReporte';

export default class EIncidentes extends EBaseEntidadTransaccional {
  public static Campos = {
    ID: ParametrosNoAdministrables.ColumnaSitioIncidente.ID,
    Codigo: ParametrosNoAdministrables.ColumnaSitioIncidente.Codigo,
    Descripcion: ParametrosNoAdministrables.ColumnaSitioIncidente.Descripcion,
    EstadoIncidencia: ParametrosNoAdministrables.ColumnaSitioIncidente.Estado,
    FechaReporte: ParametrosNoAdministrables.ColumnaSitioIncidente.FechaReporte,
    PalabrasClaves:
      ParametrosNoAdministrables.ColumnaSitioIncidente.PalabrasClaves,
    FechaOcurrencia:
      ParametrosNoAdministrables.ColumnaSitioIncidente.FechaOcurrencia,
    FechaRegistro:
      ParametrosNoAdministrables.ColumnaSitioIncidente.FechaRegistro,
    MultaAsociada:
      ParametrosNoAdministrables.ColumnaSitioIncidente.MultaAsociada,
    RequiereSeguimiento:
      ParametrosNoAdministrables.ColumnaSitioIncidente.RequiereSeguimiento,
    RiesgoOperacional:
      ParametrosNoAdministrables.ColumnaSitioIncidente.RiesgoOperacional
  };
  public static CamposExpand = {
    Entidad: ParametrosNoAdministrables.ColumnaSitioIncidente.Entidad,
    Alcance: ParametrosNoAdministrables.ColumnaSitioIncidente.Alcance,
    EvaluacionIncidente:
      ParametrosNoAdministrables.ColumnaSitioIncidente.EvaluacionIncidente,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnaSitioIncidente.Autor,
    IncidentesAsociados:
      ParametrosNoAdministrables.ColumnaSitioIncidente.IncidentesAsociados,
    ReportesAsociados:
      ParametrosNoAdministrables.ColumnaSitioIncidente.ReportesAsociados,
    ProyectoAsociados:
      ParametrosNoAdministrables.ColumnaSitioIncidente.ProyectoAsociados,
    ExpedientesRelacionados:
      ParametrosNoAdministrables.ColumnaSitioIncidente.ExpedientesRelacionados,
    NormasRelacionadas:
      ParametrosNoAdministrables.ColumnaSitioIncidente.NormasRelacionadas
  };

  public static async obtenerPorIdsIncidentes(
    idsIncidente: number[]
  ): Promise<EIncidente[]> {
    const dfd: Deferred<EIncidente[]> = new Deferred<EIncidente[]>();

    const filtrosIds = idsIncidente
      .map((id: number) => {
        return `${ParametrosNoAdministrables.ColumnasSitio.ID} eq ${id}`;
      })
      .join(" or ");
    const filtroPorIdYEstadoActivo: string = `${filtrosIds} and ${RestFiltros.obtenerFiltroPorEstadoActivo()}`;

    const listaCamposExpand = Funciones.obtenerListaCampos(
      EIncidente.CamposExpand
    );
    const listaFieldsSelect = Funciones.obtenerListaCampos(EIncidente.Campos);

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        EIncidentes.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandLookup(EIncidentes.CamposExpand.Alcance),
      RestFiltros.obtenerFieldExpandLookup(EIncidentes.CamposExpand.Entidad),
      RestFiltros.obtenerFieldExpandLookup(
        EIncidentes.CamposExpand.EvaluacionIncidente
      ),
      RestFiltros.obtenerFieldExpandLookup(
        EIncidentes.CamposExpand.ExpedientesRelacionados
      ),
      RestFiltros.obtenerFieldExpandLookup(
        EIncidentes.CamposExpand.NormasRelacionadas
      ),
      RestFiltros.obtenerFieldExpandLookup(
        EIncidentes.CamposExpand.IncidentesAsociados
      ),
      RestFiltros.obtenerFieldExpandLookup(
        EIncidentes.CamposExpand.ReportesAsociados
      ),
      RestFiltros.obtenerFieldExpandLookup(
        EIncidentes.CamposExpand.ProyectoAsociados
      )
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter,
      ParametrosNoAdministrables.Listas.Incidente,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      filtroPorIdYEstadoActivo
    );

    const listaResultado: EIncidente[] = [];

    if (idsIncidente.length === 0) {
      dfd.resolve([]);
    } else {
      Promise.all([Funciones.ObtenerElementoPorRest(url)])
        .then(([resultadoIncidente]) => {
          if (resultadoIncidente.length === 0) {
            dfd.resolve([]);
            return;
          }

          resultadoIncidente.forEach((element: any) => {
            const incidente = new EIncidente();
            incidente.setearValoresRest(element);
            listaResultado.push(incidente);
          });

          dfd.resolve(listaResultado);
        })
        .catch(error => {
          dfd.reject(error);
        });
    }

    return dfd.promise;
  }

  public static setearValoresBusquedaIncidenteAsociadas(
    elementoItemLista: SP.ListItem,
    objeto: EIncidentes
  ) {
    objeto.Codigo = ParseJsom.parsearString(
      elementoItemLista,
      EIncidentes.Campos.Codigo
    );

    objeto.Descripcion = ParseJsom.parsearString(
      elementoItemLista,
      EIncidentes.Campos.Descripcion
    );
    objeto.Entidad = ParseJsom.parsearLookup(
      elementoItemLista,
      EIncidentes.CamposExpand.Entidad
    );
    objeto.Alcance = ParseJsom.parsearLookupMultiple(
      elementoItemLista,
      EIncidentes.CamposExpand.Alcance
    );
    objeto.EvaluacionIncidente = ParseJsom.parsearLookup(
      elementoItemLista,
      EIncidentes.CamposExpand.EvaluacionIncidente
    );
    objeto.FechaReporte = ParseJsom.parsearFechaString(
      elementoItemLista,
      EIncidentes.Campos.FechaReporte
    );
    objeto.EstadoIncidencia = ParseJsom.parsearString(
      elementoItemLista,
      EIncidentes.Campos.EstadoIncidencia
    );
    objeto.UsuarioRegistro = ParseJsom.parsearUsuario(
      elementoItemLista,
      EIncidentes.CamposExpand.UsuarioRegistro
    );
    objeto.PalabrasClaves = ParseJsom.parsearString(
      elementoItemLista,
      EIncidentes.Campos.PalabrasClaves
    );
    objeto.FechaOcurrencia = ParseJsom.parsearFechaString(
      elementoItemLista,
      EIncidentes.Campos.FechaOcurrencia
    );
    objeto.FechaRegistro = ParseJsom.parsearFechaString(
      elementoItemLista,
      EIncidentes.Campos.FechaRegistro
    );
    objeto.MultaAsociada = ParseJsom.parsearString(
      elementoItemLista,
      EIncidentes.Campos.MultaAsociada
    );
    objeto.RequiereSeguimiento = ParseJsom.parsearString(
      elementoItemLista,
      EIncidentes.Campos.RequiereSeguimiento
    );
    objeto.RiesgoOperacional = ParseJsom.parsearString(
      elementoItemLista,
      EIncidentes.Campos.RiesgoOperacional
    );
    objeto.ID = ParseJsom.parsearNumber(
      elementoItemLista,
      EIncidentes.Campos.ID
    );
  }

  /*public Archivos: string;
  public CompartidoCon: Usuario[];
  public EsConfidencial: boolean;
  public EsIncumplimiento: boolean;
  public EstadoDirectiva: string;
  public NombreDocumento: string;
  public FechaPlazo: string;
  public FechaRecepcion: string;
  public OrigenPlazo: string;
  public PalabrasClaves: string;

  public Empresa: EEmpresa;
  public Entidad: EEntidad;
  public Responsable: Usuario;
  public TipoDirectiva: ETipoDirectiva;*/

  public ListaArchivos: EArchivoIncidente[];

  public Codigo: string;
  public Descripcion: string;
  public Entidad: Lookup;
  public Alcance: Lookup[];
  public AlcanceMostrar: string[];
  public EvaluacionIncidente: Lookup;
  public EstadoIncidencia: string;
  public FechaReporte: string;
  public FechaRegistro: string;
  public FechaOcurrencia: string;
  public MultaAsociada: string;
  public RequiereSeguimiento: boolean;
  public RiesgoOperacional: boolean;
  public UsuarioRegistro: Usuario;
  public PalabrasClaves: string;
  public Incidente: EIncidentes;
  public Detalle: string;

  public mostrar: boolean;
  public eventoOcultarPopup: () => void;
  public esMostrarPopupExportarIncidencias: boolean;

  public EnProceso: number;
  public PorVerificar: number;
  public Implementadas: number;

  public TareaDetalle: string;
  public ResponsableTarea: string;
  public CreadorTarea: string;
  public TareaFechaLimite: Date;
  public TareaFechaRegistro: Date;
  public TareaFechaAtencion: Date;
  public TareaCodigo: string;
  public TareaEstado: string;

  public CodigoPA: string;
  public EstadoPA: string;
  public ResponsablePA: string;
  public DetallePA: string;
  public FechaCompromisoPA: string;
  public CodigoTarea: string;
  public FechaFinal: Date;

  public ExpedientesRelacionados: EExpediente[];
  public NormasRelacionadas: ENorma[];
  public IncidenteRelacionadas: EIncidente[];
  public ReportesAsociados: EReporte[];
  public ProyectoAsociados: EProyecto[];


  constructor() {
    super();

    /*this.Archivos = "";
    this.EsConfidencial = false;
    this.EsIncumplimiento = false;
    this.EstadoDirectiva = "";
    this.NombreDocumento = "";
    this.FechaPlazo = "";
    this.FechaRecepcion = "";
    this.OrigenPlazo = "";
    this.PalabrasClaves = "";

    this.CompartidoCon = [];
    this.Empresa = new EEmpresa();
    this.Entidad = new EEntidad();
    this.Responsable = new Usuario();
    this.TipoDirectiva = new ETipoDirectiva();

    this.ListaArchivos = [];*/

    this.Codigo = "";
    this.Descripcion = "";
    this.Entidad = new Lookup();
    this.Alcance = [];
    this.AlcanceMostrar = [];
    this.EvaluacionIncidente = new Lookup();
    this.EstadoIncidencia = "";
    this.PalabrasClaves = "";
    this.FechaReporte = "";
    this.FechaRegistro = "";
    this.FechaOcurrencia = "";
    this.MultaAsociada = "";
    this.RequiereSeguimiento = false;
    this.RiesgoOperacional = false;
    this.UsuarioRegistro = new Usuario();

    this.EnProceso = 0;
    this.PorVerificar = 0;
    this.Implementadas = 0;

    this.ExpedientesRelacionados = [];
    this.NormasRelacionadas = [];
    this.IncidenteRelacionadas = [];
    this.ReportesAsociados = [];
  }

  public setearValores(elementoItemLista: SP.ListItem) {
    this.Codigo = ParseJsom.parsearString(
      elementoItemLista,
      EIncidentes.Campos.Codigo
    );

    this.Descripcion = ParseJsom.parsearString(
      elementoItemLista,
      EIncidentes.Campos.Descripcion
    );
    this.Entidad = ParseJsom.parsearLookup(
      elementoItemLista,
      EIncidentes.CamposExpand.Entidad
    );
    this.Alcance = ParseJsom.parsearLookupMultiple(
      elementoItemLista,
      EIncidentes.CamposExpand.Alcance
    );
    this.EvaluacionIncidente = ParseJsom.parsearLookup(
      elementoItemLista,
      EIncidentes.CamposExpand.EvaluacionIncidente
    );
    this.FechaReporte = ParseJsom.parsearFechaString(
      elementoItemLista,
      EIncidentes.Campos.FechaReporte
    );
    this.EstadoIncidencia = ParseJsom.parsearString(
      elementoItemLista,
      EIncidentes.Campos.EstadoIncidencia
    );
    this.UsuarioRegistro = ParseJsom.parsearUsuario(
      elementoItemLista,
      EIncidentes.CamposExpand.UsuarioRegistro
    );
    this.PalabrasClaves = ParseJsom.parsearString(
      elementoItemLista,
      EIncidentes.Campos.PalabrasClaves
    );
    this.FechaOcurrencia = ParseJsom.parsearFechaString(
      elementoItemLista,
      EIncidentes.Campos.FechaOcurrencia
    );
    this.FechaRegistro = ParseJsom.parsearFechaString(
      elementoItemLista,
      EIncidentes.Campos.FechaRegistro
    );
    this.MultaAsociada = ParseJsom.parsearString(
      elementoItemLista,
      EIncidentes.Campos.MultaAsociada
    );
    this.RequiereSeguimiento = ParseJsom.parsearString(
      elementoItemLista,
      EIncidentes.Campos.RequiereSeguimiento
    );
    this.RiesgoOperacional = ParseJsom.parsearString(
      elementoItemLista,
      EIncidentes.Campos.RiesgoOperacional
    );
    this.ID = ParseJsom.parsearNumber(elementoItemLista, EIncidentes.Campos.ID);
  }

  public async obtenerIncidenteConArchivos(
    idVencimiento: number
  ): Promise<EIncidentes> {
    const dfd: Deferred<EIncidentes> = new Deferred<EIncidentes>();

    const filtroPorIdYEstadoActivo: string = RestFiltros.obtenerFiltroPorIdYEstadoActivo(
      idVencimiento
    );
    const listaCamposExpand = Funciones.obtenerListaCampos(
      EIncidentes.CamposExpand
    );
    const listaFieldsSelect = Funciones.obtenerListaCampos(EIncidentes.Campos);

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        EIncidentes.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandLookup(EIncidentes.CamposExpand.Alcance),
      RestFiltros.obtenerFieldExpandLookup(EIncidentes.CamposExpand.Entidad),
      RestFiltros.obtenerFieldExpandLookup(
        EIncidentes.CamposExpand.EvaluacionIncidente
      ),
      this.obtenerFieldExpandLookupExpedienteRelacionado(
        ENorma.CamposExpand.ExpedientesRelacionados
      ),
      this.obtenerFieldExpandLookupNormaRelacionado(
        ENorma.CamposExpand.NormasRelacionadas
      ),
      this.obtenerFieldExpandLookupIncidenteRelacionado(
        EIncidentes.CamposExpand.IncidentesAsociados
      ),

      RestFiltros.obtenerFieldExpandLookup(
        EIncidentes.CamposExpand.ReportesAsociados
      ),
      RestFiltros.obtenerFieldExpandLookup(
        EIncidentes.CamposExpand.ProyectoAsociados
      )
      // this.obtenerFieldExpandLookupReporteRelacionado(EIncidentes.CamposExpand.ReportesAsociados),
      // this.obtenerFieldExpandLookupProyectoRelacionado(EIncidentes.CamposExpand.ProyectoAsociados),
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter,
      ParametrosNoAdministrables.Listas.Incidente,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      filtroPorIdYEstadoActivo
    );

    Promise.all([
      Funciones.ObtenerElementoPorRest(url),
      this.obtenerArchivos(idVencimiento)
    ])
      .then(([resultadoObtenerVencimiento, resultadoListaArchivos]) => {
        if (resultadoObtenerVencimiento.length === 0) {
          dfd.resolve(this);
          return;
        }
        this.setearValoresRest(resultadoObtenerVencimiento[0]);
        this.ListaArchivos = resultadoListaArchivos;
        Promise.all([
          EExpediente.obtenerPorIdsExpedientes(
            this.ExpedientesRelacionados.map(x => x.ID)
          ),
          ENorma.obtenerPorIdsNormas(this.NormasRelacionadas.map(x => x.ID)),
          EIncidente.obtenerPorIdsIncidentes(
            this.IncidenteRelacionadas.map(x => x.ID)
          ),
          EReporte.obtenerPorIdsReportes(this.ReportesAsociados.map(x => x.ID)),
          // EProyecto.obtenerPorIdsProyecto(this.ProyectoAsociados.map(x => x.ID))
        ])
          .then(
            ([
              resultadoObtenerExpedientesRelacionados,
              resultadoObtenerNormasRelacionadas,
              resultadoObtenerIncidentesRelacionados,
              resultadoObtenerReportesAsociados
              // resultadoObtenerProyectoAsociados
            ]) => {
              this.ExpedientesRelacionados = resultadoObtenerExpedientesRelacionados;
              this.NormasRelacionadas = resultadoObtenerNormasRelacionadas;
              this.IncidenteRelacionadas = resultadoObtenerIncidentesRelacionados;
              this.ReportesAsociados = resultadoObtenerReportesAsociados;
              // this.ProyectoAsociados = resultadoObtenerProyectoAsociados;

              dfd.resolve(this);
            }
          )
          .catch(error => {
            dfd.reject(error);
          });

        // dfd.resolve(this);
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }
  public obtenerFieldExpandLookupExpedienteRelacionado(
    nombreColumnaExpand: string
  ) {
    return `${nombreColumnaExpand}/${
      ParametrosNoAdministrables.ColumnasSitio.ID
      },${nombreColumnaExpand}/${EExpediente.Campos.NombreDocumento}`;
  }
  public obtenerFieldExpandLookupNormaRelacionado(nombreColumnaExpand: string) {
    return `${nombreColumnaExpand}/${
      ParametrosNoAdministrables.ColumnasSitio.ID
      },${nombreColumnaExpand}/${ENorma.Campos.Codigo}`;
  }
  public obtenerFieldExpandLookupIncidenteRelacionado(
    nombreColumnaExpand: string
  ) {
    return `${nombreColumnaExpand}/${
      ParametrosNoAdministrables.ColumnasSitio.ID
      },${nombreColumnaExpand}/${ENorma.Campos.Codigo}`;
  }

  public obtenerFieldExpandLookupReporteRelacionado(
    nombreColumnaExpand: string
  ) {
    return `${nombreColumnaExpand}/${
      ParametrosNoAdministrables.ColumnasSitio.ID
      },${nombreColumnaExpand}/${EReporte.Campos.CodigoReporte}`;
  }


  public async obtenerArchivos(
    nombreCarpeta: number
  ): Promise<EArchivoIncidente[]> {
    const dfd: Deferred<EArchivoIncidente[]> = new Deferred<
      EArchivoIncidente[]
    >();

    Funciones.ObtenerFiles(
      ParametrosNoAdministrables.Bibliotecas.ArchivosIncidente,
      nombreCarpeta.toString() + "/Archivos"
    )
      .then(result => {
        const listaArchivos: EArchivoIncidente[] = [];

        for (const file of result.Files) {
          const archivo: EArchivoIncidente = new EArchivoIncidente();
          archivo.setValores(
            file.ListItemAllFields.ID,
            file.ListItemAllFields.Title,
            file.ServerRelativeUrl,
            file.Length
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

  public setearValoresRest(elementoItemLista: any) {
    this.ID = RestFiltros.parsearNumero(
      elementoItemLista,
      EIncidentes.Campos.ID
    );
    this.Codigo = RestFiltros.parsearTexto(
      elementoItemLista,
      EIncidentes.Campos.Codigo
    );

    this.Descripcion = RestFiltros.parsearTexto(
      elementoItemLista,
      EIncidentes.Campos.Descripcion
    );
    this.Alcance = RestFiltros.parsearLookupMultiple(
      elementoItemLista,
      EIncidentes.CamposExpand.Alcance,
      EEntidad
    );
    this.Entidad = RestFiltros.parsearLookup(
      elementoItemLista,
      EIncidentes.CamposExpand.Entidad,
      EEntidad
    );
    this.EvaluacionIncidente = RestFiltros.parsearLookup(
      elementoItemLista,
      EIncidentes.CamposExpand.EvaluacionIncidente,
      EEntidad
    );
    this.FechaReporte = RestFiltros.parsearTexto(
      elementoItemLista,
      EIncidentes.Campos.FechaReporte
    );
    this.FechaOcurrencia = RestFiltros.parsearTexto(
      elementoItemLista,
      EIncidentes.Campos.FechaOcurrencia
    );
    this.FechaRegistro = RestFiltros.parsearTexto(
      elementoItemLista,
      EIncidentes.Campos.FechaRegistro
    );
    this.EstadoIncidencia = RestFiltros.parsearTexto(
      elementoItemLista,
      EIncidentes.Campos.EstadoIncidencia
    );
    this.UsuarioRegistro = RestFiltros.parsearUsuario(
      elementoItemLista,
      EIncidentes.CamposExpand.UsuarioRegistro
    );
    this.PalabrasClaves = RestFiltros.parsearTexto(
      elementoItemLista,
      EIncidentes.Campos.PalabrasClaves
    );
    this.RequiereSeguimiento = RestFiltros.parsearBooleano(
      elementoItemLista,
      EIncidentes.Campos.RequiereSeguimiento
    );
    this.RiesgoOperacional = RestFiltros.parsearBooleano(
      elementoItemLista,
      EIncidentes.Campos.RiesgoOperacional
    );
    this.MultaAsociada = RestFiltros.parsearTexto(
      elementoItemLista,
      EIncidentes.Campos.MultaAsociada
    );

    this.ExpedientesRelacionados = RestFiltros.parsearLookupMultiple(
      elementoItemLista,
      EIncidentes.CamposExpand.ExpedientesRelacionados,
      EExpediente
    );

    this.NormasRelacionadas = RestFiltros.parsearLookupMultiple(
      elementoItemLista,
      EIncidentes.CamposExpand.NormasRelacionadas,
      ENorma
    );
    this.IncidenteRelacionadas = RestFiltros.parsearLookupMultiple(
      elementoItemLista,
      EIncidentes.CamposExpand.IncidentesAsociados,
      EIncidente
    );
    this.ReportesAsociados = RestFiltros.parsearLookupMultipleReporte(
      elementoItemLista,
      EIncidentes.CamposExpand.ReportesAsociados
    );

    this.ProyectoAsociados = RestFiltros.parsearLookupMultipleTest(
      elementoItemLista,
      EIncidentes.CamposExpand.ProyectoAsociados,
      EProyecto
    );
  }

  public obtenerFiltrosBusqueda(IdVencimiento: number): FiltroBusqueda[] {
    const filtros: FiltroBusqueda[] = [];

    filtros.push(
      new FiltroBusqueda(TipoFiltro.esIgualLookupId, "Incidente", IdVencimiento)
    );

    return filtros;
  }

  public async obtenerIncidenteRegistroActividad(
    idVencimiento: number
  ): Promise<EIncidentes[]> {
    const dfd: Deferred<EIncidentes[]> = new Deferred<EIncidentes[]>();

    const filtroPorIdYEstadoActivo: string =
      "Incidente/ID eq " + idVencimiento + "&$orderby=Created desc";
    const listaCamposExpand = Funciones.obtenerListaCampos(
      EARegistroActividadIncidente.CamposExpand
    );
    const listaFieldsSelect = Funciones.obtenerListaCampos(
      EARegistroActividadIncidente.Campos
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        EARegistroActividadIncidente.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandLookup(
        EARegistroActividadIncidente.CamposExpand.Incidente
      )
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter,
      ParametrosNoAdministrables.Listas.RegistroActividadIncidente,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      filtroPorIdYEstadoActivo
    );

    Promise.all([Funciones.ObtenerElementoPorRest(url)])
      .then(([resultadoObtenerVencimiento]) => {
        if (resultadoObtenerVencimiento.length === 0) {
          dfd.resolve(resultadoObtenerVencimiento);
          return;
        }

        // this.setearValoresConRest(resultadoObtenerVencimiento);

        dfd.resolve(resultadoObtenerVencimiento);
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public setearValoresConRest(
    elementoItemLista: EARegistroActividadIncidente
  ): void {
    this.Incidente = RestFiltros.parsearLookup(
      elementoItemLista,
      EARegistroActividadIncidente.CamposExpand.Incidente,
      EIncidentes
    );

    this.ID = elementoItemLista.ID;
    this.Detalle = elementoItemLista.Detalle;
  }

  public setearValoresIniciarImplementacion() {
    this.EstadoIncidencia = "En Proceso";
  }

  public getValoresIniciarImplementacion() {
    return { EstadoIncidencia: this.EstadoIncidencia };
  }
}
