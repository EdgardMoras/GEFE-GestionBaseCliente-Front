
import { EBaseEntidadTransaccional } from "src/models/Base/EBaseEntidadTransaccional";
// import EProyecto from './EProyecto';
import ParseJsom from 'src/genericos/ParseJsom';
import { RestFiltros } from 'src/genericos/RestFiltros';
import Usuario from '../Base/Usuario';


export default class ECargaExcel extends EBaseEntidadTransaccional {

  public static Campos = {
    ID: "ID",
    Title: "Title",
    Estado: "Estado",
    UsuarioRegistro: "UsuarioRegistro",
    Modified: "Modified",
    RutaArchivo: "RutaArchivo",
    Created: "Created",
    Base: "Base",
    Tipo: "Tipo",


  };

  public static Fields = [
    "ID",
    "Title",
    "Estado",
    "UsuarioRegistro",
    "RutaArchivo",
    "Created",
    "Modified",
    "Base",
    "Tipo"

  ];

  public ID: number;
  public Title: string;
  public Estado: string;
  public UsuarioRegistro: Usuario;
  public Modified: string;
  public RutaArchivo: string;
  public Created: string;
  public Base: string;
  public Tipo: string;

  constructor() {
    super();
    this.ID = 0;
    this.Title = "";
    this.Estado = "";
    this.UsuarioRegistro = new Usuario;
    this.RutaArchivo = "";
    this.Modified = "";
    this.Created = "";
    this.Base = "";
    this.Tipo = "";

  }

  public setearValores(elementoItemLista: SP.ListItem) {

    this.ID = ParseJsom.parsearNumber(
      elementoItemLista,
      ECargaExcel.Campos.ID
    );
    this.Title = ParseJsom.parsearString(
      elementoItemLista,
      ECargaExcel.Campos.Title
    );
    this.Estado = ParseJsom.parsearString(
      elementoItemLista,
      ECargaExcel.Campos.Estado
    );
    this.UsuarioRegistro = ParseJsom.parsearUsuario(
      elementoItemLista,
      ECargaExcel.Campos.UsuarioRegistro
    );
    this.RutaArchivo = ParseJsom.parsearString(
      elementoItemLista,
      ECargaExcel.Campos.RutaArchivo
    );

    this.Base = ParseJsom.parsearString(
      elementoItemLista,
      ECargaExcel.Campos.Base
    );

    this.Tipo = ParseJsom.parsearString(
      elementoItemLista,
      ECargaExcel.Campos.Tipo
    );

    this.Created = ParseJsom.parsearFechaString(
      elementoItemLista,
      ECargaExcel.Campos.Created
    );

    this.Modified = ParseJsom.parsearFechaString(
      elementoItemLista,
      ECargaExcel.Campos.Modified
    );

  }


  public setearValoresRest(elementoItemLista: any) {
    this.ID = RestFiltros.parsearNumero(
      elementoItemLista,
      ECargaExcel.Campos.ID
    );
    this.Title = RestFiltros.parsearTexto(
      elementoItemLista,
      ECargaExcel.Campos.Title
    );
    this.Estado = RestFiltros.parsearTexto(
      elementoItemLista,
      ECargaExcel.Campos.Estado
    );
    this.RutaArchivo = RestFiltros.parsearTexto(
      elementoItemLista,
      ECargaExcel.Campos.RutaArchivo
    );

    this.Base = RestFiltros.parsearTexto(
      elementoItemLista,
      ECargaExcel.Campos.Base
    );

    this.Tipo = RestFiltros.parsearTexto(
      elementoItemLista,
      ECargaExcel.Campos.Tipo
    );

    this.UsuarioRegistro = RestFiltros.parsearUsuario(
      elementoItemLista,
      ECargaExcel.Campos.UsuarioRegistro
    );


    this.Created = RestFiltros.parsearTexto(
      elementoItemLista,
      ECargaExcel.Campos.Created
    );

    this.Modified = RestFiltros.parsearTexto(
      elementoItemLista,
      ECargaExcel.Campos.Modified
    );




  }

}
