import * as React from "react";
import PaginaBase from "../../ui/pagecontrol/PaginaBase";
import { ContenedorPagina } from '../../ui/formcontrol/ContenedorPagina';
// import AdministracionAlertasTareas from './TabAlertasTareas/AdministracionAlertasTareas';
// import AdministracionFeriado from './TabDiasNoLaborables/AdministracionFeriado';
// import AdministracionEmpresas from './TabEmpresas/AdministracionEmpresas';
// import AdministracionEntidades from './TabEntidades/AdministracionEntidades';
// import AdministracionFuncionariosEnlace from './TabFuncionariosEnlace/AdministracionFuncionariosEnlace';
import { Grupo } from 'src/models/Base/Grupo';
import Funciones from 'src/genericos/Funciones';
import { ParametrosNoAdministrables } from 'src/genericos/VariablesGlobales';
import { loadPageContext } from 'sp-rest-proxy/dist/utils/env';
import AdministracionGruposUsuarios from './TabGruposUsuarios/AdministracionGruposUsuarios';
// import AdministracionConfiguracionAdjuntos from './TabConfiguracionAdjuntos/AdministracionConfiguracionAdjuntos';

export interface IStateConfiguracionSistema {
  campos: {
  };
  tabs: {
    tabActivo: number;
  }
}

enum TipoPagina {
  SinAcceso = 0,
  AprobadoresOficialSeguridad = 1,
  AdministradoresASARTI = 2,

}

class ConfiguracionSistema extends PaginaBase<
  {},
  IStateConfiguracionSistema
  > {
  public nombrePagina = "ConfiguracionSistema.tsx"
  public mensajes = {

  };

  constructor(props: {}) {
    super(props);

    this.state = {
      campos: {
      },
      tabs: {
        tabActivo: TipoPagina.SinAcceso
      }
    };
  }

  public componentDidMount() {
    this.MostrarProgreso();

    loadPageContext().then(async _ => {
      const listaGruposPerteneceUsuario: Grupo[] = [];
      const listaTodosGrupos: Grupo[] = [];
      Funciones.obtenerGruposPerteneceUsuario(_spPageContextInfo.userId, listaGruposPerteneceUsuario, listaTodosGrupos).then(resultado => {
        const esMiembroGrupoAdministracion = listaGruposPerteneceUsuario.filter((grupo: Grupo) => {
          return grupo.Title.toUpperCase() === ParametrosNoAdministrables.Grupos.AdministracionConfiguraciones.toUpperCase()
        });

        if (esMiembroGrupoAdministracion.length === 0) {
          this.MostrarMensajeInformativoConAccion(ParametrosNoAdministrables.Mensajes.mensajeInformativoNoTieneAccesoPagina, () => {
            window.location.replace(ParametrosNoAdministrables.ValoresGenericos.urlDescarga + ParametrosNoAdministrables.ValoresGenericos.PathBaseName);
          });
          return;
        }

        this.OcultarProgreso();
        this.setearTabActivo(TipoPagina.AprobadoresOficialSeguridad);

      }).catch(error => {
        this.MostrarMensajeError("obtenerGruposPerteneceUsuario", error);
      });
    }).catch(error => {
      this.MostrarMensajeError("loadPageContext", error);
    });
  }

  public setearTabActivo = (tabActivo: number) => {
    const tabs = Object.assign({}, this.state.tabs);

    tabs.tabActivo = tabActivo;
    this.setState({ tabs });
  }

  public render() {

    if (this.state.tabs.tabActivo === TipoPagina.SinAcceso) {
      return <div>
        {super.render()}
      </div>
    }

    return (
      <ContenedorPagina>
        <div className="header-content mb20">
          <h2 className="alinea-titulo">Administracion del Sistema</h2>
          <div className="nbsp" />
        </div>
        <div className="clearfix" />
        <div className="row">
          <div className="col-md-3">
            <ul className="nav nav-pills nav-stacked" id="myTabs">
              <li className={this.state.tabs.tabActivo === TipoPagina.AprobadoresOficialSeguridad ? "active" : ""} onClick={this.setearTabActivo.bind(this, TipoPagina.AprobadoresOficialSeguridad)}>
                <a href="#home" data-toggle="pill">
                  <b>Aprobadores Oficial Seguridad</b><br />
                  <span className="tabVerticalTxt">Administrar los Aprobadores que estaran involucrados en el OFicial de seguridad.</span>
                </a>
              </li>

            </ul>
          </div>
          <div className="col-md-9">
            <div className="tab-content">
              <div className={this.state.tabs.tabActivo === TipoPagina.AprobadoresOficialSeguridad ? "tab-pane active" : "tab-pane"} id="home">
                {
                  this.state.tabs.tabActivo === TipoPagina.AprobadoresOficialSeguridad &&
                  <div className="well well-lg">
                    <AdministracionGruposUsuarios mostrarTab={this.state.tabs.tabActivo === TipoPagina.AprobadoresOficialSeguridad} />
                  </div>
                }
              </div>
            </div>
            {super.render()}
          </div>

        </div>
      </ContenedorPagina>
    );
  }
}

export default ConfiguracionSistema;
