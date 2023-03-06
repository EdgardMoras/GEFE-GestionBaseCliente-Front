import * as React from "react";
import PaginaBase from "src/components/ui/pagecontrol/PaginaBase";
import Funciones from "src/genericos/Funciones";
import ContenedorControlFormatoA from 'src/components/ui/formcontrol/ContenedorControlFormatoA';
import ControlModal from 'src/components/ui/formcontrol/ControlModal';
// import ControlPeoplePicker from '../../../ui/formcontrol/ControlPeoplePicker';
import ControlCargarArchivos from 'src/components/ui/formcontrol/ControlCargarArchivos';
import EArchivo from 'src/models/logicas/EArchivoIncidencia';
import * as XLSX from 'xlsx';
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import EExcelProceso from 'src/models/logicas/EExcelProceso';
import ControlSelect from 'src/components/ui/formcontrol/ControlSelect';
import EElementoCombo from 'src/models/logicas/EElementoCombo';
import EExcelProcesoRedesSociales from 'src/models/logicas/EExcelProcesoRedesSociales';
import EExcelProcesoMotocorp from 'src/models/logicas/EExcelProcesoMotocorp';
import EExcelProcesoPremiun from 'src/models/logicas/EExcelProcesoPremiun';
import EExcelProcesoConverse from "src/models/logicas/EExcelProcesoConverse";
import EExcelProcesoEspecialistas from "src/models/logicas/EExcelProcesoEspecialistas";
import EExcelProcesoReenganche from "src/models/logicas/EExcelProcesoReenganche";
// import { loadPageContext } from "sp-rest-proxy/dist/utils/env";
// import {
//   Web,
//   // sp
//   // ItemAddResult,
//   // ItemUpdateResult,
//   // ODataDefaultParser
// } from "sp-pnp-js/lib/pnp";



export interface IPropsNuevaCarga {
  eventoOcultarPopup: (iniciarBusqueda: boolean) => void;
}

export interface IStateNuevaCarga {
  campos: {
    Descripcion: string;
    Base: EElementoCombo;
    Tipo: EElementoCombo;
    ListaArchivos: EArchivo[]
  };


  lineas: EExcelProceso[],

  ListaBase: EElementoCombo[],
  ListTipo: EElementoCombo[],


}

class NuevaCarga extends PaginaBase<
  IPropsNuevaCarga,
  IStateNuevaCarga
> {
  public mensajes = {
    Informativo_SeRegistroProcesoCallCenter: "Se ha procesado el documento correctamente."
  };


  private childrenControlCargarArchivos: React.RefObject<ControlCargarArchivos>;

  constructor(props: IPropsNuevaCarga) {
    super(props);


    this.state = {
      campos: {
        Descripcion: "",
        ListaArchivos: [],
        Base: new EElementoCombo,
        Tipo: new EElementoCombo
      },
      lineas: [],
      ListaBase: [],
      ListTipo: []



    };
  }

  public componentDidMount() {
    this.inicializarControles();
  }

  public inicializarControles = () => {
    this.MostrarProgreso();

    ParametrosNoAdministrables.EstadosSolicitud.Base.map((element2, i) => {
      this.state.ListaBase.push(new EElementoCombo(i + 1, element2));
    });

    ParametrosNoAdministrables.EstadosSolicitud.Tipo.map((element2, i) => {
      this.state.ListTipo.push(new EElementoCombo(i + 1, element2));
    });

    this.setState(this.state);
    this.OcultarProgreso();

  };


  public validarCampos() {
    let camposValidos = true;
    let countarchivosactivos: number = 0;

    this.state.campos.ListaArchivos.forEach(element => {
      if (!element.Eliminado) {
        countarchivosactivos = countarchivosactivos + 1;
      }
    });


    if (countarchivosactivos === 0) {
      camposValidos = false;
    }

    if (
      this.state.campos.Descripcion === ""
    ) {
      camposValidos = false;
    }

    if (
      this.state.campos.Base.Title === "Seleccione"
    ) {
      camposValidos = false;
    }

    if (
      this.state.campos.Tipo.Title === "Seleccione"
    ) {
      camposValidos = false;
    }


    return camposValidos;
  }


  // public guardarProyecto = () => {
  //   const camposValidados = this.validarCampos();
  //   if (!camposValidados) {
  //     this.MostrarMensajeInformativo(
  //       ParametrosNoAdministrables.Mensajes
  //         .mensajeInformativoCompletarCamposObligatorios
  //     );
  //     return;
  //   }

  //   this.MostrarProgreso();
  //   const correlativo = new ECorrelativos();
  //   correlativo.obtenerCorrelativoProyecto().then(codigoProyecto => {

  //     const usuarioRegistro: number[] = [];
  //     // const UsuarioResponsable: number[] = [];

  //     usuarioRegistro.push(_spPageContextInfo.userId);

  //     // this.state.campos.UsuarioResponsable.map((elemento) => {

  //     //   UsuarioResponsable.push(elemento.ID);
  //     // })

  //     const expediente = new EExpedienteLogico()
  //     expediente.setValoresNuevoProyecto(
  //       "Registrado",
  //       this.state.campos.NombreProyecto,
  //       usuarioRegistro, this.state.campos.Descripcion, this.state.campos.Area.ID, codigoProyecto)



  //     const promesaGuardarProyecto: Array<Promise<string>> = [];
  //     promesaGuardarProyecto.push(
  //       Funciones.GuardarElemento(
  //         "Proyecto",
  //         expediente.getValoresNuevoProyecto()
  //       )
  //     );




  //     Promise.all(promesaGuardarProyecto)
  //       .then(([resultadoProceso]) => {
  //         let resultadoAgregarProyecto: any = [];

  //         resultadoAgregarProyecto = resultadoProceso;

  //         const idProyecto: number = resultadoAgregarProyecto.ID;

  //         expediente.setValoreRegistroActividadNuevoProyecto(
  //           usuarioRegistro,
  //           "Se realizo la creación del proyecto: " + codigoProyecto,
  //           idProyecto)

  //         Funciones.GuardarElemento(
  //           "Actividad",
  //           expediente.getValoresRegistroActividadNuevoProyecto()
  //         );

  //         // const usuariosRes: string[] = [];

  //         // this.state.campos.UsuarioResponsable.forEach(usurespon => {
  //         //   usuariosRes.push(usurespon.Title);
  //         // });

  //         const usuarioCorreo: string[] = [];

  //         this.state.campos.UsuarioResponsable.forEach(usurespon => {
  //           usuarioCorreo.push(usurespon.Email);
  //         });



  //         Correos.enviarCorreoNuevoProyecto(codigoProyecto, this.state.campos.Descripcion, "", ParametrosNoAdministrables.ModuloDirectivas.Grupos.Grupo1, "", usuarioRegistro)
  //           .then(ResultadoCorreo => {



  //             EProyecto.crearCarpetasProyecto(
  //               idProyecto
  //             )
  //               .then(resultadoCrearCarpeta => {

  //                 EProyecto.crearArchivosSeguimientoProyecto(
  //                   idProyecto, codigoProyecto
  //                 ).then(resultadoCrearCarpeta2 => {
  //                   this.OcultarProgreso();

  //                   this.MostrarMensajeInformativoConAccion(
  //                     this.mensajes.Informativo_SeRegistroProcesoCallCenter,
  //                     () => {
  //                       this.props.eventoOcultarPopup(true);
  //                     }
  //                   );

  //                 }).catch((error: any) => {
  //                   this.MostrarMensajeError(
  //                     "NuevoProyecto.tsx - CrearCarpeta",
  //                     error
  //                   );
  //                 });


  //               })
  //               .catch((error: any) => {
  //                 this.MostrarMensajeError(
  //                   "NuevoProyecto.tsx - CrearCarpeta",
  //                   error
  //                 );
  //               });
  //           }).catch((error: any) => {
  //             this.MostrarMensajeError(
  //               "NuevoProyecto.tsx - CrearCarpeta",
  //               error
  //             );
  //           });
  //       })
  //       .catch(error => {
  //         this.MostrarMensajeError("NuevoProyecto.tsx - CrearProyecto", error);
  //       });

  //   })
  //     .catch(err => {
  //       this.MostrarMensajeError(
  //         "Nuevo Proyecto" + " - obtenerDatosMaestros",
  //         err
  //       );
  //     });

  // };


  public eventoChangeCargarArchivos = (nombreControl: string, listaArchivos: EArchivo[], idIncidente?: number, idIncidenteTarea?: number) => {

    if (nombreControl === "caArchivos") {

      const Registro = Object.assign({}, this.state.campos);

      console.dir(listaArchivos);

      const listaArchivosIncidente: EArchivo[] = listaArchivos.map((archivo: EArchivo) => {
        const archivoIncidente = new EArchivo();
        archivoIncidente.setValoresDesdeEArchivo(archivo);
        return archivoIncidente;
      });

      Registro.ListaArchivos = listaArchivosIncidente;

      this.setState({ campos: Registro });

      // const readXlsxFile = require('read-excel-file/node');

      // readXlsxFile(listaArchivos[0]).then((rows: any) => {
      //   console.dir(rows);
      // })




    }
  }

  public guardarProyecto = () => {

    const camposValidados = this.validarCampos();
    if (!camposValidados) {
      this.MostrarMensajeInformativo(
        ParametrosNoAdministrables.Mensajes
          .mensajeInformativoCompletarCamposObligatorios
      );
      return;
    }

    this.MostrarMensajeConfirmacion(
      "¿Esta seguro que desea cargar el documento seleccionado?",
      () => {

        this.MostrarProgreso();

        let rutaarchivo = "";
        if (this.state.campos.ListaArchivos.length > 0) {
          const promesaCargar: Array<Promise<string>> = [];


          this.state.campos.ListaArchivos
            .filter(archivo => {
              return !archivo.Eliminado;
            }).forEach(archivo => {
              const datos = {
                Title: archivo.Nombre
              };


              const fecha = new Date();
              const fechahora =
                fecha.getDay() +
                "" +
                fecha.getDate() +
                "" +
                fecha.getFullYear() +
                "" +
                fecha.getHours() +
                "" +
                fecha.getMinutes() +
                "" +
                fecha.getSeconds();

              rutaarchivo = ParametrosNoAdministrables.ValoresGenericos.UrlSitio + "/Cargas/" + fechahora + "_" + archivo.Nombre;


              promesaCargar.push(
                Funciones.AdjuntarArchivoRaiz(
                  "Cargas",
                  archivo.ArrayBufferArchivo,
                  datos,
                  fechahora + "_" + archivo.Nombre
                )
              );
            });

          Promise.all(promesaCargar).then(([resultadoProceso]) => {

            console.dir(resultadoProceso);


            const reader = new FileReader();
            reader.readAsArrayBuffer(this.state.campos.ListaArchivos[0].ArrayBufferArchivo);
            reader.onload = (e) => {

              let formatoCorrecto: boolean = false;
              const wb = XLSX.read(reader.result, { type: 'array', cellDates: true, dateNF: 'dd/mm/yyyy;@' });
              /* Get first worksheet */
              const wsname = wb.SheetNames[0];
              const ws = wb.Sheets[wsname];
              /* Convert array of arrays */
              const data = XLSX.utils.sheet_to_json(ws);


              if (this.state.campos.Base.Title === "RedesSociales") {
                const lineas: EExcelProcesoRedesSociales[] = [];
                data.forEach((element: any) => {

                  const lineasbe = new EExcelProcesoRedesSociales();

                  lineasbe.Empresa = element.Empresa;
                  lineasbe.Canal = element.Canal;
                  lineasbe.CONOSINDNI = element.CON_O_SIN_DNI;
                  lineasbe.Nombre = element.Nombre;
                  lineasbe.Dirección = element.Dirección;
                  lineasbe.Correo = element.Correo;
                  lineasbe.Departamento = element.Departamento;
                  lineasbe.Provincia = element.Provincia;
                  lineasbe.Distrito = element.Distrito;
                  lineasbe.Telefono = element.Telefono;
                  lineasbe.Celular = element.Celular;
                  lineasbe.Comentariodelmotivoenqueproductoestainteresadoetc = element.Comentario_del_motivo_en_que_producto_está_interesado_etc;
                  lineasbe.NOMBREVENDEDOR = element.NOMBRE_VENDEDOR;
                  lineasbe.Tienda = element.Tienda;
                  lineasbe.Codtienda = element.Cod_tienda;
                  lineasbe.Region = element.Region;
                  lineasbe.DNIVENDEDOR = element.DNI_VENDEDOR;
                  lineasbe.EstadoGestion = element.Estado_Gestion;
                  lineasbe.Base = element.Base;
                  lineasbe.FechaGestion = element.Fecha_Gestion;
                  lineasbe.ComentariosGestion = element.Comentarios_Gestion;
                  lineasbe.FechaRegistro = element.Fecha_Registro;
                  lineasbe.Ciudad = element.Ciudad;
                  lineasbe.CodUbigeo = element.Cod_Ubigeo;
                  lineasbe.CodMicrozona = element.Cod_Microzona;
                  lineasbe.CODVENDEDOR = element.COD_VENDEDOR;
                  lineasbe.Recurrencia = element.Recurrencia;
                  lineasbe.Tienda = element.Tienda;
                  lineasbe.Codtienda = element.Cod_tienda;
                  lineasbe.CodCentro = element.Cod_Centro;



                  if (lineasbe.Empresa !== undefined) {
                    console.dir(lineasbe.Empresa);
                    formatoCorrecto = true;
                  }
                  lineas.push(lineasbe);

                });


                console.dir(formatoCorrecto);

                if (formatoCorrecto) {

                  const oDatos = {
                    "lstCargaRedesSociales": lineas,
                    "lstCargaConvenios": [],
                    "lstCargaPremiun": [],
                    "lstCargaMotocorp": [],
                    "Descripcion": this.state.campos.Descripcion,
                    "idUsuario": _spPageContextInfo.userId,
                    "RutaArchivo": rutaarchivo,
                    "Base": this.state.campos.Base.Title,
                    "TipoCarga": this.state.campos.Tipo.Title
                  } as any


                  Funciones.EnviarDatosPost(ParametrosNoAdministrables.ValoresGenericos.urlServicio + "appGBC/sharepoint/cargardatos", oDatos)
                    .then((dataResult) => {
                      console.dir(dataResult);
                    });

                  this.OcultarProgreso();

                  this.MostrarMensajeInformativoConAccion(
                    "Se ha cargado el archivo correctamente y estara siendo procesado, puede visualizar su estado en la bandeja.",
                    () => {
                      this.props.eventoOcultarPopup(true);
                    }
                  );

                } else {

                  this.MostrarMensajeInformativoConAccion(
                    "Formato incorrecto, por favor de volver a intentar.",
                    () => {
                      this.props.eventoOcultarPopup(true);
                    }
                  );
                }


              } else if (this.state.campos.Base.Title === "Convenios") {
                const lineas: EExcelProceso[] = [];
                data.forEach((element: any) => {

                  const lineasbe = new EExcelProceso();

                  lineasbe.Empresa = element.Empresa;
                  lineasbe.NombreTienda = element.Nombre_Tienda;
                  lineasbe.ApellidoPaterno = element.Apellido_Paterno;
                  lineasbe.ApellidoMaterno = element.Apellido_Materno;
                  lineasbe.DniCliente = element.Dni_Cliente;
                  lineasbe.NombresCliente = element.Nombres_Cliente;
                  lineasbe.PERFIL = element.PERFIL;
                  lineasbe.Direccion = element.Direccion;
                  lineasbe.NumDireccion = element.Num_Direccion;
                  lineasbe.Departamento = element.Departamento;
                  lineasbe.Provincia = element.Provincia;
                  lineasbe.Distrito = element.Distrito;
                  lineasbe.Telefono = element.Telefono;
                  lineasbe.Celular = element.Celular;
                  lineasbe.CODAGENCIA = element.COD_AGENCIA;
                  lineasbe.AGENCIA = element.AGENCIA;
                  lineasbe.ZONA = element.ZONA;
                  lineasbe.MAF = element.MAF;
                  lineasbe.NombreVendedor = element.Nombre_Vendedor;
                  lineasbe.Region = element.Region;
                  lineasbe.DniVendedor = element.Dni_Vendedor;
                  lineasbe.Estadogestion = element.Estado_gestion;
                  lineasbe.NombredeBase = element.Nombre_de_Base;
                  lineasbe.FechaGestion = element.Fecha_Gestion;
                  lineasbe.Comentarios = element.Comentarios;
                  lineasbe.Adm = element.Adm;
                  lineasbe.FechaRegistro = element.Fecha_Registro;
                  lineasbe.CODUBIGEO = element.CODUBIGEO;
                  lineasbe.CodMicrozona = element.Cod_Microzona;
                  lineasbe.codigovendedor = element.codigo_vendedor;
                  lineasbe.Recurrencia = element.Recurrencia;
                  lineasbe.CodCentro = element.Cod_Centro;




                  if (lineasbe.Empresa !== undefined) {
                    console.dir(lineasbe.Empresa);
                    formatoCorrecto = true;
                  }
                  lineas.push(lineasbe);

                });


                console.dir(formatoCorrecto);

                if (formatoCorrecto) {

                  const oDatos = {
                    "lstCargaRedesSociales": [],
                    "lstCargaConvenios": lineas,
                    "lstCargaPremiun": [],
                    "lstCargaMotocorp": [],
                    "Descripcion": this.state.campos.Descripcion,
                    "idUsuario": _spPageContextInfo.userId,
                    "RutaArchivo": rutaarchivo,
                    "Base": this.state.campos.Base.Title,
                    "TipoCarga": this.state.campos.Tipo.Title
                  } as any


                  Funciones.EnviarDatosPost(ParametrosNoAdministrables.ValoresGenericos.urlServicio + "appGBC/sharepoint/cargardatos", oDatos)
                    .then((dataResult) => {
                      console.dir(dataResult);
                    });

                  this.OcultarProgreso();

                  this.MostrarMensajeInformativoConAccion(
                    "Se ha cargado el archivo correctamente y estara siendo procesado, puede visualizar su estado en la bandeja.",
                    () => {
                      this.props.eventoOcultarPopup(true);
                    }
                  );

                } else {

                  this.MostrarMensajeInformativoConAccion(
                    "Formato incorrecto, por favor de volver a intentar.",
                    () => {
                      this.props.eventoOcultarPopup(true);
                    }
                  );
                }

              }
              else if (this.state.campos.Base.Title === "Motocorp") {
                const lineas: EExcelProcesoMotocorp[] = [];
                data.forEach((element: any) => {

                  const lineasbe = new EExcelProcesoMotocorp();

                  lineasbe.CODTIENDA = element.CODTIENDA;
                  lineasbe.TIENDAORIGINAL = element.TIENDAORIGINAL;
                  lineasbe.RETAIL = element.RETAIL;
                  lineasbe.Zona = element.Zona;
                  lineasbe.PlazaCreditos = element.Plaza_Creditos;
                  lineasbe.CMEdisponible = element.CME_disponible;
                  lineasbe.Region = element.Region;
                  lineasbe.DNI = element.DNI;
                  lineasbe.NombresCompletos = element.Nombres_Completos;
                  lineasbe.NombreTiendaRetail = element.Nombre_TiendaRetail;
                  lineasbe.Perfil = element.Perfil;
                  lineasbe.Premium = element.Premium;
                  lineasbe.Direccion = element.Direccion;
                  lineasbe.DEPARTAMENTO = element.DEPARTAMENTO;
                  lineasbe.PROVINCIA = element.PROVINCIA;
                  lineasbe.DISTRITO = element.DISTRITO;
                  lineasbe.Telefono = element.Telefono;
                  lineasbe.CELULAR1 = element.CELULAR1;
                  lineasbe.CELULAR2 = element.CELULAR2;
                  lineasbe.CELULAR3 = element.CELULAR3;
                  lineasbe.CodVenta = element.Cod_Venta;
                  lineasbe.NOMBREVENDEDOR = element.NOMBRE_VENDEDOR;
                  lineasbe.TiendaUltimaCompraRef = element.Tienda_UltimaCompra_Ref;
                  lineasbe.REG = element.REG;
                  lineasbe.DNIVENDEDOR = element.DNI_VENDEDOR;
                  lineasbe.Estadogestion = element.Estado_gestion;
                  lineasbe.BASE = element.BASE;
                  lineasbe.FechaGestion = element.Fecha_Gestion;
                  lineasbe.Comentarios = element.Comentarios;
                  lineasbe.FechaRegistro = element.Fecha_Registro;
                  lineasbe.CodUbigeo = element.Cod_Ubigeo;
                  lineasbe.CodMicrozona = element.Cod_Microzona;
                  lineasbe.CODIGOVENDEDOR = element.CODIGO_VENDEDOR;
                  lineasbe.Recurrencia = element.Recurrencia;
                  lineasbe.CodAgenciaMC = element.Cod_Agencia_MC;
                  lineasbe.Agencia = element.Agencia;
                  lineasbe.CodCentro = element.Cod_Centro;




                  if (lineasbe.CODTIENDA !== undefined) {
                    console.dir(lineasbe.CODTIENDA);
                    formatoCorrecto = true;
                  }
                  lineas.push(lineasbe);

                });


                console.dir(formatoCorrecto);

                if (formatoCorrecto) {

                  const oDatos = {
                    "lstCargaRedesSociales": [],
                    "lstCargaConvenios": [],
                    "lstCargaPremiun": [],
                    "lstCargaMotocorp": lineas,
                    "Descripcion": this.state.campos.Descripcion,
                    "idUsuario": _spPageContextInfo.userId,
                    "RutaArchivo": rutaarchivo,
                    "Base": this.state.campos.Base.Title,
                    "TipoCarga": this.state.campos.Tipo.Title
                  } as any


                  Funciones.EnviarDatosPost(ParametrosNoAdministrables.ValoresGenericos.urlServicio + "appGBC/sharepoint/cargardatos", oDatos)
                    .then((dataResult) => {
                      console.dir(dataResult);
                    });

                  this.OcultarProgreso();

                  this.MostrarMensajeInformativoConAccion(
                    "Se ha cargado el archivo correctamente y estara siendo procesado, puede visualizar su estado en la bandeja.",
                    () => {
                      this.props.eventoOcultarPopup(true);
                    }
                  );

                } else {

                  this.MostrarMensajeInformativoConAccion(
                    "Formato incorrecto, por favor de volver a intentar.",
                    () => {
                      this.props.eventoOcultarPopup(true);
                    }
                  );
                }

              }
              else if (this.state.campos.Base.Title === "Premiun") {
                const lineas: EExcelProcesoPremiun[] = [];
                data.forEach((element: any) => {

                  const lineasbe = new EExcelProcesoPremiun();

                  lineasbe.CODTIENDAASIGNADA = element.CODTIENDA_ASIGNADA;
                  lineasbe.TIENDAASIGNADA = element.TIENDA_ASIGNADA;
                  lineasbe.RETAIL = element.RETAIL;
                  lineasbe.Zonaretail = element.Zona_retail;
                  lineasbe.ZonaCreditos = element.Zona_Creditos;
                  lineasbe.DNI = element.DNI;
                  lineasbe.NombreCliente = element.Nombre_Cliente;
                  lineasbe.Perfil = element.Perfil;
                  lineasbe.TipoCliente = element.Tipo_Cliente;
                  lineasbe.CMEREC = element.CME_REC;
                  lineasbe.LINEAREC = element.LINEA_REC;
                  lineasbe.TASAREC = element.TASA_REC;
                  lineasbe.FLGREPROGRAMADOCOVID19EFE = element.FLGREPROGRAMADOCOVID19EFE;
                  lineasbe.FECREPROGRAMACIONCPRC19EFE = element.FECREPROGRAMACIONCPRC19EFE;
                  lineasbe.FECVCTOPROXCUOTACPRC19EFE = element.FECVCTOPROXCUOTACPRC19EFE;
                  lineasbe.Direccion = element.Direccion;
                  lineasbe.Urbanizacion = element.Urbanizacion;
                  lineasbe.DEPARTAMENTO = element.DEPARTAMENTO;
                  lineasbe.PROVINCIA = element.PROVINCIA;
                  lineasbe.DISTRITO = element.DISTRITO;
                  lineasbe.Telefono = element.Telefono;
                  lineasbe.CELULAR1 = element.CELULAR1;
                  lineasbe.CELULAR2 = element.CELULAR2;
                  lineasbe.CELULAR3 = element.CELULAR3;
                  lineasbe.CELULAR4 = element.CELULAR4;
                  lineasbe.CELULAR5 = element.CELULAR5;
                  lineasbe.CELULAR6 = element.CELULAR6;
                  lineasbe.CodVenta = element.Cod_Venta;
                  lineasbe.NOMBREVENDEDOR = element.NOMBRE_VENDEDOR;
                  lineasbe.PROPENSION = element.PROPENSION;
                  lineasbe.CANAL = element.CANAL;
                  lineasbe.CODTIENDAULTDESEMBOLSO = element.CODTIENDA_ULT_DESEMBOLSO;
                  lineasbe.DNIVENDEDOR = element.DNI_VENDEDOR;
                  lineasbe.REGION = element.REGION;
                  lineasbe.EstadoGestion = element.Estado_Gestion;
                  lineasbe.BASE = element.BASE;
                  lineasbe.Fechagestion = element.Fecha_gestion;
                  lineasbe.Comentarios = element.Comentarios;
                  lineasbe.Fecharegistro = element.Fecha_registro;
                  lineasbe.CodUbigeo = element.Cod_Ubigeo;
                  lineasbe.CodMicrozona = element.Cod_Microzona;
                  lineasbe.CODIGOVENDEDOR = element.CODIGO_VENDEDOR;
                  lineasbe.Recurrencia = element.Recurrencia;
                  lineasbe.CodAgencia = element.Cod_Agencia;
                  lineasbe.Agencia = element.Agencia;
                  lineasbe.CodCentro = element.Cod_Centro;





                  if (lineasbe.CODTIENDAASIGNADA !== undefined) {
                    console.dir(lineasbe.CODTIENDAASIGNADA);
                    formatoCorrecto = true;
                  }
                  lineas.push(lineasbe);

                });


                console.dir(formatoCorrecto);

                if (formatoCorrecto) {

                  const oDatos = {
                    "lstCargaRedesSociales": [],
                    "lstCargaConvenios": [],
                    "lstCargaPremiun": lineas,
                    "lstCargaMotocorp": [],
                    "Descripcion": this.state.campos.Descripcion,
                    "idUsuario": _spPageContextInfo.userId,
                    "RutaArchivo": rutaarchivo,
                    "Base": this.state.campos.Base.Title,
                    "TipoCarga": this.state.campos.Tipo.Title
                  } as any


                  Funciones.EnviarDatosPost(ParametrosNoAdministrables.ValoresGenericos.urlServicio + "appGBC/sharepoint/cargardatos", oDatos)
                    .then((dataResult) => {
                      console.dir(dataResult);
                    });

                  this.OcultarProgreso();

                  this.MostrarMensajeInformativoConAccion(
                    "Se ha cargado el archivo correctamente y estara siendo procesado, puede visualizar su estado en la bandeja.",
                    () => {
                      this.props.eventoOcultarPopup(true);
                    }
                  );

                } else {

                  this.MostrarMensajeInformativoConAccion(
                    "Formato incorrecto, por favor de volver a intentar.",
                    () => {
                      this.props.eventoOcultarPopup(true);
                    }
                  );
                }

              }

              else if (this.state.campos.Base.Title === "Converse") {
                const lineas: EExcelProcesoConverse[] = [];
                data.forEach((element: any) => {

                  const lineasbe = new EExcelProcesoConverse();

                  lineasbe.CODTIENDAASIGNADA = element.CODTIENDA_ASIGNADA;
                  lineasbe.TIENDAASIGNADA = element.TIENDA_ASIGNADA;
                  lineasbe.RETAIL = element.RETAIL;
                  lineasbe.Zonaretail = element.Zona_retail;
                  lineasbe.ZonaCreditos = element.Zona_Creditos;
                  lineasbe.DNI = element.DNI;
                  lineasbe.NombreCliente = element.Nombre_Cliente;
                  lineasbe.Perfil = element.Perfil;
                  lineasbe.TipoCliente = element.Tipo_Cliente;
                  lineasbe.CMEREC = element.CME_REC;
                  lineasbe.LINEAREC = element.LINEA_REC;
                  lineasbe.TASAREC = element.TASA_REC;
                  lineasbe.FLGREPROGRAMADOCOVID19EFE = element.FLGREPROGRAMADOCOVID19EFE;
                  lineasbe.FECREPROGRAMACIONCPRC19EFE = element.FECREPROGRAMACIONCPRC19EFE;
                  lineasbe.FECVCTOPROXCUOTACPRC19EFE = element.FECVCTOPROXCUOTACPRC19EFE;
                  lineasbe.Direccion = element.Direccion;
                  lineasbe.Urbanizacion = element.Urbanizacion;
                  lineasbe.DEPARTAMENTO = element.DEPARTAMENTO;
                  lineasbe.PROVINCIA = element.PROVINCIA;
                  lineasbe.DISTRITO = element.DISTRITO;
                  lineasbe.Telefono = element.Telefono;
                  lineasbe.CELULAR1 = element.CELULAR1;
                  lineasbe.CELULAR2 = element.CELULAR2;
                  lineasbe.CELULAR3 = element.CELULAR3;
                  lineasbe.CELULAR4 = element.CELULAR4;
                  lineasbe.CELULAR5 = element.CELULAR5;
                  lineasbe.CELULAR6 = element.CELULAR6;
                  lineasbe.CodVenta = element.Cod_Venta;
                  lineasbe.NOMBREVENDEDOR = element.NOMBRE_VENDEDOR;
                  lineasbe.PROPENSION = element.PROPENSION;
                  lineasbe.CANAL = element.CANAL;
                  lineasbe.CODTIENDAULTDESEMBOLSO = element.CODTIENDA_ULT_DESEMBOLSO;
                  lineasbe.DNIVENDEDOR = element.DNI_VENDEDOR;
                  lineasbe.REGION = element.REGION;
                  lineasbe.EstadoGestion = element.Estado_Gestion;
                  lineasbe.BASE = element.BASE;
                  lineasbe.Fechagestion = element.Fecha_gestion;
                  lineasbe.Comentarios = element.Comentarios;
                  lineasbe.Fecharegistro = element.Fecha_registro;
                  lineasbe.CodUbigeo = element.Cod_Ubigeo;
                  lineasbe.CodMicrozona = element.Cod_Microzona;
                  lineasbe.CODIGOVENDEDOR = element.CODIGO_VENDEDOR;
                  lineasbe.Recurrencia = element.Recurrencia;
                  lineasbe.CodAgencia = element.Cod_Agencia;
                  lineasbe.Agencia = element.Agencia;
                  lineasbe.CodCentro = element.Cod_Centro;





                  if (lineasbe.CODTIENDAASIGNADA !== undefined) {
                    console.dir(lineasbe.CODTIENDAASIGNADA);
                    formatoCorrecto = true;
                  }
                  lineas.push(lineasbe);

                });


                console.dir(formatoCorrecto);

                if (formatoCorrecto) {

                  const oDatos = {
                    "lstCargaRedesSociales": [],
                    "lstCargaConvenios": [],
                    "lstCargaPremiun": [],
                    "lstCargaMotocorp": [],
                    "lstCargaConverse": lineas,
                    "lstCargaEspecialistas": [],
                    "lstCargaReenganche": [],
                    "Descripcion": this.state.campos.Descripcion,
                    "idUsuario": _spPageContextInfo.userId,
                    "RutaArchivo": rutaarchivo,
                    "Base": this.state.campos.Base.Title,
                    "TipoCarga": this.state.campos.Tipo.Title
                  } as any


                  Funciones.EnviarDatosPost(ParametrosNoAdministrables.ValoresGenericos.urlServicio + "appGBC/sharepoint/cargardatos", oDatos)
                    .then((dataResult) => {
                      console.dir(dataResult);
                    });

                  this.OcultarProgreso();

                  this.MostrarMensajeInformativoConAccion(
                    "Se ha cargado el archivo correctamente y estara siendo procesado, puede visualizar su estado en la bandeja.",
                    () => {
                      this.props.eventoOcultarPopup(true);
                    }
                  );

                } else {

                  this.MostrarMensajeInformativoConAccion(
                    "Formato incorrecto, por favor de volver a intentar.",
                    () => {
                      this.props.eventoOcultarPopup(true);
                    }
                  );
                }

              }

              else if (this.state.campos.Base.Title === "Especialistas") {
                const lineas: EExcelProcesoEspecialistas[] = [];
                data.forEach((element: any) => {

                  const lineasbe = new EExcelProcesoEspecialistas();

                  lineasbe.CODTIENDAASIGNADA = element.CODTIENDA_ASIGNADA;
                  lineasbe.TIENDAASIGNADA = element.TIENDA_ASIGNADA;
                  lineasbe.RETAIL = element.RETAIL;
                  lineasbe.Zonaretail = element.Zona_retail;
                  lineasbe.ZonaCreditos = element.Zona_Creditos;
                  lineasbe.DNI = element.DNI;
                  lineasbe.NombreCliente = element.Nombre_Cliente;
                  lineasbe.Perfil = element.Perfil;
                  lineasbe.TipoCliente = element.Tipo_Cliente;
                  lineasbe.CMEREC = element.CME_REC;
                  lineasbe.LINEAREC = element.LINEA_REC;
                  lineasbe.TASAREC = element.TASA_REC;
                  lineasbe.FLGREPROGRAMADOCOVID19EFE = element.FLGREPROGRAMADOCOVID19EFE;
                  lineasbe.FECREPROGRAMACIONCPRC19EFE = element.FECREPROGRAMACIONCPRC19EFE;
                  lineasbe.FECVCTOPROXCUOTACPRC19EFE = element.FECVCTOPROXCUOTACPRC19EFE;
                  lineasbe.Direccion = element.Direccion;
                  lineasbe.Urbanizacion = element.Urbanizacion;
                  lineasbe.DEPARTAMENTO = element.DEPARTAMENTO;
                  lineasbe.PROVINCIA = element.PROVINCIA;
                  lineasbe.DISTRITO = element.DISTRITO;
                  lineasbe.Telefono = element.Telefono;
                  lineasbe.CELULAR1 = element.CELULAR1;
                  lineasbe.CELULAR2 = element.CELULAR2;
                  lineasbe.CELULAR3 = element.CELULAR3;
                  lineasbe.CELULAR4 = element.CELULAR4;
                  lineasbe.CELULAR5 = element.CELULAR5;
                  lineasbe.CELULAR6 = element.CELULAR6;
                  lineasbe.CodVenta = element.Cod_Venta;
                  lineasbe.NOMBREVENDEDOR = element.NOMBRE_VENDEDOR;
                  lineasbe.PROPENSION = element.PROPENSION;
                  lineasbe.CANAL = element.CANAL;
                  lineasbe.CODTIENDAULTDESEMBOLSO = element.CODTIENDA_ULT_DESEMBOLSO;
                  lineasbe.DNIVENDEDOR = element.DNI_VENDEDOR;
                  lineasbe.REGION = element.REGION;
                  lineasbe.EstadoGestion = element.Estado_Gestion;
                  lineasbe.BASE = element.BASE;
                  lineasbe.Fechagestion = element.Fecha_gestion;
                  lineasbe.Comentarios = element.Comentarios;
                  lineasbe.Fecharegistro = element.Fecha_registro;
                  lineasbe.CodUbigeo = element.Cod_Ubigeo;
                  lineasbe.CodMicrozona = element.Cod_Microzona;
                  lineasbe.CODIGOVENDEDOR = element.CODIGO_VENDEDOR;
                  lineasbe.Recurrencia = element.Recurrencia;
                  lineasbe.CodAgencia = element.Cod_Agencia;
                  lineasbe.Agencia = element.Agencia;
                  lineasbe.CodCentro = element.Cod_Centro;





                  if (lineasbe.CODTIENDAASIGNADA !== undefined) {
                    console.dir(lineasbe.CODTIENDAASIGNADA);
                    formatoCorrecto = true;
                  }
                  lineas.push(lineasbe);

                });


                console.dir(formatoCorrecto);

                if (formatoCorrecto) {

                  const oDatos = {
                    "lstCargaRedesSociales": [],
                    "lstCargaConvenios": [],
                    "lstCargaPremiun": [],
                    "lstCargaMotocorp": [],
                    "lstCargaConverse": [],
                    "lstCargaEspecialistas": lineas,
                    "lstCargaReenganche": [],
                    "Descripcion": this.state.campos.Descripcion,
                    "idUsuario": _spPageContextInfo.userId,
                    "RutaArchivo": rutaarchivo,
                    "Base": this.state.campos.Base.Title,
                    "TipoCarga": this.state.campos.Tipo.Title
                  } as any


                  Funciones.EnviarDatosPost(ParametrosNoAdministrables.ValoresGenericos.urlServicio + "appGBC/sharepoint/cargardatos", oDatos)
                    .then((dataResult) => {
                      console.dir(dataResult);
                    });

                  this.OcultarProgreso();

                  this.MostrarMensajeInformativoConAccion(
                    "Se ha cargado el archivo correctamente y estara siendo procesado, puede visualizar su estado en la bandeja.",
                    () => {
                      this.props.eventoOcultarPopup(true);
                    }
                  );

                } else {

                  this.MostrarMensajeInformativoConAccion(
                    "Formato incorrecto, por favor de volver a intentar.",
                    () => {
                      this.props.eventoOcultarPopup(true);
                    }
                  );
                }

              }

              else if (this.state.campos.Base.Title === "Reenganche") {
                const lineas: EExcelProcesoReenganche[] = [];
                data.forEach((element: any) => {

                  const lineasbe = new EExcelProcesoReenganche();

                  lineasbe.CODTIENDAASIGNADA = element.CODTIENDA_ASIGNADA;
                  lineasbe.TIENDAASIGNADA = element.TIENDA_ASIGNADA;
                  lineasbe.RETAIL = element.RETAIL;
                  lineasbe.Zonaretail = element.Zona_retail;
                  lineasbe.ZonaCreditos = element.Zona_Creditos;
                  lineasbe.DNI = element.DNI;
                  lineasbe.NombreCliente = element.Nombre_Cliente;
                  lineasbe.Perfil = element.Perfil;
                  lineasbe.TipoCliente = element.Tipo_Cliente;
                  lineasbe.CMEREC = element.CME_REC;
                  lineasbe.LINEAREC = element.LINEA_REC;
                  lineasbe.TASAREC = element.TASA_REC;
                  lineasbe.FLGREPROGRAMADOCOVID19EFE = element.FLGREPROGRAMADOCOVID19EFE;
                  lineasbe.FECREPROGRAMACIONCPRC19EFE = element.FECREPROGRAMACIONCPRC19EFE;
                  lineasbe.FECVCTOPROXCUOTACPRC19EFE = element.FECVCTOPROXCUOTACPRC19EFE;
                  lineasbe.Direccion = element.Direccion;
                  lineasbe.Urbanizacion = element.Urbanizacion;
                  lineasbe.DEPARTAMENTO = element.DEPARTAMENTO;
                  lineasbe.PROVINCIA = element.PROVINCIA;
                  lineasbe.DISTRITO = element.DISTRITO;
                  lineasbe.Telefono = element.Telefono;
                  lineasbe.CELULAR1 = element.CELULAR1;
                  lineasbe.CELULAR2 = element.CELULAR2;
                  lineasbe.CELULAR3 = element.CELULAR3;
                  lineasbe.CELULAR4 = element.CELULAR4;
                  lineasbe.CELULAR5 = element.CELULAR5;
                  lineasbe.CELULAR6 = element.CELULAR6;
                  lineasbe.CodVenta = element.Cod_Venta;
                  lineasbe.NOMBREVENDEDOR = element.NOMBRE_VENDEDOR;
                  lineasbe.PROPENSION = element.PROPENSION;
                  lineasbe.CANAL = element.CANAL;
                  lineasbe.CODTIENDAULTDESEMBOLSO = element.CODTIENDA_ULT_DESEMBOLSO;
                  lineasbe.DNIVENDEDOR = element.DNI_VENDEDOR;
                  lineasbe.REGION = element.REGION;
                  lineasbe.EstadoGestion = element.Estado_Gestion;
                  lineasbe.BASE = element.BASE;
                  lineasbe.Fechagestion = element.Fecha_gestion;
                  lineasbe.Comentarios = element.Comentarios;
                  lineasbe.Fecharegistro = element.Fecha_registro;
                  lineasbe.CodUbigeo = element.Cod_Ubigeo;
                  lineasbe.CodMicrozona = element.Cod_Microzona;
                  lineasbe.CODIGOVENDEDOR = element.CODIGO_VENDEDOR;
                  lineasbe.Recurrencia = element.Recurrencia;
                  lineasbe.CodAgencia = element.Cod_Agencia;
                  lineasbe.Agencia = element.Agencia;
                  lineasbe.CodCentro = element.Cod_Centro;





                  if (lineasbe.CODTIENDAASIGNADA !== undefined) {
                    console.dir(lineasbe.CODTIENDAASIGNADA);
                    formatoCorrecto = true;
                  }
                  lineas.push(lineasbe);

                });


                console.dir(formatoCorrecto);

                if (formatoCorrecto) {

                  const oDatos = {
                    "lstCargaRedesSociales": [],
                    "lstCargaConvenios": [],
                    "lstCargaPremiun": [],
                    "lstCargaMotocorp": [],
                    "lstCargaConverse": [],
                    "lstCargaEspecialistas": [],
                    "lstCargaReenganche": lineas,
                    "Descripcion": this.state.campos.Descripcion,
                    "idUsuario": _spPageContextInfo.userId,
                    "RutaArchivo": rutaarchivo,
                    "Base": this.state.campos.Base.Title,
                    "TipoCarga": this.state.campos.Tipo.Title
                  } as any


                  Funciones.EnviarDatosPost(ParametrosNoAdministrables.ValoresGenericos.urlServicio + "appGBC/sharepoint/cargardatos", oDatos)
                    .then((dataResult) => {
                      console.dir(dataResult);
                    });

                  this.OcultarProgreso();

                  this.MostrarMensajeInformativoConAccion(
                    "Se ha cargado el archivo correctamente y estara siendo procesado, puede visualizar su estado en la bandeja.",
                    () => {
                      this.props.eventoOcultarPopup(true);
                    }
                  );

                } else {

                  this.MostrarMensajeInformativoConAccion(
                    "Formato incorrecto, por favor de volver a intentar.",
                    () => {
                      this.props.eventoOcultarPopup(true);
                    }
                  );
                }

              }





            }

          });

        }
      })
  }


  public handleInputText = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, name }: any = e.target;

    if (name === "txtDescripcion") {
      // this.state.Filtros.Codigo = value;
      this.setState({ campos: { ...this.state.campos, Descripcion: value } });


    }
    // this.setState(this.state);
  };


  public eventoChangeCombos = (nombreControl: string, elementoClick: EElementoCombo | null,
    elementosSeleccionados: EElementoCombo[], elementoSeleccionado: EElementoCombo | null) => {
    if (nombreControl === "cmbBase") {

      this.setState({ campos: { ...this.state.campos, Base: elementosSeleccionados[0] } })
    }



    else if (nombreControl === "cmbTipo") {
      this.setState({ campos: { ...this.state.campos, Tipo: elementosSeleccionados[0] } })
    }

  };


  public render() {
    return (
      <ControlModal titulo="Registrar cargas"
        eventoOcultarPopup={this.props.eventoOcultarPopup.bind(this, false)}
        eventoOk={this.guardarProyecto}
        textoBotonOk="GUARDAR">

        {super.render()}




        <ContenedorControlFormatoA etiqueta="Descripcion" esObligatorio={true} claseContenedor="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <input
            type="text"
            className="form-control"
            placeholder={"Ingrese una descripción"}
            name={"txtDescripcion"}
            value={this.state.campos.Descripcion}
            onChange={this.handleInputText}
          />
        </ContenedorControlFormatoA>

        <ContenedorControlFormatoA etiqueta="Base" esObligatorio={true} claseContenedor="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <ControlSelect
            cantidadElementosSeleccionables={1}
            eventoChange={this.eventoChangeCombos}
            habilitarBuscador={true}
            listaOrigenElementos={this.state.ListaBase}
            elementoSeleccionado={this.state.campos.Base}
            nombreControl="cmbBase"
            propiedadMostrar={"Title"}

          />
        </ContenedorControlFormatoA>

        <ContenedorControlFormatoA etiqueta="Tipo" esObligatorio={true} claseContenedor="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <ControlSelect
            cantidadElementosSeleccionables={1}
            eventoChange={this.eventoChangeCombos}
            habilitarBuscador={true}
            listaOrigenElementos={this.state.ListTipo}
            elementoSeleccionado={this.state.campos.Tipo}
            nombreControl="cmbTipo"
            propiedadMostrar={"Title"}

          />
        </ContenedorControlFormatoA>


        <ContenedorControlFormatoA etiqueta="Archivos" esObligatorio={true} claseContenedor="col-xs-12 col-sm-12 col-md-12 col-lg-12">

          <ControlCargarArchivos
            claseContenedor="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb10"
            eventoChange={this.eventoChangeCargarArchivos}
            esMultiple={false}
            esObligatorio={false}
            esHabilitado={true}
            nombreControl="caArchivos"
            etiquetaControl=""
            etiquetaBotonAdjuntarArchivo="Adjuntar Archivo"
            listaArchivos={this.state.campos.ListaArchivos}
            ref={this.childrenControlCargarArchivos}
            extensionesNoPermitidas={"pdf,docx,doc,jpg,ppt,pptx,rar,exe,img,zip,7zip"}
            soloUnArchivo={true}

          />
        </ContenedorControlFormatoA>


        {/* 
        <ContenedorControlFormatoA etiqueta="Responsable" esObligatorio={true} claseContenedor="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <ControlPeoplePicker
            cantidadCaracteresIniciarBusqueda={3}
            buscarSoloUsuarios={true}
            cantidadElementosSeleccionables={3}
            esMostrarCorreo={true}
            esBuscarPorCorreo={true}
            eventoChange={this.eventoChangePeoplePicker}
            listaElementosSeleccionados={this.state.campos.UsuarioResponsable}
            nombreControl="ppResponsable"
          />
        </ContenedorControlFormatoA> */}


      </ControlModal>

    );
  }
}

export default NuevaCarga;
