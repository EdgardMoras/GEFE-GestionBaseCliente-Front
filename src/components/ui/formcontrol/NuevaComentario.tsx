import * as React from "react";
import ControlValidadorTexto from "./ControlValidadorTexto";
import ENotaExpediente from "../../../models/fisicas/ENotaExpediente";
import PaginaBase from "../pagecontrol/PaginaBase";
import { ParametrosNoAdministrables } from "../../../genericos/VariablesGlobales";
import { ContenedorControlFormatoA } from "./ContenedorControlFormatoA";
import { ControlCargarArchivos } from "./ControlCargarArchivos";
import EArchivo from "../../../models/logicas/EArchivo";
import EArchivoExpediente from "../../../models/logicas/EArchivoExpediente";

export interface IPropsNuevaComentario {
    eventoGuardar: (nota: ENotaExpediente) => void;
    ocultarSeccionNuevaNota: () => void;
    mensajeConfirmacion_RegistrarNota: string;
    titulo?: string;
    extensionesNoPermitidas: string;
    tamanoMaximoArchivosEnMegas: number;
}

export interface IStateNuevaComentario {
    campos: {
        nota: ENotaExpediente;
    };
}

class NuevaComentario extends PaginaBase<IPropsNuevaComentario, IStateNuevaComentario> {
    public nombrePagina = "NuevaComentario";

    private childrenControlCargarArchivos: React.RefObject<ControlCargarArchivos>;
    private validadorNota: React.RefObject<ControlValidadorTexto>;

    constructor(props: IPropsNuevaComentario) {
        super(props);

        this.childrenControlCargarArchivos = React.createRef();
        this.validadorNota = React.createRef();

        this.state = {
            campos: {
                nota: new ENotaExpediente()
            }
        };
    }

    public handleTextArea = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const { value, name }: any = e.target;
        const campos = Object.assign({}, this.state.campos);

        if (name === "txtNota") {
            campos.nota.Nota = value;
        }

        this.setState({ campos });
    };

    public eventoChangeCargarArchivos = (nombreControl: string, listaArchivos: EArchivo[]) => {
        const campos = Object.assign({}, this.state.campos);

        const listaArchivosExpedientes: EArchivoExpediente[] = listaArchivos.map((archivo: EArchivo) => {
            const archivoExpediente = new EArchivoExpediente();
            archivoExpediente.setValoresDesdeEArchivo(archivo);
            return archivoExpediente;
        });

        campos.nota.ListaArchivos = listaArchivosExpedientes;

        this.setState({ campos });
    };

    public validarCampos() {
        let camposValidos = true;

        if (!this.validadorNota.current!.esValorValido()) {
            camposValidos = false;
        }

        return camposValidos;
    }

    public guardarNuevaNota = () => {
        const camposValidados = this.validarCampos();
        if (!camposValidados) {
            this.MostrarMensajeInformativo(ParametrosNoAdministrables.Mensajes.mensajeInformativoCompletarCamposObligatorios);
            return;
        }

        this.MostrarMensajeConfirmacion(this.props.mensajeConfirmacion_RegistrarNota, () => {
            this.props.eventoGuardar(this.state.campos.nota);
        });
    };

    public render() {
        const tituloComponente = this.props.titulo ? this.props.titulo : "NUEVO COMENTARIO";

        return (
            <div className="col-xs-12 col-md-12 col-lg-12 mb10">
                <div className="head-contenedorx turkesa">
                    <span className="estado">{tituloComponente}</span>
                    <div id="navcode" className="floatright">
                        <ul>
                            <li className="pointer" onClick={this.guardarNuevaNota}>
                                <a>
                                    <i className="fa fa-floppy-o" aria-hidden="true" />
                                </a>
                            </li>
                            <li className="pointer" onClick={this.props.ocultarSeccionNuevaNota}>
                                <a>
                                    <i className="fa fa-times-circle" aria-hidden="true" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-12 comentbor3">
                    <div className="bor">
                        <div className="col-md-12 pb15">
                            <ContenedorControlFormatoA etiqueta="Comentario" esObligatorio={true} claseContenedor="mt10">
                                <textarea name="txtNota" onChange={this.handleTextArea} rows={4} value={this.state.campos.nota.Nota} />
                                <ControlValidadorTexto valor={this.state.campos.nota.Nota} ref={this.validadorNota} />
                            </ContenedorControlFormatoA>

                            {<ControlCargarArchivos claseContenedor=" " eventoChange={this.eventoChangeCargarArchivos} esMultiple={true} esObligatorio={false} esHabilitado={true} nombreControl="caArchivos" etiquetaControl=" " listaArchivos={this.state.campos.nota.ListaArchivos} ref={this.childrenControlCargarArchivos} 
                             extensionesNoPermitidas = {this.props.extensionesNoPermitidas}
                             tamanoMaximoArchivosEnMegas = {this.props.tamanoMaximoArchivosEnMegas}
                             />}
                        </div>
                    </div>
                </div>
                {super.render()}
                <div className="clearfix" />
            </div>
        );
    }
}

export default NuevaComentario;
