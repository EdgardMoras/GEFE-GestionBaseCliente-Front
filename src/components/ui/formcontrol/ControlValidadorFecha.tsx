import * as React from "react";
import { ParametrosNoAdministrables } from "../../../genericos/VariablesGlobales";

export interface IPropsControlValidadorFecha {
  valor: string;
}

export interface IStateControlValidadorFecha {
  datos: {
    inicializado: boolean;
  };
}

class ControlValidadorFecha extends React.Component<
  IPropsControlValidadorFecha,
  IStateControlValidadorFecha
> {
  constructor(props: IPropsControlValidadorFecha) {
    super(props);

    this.state = {
      datos: { inicializado: false }
    };
  }

  public esValorValido = () => {
    this.state.datos.inicializado = true;
    this.setState(this.state);

    return this.props.valor !== "";
  };

  public render() {
    let mostrar = false;
    const mensaje =
      ParametrosNoAdministrables.ValidadocionCampos.IngreseUnaFecha;

    if (this.props.valor !== "") {
      this.state.datos.inicializado = true;
    }

    if (this.props.valor === "" && this.state.datos.inicializado) {
      mostrar = true;
    }

    return (
      <div
        className="field-validation-error"
        style={{
          display: mostrar ? "block" : "none"
        }}
      >
        {mensaje}
      </div>
    );
  }
}

export default ControlValidadorFecha;
