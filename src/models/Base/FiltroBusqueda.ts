import Util from "src/genericos/Util";

export enum TipoFiltro {
  Contiene = 1,
  ContieneIdLookupMultiple = 8,
  EsNulo = 2,
  EsIgualTexto = 3,
  EsIgualBoolean = 10,
  EsIgualIdUsuario = 4,
  esMayorIgualAFecha = 5,
  esMenorIgualAFecha = 6,
  esIgualLookupId = 7,
  NoEsIgualTexto = 9,
}

export default class FiltroBusqueda {
  public NombreInternoColumna: string;
  public NombreInternoColumnas: string[];
  public Valor?: string;
  public Valores?: any[];
  public Tipo: TipoFiltro;

  constructor(Tipo: TipoFiltro, NombreInternoColumna: string, Valor?: any, Valores?: any[]) {
    this.Tipo = Tipo;
    this.NombreInternoColumna = NombreInternoColumna;

    if (Util.esNullOUndefined(Valor)) {
      this.Valor = "";
    } else {
      this.Valor = Valor;
    }

    this.Valores = Valores;
  }

  public setearNombreInternoColumnas(NombreInternoColumnas: string[], Valor: any) {
    this.Tipo = TipoFiltro.Contiene;
    this.NombreInternoColumnas = NombreInternoColumnas;

    if (Util.esNullOUndefined(Valor)) {
      this.Valor = "";
    } else {
      this.Valor = Valor;
    }
  }

  public getFiltro(): string {
    let filtro: string = "";
    if (this.Tipo === TipoFiltro.Contiene) {
      if (this.Valores) {
        if (this.Valores.length > 0) {
          filtro = `<Contains><FieldRef Name='${this.NombreInternoColumna}' /><Value Type='Text'>${this.Valores[0]}</Value></Contains>`;

          if (this.Valores.length > 1) {
            filtro = `<Or>${filtro}`;
            filtro += `<Contains><FieldRef Name='${this.NombreInternoColumna}' /><Value Type='Text'>${this.Valores[1]}</Value></Contains>`;
            filtro += `</Or>`;
          }

          this.Valores.forEach((elemento: any, indice) => {
            if (indice > 1) {
              filtro = `<Or><Contains><FieldRef Name='${this.NombreInternoColumna}' /><Value Type='Text'>${elemento}</Value></Contains>${filtro}</Or>`;
            }
          })
        }
      }
      else {
        if (this.NombreInternoColumnas) {
          if (this.NombreInternoColumnas.length > 0) {
            filtro = `<Contains><FieldRef Name='${this.NombreInternoColumnas[0]}' /><Value Type='Text'>${this.Valor}</Value></Contains>`;

            if (this.NombreInternoColumnas.length > 1) {
              filtro = `<Or>${filtro}`;
              filtro += `<Contains><FieldRef Name='${this.NombreInternoColumnas[1]}' /><Value Type='Text'>${this.Valor}</Value></Contains>`;
              filtro += `</Or>`;
            }

            this.NombreInternoColumnas.forEach((elemento: any, indice) => {
              if (indice > 1) {
                filtro = `<Or><Contains><FieldRef Name='${this.NombreInternoColumnas[indice]}' /><Value Type='Text'>${this.Valor}</Value></Contains>${filtro}</Or>`;
              }
            })
          }
        }
        else {
          filtro = `<Contains><FieldRef Name='${
            this.NombreInternoColumna
            }' /><Value Type='Text'>${this.Valor}</Value></Contains>`;
        }
      }
    } else if (this.Tipo === TipoFiltro.ContieneIdLookupMultiple) {
      if (this.Valores) {
        if (this.Valores.length > 0) {
          filtro = `<Contains><FieldRef Name='${this.NombreInternoColumna}' LookupId='TRUE'/><Value Type='LookupMulti'>${this.Valores[0]}</Value></Contains>`;

          if (this.Valores.length > 1) {
            filtro = `<Or>${filtro}`;
            filtro += `<Contains><FieldRef Name='${this.NombreInternoColumna}' LookupId='TRUE'/><Value Type='LookupMulti'>${this.Valores[1]}</Value></Contains>`;
            filtro += `</Or>`;
          }

          this.Valores.forEach((elemento: any, indice) => {
            if (indice > 1) {
              filtro = `<Or><Contains><FieldRef Name='${this.NombreInternoColumna}' LookupId='TRUE'/><Value Type='LookupMulti'>${elemento}</Value></Contains>${filtro}</Or>`;
            }
          })
        }
      }
      else {
        filtro = `<Contains><FieldRef Name='${this.NombreInternoColumna}' LookupId='TRUE'/><Value Type='LookupMulti'>${this.Valor}</Value></Contains>`;
      }
    }
    else if (this.Tipo === TipoFiltro.EsNulo) {
      filtro = `<IsNull><FieldRef Name='${
        this.NombreInternoColumna
        }' /></IsNull>`;
    } else if (this.Tipo === TipoFiltro.EsIgualTexto) {
      if (this.Valores) {
        if (this.Valores.length > 0) {
          filtro = `<Eq><FieldRef Name='${this.NombreInternoColumna}' /><Value Type='Text'>${this.Valores[0]}</Value></Eq>`;

          if (this.Valores.length > 1) {
            filtro = `<Or>${filtro}`;
            filtro += `<Eq><FieldRef Name='${this.NombreInternoColumna}' /><Value Type='Text'>${this.Valores[1]}</Value></Eq>`;
            filtro += `</Or>`;
          }

          this.Valores.forEach((elemento: any, indice) => {
            if (indice > 1) {
              filtro = `<Or><Eq><FieldRef Name='${
                this.NombreInternoColumna
                }' /><Value Type='Text'>${elemento}</Value></Eq>${filtro}</Or>`;
            }
          })
        }
      }
      else {
        filtro = `<Eq><FieldRef Name='${
          this.NombreInternoColumna
          }' /><Value Type='Text'>${this.Valor}</Value></Eq>`;
      }
    } else if (this.Tipo === TipoFiltro.NoEsIgualTexto) {
      filtro = `<Neq><FieldRef Name='${
        this.NombreInternoColumna
        }' /><Value Type='Text'>${this.Valor}</Value></Neq>`;
    } else if (this.Tipo === TipoFiltro.EsIgualBoolean) {
        filtro = `<Eq><FieldRef Name='${
          this.NombreInternoColumna
          }' /><Value Type='Boolean'>${this.Valor}</Value></Eq>`;
    } else if (this.Tipo === TipoFiltro.EsIgualIdUsuario) {
      if (this.Valores) {
        if (this.Valores.length > 0) {
          filtro = `<Eq><FieldRef Name='${this.NombreInternoColumna}' LookupId='True' /><Value Type='Lookup'>${this.Valores[0]}</Value></Eq>`;

          if (this.Valores.length > 1) {
            filtro = `<Or>${filtro}`;
            filtro += `<Eq><FieldRef Name='${this.NombreInternoColumna}' LookupId='True' /><Value Type='Lookup'>${this.Valores[1]}</Value></Eq>`;
            filtro += `</Or>`;
          }

          this.Valores.forEach((elemento: any, indice) => {
            if (indice > 1) {
              filtro = `<Or><Eq><FieldRef Name='${
                this.NombreInternoColumna
                }' LookupId='True' /><Value Type='Lookup'>${elemento}</Value></Eq>${filtro}</Or>`;
            }
          })
        }
      }
      else {
        filtro = `<Eq><FieldRef Name='${
          this.NombreInternoColumna
          }' LookupId='True' /><Value Type='Lookup'>${this.Valor}</Value></Eq>`;
      }
    } else if (this.Tipo === TipoFiltro.esIgualLookupId) {
      if (this.Valores) {
        if (this.Valores.length > 0) {
          filtro = `<Eq><FieldRef Name='${this.NombreInternoColumna}' LookupId='True' /><Value Type='Lookup'>${this.Valores[0]}</Value></Eq>`;

          if (this.Valores.length > 1) {
            filtro = `<Or>${filtro}`;
            filtro += `<Eq><FieldRef Name='${this.NombreInternoColumna}' LookupId='True' /><Value Type='Lookup'>${this.Valores[1]}</Value></Eq>`;
            filtro += `</Or>`;
          }

          this.Valores.forEach((elemento: any, indice) => {
            if (indice > 1) {
              filtro = `<Or><Eq><FieldRef Name='${
                this.NombreInternoColumna
                }' LookupId='True' /><Value Type='Lookup'>${elemento}</Value></Eq>${filtro}</Or>`;
            }
          })
        }
      }
      else {
        filtro = `<Eq><FieldRef Name='${
          this.NombreInternoColumna
          }' LookupId='True' /><Value Type='Lookup'>${this.Valor}</Value></Eq>`;
      }
    } else if (this.Tipo === TipoFiltro.esMayorIgualAFecha) {
      filtro = `<Geq><FieldRef Name='${
        this.NombreInternoColumna
        }' /><Value Type='DateTime'>${Util.ObtenerDateFechaHoraInicioQueryCamlReactControl(
          this.Valor
        )}</Value></Geq>`;
    } else if (this.Tipo === TipoFiltro.esMenorIgualAFecha) {
      filtro = `<Leq><FieldRef Name='${
        this.NombreInternoColumna
        }' /><Value Type='DateTime'>${Util.ObtenerDateFechaHoraInicioQueryCamlReactControl(
          this.Valor
        )}</Value></Leq>`;
    }

    return filtro;
  }
}
