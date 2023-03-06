import * as React from "react";

import { isNullOrUndefined } from 'util';
import EElementoCombo from '../../../models/logicas/EElementoCombo';

export interface IPropsControlSelect<T> {
    cantidadElementosSeleccionables?: number;
    elementoSeleccionado?: T | null;
    esDeshabilitado?: boolean;
    esOrdenarElementosSeleccionados?: boolean;
    habilitarBuscador?: boolean;
    listaOrigenElementos: T[];
    listaElementosSeleccionados?: T[];
    nombreControl: string,
    placeHolderInputBuscador?: string;
    placeHolderTextoSeleccione?: string;
    placeHolderTextoTodos?: string;
    placeHolderSinCoincidencias?: string;
    propiedadMostrar: string;
    eventoChange: (nombreControl: string, elementoClick: EElementoCombo | null, elementosSeleccionados: EElementoCombo[], elementoSeleccionado?: EElementoCombo | null) => void;
}

export interface IStateControlSelect<T> {
    datoConsulta: string;
    elementoSeleccionado: T | null;
    inicioBusquedaOrigenDatos: boolean;
    listaResultadoFiltrados: T[];
    listaResultadoFiltradosClonado: T[];
    listaOrigenElementos: T[];
    listaElementosSeleccionados: T[];
    listaElementosSeleccionadosClonado: T[];
    mostrarContenedorElementos: boolean,


}

class ControlSelect extends React.Component<IPropsControlSelect<EElementoCombo>, IStateControlSelect<EElementoCombo>>
{
    private node: React.RefObject<HTMLDivElement>;
    private childTxtDatoBusqueda: React.RefObject<HTMLInputElement>;

    constructor(props: IPropsControlSelect<EElementoCombo>) {
        super(props);

        this.node = React.createRef();
        this.childTxtDatoBusqueda = React.createRef();

        this.state =
            {
                datoConsulta: '',
                elementoSeleccionado: null,
                inicioBusquedaOrigenDatos: false,
                listaResultadoFiltrados: [],
                listaResultadoFiltradosClonado: [],
                listaOrigenElementos: [],
                listaElementosSeleccionados: [],
                listaElementosSeleccionadosClonado: [],
                mostrarContenedorElementos: false,
            };
    }

    public handleOutsideClick = (e: MouseEvent) => {
        const nodo = e.target as HTMLElement;
        if (this.node.current && this.node.current!.innerHTML) {

            if (this.node.current!.innerHTML.toString().indexOf(nodo.innerHTML) >= 0) {
                return;
            }

            this.inicializarComponente(this.props, false);
        }
    }

    public inicializarComponente(nuevoProps: IPropsControlSelect<EElementoCombo>, esMostrarContenedorElementos: boolean) {
        let valoresListaElementosSeleccionados: EElementoCombo[] = []
        const listaValoresOrigenElementos = nuevoProps.listaOrigenElementos;
        const listaElementosClonados = JSON.parse(JSON.stringify(listaValoresOrigenElementos));
        let valoresListaElementosSeleccionadosClonados = [];

        if (nuevoProps.listaElementosSeleccionados) {
            valoresListaElementosSeleccionados = nuevoProps.listaElementosSeleccionados;
            valoresListaElementosSeleccionadosClonados = JSON.parse(JSON.stringify(valoresListaElementosSeleccionados));
        }

        this.setState({
            elementoSeleccionado: nuevoProps.elementoSeleccionado ? nuevoProps.elementoSeleccionado : null,
            listaResultadoFiltrados: listaValoresOrigenElementos,
            listaResultadoFiltradosClonado: listaElementosClonados,
            listaOrigenElementos: listaValoresOrigenElementos,
            listaElementosSeleccionados: valoresListaElementosSeleccionados,
            listaElementosSeleccionadosClonado: valoresListaElementosSeleccionadosClonados,
            mostrarContenedorElementos: esMostrarContenedorElementos
        })
    }

    public inicializarComponenteProps(nuevoProps: IPropsControlSelect<EElementoCombo>) {
        let valoresListaElementosSeleccionados: EElementoCombo[] = []
        const listaValoresOrigenElementos = nuevoProps.listaOrigenElementos;
        const listaElementosClonados = JSON.parse(JSON.stringify(listaValoresOrigenElementos));
        let valoresListaElementosSeleccionadosClonados = [];

        if (nuevoProps.listaElementosSeleccionados) {
            valoresListaElementosSeleccionados = nuevoProps.listaElementosSeleccionados;
            valoresListaElementosSeleccionadosClonados = JSON.parse(JSON.stringify(valoresListaElementosSeleccionados));
        }

        this.setState({
            elementoSeleccionado: nuevoProps.elementoSeleccionado ? nuevoProps.elementoSeleccionado : null,
            listaResultadoFiltrados: listaValoresOrigenElementos,
            listaResultadoFiltradosClonado: listaElementosClonados,
            listaOrigenElementos: listaValoresOrigenElementos,
            listaElementosSeleccionados: valoresListaElementosSeleccionados,
            listaElementosSeleccionadosClonado: valoresListaElementosSeleccionadosClonados,
        })
    }

    public componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick, false);

        let valoresListaElementosSeleccionados: EElementoCombo[] = []
        let valorElementoSeleccionado: EElementoCombo | null = null;

        if (this.props.listaElementosSeleccionados) {
            valoresListaElementosSeleccionados = this.props.listaElementosSeleccionados;

            valoresListaElementosSeleccionados.forEach(elemento => {
                this.state.listaElementosSeleccionados.push(elemento);
            })
        }
        else if (this.props.elementoSeleccionado) {
            valorElementoSeleccionado = this.props.elementoSeleccionado;
        }

        const listaValoresOrigenElementos = this.props.listaOrigenElementos;

        const esSeleccionaMultiple: boolean = (this.props.cantidadElementosSeleccionables !== 1 ? true : false);
        let listaElementosClonados = [];
        if (esSeleccionaMultiple) {
            listaElementosClonados = JSON.parse(JSON.stringify(listaValoresOrigenElementos));
        }

        let valoresListaElementosSeleccionadosClonados = [];

        if (this.props.listaElementosSeleccionados) {
            valoresListaElementosSeleccionadosClonados = JSON.parse(JSON.stringify(valoresListaElementosSeleccionados));
        }

        /* if (this.props.eventoChange) {
            this.props.eventoChange(this.props.nombreControl, null, valoresListaElementosSeleccionados, valorElementoSeleccionado)
        }*/

        this.setState({
            elementoSeleccionado: valorElementoSeleccionado,
            listaResultadoFiltrados: listaValoresOrigenElementos,
            listaResultadoFiltradosClonado: listaElementosClonados,
            // listaResultadoFiltradosClonado: listaValoresOrigenElementos,
            listaOrigenElementos: listaValoresOrigenElementos,
            listaElementosSeleccionados: valoresListaElementosSeleccionados,
            listaElementosSeleccionadosClonado: valoresListaElementosSeleccionadosClonados,
        })
    }

    public componentWillReceiveProps(nuevoProps: IPropsControlSelect<EElementoCombo>) {
        if (JSON.stringify(this.props) !== JSON.stringify(nuevoProps) ||
            JSON.stringify(this.state.listaOrigenElementos) !== JSON.stringify(nuevoProps.listaOrigenElementos) ||
            JSON.stringify(this.state.listaElementosSeleccionados) !== JSON.stringify(nuevoProps.listaElementosSeleccionados) ||
            JSON.stringify(this.state.elementoSeleccionado) !== JSON.stringify(nuevoProps.elementoSeleccionado)) {
            this.inicializarComponenteProps(nuevoProps);
        }
    }

    public getListaElementosSeleccionados(): EElementoCombo[] {
        return this.state.listaElementosSeleccionados;
    }

    public getElementoSeleccionado(): EElementoCombo | null {
        return this.state.elementoSeleccionado;
    }

    public render() {
        const claseDeshabilitado = (this.props.esDeshabilitado ? 'control-select-contenedor disabled' : 'control-select-contenedor');

        return (
            <div className={claseDeshabilitado} ref={this.node} >
                <div className="texto-elementos-seleccionados" onClick={this.mostrarOcultarResultados}>
                    {this.getTextoElementosSeleccionados()}
                </div>
                <div className="icono-selector" onClick={this.mostrarOcultarResultados}><svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M7 10l5 5 5-5z" /></svg></div>
                {this.seccionResultados()}
            </div>
        );
    }

    protected esElementoSeleccionado(elemento: EElementoCombo) {
        if (this.props.listaElementosSeleccionados) {
            const esElementoSeleccionado = this.state.listaElementosSeleccionados.filter(elementoSeleccionado => {
                return (elementoSeleccionado.ID === elemento.ID)
            })

            if (esElementoSeleccionado.length > 0) {
                return true;
            }
        } else if (this.props.elementoSeleccionado && this.state.elementoSeleccionado !== null) {
            return (this.state.elementoSeleccionado.ID === elemento.ID)
        }

        return false;
    }

    protected esElementoSeleccionadoClonado(elemento: EElementoCombo) {
        const esElementoSeleccionado = this.state.listaElementosSeleccionadosClonado.filter(elementoSeleccionado => {
            return (elementoSeleccionado.ID === elemento.ID)
        })

        if (esElementoSeleccionado.length > 0) {
            return true;
        }

        return false;
    }

    protected mostrarOcultarResultados = () => {
        if (this.props.esDeshabilitado) {
            return;
        }
        const valorMostrarContenedorElementos = !this.state.mostrarContenedorElementos;

        this.setState({ mostrarContenedorElementos: valorMostrarContenedorElementos })
    }

    protected getTextoElementosSeleccionados() {
        let placeHolderTextoSeleccione = this.props.placeHolderTextoSeleccione;

        if (isNullOrUndefined(placeHolderTextoSeleccione)) {
            placeHolderTextoSeleccione = "Seleccione";
        }

        if (!this.esComboSeleccionMultiple()) {
            if (this.props.elementoSeleccionado) {
                return this.props.elementoSeleccionado.Title
            }
        }
        else if (this.props.listaElementosSeleccionados) {
            if (this.state.listaElementosSeleccionados.length === 0) {
                return placeHolderTextoSeleccione;
            }

            if (this.state.listaElementosSeleccionados.length === this.state.listaOrigenElementos.length) {
                let placeHolderTextoTodos = this.props.placeHolderTextoTodos;

                if (isNullOrUndefined(placeHolderTextoTodos)) {
                    placeHolderTextoTodos = "Todos";
                }

                return placeHolderTextoTodos;
            }

            if (this.props.esOrdenarElementosSeleccionados) {
                const listaTemporal = this.state.listaElementosSeleccionados.sort((n1: EElementoCombo, n2: EElementoCombo) => {
                    if (n1.Title > n2.Title) {
                        return 1;
                    }
                    if (n1.Title < n2.Title) {
                        return -1;
                    }
                    return 0;
                })

                return listaTemporal.map((elemento) => {
                    return elemento[this.props.propiedadMostrar]
                }).join(', ');
            }
            else {
                return this.state.listaElementosSeleccionados.map((elemento) => {
                    return elemento[this.props.propiedadMostrar]
                }).join(', ');
            }
        }

        return placeHolderTextoSeleccione;
    }

    protected ocultarResultadosFiltrados = () => {
        const listaValoresOrigenElementos = this.props.listaOrigenElementos;
        this.setState({ datoConsulta: "", listaResultadoFiltrados: listaValoresOrigenElementos, listaOrigenElementos: listaValoresOrigenElementos, mostrarContenedorElementos: false })
    }

    protected obtenerElementosCoincidenDatoBusqueda = () => {
        const datoBusqueda = this.state.datoConsulta.toLowerCase();

        const listaElementosFiltrados = this.state.listaOrigenElementos.filter((elemento: EElementoCombo) => {
            return (elemento.Title.toLowerCase().indexOf(datoBusqueda) !== -1);
        });

        if (this.esComboSeleccionMultiple()) {
            this.setState({ listaResultadoFiltradosClonado: listaElementosFiltrados });
        } else {
            this.setState({ listaResultadoFiltrados: listaElementosFiltrados });
        }
    }

    protected handleInputChange = () => {
        const datoBusqueda = this.childTxtDatoBusqueda.current!.value;

        this.setState({
            datoConsulta: datoBusqueda
        }, () => {
            this.obtenerElementosCoincidenDatoBusqueda();
        })
    }

    protected handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (this.state.listaResultadoFiltrados.length === 1) {
                if (this.esComboSeleccionMultiple()) {
                    this.seleccionarElementoComboSeleccionMultiple(this.state.listaResultadoFiltrados[0]);
                }
                else {
                    this.seleccionarElementoComboSeleccionUnica(this.state.listaResultadoFiltrados[0]);
                }
            }
        }
    }

    protected esComboSeleccionMultiple = (): boolean => {
        return (this.props.cantidadElementosSeleccionables !== 1 ? true : false);
    }

    protected esSeleccionadoComboSeleccionUnica(idElemento: number) {
        if (this.props.listaElementosSeleccionados) {
            const resultado = this.state.listaElementosSeleccionados.filter((elemento: EElementoCombo) => {
                return elemento.ID === idElemento;
            });

            return (resultado.length > 0);
        }
        else if (this.props.elementoSeleccionado && this.state.elementoSeleccionado) {
            return (this.state.elementoSeleccionado.ID === idElemento)
        }
        return false;
    }
    protected esSeleccionadoComboSeleccionMultiple(idElemento: number) {
        const resultado = this.state.listaElementosSeleccionadosClonado.filter((elemento: EElementoCombo) => {
            return elemento.ID === idElemento;
        });

        return (resultado.length > 0);

    }

    protected seleccionarElementoComboSeleccionUnica = (valorElementoSeleccionado: EElementoCombo) => {
        if (this.esSeleccionadoComboSeleccionUnica(valorElementoSeleccionado.ID)) {
            return;
        }

        this.setState({ elementoSeleccionado: valorElementoSeleccionado, mostrarContenedorElementos: false });

        if (this.props.eventoChange) {
            this.props.eventoChange(this.props.nombreControl, valorElementoSeleccionado, [valorElementoSeleccionado], valorElementoSeleccionado);
        }
        return;
    }

    protected seleccionarElementoComboSeleccionMultiple = (elementoSeleccionado: EElementoCombo) => {
        let listaElementosSeleccionadosClonado = Object.assign([], this.state.listaElementosSeleccionadosClonado);

        if (this.esSeleccionadoComboSeleccionMultiple(elementoSeleccionado.ID)) {
            listaElementosSeleccionadosClonado = listaElementosSeleccionadosClonado.filter((elemento: EElementoCombo) => {
                return elemento.ID !== elementoSeleccionado.ID;
            })

            this.setState({ listaElementosSeleccionadosClonado });

            /* if (this.props.eventoChange) {
                this.props.eventoChange(this.props.nombreControl, valorElementoSeleccionado, valoresListaElementosSeleccionados);
            }*/
            return;
        }

        if (this.props.cantidadElementosSeleccionables !== undefined && this.props.cantidadElementosSeleccionables > 0 && this.state.listaElementosSeleccionadosClonado.length >= this.props.cantidadElementosSeleccionables) {
            return;
        }
        listaElementosSeleccionadosClonado.push(elementoSeleccionado)

        this.setState({ listaElementosSeleccionadosClonado })
        /* if (this.props.eventoChange) {
            this.props.eventoChange(this.props.nombreControl, valorElementoSeleccionado, this.state.listaElementosSeleccionados);
        }*/

    }

    protected seleccionarTodo = (esSeleccionarTodo: boolean) => {
        const listaElementosSeleccionados: EElementoCombo[] = [];

        if (esSeleccionarTodo) {
            this.state.listaResultadoFiltradosClonado.forEach((elemento: EElementoCombo) => {
                listaElementosSeleccionados.push(JSON.parse(JSON.stringify(elemento)));
            });
        }

        this.setState({ listaElementosSeleccionadosClonado: listaElementosSeleccionados });
    }

    protected aceptarSeleccionMultiple = (esAceptarCambios: boolean) => {
        if (!this.state.mostrarContenedorElementos) {
            return;
        }

        if (esAceptarCambios) {
            const listaElementosSeleccionados = JSON.parse(JSON.stringify(this.state.listaElementosSeleccionadosClonado));

            if (this.props.eventoChange) {
                this.props.eventoChange(this.props.nombreControl, null, listaElementosSeleccionados, null)
            }
            this.setState({ listaElementosSeleccionados, mostrarContenedorElementos: false });
        }
        else {
            const listaElementosSeleccionadosClonado = JSON.parse(JSON.stringify(this.state.listaElementosSeleccionados));

            if (this.props.eventoChange) {
                this.props.eventoChange(this.props.nombreControl, null, this.state.listaElementosSeleccionados, null)
            }
            this.setState({ listaElementosSeleccionadosClonado, mostrarContenedorElementos: false });
        }
    }

    protected seccionResultados() {
        if (!this.state.mostrarContenedorElementos) {
            return "";
        }

        if (this.childTxtDatoBusqueda.current) {
            this.childTxtDatoBusqueda.current!.focus();
        }

        let claseInputBuscador = "input-buscador form-control ";
        let htmlResultados;
        let placeHolderInputBuscador = this.props.placeHolderInputBuscador;
        let placeHolderSinCoincidencias = this.props.placeHolderSinCoincidencias;

        let listaElementos = this.state.listaResultadoFiltrados;
        if (this.esComboSeleccionMultiple()) {
            listaElementos = this.state.listaResultadoFiltradosClonado;
        }

        if (!this.props.habilitarBuscador) {
            claseInputBuscador += "hidden";
        }

        if (isNullOrUndefined(placeHolderInputBuscador)) {
            placeHolderInputBuscador = "Ingrese un valor";
        }

        if (isNullOrUndefined(placeHolderSinCoincidencias)) {
            placeHolderSinCoincidencias = "No se encontraron coincidencias.";
        }

        if (listaElementos.length === 0 && this.state.listaOrigenElementos.length === 0) {
            htmlResultados = <li className="input-elemento-sinresultados">No hay elementos.</li>
        }
        else if (listaElementos.length === 0) {
            htmlResultados = <li className="input-elemento-sinresultados">{placeHolderSinCoincidencias}</li>
        }
        else {
            htmlResultados = listaElementos.map((elemento: EElementoCombo, i) => {
                let claseElementoSeleccionado = "";

                if (this.esComboSeleccionMultiple()) {
                    if (this.esElementoSeleccionadoClonado(elemento)) {
                        claseElementoSeleccionado = "seleccionado";
                    }
                }
                else {
                    if (this.esElementoSeleccionado(elemento)) {
                        claseElementoSeleccionado = "seleccionado";
                    }
                }

                if (this.esComboSeleccionMultiple()) {
                    return <li className={claseElementoSeleccionado} key={i} onClick={this.seleccionarElementoComboSeleccionMultiple.bind(this, elemento)} >{elemento.Title}</li>
                } else {
                    return <li className={claseElementoSeleccionado} key={i} onClick={this.seleccionarElementoComboSeleccionUnica.bind(this, elemento)} >{elemento.Title}</li>
                }
            })
        }

        const claseContenedorFiltros = (this.esComboSeleccionMultiple() ? "contenedor-opcionesfiltro multiple" : "contenedor-opcionesfiltro simple");

        return <div className={claseContenedorFiltros}>
            <div className="">
                {
                    (this.esComboSeleccionMultiple()) &&
                    <div className="row">
                        <div className="col-md-12">
                            <button type="button" className="btn btn-default btn80 rippledefault btn-w110 truncate" onClick={this.seleccionarTodo.bind(this, true)} ><i className="fa fa-check-circle-o mr5" aria-hidden="true" />Seleccionar todo</button>
                        </div>
                        <div className="col-md-12">
                            <button type="button" className="btn btn-default btn80 rippledefault btn-w110 truncate" onClick={this.seleccionarTodo.bind(this, false)} ><i className="fa fa-circle-o mr5" aria-hidden="true" />Deseleccionar todo</button>
                        </div>
                    </div>
                }
                <input
                    className={claseInputBuscador}
                    placeholder={placeHolderInputBuscador}
                    maxLength={255}
                    ref={this.childTxtDatoBusqueda}
                    onChange={this.handleInputChange}
                    onKeyPress={this.handleKeyPress}
                />

                {
                    (this.props.habilitarBuscador ?
                        <ul className="contenedor-elementos-filtrados">
                            {htmlResultados}
                        </ul>
                        :
                        <ul className="contenedor-elementos-filtrado mt20">
                            {htmlResultados}
                        </ul>
                    )
                }

                {
                    (this.esComboSeleccionMultiple()) &&
                    <div>
                        <div className="btn btn-primary btn80 ripple ml5 mb5 mt5 btn-w110" onClick={this.aceptarSeleccionMultiple.bind(this, true)} >Aplicar</div>
                    </div>
                }
            </div>

        </div>

    }

}

export default ControlSelect;