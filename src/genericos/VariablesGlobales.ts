export class ParametrosNoAdministrables {
  public static Bibliotecas = {
    ArchivosExpediente: "ArchivosExpediente",
    ArchivosIncidente: "ArchivosIncidente",
    ArchivosNormas: "ArchivosNormas",
    ArchivosProyecto: "ArchivosProyecto"
  };

  public static EstadosSolicitud = {
    Registro1: ["Lectura", "Escritura"],
    TipoConectividadVpn: ["VPN Site to Site", "VPN Client"],
    VPNMotivo: ["Desarrollo", "Servicios a producción"],
    VPNTipoPersonal: ["Interno", "Externo"],
    ExternoInternoMotivo: ["SBS", "Consultoría Especializada", "Proovedor de servicio de sistemas", "Otros"],
    MotivoSolicitudAIT: ["Acceso para administradores de Infraestructura", "Consultoría Especializada", "Usuario de servicio", "Proveedor de servicio de sistemas", "Otros"],
    ExternoInternoConectividad: ["Nuevo Acceso", "Renovación"],
    SapSistema: ["Produción", "Calidad", "Desarrollo"],
    SapAccesos: ["Usuario Nuevo", "Reemplazo"],
    TipoRequisitosSistemas: ["Sistemas Operativo activo, actualizado y licenciado", "Antivirus Endpoint Security", "Microsoft Office Licenciado", "Verificación de uso de Software no Autorizado", "Firewall Windows / Firewall Antivirus"],
    PlataformaAIT: ["Windows", "Linux", "IBMi", "AIX", "Otro"],
    TipoAccesoAIT: ["Nuevo Acceso", "Renovación"],
    AmbienteAIT: ["Producción", "Desarrollo", "Calidad"],
    TipoPerfilAIT: ["Administrador", "Usuario"],
    TiempoAccesoAIT: ["Permanente", "Temporal"],
    Tipo: ["INICIAL", "INCREMENTAL", "CORRECION"],
    Base: ["Convenios", "Motocorp", "Premiun", "RedesSociales", "Converse", "Especialistas", "Reenganche"],
  }

  public static ColumnaSitioIncidente = {
    ID: "ID",
    Codigo: "Codigo",
    Descripcion: "Descripcion",
    Entidad: "Entidad",
    Alcance: "Alcance",
    Estado: "EstadoIncidencia",
    FechaReporte: "FechaReporte",
    Autor: "UsuarioRegistro",
    PalabrasClaves: "PalabrasClaves",
    EvaluacionIncidente: "EvaluacionIncidente",
    FechaOcurrencia: "FechaOcurrencia",
    FechaRegistro: "FechaRegistro",
    FechaFinal: "FechaFinal",
    MultaAsociada: "MultaAsociada",
    RiesgoOperacional: "RiesgoOperacional",
    RequiereSeguimiento: "RequiereSeguimiento",
    IncidentesAsociados: "IncidentesAsociados",
    ReportesAsociados: "ReportesAsociados",
    ProyectoAsociados: "ProyectoAsociados",
    ExpedientesRelacionados: "ExpedientesRelacionados",
    NormasRelacionadas: "NormasRelacionadas"
  };

  public static ColumnaSitioConfiguracionAlertaIncidente = {
    ID: "ID",
    diasUtiles: "diasUtiles",
    CopiaJefe: "CopiaJefe",
    TipoVencimiento: "TipoVencimiento"
  };

  public static ColumnaSitioConfiguracionEvaluacion = {
    ID: "ID",
    NombreEvaluacion: "NombreEvaluacion",
    OrdenEvaluacion: "OrdenEvaluacion",
    EstadoElemento: "EstadoElemento"
  };
  public static ColumnaSitioConfiguracionIncidente = {
    ID: "ID",
    esHabilitarAlerta: "esHabilitarAlerta"
  };

  public static ColumnaSitioIncidenteSeguimiento = {
    Codigo: "Codigo",
    Detalle: "Detalle",
    FechaCompromiso: "FechaCompromiso",
    FechaRegistro: "FechaRegistro",
    UsuarioRegistro: "UsuarioRegistro",
    Incidente: "Incidente",
    EstadoSeguimientoIncidente: "EstadoSeguimientoIncidente",
    EstadoElemento: "EstadoElemento",
    ID: "ID",
    ReponsableSeguimiento: "ResponsableSeguimiento",
    FechaFinal: "FechaFinal"
  };

  public static ColumnaSitioTareaIncidenteSeguimiento = {
    Codigo: "Codigo",
    Detalle: "Detalle",
    FechaCompromiso: "FechaCompromiso",
    FechaRegistro: "FechaRegistro",
    UsuarioRegistro: "UsuarioRegistro",
    Incidente: "Incidente",
    SeguimientoIncidente: "SeguimientoIncidente",
    EstadoTareaPlanAccion: "EstadoTareaPlanAccion",
    ID: "ID",
    ResponsableTarea: "ResponsableTarea",
    FechaLimite: "FechaLimite"
  };

  public static ColumnaSitioIncidenteAvanceImplementacion = {
    Codigo: "Codigo",
    DetalleImplementacion: "DetalleImplementacion",
    TipoComentario: "TipoComentario",
    FechaRegistro: "FechaRegistro",
    UsuarioRegistro: "UsuarioRegistro",
    Incidente: "Incidente",
    SeguimientoIncidente: "SeguimientoIncidente",
    TareasPlanAccion: "TareasPlanAccion",
    ProponerCierre: "ProponerCierre",
    ID: "ID"
  };

  public static ColumnaSitioHistorialAmpliacionPlanAccionIncidente = {
    ID: "ID",
    FechaRegistro: "FechaRegistro",
    UsuarioRegistro: "UsuarioRegistro",
    CargoEnvioSolicitudIncidente: "CargoEnvioSolicitudIncidente",
    ComentarioSolicitudIncidente: "ComentarioSolicitudIncidente",
    EstadoSolicitudIncidente: "EstadoSolicitudIncidente",
    FechaPlazoActualIncidente: "FechaPlazoActualIncidente",
    FechaPlazoSolicitadoIncidente: "FechaPlazoSolicitadoIncidente",
    SeguimientoIncidente: "SeguimientoIncidente",
    Incidente: "Incidente"
  };

  public static ColumnasSitio = {
    Alcance: "Alcance",
    Anexo: "Anexo",
    Archivos: "Archivos",
    AreaTexto: "AreaTexto",
    ArticuloRelacionado: "ArticuloRelacionado",
    AsuntoCorreo: "AsuntoCorreo",
    BaseLegal: "BaseLegal",
    CalificacionNorma: "CalificacionNorma",
    Cantidad: "NumeroDias",
    CantidadAmpliaciones: "CantidadAmpliaciones",
    Codigo: "Codigo",
    CodigoReporte: "CodigoReporte",
    ComentarioSolicitud: "ComentarioSolicitud",
    CompartidoCon: "CompartidoCon",
    ComentarioRespuesta: "ComentarioRespuesta",
    ContenidoCorreo: "ContenidoCorreo",
    Consideraciones: "Consideraciones",
    ConsideracionesProgramacion: "ConsideracionesProgramacion",
    CorreoUsuariosCopia: "CorreoUsuarioCopia",
    CorreoUsuariosDestino: "CorreoUsuarioEnvio",
    Creado: "Created",
    Creador: "Author",
    Desatendido: "Desatendido",
    Descripcion: "Descripcion",
    Destinatario: "Destinatario",
    Division: "Division",
    DivisionTexto: "DivisionTexto",
    Empresa: "Empresa",
    EmpresaTexto: "EmpresaTexto",
    Entidad: "Entidad",
    EsAdministrador: "EsAdministrador",
    EsConfidencial: "EsConfidencial",
    EsExcluirVP: "EsExcluirVP",
    EsExcluirVPE: "EsExcluirVPE",
    EsHabilitadoAlertasDirectivas: "EsHabilitadoAlertasDirectivas",
    EsHabilitadoAlertasNoDirectivas: "EsHabilitadoAlertasNoDirectivas",
    EsHabilitadoAlertasNormas: "EsHabilitadoAlertasNormas",
    EsIncumplimiento: "EsIncumplimiento",
    EsNotificarTodosResponsables: "EsNotificarTodosResponsables",
    EsObligacionDirecta: "EsObligacionDirecta",
    EsPlanAccion: "EsPlanAccion",
    EsPropuestaCierre: "EsPropuestaCierre",
    EstadoElemento: "EstadoElemento",
    EstadoExpediente: "EstadoExpediente",
    EstadoExpedienteCalculado: "EstadoExpedienteCalculado",
    EstadoNorma: "EstadoNorma",
    EstadoPlanAccionNorma: "EstadoPlanAccionNorma",
    EstadoReporte: "EstadoReporte",
    EstadoSolicitudAmpliacion: "EstadoSolicitudAmpliacion",
    EstadoTarea: "EstadoTarea",
    EsTareaPlanAccion: "EsTareaPlanAccion",
    Expediente: "Expediente",
    ExpedientesRelacionados: "ExpedientesRelacionados",
    ExtensionArchivosNoPermitidas: "ExtensionArchivosNoPermitidas",
    Fecha: "Fecha",
    FechaAsignacion: "FechaAsignacion",
    FechaCaducidad: "FechaCaducidad",
    FechaCierre: "FechaCierre",
    FechaInicioVigencia: "FechaInicioVigencia",
    FechaFinVigencia: "FechaFinVigencia",
    FechaHoraValidacion: "FechaHoraValidacion",
    FechaAtencion: "FechaAtencion",
    FechaDerogar: "FechaDerogar",
    FechaLimite: "FechaLimite",
    FechaInicioVigenciaTexto: "FechaInicioVigenciaTexto",
    FechaNuevoPlazo: "FechaNuevoPlazo",
    FechaNuevoPlazoOtorgado: "FechaNuevoPlazoOtorgado",
    FechaPlazo: "FechaPlazo",
    FechaPlazoActual: "FechaPlazoActual",
    FechaPublicacion: "FechaPublicacion",
    FechaRecepcion: "FechaRecepcion",
    FechaRegistro: "FechaRegistro",
    FechaRespuesta: "FechaRespuesta",
    FechaSolicitud: "FechaSolicitud",
    Formato: "Formato",
    Frecuencia: "Frecuencia",
    GeneraObligacionesDirectas: "GeneraObligacionesDirectas",
    GeneraObligacionesInmediatas: "GeneraObligacionesInmediatas",
    GeneraObligacionesReportes: "GeneraObligacionesReportes",
    Grupo: "Grupo",
    GrupoGestion: "GrupoGestion",
    GrupoGrupoGestion: "GrupoGrupoGestion",
    ID: "ID",
    IncidentesAsociados: "IncidentesAsociados",
    IncidentesAsociadosIds: "IncidentesAsociadosIds",
    Modified: "Modified",
    MotivoRealizarSeguimiento: "MotivoRealizarSeguimiento",
    NombreAplicativo: "NombreAplicativo",
    NombreDocumento: "NombreDocumento",
    Norma: "Norma",
    NormaImpactada: "NormaImpactada",
    NormaImpacto: "NormaImpacto",
    NormaProbabilidad: "NormaProbabilidad",
    NormaTexto: "NormaTexto",
    NormasRelacionadas: "NormasRelacionadas",
    Nota: "Nota",
    NumeroCorrelativo: "NumeroCorrelativo",
    NumeroNorma: "NumeroNorma",
    OrigenPlazo: "OrigenPlazo",
    PalabrasClaves: "PalabrasClaves",
    Programacion: "Programacion",
    ProyectoAsociados: "ProyectoAsociados",
    ProyectosAsociadosIds: "ProyectosAsociadosIds",
    DatosProgramacion: "DatosProgramacion",
    Obligacion: "Obligacion",
    OpcionRadio: "OpcionRadio",
    PlanAccionNorma: "PlanAccionNorma",
    PlazoImplementacionTexto: "PlazoImplementacionTexto",
    PlazoLegal: "PlazoLegal",
    Recurrente: "Recurrente",
    Reporte: "Reporte",
    ReportesAsociados: "ReportesAsociados",
    ReportesAsociadosIds: "ReportesAsociadosIds",
    RequiereSeguimiento: "RequiereSeguimiento",
    Responsable: "Responsable",
    ResponsableAuxiliar: "ResponsableAuxiliar",
    ResponsablesAuxiliares: "ResponsablesAuxiliares",
    ResponsablesAuxiliaresJson: "ResponsablesAuxiliaresJson",
    RolGrupo: "RolGrupo",
    Solicitud: "Solicitud",
    TamanoMaximoPermitido: "TamanoMaximoPermitido",
    TareaExpediente: "TareaExpediente",
    TareaNorma: "TareaNorma",
    TextoRequiereSeguimiento: "TextoRequiereSeguimiento",
    TipoAlertaNorma: "TipoAlertaNorma",
    TipoCondicionAlerta: "TipoAlerta",
    TipoCorrelativo: "TipoCorrelativo",
    TipoDirectiva: "TipoDirectiva",
    TipoEnvio: "TipoEnvio",
    TipoFlujoDirectiva: "TipoFlujoDirectiva",
    TipoNorma: "TipoNorma",
    TipoNormaImpactada: "TipoNormaImpactada",
    TipoReporte: "TipoReporte",
    TipoSolicitud: "TipoSolicitud",
    Title: "Title",
    Usuario: "Usuario",
    UsuarioDelegado: "UsuarioDelegado",
    UsuarioRegistro: "UsuarioRegistro",
    UsuarioValidacion: "UsuarioValidacion",
    ValorMaximo: "ValorMaximo",
    ValorMinimo: "ValorMinimo",
    Incidente: "Incidente",
    Detalle: "Detalle"
  };

  public static ColumnasSitioProyecto = {
    AlcanceMultiple: "AlcanceMultiple",
    Codigo: "Codigo",
    Comentario: "Comentario",
    Consideraciones: "Consideraciones",
    Detalle: "Detalle",
    Entidad: "Entidad",
    EstadoProyecto: "EstadoProyecto",
    EstadoComentario: "EstadoComentario",
    FechaAtencion: "FechaAtencion",
    FechaCierre: "FechaCierre",
    FechaLimite: "FechaLimite",
    FechaPlazo: "FechaPlazo",
    FechaPublicacion: "FechaPublicacion",
    FechaRegistro: "FechaRegistro",
    FechaSolicitud: "FechaSolicitud",
    GrupoGestion: "GrupoGestion",
    NormaProyecto: "NormaProyecto",
    PalabrasClaves: "PalabrasClaves",
    Plazo: "Plazo",
    Proyecto: "Proyecto",
    SolicitudProyecto: "SolicitudProyecto",
    TipoDia: "TipoDia",
    Title: "Title",
    Usuario: "Usuario",
    UsuarioCierre: "UsuarioCierre",
    UsuarioInformado: "UsuarioInformado",
    UsuarioRegistro: "UsuarioRegistro",
    UsuarioSolicitudComentario: "UsuarioSolicitudComentario",
    ID: "ID"
  };

  public static EtapaCasos = {
    Nuevo: "Nuevo",
    EnGestion: "En Gestión",
    PreJudicial: "Pre Judicial",
    Conciliacion: "Conciliación",
    Judicial: "Judicial",
    Concluido: "Cocnluido"
  };

  public static Grupos = {
    AdministracionConfiguraciones: "AppAsarti-Administradores"
  };

  public static PlantillaCorreo = {
    TareaAtendidaReporte: "Tarea atendida de reporte",
    TareaAsignadaReporte: "Tarea asignada de reporte",
    ExpedienteReporteRechazado: "Respuesta de Expediente Rechazada",
    ExpedienteReporteAtendido: "Expediente de Reporte Atendido",
    SolicitudAmpliacionPlazoReporte: "Solicitud de ampliación de plazo para envío de reporte",
    SolicitudAmpliacionAceptada: "Solicitud de ampliación aceptada para envío de reporte",
    SolicitudAmpliacionRechazada: "Solicitud de ampliación rechazada para envío de reporte",
    NotificarEncuestaExterna: "Notificar Encuesta Externa",
    ProgramacionReporteCompartida: "Programación de reporte compartida",
    ReporteAsignado: "Reporte asignado"
  };

  public static Listas = {
    Ampliaciones: "Ampliaciones",
    AmpliacionesPlanAccionNormas: "AmpliacionesPlanAccionNormas",
    Areas: "Areas",
    Asistentes: "Asistentes",
    AtencionesExpedienteReporte: "AtencionesExpedienteReporte",
    AdjuntosNotaExpedienteReporte: "AdjuntosNotaExpedienteReporte",
    AdjuntosNotaReporte: "AdjuntosNotaReporte",
    AdjuntosEncuesta: "AdjuntosEncuesta",
    AdjuntosTareaExpedienteReporte: "AdjuntosTareaExpedienteReporte",
    AdjuntosComentarioTareaExpedienteReporte: "AdjuntosComentarioTareaExpedienteReporte",
    AdjuntosSolicitudAmpliacionReporte: "AdjuntosSolicitudAmpliacionReporte",
    AdjuntosAtencionExpedienteReporte: "AdjuntosAtencionExpedienteReporte",
    CalificacionesNorma: "CalificacionesNorma",
    Configuracion: "Configuracion",
    ConfiguracionAlertasDirectivas: "ConfiguracionAlertasDirectivas",
    ConfiguracionAlertasNoDirectivas: "ConfiguracionAlertasNoDirectivas",
    ConfiguracionAlertasNormas: "ConfiguracionAlertasNormas",
    ConfiguracionesAlertaReporte: "ConfiguracionesAlertaReporte",
    ConfiguracionesAlertasTareas: "ADM_Alertas",
    ConfiguracionesCreacionExpedienteReporte: "ConfiguracionesCreacionExpedienteReporte",
    ConsolidadorPorReporte: "ConsolidadorPorReporte",
    ComentariosProyecto: "ComentariosProyecto",
    ComentariosTareaExpedienteReporte: "ComentariosTareaExpedienteReporte",
    Correlativos: "Correlativos",
    Divisiones: "Divisiones",
    EnvioCorreos: "ADM_EnvioCorreo",
    ElaboradoresAprobadoresPorReporte: "ElaboradoresAprobadoresPorReporte",
    EnviadorPorReporte: "EnviadorPorReporte",
    Encuestas: "Encuestas",
    Expedientes: "Expedientes",
    ExpedientesReporte: "ExpedientesReporte",
    FuncionariosEnlace: "FuncionariosEnlace",
    SeguimientoPorReporte: "SeguimientoPorReporte",
    Excepciones: "Excepciones",
    ExcepcionesProgramacionReporte: "ExcepcionesProgramacionReporte",
    Feriados: "Feriados",
    Grupos: "Grupos",
    ListaMaestros: "ListaMaestros",
    Normas: "Normas",
    NormasImpactadas: "NormasImpactadas",
    NotasExpediente: "NotasExpediente",
    NotasExpedienteReporte: "NotasExpedienteReporte",
    NotasNormas: "NotasNormas",
    NotasReporte: "NotasReporte",
    NotasTareasExpediente: "NotasTareasExpediente",
    NotasTareasNorma: "NotasTareasNorma",
    ObligacionesDirectas: "ObligacionesDirectas",
    PlanesAccionNormas: "PlanesAccionNormas",
    PlatillaCorreos: "ADM_PlantillaCorreo",
    PreguntasEncuesta: "PreguntasEncuesta",
    ProgramacionesReporte: "ProgramacionesReporte",
    Puestos: "Puestos",
    RegistroActividadDirectivas: "RegistroActividadDirectivas",
    RegistroActividadesProyectos: "RegistroActividadesProyectos",
    RegistroActividadNormas: "RegistroActividadNormas",
    RegistroActividadesReporte: "RegistroActividadesReporte",
    Reportes: "Reportes",
    RespuestasPreguntaEncuesta: "RespuestasPreguntaEncuesta",
    SolicitudesComentarioProyecto: "SolicitudesComentarioProyecto",
    SolicitudesReporte: "SolicitudesReporte",
    TareasExpediente: "TareasExpediente",
    TareasNorma: "TareasNorma",
    TiposNormas: "TiposNormas",
    Incidente: "Incidente",
    PlantillaTipoPreguntaEncuesta: "PlantillaTipoPreguntaEncuesta",
    RegistroActividadesSolicitudReporte: "RegistroActividadesSolicitudReporte",
    RegistroActividadesExpendienteReporte: "RegistroActividadesExpendienteReporte",
    RegistroActividadIncidente: "RegistroActividadIncidentes",
    RegistroActividadesEncuesta: "RegistroActividadesEncuesta",
    SeguimientoIncidente: "RegistroSeguimientoIncidente",
    SolicitudesAmpliacionExpedienteReporte: "SolicitudesAmpliacionExpedienteReporte",
    RegistroAvanceImplementacionIncidente: "RegistroAvanceImplementacionIncidente",
    RespuestasEncuestaUsuarios: "RespuestasEncuestaUsuarios",
    TareasExpedienteReporte: "TareasExpedienteReporte",
    HistorialAmpliacionPlanAccionIncidente: "	HistorialAmpliacionPlanAccionIncidente",
    Proyectos: "Proyectos",
    TipoPregunta: "TipoPregunta",
    RegistroTareasPlanAccionIncidente: "RegistroTareasPlanAccionIncidente",
    UsuariosDistribucionEncuesta: "UsuariosDistribucionEncuesta",
    ConfiguracionAlertasIncidentes: "ConfiguracionAlertasIncidentes",
    ConfiguracionIncidente: "ConfiguracionIncidente",
    ConfiguracionEvaluacion: "ConfiguracionEvaluacion"
  };

  public static ListaValores = {
    EstadosDirectivasBandejaDirectivas: ["No iniciado", "Atendido"],
    EstadosDirectivasBandejaExpedientes: ["Anulada", "Asignada", "En Elaboración", "En ampliación", "Finalizada", "No iniciado", "Rechazada", "Respondida"],
    EstadosDirectivasBandejaIncidentes: ["Registrado", "En elaboración", "Pendiente", "Implementado"],
    EstadosDirectivasBandejaIncidentes2: ["Registrado", "En Proceso", "Finalizado", "Anulado"],
    EstadosPlanAccionIncidente: ["Registrado", "Pendiente", "Implementado", "Vencido"],
    EstadosPlanAccionIncidenteBandeja: ["En Proceso", "Finalizado"],
    EstadosSolicitudes: ["Pendiente", "Aprobado", "Rechazado"],
    EstadosLogicos: ["No", "Sí"],
    Bancos: ["Seleccione", "MIBANCO", "BANCO DE CREDITO", "SCOTIABANK PERU", "BBVA", "BANCO DE COMERCIO", "CITIBANK DEL PERU", "BANBIF", "NACION", "BANCO PICHINCHA", "COFIDE", "INTERBANK", "BANCO RIPLEY", "BANCO CENTRAL PERU", "BANCO FALABELLA", "AGROBANCO", "BANCO GNB", "SANTANDER PERU", "BANCO AZTECA", "ICBC BANK", "BANK OF CHINA (PERU)"],
    TipoSolicitudes: ["acceso a USB – CD / Extraíbles", "acceso cuenta de red para externos", "acceso de equipos externos a la red interna", "acceso VPN", "acceso SAP"],
  };

  public static Mensajes = {
    mensajeErrorParametrosNoValidos: "Los parámetros no son válidos.",
    mensajeInformativoElementoModificadoDeFormaExterna: "El registro ha sido modificado, por favor, actualice la página para continuar.",
    mensajeInformativoNoHayInformacionExportar: "No hay información para exportar.",
    mensajeInformativoNoTieneAccesoPagina: "Usted no tiene acceso a la página.",
    mensajeInformativoCompletarCamposObligatorios: "Por favor, complete los campos obligatorios.",
    mensajeInformativoCompletarCampos: "Por favor, complete todos los campos",
    mensajeInformativoRegistroNoClasificado: "El registro no ha sido clasificado.",
    mensajeInformativoSuUsuarioNoTieneAccesoAEsteRegistro: "Usted no tiene acceso a este registro.",
    mensajeInformativoUsuarioSinAccesoAPagina: "Usted no tiene acceso a la página.",

    noSeHanEncontradoElementos: "No se han encontrado elementos.",
    noSeHanEncontradoResultados: "No se han encontrado resultados.",
    noSeHanEncontradoConfiguraciones: "No se han encontrado configuraciones.",
    noSeEncontroElElemento: "No se encontró el elemento.",
    noSeEncontroPlantillaCorreo: "No se encontró la plantilla de correo.",
    seRealizoProcesoConExitoPeroNoLogroEnviarCorreo: "Se realizó el proceso con éxito pero no se logró enviar el correo.",
    noSeHaCompletadoLosDatosObligatorios: "No se ha completado los datos obligatorios.",
    mensajeInformativoCompletarCamposObligatoriosComentarios: "Por favor, ingrese por lo menos un comentario.",
    mensajeInformativoSeleccionarCamposAExportar: "Debe seleccionar como mínimo un campo para exportar."
  };

  public static DocumentosAsociados = {
    Mensajes: {
      MensajeIncidenteAgregado: "El incidente con codigo: [CODIGO] fue agregado correctamente.",
      MensajeProyectoAgregado: "El proyecto con codigo: [CODIGO] fue agregado correctamente.",
      MensajeReporteAgregado: "El reporte con codigo: [CODIGO] fue agregado correctamente.",
      MensajeDirectivaAgregado: "La directiva con codigo: [CODIGO] fue agregado correctamente.",
      MensajeNormaAgregado: "La norma con codigo: [CODIGO] fue agregado correctamente.",
      MensajeIncidenteYaAgregado: "El incidente con codigo: [CODIGO] ya fue agregado.",
      MensajeProyectoYaAgregado: "El proyecto con codigo: [CODIGO] ya fue agregado.",
      MensajeReporteYaAgregado: "El reporte con codigo: [CODIGO] ya fue agregado.",
      MensajeDirectivaYaAgregado: "La directiva con codigo: [CODIGO] ya fue agregado.",
      MensajeNormaYaAgregado: "La norma con codigo: [CODIGO] ya fue agregado."
    }
  };

  public static ModuloIncidentes = {
    Correos: {
      IniciarImplementacion: "Implementación Iniciada"
    },
    Grupos: {
      Grupo1: "Cumplimiento Normativo"
    },
    ListaGrupos: ["Cumplimiento Normativo"],
    ListaValoresOrigenPlazo: ["Interno", "Externo"],
    ListaValoresTipos: ["Directiva", "No directiva", "Comunicación"],

    TipoAlertaIncidente: {
      Antesdelvencimiento: "Antes del vencimiento",
      Despuesdelvencimiento: "Después del vencimiento"
    },

    RegistroActividad: {
      IncidenteRegistrado: "Incidente registrado por [Nombre]",
      IncidenteActualizado: "Incidente actualizado por [Nombre]",
      IncidenteSeguimientoRegistrar: "Plan de acción [Seguimiento] regitrado por [Nombre]",
      IncidenteSeguimientoRegistrarEnImplementacion: "Plan de acción [Seguimiento] registrado durante la implementación por [Nombre]",
      IncidenteSeguimientoEditar: "Seguimiento Incidente [Seguimiento] editado por [Nombre]",
      IncidenteSeguimientoEliminar: "Plan de acción [Código de plan] anulado durante la implementación",
      ExpedienteRegistradoComoClasificado: "Expediente clasificado",
      IncidenteSeguimientoAmpliarPlanAccion: "Solicitud de ampliación de plazo enviada para extender hasta [Nuevo plazo solicitado]. [Comentario ingresado por el usuario]",
      IncidenteSeguimientoAprobarAmpliarPlanAccion: "Solicitud de ampliación de plazo enviada para extender hasta [Nuevo plazo solicitado] Aprobada hasta [Nuevo plazo]. [Comentario ingresado por el usuario]",
      IncidenteSeguimientoRechazarAmpliarPlanAccion: "Solicitud de ampliación de plazo enviada para extender hasta [Nuevo plazo solicitado] Rechazado. [Comentario ingresado por el usuario]",
      IncidenteFinalizarPlanAccion: "Plan de acción finalizado por [Nombre de usuario]",
      IncidenteSeguimientoManual: "Seguimiento iniciado manualmente",
      IncidenteSeguimientoManualCancelado: "Seguimiento cancelado manualmente",
      IncidenteSeguimientoManualAnulado: "Seguimiento Anulado",
      IncidenteEditarPlanAccionCambioResponsable: "Plan de acción [Código de plan] reasignado durante la implementación",
      IncidenteEditarPlanAccionNoCambioResponsable: "Plan de acción [Código de plan] modificado durante la implementación",
      IncidenteEditarPlanAccionAvanceImplementación: "Avance de implementación registrado para el plan de acción [Código de plan]",
      IncidenteEditarPlanAccionAvanceImplementaciónPorVerificar: "Avance de implementación registrado como propuesta de cierre para el plan de acción [Código de plan]"
    },
    TiposDirectivasFlujos: {
      TipoDirectiva: "Directiva",
      TipoNoDirectiva: "No directiva",
      TipoComunicacion: "Comunicación"
    },
    ListaValoresEstado: ["Registrada", "En Proceso", "Finalizada"],
    ValoresEstados: {
      EstadoIncidenteRegistrado: "Registrado",
      EstadoIncidenteEnProceso: "En Proceso",
      EstadoIncidenteEnSeguimiento: "En Seguimiento",
      EstadoIncidenteFinalizado: "Finalizado",
      EstadoIncidenteAnulado: "Anulado"
    },
    ValoresEstadosPlanAccion: {
      EstadoPlanAccionRegistrado2: "Registrado",
      EstadoPlanAccionRegistrado: "REGISTRADO",
      EstadoPlanAccionEnProceso: "En Proceso",
      EstadoPlanAccionEnAmpliacion: "En Ampliación",
      EstadoPlanAccionImplementadaPorVerificar: "Implementada Por Verificar",
      EstadoPlanAccionImplementada: "Implementada",
      EstadoPlanAccionAnulado: "Anulado"
    },

    ValoresEstadosTareasPlanAccion: {
      EstadoTareaPlanAccionPendiente: "Pendiente",
      EstadoTareaPlanAccionFinalizado: "Finalizado",
      EstadoTareaPlanAccionAnulado: "Anulado"
    },
    ListaValoresAlcance: ["Clínica Internacional", "Rimac EPS", "RIMAC Seguros"],
    ValoresAlcance: {
      AlcanceClinicaInternacional: "Clínica Internacional",
      AlcanceRimacEPS: "Rimac EPS",
      AlcanceRimacSeguros: "RIMAC Seguros"
    },

    ListaValoresEntidad: ["INDECOPI", "SUSALUD", "SUNAT", "SBS"],
    ValoresEntidad: {
      EntidadIndecopi: "INDECOPI",
      EntidadSusalud: "SUSALUD",
      EntidadSunat: "SUNAT",
      EntidadSbs: "SBS"
    }
  };

  public static ModuloNormas = {
    Carpetas: {
      Archivos: "Archivos",
      Ampliaciones: "Ampliaciones",
      Compartir: "Compartir",
      Norma: "Norma",
      Notas: "Notas",
      Obligaciones: "Obligaciones",
      PlanesAccion: "PlanesAccion",
      Respuesta: "Respuesta",
      Tareas: "Tareas",
      Proyectos: "Proyectos"
    },
    Correos: {
      ProyectoNuevo: "Proyecto Nuevo",
      ProyectoEditar: "Proyecto Modificado",
      ObservacionNuevo: "Observacion Nuevo",
      ObservacionEditar: "Observacion Modificado",
      RecomendacionNuevo: "Recomendacion Registrado",
      RecomendacionEditar: "Recomendacion Modificado",
      PlanAccionNuevo: "Plan de Accion Registro",
      PlanAccionEditar: "Plan de Accion Actualizado",
      IniciarImplementacion: "Implementacion",

    },
    ListaValoresCarpetas: ["Ampliaciones", "Compartir", "Norma", "Notas", "Obligaciones", "PlanesAccion", "Tareas"],
    ListaValoresEstados: ["Registrada", "Anulada", "En evaluación", "Comunicada", "En seguimiento", "En proceso", "Implementada", "Derogada"],
    ListaValoresPlanesAccion: ["Registrado", "En ampliación", "En proceso", "Por verificar", "Implementada"],
    ListaValoresTipoNormaImpactada: ["Derogación Total", "Impacto Parcial"],
    GruposGestion: {
      GestorNormas: "Gestor Normas"
    },
    RegistroActividad: {
      FinalizarPlanAccion: "Plan de acción finalizado por [NombreUsuario]. [Comentario]",
      NormaCompartida: "Se ha compartido la norma con: [NombresUsuarios]",
      NormaModificada: "Datos de la norma modificados.",
      NormaRegistrada: "Norma registrada con responsabilidad de seguimiento del área [NombreResponsable].",
      SolicitudAmpliacionPlanAccion: "Solicitud de ampliación de plazo enviada para extender hasta [NuevoPlazoSolicitado]. [Comentario]",
      SolicitudAmpliacionPlanAccionAprobada: "Solicitud de ampliación aprobada hasta [NuevoPlazoOtorgado]. [Comentario]",
      SolicitudAmpliacionPlanAccionRechazada: "Solicitud de ampliación rechazada. [Comentario]"
    },
    TipoAlertaNormas: {
      Antes: "antes del vencimiento",
      Despues: "después del vencimiento"
    },
    ValoresEstados: {
      Anulada: "Anulada",
      Comunicada: "Comunicada",
      Derogada: "Derogada",
      EnEvaluacion: "En evaluación",
      EnProceso: "En proceso",
      EnSeguimiento: "En seguimiento",
      Implementada: "Implementada",
      Registrada: "Registrada"
    },
    ValoresEstadosAmpliacion: {
      EstadoAceptada: "Aceptada",
      EstadoPorValidar: "Por Validar",
      EstadoRechazada: "Rechazada"
    },
    ValoresPlanesAccion: {
      Registrado: "Registrado",
      EnAmpliacion: "En ampliación",
      EnProceso: "En proceso",
      PorVerificar: "Por verificar",
      Implementada: "Implementada"
    },
    ValoresTareas: {
      EnBorrador: "En borrador",
      Pendiente: "Pendiente",
      Finalizado: "Finalizado",
      FinalizadoSinAtencion: "Finalizada – Sin atención"
    },
    ValoresTipoNormaImpactada: {
      DerogacionTotal: "Derogación Total",
      ImpactoParcial: "Impacto Parcial"
    }
  };

  public static ModuloDirectivas = {
    CarpetasExpediente: {
      Ampliaciones: "Ampliaciones",
      Expediente: "Expediente",
      Notas: "Notas",
      Respuesta: "Respuesta",
      Tareas: "Tareas",
      Proyectos: "Proyectos"
    },
    CarpetasProyectos: {
      Proyecto: "Proyecto",
      Consideraciones: "Consideraciones",
      Comentario: "Comentario",
      Respuesta: "Respuesta",
      Cargos: "Cargo"
    },
    Correos: {
      AmpliacionDirecta: "Nueva ampliación de plazo directiva",
      ComunicacionCompartida: "Comunicación Compartida",
      DirectivaAsignada: "Directiva Asignada",
      DirectivaCompartida: "Directiva Compartida",
      DirectivaDelegada: "Directiva Delegada",
      DirectivaFinalizada: "Directiva Finalizada",
      DirectivaRespondida: "Directiva Respondida",
      ExpedienteCompartido: "[Tipo de expediente] Compartida",
      ExpedienteReasignado: "[Tipo de expediente] Asignada",
      ExpedienteRechazado: "Expediente rechazado",
      NoDirectivaAsignada: "No Directiva Asignada",
      NoDirectivaCompartida: "No Directiva Compartida",
      NoDirectivaFinalizada: "No Directiva Finalizada",
      NuevoExpediente: "Nuevo expediente",
      RespuestaDirectivaRechazada: "Respuesta de Directiva Rechazada",
      SolicitudAmpliacionPlazoExterno: "Solicitud de ampliación de plazo externo",
      SolicitudAmpliacionPlazoInterno: "Solicitud de ampliación de plazo interno",
      SolicitudAmpliacionAceptada: "Solicitud de ampliación aceptada",
      SolicitudAmpliacionRechazada: "Solicitud de ampliación rechazada",
      TareaAsignadaDirectiva: "Tarea asignada de directiva",
      TareaAsignadaNorma: "Tarea asignada de norma",
      TareaAtendidaReporte: "Tarea atendida de reporte",
      TareaAtendidaNorma: "Tarea atendida de norma",
      TareaAtendida: "Tarea de directiva atendida",
      NuevoProyectoComunicado: "Nuevo proyecto comunicado",
      NuevoProyectoCompartido: "Nuevo proyecto compartido",
      ProyectoSinComentarios: "Proyectos - Sin Comentarios",
      ProyectoNuevosComentarios: "Proyectos – Nuevos comentarios"
    },
    Grupos: {
      Grupo1: "AppGestionBaseClientes-Administradores",
      Grupo2: "AppGestionBaseClientes-Usuarios",

    },
    GruposGestion: {
      GestorDirectivas: "Gestor Directivas",
      GestorNormas: "Gestor Normas"
    },
    ListaGrupos: ["Cumplimiento Normativo", "Recepción Provincia", "Recepción Lima"],
    ListaGruposGestion: ["Gestor Directivas", "Gestor Normas"],
    ListaRoles: ["Gestor Directivas", "Gestor Normas", "Administrador de Configuraciones", "Consulta de Reportes"],
    ListaValoresCarpetasExpediente: ["Ampliaciones", "Expediente", "Notas", "Respuesta", "Tareas"],
    ListaValoresCarpetasProyecto: ["Proyecto", "Consideraciones", "Comentario", "Respuesta", "Cargo"],
    ListaValoresOrigenPlazo: ["Interno", "Externo"],
    ListaValoresTipos: ["Directiva", "No directiva", "Comunicación"],
    ListaValoresTipoAlertaDirectivas: ["antes del vencimiento", "después del vencimiento", "recurrente"],

    ListaValoresCarpetasProyectos: ["A. PLANEACION", "B. EJECUCION", "C. CIERRE"],
    ListaValoresCarpetasProyectosPLaneacion: ["1. ANUNCIO", "2. CONOCIMIENTO DEL PROCESO", "3. MRC", "4. MPD", "5. TDR", "6. PROGRAMA DE TRABAJO", "7. REQUERIMIENTO INFO", "Normativa"],
    ListaValoresCarpetasProyectosEjecucion: ["Evidencias"],
    ListaValoresCarpetasProyectosCierre: ["1. REUNION DE CIERRE", "2. INFORME BORRADOR", "3. INFORME FINAL"],
    Nota: {
      CargoAmpliacion: "Cargo de ampliación."
    },
    RegistroActividad: {
      ExpedienteAmpliacionDirecta: "Registro de ampliación de plazo hasta [NuevoPlazo].",
      ExpedienteAnulado: "Expediente anulado por el siguiente motivo: [Motivo]",
      ExpedienteCompartido: "Se ha compartido el expediente con: [NombresUsuarios].",
      ExpedienteDatosModificados: "Datos del expediente modificados.",
      ExpedienteDelegado: "Expediente delegado a [NombreUsuarioDelegado].",
      ExpedienteFinalizado: "La respuesta ha sido validada y se ha finalizado la directiva.",
      ExpedienteFinalizarDirectivaSinRespuestaResponsable: "La directiva se ha finalizado sin respuesta del responsable. [Comentario]",
      ExpedienteFinalizarNoDirectivaSinRespuestaResponsable: "La no directiva se ha finalizado sin la aceptación del responsable.",
      ExpedienteNoDirectivaAceptada: "La directiva se ha aceptado y finalizado.",
      ExpedienteRechazado: "Expediente rechazado por el siguiente motivo: [Motivo].",
      ExpedienteReasignado: "Expediente reasignado a [NombreNuevoResponsable]",
      ExpedienteRegistradoComoPendienteInicio: "Expediente registrado como pendiente de inicio.",
      ExpedienteClasificadoYAsignadoDirectiva: "Expediente clasificado por [NombreUsuarioClasificador] de [GrupoGestion] y asignado a [NombreUsuarioResponsable].",
      ExpedienteClasificadoYAsignadoNoDirectiva: "Expediente clasificado por [NombreUsuarioClasificador] de [GrupoGestion] y asignado a [NombreUsuarioResponsable].",
      ExpedienteClasificadoYAsignadoTipoComunicacion: "Expediente clasificado por [NombreUsuarioClasificador].",
      ExpedienteRegistradoYAsignadoDirectiva: "Expediente registrado por [NombreUsuarioRegistrador] de [GrupoGestion] y asignado a [NombreUsuarioResponsable].",
      ExpedienteRegistradoYAsignadoNoDirectiva: "Expediente registrado por [NombreUsuarioRegistrador] de [GrupoGestion] y asignado a [NombreUsuarioResponsable].",
      ExpedienteRegistradoYAsignadoTipoComunicacion: "Expediente registrado por [NombreUsuarioRegistrador] y comunicado.",
      ExpedienteRegistradoComoClasificado: "Expediente clasificado.",
      ExpedienteRespondido: "La directiva se ha atendido y respondido. [Comentario]",
      ExpedienteRespuestaRechazada: "La respuesta ha sido rechazada por el siguiente motivo: [Motivo de rechazo]",
      ExpedienteSolicitudAmpliacion: "Solicitud de ampliación de plazo enviada para extender hasta [NuevoPlazoSolicitado]. [Comentario]",
      ExpedienteSolicitudAmpliacionAceptada: "Solicitud de ampliación de plazo aceptada hasta [Nuevo plazo].",
      ExpedienteSolicitudAmpliacionRechazada: "Solicitud de ampliación de plazo rechazada. [Motivo de rechazo]."
    },
    TipoAlertaDirectivas: {
      Antes: "Antes",
      Despues: "Despues",
    },
    TiposDirectivasFlujos: {
      TipoDirectiva: "Directiva",
      TipoNoDirectiva: "No directiva",
      TipoComunicacion: "Comunicación"
    },
    TipoOrigenPlazo: {
      Externo: "EXTERNO",
      Interno: "INTERNO"
    },
    ValoresEstados: {
      EstadoExpedienteAsignada: "Asignada",
      EstadoExpedienteAtendido: "Atendido",
      EstadoExpedienteAnulada: "Anulada",
      EstadoExpedienteEnAmplicación: "En ampliación",
      EstadoExpedienteEnElaboracion: "En elaboración",
      EstadoExpedienteFinalizada: "Finalizada",
      EstadoExpedienteNoIniciado: "No iniciado",
      EstadoExpedienteRespondida: "Respondida",
      EstadoExpedienteRechazada: "Rechazada"
    },
    ValoresEstadosAmpliacion: {
      EstadoAceptada: "Aceptada",
      EstadoPorValidar: "Por Validar",
      EstadoRechazada: "Rechazada",
      EstadoRegistroDirecto: "Registro Directo"
    },
    ValoresTipos: {
      Directiva: "Directiva",
      NoDirectiva: "No directiva",
      Comunicacion: "Comunicación"
    },
    ValoresTareas: {
      Pendiente: "Pendiente",
      Finalizado: "Finalizado",
      FinalizadoSinAtencion: "Finalizada – Sin atención"
    }
  };

  public static RestEstructuras = {
    Select: "/_api/web/lists/GetByTitle('{0}')/items?$top=4999&$orderby=Title asc&$select={1}",
    SelectFilter: "/_api/web/lists/GetByTitle('{0}')/items?$top=4999&$orderby=Title asc&$select={1}&$filter={2}",
    SelectExpand: "/_api/web/lists/GetByTitle('{0}')/items?$top=4999&$orderby=Title asc&$select={1}&$expand={2}",
    SelectExpandFilter: "/_api/web/lists/GetByTitle('{0}')/items?$top=4999&$orderby=Title asc&$select={1}&$expand={2}&$filter={3}",
    SelectExpandFilterOrderByFechaRegistro: "/_api/web/lists/GetByTitle('{0}')/items?$top=4999&$orderby=FechaRegistro desc&$select={1}&$expand={2}&$filter={3}",
    SelectExpandFilterOrderByOrden: "/_api/web/lists/GetByTitle('{0}')/items?$top=4999&$orderby=OrdenEvaluacion desc&$select={1}&$filter={2}",
    SelectExpandFilterByID: "/_api/web/lists/GetByTitle('{0}')/items?$top=4999&$orderby=ID desc&$select={1}&$expand={2}&$filter={3}"
  };

  public static TiposContenido = {
    Destinatario: "Destinatario",
    Empresa: "Empresa",
    Entidad: "Entidad",
    Frecuencia: "Frecuencia",
    TipoDirectiva: "TipoDirectiva",
    TipoEnvio: "TipoEnvio",
    GestionDirectiva: "GestionDirectiva",
    Alcance: "Alcance",
    Area: "Area",
    Division: "Division",
    Evaluacion: "Evaluacion"
  };

  public static GrupoSharePoint = {
    CumplimientoNormativo: "Cumplimiento Normativo"
  };

  public static TipoPrioridad = {
    Alta: "Alta",
    Baja: "Baja",
    Normal: "Normal"
  };

  public static TipoReporte = {
    Interno: "Interno",
    Externo: "Externo"
  };

  public static ListaTipoReporte = ["Interno", "Externo"];

  public static TipoSolicitud = {
    Nuevo: "Nuevo",
    Modificar: "Modificar"
  };

  public static ListaTipoSolicitud = ["Nuevo", "Modificar"];

  public static ListaTipoDia = ["Calendario", "Hábiles"];

  public static ListaTipoPeriodo = ["mismo", "siguiente"];

  public static ListaDias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  public static ListaDiasCalculo = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  public static ListaSemanas = ["1°", "2°", "3°", "4°"];

  public static ListaSemanasCalculo = ["1° Semana", "2° Semana", "3° Semana", "4° Semana"];

  public static ListaQuincenaCalculo = ["1° Quincena", "2° Quincena"];

  public static ListaTrimestreCalculo = ["1° Trimestre", "2° Trimestre", "3° Trimestre", "4° Trimestre"];

  public static ListaCuatrimestreCalculo = ["1° Cuatrimestre", "2° Cuatrimestre", "3° Cuatrimestre"];

  public static ListaSemestreCalculo = ["1° Semestre", "2° Semestre"];

  public static EstadoReporte = {
    Anulado: "Anulado",
    NoVigente: "No Vigente",
    Programada: "Programada",
    Vigente: "Vigente"
  };

  public static EstadoExpedienteReporte = {
    EnAmpliacion: "En Ampliación",
    Pendiente: "Pendiente",
    Rechazado: "Rechazado",
    Finalizado: "Finalizado",
    Enviado: "Enviado",
    Anulado: "Anulado"
  };

  public static EstadoTareaExpedienteReporte = {
    Pendiente: "Pendiente",
    Finalizado: "Finalizado",
    FinalizadoSinAtencion: "Finalizado - Sin atención"
  };

  public static EstadoSolicitudAmpliacion = {
    PorValidar: "Por Validar",
    Aprobado: "Aprobado",
    Rechazado: "Rechazado",
    RegistroDirecto: "Registro Directo"
  };

  public static EstadoAtencionExpediente = {
    PorValidar: "Por Validar",
    Rechazado: "Rechazado",
    Aprobado: "Aprobado"
  };

  public static EstadoProyecto = {
    Comunicado: "Comunicado",
    Cerrado: "Finalizado"
  };

  public static EstadoEncuesta = {
    Registrada: "Registrada",
    Enviada: "Enviada",
    Finalizada: "Finalizada",
    Anulada: "Anulada"
  };

  public static ListaEstadoIncidente = ["Registrado", "En Proceso", "En Seguimiento", "Finalizado", "Anulado"];

  public static ListadoEstadoProyecto = ["Comunicado", "Finalizado"];

  public static ListaEstadoEncuesta = ["Registrada", "Enviada", "Finalizada", "Anulada"];

  public static ListaEstadoSolicitudReporte = ["Pendiente", "Atendido"];

  public static ListaEstadoReporte = ["Anulado", "No Vigente", "Programada", "Vigente", "Finalizado"];

  public static ListaEstadoExpedienteReporte = ["Pendiente", "En Ampliación", "Enviado", "Finalizado", "Rechazado", "Anulado"];

  public static ListaEstadoTareaExpedienteReporte = ["Pendiente", "Finalizado", "Finalizado - Sin atención"];

  public static ListaFrecuencia = ["Semanal", "Quincenal", "Mensual", "Trimestral", "Cuatrimestral", "Semestral", "Anual", "Eventual"];

  public static ListaMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  public static ListaPeriodoFrecuencia = [
    { Title: "1° Semana", Frecuencia: "Semanal" },
    { Title: "2° Semana", Frecuencia: "Semanal" },
    { Title: "3° Semana", Frecuencia: "Semanal" },
    { Title: "4° Semana", Frecuencia: "Semanal" },
    { Title: "1° Quincena", Frecuencia: "Quincenal" },
    { Title: "2° Quincena", Frecuencia: "Quincenal" },
    { Title: "Enero", Frecuencia: "Mensual" },
    { Title: "Febrero", Frecuencia: "Mensual" },
    { Title: "Marzo", Frecuencia: "Mensual" },
    { Title: "Abril", Frecuencia: "Mensual" },
    { Title: "Mayo", Frecuencia: "Mensual" },
    { Title: "Junio", Frecuencia: "Mensual" },
    { Title: "Julio", Frecuencia: "Mensual" },
    { Title: "Agosto", Frecuencia: "Mensual" },
    { Title: "Septiembre", Frecuencia: "Mensual" },
    { Title: "Octubre", Frecuencia: "Mensual" },
    { Title: "Noviembre", Frecuencia: "Mensual" },
    { Title: "Diciembre", Frecuencia: "Mensual" },
    { Title: "1° Trimestre", Frecuencia: "Trimestral" },
    { Title: "2° Trimestre", Frecuencia: "Trimestral" },
    { Title: "3° Trimestre", Frecuencia: "Trimestral" },
    { Title: "4° Trimestre", Frecuencia: "Trimestral" },
    { Title: "1° Cuatrimestre", Frecuencia: "Cuatrimestral" },
    { Title: "2° Cuatrimestre", Frecuencia: "Cuatrimestral" },
    { Title: "3° Cuatrimestre", Frecuencia: "Cuatrimestral" },
    { Title: "1° Semestre", Frecuencia: "Semestral" },
    { Title: "2° Semestre", Frecuencia: "Semestral" },
    { Title: (new Date().getFullYear() - 1).toString(), Frecuencia: "Anual" },
    { Title: new Date().getFullYear().toString(), Frecuencia: "Anual" },
    { Title: (new Date().getFullYear() + 1).toString(), Frecuencia: "Anual" },
    { Title: (new Date().getFullYear() + 2).toString(), Frecuencia: "Anual" },
    { Title: (new Date().getFullYear() + 4).toString(), Frecuencia: "Anual" },
    { Title: (new Date().getFullYear() + 5).toString(), Frecuencia: "Anual" }
  ];

  public static ValoresFrecuencia = {
    Semanal: "Semanal",
    Quincenal: "Quincenal",
    Mensual: "Mensual",
    Trimestral: "Trimestral",
    Cuatrimestral: "Cuatrimestral",
    Semestral: "Semestral",
    Anual: "Anual",
    Eventual: "Eventual"
  };

  public static ValoresTipoDia = { Calendario: "Calendario", Habil: "Hábiles" };

  public static ValidadocionCampos = {
    BusqueUnUsuario: "Busque un usuario.",
    CargueUnArchivo: "Cargue un archivo.",
    IngreseUnaFecha: "Ingrese una fecha.",
    IngreseUnValor: "Ingrese un valor.",
    SeleccioneUnValor: "Seleccione un valor.",
    SeleccioneUnaFecha: "Seleccione una fecha.",
    SeleccioneUnExpediente: "Seleccione un expediente."
  };

  public static ValoreCombos = {
    Seleccione: "Seleccione",
    Todos: "Todos"
  };

  public static ValoresEstadosElemento = {
    Activo: "True",
    Inactivo: "Inactivo"
  };

  public static ValoresGenericos = {
    /*DESARROLLO
    UrlSitio: "https://efectivasa.sharepoint.com/sites/DESA/GestionCanales",
    PathBaseName: "/sites/DESA/GestionCanales/SitePages/AppGestionBaseCliente.aspx",
    pathSitio: "/sites/DESA/GestionCanales",
    urlImagenes: "https://efectivasa.sharepoint.com/sites/DESA/GestionCanales/_catalogs/masterpage/Aplicacion",
    urlDescarga: "https://efectivasa.sharepoint.com",
    urlWebExterna: "https://normativasapitest.azurewebsites.net/app.aspx",
    urlServicioNotificarEncuesta: "https://normativasapitest.azurewebsites.net/api/Encuesta/EnviarCorreoNotificarEncuesta",
    urlServicio: "http://localhost:56155/",*/
    /*QA
    UrlSitio: "https://efectivasa.sharepoint.com/sites/UAT/GrupoEFE-GestionBaseClientes",
    PathBaseName: "/sites/uat/GrupoEFE-GestionBaseClientes/SitePages/AppGestionBaseCliente.aspx",
    pathSitio: "/sites/uat/GrupoEFE-GestionBaseClientes",
    urlImagenes: "https://efectivasa.sharepoint.com/sites/uat/GrupoEFE-GestionBaseClientes/_catalogs/masterpage/Aplicacion",
    urlDescarga: "https://efectivasa.sharepoint.com",
    urlWebExterna: "https://normativasapitest.azurewebsites.net/app.aspx",
    urlServicioNotificarEncuesta: "https://normativasapitest.azurewebsites.net/api/Encuesta/EnviarCorreoNotificarEncuesta",
    urlServicio: "https://canalesdigitalesqa.efectiva.pe:5443/ws_wa_GestionBaseClientes/",*/
    /*PRD
*/
    UrlSitio: "https://efectivasa.sharepoint.com/GrupoEFE-GestionBaseClientes",
    PathBaseName: "/GrupoEFE-GestionBaseClientes/SitePages/AppGestionBaseCliente.aspx",
    pathSitio: "/GrupoEFE-GestionBaseClientes",
    urlImagenes: "https://efectivasa.sharepoint.com/GrupoEFE-GestionBaseClientes/_catalogs/masterpage/Aplicacion",
    urlDescarga: "https://efectivasa.sharepoint.com",
    urlWebExterna: "https://normativasapitest.azurewebsites.net/app.aspx",
    urlServicioNotificarEncuesta: "https://normativasapitest.azurewebsites.net/api/Encuesta/EnviarCorreoNotificarEncuesta",
    urlServicio: "https://canalesdigitales.efectiva.pe/ws_wa_GestionBaseClientes/",


    ElementosPorPagina: 30,
    ElementosPorPaginaMaximo: 4999,
    Parametro: "[parametro]",
    ValorEstadoElementoActivo: "1",
    TamanoMaximoArchivosEnMegas: 50,
    ExtensionesNoPermitidas: "EXE,RAR,BAT,INI",
    ElementosPorPaginaPopUp: 5
  };

  public static Paginas = {
    ModificarExpedientePagina: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Expediente/ModificarExpediente/[ID]",
    ModificarExpedienteURL: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Expediente/ModificarExpediente/[ID]",
    ConsultarDirectivasURL: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Expediente/ConsultarDirectivas",
    ConsultarExpedientePagina: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Expediente/ConsultarExpedientes",
    ConsultarExpedienteURL: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Expediente/ConsultarExpedientes",
    DetalleExpedientePagina: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Expediente/DetalleExpediente/[ID]",
    DetalleExpedienteURL: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Expediente/DetalleExpediente/[ID]",
    DetalleExpedienteTabTareaURL: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Expediente/DetalleExpediente/[ID]/4",
    RegistrarExpedientePagina: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Expediente/RegistrarExpediente",
    RegistrarNormaPagina: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Norma/Registrar",
    ModificarNormaPagina: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Norma/Modificar/[ID]",
    DetalleNormaPagina: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Norma/Detalle/[ID]",
    BandejaNormaPagina: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Norma/Bandeja",
    DetalleNormaTabURL: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Norma/Detalle/[ID]/[TAB]",
    DetalleIncidentePagina: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Incidente/Detalle/[ID]",
    BandejaIncidentePagina: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Incidente/Bandeja",
    ModificarIncidentePagina: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Incidente/Modificar/[ID]",
    RegistrarIncidentePagina: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Incidente/Registro",
    DetalleReporte: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Reporte/ProgramacionReporte?pID=[ID]",
    DetalleExpedienteReporte: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Reporte/DetalleExpedienteReporte?pIDReporte=[IDReporte]&pID=[ID]",
    DetalleExpedienteReporteTabTareas: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Reporte/DetalleExpedienteReporte?pIDReporte=[IDReporte]&pID=[ID]&pTab=Tareas",
    BandejaProyectos: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Proyecto/ConsultarProyectos",
    RegistroProyecto: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Proyecto/NuevoProyecto",
    //  DetalleProyectoPagina: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Proyecto/DetalleProyecto?pID=[ID]",
    EditarProyectoPagina: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Proyecto/ModificarProyecto?pID=[ID]",
    EncuestaExterna: ParametrosNoAdministrables.ValoresGenericos.urlWebExterna + "/Encuesta?pID=[ID]&pToken=[Token]",
    DetalleSolicitudExtraible: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Solicitud/Usb-CD/[ID]",
    DetalleSolicitudVPN: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Solicitud/VPN/[ID]",
    DetalleSolicitudExternoRedInterna: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Solicitud/Equipos-externos-red-interna/[ID]",
    DetalleSolicitudCuentaExterno: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Solicitud/Cuenta-red-externos/[ID]",
    DetalleSolicitudSap: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Solicitud/SAP/[ID]",
    DetalleSolicitudAIT: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Solicitud/AIT/[ID]",
    DetalleVendedor: ParametrosNoAdministrables.ValoresGenericos.PathBaseName + "/Vendedor/Detalle/[ID]",
  };
}
