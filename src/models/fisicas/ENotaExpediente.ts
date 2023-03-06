import { EBaseEntidadTransaccional } from '../Base/EBaseEntidadTransaccional';
import { ParametrosNoAdministrables } from '../../genericos/VariablesGlobales';
import { RestFiltros } from '../../genericos/RestFiltros';
import EExpediente from './EExpediente';
import { Deferred } from 'ts-deferred';
import Funciones from '../../genericos/Funciones';
import EArchivoExpediente from '../logicas/EArchivoExpediente';

export default class ENotaExpediente extends EBaseEntidadTransaccional {

  public static Campos = {
    Expediente: ParametrosNoAdministrables.ColumnasSitio.Expediente,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    Nota: ParametrosNoAdministrables.ColumnasSitio.Nota,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
  };
  public static CamposRestExpand = {
    Expediente: ParametrosNoAdministrables.ColumnasSitio.Expediente,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
  };
  public static CamposRest = {
    Nota: ParametrosNoAdministrables.ColumnasSitio.Nota,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
  };

  public static async obtenerNotasExpediente(
    idExpediente: number
  ): Promise<ENotaExpediente[]> {
    const dfd: Deferred<ENotaExpediente[]> = new Deferred<ENotaExpediente[]>();

    const filtroPorIdYEstadoActivo: string = RestFiltros.obtenerFiltroPorLookupIdYEstadoActivo(
      this.Campos.Expediente,
      idExpediente
    );

    const listaCamposExpand = Funciones.obtenerListaCampos(
      ENotaExpediente.CamposRestExpand
    );
    const listaFieldsSelect = Funciones.obtenerListaCampos(ENotaExpediente.CamposRest);

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(ENotaExpediente.CamposRestExpand.UsuarioRegistro),
      RestFiltros.obtenerFieldExpandLookup(ENotaExpediente.CamposRestExpand.Expediente)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterOrderByFechaRegistro,
      ParametrosNoAdministrables.Listas.NotasExpediente,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      filtroPorIdYEstadoActivo
    );

    const nombreCarpeta = `${idExpediente}/${ParametrosNoAdministrables.ModuloDirectivas.CarpetasExpediente.Notas}`;

    Promise.all([
      Funciones.ObtenerElementoPorRest(url),
      Funciones.ObtenerFolderAndFiles(ParametrosNoAdministrables.Bibliotecas.ArchivosExpediente, nombreCarpeta)
    ])
      .then(([resultadoElementosNotas, resultadoFolderNotas]) => {
        if (resultadoElementosNotas.length === 0) {
          dfd.resolve([]);
          return;
        }

        const listaNotas: ENotaExpediente[] = [];
        resultadoElementosNotas.forEach((elemento: any) => {
          const nota = new ENotaExpediente();
          nota.setearValoresConRest(elemento);

          const carpetaNota = resultadoFolderNotas.Folders.filter((folder: any) => {
            return (folder.Name === nota.ID.toString());
          })[0];

          if (carpetaNota) {
            const listaArchivos: EArchivoExpediente[] = [];

            for (const file of carpetaNota.Files) {
              const archivo: EArchivoExpediente = new EArchivoExpediente();
              archivo.setValores(
                file.ListItemAllFields.ID,
                file.ListItemAllFields.Title,
                file.ServerRelativeUrl,
                file.Length
              );

              listaArchivos.push(archivo);
            }
            nota.ListaArchivos = listaArchivos;
          }

          listaNotas.push(nota)
        });

        dfd.resolve(listaNotas);
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public static async obtenerArchivos(
    nombreCarpeta: string
  ): Promise<EArchivoExpediente[]> {
    const dfd: Deferred<EArchivoExpediente[]> = new Deferred<
      EArchivoExpediente[]
      >();

    Funciones.ObtenerFiles(
      ParametrosNoAdministrables.Bibliotecas.ArchivosExpediente,
      nombreCarpeta.toString()
    )
      .then(result => {
        const listaArchivos: EArchivoExpediente[] = [];

        for (const file of result.Files) {
          const archivo: EArchivoExpediente = new EArchivoExpediente();
          archivo.setValores(
            file.ListItemAllFields.ID,
            file.ListItemAllFields.Title,
            file.ServerRelativeUrl,
            file.Length
          );

          listaArchivos.push(archivo);
        }

        dfd.resolve(listaArchivos);
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }

  public ID: number;
  public Nota: string;
  public Expediente: EExpediente;

  public ListaArchivos: EArchivoExpediente[];

  constructor() {
    super();

    this.ID = 0;
    this.Nota = "";
    this.Expediente = new EExpediente();

    this.ListaArchivos = [];
  }

  public setearValoresConRest(elementoItemLista: any): void {
    const campos = ENotaExpediente.Campos;
    this.Nota = RestFiltros.parsearTexto(
      elementoItemLista,
      campos.Nota
    );
    this.Expediente = RestFiltros.parsearLookup(
      elementoItemLista,
      campos.Expediente,
      EExpediente
    );

    this.FechaRegistro = RestFiltros.parsearTexto(
      elementoItemLista,
      campos.FechaRegistro
    );

    this.ID = elementoItemLista.ID;

  
  }
}
