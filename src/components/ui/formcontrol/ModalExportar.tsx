import * as React from "react";
import ECampoExportar from '../../../models/logicas/ECampoExportar';
import PaginaBase from '../pagecontrol/PaginaBase';
import { ControlModal } from './ControlModal';

export interface IPropsModalExportar {
    eventoOcultarPopup: () => void;
    eventoExportar: (listaCampoSeleccionados: ECampoExportar[]) => void;

    listaCampos: ECampoExportar[];
    mostrar: boolean;
    titulo: string;
}

export interface IStateModalExportar {
    listaCampos: ECampoExportar[];
    marcarDesmarcarTodo: boolean;
    mostrar: boolean;
}

class ModalExportar extends PaginaBase<
    IPropsModalExportar,
    IStateModalExportar
    > {

    constructor(props: IPropsModalExportar) {
        super(props);

        this.state = {
            listaCampos: [],
            marcarDesmarcarTodo: false,
            mostrar: this.props.mostrar
        };
    }

    public componentDidMount() {
        this.inicializarControles();
    }

    public inicializarControles = () => {
        this.setState({ listaCampos: this.props.listaCampos })
    };

    public handleExportar = () => {
        const listaCamposSeleccionados = this.state.listaCampos.filter(campo => campo.esSeleccionado);

        if (listaCamposSeleccionados.length === 0) {
            this.MostrarMensajeInformativo("Seleccione por lo menos un campo.");
            return;
        }

        this.props.eventoExportar(listaCamposSeleccionados);
    }

    public handleCheckMarcarDescarcarTodo = () => {
        const stateClone = Object.assign({}, this.state);

        stateClone.listaCampos.forEach((campo: ECampoExportar) => {
            campo.esSeleccionado = !stateClone.marcarDesmarcarTodo;
        })

        this.setState({ listaCampos: stateClone.listaCampos, marcarDesmarcarTodo: !this.state.marcarDesmarcarTodo });
    };

    public handleCheck = (elemento: ECampoExportar) => {
        const stateClone = Object.assign({}, this.state);

        stateClone.listaCampos.forEach((campo: ECampoExportar) => {
            if (elemento.nombreInterno === campo.nombreInterno) {
                campo.esSeleccionado = !campo.esSeleccionado;
            }
        })

        this.setState(stateClone);
    };

    public render() {
        return (
            <ControlModal titulo={this.props.titulo}
                eventoOcultarPopup={this.props.eventoOcultarPopup.bind(this, false)}
                eventoCancel={this.props.eventoOcultarPopup.bind(this, false)}
                eventoOk={this.handleExportar}
                textoBotonCancel="CANCELAR"
                textoBotonOk="EXPORTAR">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                    <div className="col-md-12 col-sm-12 col-xs-12 mb5r text-center">
                        <div className="checkbox-custom">
                            <input type="checkbox" id="chboxmarcar" checked={this.state.marcarDesmarcarTodo} onChange={this.handleCheckMarcarDescarcarTodo} />
                            <label htmlFor="chboxmarcar" />
                        </div>
                        <span className="smalltxt">Marcar/Desmarcar todos</span>
                    </div>

                    <div className="form-group">
                        {
                            this.state.listaCampos.map((elemento: ECampoExportar, i) => {
                                return <div className="col-md-6 col-sm-6 col-xs-12 mb5r" key={i}>
                                    <div className="checkbox-custom">
                                        <input type="checkbox" id={"chbox" + i} checked={elemento.esSeleccionado} onChange={this.handleCheck.bind(this, elemento)} />
                                        <label htmlFor={"chbox" + i} />
                                    </div>
                                    <span className="smalltxt">{elemento.nombreMostrar}</span>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="clearfix" />

                {super.render()}
            </ControlModal>
        );
    }
}

export default ModalExportar;
