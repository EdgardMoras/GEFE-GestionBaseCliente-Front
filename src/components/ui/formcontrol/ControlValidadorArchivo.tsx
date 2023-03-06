import * as React from "react";
import { ParametrosNoAdministrables } from "../../../genericos/VariablesGlobales";

export interface IPropsControlValidadorArchivo {
  valor: number;
}

export interface IStateControlValidadorArchivo {
  datos: {
    inicializado: boolean;
  };
}

class ControlValidadorArchivo extends React.Component<
  IPropsControlValidadorArchivo,
  IStateControlValidadorArchivo
> {
  constructor(props: IPropsControlValidadorArchivo) {
    super(props);

    this.state = {
      datos: { inicializado: false }
    };
  }

  public esValorValido = () => {
    this.state.datos.inicializado = true;
    this.setState(this.state);

    return this.props.valor > 0;
  };

  public render() {
    let mostrar = false;
    const mensaje =
      ParametrosNoAdministrables.ValidadocionCampos.CargueUnArchivo;

    if (this.props.valor !== 0) {
      this.state.datos.inicializado = true;
    }

    if (this.props.valor === 0 && this.state.datos.inicializado) {
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

export default ControlValidadorArchivo;
