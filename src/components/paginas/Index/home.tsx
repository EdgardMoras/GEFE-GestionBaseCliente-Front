import PaginaBandeja, {
  IPaginaBandeja,
  IStatusPagina
} from "src/components/paginas/mis_pendientes/ClientesNoAcceden/PaginaProyecto";
import EIncidente from "src/models/fisicas/EProyecto";
import * as React from "react";
import EMaestro from '../../../models/fisicas/EMaestro';
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";

class PaginaBuscadorIncidencias extends PaginaBandeja<EIncidente>
  implements IPaginaBandeja {
  constructor(props: {}, estado: IStatusPagina<EIncidente>) {
    super(props, estado);
    this.state = {

      MostrarProgreso: false,
      NombreLista: "Proyecto",
      CantidadElementoPorPagina:
        ParametrosNoAdministrables.ValoresGenericos.ElementosPorPagina,
      TipoEntidad: EIncidente,
      CamlQuery: {
        PagingInfo: undefined,
        SubQuery: "",
        Fields: [],
        OrderBy: "",
      },
      Datos: {
        ListaResultados: [],
        Maestros: new EMaestro(),
      },

      ListaColumnasTablaResultados: [],

      Modal: {
        mostrar: false,
        cerrar: false,

      },
      EsMostrarPopupNuevoProyecto: false,
      redireccion: {
        DetalleProyectoPagina: false,
        redireccionarID: "",
        NuevoProyecto: false,
      }
    };
  }

  public componentDidMount() {
    this.inicializarControles();
  }


  public inicializarControles() {
    this.MostrarProgreso();

    this.validarAccesoPaginaAuditora().then(() => {
      if (this.estado.datosUsuario.esGrupo1 || this.estado.datosUsuario.esGrupo2) {
        this.OcultarProgreso();
      }
      else {

        this.OcultarProgreso();

      }

    });


  }
  public render() {
    return (
      <div className="container container-full">

        <div className="page-container">
          <div className="main-content body-full">
            <div className="content contentTG left-sidebar-toggle">
              <div className="container">

                <div className="row mb25 mt25">
                  <div className="col-md-2">
                    <img src={
                      ParametrosNoAdministrables.ValoresGenericos.urlImagenes +
                      "/img/icons/ico-menu-seguridad.png"
                    }
                      style={{ width: "140px", height: "154px" }}
                      alt="" />
                  </div>
                  <div className="col-md-6">
                    <h2 className="t1">Bienvenido(a)</h2>
                    <span className="t2" id="NombreCompleto">{this.estado.datosUsuario.usuario.Title}</span>
                    <span className="t3">al aplicativo <b>Gestión Base Clientes</b></span>
                  </div>
                  <div className="col-md-4">
                    <span className="pregunta">¿Que deseas hacer hoy?</span>
                    <img src={
                      ParametrosNoAdministrables.ValoresGenericos.urlImagenes +
                      "/img/icons/bg-blue.png"
                    }
                      alt="" />
                  </div>
                </div>

                <div className="row mt15">
                  <div className="col-md-12">
                    <h3 className="subTitle">Cargas</h3>
                  </div>
                  <div className="clearfix" />
                  <div className="col-md-3 bloque">
                    <div className="cajaUnica">
                      <a href={ParametrosNoAdministrables.ValoresGenericos
                        .PathBaseName + "/GestionBaseCliente/BandejaCarga"}>
                        <img
                          src={
                            ParametrosNoAdministrables.ValoresGenericos.urlImagenes +
                            "/img/icons/ico-menu-inbox.png"
                          }
                          style={{ width: "60px", height: "60px" }}
                          alt="" />
                        <span className="spanHome">  Bandeja de cargas </span>
                      </a>
                    </div>
                  </div>

                </div>


                <div className="clearfix mb15 mt15" />



              </div>
            </div>
          </div>
        </div>


        {super.render()}
      </div >
    );
  }
}

export default PaginaBuscadorIncidencias;
