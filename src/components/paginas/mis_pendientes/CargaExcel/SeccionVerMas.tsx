import * as React from "react";
import { ComponenteAT } from "src/components/ui/formcontrol/ComponenteAT";
import Usuario from 'src/models/Base/Usuario';

export interface IPropsSeccionVerMas {
  EventoBuscar?: (subQuery: string, orderBy: string, esNuevaBusqueda: boolean, codigotarea?: string, datosUsuario?: any, ) => void;
  EventoBuscarCustom?: (subQuery: string, orderBy: string, esNuevaBusqueda: boolean,
    fechaCompromisoInicio: string, fechaCompromisoFin: string,
    fechaAsignacionInicio: string, fechaAsignacionFin: string) => void;
  datosUsuario: {
    usuario: Usuario;
    esGrupo1: boolean;
    esGrupo2: boolean;
    esGrupo3: boolean;
    esGrupo4: boolean;
    esGrupo5: boolean;
    esGrupo6: boolean;
    listaUsuarioGrupo3: Usuario[];
  };
}

class SeccionVerMas extends ComponenteAT<IPropsSeccionVerMas, {}> {
  constructor(props: IPropsSeccionVerMas) {
    super(props);
  }

  public handleVerMas = () => {

    if (this.props.EventoBuscar) {
      this.props.EventoBuscar("", "", false, "", this.props.datosUsuario);
    }
    if (this.props.EventoBuscarCustom) {
      this.props.EventoBuscarCustom("", "", false, "", "", "", "");
    }
  };

  public render() {
    return (
      <div className="row">
        <div className="col-lg-12 text-center">
          <button
            type="button"
            className="btn btn-default ml5 mb5 mt5 btn-w110 w100 rippledefault"
            onClick={this.handleVerMas}
          >
            Ver más
          </button>
        </div>
      </div>
    );
  }
}

export default SeccionVerMas;
