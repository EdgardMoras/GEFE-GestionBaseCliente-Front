import ENotaExpediente from '../fisicas/ENotaExpediente';

export default class ENotaExpedienteOperacion {

  public nota: ENotaExpediente;
  public esEditado: boolean;

  constructor(nota: ENotaExpediente) {
    this.nota = nota;
    this.esEditado = false;
  }
}
