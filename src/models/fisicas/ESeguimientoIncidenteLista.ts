import { EBaseEntidadTransaccional } from "../Base/EBaseEntidadTransaccional";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
// import { EBaseEntidad } from "src/models/Base/EBaseEntidad";
// import ParseJsom from "src/genericos/ParseJsom";
import Funciones from '../../genericos/Funciones';
import { Deferred } from 'ts-deferred';
import ESeguimientoIncidente from "./ESeguimientoIncidente";
import { RestFiltros } from "src/genericos/RestFiltros";
import EArchivoIncidente from "src/models/logicas/EArchivoIncidencia";
import EAvanceImplementacionIncidente from './EAvanceImplementacionIncidente';
import EAmpliacionPlanAccionIncidente from './EAmpliacionPlanAccionIncidente';
import EElementoCombo from '../logicas/EElementoCombo';
import ETareaPlanAccion from './ETareaPlanAccion';
import EElementoPeoplePicker from 'src/models/logicas/EElementoPeoplePicker';

export default class ESeguimientoIncidenteLista extends EBaseEntidadTransaccional {



  public static obtenerFiltroPorIdVencimientoYEstadoActivo(IdVencimiento: number): string {
    const valorFilter = `${ParametrosNoAdministrables.ColumnasSitio.EstadoElemento} eq '${ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo}' and ${ESeguimientoIncidente.CamposExpand.Incidente}/ID eq '${IdVencimiento}'`;
    return valorFilter;
  }

  public static obtenerFiltroPorEstadoActivoYUsuario(IdResponsable: number): string {
    const valorFilter = `${ParametrosNoAdministrables.ColumnasSitio.EstadoElemento} eq '${ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo}' and ${ESeguimientoIncidente.CamposExpand.ResponsableSeguimiento}/ID eq '${IdResponsable}'`;
    return valorFilter;
  }

  public static obtenerFiltroPorEstadoActivo(): string {
    const valorFilter = `${ParametrosNoAdministrables.ColumnasSitio.EstadoElemento} eq '${ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo}'`;
    return valorFilter;
  }


  public static obtenerFiltro(idVencimiento: number, Estados: EElementoCombo[], Responsable: EElementoCombo[], FechaIni: string, FechaFin: string): string {

    const list: string[] = [];
    let valorFilterEstado = "";
    let valorFilterResponsable = "";
    let valorFilterFechaIni = "";
    let valorFilterFechaFin = "";
    let valorFilter = "";

    if (Estados.length > 0) {
      valorFilterEstado = "(";
      Estados.forEach((element, i) => {
        valorFilterEstado = valorFilterEstado + `${ParametrosNoAdministrables.ColumnaSitioIncidenteSeguimiento.EstadoSeguimientoIncidente} eq '${element.Title}'`;
        if (i !== Estados.length - 1) {
          valorFilterEstado = valorFilterEstado + " or ";
        }
      });

      valorFilterEstado = valorFilterEstado + ")";

      list.push(valorFilterEstado);

    }

    if (Responsable.length > 0) {
      valorFilterResponsable = "(";
      Responsable.forEach((element, i) => {
        valorFilterResponsable = valorFilterResponsable + `${ParametrosNoAdministrables.ColumnaSitioIncidenteSeguimiento.ReponsableSeguimiento}/ID eq '${element.ID}'`;
        if (i !== Responsable.length - 1) {
          valorFilterResponsable = valorFilterResponsable + " or ";
        }
      });

      valorFilterResponsable = valorFilterResponsable + ")";
      list.push(valorFilterResponsable);
    }

    if (FechaIni !== "") {
      valorFilterFechaIni = "(";
      valorFilterFechaIni = valorFilterFechaIni + `${ParametrosNoAdministrables.ColumnaSitioIncidenteSeguimiento.FechaRegistro} ge datetime'${FechaIni}T23:59:59'`;
      valorFilterFechaIni = valorFilterFechaIni + ") ";
      list.push(valorFilterFechaIni);

    }
    if (FechaFin !== "") {
      valorFilterFechaFin = "(";
      valorFilterFechaFin = valorFilterFechaFin + `${ParametrosNoAdministrables.ColumnaSitioIncidenteSeguimiento.FechaRegistro} le datetime'${FechaFin}T00:00:00'`;
      valorFilterFechaFin = valorFilterFechaFin + ")";
      list.push(valorFilterFechaFin);
    }

    list.forEach((element, i) => {
      valorFilter = valorFilter + element;
      if (list.length - 1 !== i) {
        valorFilter = valorFilter + " and ";
      } else {
        valorFilter = valorFilter + ` and ${ParametrosNoAdministrables.ColumnasSitio.EstadoElemento} eq '${ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo}' and ${ESeguimientoIncidente.CamposExpand.Incidente}/ID eq '${idVencimiento}'`;
      }
    });

    if (list.length === 0) {
      valorFilter = valorFilter + `${ParametrosNoAdministrables.ColumnasSitio.EstadoElemento} eq '${ParametrosNoAdministrables.ValoresGenericos.ValorEstadoElementoActivo}' and ${ESeguimientoIncidente.CamposExpand.Incidente}/ID eq '${idVencimiento}'`;

    }

    return valorFilter;
  }


  public static getListaSeguimiento(IdVencimiento: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESeguimientoIncidente.Campos);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      ESeguimientoIncidente.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ESeguimientoIncidente.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandLookup(ESeguimientoIncidente.CamposExpand.Incidente),
      RestFiltros.obtenerFieldExpandUsuario(
        ESeguimientoIncidente.CamposExpand.ResponsableSeguimiento
      ),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter,
      ParametrosNoAdministrables.Listas.SeguimientoIncidente,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      this.obtenerFiltroPorIdVencimientoYEstadoActivo(IdVencimiento)
    );
    return endPoint;
  }

  public static getListaSeguimientoFiltrado(idVencimiento: number, Estados: EElementoCombo[], Responsable: EElementoCombo[], FechaIni: string, FechaFin: string) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESeguimientoIncidente.Campos);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      ESeguimientoIncidente.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ESeguimientoIncidente.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandLookup(ESeguimientoIncidente.CamposExpand.Incidente),
      RestFiltros.obtenerFieldExpandUsuario(
        ESeguimientoIncidente.CamposExpand.ResponsableSeguimiento
      ),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilterByID,
      ParametrosNoAdministrables.Listas.SeguimientoIncidente,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      this.obtenerFiltro(idVencimiento, Estados, Responsable, FechaIni, FechaFin)
    );
    return endPoint;
  }


  public static getListaSeguimientoLista(IdResponsable: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESeguimientoIncidente.Campos);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      ESeguimientoIncidente.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ESeguimientoIncidente.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandLookup(ESeguimientoIncidente.CamposExpand.Incidente),
      RestFiltros.obtenerFieldExpandUsuario(
        ESeguimientoIncidente.CamposExpand.ResponsableSeguimiento
      ),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter,
      ParametrosNoAdministrables.Listas.SeguimientoIncidente,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      this.obtenerFiltroPorEstadoActivoYUsuario(IdResponsable)
    );
    return endPoint;
  }


  public static getListaSeguimientoListaPeople(idvencimiento: number) {
    const listaFieldsSelect = Funciones.obtenerListaCampos(ESeguimientoIncidente.Campos);
    const listaCamposExpand = Funciones.obtenerListaCampos(
      ESeguimientoIncidente.CamposExpand
    );

    const listaFieldsExpand = [
      RestFiltros.obtenerFieldExpandUsuario(
        ESeguimientoIncidente.CamposExpand.UsuarioRegistro
      ),
      RestFiltros.obtenerFieldExpandLookup(ESeguimientoIncidente.CamposExpand.Incidente),
      RestFiltros.obtenerFieldExpandUsuario(
        ESeguimientoIncidente.CamposExpand.ResponsableSeguimiento
      ),

    ];

    const listaFieldsSelectYFieldsExpand = listaFieldsSelect.concat(
      listaFieldsExpand
    );

    const endPoint: string = String.format(
      ParametrosNoAdministrables.RestEstructuras.SelectExpandFilter,
      ParametrosNoAdministrables.Listas.SeguimientoIncidente,
      listaFieldsSelectYFieldsExpand.join(","),
      listaCamposExpand.join(","),
      this.obtenerFiltroPorIdVencimientoYEstadoActivo(idvencimiento)
    );
    return endPoint;
  }


  public ObtenerListadoSeguimiento(IdVencimiento: number): Promise<ESeguimientoIncidente[]> {
    const dfd: Deferred<ESeguimientoIncidente[]> = new Deferred<ESeguimientoIncidente[]>();

    const endPoint = ESeguimientoIncidenteLista.getListaSeguimiento(IdVencimiento);

    Funciones.ObtenerElementoPorRest(endPoint)
      .then((resultado) => {
        const Result = (resultado as any[]);
        const Listareturn: any = [];

        Result.forEach((element2, i) => {

          const element = new ESeguimientoIncidente;

          element.Codigo = element2.Codigo;
          element.EstadoSeguimientoIncidente = element2.EstadoSeguimientoIncidente;
          element.ID = element2.ID;
          element.Detalle = element2.Detalle;
          element.Incidente.ID = element2.Incidente.ID;
          element.Incidente.Title = element2.Incidente.Title;
          element.FechaCompromiso = element2.FechaCompromiso;
          element.FechaRegistro = element2.FechaRegistro;
          element.ListaArchivos = [];
          element.RegistroAvanceImplementacion = [];
          element.RegistroAvanceImplementacionGuardar = new EAvanceImplementacionIncidente();
          element.RegistroAmpliacionPlanAccionGuardar = new EAmpliacionPlanAccionIncidente();
          element.RegistroAmpliacionPlanAccion = new EAmpliacionPlanAccionIncidente();
          element.RegistroAprobarAmpliacionPlanAccion = new EAmpliacionPlanAccionIncidente();
          element.RegistroFinalizarPlanAccion = new EAvanceImplementacionIncidente();
          element.RegistroComentario = new EAvanceImplementacionIncidente();
          element.RegistroComentariolista = [];
          element.RegistroNuevaTarea = new ETareaPlanAccion();
          element.RegistroNuevaTarealista = [];
          element.RegistroImplementacionPorVerificar = new EAvanceImplementacionIncidente();

          element.ResponsableSeguimiento = [];

          const responsableSeg = new EElementoPeoplePicker(true);

          responsableSeg.ID = element2.ResponsableSeguimiento.ID;
          responsableSeg.Email = element2.ResponsableSeguimiento.EMail;
          responsableSeg.Title = element2.ResponsableSeguimiento.Title;

          element.ResponsableSeguimiento.push(responsableSeg);

          Listareturn.push(element);

        });





        dfd.resolve(Listareturn);
      })
      .catch(error => {
        dfd.reject(error);
      });



    return dfd.promise;
  }

  public ObtenerListadoSeguimientoFiltrado(idVencimiento: number, Estados: EElementoCombo[], Responsable: EElementoCombo[], FechaIni: string, FechaFin: string): Promise<ESeguimientoIncidente[]> {
    const dfd: Deferred<ESeguimientoIncidente[]> = new Deferred<ESeguimientoIncidente[]>();

    const endPoint = ESeguimientoIncidenteLista.getListaSeguimientoFiltrado(idVencimiento, Estados, Responsable, FechaIni, FechaFin);

    Funciones.ObtenerElementoPorRest(endPoint)
      .then((resultado) => {
        const Result = (resultado as any[]);
        const Listareturn: any = [];

        Result.forEach((element2, i) => {

          const element = new ESeguimientoIncidente;

          element.Codigo = element2.Codigo;
          element.EstadoSeguimientoIncidente = element2.EstadoSeguimientoIncidente;
          element.ID = element2.ID;
          element.Detalle = element2.Detalle;
          element.Incidente.ID = element2.Incidente.ID;
          element.Incidente.Title = element2.Incidente.Title;
          element.FechaCompromiso = element2.FechaCompromiso;
          element.FechaRegistro = element2.FechaRegistro;
          element.ListaArchivos = [];
          element.RegistroAvanceImplementacion = [];
          element.RegistroAvanceImplementacionGuardar = new EAvanceImplementacionIncidente();
          element.RegistroAmpliacionPlanAccionGuardar = new EAmpliacionPlanAccionIncidente();
          element.RegistroAmpliacionPlanAccion = new EAmpliacionPlanAccionIncidente();
          element.RegistroAprobarAmpliacionPlanAccion = new EAmpliacionPlanAccionIncidente();
          element.RegistroFinalizarPlanAccion = new EAvanceImplementacionIncidente();
          element.RegistroComentario = new EAvanceImplementacionIncidente();
          element.RegistroComentariolista = [];
          element.RegistroNuevaTarea = new ETareaPlanAccion();
          element.RegistroNuevaTarealista = [];
          element.RegistroImplementacionPorVerificar = new EAvanceImplementacionIncidente();

          element.ResponsableSeguimiento = [];

          const responsableSeg = new EElementoPeoplePicker(true);

          responsableSeg.ID = element2.ResponsableSeguimiento.ID;
          responsableSeg.Email = element2.ResponsableSeguimiento.EMail;
          responsableSeg.Title = element2.ResponsableSeguimiento.Title;

          element.ResponsableSeguimiento.push(responsableSeg);

          Listareturn.push(element);

        });





        dfd.resolve(Listareturn);
      })
      .catch(error => {
        dfd.reject(error);
      });



    return dfd.promise;
  }


  public ObtenerListadoSeguimientoList(IdResponsable: number): Promise<ESeguimientoIncidente[]> {
    const dfd: Deferred<ESeguimientoIncidente[]> = new Deferred<ESeguimientoIncidente[]>();

    const endPoint = ESeguimientoIncidenteLista.getListaSeguimientoLista(IdResponsable);

    Funciones.ObtenerElementoPorRest(endPoint)
      .then((resultado) => {
        const Result = (resultado as any[]);
        const Listareturn: any = [];

        Result.forEach((element2, i) => {

          const element = new ESeguimientoIncidente;

          element.Codigo = element2.Codigo;
          element.ID = element2.ID;
          element.Detalle = element2.Detalle;
          element.Incidente.ID = element2.Incidente.ID;
          element.Incidente.Title = element2.Incidente.Title;
          element.FechaCompromiso = element2.FechaCompromiso;
          element.FechaRegistro = element2.FechaRegistro;
          element.ListaArchivos = [];
          element.RegistroAvanceImplementacion = [];
          element.RegistroAvanceImplementacionGuardar = new EAvanceImplementacionIncidente();
          element.RegistroAmpliacionPlanAccionGuardar = new EAmpliacionPlanAccionIncidente();
          element.RegistroAmpliacionPlanAccion = new EAmpliacionPlanAccionIncidente();
          element.RegistroFinalizarPlanAccion = new EAvanceImplementacionIncidente();
          element.RegistroComentario = new EAvanceImplementacionIncidente();

          element.ResponsableSeguimiento = [];

          const responsableSeg = new EElementoPeoplePicker(true);

          responsableSeg.ID = element2.ResponsableSeguimiento.ID;
          responsableSeg.Email = element2.ResponsableSeguimiento.EMail;
          responsableSeg.Title = element2.ResponsableSeguimiento.Title;

          element.ResponsableSeguimiento.push(responsableSeg);

          Listareturn.push(element);

        });
        dfd.resolve(Listareturn);
      })
      .catch(error => {
        dfd.reject(error);
      });
    return dfd.promise;
  }


  public ObtenerListadoSeguimientoPeople(idvencimiento: number): Promise<ESeguimientoIncidente[]> {
    const dfd: Deferred<ESeguimientoIncidente[]> = new Deferred<ESeguimientoIncidente[]>();

    const endPoint = ESeguimientoIncidenteLista.getListaSeguimientoListaPeople(idvencimiento);

    Funciones.ObtenerElementoPorRest(endPoint)
      .then((resultado) => {
        const Result = (resultado as any[]);
        const Listareturn: any = [];

        Result.forEach((element2, i) => {
          const element = new ESeguimientoIncidente;

          element.Codigo = element2.Codigo;
          element.ID = element2.ID;
          element.Detalle = element2.Detalle;
          element.Incidente.ID = element2.Incidente.ID;
          element.Incidente.Title = element2.Incidente.Title;
          element.FechaCompromiso = element2.FechaCompromiso;
          element.FechaRegistro = element2.FechaRegistro;
          element.ListaArchivos = [];
          element.RegistroAvanceImplementacion = [];
          element.RegistroAvanceImplementacionGuardar = new EAvanceImplementacionIncidente();
          element.RegistroAmpliacionPlanAccionGuardar = new EAmpliacionPlanAccionIncidente();
          element.RegistroAmpliacionPlanAccion = new EAmpliacionPlanAccionIncidente();
          element.RegistroFinalizarPlanAccion = new EAvanceImplementacionIncidente();
          element.RegistroComentario = new EAvanceImplementacionIncidente();

          element.ResponsableSeguimiento = [];

          const responsableSeg = new EElementoPeoplePicker(true);

          responsableSeg.ID = element2.ResponsableSeguimiento.ID;
          responsableSeg.Email = element2.ResponsableSeguimiento.EMail;
          responsableSeg.Title = element2.ResponsableSeguimiento.Title;

          element.ResponsableSeguimiento.push(responsableSeg);

          Listareturn.push(element);

        });
        dfd.resolve(Listareturn);
      })
      .catch(error => {
        dfd.reject(error);
      });
    return dfd.promise;
  }




  public async obtenerArchivos(
    nombreCarpeta: string,
    FolderPader: string,
    item: ESeguimientoIncidente
  ): Promise<EArchivoIncidente[]> {
    const dfd: Deferred<EArchivoIncidente[]> = new Deferred<
      EArchivoIncidente[]
    >();

    Funciones.ObtenerFiles(
      ParametrosNoAdministrables.Bibliotecas.ArchivosIncidente + "/" + FolderPader,
      nombreCarpeta
    )
      .then(result => {
        const listaArchivos: EArchivoIncidente[] = [];

        for (const file of result.Files) {
          const archivo: EArchivoIncidente = new EArchivoIncidente();
          archivo.setValores(
            file.ListItemAllFields.ID,
            file.ListItemAllFields.Title,
            file.ServerRelativeUrl,
            file.length
          );

          listaArchivos.push(archivo);
        }

        item.ListaArchivos = listaArchivos;
        item.esEditar = false;
        dfd.resolve(listaArchivos);
      })
      .catch(error => {
        dfd.reject(error);
      });

    return dfd.promise;
  }




}
