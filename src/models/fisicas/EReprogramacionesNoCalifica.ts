
import { EBaseEntidadTransaccional } from "src/models/Base/EBaseEntidadTransaccional";
// import EProyecto from './EProyecto';
import ParseJsom from 'src/genericos/ParseJsom';
import { RestFiltros } from 'src/genericos/RestFiltros';


export default class EReprogramacionesNoCalifica extends EBaseEntidadTransaccional {

  public static Campos = {
    ID: "ID",
    Cliente: "Cliente",
    DNI: "DNI",
    Producto: "Producto",
    Celular: "Celular",
    CodigoVerificadorDNI: "CodigoVerificadorDNI",
    EncuentraTrabajando: "EncuentraTrabajando",
    Donde: "Donde",
    Pofesion_Oficio_Negocio: "Pofesion_Oficio_Negocio",
    Ingresos_siguen_siendo_mismos: "Ingresos_siguen_siendo_mismos",
    CuantoGanaGeneraNegocio: "CuantoGanaGeneraNegocio",
    TieneDificultadPago: "TieneDificultadPago",
    Observacion: "Observacion",
    Modified: "Modified",
    Created: "Created",


  };

  public static Fields = [
    "ID",
    "Cliente",
    "DNI",
    "Producto",
    "Celular",
    "CodigoVerificadorDNI",
    "EncuentraTrabajando",
    "Donde",
    "Pofesion_Oficio_Negocio",
    "Ingresos_siguen_siendo_mismos",
    "CuantoGanaGeneraNegocio",
    "TieneDificultadPago",
    "Observacion",
    "Modified",
    "Created"

  ];

  public ID: number;
  public Cliente: string;
  public DNI: string;
  public Producto: string;
  public Celular: string;
  public CodigoVerificadorDNI: string;
  public EncuentraTrabajando: boolean;
  public Donde: string;
  public PofesionOficioNegocio: string;
  public Ingresossiguensiendomismos: boolean;
  public CuantoGanaGeneraNegocio: string;
  public TieneDificultadPago: boolean;
  public Observacion: string;
  public Modified: string;
  public Created: string;


  constructor() {
    super();
    this.ID = 0;
    this.Cliente = "";
    this.DNI = "";
    this.Producto = "";
    this.Celular = "";
    this.CodigoVerificadorDNI = "";
    this.EncuentraTrabajando = false;
    this.Donde = "";
    this.PofesionOficioNegocio = "";
    this.Ingresossiguensiendomismos = false;
    this.CuantoGanaGeneraNegocio = "";
    this.TieneDificultadPago = false;
    this.Observacion = "";
    this.Modified = "";
    this.Created = "";

  }

  public setearValores(elementoItemLista: SP.ListItem) {

    this.ID = ParseJsom.parsearNumber(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.ID
    );

    this.Cliente = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.Cliente
    );
    this.DNI = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.DNI
    );
    this.Producto = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.Producto
    );
    this.Celular = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.Celular
    );
    this.CodigoVerificadorDNI = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.CodigoVerificadorDNI
    );
    this.EncuentraTrabajando = ParseJsom.parsearBooleano(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.EncuentraTrabajando
    );
    this.PofesionOficioNegocio = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.Pofesion_Oficio_Negocio
    );
    this.Donde = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.Donde
    );

    this.Ingresossiguensiendomismos = ParseJsom.parsearBooleano(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.Ingresos_siguen_siendo_mismos
    );

    this.CuantoGanaGeneraNegocio = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.CuantoGanaGeneraNegocio
    );
    this.TieneDificultadPago = ParseJsom.parsearBooleano(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.TieneDificultadPago
    );
    this.Observacion = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.Observacion
    );

    this.Created = ParseJsom.parsearFechaString(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.Created
    );

    this.Modified = ParseJsom.parsearFechaString(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.Modified
    );

  }


  public setearValoresRest(elementoItemLista: any) {
    this.ID = RestFiltros.parsearNumero(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.ID
    );

    this.Cliente = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.Cliente
    );
    this.DNI = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.DNI
    );

    this.Producto = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.Producto
    );

    this.Celular = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.Celular
    );
    this.CodigoVerificadorDNI = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.CodigoVerificadorDNI
    );

    this.EncuentraTrabajando = RestFiltros.parsearBooleano(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.EncuentraTrabajando
    );

    this.Donde = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.Donde
    );

    this.PofesionOficioNegocio = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.Pofesion_Oficio_Negocio
    );

    this.Ingresossiguensiendomismos = RestFiltros.parsearBooleano(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.Ingresos_siguen_siendo_mismos
    );
    this.CuantoGanaGeneraNegocio = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.CuantoGanaGeneraNegocio
    );
    this.TieneDificultadPago = RestFiltros.parsearBooleano(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.TieneDificultadPago
    );
    this.Observacion = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.Observacion
    );
    this.Created = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.Created
    );

    this.Modified = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramacionesNoCalifica.Campos.Modified
    );




  }

}
