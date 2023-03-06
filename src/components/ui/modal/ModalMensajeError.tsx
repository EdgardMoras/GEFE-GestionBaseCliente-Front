import * as React from "react";
import Modal from "@material-ui/core/Modal";

export interface IPropModalMensajeError {
  mostrarPopup: boolean;
  textoMensaje: string;
  tieneAccionCerrar: boolean;
  handleOcultar: () => void;
}

export interface IStatusModalMensajeError {
  mostrarPopup: boolean;
}

class ModalMensajeError extends React.Component<
  IPropModalMensajeError,
  IStatusModalMensajeError
  > {
  constructor(props: IPropModalMensajeError) {
    super(props);

    this.state = { mostrarPopup: props.mostrarPopup };
  }

  public render() {
    let botonCerrar;
    let botonAceptar;

    if (this.props.tieneAccionCerrar) {
      botonCerrar = (
        <button
          type="button"
          className="close cerrar"
          data-dismiss="modal"
          aria-label="Close"
          onClick={this.props.handleOcultar}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      );

      botonAceptar = (
        <div className="modal-footer2">
          <button
            type="button"
            className="btn btn-primary btn80 ripple ml5 mb5 mt5 btn-w110"
            onClick={this.props.handleOcultar}
          >
            Aceptar
          </button>
        </div>
      );
    }

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
              <div className="modal-header">
                <div className="titulo alinea-titulo mb0">Mensaje de error</div>
                {botonCerrar}
              </div>
              <div className="modal-body">
                <div className="panel-body text-center">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label className="text-label">
                        {this.props.textoMensaje}
                      </label>
                    </div>
                  </div>

                  <div className="clearfix" />
                </div>
              </div>

              {botonAceptar}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ModalMensajeError;
