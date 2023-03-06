import * as moment from "moment";
import Usuario from "../models/Base/Usuario";
import Util from "src/genericos/Util";
import Lookup from "src/models/Base/Lookup";
import { Grupo } from '../models/Base/Grupo';

export default class ParseJsom {
  public static parsearBooleano(
    elemento: SP.ListItem,
    nombreColumna: string
  ): boolean {
    const valor = elemento.get_item(nombreColumna);

    if (valor || valor === 1) {
      return true;
    }
    return false;
  }

  public static parsearTermino(elemento: SP.ListItem, nombreColumna: string) {
    const valor = elemento.get_item(nombreColumna);

    if (valor == null) {
      return;
    }

    return { label: valor.get_label(), guid: valor.get_termGuid() };
  }

  public static parsearLookup(
    elemento: SP.ListItem,
    nombreColumna: string
  ): Lookup {
    const valor = elemento.get_item(nombreColumna);
    const lookup = new Lookup();

    if (valor == null) {
      return lookup;
    }
    lookup.ID = valor.get_lookupId();
    lookup.Title = valor.get_lookupValue();

    return lookup;
  }

  public static parsearLookupMultiple(
    elemento: SP.ListItem,
    nombreColumna: string
  ): Lookup[] {
    const valor = elemento.get_item(nombreColumna);
    const lista: Lookup[] = [];

    if (valor == null) {
      return lista;
    }

    valor.forEach((element: any) => {
      const lookup = new Lookup();
      lookup.ID = element.get_lookupId();
      lookup.Title = element.get_lookupValue();
      lista.push(lookup);
    });

    return lista;
  }

  public static parsearLookupValue(
    elemento: SP.ListItem,
    nombreColumna: string
  ) {
    const valor = elemento.get_item(nombreColumna);
    return valor == null ? "" : valor.get_lookupValue();
  }

  public static parsearLookupId(elemento: SP.ListItem, nombreColumna: string) {
    const valor = elemento.get_item(nombreColumna);
    return valor == null ? "" : valor.get_lookupId();
  }

  public static parsearStringMultiple(
    elemento: SP.ListItem,
    nombreColumna: string
  ): string[] {
    const valor = elemento.get_item(nombreColumna);
    const lista: string[] = [];

    if (valor == null) {
      return lista;
    }

    valor.forEach((element: any) => {
      lista.push(element);
    });

    return lista;
  }

  public static parsearGrupo(
    elemento: SP.ListItem,
    nombreColumna: string
  ): Grupo {
    const valor = elemento.get_item(nombreColumna);
    const lookup = new Grupo();

    if (valor == null) {
      return lookup;
    }
    lookup.ID = valor.get_lookupId();
    lookup.Title = valor.get_lookupValue();

    return lookup;
  }

  public static parsearUsuario(
    elemento: SP.ListItem,
    nombreColumna: string
  ): Usuario {
    const user = { ID: 0, Title: "", Email: "" } as Usuario;
    const objeto = elemento.get_item(nombreColumna);

    if (typeof objeto !== "undefined" && objeto !== null && objeto !== "") {
      user.ID = objeto.get_lookupId();
      user.Title = objeto.get_lookupValue();
      user.Email = objeto.get_email();
      return user;
    } else {
      return user;
    }
  }

  public static parsearUsuarioMultiple(
    elemento: SP.ListItem,
    nombreColumna: string
  ): Usuario[] {
    const lstuser: Usuario[] = [];

    const objeto = elemento.get_item(nombreColumna);

    if (objeto == null) {
      return lstuser;
    }

    objeto.forEach((element: any) => {
      const user = { ID: 0, Title: "", Email: "" } as Usuario;
      user.ID = element.$1w_1;
      user.Title = element.$63_1;
      user.Email = element.$7_2;
      lstuser.push(user);
    });

    return lstuser;

  }

  public static parsearIdPersona(elemento: SP.ListItem, nombreColumna: string) {
    const valor = elemento.get_item(nombreColumna);
    return valor == null ? "" : valor.get_lookupId();
  }

  public static parsearEmailPersona(
    elemento: SP.ListItem,
    nombreColumna: string
  ) {
    const valor = elemento.get_item(nombreColumna);
    return valor == null ? "" : valor.get_email();
  }

  public static parsearNumber(elemento: SP.ListItem, nombreColumna: string): number {
    const valor = elemento.get_item(nombreColumna);
    return valor == null ? 0 : parseInt(valor, 10);
  }

  public static parsearString(elemento: SP.ListItem, nombreColumna: string) {
    const valor = elemento.get_item(nombreColumna);
    return valor == null ? "" : valor;
  }


  public static parsearFecha(elemento: SP.ListItem, nombreColumna: string) {
    const valor = elemento.get_item(nombreColumna);
    return valor == null ? null : valor;
  }

  public static parsearFechaString(
    elemento: SP.ListItem,
    nombreColumna: string
  ) {
    const valor = elemento.get_item(nombreColumna);

    if (Util.esNullOUndefined(valor)) {
      return "";
    }
    return moment(valor).format("DD/MM/YYYY HH:mm");
  }

  public static parsearFechaStringSoloFecha(
    elemento: SP.ListItem,
    nombreColumna: string
  ) {
    const valor = elemento.get_item(nombreColumna);

    if (Util.esNullOUndefined(valor)) {
      return "";
    }
    return moment(valor).format("DD/MM/YYYY");
  }
}
