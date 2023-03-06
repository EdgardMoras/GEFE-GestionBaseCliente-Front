import * as React from "react";

import Funciones from "../../../genericos/Funciones";
import { RestFiltros } from "../../../genericos/RestFiltros";
import { isNullOrUndefined } from "util";

export interface IPropsControlInputAutoCompletado {
  cantidadCaracteresIniciarBusqueda: number;
  placeHolder?: string;
  buscarSoloUsuarios?: boolean;
  buscarSoloGrupos?: boolean;
  buscarUsuarioYGrupos?: boolean;
  cantidadElementosSeleccionables?: number;
}

export interface IStateControlInputAutoCompletado {
  datoConsulta: string;
  inicioBusquedaOrigenDatos: boolean;
  listaResultadoFiltrados: any[];
  listaOrigenElementos: any[];
  listaElementosSeleccionados: any[];
}

class ControlInputAutoCompletado extends React.Component<
  IPropsControlInputAutoCompletado,
  IStateControlInputAutoCompletado
  > {
  public selecciono: boolean = false;
  private childContenedorControl: React.RefObject<HTMLDivElement>;
  private childTxtDatoBusqueda: React.RefObject<HTMLInputElement>;

  constructor(props: IPropsControlInputAutoCompletado) {
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

  public render() {
    let placeHolder = this.props.placeHolder;

    if (isNullOrUndefined(placeHolder)) {
      placeHolder = "Ingrese un valor";
    }

    return (
      <div
        className="input-autocompletado-contenedor"
        ref={this.childContenedorControl}
        onMouseLeave={this.ocultarResultadosFiltrados}
      >
        {this.seccionListaElementosSeleccionados()}

        <input
          className="input-buscador"
          placeholder={placeHolder}
          ref={this.childTxtDatoBusqueda}
          onChange={this.handleInputChange}
        />
        {this.seccionListaElementosFiltrados()}
      </div>
    );
  }

  protected ocultarResultadosFiltrados = () => {
    if (
      this.childTxtDatoBusqueda !== null &&
      this.childTxtDatoBusqueda.current !== null
    ) {
      if (this.childTxtDatoBusqueda.current.value.length === 0) {
        this.setState({ listaResultadoFiltrados: [] });
      }
    }
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
            listaResultados.push({ Title: titulo, Id: id, Objeto: element });
          });

          if (this.props.buscarUsuarioYGrupos) {
            resultadoPromesa2.forEach((element: any) => {
              const titulo = RestFiltros.parsearTexto(element, "Title");
              const id = RestFiltros.parsearTexto(element, "Id");
              listaResultados.push({ Title: titulo, Id: id, Objeto: element });
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

    const listaElementosFiltrados = this.state.listaOrigenElementos.filter(
      (elemento: any) => {
        return elemento.Title.toLowerCase().indexOf(datoBusqueda) !== -1;
      }
    );

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

  protected esRepetidoSeleccionado(idElemento: string) {
    const resultado = this.state.listaElementosSeleccionados.filter(
      (elemento: any) => {
        return elemento.Id === idElemento;
      }
    );

    return resultado.length > 0;
  }
  protected seleccionarElemento = (
    elementoSeleccionado: any,
    e: React.FormEvent<HTMLLIElement>
  ) => {
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
    /* const listaResultadoFiltrados = this.state.listaResultadoFiltrados.filter((elemento: any) => {
      return elemento.Id !== elementoSeleccionado.Id
    })*/

    if (
      this.childTxtDatoBusqueda !== null &&
      this.childTxtDatoBusqueda.current !== null
    ) {
      this.childTxtDatoBusqueda.current.value = "";
    }

    this.setState({
      listaResultadoFiltrados: [],
      listaElementosSeleccionados: this.state.listaElementosSeleccionados
    });
  };

  protected deseleccionarElemento = (
    elementoSeleccionado: any,
    e: React.FormEvent<HTMLSpanElement>
  ) => {
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

    return (
      <div>
        <ul className="input-autocompletado-elementos-filtrados">
          {this.state.listaResultadoFiltrados.map((elemento: any, i) => {
            return (
              <li
                key={i}
                onClick={this.seleccionarElemento.bind(this, elemento)}
              >
                {elemento.Title}
              </li>
            );
          })}
        </ul>
      </div>
    );
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

export default ControlInputAutoCompletado;
