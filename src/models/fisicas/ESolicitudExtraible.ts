import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { EBaseEntidad } from "src/models/Base/EBaseEntidad";
// import ParseJsom from "src/genericos/ParseJsom";
import Funciones from "../../genericos/Funciones";
import { RestFiltros } from "../../genericos/RestFiltros";
import Usuario from '../Base/Usuario';
// import EObservacion from './EObservacion';
import Lookup from '../Base/Lookup';
// import Usuario from '../Base/Usuario';




export default class ESolicitudExtraible extends EBaseEntidad {
  public static NombreLista: string = "Vendedores";



  public static Campos = {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    NumeroDocumento: "NumeroDocumento",
    Nombre: "Nombre",
    Telefono: "Telefono",
    Correo: "Correo",
    TerminoCondiciones: "TerminoCondiciones",
    Banco: "Banco",
    CuentaBancaria: "CuentaBancaria",
    CCI: "CCI",
    ValidacionIdentidad: "ValidacionIdentidad",
    ValidacionLavado: "ValidacionLavado",
    Estado: "Estado",
    FechaEstado: "FechaEstado",
    Direccion: "Direccion",
    TerminosCondiciones: "TerminosCondiciones",


  }

  public static CamposExpand = {
    UsuarioRegistro: "UsuarioRegistro",
    Solicitud: "Solicitud",
    Solicitud_Area: "Solicitud_Area",
    GerenteSolicitante: "GerenteSolicitante"
  }

  public static CamposSolicitud = {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    EstadoElemento: ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
    EstadoSolicitud: "EstadoSolicitud",
    FechaRegistro: "FechaRegistro",
    TipoSolicitud: "TipoSolicitud",
    CodigoSolicitud: "CodigoSolicitud"
  }


  public static CamposSolicitudExpand = {
    UsuarioRegistro: "UsuarioRegistro",
    GerenteSolicitante: "GerenteSolicitante"
  }

  public static CamposSolicitudVpn = {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    CodigoEmpleado: "CodigoEmpleado",
    NombreUsuario: "NombreUsuario",
    SolicitudCargo: "SolicitudCargo",
    SolicitudEmpresa: "SolicitudEmpresa",
    SolicitudMotivo: "SolicitudMotivo",
    TipoAcceso: "TipoAcceso",
    AutorizadoPorGerencia: "AutorizadoPorGerencia",
    Solicitud: "Solicitud",
    EstadoElemento: ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
    Solicitud_Area: "Solicitud_Area",
    GerenteSolicitante: "GerenteSolicitante",
    Cargo2: "Cargo2",
    Celular3: "Celular3",
    CodigoEmpleado2: "CodigoEmpleado2",
    Correo2: "Correo2",
    Correo3: "Correo3",
    DNIEmpleado2: "DNIEmpleado2",
    EmpresaEmpleado2: "EmpresaEmpleado2",
    IpDestino2: "IpDestino2",
    IpInterna2: "IpInterna2",
    IpPrivada3: "IpPrivada3",
    IpPublica3: "IpPublica3",
    KeyConexion3: "KeyConexion3",
    MarcaModeloVPN3: "MarcaModeloVPN3",
    Nombre2: "Nombre2",
    Nombre3: "Nombre3",
    TipoMotivo: "TipoMotivo",
    TipoPersona: "TipoPersona",
    FechaInicioAcceso: "FechaInicioAcceso",
    FechaFinAcceso: "FechaFinAcceso",
    AreaSolicitud: "AreaSolicitud"
  }

  public static CamposSolicitudCRE = {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    CodigoEmpleado: "CodigoEmpleado",
    NombreUsuario: "NombreUsuario",
    SolicitudCargo: "SolicitudCargo",
    SolicitudEmpresa: "SolicitudEmpresa",
    TipoAcceso: "TipoAcceso",
    AutorizadoPorGerencia: "AutorizadoPorGerencia",
    Solicitud: "Solicitud",
    EstadoElemento: ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
    Solicitud_Area: "Solicitud_Area",
    GerenteSolicitante: "GerenteSolicitante",
    Cargo2: "Cargo2",
    Correo2: "Correo2",
    EmpresaEmpleado2: "EmpresaEmpleado2",
    FechaFinAcceso: "FechaFinAcceso",
    FechaInicioAcceso: "FechaInicioAcceso",
    Hostname: "Hostname",
    Nombre2: "Nombre2",
    NuevoAcceso: "NuevoAcceso",
    Renovacion: "Renovacion",
    TipoMotivo: "TipoMotivo",
    Especificar: "Especificar",
    AreaSolicitud: "AreaSolicitud"

  }

  public static CamposSolicitudERI = {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    CodigoEmpleado: "CodigoEmpleado",
    NombreUsuario: "NombreUsuario",
    SolicitudCargo: "SolicitudCargo",
    SolicitudEmpresa: "SolicitudEmpresa",
    // SolicitudMotivo: "SolicitudMotivo",
    TipoAcceso: "TipoAcceso",
    AutorizadoPorGerencia: "AutorizadoPorGerencia",
    Solicitud: "Solicitud",
    EstadoElemento: ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
    Solicitud_Area: "Solicitud_Area",
    GerenteSolicitante: "GerenteSolicitante",
    Cargo2: "Cargo2",
    Correo2: "Correo2",
    EmpresaEmpleado2: "EmpresaEmpleado2",
    FechaFinAcceso: "FechaFinAcceso",
    FechaInicioAcceso: "FechaInicioAcceso",
    Hostname: "Hostname",
    HostName2: "HostName2",
    TipoMotivo: "TipoMotivo",
    Nombre2: "Nombre2",
    Especificar: "Especificar",
    TipoSeguridad: "TipoSeguridad",
    FechaSeguridad: "FechaSeguridad",
    AreaSolicitud: "AreaSolicitud"



  }

  public static CamposSolicitudSAP = {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    CodigoEmpleado: "CodigoEmpleado",
    NombreUsuario: "NombreUsuario",
    SolicitudCargo: "SolicitudCargo",
    SolicitudEmpresa: "SolicitudEmpresa",
    TipoAcceso: "TipoAcceso",
    AutorizadoPorGerencia: "AutorizadoPorGerencia",
    Solicitud: "Solicitud",
    EstadoElemento: ParametrosNoAdministrables.ColumnasSitio.EstadoElemento,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
    Solicitud_Area: "Solicitud_Area",
    GerenteSolicitante: "GerenteSolicitante",
    SolicitudCorreo: "SolicitudCorreo",
    TipoSistema: "TipoSistema",
    Cuenta: "Cuenta",
    Roles: "Roles",
    AprobacionOficialSeguridad: "AprobacionOficialSeguridad",
    AreaSolicitud: "AreaSolicitud",
    DatosBeneficiario: "DatosBeneficiario",
    DNIBeneficiario: "DNIBeneficiario",
    CargoBeneficiario: "CargoBeneficiario"

  }


  public static CamposSolicitudAIT = {
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    NombreUsuario: "NombreUsuario",
    SolicitudCargo: "SolicitudCargo",
    SolicitudEmpresa: "SolicitudEmpresa",
    Solicitud_Area: "Solicitud_Area",
    GerenteSolicitante: "GerenteSolicitante",
    SolicitudMotivo: "SolicitudMotivo",
    EspecificarMotivoSolicitud: "EspecificarMotivoSolicitud",
    TipoPlataforma: "TipoPlataforma",
    EspecificarPlataforma: "EspecificarPlataforma",
    TipoAcceso: "TipoAcceso",
    CuentaRenovar: "CuentaRenovar",
    TipoAmbiente: "TipoAmbiente",
    TipoPerfil: "TipoPerfil",
    TiempoAcceso: "TiempoAcceso",
    Hostname: "Hostname",
    FechaInicioAcceso: "FechaInicioAcceso",
    FechaFinAcceso: "FechaFinAcceso",
    NombreResponsable: "NombreResponsable",
    EmpresaResponsable: "EmpresaResponsable",
    CargoResponsable: "CargoResponsable",
    CorreoResponsable: "CorreoResponsable",
    Solicitud: "Solicitud",
    UsuarioRegistro: "UsuarioRegistro",
    TipoPersona: "TipoPersona",
    AreaSolicitud: "AreaSolicitud"

  }

  public static CamposActividad = {
    ID: "ID",
    Detalle: "Detalle",
    FechaRegistro: "FechaRegistro",
    UsuarioRegistro: "UsuarioRegistro",
    EstadoElemento: "EstadoElemento",

  };
  public static CamposExpandActividad = {
    UsuarioRegistro: "UsuarioRegistro",
    Solicitud: "Solicitud"
  };






  public static getEndPointElementosActivos() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESolicitudExtraible.Campos);

    const endPointObtenerDivisiones: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      this.NombreLista,
      listaFieldsSelect.join(","),
      RestFiltros.obtenerFiltroPorEstadoActivo()
    );
    return endPointObtenerDivisiones;
  }


  public static getEndPointElementosActivosAITxID(id: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESolicitudExtraible.CamposSolicitudAIT);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      ESolicitudExtraible.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.GerenteSolicitante
      ),
      RestFiltros.obtenerFieldExpandLookup(ESolicitudExtraible.CamposExpand.Solicitud),
      RestFiltros.obtenerFieldExpandLookuptest(ESolicitudExtraible.CamposExpand.Solicitud_Area),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const valorFilter = `${ESolicitudExtraible.CamposExpand.Solicitud}/ID eq '${id}'`;
    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterOrderByFechaRegistro,
      "AdministracionInfraestructuraTecnologia",
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      valorFilter
    );

    return endPoint;
  }

  public static getEndPointElementosActivosAIT() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESolicitudExtraible.CamposSolicitudAIT);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      ESolicitudExtraible.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.GerenteSolicitante
      ),
      RestFiltros.obtenerFieldExpandLookup(ESolicitudExtraible.CamposExpand.Solicitud),
      RestFiltros.obtenerFieldExpandLookuptest(ESolicitudExtraible.CamposExpand.Solicitud_Area),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpand,
      "AdministracionInfraestructuraTecnologia",
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(",")
    );

    return endPoint;
  }



  public static getEndPointElementosActivosxID(id: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESolicitudExtraible.Campos);



    const valorFilter = `${ESolicitudExtraible.Campos.ID} eq '${id}'`;
    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      this.NombreLista,
      listaFieldsSelect.join(","),
      valorFilter
    );

    return endPoint;
  }

  public static getEndPointElementosVendedorAprobados() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESolicitudExtraible.Campos);



    const valorFilter = `${ESolicitudExtraible.Campos.Estado} eq 'Aprobado'`;
    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectFilter,
      this.NombreLista,
      listaFieldsSelect.join(","),
      valorFilter
    );

    return endPoint;
  }


  public static getEndPointElementosActivosEXT() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESolicitudExtraible.Campos);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      ESolicitudExtraible.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.GerenteSolicitante
      ),
      RestFiltros.obtenerFieldExpandLookup(ESolicitudExtraible.CamposExpand.Solicitud),
      RestFiltros.obtenerFieldExpandLookuptest(ESolicitudExtraible.CamposExpand.Solicitud_Area),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpand,
      this.NombreLista,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(",")
    );

    return endPoint;
  }


  public static getEndPointElementosActivosSolicitudxID(id: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESolicitudExtraible.CamposSolicitud);
    const listaCamposSolicitudExpand = Funciones.obtenerListaCampos(
      ESolicitudExtraible.CamposSolicitudExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposSolicitudExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposSolicitudExpand.GerenteSolicitante
      ),


    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const valorFilter = `ID eq '${id}'`;
    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterOrderByFechaRegistro,
      "Solicitud",
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposSolicitudExpand.join(","),
      valorFilter
    );

    return endPoint;
  }


  public static getEndPointElementosActivosVPNxID(id: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESolicitudExtraible.CamposSolicitudVpn);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      ESolicitudExtraible.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.GerenteSolicitante
      ),
      RestFiltros.obtenerFieldExpandLookup(ESolicitudExtraible.CamposExpand.Solicitud),
      RestFiltros.obtenerFieldExpandLookuptest(ESolicitudExtraible.CamposExpand.Solicitud_Area),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const valorFilter = `${ESolicitudExtraible.CamposExpand.Solicitud}/ID eq '${id}'`;
    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterOrderByFechaRegistro,
      "Vpn",
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      valorFilter
    );

    return endPoint;
  }

  public static getEndPointElementosActivosVPN() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESolicitudExtraible.CamposSolicitudVpn);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      ESolicitudExtraible.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.GerenteSolicitante
      ),
      RestFiltros.obtenerFieldExpandLookup(ESolicitudExtraible.CamposExpand.Solicitud),
      RestFiltros.obtenerFieldExpandLookuptest(ESolicitudExtraible.CamposExpand.Solicitud_Area),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpand,
      "Vpn",
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(",")
    );

    return endPoint;
  }

  public static getEndPointElementosActivosCRExID(id: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESolicitudExtraible.CamposSolicitudCRE);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      ESolicitudExtraible.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.GerenteSolicitante
      ),
      RestFiltros.obtenerFieldExpandLookup(ESolicitudExtraible.CamposExpand.Solicitud),
      RestFiltros.obtenerFieldExpandLookuptest(ESolicitudExtraible.CamposExpand.Solicitud_Area),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const valorFilter = `${ESolicitudExtraible.CamposExpand.Solicitud}/ID eq '${id}'`;
    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterOrderByFechaRegistro,
      "CuentaRedExternos",
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      valorFilter
    );

    return endPoint;
  }

  public static getEndPointElementosActivosCRE() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESolicitudExtraible.CamposSolicitudCRE);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      ESolicitudExtraible.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.GerenteSolicitante
      ),
      RestFiltros.obtenerFieldExpandLookup(ESolicitudExtraible.CamposExpand.Solicitud),
      RestFiltros.obtenerFieldExpandLookuptest(ESolicitudExtraible.CamposExpand.Solicitud_Area),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpand,
      "CuentaRedExternos",
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(",")
    );

    return endPoint;
  }

  public static getEndPointElementosActividadxID(id: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESolicitudExtraible.CamposActividad);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      ESolicitudExtraible.CamposExpandActividad
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandLookup(ESolicitudExtraible.CamposExpand.Solicitud),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const valorFilter = `${ESolicitudExtraible.CamposExpand.Solicitud}/ID eq '${id}'`;
    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterOrderByFechaRegistro,
      "Actividad",
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      valorFilter
    );

    return endPoint;
  }





  public static getEndPointElementosActivosERIxID(id: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESolicitudExtraible.CamposSolicitudERI);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      ESolicitudExtraible.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.GerenteSolicitante
      ),
      RestFiltros.obtenerFieldExpandLookup(ESolicitudExtraible.CamposExpand.Solicitud),
      RestFiltros.obtenerFieldExpandLookuptest(ESolicitudExtraible.CamposExpand.Solicitud_Area),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const valorFilter = `${ESolicitudExtraible.CamposExpand.Solicitud}/ID eq '${id}'`;
    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterOrderByFechaRegistro,
      "ExternoRedInterna",
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      valorFilter
    );

    return endPoint;
  }

  public static getEndPointElementosActivosERI() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESolicitudExtraible.CamposSolicitudERI);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      ESolicitudExtraible.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.GerenteSolicitante
      ),
      RestFiltros.obtenerFieldExpandLookup(ESolicitudExtraible.CamposExpand.Solicitud),
      RestFiltros.obtenerFieldExpandLookuptest(ESolicitudExtraible.CamposExpand.Solicitud_Area),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    // const valorFilter = `${ESolicitudExtraible.CamposExpand.Solicitud}/ID eq '${id}'`;
    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpand,
      "ExternoRedInterna",
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(",")
    );

    return endPoint;
  }

  public static getEndPointElementosActivosSAPxID(id: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESolicitudExtraible.CamposSolicitudSAP);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      ESolicitudExtraible.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.GerenteSolicitante
      ),
      RestFiltros.obtenerFieldExpandLookup(ESolicitudExtraible.CamposExpand.Solicitud),
      RestFiltros.obtenerFieldExpandLookuptest(ESolicitudExtraible.CamposExpand.Solicitud_Area),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const valorFilter = `${ESolicitudExtraible.CamposExpand.Solicitud}/ID eq '${id}'`;
    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterOrderByFechaRegistro,
      "Sap",
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      valorFilter
    );

    return endPoint;
  }


  public static getEndPointElementosActivosSAP() {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESolicitudExtraible.CamposSolicitudSAP);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      ESolicitudExtraible.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandUsuario(
        ESolicitudExtraible.CamposExpand.GerenteSolicitante
      ),
      RestFiltros.obtenerFieldExpandLookup(ESolicitudExtraible.CamposExpand.Solicitud),
      RestFiltros.obtenerFieldExpandLookuptest(ESolicitudExtraible.CamposExpand.Solicitud_Area),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    //  const valorFilter = `${ESolicitudExtraible.CamposExpand.Solicitud}/ID eq '${id}'`;
    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpand,
      "Sap",
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(",")
    );

    return endPoint;
  }




  public ID: number;
  public CodigoEmpleado: string;
  public Hostname: string;
  public NombreUsuario: string;
  public SolicitudCargo: string;
  public SolicitudEmpresa: string;
  public SolicitudMotivo: string;
  public TipoAcceso: string;
  public AutorizadoPorGerencia: string;
  public IpEquipo: string;
  public Solicitud: Lookup;
  public FechaRegistro: Date;
  public UsuarioRegistro: Usuario;

  public SolicitudId: number;
  public SolicitudAreaId: number;
  public AreaSolicitud: string;

  public FechaInicioAcceso: Date;
  public FechaFinAcceso: Date;
  public UsuarioRegistroId: number;

  public CodigoSolicitud: string;
  public Empresa: string;
  public EstadoSolicitud: string;
  public FechaFinSolicitud: Date;
  public FechaSeguridad: Date;
  public TipoSolicitud: string;
  public TipoSeguridad: string;
  public GerenteSolicitanteId: number;
  public AprobacionOficialSeguridad: string;
  public DatosBeneficiario: string;
  public DNIBeneficiario: string;
  public CargoBeneficiario: string;

  public Nombre2: string;
  public Cargo2: string;
  public Correo2: string;
  public TipoMotivo: string;
  public IpDestino2: string;
  public IpInterna2: string;
  public TipoPersona: string;
  public CodigoEmpleado2: string;
  public DNIEmpleado2: string;
  public EmpresaEmpleado2: string;
  public Nombre3: string;
  public Celular3: string;
  public Correo3: string;
  public MarcaModeloVpn: string;
  public IpPublica3: string;
  public IpPrivada3: string;
  public KeyConexion: string;

  public Especificar2: string;

  public Nuevo: string;
  public Renovacion: string;

  public SolicitudCorreo: string;
  public TipoSistema: string;
  public Cuenta: string;

  public Detalle: string;
  public Roles: string;

  public MotivoEspecificar: string;
  public TipoPlataforma: string;
  public PlataformaEspecificar: string;
  public CuentaRenovacion: string;
  public TipoAmbiente: string;
  public TipoPerfil: string;
  public TiempoAcceso: string;
  public NombreResponsable: string;
  public EmpresaResponsable: string;
  public CargoResponsable: string;
  public CorreoResponsable: string;



  public CuentaBancaria: string;
  public Banco: string;
  public CCI: string;
  public Lavado: boolean;
  public Identidad: boolean;
  public Estado: string;
  public Nombre: string;
  public Direccion: string;
  public Telefono: string;
  public Correo: string;




  constructor() {
    super();
    this.ID = 0;
    this.CodigoEmpleado = "";
    this.Hostname = "";
    this.NombreUsuario = "";
    this.SolicitudCargo = "";
    this.SolicitudEmpresa = "";
    this.SolicitudMotivo = "";
    this.TipoAcceso = "";
    this.AutorizadoPorGerencia = "";
    this.IpEquipo = "";
    this.Solicitud = new Lookup;
    this.FechaRegistro = new Date;
    this.UsuarioRegistro = new Usuario;

  }



  public setValoresNuevoSolicitudExtraibles(
    CodigoEmpleado: string,
    Hostname: string,
    NombreUsuario: string,
    SolicitudCargo: string,
    SolicitudEmpresa: string,
    SolicitudArea: string,
    SolicitudMotivo: string,
    TipoAcceso: string,
    FechaInicioAcceso: Date,
    FechaFinAcceso: Date,
    IpEquipo: string,
    Solicitud: number,
    UsuarioRegistroId: number,
    FechaRegistro: Date,
    GerenteSolicitanteId: number,
    DatosBeneficiario: string,

  ) {
    this.SolicitudId = Solicitud;
    this.CodigoEmpleado = CodigoEmpleado;
    this.NombreUsuario = NombreUsuario;
    this.AreaSolicitud = SolicitudArea;
    this.SolicitudCargo = SolicitudCargo;
    this.SolicitudEmpresa = SolicitudEmpresa;
    this.SolicitudMotivo = SolicitudMotivo;
    this.TipoAcceso = TipoAcceso;
    this.Hostname = Hostname;
    this.FechaInicioAcceso = FechaInicioAcceso;
    this.FechaFinAcceso = FechaFinAcceso;
    this.IpEquipo = IpEquipo;
    this.UsuarioRegistroId = UsuarioRegistroId;
    this.FechaRegistro = FechaRegistro;
    this.GerenteSolicitanteId = GerenteSolicitanteId;
    this.DatosBeneficiario = DatosBeneficiario;

  }

  public getValoresNuevoSolicitudExtraibles() {
    return {
      SolicitudId: this.SolicitudId,
      CodigoEmpleado: this.CodigoEmpleado,
      NombreUsuario: this.NombreUsuario,
      AreaSolicitud: this.AreaSolicitud,
      SolicitudCargo: this.SolicitudCargo,
      SolicitudEmpresa: this.SolicitudEmpresa,
      SolicitudMotivo: this.SolicitudMotivo,
      TipoAcceso: this.TipoAcceso,
      Hostname: this.Hostname,
      FechaInicioAcceso: this.FechaInicioAcceso,
      FechaFinAcceso: this.FechaFinAcceso,
      IpEquipo: this.IpEquipo,
      UsuarioRegistroId: this.UsuarioRegistroId,
      FechaRegistro: this.FechaRegistro,
      GerenteSolicitanteId: this.GerenteSolicitanteId,
      DatosBeneficiario: this.DatosBeneficiario,

    }
  }


  public setValoresVendedoresActualizar(
    Banco: string,
    CuentaBancaria: string,
    CCI: string,
    Estado: string,
    Lavado: boolean,
    Identidad: boolean,
    Nombre: string,
    Direccion: string,
    Telefono: string,
    Correo: string

  ) {
    this.Banco = Banco;
    this.CuentaBancaria = CuentaBancaria;
    this.CCI = CCI;
    this.Estado = Estado;
    this.Lavado = Lavado;
    this.Identidad = Identidad;
    this.Nombre = Nombre;
    this.Direccion = Direccion;
    this.Telefono = Telefono;
    this.Correo = Correo;

  }


  public getValoresVendedoresActualizar() {
    return {
      Banco: this.Banco,
      CuentaBancaria: this.CuentaBancaria,
      CCI: this.CCI,
      Estado: this.Estado,
      ValidacionLavado: this.Lavado,
      ValidacionIdentidad: this.Identidad,
      Nombre: this.Nombre,
      Telefono: this.Telefono,
      Correo: this.Correo,
      Direccion: this.Direccion
      // FechaEstado: this.SolicitudMotivo, 
    }
  }



  public setValoresEditarSolicitudExtraibles(
    CodigoEmpleado: string,
    Hostname: string,
    NombreUsuario: string,
    SolicitudCargo: string,
    SolicitudEmpresa: string,
    SolicitudArea: string,
    SolicitudMotivo: string,
    TipoAcceso: string,
    FechaInicioAcceso: Date,
    FechaFinAcceso: Date,
    IpEquipo: string,
    GerenteSolicitanteId: number,
    DatosBeneficiario: string,

  ) {
    this.CodigoEmpleado = CodigoEmpleado;
    this.NombreUsuario = NombreUsuario;
    this.AreaSolicitud = SolicitudArea;
    this.SolicitudCargo = SolicitudCargo;
    this.SolicitudEmpresa = SolicitudEmpresa;
    this.SolicitudMotivo = SolicitudMotivo;
    this.TipoAcceso = TipoAcceso;
    this.Hostname = Hostname;
    this.FechaInicioAcceso = FechaInicioAcceso;
    this.FechaFinAcceso = FechaFinAcceso;
    this.IpEquipo = IpEquipo;
    this.GerenteSolicitanteId = GerenteSolicitanteId;
    this.DatosBeneficiario = DatosBeneficiario;


  }

  public getValoresEditarSolicitudExtraibles() {
    return {
      CodigoEmpleado: this.CodigoEmpleado,
      NombreUsuario: this.NombreUsuario,
      AreaSolicitud: this.AreaSolicitud,
      SolicitudCargo: this.SolicitudCargo,
      SolicitudEmpresa: this.SolicitudEmpresa,
      SolicitudMotivo: this.SolicitudMotivo,
      TipoAcceso: this.TipoAcceso,
      Hostname: this.Hostname,
      FechaInicioAcceso: this.FechaInicioAcceso,
      FechaFinAcceso: this.FechaFinAcceso,
      IpEquipo: this.IpEquipo,
      GerenteSolicitanteId: this.GerenteSolicitanteId,
      DatosBeneficiario: this.DatosBeneficiario,

    }
  }


  public setValoresNuevoSolicitud(
    CodigoSolicitud: string,
    Empresa: string,
    EstadoSolicitud: string,
    FechaRegistro: Date,
    TipoSolicitud: string,
    UsuarioRegistro: number,
    GerenteSolicitanteId: number,


  ) {
    this.CodigoSolicitud = CodigoSolicitud;
    this.Empresa = Empresa;
    this.EstadoSolicitud = EstadoSolicitud;
    this.TipoSolicitud = TipoSolicitud;
    this.UsuarioRegistroId = UsuarioRegistro;
    this.FechaRegistro = FechaRegistro;
    this.GerenteSolicitanteId = GerenteSolicitanteId;

  }

  public setValoresActividadRegistro(
    FechaRegistro: Date,
    UsuarioRegistro: number,
    SolicitudId: number,
  ) {
    this.Detalle = "Se registro la solicitud y se envio a aprobación a gerencia solicitante.";
    this.UsuarioRegistroId = UsuarioRegistro;
    this.FechaRegistro = FechaRegistro;
    this.SolicitudId = SolicitudId;
  }

  public setValoresActividadRegistro2(
    FechaRegistro: Date,
    UsuarioRegistro: number,
    SolicitudId: number,
    Observacion: string,
  ) {
    this.Detalle = Observacion;
    this.UsuarioRegistroId = UsuarioRegistro;
    this.FechaRegistro = FechaRegistro;
    this.SolicitudId = SolicitudId;
  }


  public setValoresActividadRegistroAprobacionGerente(
    FechaRegistro: Date,
    UsuarioRegistro: number,
    SolicitudId: number,
    Observacion: string,
  ) {
    this.Detalle = "Aprobado por la gerencia solicitante. : " + Observacion;
    this.UsuarioRegistroId = UsuarioRegistro;
    this.FechaRegistro = FechaRegistro;
    this.SolicitudId = SolicitudId;
  }

  public setValoresActividadRegistroAnalistaFuncionalXAnalistaSeguridad(
    FechaRegistro: Date,
    UsuarioRegistro: number,
    SolicitudId: number,
  ) {
    this.Detalle = "Revisado por analista funcional.";
    this.UsuarioRegistroId = UsuarioRegistro;
    this.FechaRegistro = FechaRegistro;
    this.SolicitudId = SolicitudId;
  }



  public setValoresActividadRegistroRechazoGerente(
    FechaRegistro: Date,
    UsuarioRegistro: number,
    SolicitudId: number,
    Observacion: string,
  ) {
    this.Detalle = "Rechazado por la gerencia solicitante. " + Observacion;
    this.UsuarioRegistroId = UsuarioRegistro;
    this.FechaRegistro = FechaRegistro;
    this.SolicitudId = SolicitudId;
  }


  public setValoresActividadRegistroAprobacionAnalistaSeguridad(
    FechaRegistro: Date,
    UsuarioRegistro: number,
    SolicitudId: number,
    Observacion: string,
  ) {
    this.Detalle = "Aprobado por el analista de seguridad. : " + Observacion;
    this.UsuarioRegistroId = UsuarioRegistro;
    this.FechaRegistro = FechaRegistro;
    this.SolicitudId = SolicitudId;
  }

  public setValoresActividadRegistroEnviadoAnalistaFuncional(
    FechaRegistro: Date,
    UsuarioRegistro: number,
    SolicitudId: number,
  ) {
    this.Detalle = "Enviado al analista funcional para la definición de roles";
    this.UsuarioRegistroId = UsuarioRegistro;
    this.FechaRegistro = FechaRegistro;
    this.SolicitudId = SolicitudId;
  }

  public setValoresActividadRegistroRechazadoAnalistaSeguridad(
    FechaRegistro: Date,
    UsuarioRegistro: number,
    SolicitudId: number,
    Observacion: string,
  ) {
    this.Detalle = "Rechazado por el analista de seguridad. : " + Observacion;
    this.UsuarioRegistroId = UsuarioRegistro;
    this.FechaRegistro = FechaRegistro;
    this.SolicitudId = SolicitudId;
  }

  public setValoresActividadRegistroAprobacionOficialSeguridad(
    FechaRegistro: Date,
    UsuarioRegistro: number,
    SolicitudId: number,
    Observacion: string,
  ) {
    this.Detalle = "Aprobado por el oficial de seguridad. : " + Observacion;
    this.UsuarioRegistroId = UsuarioRegistro;
    this.FechaRegistro = FechaRegistro;
    this.SolicitudId = SolicitudId;
  }

  public setValoresActividadRegistroRechazadoOficialSeguridad(
    FechaRegistro: Date,
    UsuarioRegistro: number,
    SolicitudId: number,
    Observacion: string,
  ) {
    this.Detalle = "Rechazado por el oficial de seguridad : " + Observacion;
    this.UsuarioRegistroId = UsuarioRegistro;
    this.FechaRegistro = FechaRegistro;
    this.SolicitudId = SolicitudId;
  }

  public setValoresActividadFaltaLicencia(
    FechaRegistro: Date,
    UsuarioRegistro: number,
    SolicitudId: number,
    Observacion: string,
  ) {
    this.Detalle = "Rechazado por el analista de seguridad : " + Observacion;
    this.UsuarioRegistroId = UsuarioRegistro;
    this.FechaRegistro = FechaRegistro;
    this.SolicitudId = SolicitudId;
  }

  public setValoresActividadGestionLicencia(
    FechaRegistro: Date,
    UsuarioRegistro: number,
    SolicitudId: number,
    Observacion: string,
  ) {
    this.Detalle = Observacion;
    this.UsuarioRegistroId = UsuarioRegistro;
    this.FechaRegistro = FechaRegistro;
    this.SolicitudId = SolicitudId;
  }


  public setValoresSolicitudTerminada(
    FechaRegistro: Date,
    UsuarioRegistro: number,
    SolicitudId: number,
    Observacion: string,
  ) {
    this.Detalle = "Solicitud aprobada. : " + Observacion;
    this.UsuarioRegistroId = UsuarioRegistro;
    this.FechaRegistro = FechaRegistro;
    this.SolicitudId = SolicitudId;
  }



  public getValoresActividadRegistro() {
    return {
      Detalle: this.Detalle,
      UsuarioRegistroId: this.UsuarioRegistroId,
      FechaRegistro: this.FechaRegistro,
      SolicitudId: this.SolicitudId,
    }
  }


  public setValoresAprobarSolicitudOficialSeguridad(
    AprobacionOficialSeguridad: string,
  ) {
    this.AprobacionOficialSeguridad = AprobacionOficialSeguridad;
  }

  public getValoresAprobarSolicitudOficialSeguridad() {
    return {
      AprobacionOficialSeguridad: this.AprobacionOficialSeguridad
    }
  }


  public setValoresSolicitudRoles(
    Roles: string,
  ) {
    this.Roles = Roles;
  }

  public getValoresSolicitudRoles() {
    return {
      Roles: this.Roles
    }
  }



  public setValoresAprobarSolicitud(
    EstadoSolicitud: string,
  ) {
    this.EstadoSolicitud = EstadoSolicitud;
  }

  public getValoresAprobarSolicitud() {
    return {
      EstadoSolicitud: this.EstadoSolicitud
    }
  }


  public getValoresNuevoSolicitud() {
    return {
      CodigoSolicitud: this.CodigoSolicitud,
      Empresa: this.Empresa,
      EstadoSolicitud: this.EstadoSolicitud,
      TipoSolicitud: this.TipoSolicitud,
      UsuarioRegistroId: this.UsuarioRegistroId,
      FechaRegistro: this.FechaRegistro,
      GerenteSolicitanteId: this.GerenteSolicitanteId,
    }
  }

  public setValoresEditarSolicitud(
    GerenteSolicitanteId: number,
    EstadoSolicitud: string,
  ) {
    this.GerenteSolicitanteId = GerenteSolicitanteId;
    this.EstadoSolicitud = EstadoSolicitud;
  }

  public getValoresEditarSolicitud() {
    return {
      GerenteSolicitanteId: this.GerenteSolicitanteId,
      EstadoSolicitud: this.EstadoSolicitud,
    }
  }

  public setValoresEditarSolicitudDetalle(
    TipoSeguridad: string,
    FechaSeguridad: Date,
  ) {
    this.TipoSeguridad = TipoSeguridad;
    this.FechaSeguridad = FechaSeguridad;
  }

  public getValoresEditarSolicitudDetalle() {
    return {
      TipoSeguridad: this.TipoSeguridad,
      FechaSeguridad: this.FechaSeguridad,
    }
  }


  public getValoresNuevoSolicitudAIT() {
    return {
      SolicitudId: this.SolicitudId,
      NombreUsuario: this.NombreUsuario,
      AreaSolicitud: this.AreaSolicitud,
      SolicitudCargo: this.SolicitudCargo,
      SolicitudEmpresa: this.SolicitudEmpresa,
      SolicitudMotivo: this.SolicitudMotivo,
      GerenteSolicitanteId: this.GerenteSolicitanteId,
      EspecificarMotivoSolicitud: this.MotivoEspecificar,
      TipoPlataforma: this.TipoPlataforma,
      EspecificarPlataforma: this.PlataformaEspecificar,
      TipoAcceso: this.TipoAcceso,
      CuentaRenovar: this.CuentaRenovacion,
      TipoAmbiente: this.TipoAmbiente,
      TipoPerfil: this.TipoPerfil,
      TiempoAcceso: this.TiempoAcceso,
      FechaInicioAcceso: this.FechaInicioAcceso,
      FechaFinAcceso: this.FechaFinAcceso,
      Hostname: this.Hostname,
      NombreResponsable: this.NombreResponsable,
      EmpresaResponsable: this.EmpresaResponsable,
      CargoResponsable: this.CargoResponsable,
      CorreoResponsable: this.CorreoResponsable,
      UsuarioRegistroId: this.UsuarioRegistroId,
      FechaRegistro: this.FechaRegistro,
      TipoPersona: this.TipoPersona,

    }
  }

  public setValoresNuevoSolicitudAIT
    (
      NombreUsuario: string,
      SolicitudCargo: string,
      SolicitudEmpresa: string,
      SolicitudArea: string,
      GerenteSolicitanteId: number,
      SolicitudMotivo: string,
      MotivoEspecificar: string,
      TipoPlataforma: string,
      EspecificarPlataforma: string,
      TipoAcceso: string,
      CuentaRenovacion: string,
      TipoAmbiente: string,
      TipoPerfil: string,
      TiempoAcceso: string,
      FechaInicioAcceso: Date,
      FechaFinAcceso: Date,
      NombreResponsable: string,
      EmpresaResponsable: string,
      CargoResponsable: string,
      CorreoResponsable: string,
      UsuarioRegistroId: number,
      FechaRegistro: Date,
      SolicitudId: number,
      Hostname: string,
      TipoPersona: string,
  ) {
    this.NombreUsuario = NombreUsuario;
    this.SolicitudCargo = SolicitudCargo;
    this.SolicitudEmpresa = SolicitudEmpresa;
    this.AreaSolicitud = SolicitudArea;
    this.GerenteSolicitanteId = GerenteSolicitanteId;
    this.SolicitudMotivo = SolicitudMotivo;
    this.MotivoEspecificar = MotivoEspecificar;
    this.TipoPlataforma = TipoPlataforma;
    this.PlataformaEspecificar = EspecificarPlataforma;
    this.TipoAcceso = TipoAcceso;
    this.CuentaRenovacion = CuentaRenovacion;
    this.TipoAmbiente = TipoAmbiente;
    this.TipoPerfil = TipoPerfil;
    this.TiempoAcceso = TiempoAcceso;
    this.FechaInicioAcceso = FechaInicioAcceso;
    this.FechaFinAcceso = FechaFinAcceso;
    this.NombreResponsable = NombreResponsable;
    this.EmpresaResponsable = EmpresaResponsable;
    this.CargoResponsable = CargoResponsable;
    this.CorreoResponsable = CorreoResponsable;
    this.UsuarioRegistroId = UsuarioRegistroId;
    this.FechaRegistro = FechaRegistro;
    this.SolicitudId = SolicitudId;
    this.Hostname = Hostname;
    this.TipoPersona = TipoPersona;

  }



  public setValoresNuevoSolicitudVpn(
    CodigoEmpleado: string,
    NombreUsuario: string,
    SolicitudCargo: string,
    SolicitudEmpresa: string,
    SolicitudArea: string,
    SolicitudMotivo: string,
    TipoAcceso: string,
    Solicitud: number,
    UsuarioRegistroId: number,
    FechaRegistro: Date,
    GerenteSolicitanteId: number,
    Nombre2: string,
    Cargo2: string,
    Correo2: string,
    TipoMotivo: string,
    IpDestino2: string,
    IpInterna2: string,
    TipoPersona: string,
    CodigoEmpleado2: string,
    DNIEmpleado2: string,
    EmpresaEmpleado2: string,
    Nombre3: string,
    Celular3: string,
    Correo3: string,
    MarcaModeloVpn: string,
    IpPublica3: string,
    IpPrivada3: string,
    KeyConexion: string,
    FechaInicioAcceso: Date,
    FechaFinAcceso: Date,

  ) {
    this.SolicitudId = Solicitud;
    this.CodigoEmpleado = CodigoEmpleado;
    this.NombreUsuario = NombreUsuario;
    this.AreaSolicitud = SolicitudArea;
    this.SolicitudCargo = SolicitudCargo;
    this.SolicitudEmpresa = SolicitudEmpresa;
    this.SolicitudMotivo = SolicitudMotivo;
    this.TipoAcceso = TipoAcceso;
    this.UsuarioRegistroId = UsuarioRegistroId;
    this.FechaRegistro = FechaRegistro;
    this.GerenteSolicitanteId = GerenteSolicitanteId;
    this.Nombre2 = Nombre2;
    this.Correo2 = Correo2;
    this.Cargo2 = Cargo2;
    this.TipoMotivo = TipoMotivo;
    this.IpDestino2 = IpDestino2;
    this.IpInterna2 = IpInterna2;
    this.TipoPersona = TipoPersona;
    this.CodigoEmpleado2 = CodigoEmpleado2;
    this.DNIEmpleado2 = DNIEmpleado2;
    this.EmpresaEmpleado2 = EmpresaEmpleado2;
    this.Nombre3 = Nombre3;
    this.Celular3 = Celular3;
    this.Correo3 = Correo3;
    this.MarcaModeloVpn = MarcaModeloVpn;
    this.IpPublica3 = IpPublica3;
    this.IpPrivada3 = IpPrivada3;
    this.KeyConexion = KeyConexion;
    this.FechaInicioAcceso = FechaInicioAcceso;
    this.FechaFinAcceso = FechaFinAcceso;
  }

  public setValoresEditarSolicitudVpn(
    CodigoEmpleado: string,
    NombreUsuario: string,
    SolicitudCargo: string,
    SolicitudEmpresa: string,
    SolicitudArea: string,
    SolicitudMotivo: string,
    TipoAcceso: string,
    UsuarioRegistroId: number,
    FechaRegistro: Date,
    GerenteSolicitanteId: number,
    Nombre2: string,
    Cargo2: string,
    Correo2: string,
    TipoMotivo: string,
    IpDestino2: string,
    IpInterna2: string,
    TipoPersona: string,
    CodigoEmpleado2: string,
    DNIEmpleado2: string,
    EmpresaEmpleado2: string,
    Nombre3: string,
    Celular3: string,
    Correo3: string,
    MarcaModeloVpn: string,
    IpPublica3: string,
    IpPrivada3: string,
    KeyConexion: string,
    FechaInicioAcceso: Date,
    FechaFinAcceso: Date,

  ) {
    this.CodigoEmpleado = CodigoEmpleado;
    this.NombreUsuario = NombreUsuario;
    this.AreaSolicitud = SolicitudArea;
    this.SolicitudCargo = SolicitudCargo;
    this.SolicitudEmpresa = SolicitudEmpresa;
    this.SolicitudMotivo = SolicitudMotivo;
    this.TipoAcceso = TipoAcceso;
    this.UsuarioRegistroId = UsuarioRegistroId;
    this.FechaRegistro = FechaRegistro;
    this.GerenteSolicitanteId = GerenteSolicitanteId;
    this.Nombre2 = Nombre2;
    this.Correo2 = Correo2;
    this.Cargo2 = Cargo2;
    this.TipoMotivo = TipoMotivo;
    this.IpDestino2 = IpDestino2;
    this.IpInterna2 = IpInterna2;
    this.TipoPersona = TipoPersona;
    this.CodigoEmpleado2 = CodigoEmpleado2;
    this.DNIEmpleado2 = DNIEmpleado2;
    this.EmpresaEmpleado2 = EmpresaEmpleado2;
    this.Nombre3 = Nombre3;
    this.Celular3 = Celular3;
    this.Correo3 = Correo3;
    this.MarcaModeloVpn = MarcaModeloVpn;
    this.IpPublica3 = IpPublica3;
    this.IpPrivada3 = IpPrivada3;
    this.KeyConexion = KeyConexion;
    this.FechaInicioAcceso = FechaInicioAcceso;
    this.FechaFinAcceso = FechaFinAcceso;
  }




  public getValoresNuevoSolicitudVpn() {
    return {
      SolicitudId: this.SolicitudId,
      CodigoEmpleado: this.CodigoEmpleado,
      NombreUsuario: this.NombreUsuario,
      AreaSolicitud: this.AreaSolicitud,
      SolicitudCargo: this.SolicitudCargo,
      SolicitudEmpresa: this.SolicitudEmpresa,
      SolicitudMotivo: this.SolicitudMotivo,
      TipoAcceso: this.TipoAcceso,
      UsuarioRegistroId: this.UsuarioRegistroId,
      FechaRegistro: this.FechaRegistro,
      GerenteSolicitanteId: this.GerenteSolicitanteId,
      Nombre2: this.Nombre2,
      Cargo2: this.Cargo2,
      Correo2: this.Correo2,
      TipoMotivo: this.TipoMotivo,
      IpDestino2: this.IpDestino2,
      IpInterna2: this.IpInterna2,
      TipoPersona: this.TipoPersona,
      CodigoEmpleado2: this.CodigoEmpleado2,
      DNIEmpleado2: this.DNIEmpleado2,
      EmpresaEmpleado2: this.EmpresaEmpleado2,
      Nombre3: this.Nombre3,
      Celular3: this.Celular3,
      Correo3: this.Correo3,
      MarcaModeloVPN3: this.MarcaModeloVpn,
      IpPublica3: this.IpPublica3,
      IpPrivada3: this.IpPrivada3,
      KeyConexion3: this.KeyConexion,
      FechaInicioAcceso: this.FechaInicioAcceso,
      FechaFinAcceso: this.FechaFinAcceso,

    }
  }

  public getValoresEditarSolicitudVpn() {
    return {
      CodigoEmpleado: this.CodigoEmpleado,
      NombreUsuario: this.NombreUsuario,
      Solicitud_AreaId: this.SolicitudAreaId,
      SolicitudCargo: this.SolicitudCargo,
      SolicitudEmpresa: this.SolicitudEmpresa,
      SolicitudMotivo: this.SolicitudMotivo,
      TipoAcceso: this.TipoAcceso,
      UsuarioRegistroId: this.UsuarioRegistroId,
      FechaRegistro: this.FechaRegistro,
      GerenteSolicitanteId: this.GerenteSolicitanteId,
      Nombre2: this.Nombre2,
      Cargo2: this.Cargo2,
      Correo2: this.Correo2,
      TipoMotivo: this.TipoMotivo,
      IpDestino2: this.IpDestino2,
      IpInterna2: this.IpInterna2,
      TipoPersona: this.TipoPersona,
      CodigoEmpleado2: this.CodigoEmpleado2,
      DNIEmpleado2: this.DNIEmpleado2,
      EmpresaEmpleado2: this.EmpresaEmpleado2,
      Nombre3: this.Nombre3,
      Celular3: this.Celular3,
      Correo3: this.Correo3,
      MarcaModeloVPN3: this.MarcaModeloVpn,
      IpPublica3: this.IpPublica3,
      IpPrivada3: this.IpPrivada3,
      KeyConexion3: this.KeyConexion,
      FechaInicioAcceso: this.FechaInicioAcceso,
      FechaFinAcceso: this.FechaFinAcceso,

    }
  }

  public setValoresNuevoSolicitudExternosRedInterna(
    CodigoEmpleado: string,
    NombreUsuario: string,
    SolicitudCargo: string,
    SolicitudEmpresa: string,
    SolicitudArea: string,
    TipoAcceso: string,
    FechaInicioAcceso: Date,
    FechaFinAcceso: Date,
    Solicitud: number,
    UsuarioRegistroId: number,
    FechaRegistro: Date,
    GerenteSolicitanteId: number,
    TipoMotivo: string,
    Nombre2: string,
    Empresa2: string,
    Cargo2: string,
    Correo2: string,
    Hostname2: string,
    Especificar2: string,

  ) {
    this.SolicitudId = Solicitud;
    this.CodigoEmpleado = CodigoEmpleado;
    this.NombreUsuario = NombreUsuario;
    this.AreaSolicitud = SolicitudArea;
    this.SolicitudCargo = SolicitudCargo;
    this.SolicitudEmpresa = SolicitudEmpresa;
    this.TipoAcceso = TipoAcceso;
    this.FechaInicioAcceso = FechaInicioAcceso;
    this.FechaFinAcceso = FechaFinAcceso;
    this.UsuarioRegistroId = UsuarioRegistroId;
    this.FechaRegistro = FechaRegistro;
    this.GerenteSolicitanteId = GerenteSolicitanteId;
    this.Nombre2 = Nombre2;
    this.TipoMotivo = TipoMotivo;
    this.EmpresaEmpleado2 = Empresa2;
    this.Cargo2 = Cargo2;
    this.Correo2 = Correo2;
    this.Hostname = Hostname2;
    this.Especificar2 = Especificar2;


  }

  public getValoresNuevoSolicitudExternosRedInterna() {
    return {
      SolicitudId: this.SolicitudId,
      CodigoEmpleado: this.CodigoEmpleado,
      NombreUsuario: this.NombreUsuario,
      AreaSolicitud: this.AreaSolicitud,
      SolicitudCargo: this.SolicitudCargo,
      SolicitudEmpresa: this.SolicitudEmpresa,
      TipoAcceso: this.TipoAcceso,
      HostName2: this.Hostname,
      FechaInicioAcceso: this.FechaInicioAcceso,
      FechaFinAcceso: this.FechaFinAcceso,
      UsuarioRegistroId: this.UsuarioRegistroId,
      FechaRegistro: this.FechaRegistro,
      GerenteSolicitanteId: this.GerenteSolicitanteId,
      TipoMotivo: this.TipoMotivo,
      Nombre2: this.Nombre2,
      Cargo2: this.Cargo2,
      EmpresaEmpleado2: this.EmpresaEmpleado2,
      Correo2: this.Correo2,
      Especificar: this.Especificar2
    }
  }

  public setValoresNuevoSolicitudCuentaParaExternos(
    CodigoEmpleado: string,
    NombreUsuario: string,
    SolicitudCargo: string,
    SolicitudEmpresa: string,
    SolicitudArea: string,
    TipoAcceso: string,
    FechaInicioAcceso: Date,
    FechaFinAcceso: Date,
    Solicitud: number,
    UsuarioRegistroId: number,
    FechaRegistro: Date,
    GerenteSolicitanteId: number,
    TipoMotivo: string,
    Nombre2: string,
    Empresa2: string,
    Cargo2: string,
    Correo2: string,
    Especificar2: string,
    Nuevo: string,
    Renovacion: string

  ) {
    this.SolicitudId = Solicitud;
    this.CodigoEmpleado = CodigoEmpleado;
    this.NombreUsuario = NombreUsuario;
    this.AreaSolicitud = SolicitudArea;
    this.SolicitudCargo = SolicitudCargo;
    this.SolicitudEmpresa = SolicitudEmpresa;
    this.TipoAcceso = TipoAcceso;
    this.FechaInicioAcceso = FechaInicioAcceso;
    this.FechaFinAcceso = FechaFinAcceso;
    this.UsuarioRegistroId = UsuarioRegistroId;
    this.FechaRegistro = FechaRegistro;
    this.GerenteSolicitanteId = GerenteSolicitanteId;
    this.Nombre2 = Nombre2;
    this.TipoMotivo = TipoMotivo;
    this.EmpresaEmpleado2 = Empresa2;
    this.Cargo2 = Cargo2;
    this.Correo2 = Correo2;
    this.Especificar2 = Especificar2;
    this.Nuevo = Nuevo;
    this.Renovacion = Renovacion;
  }

  public getValoresNuevoSolicitudCuentaParaExternos() {
    return {
      SolicitudId: this.SolicitudId,
      CodigoEmpleado: this.CodigoEmpleado,
      NombreUsuario: this.NombreUsuario,
      AreaSolicitud: this.AreaSolicitud,
      SolicitudCargo: this.SolicitudCargo,
      SolicitudEmpresa: this.SolicitudEmpresa,
      TipoAcceso: this.TipoAcceso,
      FechaInicioAcceso: this.FechaInicioAcceso,
      FechaFinAcceso: this.FechaFinAcceso,
      UsuarioRegistroId: this.UsuarioRegistroId,
      FechaRegistro: this.FechaRegistro,
      GerenteSolicitanteId: this.GerenteSolicitanteId,
      TipoMotivo: this.TipoMotivo,
      Nombre2: this.Nombre2,
      Cargo2: this.Cargo2,
      EmpresaEmpleado2: this.EmpresaEmpleado2,
      Correo2: this.Correo2,
      NuevoAcceso: this.Nuevo,
      Renovacion: this.Renovacion,
      Especificar: this.Especificar2
    }
  }

  public setValoresNuevoSolicitudSap(
    CodigoEmpleado: string,
    NombreUsuario: string,
    SolicitudCargo: string,
    SolicitudEmpresa: string,
    SolicitudArea: string,
    TipoAcceso: string,
    Solicitud: number,
    UsuarioRegistroId: number,
    FechaRegistro: Date,
    GerenteSolicitanteId: number,
    SolicitudCorreo: string,
    TipoSistema: string,
    Cuenta: string,
    DatosBeneficiario: string,
    DNIBeneficiario: string,
    CargoBeneficiario: string


  ) {
    this.SolicitudId = Solicitud;
    this.CodigoEmpleado = CodigoEmpleado;
    this.NombreUsuario = NombreUsuario;
    this.AreaSolicitud = SolicitudArea;
    this.SolicitudCargo = SolicitudCargo;
    this.SolicitudEmpresa = SolicitudEmpresa;
    this.TipoAcceso = TipoAcceso;
    this.UsuarioRegistroId = UsuarioRegistroId;
    this.FechaRegistro = FechaRegistro;
    this.GerenteSolicitanteId = GerenteSolicitanteId;
    this.SolicitudCorreo = SolicitudCorreo;
    this.TipoSistema = TipoSistema;
    this.Cuenta = Cuenta;
    this.DatosBeneficiario = DatosBeneficiario;
    this.DNIBeneficiario = DNIBeneficiario;
    this.CargoBeneficiario = CargoBeneficiario;



  }

  public getValoresNuevoSolicitudSap() {
    return {
      SolicitudId: this.SolicitudId,
      CodigoEmpleado: this.CodigoEmpleado,
      NombreUsuario: this.NombreUsuario,
      AreaSolicitud: this.AreaSolicitud,
      SolicitudCargo: this.SolicitudCargo,
      SolicitudEmpresa: this.SolicitudEmpresa,
      TipoAcceso: this.TipoAcceso,
      UsuarioRegistroId: this.UsuarioRegistroId,
      FechaRegistro: this.FechaRegistro,
      GerenteSolicitanteId: this.GerenteSolicitanteId,
      TipoSistema: this.TipoSistema,
      Cuenta: this.Cuenta,
      SolicitudCorreo: this.SolicitudCorreo,
      DatosBeneficiario: this.DatosBeneficiario,
      DNIBeneficiario: this.DNIBeneficiario,
      CargoBeneficiario: this.CargoBeneficiario,

    }
  }



}
