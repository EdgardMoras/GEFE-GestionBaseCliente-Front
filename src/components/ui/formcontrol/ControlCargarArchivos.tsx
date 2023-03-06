import * as React from "react";
import EArchivo from '../../../models/logicas/EArchivo';
import ControlValidadorArchivo from './ControlValidadorArchivo';
import { ParametrosNoAdministrables } from '../../../genericos/VariablesGlobales';
import PaginaBase from '../pagecontrol/PaginaBase';
import Util from '../../../genericos/Util';
import { ContenedorControlFormatoA } from './ContenedorControlFormatoA';

export interface IPropsControlCargarArchivos {
    eventoChange?: (nombreControl: string, listaArchivos: EArchivo[], idIncidente?: number, idIncidenteTarea?: number) => void;

    claseContenedor?: string;
    etiquetaControl?: string;
    etiquetaBotonAdjuntarArchivo?: string;
    esMultiple?: boolean;
    esObligatorio?: boolean;
    esHabilitado?: boolean;
    nombreControl: string;
    esTipoInformativo?: boolean;

    listaArchivos: EArchivo[];
    idIncidente?: number;
    idIncidenteTarea?: number;

    extensionesNoPermitidas?: string;
    tamanoMaximoArchivosEnMegas?: number;

    esMostrar?: boolean;
    soloUnArchivo?: boolean;
}

export interface IStateControlCargarArchivos {
    campos: {
        listaArchivos: EArchivo[];
    };
}

export class ControlCargarArchivos extends PaginaBase<IPropsControlCargarArchivos, IStateControlCargarArchivos>
{
    public validadorArchivos: React.RefObject<ControlValidadorArchivo>;
    private mensajes = {
        Confirmacion_EstaSeguroEliminarDocumento: "¿Está seguro que desea eliminar el documento '[parametro]'?",
    };

    constructor(props: IPropsControlCargarArchivos) {
        super(props);

        this.validadorArchivos = React.createRef();

        this.state =
        {
            campos: {
                listaArchivos: []
            }
        };
    }

    public componentDidMount() {
        this.inicializarComponente(this.props);
    }

    public componentWillReceiveProps(nuevoProps: IPropsControlCargarArchivos) {
        if (JSON.stringify(this.props.listaArchivos) !== JSON.stringify(nuevoProps.listaArchivos)) {
            this.inicializarComponente(nuevoProps);
        }
    }

    public render() {
        const etiquetaBotonAdjuntarArchivo = (this.props.etiquetaBotonAdjuntarArchivo ? this.props.etiquetaBotonAdjuntarArchivo : "Adjuntar archivo");
        const etiquetaControl = (this.props.etiquetaControl ? this.props.etiquetaControl : ("Archivos"));

        const listaArchivosNoEliminados = this.state.campos.listaArchivos.filter(item => {
            return item.Eliminado === false;
        })

        const claseContenedor = (this.props.claseContenedor ? this.props.claseContenedor : "col-xs-12 col-sm-12 col-md-12 col-lg-12 mb10");

        if (!this.props.esHabilitado) {
            return <div className={claseContenedor}>
                <div className="col-md-12 bgfile b0">
                    <label className="floatleft">{etiquetaControl}: </label>
                    {
                        this.state.campos.listaArchivos.map((archivo: EArchivo, i) => {
                            return <div key={i} className="checkcolor2"><a href={Util.obtenerUrlDescarga(archivo.Ruta)}>{archivo.Nombre}</a></div>
                        })
                    }
                </div>
            </div>
        }

        return (
            <ContenedorControlFormatoA etiqueta={etiquetaControl} esObligatorio={this.props.esObligatorio} claseContenedor={claseContenedor}>
                {this.props.esTipoInformativo && (
                    <div>

                        <label className="text-label" style={{ marginTop: "-30px" }}>
                            <div className="alinea-botones alinea">
                                <label className="btn btn-coment rippledefault floatleft">
                                    <input id="my-file-selector" type="file" style={{ display: "none" }}
                                        onChange={this.eventoCargarArchivo}
                                        multiple={this.props.esMultiple}
                                    />
                                    {etiquetaBotonAdjuntarArchivo}
                                </label>
                            </div>
                        </label>

                        <div className="clearfix mb15" />
                        <div className="container-bor">
                            <div className="row">
                                {
                                    listaArchivosNoEliminados.map((archivo, i) => (
                                        <div className="user" key={i}>
                                            <div className="boxpdf">
                                                <img className="boximgpdf" src={ParametrosNoAdministrables.ValoresGenericos.urlImagenes + "/img/icons/ico-pdf.png"} width="40" height="40" />
                                                <label className="txtvar mb0">{archivo.Nombre}<br />
                                                    <span className="txt-mb">Tamaño:{" "}{Util.ObtenerSizeMB(archivo.Size)}</span>
                                                </label>
                                                <span className="imgdescarga">
                                                    {
                                                        (archivo.ID > 0 ?
                                                            <a href={Util.obtenerUrlDescarga(archivo.Ruta)}><img className="floatright mt5" src={ParametrosNoAdministrables.ValoresGenericos.urlImagenes + "/img/icons/ico-download.png"} width="30" height="30" /></a>
                                                            :
                                                            ""
                                                        )
                                                    }
                                                    {
                                                        (this.props.esHabilitado) &&
                                                        <a
                                                            className="pointer"
                                                            data-toggle="tooltip"
                                                            title="Eliminar"
                                                            onClick={this.eventoConfirmarEliminarArchivo.bind(
                                                                this,
                                                                archivo
                                                            )}
                                                        >
                                                            <img
                                                                src={ParametrosNoAdministrables.ValoresGenericos.urlImagenes + "/img/icons/ico-eliminar.png"}
                                                                width="30px"
                                                                height="30px"
                                                            />
                                                        </a>
                                                    }
                                                </span>
                                            </div>
                                            <div className="clearfix" />
                                        </div>
                                    )
                                    )}
                                {
                                    (this.props.esObligatorio) &&
                                    <ControlValidadorArchivo
                                        valor={
                                            listaArchivosNoEliminados.length
                                        }
                                        ref={this.validadorArchivos}
                                    />
                                }

                                {super.render()}
                            </div>
                            <div className="clearfix" />
                        </div>
                    </div>
                )}
                {!this.props.esTipoInformativo && (
                    <div className="col-md-12 col-xs-12 col-lg-12 bgfile">

                        {!this.props.esMostrar && (

                            <label className="btn btn-coment rippledefault floatleft" >
                                <input
                                    id="my-file-selector"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={this.eventoCargarArchivo}
                                    multiple={this.props.esMultiple}
                                />
                                {etiquetaBotonAdjuntarArchivo}
                            </label>
                        )
                        }

                        {
                            listaArchivosNoEliminados.map((archivo, i) => (
                                <div className="checkcolor4" key={i}>
                                    {
                                        (archivo.ID > 0 ?
                                            <label className="labeladjunto"><a href={Util.obtenerUrlDescarga(archivo.Ruta)}>{archivo.Nombre}</a></label>
                                            :
                                            <label className="labeladjunto">{archivo.Nombre}</label>)
                                    }

                                    {
                                        (this.props.esHabilitado) &&
                                        <a
                                            className="pointer"
                                            data-toggle="tooltip"
                                            title="Eliminar"
                                            onClick={this.eventoConfirmarEliminarArchivo.bind(
                                                this,
                                                archivo
                                            )}
                                        >
                                            <img
                                                src={ParametrosNoAdministrables.ValoresGenericos.urlImagenes + "/img/icons/ico-eliminar.png"}
                                                width="20px"
                                                height="20px"
                                            />
                                        </a>
                                    }
                                </div>
                            ))
                        }

                        {
                            (this.props.esObligatorio) &&
                            <ControlValidadorArchivo
                                valor={
                                    listaArchivosNoEliminados.length
                                }
                                ref={this.validadorArchivos}
                            />
                        }

                        {super.render()}
                    </div>
                )}
            </ContenedorControlFormatoA>
        );
    }

    private inicializarComponente(nuevoProps: IPropsControlCargarArchivos) {
        const campos = Object.assign({}, this.state.campos);
        campos.listaArchivos = nuevoProps.listaArchivos;

        this.setState({ campos });
    }

    private getExtensionArchivo = (nombreArchivo: string): string => {
        const archivoSplit = nombreArchivo.split('.');
        const extensionArchivo = archivoSplit[archivoSplit.length - 1];

        return extensionArchivo;
    }

    private getNombreArchivoSupera128SinExtension = (nombreArchivo: string) => {
        const extensionArchivo = "." + this.getExtensionArchivo(nombreArchivo);
        nombreArchivo = nombreArchivo.substring(0, ((128 - 14) - extensionArchivo.length));

        return nombreArchivo;
    }

    private obtenerNombreArchivo = (nombreArchivo: string) => {
        let nombreArchivoFixet = Util.replaceUnsupportedCharacters(nombreArchivo);

        if (nombreArchivoFixet.length > (128 - 14)) {
            nombreArchivoFixet = this.getNombreArchivoSupera128SinExtension(nombreArchivo);
            nombreArchivoFixet += this.getExtensionArchivo(nombreArchivo);
        }

        return nombreArchivoFixet;
    }

    private esNombreRepetido = (nombreArchivo: string): boolean => {

        const listaArchivosNombreRepetido = this.state.campos.listaArchivos.filter((archivo: EArchivo) => {
            return (!archivo.Eliminado && archivo.Nombre.toUpperCase() === nombreArchivo.toUpperCase())
        });

        return (listaArchivosNombreRepetido.length > 0);
    }

    private tamanoArchivoSuperaMaximoPermitido = (tamanoArchivo: number): boolean => {
        const tamanoMaximoArchivosEnMegas: number = (this.props.tamanoMaximoArchivosEnMegas ? this.props.tamanoMaximoArchivosEnMegas : ParametrosNoAdministrables.ValoresGenericos.TamanoMaximoArchivosEnMegas);
        return ((tamanoArchivo / 1024) > (tamanoMaximoArchivosEnMegas * 1024))
    }

    private esArchivoExtensionNoPermitida = (nombreArchivo: string): boolean => {
        const extensionArchivo = this.getExtensionArchivo(nombreArchivo);
        const extensionesNoPermitidas = (this.props.extensionesNoPermitidas ? this.props.extensionesNoPermitidas : ParametrosNoAdministrables.ValoresGenericos.ExtensionesNoPermitidas);

        const esExtensionNoPermitida = (extensionesNoPermitidas.split(",").filter((extension: string) => {
            return extension.toUpperCase() === extensionArchivo.toUpperCase();
        }));

        if (esExtensionNoPermitida && esExtensionNoPermitida.length > 0) {
            return true;
        }

        return false;
    }

    private eventoCargarArchivo = (e: React.FormEvent<HTMLInputElement>) => {
        const inputArchivo: any = e.target;
        const campos = Object.assign({}, this.state.campos);

        const listaArchivosRepetidos: EArchivo[] = [];
        const listaArchivosSuperanMaximoTamanoPermitido: EArchivo[] = [];
        const listaArchivosExtensionesNoPermitidas: EArchivo[] = [];
        let countFilesActivos: number = 0;
        for (const datosInputfile of inputArchivo.files) {
            const archivo = new EArchivo();
            const nombreArchivo = this.obtenerNombreArchivo(datosInputfile.name);
            archivo.setValores(0, nombreArchivo, nombreArchivo, datosInputfile.size, datosInputfile)

            if (this.esArchivoExtensionNoPermitida(nombreArchivo)) {
                listaArchivosExtensionesNoPermitidas.push(archivo);
            }
            else if (this.tamanoArchivoSuperaMaximoPermitido(archivo.Size)) {
                listaArchivosSuperanMaximoTamanoPermitido.push(archivo);
            }
            else {
                if (this.esNombreRepetido(nombreArchivo)) {
                    listaArchivosRepetidos.push(archivo)
                }
                else {
                    if (this.props.soloUnArchivo) {

                        campos.listaArchivos.forEach(element => {
                            if (!element.Eliminado) {
                                countFilesActivos = countFilesActivos + 1;
                            }
                        });

                        if (countFilesActivos === 0) {
                            campos.listaArchivos.push(archivo);
                        }

                    } else {
                        campos.listaArchivos.push(archivo);
                    }
                }
            }
        }

        const tamanoMaximoArchivosEnMegas: number = (this.props.tamanoMaximoArchivosEnMegas ? this.props.tamanoMaximoArchivosEnMegas : ParametrosNoAdministrables.ValoresGenericos.TamanoMaximoArchivosEnMegas);
        const extensionesNoPermitidas = (this.props.extensionesNoPermitidas ? this.props.extensionesNoPermitidas : ParametrosNoAdministrables.ValoresGenericos.ExtensionesNoPermitidas);

        if (listaArchivosExtensionesNoPermitidas.length === 0) {
            if (listaArchivosSuperanMaximoTamanoPermitido.length === 0) {
                this.actualizarState(listaArchivosRepetidos, campos, inputArchivo);
            } else {
                const mensaje = "Los siguientes archivos no se agregarán porque superan el tamaño máximo permitido (" + tamanoMaximoArchivosEnMegas + " MB): " + listaArchivosSuperanMaximoTamanoPermitido.map(archivo => archivo.Nombre).join(", ") + "?"
                this.MostrarMensajeInformativoConAccion(mensaje, () => {
                    this.actualizarState(listaArchivosRepetidos, campos, inputArchivo);
                });
            }
        } else {
            const mensaje = "Los siguientes archivos no se agregarán porque tienen extensiones no permitidas (" + extensionesNoPermitidas + "): " + listaArchivosExtensionesNoPermitidas.map(archivo => archivo.Nombre).join(", ") + "?"
            this.MostrarMensajeInformativoConAccion(mensaje, () => {
                if (listaArchivosSuperanMaximoTamanoPermitido.length === 0) {
                    this.actualizarState(listaArchivosRepetidos, campos, inputArchivo);
                } else {
                    const mensajeConfirmacion = "Los siguientes archivos no se agregarán porque superan el tamaño máximo permitido (" + tamanoMaximoArchivosEnMegas + " MB): " + listaArchivosSuperanMaximoTamanoPermitido.map(archivo => archivo.Nombre).join(", ") + "?"
                    this.MostrarMensajeInformativoConAccion(mensajeConfirmacion, () => {
                        this.actualizarState(listaArchivosRepetidos, campos, inputArchivo);
                    });
                }
            });
        }
    };

    private actualizarState = (listaArchivosRepetidos: EArchivo[], campos: any, inputArchivo: any) => {
        if (listaArchivosRepetidos.length === 0) {
            if (this.props.eventoChange) {
                this.props.eventoChange(this.props.nombreControl, campos.listaArchivos, this.props.idIncidente, this.props.idIncidenteTarea);
            } else {
                this.setState({ campos });
            }
            inputArchivo.value = "";
        }
        else {
            const mensaje = "¿Desea reemplazar los archivos: " + listaArchivosRepetidos.map(archivo => archivo.Nombre).join(", ") + "?"
            this.MostrarMensajeConfirmacion(mensaje, () => {

                const camposClone = Object.assign({}, this.state.campos);

                listaArchivosRepetidos.forEach((archivoRepetido: EArchivo) => {
                    const archivoAReemplazar = camposClone.listaArchivos.filter((archivo: EArchivo) => {
                        return archivo.Nombre.toUpperCase() === archivoRepetido.Nombre.toUpperCase();
                    })[0]

                    archivoAReemplazar.Eliminado = true;
                    camposClone.listaArchivos.push(archivoRepetido);
                })

                if (this.props.eventoChange) {
                    this.props.eventoChange(this.props.nombreControl, camposClone.listaArchivos, this.props.idIncidente, this.props.idIncidenteTarea);
                }
                else {
                    this.setState({ campos: camposClone });
                }
            }, () => {
                if (this.props.eventoChange) {
                    this.props.eventoChange(this.props.nombreControl, this.state.campos.listaArchivos, this.props.idIncidente, this.props.idIncidenteTarea);
                }
                else {
                    this.setState({ campos });
                }
                inputArchivo.value = "";
            });
        }
    }

    private eventoConfirmarEliminarArchivo = (
        archivoAEliminar: EArchivo,
    ) => {
        const mensaje = this.mensajes.Confirmacion_EstaSeguroEliminarDocumento.replace("[parametro]", archivoAEliminar.Nombre);

        this.MostrarMensajeConfirmacion(mensaje, () => {
            this.MostrarProgreso();

            const campos = Object.assign({}, this.state.campos);



            campos.listaArchivos.forEach((archivo, i) => {
                if (archivo.Eliminado === false && archivo.ID === archivoAEliminar.ID && archivo.Nombre.toUpperCase() === archivoAEliminar.Nombre.toUpperCase()) {
                    archivo.Eliminado = true;
                }


            }
            )

            if (this.props.eventoChange) {
                this.props.eventoChange(this.props.nombreControl, this.state.campos.listaArchivos, this.props.idIncidente, this.props.idIncidenteTarea);
            }

            this.setState({ campos });
            this.OcultarProgreso();
        });
    };


}

export default ControlCargarArchivos;