import * as React from "react";
import { ParametrosNoAdministrables } from "../../../genericos/VariablesGlobales";

export interface IPropsControlValidadorTexto {
  valor: string;
}

export interface IStateControlValidadorTexto {
  datos: {
    inicializado: boolean;
  };
}

class ControlValidadorTexto extends React.Component<
  IPropsControlValidadorTexto,
  IStateControlValidadorTexto
> {
  constructor(props: IPropsControlValidadorTexto) {
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
      ParametrosNoAdministrables.ValidadocionCampos.IngreseUnValor;

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

export default ControlValidadorTexto;
