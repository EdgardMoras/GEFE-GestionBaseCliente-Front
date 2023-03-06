
export default class ECalificacionesIncidentes {

  public static getValoresCalificacionesIncidentes(
    Nombre: string,
    Orden: string,
    Estado: string,
  ) {
    return {
      Title: Nombre,
      NombreEvaluacion: Nombre,
      OrdenEvaluacion: Orden,
      EstadoElemento: Estado,
      
    }
  }
}
