import * as React from "react";
import Modal from '@material-ui/core/Modal';

export interface IPropsControlModal {
    eventoOcultarPopup: (esCancelar: boolean) => void;
    eventoOk?: () => void;
    eventoCancel?: () => void;
    titulo: string;
    claseContenedor?: string;
    textoBotonOk?: string;
    textoBotonCancel?: string;
}

export class ControlModalClean extends React.Component<IPropsControlModal, {}>
{
    public render() {

        let clase = "modal-dialog modal"

        if (this.props.claseContenedor) {
            clase = this.props.claseContenedor + " modal-dialog modal";
        }

        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={true}
                onClose={this.props.eventoOcultarPopup.bind(this, false)}
                disableEscapeKeyDown={true}
            >
                <div className="modal fade in" role="dialog">
                    <div className={clase} role="document">
                        <div className="modal-content" >
                            <div className="modal-header">
                                <div className="titulo alinea-titulo mb0">
                                    {this.props.titulo}
                                </div>
                                <button
                                    type="button"
                                    className="close cerrar"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={this.props.eventoOcultarPopup.bind(this, false)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="panel-body">
                                    <div>

                                        {this.props.children}

                                        <div className="clearfix" />
                                    </div>
                                </div>
                                <div className="Mmodal-footer2">

                                    {
                                        (this.props.textoBotonOk && this.props.eventoOk) &&
                                        <button
                                            type="button"
                                            className="btn btn-primary  ml5 mb5 mt5 btn-w110 ripple"
                                            onClick={this.props.eventoOk}
                                        >{this.props.textoBotonOk}</button>
                                    }
                                    {
                                        (this.props.textoBotonCancel && this.props.eventoCancel) &&
                                        <button
                                            type="button"
                                            className="btn btn-primary ml15 btn80 ripple"
                                            onClick={this.props.eventoCancel}
                                        >{this.props.textoBotonCancel}</button>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default ControlModalClean;