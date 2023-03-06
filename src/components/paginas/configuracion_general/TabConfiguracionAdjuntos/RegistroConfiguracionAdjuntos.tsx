import * as React from "react";
import PaginaBase from "../../../ui/pagecontrol/PaginaBase";
import { ParametrosNoAdministrables } from "../../../../genericos/VariablesGlobales";
import Funciones from '../../../../genericos/Funciones';
import { ContenedorControlFormatoA } from '../../../ui/formcontrol/ContenedorControlFormatoA';
import EConfiguracion from 'src/models/fisicas/EConfiguracion';
import ControlValidadorTexto from 'src/components/ui/formcontrol/ControlValidadorTexto';

export interface IPropsRegistroConfiguracionAdjuntos {
    eventoOcultar: (refrescarPagina: boolean) => void;
    campo: string;
    nombre: string;
    registro?: EConfiguracion;
}

export interface IStateRegistroConfiguracionAdjuntos {
    campos: {
        esModificar: boolean;
        configuracion: EConfiguracion;
    };
}

class RegistroConfiguracionAdjuntos extends PaginaBase<
    IPropsRegistroConfiguracionAdjuntos,
    IStateRegistroConfiguracionAdjuntos
    > {
    public mensajes = {
        Confirmacion_DeseaActualizar: "¿Desea actualizar el registro?",
        Confirmacion_DeseaGuardar: "¿Desea guardar el registro?",
        Confirmacion_EliminarRegistro: "¿Desea eliminar el registro?",
        Informativo_SeActualizoConExito: "Se actualizó con éxito.",
        Informativo_SeEliminoConExito: "Se eliminó el registro con éxito.",
        Informativo_SeGuardoConExito: "Se guardó con éxito."
    };

    private nombrePagina = "RegistroConfiguracionAdjuntos"
    private validadorValor: React.RefObject<ControlValidadorTexto>;

    constructor(props: IPropsRegistroConfiguracionAdjuntos) {
        super(props);

        this.validadorValor = React.createRef();

        this.state = {
            campos: {
                esModificar: false,
                configuracion: new EConfiguracion(),
            },
        };
    }

    public handleInputText = (e: React.FormEvent<HTMLInputElement>) => {
        const { value, name }: any = e.target;
        const campos = Object.assign({}, this.state.campos);

        if (name === "txtExtension") {
            campos.configuracion.ExtensionArchivosNoPermitidas = value;
        } else if (name === "txtTamano") {
            campos.configuracion.TamanoMaximoPermitido = value;
        }

        this.setState({ campos });
    };

    public validarCampos() {
        let camposValidos = true;

        if (!this.validadorValor.current!.esValorValido()) {
            camposValidos = false;
        }

        return camposValidos;
    }

    public modificar = () => {
        const campos = Object.assign({}, this.state.campos);
        campos.configuracion = new EConfiguracion();
        campos.configuracion.ExtensionArchivosNoPermitidas = this.props.registro!.ExtensionArchivosNoPermitidas;
        campos.configuracion.TamanoMaximoPermitido = this.props.registro!.TamanoMaximoPermitido;
        campos.esModificar = true;

        this.setState({ campos });
    };

    public cancelarModificar = () => {
        const campos = Object.assign({}, this.state.campos);
        campos.configuracion = new EConfiguracion();
        campos.esModificar = false;

        this.setState({ campos });
    }

    public actualizar = () => {
        const camposValidados = this.validarCampos();
        if (!camposValidados) {
            this.MostrarMensajeInformativo(ParametrosNoAdministrables.Mensajes.mensajeInformativoCompletarCamposObligatorios);
            return;
        }

        this.MostrarMensajeConfirmacion(this.mensajes.Confirmacion_DeseaActualizar, () => {
            this.MostrarProgreso();

            let datosGuardar: any = {};

            if (this.props.campo === "ExtensionArchivosNoPermitidas") {
                datosGuardar = EConfiguracion.getActualizarConfiguracionExtensionArchivosNoPermitidas(this.state.campos.configuracion.ExtensionArchivosNoPermitidas);
            } else {
                datosGuardar = EConfiguracion.getActualizarConfiguracionTamanoMaximoPermitido(this.state.campos.configuracion.TamanoMaximoPermitido);
            }

            const promesaGuardar: Array<Promise<any>> = [];
            promesaGuardar.push(
                Funciones.ActualizarElemento(
                    ParametrosNoAdministrables.Listas.Configuracion,
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

    public render() {

        let html = <div />;
        if (this.props.registro && !this.state.campos.esModificar) {
            html = <tr>
                <td>
                    {this.props.nombre}
                </td>
                <td>
                    {
                        (this.props.campo === "ExtensionArchivosNoPermitidas" ?
                            this.props.registro.ExtensionArchivosNoPermitidas
                            :
                            this.props.registro.TamanoMaximoPermitido
                        )
                    }
                </td>
                <td>
                    <ul className="accion-icons">
                        <a className="pointer" onClick={this.modificar} >
                            <i
                                className="fa fa-pencil"
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
                    {this.props.nombre}
                </td>
                <td>
                    {
                        (this.props.campo === "ExtensionArchivosNoPermitidas" ?
                            <div>
                                <ContenedorControlFormatoA etiqueta="*LabelSinEtiqueta*" claseContenedor="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <input
                                        name="txtExtension"
                                        autoComplete="off"
                                        maxLength={255}
                                        value={this.state.campos.configuracion.ExtensionArchivosNoPermitidas}
                                        type="text"
                                        className="form-control"
                                        onChange={this.handleInputText}
                                    />
                                </ContenedorControlFormatoA>
                                <ControlValidadorTexto
                                    valor={this.state.campos.configuracion.ExtensionArchivosNoPermitidas}
                                    ref={this.validadorValor}
                                />
                            </div>
                            :
                            <div>
                                <ContenedorControlFormatoA etiqueta="*LabelSinEtiqueta*" claseContenedor="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <input
                                        name="txtTamano"
                                        autoComplete="off"
                                        maxLength={7}
                                        value={this.state.campos.configuracion.TamanoMaximoPermitido}
                                        type="number"
                                        className="form-control"
                                        onChange={this.handleInputText}
                                    />
                                </ContenedorControlFormatoA>
                                <ControlValidadorTexto
                                    valor={this.state.campos.configuracion.TamanoMaximoPermitido.toString()}
                                    ref={this.validadorValor}
                                />
                            </div>
                        )
                    }
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

        return (html);
    }
}

export default RegistroConfiguracionAdjuntos;