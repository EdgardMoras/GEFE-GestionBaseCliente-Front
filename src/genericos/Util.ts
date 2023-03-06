import Lookup from "../models/Base/Lookup";
import Usuario from "src/models/Base/Usuario";
import EElementoPeoplePicker from "src/models/logicas/EElementoPeoplePicker";
import ELookupMultiple from "src/models/logicas/ELookupMultiple";
import { ParametrosNoAdministrables } from "./VariablesGlobales";
import EFeriado from "src/models/fisicas/EFeriado";

export default class Util {
  public static esNullOUndefined(valor: any) {
    return typeof valor === "undefined" || valor === null;
  }

  public static esNullOUndefinedOEmpty(valor: any) {
    return typeof valor === "undefined" || valor === null || valor === "";
  }

  public static comboSinSeleccion(valor: any) {
    return typeof valor === null || valor.ID === 0;
  }

  public static validarValor(valor: any): string {
    if (this.esNullOUndefined(valor)) {
      return "";
    }
    return valor;
  }

  public static esDeselect(valor: any) {
    return valor === 0;
  }

  public static ObtenerTexto(texto: any): string {
    let valor = "";
    if (typeof texto !== "undefined" && texto !== null && texto !== "") {
      valor = texto;
      return valor;
    } else {
      return valor;
    }
  }

  public static ObtenerBoolean(texto: any): boolean {
    let valor = false;
    if (typeof texto !== "undefined" && texto !== null && texto !== "") {
      valor = texto === "Sí" ? true : false;
      return valor;
    } else {
      return valor;
    }
  }

  public static ObtenerEntero(texto: any): number {
    let valor = 0;
    if (typeof texto !== "undefined" && texto !== null) {
      valor = parseInt(texto, 10);
      return valor;
    } else {
      return valor;
    }
  }

  public static ObtenerLookup(objeto: any): Lookup {
    const lookup = new Lookup();
    if (typeof objeto !== "undefined" && objeto !== null && objeto !== "") {
      lookup.ID = objeto[0].lookupId;
      lookup.Title = objeto[0].lookupValue;
      return lookup;
    } else {
      return lookup;
    }
  }

  public static ObtenerNumberMultiple(objeto: any): number[] {
    const listaNumber: number[] = [];
    if (typeof objeto !== "undefined" && objeto !== null && objeto.length > 0) {
      for (const obj of objeto) {
        const id: number = parseInt(obj.lookupId, 10);
        listaNumber.push(id);
      }
    }
    return listaNumber;
  }

  public static ObtenerLookupMultiple(objeto: any): Lookup[] {
    const listaLookup: Lookup[] = [];
    if (typeof objeto !== "undefined" && objeto !== null && objeto.length > 0) {
      for (const obj of objeto) {
        const lookup = new Lookup();
        lookup.ID = obj.lookupId;
        lookup.Title = obj.lookupValue;
        listaLookup.push(lookup);
      }
    }
    return listaLookup;
  }

  public static ObtenerPeoplePicker(objeto: any): EElementoPeoplePicker {
    const IdElaborador = parseInt(objeto[0].id, 10);
    const usuarioPeoplePicker = new EElementoPeoplePicker(true, IdElaborador, objeto[0].title, objeto[0].email);

    return usuarioPeoplePicker;
  }

  public static ObtenerUsuario(objeto: any): Usuario {
    const user = new Usuario();
    if (typeof objeto !== "undefined" && objeto !== null && objeto !== "") {
      user.ID = objeto[0].id;
      user.Title = objeto[0].title;
      user.Email = objeto[0].email;
      return user;
    } else {
      return user;
    }
  }

  public static ObtenerUsuarioMultiple(objeto: any): Usuario[] {
    const usuarios: Usuario[] = [];
    if (typeof objeto !== "undefined" && objeto !== null && objeto !== "") {
      for (const obj of objeto) {
        const user = new Usuario();
        user.ID = obj.id;
        user.Title = obj.title;
        user.Email = obj.email;

        usuarios.push(user);
      }
      return usuarios;
    } else {
      return usuarios;
    }
  }

  public static ObtenerUsuarioMultipleString(objeto: any): string {
    let usuarios = "";
    if (typeof objeto !== "undefined" && objeto !== null && objeto !== "") {
      for (const obj of objeto) {
        if (usuarios.length > 0) {
          usuarios += "; ";
        }
        usuarios += obj.title;
      }
      return usuarios;
    } else {
      return usuarios;
    }
  }

  public static ObtenerPuntaje(objeto: any): number {
    let puntaje = 0;
    if (typeof objeto !== "undefined" && objeto !== null && objeto !== "") {
      /*for (const obj of objeto.split(";")) {
        puntaje += this.ObtenerEntero(obj);
      }*/
      for (const obj of objeto) {
        puntaje += this.ObtenerEntero(obj.lookupValue);
      }
      return puntaje;
    } else {
      return puntaje;
    }
  }

  public static ViewFields(fields: string[]) {
    let viewFields: string = "";

    fields.forEach(ent => {
      viewFields = viewFields + '<FieldRef Name = "' + ent + '" />';
    });
    return viewFields;
  }

  public static parseQueryString(query: string) {
    return query
      .slice(1)
      .split("&")
      .map(queryParam => {
        const kvp = queryParam.split("=");
        return { key: kvp[0], value: kvp[1] };
      })
      .reduce((queryS, kvp) => {
        queryS[kvp.key] = kvp.value;
        return queryS;
      }, {});
  }

  public static move(arr: any[], oldIndex: number, newIndex: number): any[] {
    while (oldIndex < 0) {
      oldIndex += arr.length;
    }
    while (newIndex < 0) {
      newIndex += arr.length;
    }
    if (newIndex >= arr.length) {
      let k = newIndex - arr.length;
      while (k-- + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
  }

  public static addDayToDate(tipoDia: string, ItemsFeriados: EFeriado[], fecha: Date, days: number): Date {
    let date = new Date(fecha);

    if (tipoDia !== "" && tipoDia !== "Calendario") {
      if (days > 0) {
        for (let n = 0; n < days; n++) {
          date.setDate(date.getDate() + 1);

          if (date.getDay() === 6) {
            date = this.addDiaToDate(date, 2);
          } else if (date.getDay() === 0) {
            date = this.addDiaToDate(date, 1);
          }

          let esFeriado = true;
          while (esFeriado) {
            esFeriado = this.esFeriado(date, ItemsFeriados);

            if (esFeriado) {
              date = this.addDiaToDate(date, 1);

              if (date.getDay() === 6) {
                date = this.addDiaToDate(date, 2);
              } else if (date.getDay() === 0) {
                date = this.addDiaToDate(date, 1);
              }
            }
          }
        }
      } else {
        if (date.getDay() === 6) {
          date = this.addDiaToDate(date, 2);
        } else if (date.getDay() === 0) {
          date = this.addDiaToDate(date, 1);
        }

        let esFeriado = true;
        while (esFeriado) {
          esFeriado = this.esFeriado(date, ItemsFeriados);

          if (esFeriado) {
            date = this.addDiaToDate(date, 1);

            if (date.getDay() === 6) {
              date = this.addDiaToDate(date, 2);
            } else if (date.getDay() === 0) {
              date = this.addDiaToDate(date, 1);
            }
          }
        }
      }
    } else {
      date.setDate(date.getDate() + days);
    }

    return date;
  }

  public static addDiaToDate(fecha: Date, days: number): Date {
    const date = new Date(fecha);
    date.setDate(fecha.getDate() + days);
    return date;
  }

  public static esFeriado(FechaProgramada: Date, ItemsFeriados: EFeriado[]): boolean {
    let esferiado = false;

    for (const Item of ItemsFeriados) {
      if (Item.Fecha.getMonth() === FechaProgramada.getMonth() && Item.Fecha.getDate() === FechaProgramada.getDate()) {
        esferiado = true;
        break;
      }
    }

    return esferiado;
  }

  public static addMonthToDate(fecha: Date, month: number): Date {
    const date = new Date(fecha);
    date.setMonth(fecha.getMonth() + month);
    return date;
  }

  public static isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  public static getDaysInMonth(year: number, month: number) {
    return [31, this.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  }

  public static addMonths(date: Date, cantMeses: number, dia: number | null) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + cantMeses);
    const ultimoDiaMes = this.getDaysInMonth(d.getFullYear(), d.getMonth());
    if (dia != null) {
      d.setDate(dia);
    } else {
      d.setDate(ultimoDiaMes);
    }
    return d;
  }

  public static addYears(date: Date, cantAnios: number, dia: number | null) {
    const d = new Date(date);
    d.setFullYear(d.getFullYear() + cantAnios);
    const ultimoDiaMes = this.getDaysInMonth(d.getFullYear(), d.getMonth());
    if (dia != null) {
      d.setDate(dia);
    } else {
      d.setDate(ultimoDiaMes);
    }
    return d;
  }

  public static IsNullOrUndefined(valor: any): boolean {
    let result = false;
    if (valor === undefined || valor === null || valor === "") {
      result = true;
    }
    return result;
  }

  public static mostrarFecha(valor: any): string {
    let result = "";
    if (valor === undefined || valor === null || valor === "") {
      result = "";
    } else {
      result = new Date(valor).format("dd/MM/yyyy");
    }
    return result;
  }
  public static mostrarFechaDM(valor: any): string {
    let result = "";
    if (valor === undefined || valor === null || valor === "") {
      result = "";
    } else {
      result = new Date(valor).format("dd/MM");
    }
    return result;
  }

  public static mostrarFechaFormatoYMD(valor: any): string {
    let result = "";
    if (valor === undefined || valor === null || valor === "") {
      result = "";
    } else {
      result = new Date(valor).format("yyyy-MM-dd");
    }
    return result;
  }

  public static mostrarFechaHora(valor: any): string {
    let result = "";
    if (valor === undefined || valor === null || valor === "") {
      result = "";
    } else {
      result = new Date(valor).format("dd/MM/yyyy HH:mm");
    }
    return result;
  }

  public static mostrarFechaHoraNew(valor: any): string {
    let result = "";
    if (valor === undefined || valor === null || valor === "") {
      result = "";
    } else {
      result = new Date(valor).format("dd/MM/yyyy HH:mm");
    }
    return result;
  }

  public static mostrarFechaStringDMYToControlReact(valorDMY: string): string {
    let result = "";
    if (valorDMY === undefined || valorDMY === null || valorDMY === "") {
      result = "";
    } else {
      const fecha = valorDMY.split("/");

      return [fecha[2], fecha[1], fecha[0]].join("-");
    }
    return result;
  }

  public static mostrarFechaControlReact(valorISOFromSharePoint: string): string {
    let result = "";
    if (valorISOFromSharePoint === undefined || valorISOFromSharePoint === null || valorISOFromSharePoint === "") {
      result = "";
    } else {
      const fecha = new Date(valorISOFromSharePoint);

      const dia = fecha.getDate() > 9 ? fecha.getDate() : "0" + fecha.getDate();
      const mes = fecha.getMonth() + 1 > 9 ? fecha.getMonth() + 1 : "0" + (fecha.getMonth() + 1);
      return [fecha.getFullYear(), mes, dia].join("-");
    }
    return result;
  }

  public static ObtenerSizeMB(valor: any): string {
    let tamanoArchivo = Math.round((valor / 1024 / 1024) * 100) / 100;
    let size = tamanoArchivo + " mb";
    if (tamanoArchivo < 1) {
      tamanoArchivo = Math.round((valor / 1024) * 100) / 100;
      size = tamanoArchivo + " kb";
    }
    return size;
  }

  public static ObtenerFecha(valorMoment: any): string {
    const dia = valorMoment.getDate() > 9 ? valorMoment.getDate() : "0" + valorMoment.getDate();
    const mes = valorMoment.getMonth() + 1 > 9 ? valorMoment.getMonth() + 1 : "0" + (valorMoment.getMonth() + 1);
    return [dia, mes, valorMoment.getFullYear()].join("/");
  }

  public static ObtenerFechaHora(valorMoment: any): string {
    const dia = valorMoment.getDate() > 9 ? valorMoment.getDate() : "0" + valorMoment.getDate();
    const mes = valorMoment.getMonth() + 1 > 9 ? valorMoment.getMonth() + 1 : "0" + (valorMoment.getMonth() + 1);
    const hora = valorMoment.getHours() > 9 ? valorMoment.getHours() : "0" + valorMoment.getHours();
    const minuto = valorMoment.getMinutes() > 9 ? valorMoment.getMinutes() : "0" + valorMoment.getMinutes();

    return [dia, mes, valorMoment.getFullYear()].join("/") + " " + [hora, minuto].join(":");
  }

  public static ObtenerDateFechaHoraInicioQueryCamlSharepoint(valor: any): Date {
    if (Util.esNullOUndefined(valor)) {
      return new Date();
    }

    const fecha = new Date(valor);
    const fechaStringDDMMYYYY = this.ConvertirDateToString(fecha);

    const parts = fechaStringDDMMYYYY.split("/");

    if (parts.length === 3) {
      return new Date([parts[2], parts[1], parts[0]].join("-") + "T" + ["00", "00", "00"].join(":"));
    }
    return new Date();
  }

  public static ObtenerDateFechaHoraInicioQueryCamlReactControl(valor: any): string {
    if (Util.esNullOUndefined(valor)) {
      return "";
    }

    const parts = valor.split("-");

    if (parts.length === 3) {
      return [parts[0], parts[1], parts[2]].join("-") + "T" + ["00", "00", "00"].join(":");
    }
    return "";
  }

  public static ObtenerDateFechaHoraInicioQueryCaml(valor: any): string {
    if (Util.esNullOUndefined(valor)) {
      return "";
    }

    const parts = valor.split("/");

    if (parts.length === 3) {
      return [parts[2], parts[1], parts[0]].join("-") + "T" + ["00", "00", "00"].join(":");
    }
    return "";
  }

  public static ObtenerDateFechaHoraInicioRecomendacion(valor: any): string {
    if (Util.esNullOUndefined(valor)) {
      return "";
    }

    const parts = valor.split("-");

    if (parts.length === 3) {
      return [parts[0], parts[1], parts[2]].join("-") + "T" + ["00", "00", "00"].join(":");
    }
    return "";
  }

  public static ObtenerDateFechaHoraFinRecomendacion(valor: any): string {
    if (Util.esNullOUndefined(valor)) {
      return "";
    }

    const parts = valor.split("-");

    if (parts.length === 3) {
      return [parts[0], parts[1], parts[2]].join("-") + "T" + ["23", "59", "00"].join(":");
    }
    return "";
  }




  public static ObtenerDateFechaHoraFinQueryCaml(valor: any): string {
    const parts = valor.split("/");

    if (parts.length === 3) {
      return [parts[2], parts[1], parts[0]].join("-") + "T" + ["23", "59", "00"].join(":");
    }
    return "";
  }

  public static ConvertirStringToDate(valor: any): Date {
    const parts = valor.split("/");

    if (parts.length === 3) {
      const mes = parseInt(parts[1], 10) - 1;
      return new Date(parts[2], mes, parts[0]);
    }
    return new Date();
  }

  public static ConvertirStringToDateAsarti(valor: any): Date {
    const parts = valor.split("-");
    if (parts.length === 3) {
      const mes = parseInt(parts[1], 10) - 1;
      return new Date(parts[0], mes, parts[2]);
    }
    return new Date();
  }



  public static ConvertirStringToDateNew(valor: any): Date {
    const parts = valor.split("/");

    if (parts.length === 3) {
      const mes = parseInt(parts[1], 10) - 1;
      return new Date(parts[2], mes, parts[0]);
    }
    return new Date();
  }


  public static ConvertirStringToDate2(valor: any): Date {
    const parts = valor.split("-");

    if (parts.length === 3) {
      const mes = parseInt(parts[1], 10) - 1;
      return new Date(parts[2], mes, parts[0]);
    }
    return new Date();
  }

  public static ConvertirStringToDate2New(valor: any): Date {
    const parts = valor.split("-");

    if (parts.length === 3) {
      const mes = parseInt(parts[1], 10) - 1;
      return new Date(parts[0], mes, parts[2]);
    }
    return new Date();
  }


  public static ConvertirStringToDateReactControl(valor: any): Date {
    const parts = valor.split("-");

    if (parts.length === 3) {
      const mes = parseInt(parts[1], 10) - 1;
      return new Date(parts[0], mes, parts[2]);
    }
    return new Date();
  }
  public static ConvertirStringToDateReactControlCustom(valor: any): Date {
    const parts = valor.split("-");

    if (parts.length === 3) {
      const mes = parseInt(parts[1], 10) - 1;
      return new Date(parts[0], mes, parts[2], 23, 59, 59);
    }
    return new Date();
  }

  public static ConvertirStringToDateAuditoriaINI(valor: any): Date {
    const parts = valor.split("/");

    if (parts.length === 3) {
      const mes = parseInt(parts[1], 10) - 1;
      return new Date(parts[2], mes, parts[0], 0, 0, 0);
    }
    return new Date();
  }

  public static ConvertirStringToDateAuditoriaFIN(valor: any): Date {
    const parts = valor.split("/");

    if (parts.length === 3) {
      const mes = parseInt(parts[1], 10) - 1;
      return new Date(parts[2], mes, parts[0], 23, 59, 59);
    }
    return new Date();
  }

  public static ConvertirStringToStringFormatDDMMYYYYReactControl(valor: any): string {
    const parts = valor.split("-");

    if (parts.length === 3) {
      const mes = parseInt(parts[1], 10);
      const mesString = mes < 10 ? "0" + mes : mes;
      return [parts[2], mesString, parts[0]].join("/");
    }
    return "";
  }

  public static FormatearDateToYYYYMMdd(valor: any): string {
    const parts = valor.split("/");

    if (parts.length === 3) {
      return [parts[2], parts[1], parts[0]].join("-");
    }
    return valor;
  }

  public static FormatearDateToMMddYYYY(valor: any): string {
    const parts = valor.split("/");

    if (parts.length === 3) {
      return [parts[1], parts[0], parts[2]].join("/");
    }
    return "";
  }

  public static FormatearDateToddMMYYYY(valor: any): string {
    const parts = valor.split("-");

    if (parts.length === 3) {
      return [parts[2], parts[1], parts[0]].join("/");
    }
    return "";
  }

  public static diff_months(dt1: Date, dt2: Date): number {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60 * 24 * 7 * 4;
    return Math.abs(Math.round(diff));
  }

  public static SoloNumeros(valor: object): boolean {
    let esValido = false;

    if (!this.IsNullOrUndefined(valor)) {
      const pattern = new RegExp("^[0-9]*$");
      esValido = pattern.test(valor.toString());
    }

    return esValido;
  }

  public static SoloIP(valor: object): boolean {
    let esValido = false;

    if (!this.IsNullOrUndefined(valor)) {
      const pattern = new RegExp("^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$");
      esValido = pattern.test(valor.toString());
    }

    return esValido;
  }

  public static SoloEmail(valor: object): boolean {
    let esValido = false;

    if (!this.IsNullOrUndefined(valor)) {
      const pattern = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");
      esValido = pattern.test(valor.toString());
    }

    return esValido;
  }

  public static MostrarFechaFormatoLetras(valor: any): string {
    let result = "";
    const parts = valor.split("/");

    if (parts.length === 3) {
      const mes = parseInt(parts[1], 10);
      const mesLetras = this.ObtenerMesEnLetras(mes);
      result = parts[0] + " de " + mesLetras + " del " + parts[2];
    }

    return result;
  }

  public static ObtenerMesEnNumero(valor: string): number {
    let result = 0;
    if (valor === "Enero") {
      result = 1;
    } else if (valor === "Febrero") {
      result = 2;
    } else if (valor === "Marzo") {
      result = 3;
    } else if (valor === "Abril") {
      result = 4;
    } else if (valor === "Mayo") {
      result = 5;
    } else if (valor === "Junio") {
      result = 6;
    } else if (valor === "Julio") {
      result = 7;
    } else if (valor === "Agosto") {
      result = 8;
    } else if (valor === "Septiembre") {
      result = 9;
    } else if (valor === "Octubre") {
      result = 10;
    } else if (valor === "Noviembre") {
      result = 11;
    } else if (valor === "Diciembre") {
      result = 12;
    }

    return result;
  }

  public static ObtenerMesEnLetras(valor: number): string {
    let result = "";
    if (valor === 0) {
      result = "Diciembre";
    } else if (valor === 1) {
      result = "Enero";
    } else if (valor === 2) {
      result = "Febrero";
    } else if (valor === 3) {
      result = "Marzo";
    } else if (valor === 4) {
      result = "Abril";
    } else if (valor === 5) {
      result = "Mayo";
    } else if (valor === 6) {
      result = "Junio";
    } else if (valor === 7) {
      result = "Julio";
    } else if (valor === 8) {
      result = "Agosto";
    } else if (valor === 9) {
      result = "Septiembre";
    } else if (valor === 10) {
      result = "Octubre";
    } else if (valor === 11) {
      result = "Noviembre";
    } else if (valor === 12) {
      result = "Diciembre";
    }

    return result;
  }

  public static ObtenerMesEnLetrasOrden(valor: number): string {
    let result = "";
    if (valor === 0) {
      result = "Enero";
    } else if (valor === 1) {
      result = "Febrero";
    } else if (valor === 2) {
      result = "Marzo";
    } else if (valor === 3) {
      result = "Abril";
    } else if (valor === 4) {
      result = "Mayo";
    } else if (valor === 5) {
      result = "Junio";
    } else if (valor === 6) {
      result = "Julio";
    } else if (valor === 7) {
      result = "Agosto";
    } else if (valor === 8) {
      result = "Septiembre";
    } else if (valor === 9) {
      result = "Octubre";
    } else if (valor === 10) {
      result = "Noviembre";
    } else if (valor === 11) {
      result = "Diciembre";
    }

    return result;
  }

  public static MostrarFechaFormatoAbreviatura(valor: any): string {
    let result = "";
    const parts = valor.split("/");

    if (parts.length === 3) {
      const mes = parseInt(parts[1], 10);
      const mesAbrevLetras = this.ObtenerAbreviaturaMesEnLetras(mes);
      result = mesAbrevLetras + " - " + parts[2];
    }

    return result;
  }

  public static MostrarFechaFormatoRenovacion(valor: any): string {
    let result = "";
    const parts = valor.split("/");

    if (parts.length === 3) {
      const mes = parseInt(parts[1], 10);
      const mesLetras = this.ObtenerMesEnLetras(mes);
      result = mesLetras + " - " + parts[2];
    }

    return result;
  }

  public static ObtenerAbreviaturaMesEnLetras(valor: number): string {
    let result = "";
    if (valor === 1) {
      result = "Ene";
    } else if (valor === 2) {
      result = "Feb";
    } else if (valor === 3) {
      result = "Mar";
    } else if (valor === 4) {
      result = "Abr";
    } else if (valor === 5) {
      result = "May";
    } else if (valor === 6) {
      result = "Jun";
    } else if (valor === 7) {
      result = "Jul";
    } else if (valor === 8) {
      result = "Ago";
    } else if (valor === 9) {
      result = "Sep";
    } else if (valor === 10) {
      result = "Oct";
    } else if (valor === 11) {
      result = "Nov";
    } else if (valor === 12) {
      result = "Dic";
    }

    return result;
  }

  public static ConvertirDateToString(fechaInput: Date): string {
    let result = "";
    const fecha = new Date(fechaInput);
    const dia = fecha.getDate() > 9 ? fecha.getDate() : "0" + fecha.getDate();
    const mes = fecha.getMonth() + 1 > 9 ? fecha.getMonth() + 1 : "0" + (fecha.getMonth() + 1);

    result = [dia, mes, fecha.getFullYear()].join("/");
    return result;
  }

  public static ConvertirDateToString2(fechaInput: Date): string {
    let result = "";
    const fecha = new Date(fechaInput);
    const dia = fecha.getDate() > 9 ? fecha.getDate() : "0" + fecha.getDate();
    const mes = fecha.getMonth() + 1 > 9 ? fecha.getMonth() + 1 : "0" + (fecha.getMonth() + 1);

    result = [fecha.getFullYear(), mes, dia].join("-");
    return result;
  }

  public static ConvertirDateToStringFechaHora(fechaInput: Date): string {
    const fecha = new Date(fechaInput);
    const dia = fecha.getDate() > 9 ? fecha.getDate() : "0" + fecha.getDate();
    const mes = fecha.getMonth() + 1 > 9 ? fecha.getMonth() + 1 : "0" + (fecha.getMonth() + 1);
    const hora = fecha.getHours() > 9 ? fecha.getHours() : "0" + fecha.getHours();
    const minuto = fecha.getMinutes() > 9 ? fecha.getMinutes() : "0" + fecha.getMinutes();

    return [dia, mes, fecha.getFullYear()].join("/") + " " + [hora, minuto].join(":");
  }

  public static ConvertirDateToDay(fecha: Date): string {
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return dias[fecha.getDay()];
  }

  public static EsPaginaDetalle(): boolean {
    let esDetalle = false;
    const pagina = window.location.href;
    if (pagina.includes("Detalle")) {
      esDetalle = true;
    }
    return esDetalle;
  }

  public static obtenerUrlDescarga(url: string) {
    return ParametrosNoAdministrables.ValoresGenericos.UrlSitio + "/_layouts/download.aspx?SourceUrl=" + encodeURIComponent(url);
  }

  public static descargarArchivo = (rutaArchivo: string) => {
    window.open(Util.obtenerUrlDescarga(rutaArchivo), "_self");
  };

  public static replaceUnsupportedCharacters(fileName: string): string {
    fileName = fileName.replace("#", "");
    fileName = fileName.replace("%", "");
    fileName = fileName.replace("&", "");
    fileName = fileName.replace("*", "");
    fileName = fileName.replace(":", "");
    fileName = fileName.replace("<", "");
    fileName = fileName.replace(">", "");
    fileName = fileName.replace("?", "");
    fileName = fileName.replace("/", "");
    fileName = fileName.replace("{", "");
    fileName = fileName.replace("|", "");
    fileName = fileName.replace("}", "");
    fileName = fileName.replace("~", "");
    fileName = fileName.replace("\\", "");
    fileName = fileName.replace('"', "");
    fileName = fileName.replace("'", "");
    return fileName;
  }

  public static getDateFechaHoraParaConsultaREST(date: Date, hora: string) {
    if (date != null) {
      const d = new Date(date);
      const dia = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
      const mes = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
      const dformat = [d.getFullYear(), mes, dia].join("-") + "T" + [hora, "00", "00"].join(":");

      return dformat;
    } else {
      return null;
    }
  }

  public static mostrarFechaControlReactInvertido(valorISOFromSharePoint: string): string {
    let result = "";
    if (valorISOFromSharePoint === undefined || valorISOFromSharePoint === null || valorISOFromSharePoint === "") {
      result = "";
    } else {
      const fechaArray = valorISOFromSharePoint.split("/");
      const fecha = new Date(Number(fechaArray[2]), Number(fechaArray[1]) - 1, Number(fechaArray[0]));

      const dia = fecha.getDate() > 9 ? fecha.getDate() : "0" + fecha.getDate();
      const mes = fecha.getMonth() + 1 > 9 ? fecha.getMonth() + 1 : "0" + (fecha.getMonth() + 1);
      return [fecha.getFullYear(), mes, dia].join("-");
    }
    return result;
  }

  public static addHours(fecha: Date): Date {
    const date = new Date(fecha.setHours(fecha.getHours() + 5));
    return date;
  }

  public static bytesToSize(bytes: number, seperator = " "): string {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    if (bytes === 0) {
      return "n/a";
    }

    const i = Number(Math.floor(Math.log(bytes) / Math.log(1024)));

    if (i === 0) {
      return `${bytes}${seperator}${sizes[i]}`;
    } else {
      return `${(bytes / 1024 ** i).toFixed(1)}${seperator}${sizes[i]}`;
    }
  }

  public static getTextoBool = (valor: boolean) => {
    if (valor) {
      return "Sí";
    }
    return "No";
  };

  public static getTextoBoolConfIncidente = (valor: string) => {
    if (valor === "Activo") {
      return "Sí";
    }
    return "No";
  };

  public static getTextoBoolConfIncidente2 = (valor: string) => {
    if (valor === "Activo") {
      return true;
    }
    if (valor === "true") { return true; }
    return false;
  };

  public static validarIdEsDuplicado = (listaIds: number[], id: number): boolean => {
    const esDuplicado = listaIds.filter((idUsuario: number) => {
      return idUsuario === id;
    });

    if (esDuplicado.length > 0) {
      return true;
    }

    return false;
  };

  public static obtenerIdsSinDuplicados = (listaIds: number[]): number[] => {
    const listaIdsSinDuplicados: number[] = [];

    listaIds.forEach((idUsuario: number) => {
      const esDuplicado = listaIdsSinDuplicados.filter((idUsuarioSinDuplicados: number) => {
        return idUsuarioSinDuplicados === idUsuario;
      });

      if (esDuplicado.length === 0) {
        listaIdsSinDuplicados.push(idUsuario);
      }
    });

    return listaIdsSinDuplicados;
  };

  public static obtenerStringsSinDuplicados = (listaStrings: string[]): string[] => {
    const listaSinDuplicados: string[] = [];

    listaStrings.forEach((valor: string) => {
      const esDuplicado = listaSinDuplicados.filter((valorSinDuplicados: string) => {
        return valorSinDuplicados === valor;
      });

      if (esDuplicado.length === 0) {
        listaSinDuplicados.push(valor);
      }
    });

    return listaSinDuplicados;
  };

  public static obtenerElementoPeoplePickerSinDuplicados = (lista: EElementoPeoplePicker[]): EElementoPeoplePicker[] => {
    const listaSinDuplicados: EElementoPeoplePicker[] = [];

    lista.forEach((valor: EElementoPeoplePicker) => {
      const esDuplicado = listaSinDuplicados.filter((valorSinDuplicados: EElementoPeoplePicker) => {
        return valorSinDuplicados.ID === valor.ID;
      });

      if (esDuplicado.length === 0) {
        listaSinDuplicados.push(valor);
      }
    });

    return listaSinDuplicados;
  };

  public static removerSaltosLineasAlExportarCampoMultilinea = (valor: string): string => {
    return valor.replace(/(\r\n|\n|\r)/gm, " ");
  };

  public static obtenerDatosLookupMultiple<T>(entidades: T[]) {
    const valores = new ELookupMultiple<number>();
    entidades.forEach((elemento: any) => {
      valores.results.push(elemento.ID);
    });

    return valores;
  }

  public static obtenerDatosChoiceMultiple<T>(elementos: T[]) {
    const valores = new ELookupMultiple<string>();
    elementos.forEach((elemento: any) => {
      valores.results.push(elemento);
    });

    return valores;
  }

  public static recortarTexto = (texto: string, cantLetras: number): string => {
    let res = texto;
    if (res.length > cantLetras) {
      res = texto.substring(1, cantLetras) + "...";
    }
    return res;
  };

  public static obtenerNroPeriodoTrimestre = (nroMes: number): string => {
    let NroPeriodo = 0;

    if (nroMes >= 0 && nroMes < 3) {
      NroPeriodo = 1;
    } else if (nroMes >= 3 && nroMes < 6) {
      NroPeriodo = 2;
    } else if (nroMes >= 6 && nroMes < 9) {
      NroPeriodo = 3;
    } else if (nroMes >= 9 && nroMes < 12) {
      NroPeriodo = 4;
    }

    return NroPeriodo + ";" + nroMes;
  };

  public static obtenerNroPeriodoCuatrimestre = (nroMes: number): string => {
    let NroPeriodo = 0;

    if (nroMes >= 0 && nroMes < 4) {
      NroPeriodo = 1;
    } else if (nroMes >= 4 && nroMes < 8) {
      NroPeriodo = 2;
    } else if (nroMes >= 8 && nroMes < 12) {
      NroPeriodo = 3;
    }

    return NroPeriodo + ";" + nroMes;
  };

  public static obtenerNroPeriodoSemestre = (nroMes: number): string => {
    let NroPeriodo = 0;

    if (nroMes >= 0 && nroMes < 6) {
      NroPeriodo = 1;
    } else if (nroMes >= 6 && nroMes < 12) {
      NroPeriodo = 2;
    }

    return NroPeriodo + ";" + nroMes;
  };

  public static tamanoArchivoSuperaMaximoPermitido = (tamanoArchivo: number, ConfiguracionTamanoMaximoPermitido: number): boolean => {
    const tamanoMaximoArchivosEnMegas: number = ConfiguracionTamanoMaximoPermitido;
    return tamanoArchivo / 1024 > tamanoMaximoArchivosEnMegas * 1024;
  };

  public static esArchivoExtensionNoPermitida = (nombreArchivo: string, ConfiguracionExtensionArchivosNoPermitidas: string): boolean => {
    const archivoSplit = nombreArchivo.split(".");
    const extensionArchivo = archivoSplit[archivoSplit.length - 1];

    const extensionesNoPermitidas = ConfiguracionExtensionArchivosNoPermitidas;

    const esExtensionNoPermitida = extensionesNoPermitidas.split(",").filter((extension: string) => {
      return extension.toUpperCase() === extensionArchivo.toUpperCase();
    });

    if (esExtensionNoPermitida && esExtensionNoPermitida.length > 0) {
      return true;
    }

    return false;
  };
}
