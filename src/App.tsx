import * as React from "react";

import Cabecera from "./components/master/Cabecera";
import MenuLateralIzquierdo from "./components/master/MenuLateralIzquierdo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ParametrosNoAdministrables } from "./genericos/VariablesGlobales";
import PaginaInicio from "./components/paginas/Index/home";
import PaginaSolicitudBandeja from "./components/paginas/mis_pendientes/consultar pendientes/PaginaBuscadorPendiente";
import PaginaBandejaCargaOferta from "./components/paginas/mis_pendientes/CargaExcel/PaginaBuscadorCargaExcel";
import PaginaBandejaClienteNoAcceden from "./components/paginas/mis_pendientes/ClientesNoAcceden/PaginaBuscadorPendiente";
import PaginaVendedorDetalle from "./components/paginas/Vendedores/PaginaDetalle";
import PaginaSolicitudReversionBandeja from "./components/paginas/mis_pendientes/consultar Reversiones/PaginaBuscadorReversiones";


class App extends React.Component {
  public render() {
    return (
      <Router>
        <div>
          {<Cabecera />
          }

          <MenuLateralIzquierdo />

          {// Nuevos Routers
          }

          <Route
            path={
              ParametrosNoAdministrables.ValoresGenericos.PathBaseName +
              "/Inicio"
            }
            component={PaginaInicio}
            exact={true}
          />



          <Route
            path={
              ParametrosNoAdministrables.ValoresGenericos.PathBaseName +
              "/ReprogramacionesEspecializadas/BandejaReprogramaciones"
            }
            component={PaginaSolicitudBandeja}
            exact={true}
          />

          <Route
            path={
              ParametrosNoAdministrables.ValoresGenericos.PathBaseName +
              "/ReprogramacionesEspecializadas/BandejaReversionReprogramaciones"
            }
            component={PaginaSolicitudReversionBandeja}
            exact={true}
          />



          <Route
            path={
              ParametrosNoAdministrables.ValoresGenericos.PathBaseName +
              "/GestionBaseCliente/BandejaCarga"
            }
            component={PaginaBandejaCargaOferta}
            exact={true}
          />




          <Route
            path={
              ParametrosNoAdministrables.ValoresGenericos.PathBaseName +
              "/ReprogramacionesEspecializadas/BandejaClienteNoCalifica"
            }
            component={PaginaBandejaClienteNoAcceden}
            exact={true}
          />


          <Route
            path={
              ParametrosNoAdministrables.ValoresGenericos.PathBaseName +
              "/Vendedor/Detalle/:id"
            }
            component={PaginaVendedorDetalle}
            exact={true}
          />



          {// FIN Nuevos Routers
          }





          {/*Este route debe ir ultimo*/}
          <Route
            path={ParametrosNoAdministrables.ValoresGenericos.PathBaseName}
            component={PaginaInicio}
            exact={true}
          />
        </div>
      </Router>
    );
  }
}

export default App;
