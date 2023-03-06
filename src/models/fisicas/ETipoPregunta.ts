import Util from "src/genericos/Util";

export default class ETipoPregunta {
  public ID: number;
  public Title: string;
  public AplicaTextoMenorMayor: boolean;
  public TextoMenorValor: string;
  public TextoMayorValor: string;

  constructor() {
    this.ID = 0;
    this.Title = "";
    this.AplicaTextoMenorMayor = false;
    this.TextoMenorValor = "";
    this.TextoMayorValor = "";
  }

  public obtenerDatos(elementoItemLista: any) {
    this.ID = Util.ObtenerEntero(elementoItemLista.ID);
    this.Title = Util.ObtenerTexto(elementoItemLista.Title);
    this.AplicaTextoMenorMayor = Util.ObtenerBoolean(
      elementoItemLista.AplicaTextoMenorMayor
    );
    this.TextoMenorValor = Util.ObtenerTexto(elementoItemLista.TextoMenorValor);
    this.TextoMayorValor = Util.ObtenerTexto(elementoItemLista.TextoMayorValor);
  }
}
