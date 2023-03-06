
import { EBaseEntidadTransaccional } from "src/models/Base/EBaseEntidadTransaccional";
// import EProyecto from './EProyecto';
import ParseJsom from 'src/genericos/ParseJsom';
import { RestFiltros } from 'src/genericos/RestFiltros';


export default class EReversiones extends EBaseEntidadTransaccional {

  public static Campos = {
    ID: "ID",
    Title: "Title",
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
    CodCredito: "CodCredito",
    RevertirReprogramacionCompleta: "RevertirReprogramacionCompleta",
    RevertirReprogramacionGenerando1: "RevertirReprogramacionGenerando1",
    RevertirReprogramacionGenerando2: "RevertirReprogramacionGenerando2",
    GeneralReclamo: "GeneralReclamo",
    Modified: "Modified",
    Created: "Created",


  };

  public static Fields = [
    "ID",
    "Title",
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
    "CodCredito",
    "RevertirReprogramacionCompleta",
    "RevertirReprogramacionGenerando1",
    "RevertirReprogramacionGenerando2",
    "GeneralReclamo",
    "Modified",
    "Created",


  ];

  public ID: number;
  public Title: string;
  public Cliente: string;
  public DNI: string;
  public Producto: string;
  public Celular: string;
  public CodigoVerificadorDNI: string;
  public EncuentraTrabajando: string;
  public Donde: string;
  public PofesionOficioNegocio: string;
  public Ingresossiguensiendomismos: string;
  public CuantoGanaGeneraNegocio: string;
  public TieneDificultadPago: string;
  public Observacion: string;
  public CodCredito: string;
  public RevertirReprogramacionCompleta: string;
  public RevertirReprogramacionGenerando1: string;
  public RevertirReprogramacionGenerando2: string;
  public GeneralReclamo: string;

  public Modified: string;
  public Created: string;


  constructor() {
    super();
    this.ID = 0;
    this.Title = "";
    this.Cliente = "";
    this.DNI = "";
    this.Producto = "";
    this.Celular = "";
    this.CodigoVerificadorDNI = "";
    this.EncuentraTrabajando = "";
    this.Donde = "";
    this.PofesionOficioNegocio = "";
    this.Ingresossiguensiendomismos = "";
    this.CuantoGanaGeneraNegocio = "";
    this.TieneDificultadPago = "";
    this.Observacion = "";
    this.CodCredito = "";
    this.RevertirReprogramacionCompleta = "";
    this.RevertirReprogramacionGenerando1 = "";
    this.RevertirReprogramacionGenerando2 = "";
    this.GeneralReclamo = "";
    this.Modified = "";

    this.Created = "";

  }

  public setearValores(elementoItemLista: SP.ListItem) {

    this.ID = ParseJsom.parsearNumber(
      elementoItemLista,
      EReversiones.Campos.ID
    );
    this.Title = ParseJsom.parsearString(
      elementoItemLista,
      EReversiones.Campos.Title
    );
    this.Cliente = ParseJsom.parsearString(
      elementoItemLista,
      EReversiones.Campos.Cliente
    );
    this.DNI = ParseJsom.parsearString(
      elementoItemLista,
      EReversiones.Campos.DNI
    );
    this.Producto = ParseJsom.parsearString(
      elementoItemLista,
      EReversiones.Campos.Producto
    );
    this.Celular = ParseJsom.parsearString(
      elementoItemLista,
      EReversiones.Campos.Celular
    );
    this.CodigoVerificadorDNI = ParseJsom.parsearString(
      elementoItemLista,
      EReversiones.Campos.CodigoVerificadorDNI
    );
    this.CodCredito = ParseJsom.parsearString(
      elementoItemLista,
      EReversiones.Campos.CodCredito
    );

    this.RevertirReprogramacionCompleta = ParseJsom.parsearString(
      elementoItemLista,
      EReversiones.Campos.RevertirReprogramacionCompleta
    );

    this.RevertirReprogramacionGenerando1 = ParseJsom.parsearString(
      elementoItemLista,
      EReversiones.Campos.RevertirReprogramacionGenerando1
    );

    this.RevertirReprogramacionGenerando2 = ParseJsom.parsearString(
      elementoItemLista,
      EReversiones.Campos.RevertirReprogramacionGenerando2
    );

    this.GeneralReclamo = ParseJsom.parsearString(
      elementoItemLista,
      EReversiones.Campos.GeneralReclamo
    );




    this.Created = ParseJsom.parsearFechaString(
      elementoItemLista,
      EReversiones.Campos.Created
    );

    this.Modified = ParseJsom.parsearFechaString(
      elementoItemLista,
      EReversiones.Campos.Modified
    );

  }


  public setearValoresRest(elementoItemLista: any) {
    this.ID = RestFiltros.parsearNumero(
      elementoItemLista,
      EReversiones.Campos.ID
    );
    this.Title = RestFiltros.parsearTexto(
      elementoItemLista,
      EReversiones.Campos.Title
    );
    this.Cliente = RestFiltros.parsearTexto(
      elementoItemLista,
      EReversiones.Campos.Cliente
    );
    this.DNI = RestFiltros.parsearTexto(
      elementoItemLista,
      EReversiones.Campos.DNI
    );

    this.Producto = RestFiltros.parsearTexto(
      elementoItemLista,
      EReversiones.Campos.Producto
    );

    this.Celular = RestFiltros.parsearTexto(
      elementoItemLista,
      EReversiones.Campos.Celular
    );
    this.CodigoVerificadorDNI = RestFiltros.parsearTexto(
      elementoItemLista,
      EReversiones.Campos.CodigoVerificadorDNI
    );
    this.CodCredito = RestFiltros.parsearTexto(
      elementoItemLista,
      EReversiones.Campos.CodCredito
    );

    this.RevertirReprogramacionCompleta = RestFiltros.parsearTexto(
      elementoItemLista,
      EReversiones.Campos.RevertirReprogramacionCompleta
    );
    this.RevertirReprogramacionGenerando1 = RestFiltros.parsearTexto(
      elementoItemLista,
      EReversiones.Campos.RevertirReprogramacionGenerando1
    );
    this.RevertirReprogramacionGenerando2 = RestFiltros.parsearTexto(
      elementoItemLista,
      EReversiones.Campos.RevertirReprogramacionGenerando2
    );
    this.GeneralReclamo = RestFiltros.parsearTexto(
      elementoItemLista,
      EReversiones.Campos.GeneralReclamo
    );






    this.Created = RestFiltros.parsearTexto(
      elementoItemLista,
      EReversiones.Campos.Created
    );

    this.Modified = RestFiltros.parsearTexto(
      elementoItemLista,
      EReversiones.Campos.Modified
    );




  }

}
