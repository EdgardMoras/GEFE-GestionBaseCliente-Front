import * as React from "react";
import PaginaBase from "../../../ui/pagecontrol/PaginaBase";
import { ParametrosNoAdministrables } from "../../../../genericos/VariablesGlobales";
import Funciones from '../../../../genericos/Funciones';
import { ContenedorControlFormatoA } from '../../../ui/formcontrol/ContenedorControlFormatoA';
import ControlValidadorSelect from '../../../ui/formcontrol/ControlValidadorSelect';
import EElementoCombo from '../../../../models/logicas/EElementoCombo';
import ControlSelect from '../../../ui/formcontrol/ControlSelect';
import ControlValidadorTexto from '../../../ui/formcontrol/ControlValidadorTexto';
import EAlertaTarea from 'src/models/fisicas/EAlertaTarea';
import Util from 'src/genericos/Util';

export interface IPropsRegistroAlertaTarea {
    eventoOcultar: (refrescarPagina: boolean) => void;
    registro?: EAlertaTarea;
}

export interface IStateRegistroAlertaTarea {
    campos: {
        esModificar: boolean;
        alerta: EAlertaTarea;
        tipoSeleccionado: EElementoCombo;
        CopiaJefe: boolean;
    };
    itemsListas: {
        listaTipos: EElementoCombo[];
    }
}

class RegistroAlertaTarea extends PaginaBase<
    IPropsRegistroAlertaTarea,
    IStateRegistroAlertaTarea
    > {
    public mensajes = {
        Confirmacion_DeseaActualizar: "¿Desea actualizar el registro?",
        Confirmacion_DeseaGuardar: "¿Desea guardar el registro?",
        Confirmacion_EliminarRegistro: "¿Desea eliminar el registro?",
        Informativo_SeActualizoConExito: "Se actualizó con éxito.",
        Informativo_SeEliminoConExito: "Se eliminó el registro con éxito.",
        Informativo_SeGuardoConExito: "Se guardó con éxito."
    };

    private nombrePagina = "RegistroAlertaTarea"
    private validadorCantidad: React.RefObject<ControlValidadorTexto>;
    private validadorTipo: React.RefObject<ControlValidadorSelect>;

    constructor(props: IPropsRegistroAlertaTarea) {
        super(props);

        this.validadorCantidad = React.createRef();
        this.validadorTipo = React.createRef();

        this.state = {
            campos: {
                esModificar: false,
                alerta: new EAlertaTarea(),
                tipoSeleccionado: new EElementoCombo(1, ParametrosNoAdministrables.ModuloDirectivas.TipoAlertaDirectivas.Antes),
                CopiaJefe: false,
            },
            itemsListas: {
                listaTipos: [],
            }
        };
    }

    public componentDidMount() {
        const itemsListas = Object.assign({}, this.state.itemsListas);
        itemsListas.listaTipos.push(new EElementoCombo(1, ParametrosNoAdministrables.ModuloDirectivas.TipoAlertaDirectivas.Antes));
        itemsListas.listaTipos.push(new EElementoCombo(2, ParametrosNoAdministrables.ModuloDirectivas.TipoAlertaDirectivas.Despues));

        this.setState({ itemsListas });
    }

    public handleInputText = (e: React.FormEvent<HTMLInputElement>) => {
        const { value, name }: any = e.target;
        const campos = Object.assign({}, this.state.campos);

        if (name === "txtCantidad") {
            campos.alerta.NumeroDias = value;
        }

        this.setState({ campos });
    };

    public handleCombo = (nombreControl: string, elementoClick: EElementoCombo | null, elementosSeleccionados: EElementoCombo[], elementoSeleccionado: EElementoCombo) => {
        const campos = Object.assign({}, this.state.campos);

        if (nombreControl === "cmbTipo") {
            campos.tipoSeleccionado = elementoSeleccionado
        }

        this.setState({ campos });
    }

    public validarCampos() {
        let camposValidos = true;

        if (!this.validadorCantidad.current!.esValorValido()) {
            camposValidos = false;
        }

        if (!this.validadorTipo.current!.esValorValido()) {
            camposValidos = false;
        }

        return camposValidos;
    }

    public modificar = () => {
        const campos = Object.assign({}, this.state.campos);
        campos.alerta = new EAlertaTarea();
        campos.alerta.NumeroDias = this.props.registro!.NumeroDias;
        campos.tipoSeleccionado = this.state.itemsListas.listaTipos.filter((tipo: EElementoCombo) => tipo.Title === this.props.registro!.TipoAlerta)[0];
        campos.esModificar = true;

        this.setState({ campos });
    };

    public cancelarModificar = () => {
        const campos = Object.assign({}, this.state.campos);
        campos.alerta = new EAlertaTarea();
        campos.esModificar = false;

        this.setState({ campos });
    }

    public eliminar = () => {
        this.MostrarMensajeConfirmacion(this.mensajes.Confirmacion_EliminarRegistro, () => {
            this.MostrarProgreso();

            const promesos: Array<Promise<any>> = [];
            promesos.push(
                Funciones.EliminarItem(
                    ParametrosNoAdministrables.Listas.ConfiguracionesAlertasTareas,
                    this.props.registro!.ID,
                )
            );

            Promise.all(promesos)
                .then(([resultados]) => {
                    this.MostrarMensajeInformativoConAccion(this.mensajes.Informativo_SeEliminoConExito, () => {
                        this.props.eventoOcultar(true);
                    });
                })
                .catch(error => {
                    this.MostrarMensajeError(this.nombrePagina + " - eliminar", error);
                });
        });
    };
    public handleCheckBox = (e: React.FormEvent<HTMLInputElement>) => {
        const { checked }: any = e.target;
        const campos = Object.assign({}, this.state.campos);

        campos.CopiaJefe = false;
        if (checked) {
            campos.CopiaJefe = true;
        }

        this.setState({ campos });
    };
    public actualizar = () => {
        const camposValidados = this.validarCampos();
        if (!camposValidados) {
            this.MostrarMensajeInformativo(ParametrosNoAdministrables.Mensajes.mensajeInformativoCompletarCamposObligatorios);
            return;
        }

        this.MostrarMensajeConfirmacion(this.mensajes.Confirmacion_DeseaActualizar, () => {
            this.MostrarProgreso();

            const datosGuardar = EAlertaTarea.getValoresAlertaTarea(this.state.campos.alerta.NumeroDias, this.state.campos.tipoSeleccionado.Title, this.state.campos.CopiaJefe);

            const promesaGuardar: Array<Promise<any>> = [];
            promesaGuardar.push(
                Funciones.ActualizarElemento(
                    ParametrosNoAdministrables.Listas.ConfiguracionesAlertasTareas,
                    datosGuardar,
                    this.props.registro!.ID
                )
            );

            Promise.all(promesaGuardar)
                .then(([resultado]) => {
                    this.MostrarMensajeInformativoConAccion(this.mensajes.Informativo_SeActualizoConExito, () => {
                        this.cancelarModificar();
                        this.props.eventoOcultar(true);
                    });
                })
                .catch(error => {
                    this.MostrarMensajeError(this.nombrePagina + " - actualizar", error);
                });
        });
    };

    public guardar = () => {
        const camposValidados = this.validarCampos();
        if (!camposValidados) {
            this.MostrarMensajeInformativo(ParametrosNoAdministrables.Mensajes.mensajeInformativoCompletarCamposObligatorios);
            return;
        }

        this.MostrarMensajeConfirmacion(this.mensajes.Confirmacion_DeseaGuardar, () => {
            this.MostrarProgreso();

            const datosGuardar = EAlertaTarea.getValoresAlertaTarea(this.state.campos.alerta.NumeroDias, this.state.campos.tipoSeleccionado.Title, this.state.campos.CopiaJefe);

            const promesaGuardar: Array<Promise<any>> = [];
            promesaGuardar.push(
                Funciones.GuardarElemento(
                    ParametrosNoAdministrables.Listas.ConfiguracionesAlertasTareas,
                    datosGuardar,
                )
            );

            Promise.all(promesaGuardar)
                .then(([resultado]) => {
                    this.MostrarMensajeInformativoConAccion(this.mensajes.Informativo_SeGuardoConExito, () => {
                        this.props.eventoOcultar(true);
                    });
                })
                .catch(error => {
                    this.MostrarMensajeError(this.nombrePagina + " - guardar", error);
                });
        });
    };

    public render() {

        let html = <div />;
        if (this.props.registro && !this.state.campos.esModificar) {
            html = <tr>
                <td>
                    {this.props.registro.NumeroDias}
                </td>
                <td>
                    {this.props.registro.TipoAlerta}
                </td>
                <td>
                    {Util.getTextoBool(this.props.registro.CopiaJefe)}
                </td>
                <td>
                    <ul className="accion-icons">
                        <a className="pointer" onClick={this.modificar} >
                            <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                            />
                        </a>
                        <a className="pointer" onClick={this.eliminar}>
                            <i
                                className="fa fa-trash"
                                aria-hidden="true"
                            />
                        </a>
                    </ul>
                    {super.render()}
                </td>
            </tr>
        }

        if (this.props.registro && this.state.campos.esModificar) {
            html = <tr>

                <td>
                    <ContenedorControlFormatoA etiqueta="*LabelSinEtiqueta*" claseContenedor="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <input
                            name="txtCantidad"
                            autoComplete="off"
                            value={this.state.campos.alerta.NumeroDias}
                            type="number"
                            className="form-control"
                            onChange={this.handleInputText}
                            maxLength={4}
                        />
                    </ContenedorControlFormatoA>
                    <ControlValidadorTexto
                        valor={this.state.campos.alerta.NumeroDias.toString()}
                        ref={this.validadorCantidad}
                    />
                </td>
                <td>
                    <ContenedorControlFormatoA etiqueta="*LabelSinEtiqueta*" claseContenedor="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <ControlSelect
                            cantidadElementosSeleccionables={1}
                            elementoSeleccionado={this.state.campos.tipoSeleccionado}
                            eventoChange={this.handleCombo}
                            habilitarBuscador={false}
                            listaOrigenElementos={this.state.itemsListas.listaTipos}
                            nombreControl="cmbTipo"
                            propiedadMostrar={'Title'}
                        />
                        <ControlValidadorSelect
                            valor={this.state.campos.tipoSeleccionado}
                            ref={this.validadorTipo}
                        />
                    </ContenedorControlFormatoA>
                    {super.render()}
                </td>
                <td>
                    <input
                        type="checkbox"
                        name="chkRecurrente"
                        checked={
                            (this.state.campos.CopiaJefe === true)
                        }
                        onChange={this.handleCheckBox}
                    />
                    {super.render()}
                </td>
                <td>
                    <ul className="accion-icons">
                        <a className="pointer" onClick={this.actualizar} >
                            <i
                                className="fa fa-floppy-o"
                                aria-hidden="true"
                            />
                        </a>
                        <a className="pointer" onClick={this.cancelarModificar} >
                            <i
                                className="fa fa-undo"
                                aria-hidden="true"
                            />
                        </a>
                    </ul>
                </td>
            </tr>
        }

        if (!this.props.registro) {
            html = <tr>

                <td>
                    <ContenedorControlFormatoA etiqueta="*LabelSinEtiqueta*" claseContenedor="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <input
                            name="txtCantidad"
                            autoComplete="off"
                            value={this.state.campos.alerta.NumeroDias}
                            type="number"
                            className="form-control"
                            onChange={this.handleInputText}
                            maxLength={4}
                        />
                    </ContenedorControlFormatoA>
                    <ControlValidadorTexto
                        valor={this.state.campos.alerta.NumeroDias.toString()}
                        ref={this.validadorCantidad}
                    />
                </td>
                <td>
                    <ContenedorControlFormatoA etiqueta="*LabelSinEtiqueta*" claseContenedor="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <ControlSelect
                            cantidadElementosSeleccionables={1}
                            elementoSeleccionado={this.state.campos.tipoSeleccionado}
                            eventoChange={this.handleCombo}
                            habilitarBuscador={false}
                            listaOrigenElementos={this.state.itemsListas.listaTipos}
                            nombreControl="cmbTipo"
                            propiedadMostrar={'Title'}
                        />
                        <ControlValidadorSelect
                            valor={this.state.campos.tipoSeleccionado}
                            ref={this.validadorTipo}
                        />
                    </ContenedorControlFormatoA>
                    {super.render()}
                </td>
                <td>
                    <input
                        type="checkbox"
                        name="chkRecurrente"
                        checked={
                            (this.state.campos.CopiaJefe === true)
                        }
                        onChange={this.handleCheckBox}
                    />
                    {super.render()}
                </td>
                <td>
                    <ul className="accion-icons">
                        <a className="pointer" onClick={this.guardar} >
                            <i
                                className="fa fa-floppy-o"
                                aria-hidden="true"
                            />
                        </a>
                        <a className="pointer" onClick={this.props.eventoOcultar.bind(this, false)} >
                            <i
                                className="fa fa-undo"
                                aria-hidden="true"
                            />
                        </a>
                    </ul>
                </td>
            </tr>
        }

        return (html);
    }
}

export default RegistroAlertaTarea;