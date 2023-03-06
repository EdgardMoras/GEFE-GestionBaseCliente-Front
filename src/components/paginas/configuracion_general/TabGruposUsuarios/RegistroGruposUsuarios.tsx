import * as React from "react";
import PaginaBase from "../../../ui/pagecontrol/PaginaBase";
import { ParametrosNoAdministrables } from "../../../../genericos/VariablesGlobales";
import Funciones from '../../../../genericos/Funciones';
// import { ContenedorControlFormatoA } from '../../../ui/formcontrol/ContenedorControlFormatoA';
import ControlValidadorTexto from '../../../ui/formcontrol/ControlValidadorTexto';
import Util from 'src/genericos/Util';
import EGrupo from 'src/models/fisicas/EGrupo';
import ControlSelect from 'src/components/ui/formcontrol/ControlSelect';
import EElementoCombo from 'src/models/logicas/EElementoCombo';
import ControlValidadorSelect from 'src/components/ui/formcontrol/ControlValidadorSelect';
// import EEntidad from 'src/models/fisicas/EEntidad';
import EEmpresa from 'src/models/fisicas/EEmpresa_2';
import EElementoPeoplePicker from 'src/models/logicas/EElementoPeoplePicker';
import ControlPeoplePicker from 'src/components/ui/formcontrol/ControlPeoplePicker';
import EAprobadores from 'src/models/fisicas/EAprobadores';
// import EAprobadores from 'src/models/fisicas/EAprobadores';

export interface IPropsRegistroGruposUsuarios {
    eventoOcultar: (refrescarPagina: boolean) => void;
    registro?: any;
}

export interface IStateRegistroGruposUsuarios {
    campos: {
        esModificar: boolean;
        grupo: EGrupo;
        roles: EElementoCombo[];
        UsuarioAprobador: EElementoPeoplePicker | null;
        Empresa: EElementoCombo;
        Cargo: string;
        GrupoAprobadores: EElementoPeoplePicker | null;
    };
    itemsListas: {
        listaRoles: EElementoCombo[];
        listaEmpresa: EElementoCombo[];
    }
}

class RegistroGruposUsuarios extends PaginaBase<
    IPropsRegistroGruposUsuarios,
    IStateRegistroGruposUsuarios
    > {
    public mensajes = {
        Confirmacion_DeseaActualizar: "¿Desea actualizar el registro?",
        Confirmacion_DeseaGuardar: "¿Desea guardar el registro?",
        Confirmacion_EliminarRegistro: "¿Desea eliminar el registro?",
        Informativo_SeActualizoConExito: "Se actualizó con éxito.",
        Informativo_SeEliminoConExito: "Se eliminó el registro con éxito.",
        Informativo_SeGuardoConExito: "Se guardó con éxito."
    };

    private nombrePagina = "RegistroGruposUsuarios"
    private validadorTitle: React.RefObject<ControlValidadorTexto>;
    private validadorRoles: React.RefObject<ControlValidadorSelect>;

    constructor(props: IPropsRegistroGruposUsuarios) {
        super(props);

        this.validadorTitle = React.createRef();
        this.validadorRoles = React.createRef();

        this.state = {
            campos: {
                esModificar: false,
                grupo: new EGrupo(),
                roles: [],
                Empresa: new EElementoCombo,
                UsuarioAprobador: null,
                Cargo: "",
                GrupoAprobadores: null,

            },
            itemsListas: {
                listaRoles: [],
                listaEmpresa: []
            }
        };
    }

    public componentDidMount() {
        const promesasprocesar: Array<Promise<any[]>> = [];

        promesasprocesar.push(Funciones.ObtenerElementoPorRest(EEmpresa.getEndPointElementosActivos()))
        Promise.all(promesasprocesar)
            .then(([resultadoEmpresa]) => {
                const empresa = (resultadoEmpresa as EEmpresa[])
                empresa.map((elemento) => {
                    this.state.itemsListas.listaEmpresa.push(new EElementoCombo(elemento.ID, elemento.Title, elemento));
                });
            })


    }

    public handleInputText = (e: React.FormEvent<HTMLInputElement>) => {
        const { value, name }: any = e.target;
        const campos = Object.assign({}, this.state.campos);

        if (name === "txtTitle") {
            campos.grupo.Title = value;
        }

        if (name === "txtTitleRegister") {
            campos.Cargo = value;
        }

        this.setState({ campos });
    };

    public handleCombo = (nombreControl: string, elementoClick: EElementoCombo | null, elementosSeleccionados: EElementoCombo[], elementoSeleccionado: EElementoCombo) => {
        const state = Object.assign({}, this.state) as IStateRegistroGruposUsuarios;

        if (nombreControl === "cmbRoles") {
            state.campos.Empresa = elementoSeleccionado
        }


        this.setState(state);
    }

    public handleCheckBox = (e: React.FormEvent<HTMLInputElement>) => {
        const { checked }: any = e.target;
        const campos = Object.assign({}, this.state.campos);

        campos.grupo.EstadoElemento = false;
        if (checked) {
            campos.grupo.EstadoElemento = true;;
        }

        this.setState({ campos });
    };

    public validarCampos() {
        let camposValidos = true;

        if (this.validadorTitle) {
            if (!this.validadorTitle.current!.esValorValido()) {
                camposValidos = false;
            }
        }

        if (this.state.campos.UsuarioAprobador!.ID === 0) {
            camposValidos = false;
        }

        if (this.state.campos.Empresa.Title === "") {
            camposValidos = false;
        }

        if (this.state.campos.GrupoAprobadores!.ID === 0) {
            camposValidos = false;
        }

        return camposValidos;
    }

    public modificar = () => {
        const campos = Object.assign({}, this.state.campos);
        campos.Cargo = this.props.registro!.CargoAprobador;
        campos.grupo.EstadoElemento = this.props.registro!.EstadoElemento;



        campos.esModificar = true;

        this.setState({ campos });
    };

    public cancelarModificar = () => {
        const campos = Object.assign({}, this.state.campos);
        campos.grupo = new EGrupo();
        campos.esModificar = false;

        this.setState({ campos });
    }

    public eliminar = () => {
        this.MostrarMensajeConfirmacion(this.mensajes.Confirmacion_EliminarRegistro, () => {
            this.MostrarProgreso();

            const promesos: Array<Promise<any>> = [];
            promesos.push(
                Funciones.EliminarItem(
                    "ADM_Aprobadores",
                    this.props.registro!.ID,
                )
            );

            promesos.push(
                Funciones.EnviarDatosGetPDF(
                    ParametrosNoAdministrables.ValoresGenericos.urlServicio + "/api/config/removeGroup/" + this.props.registro!.GrupoAprobador!.ID + "/" + this.props.registro!.UsuarioAprobador!.ID
                )
            );

            // promesos.push(
            //     Funciones.EnviarDatosGetPDF(
            //         "https://canalesdigitalesqa.efectiva.pe:5443/ws_wa_asarti/api/config/removeGroup/" + this.props.registro!.GrupoAprobadores!.ID + "/" + this.props.registro!.UsuarioAprobador!.ID
            //     )
            // );

            // promesos.push(
            //     Funciones.EnviarDatosGetPDF(
            //         "https://canalesdigitalesqa.efectiva.pe:5443/ws_wa_asarti/api/config/addGrupo/" + this.state.campos.GrupoAprobadores!.ID + "/" + this.state.campos.UsuarioAprobador!.ID
            //     )
            // );



            Promise.all(promesos)
                .then(([resultados, resutlados2]) => {
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

            const datosGuardar = EAprobadores.getAprobadoresNew(true, this.state.campos.GrupoAprobadores!.ID, this.state.campos.UsuarioAprobador!.ID, new Date(Date.now()), _spPageContextInfo.userId, this.state.campos.Empresa.Title, this.state.campos.Cargo);

            const promesaGuardar: Array<Promise<any>> = [];
            promesaGuardar.push(
                Funciones.ActualizarElemento(
                    "ADM_Aprobadores",
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

    public eventoChangePeoplePicker = (nombreControl: string, elementoClick: EElementoPeoplePicker | null, elementosSeleccionados: EElementoPeoplePicker[]) => {
        if (nombreControl === "ppResponsable") {
            this.setState({ campos: { ...this.state.campos, UsuarioAprobador: elementoClick } })
        }

        if (nombreControl === "ppGrupoAprobador") {
            this.setState({ campos: { ...this.state.campos, GrupoAprobadores: elementoClick } })
        }
    };
    public guardar = () => {
        const camposValidados = this.validarCampos();
        if (!camposValidados) {
            this.MostrarMensajeInformativo(ParametrosNoAdministrables.Mensajes.mensajeInformativoCompletarCamposObligatorios);
            return;
        }

        this.MostrarMensajeConfirmacion(this.mensajes.Confirmacion_DeseaGuardar, () => {
            this.MostrarProgreso();


            const datosGuardar = EAprobadores.getAprobadoresNew(true, this.state.campos.GrupoAprobadores!.ID, this.state.campos.UsuarioAprobador!.ID, new Date(Date.now()), _spPageContextInfo.userId, this.state.campos.Empresa.Title, this.state.campos.Cargo);
            console.dir(this.state.campos.UsuarioAprobador);
            const promesaGuardar: Array<Promise<any>> = [];
            promesaGuardar.push(
                Funciones.GuardarElemento(
                    "ADM_Aprobadores",
                    datosGuardar,
                )
            );

            promesaGuardar.push(
                Funciones.EnviarDatosGetPDF(
                    ParametrosNoAdministrables.ValoresGenericos.urlServicio + "/api/config/addGrupo/" + this.state.campos.GrupoAprobadores!.ID + "/" + this.state.campos.UsuarioAprobador!.ID
                )
            );


            Promise.all(promesaGuardar)
                .then(([resultado, resultado2]) => {
                    console.dir(resultado2);
                    this.MostrarMensajeInformativoConAccion(this.mensajes.Informativo_SeGuardoConExito, () => {
                        this.props.eventoOcultar(true);
                    });
                })
                .catch(error => {
                    this.MostrarMensajeError(this.nombrePagina + " - guardar grupo", error);
                });


        });
    };

    public render() {

        let html = <div />;
        if (this.props.registro && !this.state.campos.esModificar) {
            html = <tr>
                <td className="text-center">
                    {this.props.registro.UsuarioAprobador.Title}
                </td>
                <td className="text-center">
                    {this.props.registro.CargoAprobador}
                </td>
                <td className="text-center">
                    {this.props.registro.Empresa}
                </td>
                <td className="text-center">
                    {this.props.registro.GrupoAprobador.Title}
                </td>
                <td className="text-center">
                    {Util.getTextoBool(this.props.registro.EstadoElemento)}
                </td>
                <td className="text-center">
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
                    <div className="input-group">
                        <ControlPeoplePicker
                            cantidadCaracteresIniciarBusqueda={1}
                            buscarSoloUsuarios={true}
                            elementoSeleccionado={this.state.campos.UsuarioAprobador}
                            esBuscarPorCorreo={true}
                            eventoChange={this.eventoChangePeoplePicker}
                            nombreControl="ppResponsable"
                        />
                        <span className="input-group-addon input-group-addon-reset">
                            <a href="#" className="input-group-icon">
                                <img
                                    src={ParametrosNoAdministrables.ValoresGenericos.urlImagenes + "/img/icons/ico-user.png"}
                                    width="16"
                                    height="16"
                                />
                            </a>
                        </span>
                    </div>
                </td>
                <td>
                    <div>
                        <div className="input-group">
                            <input
                                name="txtTitle"
                                autoComplete="off"
                                value={this.state.campos.Cargo}
                                type="text"
                                className="form-control"
                                onChange={this.handleInputText}
                                maxLength={255}
                            />
                            <ControlValidadorTexto
                                valor={this.state.campos.Cargo}
                                ref={this.validadorTitle}
                            />
                        </div>

                    </div>
                </td>
                <td>
                    <div className="input-group">
                        <ControlSelect
                            cantidadElementosSeleccionables={1}
                            eventoChange={this.handleCombo}
                            habilitarBuscador={false}
                            elementoSeleccionado={this.state.campos.Empresa}
                            listaOrigenElementos={this.state.itemsListas.listaEmpresa}
                            nombreControl="cmbRoles"
                            propiedadMostrar={'Title'}
                        />
                        <ControlValidadorSelect
                            valores={this.state.campos.roles}
                            ref={this.validadorRoles}
                        />
                    </div>
                    {super.render()}
                </td>
                <td>
                    <div className="input-group">
                        <ControlPeoplePicker
                            cantidadCaracteresIniciarBusqueda={1}
                            buscarSoloUsuarios={false}
                            buscarSoloGrupos={true}
                            elementoSeleccionado={this.state.campos.GrupoAprobadores}
                            esBuscarPorCorreo={true}
                            eventoChange={this.eventoChangePeoplePicker}
                            nombreControl="ppGrupoAprobador"
                        />
                        <span className="input-group-addon input-group-addon-reset">
                            <a href="#" className="input-group-icon">
                                <img
                                    src={ParametrosNoAdministrables.ValoresGenericos.urlImagenes + "/img/icons/ico-group.png"}
                                    width="16"
                                    height="16"
                                />
                            </a>
                        </span>
                    </div>
                </td>
                <td>
                    <input
                        type="checkbox"
                        name="chkRecurrente"
                        checked={
                            (this.state.campos.grupo.EstadoElemento)
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
                    <div className="input-group">
                        <ControlPeoplePicker
                            cantidadCaracteresIniciarBusqueda={1}
                            buscarSoloUsuarios={true}
                            elementoSeleccionado={this.state.campos.UsuarioAprobador}
                            esBuscarPorCorreo={true}
                            eventoChange={this.eventoChangePeoplePicker}
                            nombreControl="ppResponsable"
                        />
                        <span className="input-group-addon input-group-addon-reset">
                            <a href="#" className="input-group-icon">
                                <img
                                    src={ParametrosNoAdministrables.ValoresGenericos.urlImagenes + "/img/icons/ico-user.png"}
                                    width="16"
                                    height="16"
                                />
                            </a>
                        </span>
                    </div>
                </td>
                <td>
                    <div>
                        <div className="input-group">
                            <input
                                name="txtTitleRegister"
                                autoComplete="off"
                                value={this.state.campos.Cargo}
                                type="text"
                                className="form-control"
                                onChange={this.handleInputText}
                                maxLength={255}
                            />
                            <ControlValidadorTexto
                                valor={this.state.campos.Cargo}
                                ref={this.validadorTitle}
                            />
                        </div>

                    </div>
                </td>
                <td>
                    <div className="input-group">
                        <ControlSelect
                            cantidadElementosSeleccionables={1}
                            eventoChange={this.handleCombo}
                            habilitarBuscador={false}
                            elementoSeleccionado={this.state.campos.Empresa}
                            listaOrigenElementos={this.state.itemsListas.listaEmpresa}
                            nombreControl="cmbRoles"
                            propiedadMostrar={'Title'}
                        />
                        <ControlValidadorSelect
                            valores={this.state.campos.roles}
                            ref={this.validadorRoles}
                        />
                    </div>
                    {super.render()}
                </td>
                <td>
                    <div className="input-group">
                        <ControlPeoplePicker
                            cantidadCaracteresIniciarBusqueda={1}
                            buscarSoloUsuarios={false}
                            buscarSoloGrupos={true}
                            elementoSeleccionado={this.state.campos.GrupoAprobadores}
                            esBuscarPorCorreo={true}
                            eventoChange={this.eventoChangePeoplePicker}
                            nombreControl="ppGrupoAprobador"
                        />
                        <span className="input-group-addon input-group-addon-reset">
                            <a href="#" className="input-group-icon">
                                <img
                                    src={ParametrosNoAdministrables.ValoresGenericos.urlImagenes + "/img/icons/ico-group.png"}
                                    width="16"
                                    height="16"
                                />
                            </a>
                        </span>
                    </div>
                </td>
                <td>
                    <input
                        type="checkbox"
                        name="chkRecurrente"
                        checked={
                            (this.state.campos.grupo.EstadoElemento)
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

export default RegistroGruposUsuarios;