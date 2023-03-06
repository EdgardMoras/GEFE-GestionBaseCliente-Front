import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import Util from "src/genericos/Util";
import { EBaseEntidad } from "../models/Base/EBaseEntidad";
import Usuario from "../models/Base/Usuario";
import { Grupo } from "../models/Base/Grupo";
import EReporte from 'src/models/fisicas/EReporte';

export class RestFiltros {
  public static obtenerFiltroPorGrupo(): string {
    const valorFilter = `${
      "GrupoAprobador"
      } eq ${
      "AppAsarti-GerenteSolicitante"
      }`;

    return valorFilter;
  }

  public static obtenerFiltroPorEstadoActivo(): string {
    const valorFilter = `${
      ParametrosNoAdministrables.ColumnasSitio.EstadoElemento
      } eq ${
      ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo
      }`;

    return valorFilter;
  }

  public static obtenerFiltroPorEstadoActivo2(): string {
    const valorFilter = `Habilitado eq 1`;
    return valorFilter;
  }

  public static obtenerFiltroPorTituloYEstadoActivo(titulo: string, modulo: string): string {
    const valorFilter = `${
      "TipoCorreo"
      } eq '${titulo}' and ${
      "ModuloCorreo"
      } eq '${modulo}' and ${this.obtenerFiltroPorEstadoActivo()}`;

    return valorFilter;
  }

  public static obtenerFiltroPorIdYEstadoActivo(id: number): string {
    const valorFilter = `${
      ParametrosNoAdministrables.ColumnasSitio.ID
      } eq ${id} and ${this.obtenerFiltroPorEstadoActivo()}`;

    return valorFilter;
  }

  public static obtenerFiltroPorLookupIdYEstadoActivo(
    nombreColumnaLookup: string,
    id: number
  ): string {
    const valorFilter = `${nombreColumnaLookup}/${
      ParametrosNoAdministrables.ColumnasSitio.ID
      } eq ${id} and ${this.obtenerFiltroPorEstadoActivo()}`;

    return valorFilter;
  }

  public static obtenerFieldExpandUsuario(nombreColumnaExpand: string) {
    return `${nombreColumnaExpand}/${
      ParametrosNoAdministrables.ColumnasSitio.ID
      },${nombreColumnaExpand}/${
      ParametrosNoAdministrables.ColumnasSitio.Title
      },${nombreColumnaExpand}/EMail`;
  }

  public static obtenerFieldExpandGrupo(nombreColumnaExpand: string) {
    return `${nombreColumnaExpand}/${
      ParametrosNoAdministrables.ColumnasSitio.ID
      },${nombreColumnaExpand}/${ParametrosNoAdministrables.ColumnasSitio.Title}`;
  }

  public static obtenerFieldExpandLookup(nombreColumnaExpand: string) {
    return `${nombreColumnaExpand}/${
      ParametrosNoAdministrables.ColumnasSitio.ID
      },${nombreColumnaExpand}/${ParametrosNoAdministrables.ColumnasSitio.Title}`;
  }
  public static obtenerFieldExpandLookuptest(nombreColumnaExpand: string) {
    return `${nombreColumnaExpand}/${
      ParametrosNoAdministrables.ColumnasSitio.ID
      },${nombreColumnaExpand}/${ParametrosNoAdministrables.ColumnasSitio.Codigo},${nombreColumnaExpand}/${ParametrosNoAdministrables.ColumnasSitio.Title}`;
  }
  public static obtenerFieldExpandLookup2(nombreColumnaExpand: string) {
    return `${nombreColumnaExpand}/${
      ParametrosNoAdministrables.ColumnasSitio.ID
      },${nombreColumnaExpand}/${ParametrosNoAdministrables.ColumnasSitio.Codigo}`;
  }

  public static parsearTexto(elemento: any, nombreColumna: string): string {
    const valor = elemento[nombreColumna];

    if (Util.esNullOUndefined(valor)) {
      return "";
    }

    return valor;
  }

  public static parsearNumero(elemento: any, nombreColumna: string): number {
    let valor = elemento[nombreColumna];

    if (Util.esNullOUndefined(valor)) {
      return 0;
    }

    valor = parseInt(valor, 10);

    return valor;
  }

  public static parsearFecha(elemento: SP.ListItem, nombreColumna: string) {
    const valor = elemento.get_item(nombreColumna);
    return valor == null ? null : valor;
  }

  public static parsearNumeroDecimal(
    elemento: any,
    nombreColumna: string
  ): number {
    const valor = elemento[nombreColumna];

    if (Util.esNullOUndefined(valor)) {
      return 0;
    }

    return parseFloat(valor);
  }

  public static parsearBooleano(elemento: any, nombreColumna: string): boolean {
    const valor = elemento[nombreColumna];

    if (Util.esNullOUndefined(valor)) {
      return false;
    }

    return valor;
  }

  public static parsearLookup<T extends EBaseEntidad>(
    elemento: any,
    nombreColumna: string,
    objeto: new () => T
  ): T {
    const valor = elemento[nombreColumna];
    const resultado = new objeto();

    if (Util.esNullOUndefined(valor)) {
      return resultado;
    }

    if (valor.ID === 0) {
      return resultado;
    }

    resultado.setearValoresConRest(valor);

    return resultado;
  }

  public static parsearLookupMultiple<T extends EBaseEntidad>(
    elemento: any,
    nombreColumna: string,
    objeto: new () => T
  ): T[] {
    const valor = elemento[nombreColumna];
    const lista: T[] = [];

    if (Util.esNullOUndefined(valor)) {
      return lista;
    }

    valor.forEach((elementoLookup: any) => {
      if (elementoLookup.ID > 0) {
        const resultado = new objeto();
        resultado.setearValoresConRest(elementoLookup);
        lista.push(resultado);
      }
    });

    return lista;
  }

  public static parsearLookupMultipleReporte<T extends EBaseEntidad>(
    elemento: any,
    nombreColumna: string
  ): EReporte[] {
    const valor = elemento[nombreColumna];
    const lista: EReporte[] = [];

    if (Util.esNullOUndefined(valor)) {
      return lista;
    }

    valor.forEach((elementoLookup: any) => {
      if (elementoLookup.ID > 0) {
        const resultado = new EReporte();
        resultado.setearValoresRest(elementoLookup);
        lista.push(resultado);
      }
    });

    return lista;
  }

  public static parsearLookupMultipleTest<T extends EBaseEntidad>(
    elemento: any,
    nombreColumna: string,
    objeto: new () => T
  ): T[] {
    const valor = elemento[nombreColumna];
    const lista: T[] = [];

    if (Util.esNullOUndefined(valor)) {
      return lista;
    }

    valor.forEach((elementoLookup: any) => {
      if (elementoLookup.ID > 0) {
        const resultado = new objeto();
        resultado.setearValoresConRest(elementoLookup);
        lista.push(resultado);
      }
    });

    return lista;
  }

  public static parsearUsuario(elemento: any, nombreColumna: string): Usuario {
    const valor = elemento[nombreColumna];
    const resultado = new Usuario();

    if (Util.esNullOUndefined(valor)) {
      return resultado;
    }

    resultado.setearValoresConRest(valor);

    return resultado;
  }

  public static parsearGrupo(elemento: any, nombreColumna: string): Grupo {
    const valor = elemento[nombreColumna];
    const resultado = new Grupo();

    if (Util.esNullOUndefined(valor)) {
      return resultado;
    }

    resultado.setearValoresConRest(valor);

    return resultado;
  }

  public static parsearUsuarios(
    elemento: any,
    nombreColumna: string
  ): Usuario[] {
    const valor = elemento[nombreColumna];
    const resultado: Usuario[] = [];

    if (valor) {
      valor.forEach((elementoUsuario: any) => {
        const usuario = new Usuario();
        usuario.setearValoresConRest(elementoUsuario);
        resultado.push(usuario);
      });
    }

    return resultado;
  }
}
