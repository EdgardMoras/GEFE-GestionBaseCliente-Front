import * as React from "react";
import { ParametrosNoAdministrables } from "../../../genericos/VariablesGlobales";
import EElementoPeoplePicker from '../../../models/logicas/EElementoPeoplePicker';

export interface IPropsControlValidadorPeoplePicker {
    mensajeBusqueUnUsuario?: string;
    valor?: EElementoPeoplePicker | null;
    valores?: EElementoPeoplePicker[];
}

export interface IStateControlValidadorPeoplePicker {
    datos: { inicializado: boolean };
}

class ControlValidadorPeoplePicker extends React.Component<
    IPropsControlValidadorPeoplePicker,
    IStateControlValidadorPeoplePicker
    > {
    constructor(props: IPropsControlValidadorPeoplePicker) {
        super(props);

        this.state = {
            datos: { inicializado: false }
        }
    }

    public esValorValido = () => {
        this.state.datos.inicializado = true;
        this.setState(this.state);

        if (this.props.valores) {
            return this.props.valores.length > 0
        } else if (this.props.valor) {
            return this.props.valor !== null
        }
        return false;
    };

    public render() {
        let mostrar = false;
        let mensaje =
            ParametrosNoAdministrables.ValidadocionCampos.BusqueUnUsuario;

        if (this.props.mensajeBusqueUnUsuario) {
            mensaje = this.props.mensajeBusqueUnUsuario;
        }

        if (this.props.valores) {
            if (this.props.valores.length > 0) {
                this.state.datos.inicializado = true;
            } else {
                mostrar = true;
            }
        } else if (this.props.valor) {
            this.state.datos.inicializado = true;
        }
        else {
            mostrar = true;
        }

        return (
            <div
                className="field-validation-error"
                style={{
                    display: mostrar && this.state.datos.inicializado ? "block" : "none"
                }}
            >
                {mensaje}
            </div>
        );
    }
}

export default ControlValidadorPeoplePicker;
