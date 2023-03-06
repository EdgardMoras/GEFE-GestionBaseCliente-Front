import * as React from "react";
import Modal from "@material-ui/core/Modal";
import { ParametrosNoAdministrables } from "src/genericos/VariablesGlobales";

export interface IPropModalProgreso {
  mostrarPopup: boolean;
  textoProgreso: string;
  handleOcultar: () => void;
}

export interface IStatusModalProgreso {
  mostrarPopup: boolean;
}

class ModalProgreso extends React.Component<
  IPropModalProgreso,
  IStatusModalProgreso
> {
  constructor(props: IPropModalProgreso) {
    super(props);

    this.state = { mostrarPopup: props.mostrarPopup };
  }

  public render() {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.mostrarPopup}
        onClose={this.props.handleOcultar}
        disableEscapeKeyDown={true}
      >
        <div className="modal fade in" role="dialog">
          <div className="modal-dialog modal" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="panel-body text-center">
                  <img
                    src={
                      ParametrosNoAdministrables.ValoresGenericos.urlImagenes +
                      "/img/cargando.gif"
                    }
                  />
                  <div>Procesando...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ModalProgreso;
