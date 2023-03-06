import * as React from "react";

import Funciones from "../../../genericos/Funciones";
import { isNullOrUndefined } from "util";
import EElementoPeoplePicker from "../../../models/logicas/EElementoPeoplePicker";

export interface IPropsControlPeoplePicker<T> {
  cantidadCaracteresIniciarBusqueda: number;
  elementoSeleccionado?: T | null;
  placeHolder?: string;
  buscarSoloUsuarios?: boolean;
  buscarSoloGrupos?: boolean;
  buscarUsuarioYGrupos?: boolean;
  esMostrarCorreo?: boolean;
  esBuscarPorCorreo?: boolean;
  cantidadElementosSeleccionables?: number;
  listaElementosSeleccionados?: T[];
  nombreControl: string;
  eventoChange: (
    nombreControl: string,
    elementoClick: T | null,
    elementosSeleccionados: T[]
  ) => void;
}

export interface IStateControlPeoplePicker<T> {
  datoConsulta: string;
  inicioBusquedaOrigenDatos: boolean;
  listaResultadoFiltrados: T[];
  Buscar: boolean;
  // listaElementosSeleccionados: T[];
}

class ControlPeoplePicker extends React.Component<
  IPropsControlPeoplePicker<EElementoPeoplePicker>,
  IStateControlPeoplePicker<EElementoPeoplePicker>
  > {
  public selecciono: boolean = false;
  private node: React.RefObject<HTMLDivElement>;
  private childTxtDatoBusqueda: React.RefObject<HTMLInputElement>;

  constructor(props: IPropsControlPeoplePicker<EElementoPeoplePicker>) {
    super(props);

    this.node = React.createRef();
    this.childTxtDatoBusqueda = React.createRef();

    this.state = {
      datoConsulta: "",
      inicioBusquedaOrigenDatos: false,
      listaResultadoFiltrados: [],
      Buscar: false,
    };
  }

  public handleOutsideClick = (e: MouseEvent) => {
    const nodo = e.target as HTMLElement;
    if (this.node.current && this.node.current!.innerHTML) {
      if (this.node.current!.innerHTML.toString().indexOf(nodo.innerHTML) > 0) {
        return;
      }
      this.ocultarResultadosFiltrados();
    }
  };

  public componentDidMount() {
    document.addEventListener("click", this.handleOutsideClick, false);

    this.inicializarComponente(this.props);
  }

  /* public componentWillReceiveProps(nuevoProps: IPropsControlPeoplePicker<EElementoPeoplePicker>) {

        if (JSON.stringify(nuevoProps.listaElementosSeleccionados) !== JSON.stringify(this.props.listaElementosSeleccionados)) {
            if (nuevoProps.listaElementosSeleccionados) {
                this.setState({ listaElementosSeleccionados: nuevoProps.listaElementosSeleccionados });
            } else {
                this.setState({ listaElementosSeleccionados: [] });
            }
        }
        else if (JSON.stringify(nuevoProps.elementoSeleccionado) !== JSON.stringify(this.props.elementoSeleccionado)) {
            if (nuevoProps.elementoSeleccionado) {
                this.setState({ listaElementosSeleccionados: [nuevoProps.elementoSeleccionado] });
            } else {
                this.setState({ listaElementosSeleccionados: [] });
            }
        } else if (Util.esNullOUndefined(nuevoProps.elementoSeleccionado) && Util.esNullOUndefined(nuevoProps.listaElementosSeleccionados)) {
            this.setState({ listaElementosSeleccionados: [] });
        } else if (nuevoProps.elementoSeleccionado && Util.esNullOUndefined(nuevoProps.listaElementosSeleccionados) && this.state.listaElementosSeleccionados.length === 0) {
            if (nuevoProps.elementoSeleccionado) {
                this.setState({ listaElementosSeleccionados: [nuevoProps.elementoSeleccionado] });
            }
        }
    }*/

  public render() {
    let placeHolder = this.props.placeHolder;
    let claseOcultarInput = "input-buscador";

    if (isNullOrUndefined(placeHolder)) {
      placeHolder = "Ingrese un valor";
    }

    if (
      (this.props.elementoSeleccionado !== null &&
        this.props.elementoSeleccionado !== undefined) ||
      (this.props.cantidadElementosSeleccionables !== 0 &&
        (this.props.listaElementosSeleccionados &&
          this.props.cantidadElementosSeleccionables ===
          this.props.listaElementosSeleccionados.length))
    ) {
      claseOcultarInput = "input-buscador hidden";
    }

    return (
      <div className="input-autocompletado-contenedor" ref={this.node}>
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

  protected inicializarComponente(
    nuevoProps: IPropsControlPeoplePicker<EElementoPeoplePicker>
  ) {
    if (this.state.inicioBusquedaOrigenDatos) {
      return;
    }

    this.setState({ inicioBusquedaOrigenDatos: true });
    /* this.setState({ inicioBusquedaOrigenDatos: true }, () => {

            if (JSON.stringify(nuevoProps.listaElementosSeleccionados) !== JSON.stringify(this.props.listaElementosSeleccionados)) {
                if (nuevoProps.listaElementosSeleccionados) {
                    // this.setState({ listaOrigenElementos: listaResultados, listaElementosSeleccionados: nuevoProps.listaElementosSeleccionados });
                    this.setState({ listaElementosSeleccionados: nuevoProps.listaElementosSeleccionados });
                } else {
                    // this.setState({ listaOrigenElementos: listaResultados, listaElementosSeleccionados: [] });
                    this.setState({ listaElementosSeleccionados: [] });
                }
            }
            else if (JSON.stringify(nuevoProps.elementoSeleccionado) !== JSON.stringify(this.props.elementoSeleccionado)) {
                if (nuevoProps.elementoSeleccionado) {
                    // this.setState({ listaOrigenElementos: listaResultados, listaElementosSeleccionados: [nuevoProps.elementoSeleccionado] });
                    this.setState({ listaElementosSeleccionados: [nuevoProps.elementoSeleccionado] });
                } else {
                    // this.setState({ listaOrigenElementos: listaResultados, listaElementosSeleccionados: [] });
                    this.setState({ listaElementosSeleccionados: [] });
                }
            } else if (Util.esNullOUndefined(nuevoProps.elementoSeleccionado) && Util.esNullOUndefined(nuevoProps.listaElementosSeleccionados)) {
                // this.setState({ listaOrigenElementos: listaResultados, listaElementosSeleccionados: [] });
                this.setState({ listaElementosSeleccionados: [] });
            } else if (nuevoProps.elementoSeleccionado && Util.esNullOUndefined(nuevoProps.listaElementosSeleccionados) && this.state.listaElementosSeleccionados.length === 0) {
                if (nuevoProps.elementoSeleccionado) {
                    // this.setState({ listaOrigenElementos: listaResultados, listaElementosSeleccionados: [nuevoProps.elementoSeleccionado] });
                    this.setState({ listaElementosSeleccionados: [nuevoProps.elementoSeleccionado] });
                }
            } else {
                // this.setState({ listaOrigenElementos: listaResultados });
            }
        });*/
  }

  protected handleInputChange = () => {
    let datoBusqueda = "";
    this.setState({ Buscar: true });
    if (
      this.props.cantidadElementosSeleccionables !== undefined &&
      this.props.cantidadElementosSeleccionables > 0 &&
      (this.props.listaElementosSeleccionados &&
        this.props.listaElementosSeleccionados.length >=
        this.props.cantidadElementosSeleccionables)
    ) {
      return;
    }

    if (
      this.childTxtDatoBusqueda !== null &&
      this.childTxtDatoBusqueda.current !== null
    ) {
      datoBusqueda = this.childTxtDatoBusqueda.current.value;
    }

    this.setState({ datoConsulta: datoBusqueda }, () => {
      const listaResultadosCoinciden: EElementoPeoplePicker[] = [];
      const esSeleccionMultiple = this.props.cantidadElementosSeleccionables
        ? this.props.cantidadElementosSeleccionables > 0
        : true;
      const esBuscarPorCorreo = this.props.esBuscarPorCorreo
        ? this.props.esBuscarPorCorreo
        : false;

      if (this.state.datoConsulta.trim().length === 0) {
        this.setState({ listaResultadoFiltrados: listaResultadosCoinciden });
        return;
      }

      Funciones.BuscarUsuarios(
        this.state.datoConsulta,
        esBuscarPorCorreo,
        esSeleccionMultiple
      )
        .then((resultadosData: any) => {
          if (
            resultadosData.Key !== this.state.datoConsulta &&
            !resultadosData.IsResolved
          ) {
            return;
          }

          let listaResultado = [];
          if (resultadosData.IsResolved) {
            listaResultado = [resultadosData];
          } else {
            listaResultado = resultadosData.MultipleMatches;
          }

          listaResultado.forEach((elemento: any) => {
            if (
              this.props.buscarSoloGrupos ||
              this.props.buscarUsuarioYGrupos
            ) {
              if (elemento.EntityData.PrincipalType === "SharePointGroup") {
                const titulo = elemento.Key;
                const id = elemento.EntityData.SPGroupID;
                const email = "";

                const valorGrupo = new EElementoPeoplePicker(
                  false,
                  parseInt(id, 10),
                  titulo,
                  email
                );
                listaResultadosCoinciden.push(valorGrupo);
              }
            }

            if (elemento.EntityType === "User") {
              const titulo: string = elemento.DisplayText;
              const id = 0;
              const email = elemento.EntityData.Email;

              if (titulo.toUpperCase() !== "CUENTA DEL SISTEMA") {
                const valorGrupo = new EElementoPeoplePicker(
                  true,
                  id,
                  titulo,
                  email
                );
                listaResultadosCoinciden.push(valorGrupo);
              }
            }
          });

          this.setState({ listaResultadoFiltrados: listaResultadosCoinciden });
          this.setState({ Buscar: false });
        })
    });
  };

  protected handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (this.state.listaResultadoFiltrados.length === 1) {
        this.seleccionarElemento(this.state.listaResultadoFiltrados[0]);
      }
    }
  };

  protected esRepetidoSeleccionado(idElemento: number) {
    if (!this.props.listaElementosSeleccionados) {
      return false;
    }
    const resultado = this.props.listaElementosSeleccionados.filter(
      (elemento: EElementoPeoplePicker) => {
        return elemento.ID === idElemento;
      }
    );

    return resultado.length > 0;
  }
  protected seleccionarElemento = (
    elementoSeleccionado: EElementoPeoplePicker
  ) => {
    if (
      this.props.cantidadElementosSeleccionables !== undefined &&
      this.props.cantidadElementosSeleccionables > 0 &&
      (this.props.listaElementosSeleccionados &&
        this.props.listaElementosSeleccionados.length >=
        this.props.cantidadElementosSeleccionables)
    ) {
      return;
    }

    if (this.esRepetidoSeleccionado(elementoSeleccionado.ID)) {
      this.setState({
        listaResultadoFiltrados: []
      });
      return;
    }

    if (elementoSeleccionado.ID === 0) {
      Funciones.BuscarUsuarioPorLoginName(elementoSeleccionado.Email).then(
        (IdUsuario: number) => {
          elementoSeleccionado.ID = IdUsuario;

          this.selecciono = true;
          const valorListaElementosSeleccionados = Object.assign(
            [],
            this.props.listaElementosSeleccionados
          );
          valorListaElementosSeleccionados.push(elementoSeleccionado);

          this.childTxtDatoBusqueda.current!.value = "";

          this.setState(
            {
              listaResultadoFiltrados: []
              // listaElementosSeleccionados: valorListaElementosSeleccionados,
            },
            () => {
              if (this.props.eventoChange) {
                this.props.eventoChange(
                  this.props.nombreControl,
                  elementoSeleccionado,
                  valorListaElementosSeleccionados
                );
              }
            }
          );
        }
      );
    } else {
      this.selecciono = true;
      const valorListaElementosSeleccionados = Object.assign(
        [],
        this.props.listaElementosSeleccionados
      );
      valorListaElementosSeleccionados.push(elementoSeleccionado);

      this.childTxtDatoBusqueda.current!.value = "";

      this.setState(
        {
          listaResultadoFiltrados: []
          // listaElementosSeleccionados: valorListaElementosSeleccionados,
        },
        () => {
          if (this.props.eventoChange) {
            this.props.eventoChange(
              this.props.nombreControl,
              elementoSeleccionado,
              valorListaElementosSeleccionados
            );
          }
        }
      );
    }
  };

  protected deseleccionarElemento = (
    elementoSeleccionado: EElementoPeoplePicker
  ) => {
    if (
      !this.props.listaElementosSeleccionados &&
      !this.props.elementoSeleccionado
    ) {
      return;
    }

    if (this.props.listaElementosSeleccionados) {
      const listaElementosSeleccionados = this.props.listaElementosSeleccionados.filter(
        (elemento: EElementoPeoplePicker) => {
          return elemento.ID !== elementoSeleccionado.ID;
        }
      );

      if (this.props.eventoChange) {
        this.props.eventoChange(
          this.props.nombreControl,
          null,
          listaElementosSeleccionados
        );
      }
    } else if (this.props.elementoSeleccionado) {
      if (this.props.eventoChange) {
        this.props.eventoChange(this.props.nombreControl, null, []);
      }
    }
  };

  protected seccionListaElementosFiltrados() {

    if (this.state.listaResultadoFiltrados.length === 0) {
      if (this.state.Buscar) {
        return (<div>
          <ul className="input-autocompletado-elementos-filtrados">
            <span className="input-picker-title">Buscando...</span>
          </ul>
        </div>);
      } else {
        return;
      }
    }

    if (this.props.esMostrarCorreo) {
      return (
        <div>
          <ul className="input-autocompletado-elementos-filtrados">
            {this.state.listaResultadoFiltrados.map(
              (elemento: EElementoPeoplePicker, i) => {
                return (
                  <li
                    key={i}
                    onClick={this.seleccionarElemento.bind(this, elemento)}
                  >
                    <span className="input-picker-title">{elemento.Title}</span>{" "}
                    -{" "}
                    <span className="input-picker-email">{elemento.Email}</span>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <ul className="input-autocompletado-elementos-filtrados">
            {this.state.listaResultadoFiltrados.map(
              (elemento: EElementoPeoplePicker, i) => {
                return (
                  <li
                    key={i}
                    onClick={this.seleccionarElemento.bind(this, elemento)}
                  >
                    <span className="input-picker-title">{elemento.Title}</span>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      );
    }
  }

  protected seccionListaElementosSeleccionados() {
    if (
      !this.props.listaElementosSeleccionados &&
      !this.props.elementoSeleccionado
    ) {
      return;
    }

    if (
      this.props.listaElementosSeleccionados &&
      this.props.listaElementosSeleccionados.length > 0
    ) {
      return (
        <div>
          {this.props.listaElementosSeleccionados.map(
            (elemento: EElementoPeoplePicker, i) => {
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
            }
          )}
        </div>
      );
    } else if (this.props.elementoSeleccionado) {
      return (
        <div>
          <span className="input-autocompletado-elemento-seleccionado">
            <span>{this.props.elementoSeleccionado.Title}</span>
            <svg
              onClick={this.deseleccionarElemento.bind(
                this,
                this.props.elementoSeleccionado
              )}
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="presentation"
              className="input-autocompletado-boton-eliminar"
            >
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
            </svg>
          </span>
        </div>
      );
    }

    return "";
  }
}

export default ControlPeoplePicker;
