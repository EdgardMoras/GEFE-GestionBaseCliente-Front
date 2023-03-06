import * as React from "react";
import PaginaBase from "../../../ui/pagecontrol/PaginaBase";
import EConfiguracion from '../../../../models/fisicas/EConfiguracion';
import RegistroAlertaTarea from './RegistroAlertaTarea';
import Funciones from '../../../../genericos/Funciones';
import { ParametrosNoAdministrables } from '../../../../genericos/VariablesGlobales';
import EAlertaTarea from 'src/models/fisicas/EAlertaTarea';

export interface IPropsAdministracionAlertasTareas {
    mostrarTab: boolean
}

export interface IStateAdministracionAlertasTareas {
    campos: {
        configuracion: EConfiguracion;
        esHabilitadoAlertas: boolean;
        mostrarAgregarAlerta: boolean;
        listaRegistroAlerta: EAlertaTarea[];
    };
}

class AdministracionAlertasTareas extends PaginaBase<
    IPropsAdministracionAlertasTareas,
    IStateAdministracionAlertasTareas
    > {
    public mensajes = {
    };

    private nombrePagina = "AdministracionAlertasTareas"

    constructor(props: IPropsAdministracionAlertasTareas) {
        super(props);

        this.state = {
            campos: {
                configuracion: new EConfiguracion(),
                esHabilitadoAlertas: false,
                mostrarAgregarAlerta: false,
                listaRegistroAlerta: [],
            }
        };
    }

    public componentDidMount() {
        this.obtenerDatosMaestros();
    }

    public componentWillReceiveProps(nuevasProps: IPropsAdministracionAlertasTareas) {
        if (nuevasProps.mostrarTab) {
            this.obtenerDatosMaestros();
        }
    }

    public obtenerDatosMaestros(): void {
        const promesas: any[] = [];
        promesas.push(EAlertaTarea.obtenerRegistros())

        this.MostrarProgreso();

        Promise.all(promesas)
            .then(([resultadoAlertas]) => {

                const campos = Object.assign({}, this.state.campos);

                campos.listaRegistroAlerta = resultadoAlertas;

                this.setState({ campos });

                this.OcultarProgreso();
            })
            .catch(err => {
                this.MostrarMensajeError(this.nombrePagina + " - obtenerDatosMaestros", err);
            });
    }

    public mostrarAgregarAlerta = () => {
        const campos = Object.assign({}, this.state.campos)
        campos.mostrarAgregarAlerta = true;

        this.setState({ campos });
    };

    public ocultarAgregarAlerta = (esRefrescar: boolean) => {
        const campos = Object.assign({}, this.state.campos)
        campos.mostrarAgregarAlerta = false;

        if (!esRefrescar) {
            this.setState({ campos });
        }
        else {
            const promesas: any[] = [];
            promesas.push(EAlertaTarea.obtenerRegistros())

            this.MostrarProgreso();

            Promise.all(promesas)
                .then(([resultados]) => {

                    campos.listaRegistroAlerta = resultados;

                    this.setState({ campos });
                    this.OcultarProgreso();
                })
                .catch(err => {
                    this.MostrarMensajeError(this.nombrePagina + " - obtenerRegistros Tareas", err);
                });
        }
    };

    public handleCheckBox = (e: React.FormEvent<HTMLInputElement>) => {
        const { checked, name }: any = e.target;
        const campos = Object.assign({}, this.state.campos);

        if (name === "chkAlerta") {
            campos.esHabilitadoAlertas = checked;
        }

        this.actualizarConfiguracion(campos.esHabilitadoAlertas);

        this.setState({ campos });
    };

    public actualizarConfiguracion = (esHabilitadoAlertas: boolean) => {

        this.MostrarProgreso();

        const datosGuardar = EConfiguracion.getActualizarConfiguracionAlertasTareas(esHabilitadoAlertas);

        const promesaGuardar: Array<Promise<any>> = [];
        promesaGuardar.push(
            Funciones.ActualizarElemento(
                ParametrosNoAdministrables.Listas.Configuracion,
                datosGuardar,
                this.state.campos.configuracion.ID
            )
        );

        Promise.all(promesaGuardar)
            .then(([resultado]) => {
                this.OcultarProgreso();
            })
            .catch(error => {
                this.MostrarMensajeError(this.nombrePagina + " - actualizarConfiguracion", error);
            });
    };

    public render() {
        let claseTab = "tab-pane fade hidden";

        if (this.props.mostrarTab) {
            claseTab = "active in"
        }

        return (
            <div className={claseTab}>
                <div className="col-md-12 label-head-contenedor">
                    ALERTAS DE VENCIMIENTO DE PLANES DE ACCIÓN
                </div>


                <div className="col-xs-12 col-lg-12 col-md-12">
                    <dl className="data-marg-bandeja">
                        <dt className="text-desc-bandeja">
                            El sistema envía notificaciones al responsable del plan de acción según la fecha de compromiso mientras el estado sea "Pendiente" tomando en cuenta los siguientes criterios:
                    </dt>
                    </dl>
                </div>

                <div className="col-xs-12 col-lg-12 col-md-12">
                    <div className="alinea-botones">
                        <button
                            type="button"
                            className="btn btn-primary btn80 rippledefault ml5 mb5 mt5 btn-w110"
                            onClick={this.mostrarAgregarAlerta}
                        >
                            Agregar
                    </button>
                    </div>
                    <div className="clearfix" />
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
                                        Cantidad de días útiles
                              </th>
                                    <th className="text-center">
                                        antes/después del vencimiento/recurrente
                              </th>
                                    <th className="text-center">
                                        Copiar a jefe
                              </th>
                                    <th className="text-center" />
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (this.state.campos.listaRegistroAlerta.length === 0 && !this.state.campos.mostrarAgregarAlerta) &&
                                    <tr>
                                        <td colSpan={3}>{ParametrosNoAdministrables.Mensajes.noSeHanEncontradoElementos}</td>
                                    </tr>
                                }
                                {
                                    this.state.campos.listaRegistroAlerta.map((registro: EAlertaTarea, i: number) => {
                                        return <RegistroAlertaTarea
                                            key={i}
                                            eventoOcultar={this.ocultarAgregarAlerta}
                                            registro={registro}
                                        />
                                    })
                                }
                                {
                                    (this.state.campos.mostrarAgregarAlerta) &&
                                    <RegistroAlertaTarea
                                        eventoOcultar={this.ocultarAgregarAlerta}
                                    />
                                }
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

export default AdministracionAlertasTareas;