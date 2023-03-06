import { EBaseEntidadTransaccional } from "../Base/EBaseEntidadTransaccional";
import { RestFiltros } from "../../genericos/RestFiltros";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { Deferred } from 'ts-deferred';
import Funciones from '../../genericos/Funciones';
import ENorma from './ENorma';

export default class ENormaImpactada extends EBaseEntidadTransaccional {
  public static Campos = {
    Detalle: ParametrosNoAdministrables.ColumnasSitio.Detalle,
    FechaDerogar: ParametrosNoAdministrables.ColumnasSitio.FechaDerogar,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    Norma: ParametrosNoAdministrables.ColumnasSitio.Norma,
    NormaImpactada: ParametrosNoAdministrables.ColumnasSitio.NormaImpactada,
    NormaTexto: ParametrosNoAdministrables.ColumnasSitio.NormaTexto,
    TipoNormaImpactada: ParametrosNoAdministrables.ColumnasSitio.TipoNormaImpactada,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro
  };

  public static CamposRest = {
    Detalle: ParametrosNoAdministrables.ColumnasSitio.Detalle,
    FechaDerogar: ParametrosNoAdministrables.ColumnasSitio.FechaDerogar,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    NormaTexto: ParametrosNoAdministrables.ColumnasSitio.NormaTexto,
    TipoNormaImpactada: ParametrosNoAdministrables.ColumnasSitio.TipoNormaImpactada,
    'NormaImpactada/NombreDocumento': "NormaImpactada/NombreDocumento",
    'NormaImpactada/NumeroNorma': "NormaImpactada/NumeroNorma",
  };
  public static CamposRestExpand = {
    Norma: ParametrosNoAdministrables.ColumnasSitio.Norma,
    NormaImpactada: ParametrosNoAdministrables.ColumnasSitio.NormaImpactada,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
    'NormaImpactada/NombreDocumento': "NormaImpactada/NombreDocumento",
    'NormaImpactada/NumeroNorma': "NormaImpactada/NumeroNorma",
  };

  public static getValoresGuardarDerogacionTotal(
    Detalle: string,
    FechaDerogar: Date,
    NormaId: number,
    NormaImpactadaId: number,
    NormaTexto: string,
    TipoNormaImpactada: string): any {
    const datos: any = {
      Detalle,
      FechaDerogar,
      NormaId,
      NormaTexto,
      TipoNormaImpactada,
    }

    if (NormaImpactadaId > 0) {
      datos.NormaImpactadaId = NormaImpactadaId;
    }

    return datos;
  }

  public static getValoresGuardarImpactoParcial(
    Detalle: string,
    NormaId: number,
    NormaImpactadaId: number,
    NormaTexto: string,
    TipoNormaImpactada: string): any {
    const datos: any = {
      Detalle,
      FechaDerogar: null,
      NormaId,
      NormaTexto,
      TipoNormaImpactada,
    }

    if (NormaImpactadaId > 0) {
      datos.NormaImpactadaId = NormaImpactadaId;
    }

    return datos;
  }

  public static async obtener(
    idNorma: number
  ): Promise<ENormaImpactada[]> {
    const dfd: Deferred<ENormaImpactada[]> = new Deferred<ENormaImpactada[]>();

    const filtroPorIdYEstadoActivo: string = RestFiltros.obtenerFiltroPorLookupIdYEstadoActivo(
      this.Campos.Norma,
      idNorma
    );

    const listaCamposExpand = Funciones.obtenerListaCampos(
      ENormaImpactada.CamposRestExpand
    );
    const listaFieldsSelect = Funciones.obtenerListaCampos(ENormaImpactada.CamposRest);

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(ENormaImpactada.CamposRestExpand.UsuarioRegistro),
      RestFiltros.obtenerFieldExpandLookup(ENormaImpactada.CamposRestExpand.Norma),
      RestFiltros.obtenerFieldExpandLookup(ENormaImpactada.CamposRestExpand.NormaImpactada),
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterOrderByFechaRegistro,
      ParametrosNoAdministrables.Listas.NormasImpactadas,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      filtroPorIdYEstadoActivo
    );

    Promise.all([
      Funciones.ObtenerElementoPorRest(url)
    ])
      .then(([resultados]) => {
        if (resultados.length === 0) {
          dfd.resolve([]);
          return;
        }

        const registros: ENormaImpactada[] = [];
        resultados.forEach((elemento: any) => {
          const registro = new ENormaImpactada();
          registro.setearValoresConRest(elemento);

          registros.push(registro);
        });

        dfd.resolve(registros);
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }


  public Detalle: string;
  public FechaDerogar: string;
  public Norma: ENorma;
  public NormaImpactada: ENorma;
  public NormaTexto: string;
  public TipoNormaImpactada: string;

  public Eliminado: boolean;

  constructor() {
    super();
    this.Detalle = "";
    this.FechaDerogar = "";
    this.Norma = new ENorma();
    this.NormaImpactada = new ENorma();
    this.NormaTexto = "";
    this.TipoNormaImpactada = "";

    this.Eliminado = false;
  }

  public setearValoresConRest(elementoItemLista: any): void {
    const campos = ENormaImpactada.Campos;
    this.Detalle = RestFiltros.parsearTexto(
      elementoItemLista,
      campos.Detalle
    );
    this.FechaDerogar = RestFiltros.parsearTexto(
      elementoItemLista,
      campos.FechaDerogar
    );
    this.Norma = RestFiltros.parsearLookup(
      elementoItemLista,
      campos.Norma,
      ENorma
    );
    this.NormaImpactada = RestFiltros.parsearLookup(
      elementoItemLista,
      campos.NormaImpactada,
      ENorma
    );

    if (this.NormaImpactada && this.NormaImpactada.ID > 0) {
      this.NormaImpactada.Descripcion = elementoItemLista['NormaImpactada'][ENorma.Campos.Descripcion];
      this.NormaImpactada.NumeroNorma = elementoItemLista['NormaImpactada'][ENorma.Campos.NumeroNorma];
    }

    this.NormaTexto = RestFiltros.parsearTexto(
      elementoItemLista,
      campos.NormaTexto
    );
    this.TipoNormaImpactada = RestFiltros.parsearTexto(
      elementoItemLista,
      campos.TipoNormaImpactada
    );

    this.ID = elementoItemLista.ID;

    this.FechaRegistro = RestFiltros.parsearTexto(
      elementoItemLista,
      campos.FechaRegistro
    );

  }


}
