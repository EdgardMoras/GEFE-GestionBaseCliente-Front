import * as React from "react";

import Funciones from "../../../genericos/Funciones";
import { RestFiltros } from "../../../genericos/RestFiltros";
import { isNullOrUndefined } from "util";

export interface IPropsControlPeoplePickerTenant {
  cantidadCaracteresIniciarBusqueda: number;
  placeHolder?: string;
  buscarSoloUsuarios?: boolean;
  buscarSoloGrupos?: boolean;
  buscarUsuarioYGrupos?: boolean;
  datosUsuarioSeleccionado: any | null;
  esMostrarCorreo?: boolean;
  esBuscarPorCorreo?: boolean;
  cantidadElementosSeleccionables?: number;
}

export interface IStateControlPeoplePickerTenant {
  datoConsulta: string;
  inicioBusquedaOrigenDatos: boolean;
  listaResultadoFiltrados: any[];
  listaOrigenElementos: any[];
  listaElementosSeleccionados: any[];
}

class ControlPeoplePickerTenant extends React.Component<
  IPropsControlPeoplePickerTenant,
  IStateControlPeoplePickerTenant
  > {
  public selecciono: boolean = false;
  private childContenedorControl: React.RefObject<HTMLDivElement>;
  private childTxtDatoBusqueda: React.RefObject<HTMLInputElement>;

  constructor(props: IPropsControlPeoplePickerTenant) {
    super(props);

    this.childContenedorControl = React.createRef();
    this.childTxtDatoBusqueda = React.createRef();

    this.state = {
      datoConsulta: "",
      inicioBusquedaOrigenDatos: false,
      listaResultadoFiltrados: [],
      listaOrigenElementos: [],
      listaElementosSeleccionados: []
    };
  }

  public componentDidMount() {
    this.obtenerValoresIniciales();
  }

  public getListaElementosSeleccionados(): any[] {
    return this.state.listaElementosSeleccionados;
  }

  public setListaElementosSeleccionados = (
    valoreListaElementosSeleccionados: any[]
  ) => {
    this.setState({
      listaElementosSeleccionados: valoreListaElementosSeleccionados
    });
  };

  public render() {
    let placeHolder = this.props.placeHolder;
    let claseOcultarInput = "input-buscador";

    if (isNullOrUndefined(placeHolder)) {
      placeHolder = "Ingrese un valor";
    }

    if (
      this.props.cantidadElementosSeleccionables ===
      this.state.listaElementosSeleccionados.length
    ) {
      claseOcultarInput = "input-buscador hidden";
    }

    return (
      <div
        className="input-autocompletado-contenedor"
        ref={this.childContenedorControl}
        onMouseLeave={this.ocultarResultadosFiltrados}
      >
        {this.seccionListaElementosSeleccionados()}

        <input
          className={claseOcultarInput}
          placeholder={placeHolder}
          ref={this.childTxtDatoBusqueda}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        {this.seccionListaElementosFiltrados()}
      </div>
    );
  }

  protected ocultarResultadosFiltrados = () => {
    this.childTxtDatoBusqueda.current!.value = "";
    this.setState({ datoConsulta: "", listaResultadoFiltrados: [] });
  };

  protected obtenerValoresIniciales() {
    if (this.state.inicioBusquedaOrigenDatos) {
      return;
    }

    this.setState({ inicioBusquedaOrigenDatos: true }, () => {
      let endPoint = "/_api/web/siteusers";

      const promesas: Array<Promise<any>> = [];
      const listaResultados: any[] = [];

      if (this.props.buscarSoloUsuarios) {
        endPoint = "/_api/web/siteusers";
        promesas.push(Funciones.ObtenerElementoPorRest(endPoint));
      } else if (this.props.buscarSoloGrupos) {
        endPoint = "/_api/web/sitegroups";
        promesas.push(Funciones.ObtenerElementoPorRest(endPoint));
      } else if (this.props.buscarUsuarioYGrupos) {
        endPoint = "/_api/web/siteusers";
        promesas.push(Funciones.ObtenerElementoPorRest(endPoint));
        endPoint = "/_api/web/sitegroups";
        promesas.push(Funciones.ObtenerElementoPorRest(endPoint));
      }

      Promise.all(promesas)
        .then(([resultadoPromesa1, resultadoPromesa2]) => {
          resultadoPromesa1.forEach((element: any) => {
            const titulo = RestFiltros.parsearTexto(element, "Title");
            const id = RestFiltros.parsearTexto(element, "Id");
            const email = RestFiltros.parsearTexto(element, "Email");
            listaResultados.push({
              Title: titulo,
              Id: id,
              ID: id,
              Email: email,
              Objeto: element
            });
          });

          if (this.props.buscarUsuarioYGrupos) {
            resultadoPromesa2.forEach((element: any) => {
              const titulo = RestFiltros.parsearTexto(element, "Title");
              const id = RestFiltros.parsearTexto(element, "Id");
              const email = RestFiltros.parsearTexto(element, "Email");
              listaResultados.push({
                Title: titulo,
                Id: id,
                ID: id,
                Email: email,
                Objeto: element
              });
            });

            listaResultados.sort((a, b) => {
              if (a > b) {
                return 1;
              }
              if (a < b) {
                return -1;
              }
              return 0;
            });
          }

          this.setState({ listaOrigenElementos: listaResultados });
        })
    });
  }

  protected obtenerElementosCoincidenDatoBusqueda = () => {
    if (
      this.state.datoConsulta.length <
      this.props.cantidadCaracteresIniciarBusqueda
    ) {
      this.setState({ listaResultadoFiltrados: [] });
      return;
    }

    const datoBusqueda = this.state.datoConsulta.toLowerCase();

    let listaElementosFiltrados: any[] = [];

    if (this.props.esBuscarPorCorreo) {
      listaElementosFiltrados = this.state.listaOrigenElementos.filter(
        (elemento: any) => {
          return (
            elemento.Title.toLowerCase().indexOf(datoBusqueda) !== -1 ||
            elemento.Email.toLowerCase().indexOf(datoBusqueda) !== -1
          );
        }
      );
    } else {
      listaElementosFiltrados = this.state.listaOrigenElementos.filter(
        (elemento: any) => {
          return elemento.Title.toLowerCase().indexOf(datoBusqueda) !== -1;
        }
      );
    }

    this.setState({ listaResultadoFiltrados: listaElementosFiltrados });
  };

  protected handleInputChange = () => {
    let datoBusqueda = "";

    if (
      this.props.cantidadElementosSeleccionables !== undefined &&
      this.props.cantidadElementosSeleccionables > 0 &&
      this.state.listaElementosSeleccionados.length >=
      this.props.cantidadElementosSeleccionables
    ) {
      return;
    }

    if (
      this.childTxtDatoBusqueda !== null &&
      this.childTxtDatoBusqueda.current !== null
    ) {
      datoBusqueda = this.childTxtDatoBusqueda.current.value;
    }

    this.setState(
      {
        datoConsulta: datoBusqueda
      },
      () => {
        this.obtenerElementosCoincidenDatoBusqueda();
      }
    );
  };

  protected handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (this.state.listaResultadoFiltrados.length === 1) {
        this.seleccionarElemento(this.state.listaResultadoFiltrados[0]);
      }
    }
  };

  protected esRepetidoSeleccionado(idElemento: string) {
    const resultado = this.state.listaElementosSeleccionados.filter(
      (elemento: any) => {
        return elemento.Id === idElemento;
      }
    );

    return resultado.length > 0;
  }
  protected seleccionarElemento = (elementoSeleccionado: any) => {
    if (
      this.props.cantidadElementosSeleccionables !== undefined &&
      this.props.cantidadElementosSeleccionables > 0 &&
      this.state.listaElementosSeleccionados.length >=
      this.props.cantidadElementosSeleccionables
    ) {
      return;
    }

    if (this.esRepetidoSeleccionado(elementoSeleccionado.Id)) {
      this.setState({
        listaResultadoFiltrados: []
      });
      return;
    }
    this.selecciono = true;
    this.state.listaElementosSeleccionados.push(elementoSeleccionado);

    this.childTxtDatoBusqueda.current!.value = "";

    this.setState({
      listaResultadoFiltrados: [],
      listaElementosSeleccionados: this.state.listaElementosSeleccionados
    });
  };

  protected deseleccionarElemento = (elementoSeleccionado: any) => {
    const listaElementosSeleccionados = this.state.listaElementosSeleccionados.filter(
      (elemento: any) => {
        return elemento.Id !== elementoSeleccionado.Id;
      }
    );

    this.setState({
      listaElementosSeleccionados
    });
  };

  protected seccionListaElementosFiltrados() {
    if (this.state.listaResultadoFiltrados.length === 0) {
      return;
    }

    if (this.props.esMostrarCorreo) {
      return (
        <div>
          <ul className="input-autocompletado-elementos-filtrados">
            {this.state.listaResultadoFiltrados.map((elemento: any, i) => {
              return (
                <li
                  key={i}
                  onClick={this.seleccionarElemento.bind(this, elemento)}
                >
                  <span className="input-picker-title">{elemento.Title}</span> -{" "}
                  <span className="input-picker-email">{elemento.Email}</span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <ul className="input-autocompletado-elementos-filtrados">
            {this.state.listaResultadoFiltrados.map((elemento: any, i) => {
              return (
                <li
                  key={i}
                  onClick={this.seleccionarElemento.bind(this, elemento)}
                >
                  <span className="input-picker-title">{elemento.Title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }

  protected seccionListaElementosSeleccionados() {
    if (this.state.listaElementosSeleccionados.length === 0) {
      return;
    }

    return (
      <div>
        {this.state.listaElementosSeleccionados.map((elemento: any, i) => {
          return (
            <span
              key={i}
              className="input-autocompletado-elemento-seleccionado"
            >
              <span>{elemento.Title}</span>
              <svg
                onClick={this.deseleccionarElemento.bind(this, elemento)}
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="presentation"
                className="input-autocompletado-boton-eliminar"
              >
                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
              </svg>
            </span>
          );
        })}
      </div>
    );
  }
}

export default ControlPeoplePickerTenant;
