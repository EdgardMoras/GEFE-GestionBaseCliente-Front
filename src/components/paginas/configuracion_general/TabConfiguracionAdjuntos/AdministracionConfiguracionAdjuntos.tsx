import * as React from "react";
import PaginaBase from "../../../ui/pagecontrol/PaginaBase";
import EConfiguracion from 'src/models/fisicas/EConfiguracion';
import RegistroConfiguracionAdjuntos from './RegistroConfiguracionAdjuntos';

export interface IPropsAdministracionConfiguracionAdjuntos {
    mostrarTab: boolean
}

export interface IStateAdministracionConfiguracionAdjuntos {
    campos: {
        configuracion: EConfiguracion;
    };
}

class AdministracionConfiguracionAdjuntos extends PaginaBase<
    IPropsAdministracionConfiguracionAdjuntos,
    IStateAdministracionConfiguracionAdjuntos
    > {
    public mensajes = {
    };

    private nombrePagina = "AdministracionConfiguracionAdjuntos"

    constructor(props: IPropsAdministracionConfiguracionAdjuntos) {
        super(props);

        this.state = {
            campos: {
                configuracion: new EConfiguracion,
            }
        };
    }

    public componentDidMount() {
        this.obtenerDatosMaestros();
    }

    public componentWillReceiveProps(nuevasProps: IPropsAdministracionConfiguracionAdjuntos) {
        if (nuevasProps.mostrarTab) {
            this.obtenerDatosMaestros();
        }
    }

    public obtenerDatosMaestros(): void {
        const promesas: any[] = [];
        promesas.push(EConfiguracion.obtenerRegistros())

        this.MostrarProgreso();

        Promise.all(promesas)
            .then(([resultadoConfiguracion]) => {

                const campos = Object.assign({}, this.state.campos);
                campos.configuracion = resultadoConfiguracion;

                this.setState({ campos });

                this.OcultarProgreso();
            })
            .catch(err => {
                this.MostrarMensajeError(this.nombrePagina + " - obtenerDatosMaestros", err);
            });
    }

    public ocultarAgregar = (esRefrescar: boolean) => {
        const campos = Object.assign({}, this.state.campos)

        if (!esRefrescar) {
            this.setState({ campos });
        }
        else {
            const promesas: any[] = [];
            promesas.push(EConfiguracion.obtenerRegistros())

            this.MostrarProgreso();

            Promise.all(promesas)
                .then(([resultados]) => {

                    campos.configuracion = resultados;

                    this.setState({ campos });
                    this.OcultarProgreso();
                })
                .catch(err => {
                    this.MostrarMensajeError(this.nombrePagina + " - obtenerRegistros Configuracion", err);
                });
        }
    };

    public render() {
        let claseTab = "tab-pane fade hidden";

        if (this.props.mostrarTab) {
            claseTab = "active in"
        }

        return (
            <div className={claseTab}>
                <div className="col-md-12 label-head-contenedor">
                    CONFIGURACIÓN DE ADJUNTOS
                </div>

                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="table-responsive mt10">
                        <table
                            id="mytable"
                            className="table table-bordred table-striped"
                        >
                            <thead>
                                <tr>
                                    <th className="text-center">
                                        Nombre
                                    </th>
                                    <th className="text-center">
                                        Valor
                                    </th>
                                    <th className="text-center" />
                                </tr>
                            </thead>
                            <tbody>
                                <RegistroConfiguracionAdjuntos
                                    eventoOcultar={this.ocultarAgregar}
                                    campo="ExtensionArchivosNoPermitidas"
                                    nombre="Extensiones de archivos no permitidas (separadas por coma)"
                                    registro={this.state.campos.configuracion}
                                />
                                <RegistroConfiguracionAdjuntos
                                    eventoOcultar={this.ocultarAgregar}
                                    campo="TamanoMaximoPermitido"
                                    nombre="Tamaño máximo permitido (MB)"
                                    registro={this.state.campos.configuracion}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>

                {super.render()}
                <div className="clearfix" />
            </div>
        );
    }
}

export default AdministracionConfiguracionAdjuntos;