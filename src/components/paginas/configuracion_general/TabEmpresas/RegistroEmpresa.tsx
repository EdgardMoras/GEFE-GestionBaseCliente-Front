import * as React from "react";
import PaginaBase from "../../../ui/pagecontrol/PaginaBase";
import { ParametrosNoAdministrables } from "../../../../genericos/VariablesGlobales";
import Funciones from '../../../../genericos/Funciones';
import { ContenedorControlFormatoA } from '../../../ui/formcontrol/ContenedorControlFormatoA';
import ControlValidadorTexto from '../../../ui/formcontrol/ControlValidadorTexto';
import Util from 'src/genericos/Util';
import EEmpresa from 'src/models/fisicas/EEmpresa';

export interface IPropsRegistroEmpresa {
    eventoOcultar: (refrescarPagina: boolean) => void;
    registro?: EEmpresa;
}

export interface IStateRegistroEmpresa {
    campos: {
        esModificar: boolean;
        empresa: EEmpresa;
    };
}

class RegistroEmpresa extends PaginaBase<
    IPropsRegistroEmpresa,
    IStateRegistroEmpresa
    > {
    public mensajes = {
        Confirmacion_DeseaActualizar: "¿Desea actualizar el registro?",
        Confirmacion_DeseaGuardar: "¿Desea guardar el registro?",
        Confirmacion_EliminarRegistro: "¿Desea eliminar el registro?",
        Informativo_SeActualizoConExito: "Se actualizó con éxito.",
        Informativo_SeEliminoConExito: "Se eliminó el registro con éxito.",
        Informativo_SeGuardoConExito: "Se guardó con éxito."
    };

    private nombrePagina = "RegistroEmpresa"
    private validadorTitle: React.RefObject<ControlValidadorTexto>;

    constructor(props: IPropsRegistroEmpresa) {
        super(props);

        this.validadorTitle = React.createRef();

        this.state = {
            campos: {
                esModificar: false,
                empresa: new EEmpresa(),
            },
        };
    }

    public handleInputText = (e: React.FormEvent<HTMLInputElement>) => {
        const { value, name }: any = e.target;
        const campos = Object.assign({}, this.state.campos);

        if (name === "txtTitle") {
            campos.empresa.Title = value;
        }

        this.setState({ campos });
    };

    public handleCheckBox = (e: React.FormEvent<HTMLInputElement>) => {
        const { checked }: any = e.target;
        const campos = Object.assign({}, this.state.campos);

        campos.empresa.EstadoElemento = false;
        if (checked) {
            campos.empresa.EstadoElemento = true;
        }

        this.setState({ campos });
    };

    public validarCampos() {
        let camposValidos = true;

        if (!this.validadorTitle.current!.esValorValido()) {
            camposValidos = false;
        }

        return camposValidos;
    }

    public modificar = () => {
        const campos = Object.assign({}, this.state.campos);
        campos.empresa = new EEmpresa();
        campos.empresa.Title = this.props.registro!.Title;
        campos.empresa.EstadoElemento = this.props.registro!.EstadoElemento;
        campos.esModificar = true;

        this.setState({ campos });
    };

    public cancelarModificar = () => {
        const campos = Object.assign({}, this.state.campos);
        campos.empresa = new EEmpresa();
        campos.esModificar = false;

        this.setState({ campos });
    }

    public eliminar = () => {
        this.MostrarMensajeConfirmacion(this.mensajes.Confirmacion_EliminarRegistro, () => {
            this.MostrarProgreso();

            const promesos: Array<Promise<any>> = [];
            promesos.push(
                Funciones.EliminarItem(
                    ParametrosNoAdministrables.Listas.ListaMaestros,
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

    public actualizar = () => {
        const camposValidados = this.validarCampos();
        if (!camposValidados) {
            this.MostrarMensajeInformativo(ParametrosNoAdministrables.Mensajes.mensajeInformativoCompletarCamposObligatorios);
            return;
        }

        this.MostrarMensajeConfirmacion(this.mensajes.Confirmacion_DeseaActualizar, () => {
            this.MostrarProgreso();

            const datosGuardar = EEmpresa.getValoresEmpresa(this.state.campos.empresa.Title, this.state.campos.empresa.EstadoElemento);

            const promesaGuardar: Array<Promise<any>> = [];
            promesaGuardar.push(
                Funciones.ActualizarElemento(
                    "ADM_Area   ",
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

            const datosGuardar = EEmpresa.getValoresEmpresa(this.state.campos.empresa.Title, this.state.campos.empresa.EstadoElemento);

            const promesaGuardar: Array<Promise<any>> = [];
            promesaGuardar.push(
                Funciones.GuardarElemento(
                    "ADM_Area",
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
                    {this.props.registro.Title}
                </td>
                <td>
                    {Util.getTextoBool(this.props.registro.EstadoElemento)}
                </td>
                <td>
                    <ul className="accion-icons">
                        <a className="pointer" onClick={this.modificar} >
                            <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                            />
                        </a>
                        <a className="pointer" onClick={this.eliminar} >
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
                            name="txtTitle"
                            autoComplete="off"
                            value={this.state.campos.empresa.Title}
                            type="text"
                            className="form-control"
                            onChange={this.handleInputText}
                            maxLength={255}
                        />
                    </ContenedorControlFormatoA>
                    <ControlValidadorTexto
                        valor={this.state.campos.empresa.Title}
                        ref={this.validadorTitle}
                    />
                </td>
                <td>
                    <input
                        type="checkbox"
                        name="chkRecurrente"
                        checked={
                            (this.state.campos.empresa.EstadoElemento === true)
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
                            name="txtTitle"
                            autoComplete="off"
                            value={this.state.campos.empresa.Title}
                            type="text"
                            className="form-control"
                            onChange={this.handleInputText}
                            maxLength={255}
                        />
                    </ContenedorControlFormatoA>
                    <ControlValidadorTexto
                        valor={this.state.campos.empresa.Title}
                        ref={this.validadorTitle}
                    />
                </td>
                <td>
                    <input
                        type="checkbox"
                        name="chkRecurrente"
                        checked={
                            (this.state.campos.empresa.EstadoElemento === true)
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

export default RegistroEmpresa;