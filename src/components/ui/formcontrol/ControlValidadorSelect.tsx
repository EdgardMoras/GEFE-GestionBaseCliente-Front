import * as React from "react";
import { ParametrosNoAdministrables } from "../../../genericos/VariablesGlobales";
import EElementoCombo from '../../../models/logicas/EElementoCombo';

export interface IPropsControlValidadorSelect {
  valor?: EElementoCombo | null;
  valores?: EElementoCombo[];
}

export interface IStateControlValidadorSelect {
  datos: { inicializado: boolean };
}

class ControlValidadorSelect extends React.Component<
  IPropsControlValidadorSelect,
  IStateControlValidadorSelect
  > {
  constructor(props: IPropsControlValidadorSelect) {
    super(props);

    this.state = {
      datos: { inicializado: false }
    }
  }

  public mostrarMensajeError = () => {
    this.setState({ datos: { ...this.state.datos, inicializado: true } })
  };

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
    const mensaje =
      ParametrosNoAdministrables.ValidadocionCampos.SeleccioneUnValor;

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

export default ControlValidadorSelect;
