import * as React from "react";
import PaginaBase from "../../../ui/pagecontrol/PaginaBase";
import RegistroEmpresa from './RegistroEmpresa';
import EEmpresa from 'src/models/fisicas/EEmpresa';
import EMaestro from 'src/models/fisicas/EMaestro';
import Funciones from 'src/genericos/Funciones';
import { ParametrosNoAdministrables } from 'src/genericos/VariablesGlobales';

export interface IPropsAdministracionEmpresas {
    mostrarTab: boolean
}

export interface IStateAdministracionEmpresas {
    campos: {
        mostrarAgregarEmpresa: boolean;
        listaRegistros: EEmpresa[];
    };
}

class AdministracionEmpresas extends PaginaBase<
    IPropsAdministracionEmpresas,
    IStateAdministracionEmpresas
    > {
    public mensajes = {
    };

    private nombrePagina = "AdministracionEmpresas"

    constructor(props: IPropsAdministracionEmpresas) {
        super(props);

        this.state = {
            campos: {
                mostrarAgregarEmpresa: false,
                listaRegistros: [],
            }
        };
    }

    public componentDidMount() {
        this.obtenerDatosMaestros();
    }

    public componentWillReceiveProps(nuevasProps: IPropsAdministracionEmpresas) {
        if (nuevasProps.mostrarTab) {
            this.obtenerDatosMaestros();
        }
    }

    public obtenerDatosMaestros(): void {
        const promesas: any[] = [];
        promesas.push(Funciones.CargarEntidadMaestraSinFiltroEstado())

        this.MostrarProgreso();

        Promise.all(promesas)
            .then(([resultadoMaestros]) => {

                const datosMaestros = (resultadoMaestros as EMaestro);
                const campos = Object.assign({}, this.state.campos);
                campos.listaRegistros = datosMaestros.ListaEmpresa;

                this.setState({ campos });

                this.OcultarProgreso();
            })
            .catch(err => {
                this.MostrarMensajeError(this.nombrePagina + " - obtenerDatosMaestros", err);
            });
    }

    public mostrarAgregarEmpresa = () => {
        const campos = Object.assign({}, this.state.campos)
        campos.mostrarAgregarEmpresa = true;

        this.setState({ campos });
    };

    public ocultarAgregarEmpresa = (esRefrescar: boolean) => {
        const campos = Object.assign({}, this.state.campos)
        campos.mostrarAgregarEmpresa = false;

        if (!esRefrescar) {
            this.setState({ campos });
        }
        else {
            const promesas: any[] = [];
            promesas.push(Funciones.CargarEntidadMaestraSinFiltroEstado())

            this.MostrarProgreso();

            Promise.all(promesas)
                .then(([resultados]) => {

                    const datosMaestros = (resultados as EMaestro);
                    campos.listaRegistros = datosMaestros.ListaEmpresa;

                    this.setState({ campos });
                    this.OcultarProgreso();
                })
                .catch(err => {
                    this.MostrarMensajeError(this.nombrePagina + " - obtenerRegistros Empresas", err);
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
                    Areas
                </div>

                <div className="col-xs-12 col-lg-12 col-md-12">
                    <div className="alinea-botones">
                        <button
                            type="button"
                            className="btn btn-primary btn80 rippledefault ml5 mb5 mt5 btn-w110"
                            onClick={this.mostrarAgregarEmpresa}
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
                                        Nombre
                                    </th>
                                    <th className="text-center">
                                        Habilitado
                                    </th>
                                    <th className="text-center" />
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (this.state.campos.listaRegistros.length === 0 && !this.state.campos.mostrarAgregarEmpresa) &&
                                    <tr>
                                        <td colSpan={3}>{ParametrosNoAdministrables.Mensajes.noSeHanEncontradoElementos}</td>
                                    </tr>
                                }
                                {
                                    this.state.campos.listaRegistros.map((registro: EEmpresa, i: number) => {
                                        return <RegistroEmpresa
                                            key={i}
                                            eventoOcultar={this.ocultarAgregarEmpresa}
                                            registro={registro}
                                        />
                                    })
                                }
                                {
                                    (this.state.campos.mostrarAgregarEmpresa) &&
                                    <RegistroEmpresa
                                        eventoOcultar={this.ocultarAgregarEmpresa}
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

export default AdministracionEmpresas;