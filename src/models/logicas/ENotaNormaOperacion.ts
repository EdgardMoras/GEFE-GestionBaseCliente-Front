import ENotaNorma from '../fisicas/ENotaNorma';

export default class ENotaNormaOperacion {

  public nota: ENotaNorma;
  public esEditado: boolean;

  constructor(nota: ENotaNorma) {
    this.nota = nota;
    this.esEditado = false;
  }
}
