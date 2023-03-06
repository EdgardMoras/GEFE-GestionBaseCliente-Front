export class ResultadoJsom {
  public iterador: IEnumerator<SP.ListItem>;
  public posicion: SP.ListItemCollectionPosition;

  constructor(
    iterador: IEnumerator<SP.ListItem>,
    posicion: SP.ListItemCollectionPosition
  ) {
    this.iterador = iterador;
    this.posicion = posicion;
  }
}
