import * as React from "react";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";
import { Link } from "react-router-dom";


class MenuLateralIzquierdo extends React.Component {

  public render() {
    return (
      <div className="left-sidebar-wrapper">
        <div className="left-sidebar left-sidebar-toggle">
          <div className="scroll-area">
            <ul
              className="sidebar-nav"
              data-open-speed="250"
              data-close-speed="200"
              data-easing="linear"
            >
              <li className="waves-effect">
                <Link
                  to={
                    ParametrosNoAdministrables.ValoresGenericos.PathBaseName +
                    "/Inicio"
                  }
                >
                  <img
                    src={
                      ParametrosNoAdministrables.ValoresGenericos.urlImagenes +
                      "/img/icons/ico-menu-inicio.png"
                    }
                  />
                  <span className="nav-item-text">Inicio</span>
                </Link>
              </li>
              <li className="waves-effect">
                <a title="Gestión de Directivas">
                  <img
                    src={
                      ParametrosNoAdministrables.ValoresGenericos.urlImagenes +
                      "/img/icons/ico-gestion-de-incidentes.png"
                    }
                  />
                  <span className="nav-item-text">Cargas</span>
                </a>
                <ul className="sub-nav" role="menu">
                  <li className="waves-effect">
                    <Link
                      to={
                        ParametrosNoAdministrables.ValoresGenericos

                          .PathBaseName + "/GestionBaseCliente/BandejaCarga"
                      }
                    >
                      Bandeja de Cargas
                    </Link>
                  </li>
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuLateralIzquierdo;
