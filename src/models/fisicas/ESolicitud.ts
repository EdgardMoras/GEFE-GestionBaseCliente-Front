
import { EBaseEntidadTransaccional } from "src/models/Base/EBaseEntidadTransaccional";
// import EProyecto from './EProyecto';
import ParseJsom from 'src/genericos/ParseJsom';
import { RestFiltros } from 'src/genericos/RestFiltros';


export default class ESolicitud extends EBaseEntidadTransaccional {

  public static Campos = {
    ID: "ID",
    NumeroDocumento: "NumeroDocumento",
    Nombre: "Nombre",
    Telefono: "Telefono",
    Correo: "Correo",
    Direccion: "Direccion",
    Estado: "Estado",
    Modified: "Modified",
    Created: "Created",
    Title: "Title"

  };

  public static Fields = [
    "ID",
    "NumeroDocumento",
    "Nombre",
    "Telefono",
    "Correo",
    "Direccion",
    "Estado",
    "Created"

  ];

  public NumeroDocumento: string;
  public Nombre: string;
  public Telefono: string;
  public Correo: string;
  public Direccion: string;
  public Estado: string;
  public Created: string;
  public Modified: string;





  constructor() {
    super();
    this.ID = 0;
    this.NumeroDocumento = "";
    this.Nombre = "";
    this.Telefono = "";
    this.Correo = "";
    this.Direccion = "";
    this.Estado = "";
    this.Created = "";
    this.Modified = "";
  }

  public setearValores(elementoItemLista: SP.ListItem) {

    this.NumeroDocumento = ParseJsom.parsearString(
      elementoItemLista,
      ESolicitud.Campos.NumeroDocumento
    );
    this.Nombre = ParseJsom.parsearString(
      elementoItemLista,
      ESolicitud.Campos.Nombre
    );
    this.Telefono = ParseJsom.parsearString(
      elementoItemLista,
      ESolicitud.Campos.Telefono
    );
    this.Correo = ParseJsom.parsearString(
      elementoItemLista,
      ESolicitud.Campos.Correo
    );

    this.Direccion = ParseJsom.parsearString(
      elementoItemLista,
      ESolicitud.Campos.Direccion
    );


    this.Estado = ParseJsom.parsearString(
      elementoItemLista,
      ESolicitud.Campos.Estado
    );

    this.Created = ParseJsom.parsearFechaString(
      elementoItemLista,
      ESolicitud.Campos.Created
    );

    this.Modified = ParseJsom.parsearFechaString(
      elementoItemLista,
      ESolicitud.Campos.Modified
    );


    this.ID = ParseJsom.parsearNumber(elementoItemLista, ESolicitud.Campos.ID);
  }


  public setearValoresRest(elementoItemLista: any) {
    this.ID = RestFiltros.parsearNumero(
      elementoItemLista,
      ESolicitud.Campos.ID
    );
    this.NumeroDocumento = RestFiltros.parsearTexto(
      elementoItemLista,
      ESolicitud.Campos.NumeroDocumento
    );
    this.Nombre = RestFiltros.parsearTexto(
      elementoItemLista,
      ESolicitud.Campos.Nombre
    );
    this.Telefono = RestFiltros.parsearTexto(
      elementoItemLista,
      ESolicitud.Campos.Telefono
    );

    this.Correo = RestFiltros.parsearTexto(
      elementoItemLista,
      ESolicitud.Campos.Correo
    );

    this.Direccion = RestFiltros.parsearTexto(
      elementoItemLista,
      ESolicitud.Campos.Direccion
    );
    this.Estado = RestFiltros.parsearTexto(
      elementoItemLista,
      ESolicitud.Campos.Estado
    );


    this.Created = RestFiltros.parsearTexto(
      elementoItemLista,
      ESolicitud.Campos.Created
    );

    this.Modified = RestFiltros.parsearTexto(
      elementoItemLista,
      ESolicitud.Campos.Modified
    );




  }

}
