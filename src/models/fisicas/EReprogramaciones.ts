
import { EBaseEntidadTransaccional } from "src/models/Base/EBaseEntidadTransaccional";
// import EProyecto from './EProyecto';
import ParseJsom from 'src/genericos/ParseJsom';
import { RestFiltros } from 'src/genericos/RestFiltros';


export default class EReprogramaciones extends EBaseEntidadTransaccional {

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
    X30DGRACIA: "_x0033_0DGracia",
    X30DGRACIA10: "_x0033_0DGracia_x002b_10",
    X30DGRACIA20: "_x0033_0DGracia_x002b_20",
    X30DGRACIA30: "_x0033_0DGracia_x002b_30",
    PeriodoGracia2Meses: "PeriodoGracia2Meses",
    PeriodoGracia3Meses: "PeriodoGracia3Meses",
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
    "X30DGRACIA",
    "X30DGRACIA10",
    "X30DGRACIA20",
    "X30DGRACIA30",
    "Modified",
    "Created",
    "PeriodoGracia2Meses",
    "PeriodoGracia3Meses"

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
  public X30DGRACIA: string;
  public X30DGRACIA10: string;
  public X30DGRACIA20: string;
  public X30DGRACIA30: string;
  public PeriodoGracia2Meses: string;
  public PeriodoGracia3Meses: string;
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
    this.X30DGRACIA = "";
    this.X30DGRACIA10 = "";
    this.X30DGRACIA20 = "";
    this.X30DGRACIA30 = "";
    this.Modified = "";
    this.PeriodoGracia2Meses = "";
    this.PeriodoGracia3Meses = "";
    this.Created = "";

  }

  public setearValores(elementoItemLista: SP.ListItem) {

    this.ID = ParseJsom.parsearNumber(
      elementoItemLista,
      EReprogramaciones.Campos.ID
    );
    this.Title = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramaciones.Campos.Title
    );
    this.Cliente = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramaciones.Campos.Cliente
    );
    this.DNI = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramaciones.Campos.DNI
    );
    this.Producto = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramaciones.Campos.Producto
    );
    this.Celular = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramaciones.Campos.Celular
    );
    this.CodigoVerificadorDNI = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramaciones.Campos.CodigoVerificadorDNI
    );
    this.CodCredito = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramaciones.Campos.CodCredito
    );

    this.X30DGRACIA = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramaciones.Campos.X30DGRACIA
    );

    this.X30DGRACIA10 = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramaciones.Campos.X30DGRACIA10
    );

    this.X30DGRACIA20 = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramaciones.Campos.X30DGRACIA20
    );

    this.X30DGRACIA30 = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramaciones.Campos.X30DGRACIA30
    );


    this.PeriodoGracia2Meses = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramaciones.Campos.PeriodoGracia2Meses
    );

    this.PeriodoGracia3Meses = ParseJsom.parsearString(
      elementoItemLista,
      EReprogramaciones.Campos.PeriodoGracia3Meses
    );

    this.Created = ParseJsom.parsearFechaString(
      elementoItemLista,
      EReprogramaciones.Campos.Created
    );

    this.Modified = ParseJsom.parsearFechaString(
      elementoItemLista,
      EReprogramaciones.Campos.Modified
    );

  }


  public setearValoresRest(elementoItemLista: any) {
    this.ID = RestFiltros.parsearNumero(
      elementoItemLista,
      EReprogramaciones.Campos.ID
    );
    this.Title = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramaciones.Campos.Title
    );
    this.Cliente = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramaciones.Campos.Cliente
    );
    this.DNI = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramaciones.Campos.DNI
    );

    this.Producto = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramaciones.Campos.Producto
    );

    this.Celular = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramaciones.Campos.Celular
    );
    this.CodigoVerificadorDNI = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramaciones.Campos.CodigoVerificadorDNI
    );
    this.CodCredito = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramaciones.Campos.CodCredito
    );

    this.X30DGRACIA = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramaciones.Campos.X30DGRACIA
    );
    this.X30DGRACIA10 = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramaciones.Campos.X30DGRACIA10
    );
    this.X30DGRACIA20 = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramaciones.Campos.X30DGRACIA20
    );
    this.X30DGRACIA30 = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramaciones.Campos.X30DGRACIA30
    );

    this.PeriodoGracia2Meses = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramaciones.Campos.PeriodoGracia2Meses
    );
    this.PeriodoGracia3Meses = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramaciones.Campos.PeriodoGracia3Meses
    );




    this.Created = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramaciones.Campos.Created
    );

    this.Modified = RestFiltros.parsearTexto(
      elementoItemLista,
      EReprogramaciones.Campos.Modified
    );




  }

}
