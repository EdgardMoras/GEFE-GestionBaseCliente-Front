import { ParametrosNoAdministrables } from '../../genericos/VariablesGlobales';

export default class EPlanAccionNormaLogico {

  public static getValoresNuevo(
    codigo: string,
    detalle: string,
    fechaLimite: Date,
    normaId: number,
    obligacionId: number,
    responsableId: number,
    responsableAuxiliarId: number,
    usuarioRegistroId: number,
    estadoPlanAccionNorma: string
  ) {
    if(responsableAuxiliarId === 0){
      return {
        Codigo: codigo,
        Detalle: detalle,
        EstadoPlanAccionNorma: estadoPlanAccionNorma,
        FechaAtencion: null,
        FechaLimite: fechaLimite,
        NormaId: normaId,
        ObligacionId: obligacionId,
        ResponsableId: responsableId,
        EstadoElemento: ParametrosNoAdministrables.ValoresEstadosElemento.Activo,
        FechaRegistro: new Date(),
        UsuarioRegistroId: usuarioRegistroId
      }
    }
    return {
      Codigo: codigo,
      Detalle: detalle,
      EstadoPlanAccionNorma: ParametrosNoAdministrables.ModuloNormas.ValoresPlanesAccion.Registrado,
      FechaAtencion: null,
      FechaLimite: fechaLimite,
      NormaId: normaId,
      ObligacionId: obligacionId,
      ResponsableId: responsableId,
      ResponsableAuxiliarId: responsableAuxiliarId,
      EstadoElemento: ParametrosNoAdministrables.ValoresEstadosElemento.Activo,
      FechaRegistro: new Date(),
      UsuarioRegistroId: usuarioRegistroId
    }
  }

  public static getValoresEditar(
    detalle: string,
    fechaLimite: Date,
    responsableId: number,
    responsableAuxiliarId: number,
  ) {
    if(responsableAuxiliarId > 0){
      return {
        Detalle: detalle,
        FechaLimite: fechaLimite,
        ResponsableId: responsableId,
        ResponsableAuxiliarId: responsableAuxiliarId,
      }
    }else{
      return {
        Detalle: detalle,
        FechaLimite: fechaLimite,
        ResponsableId: responsableId,
      }
    }    
  }

  public static getCambioEstadoEnAmpliacion() {
    return {
      EstadoPlanAccionNorma: ParametrosNoAdministrables.ModuloNormas.ValoresPlanesAccion.EnAmpliacion,
    }
  }

  public static getCambioEstadoEnProceso() {
    return {
      EstadoPlanAccionNorma: ParametrosNoAdministrables.ModuloNormas.ValoresPlanesAccion.EnProceso,
    }
  }

  public static getCambioEstadoEnProcesoAprobadaAmpliacion(nuevaFechaLimite: Date) {
    return {
      EstadoPlanAccionNorma: ParametrosNoAdministrables.ModuloNormas.ValoresPlanesAccion.EnProceso,
      FechaLimite: nuevaFechaLimite,
    }
  }

  public static getCambioEstadoPorVerificar() {
    return {
      EstadoPlanAccionNorma: ParametrosNoAdministrables.ModuloNormas.ValoresPlanesAccion.PorVerificar,
    }
  }

  public static getCambioEstadoImplementada() {
    return {
      EstadoPlanAccionNorma: ParametrosNoAdministrables.ModuloNormas.ValoresPlanesAccion.Implementada,
      FechaAtencion: new Date(),
    }
  }

}
