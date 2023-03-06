import { EBaseEntidadTransaccional } from '../Base/EBaseEntidadTransaccional';
import { ParametrosNoAdministrables } from '../../genericos/VariablesGlobales';
import { RestFiltros } from '../../genericos/RestFiltros';
import { Deferred } from 'ts-deferred';
import Funciones from '../../genericos/Funciones';
import EArchivoExpediente from '../logicas/EArchivoExpediente';
import ENorma from './ENorma';

export default class ENotaNorma extends EBaseEntidadTransaccional {

  public static Campos = {
    Norma: ParametrosNoAdministrables.ColumnasSitio.Norma,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    Nota: ParametrosNoAdministrables.ColumnasSitio.Nota,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
  };
  public static CamposRestExpand = {
    Norma: ParametrosNoAdministrables.ColumnasSitio.Norma,
    UsuarioRegistro: ParametrosNoAdministrables.ColumnasSitio.UsuarioRegistro,
  };
  public static CamposRest = {
    Nota: ParametrosNoAdministrables.ColumnasSitio.Nota,
    FechaRegistro: ParametrosNoAdministrables.ColumnasSitio.FechaRegistro,
    ID: ParametrosNoAdministrables.ColumnasSitio.ID,
  };

  public static async obtenerNotas(
    idRegistro: number
  ): Promise<ENotaNorma[]> {
    const dfd: Deferred<ENotaNorma[]> = new Deferred<ENotaNorma[]>();

    const filtroPorIdYEstadoActivo: string = RestFiltros.obtenerFiltroPorLookupIdYEstadoActivo(
      this.Campos.Norma,
      idRegistro
    );

    const listaCamposExpand = Funciones.obtenerListaCampos(
      ENotaNorma.CamposRestExpand
    );
    const listaFieldsSelect = Funciones.obtenerListaCampos(ENotaNorma.CamposRest);

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(ENotaNorma.CamposRestExpand.UsuarioRegistro),
      RestFiltros.obtenerFieldExpandLookup(ENotaNorma.CamposRestExpand.Norma)
    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const url: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterOrderByFechaRegistro,
      ParametrosNoAdministrables.Listas.NotasNormas,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      filtroPorIdYEstadoActivo
    );

    const nombreCarpeta = `${idRegistro}/${ParametrosNoAdministrables.ModuloNormas.Carpetas.Notas}`;

    Promise.all([
      Funciones.ObtenerElementoPorRest(url),
      Funciones.ObtenerFolderAndFiles(ParametrosNoAdministrables.Bibliotecas.ArchivosNormas, nombreCarpeta)
    ])
      .then(([resultadoElementosNotas, resultadoFolderNotas]) => {
        if (resultadoElementosNotas.length === 0) {
          dfd.resolve([]);
          return;
        }

        const listaNotas: ENotaNorma[] = [];
        resultadoElementosNotas.forEach((elemento: any) => {
          const nota = new ENotaNorma();
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
      ParametrosNoAdministrables.Bibliotecas.ArchivosNormas,
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
  public Norma: ENorma;

  public ListaArchivos: EArchivoExpediente[];

  constructor() {
    super();

    this.ID = 0;
    this.Nota = "";
    this.Norma = new ENorma();

    this.ListaArchivos = [];
  }

  public setearValoresConRest(elementoItemLista: any): void {
    const campos = ENotaNorma.Campos;
    this.Nota = RestFiltros.parsearTexto(
      elementoItemLista,
      campos.Nota
    );
    this.Norma = RestFiltros.parsearLookup(
      elementoItemLista,
      campos.Norma,
      ENorma
    );

    this.FechaRegistro = RestFiltros.parsearTexto(
      elementoItemLista,
      campos.FechaRegistro
    );

    this.ID = elementoItemLista.ID;


  }
}
