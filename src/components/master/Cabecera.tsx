import * as React from "react";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import PaginaBase from "src/components/ui/pagecontrol/PaginaBase";
import { loadPageContext } from "sp-rest-proxy/dist/utils/env";
import Funciones from "src/genericos/Funciones";
import ElegirEmpresa from "../paginas/Index/ElegirEmpresa";
import EElementoCombo from 'src/models/logicas/EElementoCombo';

export interface IState {
  NombreUsuario: string;
  EsElegirEmpresa: boolean;
}

class Cabecera extends PaginaBase<{}, IState> {
  public state: IState = {
    NombreUsuario: "",
    EsElegirEmpresa: false,
  };

  public componentDidMount() {
    loadPageContext().then(async _ => {
      Funciones.ObtenerUsuarioActual().then(resultado => {
        this.state.NombreUsuario = resultado.Title;
        this.setState(this.state);
      });
    });
  }

  public handleOcultarPopupNuevoProyecto = (iniciarBusqueda: boolean) => {


    this.setState({ EsElegirEmpresa: false });
  };

  public handleGuardarEmpresa = (empresa: EElementoCombo) => {
    if (empresa.Title === "") {
      this.MostrarMensajeInformativo("Por favor de seleccionar la empresa a la cual pertence.", true)
    } else {
      localStorage.setItem('Empresa', empresa.Title);
      this.setState({ EsElegirEmpresa: false }, () => {
        this.MostrarMensajeInformativo("Empresa guardada correctamente", true);
        window.location.replace('');
      });


    }
  };


  public ElegirEmpresa = () => {


    this.setState({ EsElegirEmpresa: true });
  }

  public render() {
    return (
      <header className="top-bar">
        <div className="container container-full">
          <nav className="navbar navbar-default">
            <ul className="nav navbar-nav navbar-left">
              <li className="sidebar-toggle">
                <a id="left-sidebar-toggle">
                  <img
                    src={
                      ParametrosNoAdministrables.ValoresGenericos.urlImagenes +
                      "/img/icons/ico-navbar.png"
                    }
                  />
                </a>
              </li>
              <li className="sidebar-hide">
                <a id="left-sidebar-hide">
                  <img
                    src={
                      ParametrosNoAdministrables.ValoresGenericos.urlImagenes +
                      "/img/icons/ico-navbar.png"
                    }
                  />
                </a>
              </li>
              <li className="sidebar-toggle separador-vertical-ico-menu" />
              <li className="page-title ml20 mr20">
                <h2>
                  <img
                    className=""
                    src={
                      ParametrosNoAdministrables.ValoresGenericos.urlImagenes +
                      "/img/logo-financiera.png"
                    }
                    width="75px"
                    height="25px"
                  />
                </h2>
              </li>
              <li className="separador-vertical-ico-menu " />
              <li className="page-sistema ml20">
                <h2>Sistema Gestión Base Clientes</h2>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right" style={{ display: "" }}>

              <li>
                <div id="lista">
                  <div className="hov">
                    <div className="btn-group">
                      <div className="right nombrehide">
                        {this.state.NombreUsuario}
                      </div>
                    </div>

                    <div className="btn-group">
                      <a
                        className="con"
                        href="#"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          className=""
                          src={
                            ParametrosNoAdministrables.ValoresGenericos
                              .urlImagenes + "/img/icons/ico-manual.png"
                          }
                          width="30"
                          height="30px"
                        />
                        <span className="label label-primary" />
                      </a>

                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item" style={{ display: "none" }}>
                <a className="nav-link" href="#" role="button">
                  <i className="fa fa-bell fa-fw" />
                  <span className="badge badge-danger">9</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {this.state.EsElegirEmpresa && (
          <ElegirEmpresa
            eventoOcultarPopup={this.handleOcultarPopupNuevoProyecto}
            eventoGuardar={this.handleGuardarEmpresa}
          />
        )}
      </header>
    );
  }
}

export default Cabecera;
