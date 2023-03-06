import Util from "src/genericos/Util";

export default class ColumnaTablaResultados {
  public NombreColumna: string;
  public NombreInternoColumna: string;
  public TipoOrdenamiento: number | undefined = 0;

  constructor(
    nombre: string,
    nombreInterno: string,
    esOrdenadoAscendente?: number
  ) {
    this.NombreColumna = nombre;
    this.NombreInternoColumna = nombreInterno;

    if (Util.esNullOUndefined(esOrdenadoAscendente)) {
      this.TipoOrdenamiento = 0;
    } else {
      this.TipoOrdenamiento = esOrdenadoAscendente;
    }
  }

  public ColumnaTablaResultados() {
    this.NombreColumna = "";
    this.NombreInternoColumna = "";
    this.TipoOrdenamiento = 0;
  }
}
