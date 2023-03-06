import * as React from "react";
import PaginaBase from "../../../ui/pagecontrol/PaginaBase";
import RegistroGruposUsuarios from './RegistroGruposUsuarios';
import Funciones from 'src/genericos/Funciones';
import { ParametrosNoAdministrables } from 'src/genericos/VariablesGlobales';
// import EGrupo from 'src/models/fisicas/EGrupo';
import EAprobadores from 'src/models/fisicas/EAprobadores';

export interface IPropsAdministracionGruposUsuarios {
    mostrarTab: boolean
}

export interface IStateAdministracionGruposUsuarios {
    campos: {
        mostrarAgregar: boolean;
        listaRegistros: any[];
    };
}

class AdministracionGruposUsuarios extends PaginaBase<
    IPropsAdministracionGruposUsuarios,
    IStateAdministracionGruposUsuarios
    > {
    public mensajes = {
    };

    private nombrePagina = "AdministracionGruposUsuarios"

    constructor(props: IPropsAdministracionGruposUsuarios) {
        super(props);

        this.state = {
            campos: {
                mostrarAgregar: false,
                listaRegistros: [],
            }
        };
    }

    public componentDidMount() {
        this.obtenerDatosMaestros();
    }

    public componentWillReceiveProps(nuevasProps: IPropsAdministracionGruposUsuarios) {
        if (nuevasProps.mostrarTab) {
            this.obtenerDatosMaestros();
        }
    }

    public obtenerDatosMaestros(): void {
        const promesas: any[] = [];
        promesas.push(Funciones.ObtenerElementoPorRest(EAprobadores.getEndPointElementos()));

        this.MostrarProgreso();

        Promise.all(promesas)
            .then(([resultados]) => {
                console.dir(resultados);
                const state = Object.assign({}, this.state) as IStateAdministracionGruposUsuarios;
                state.campos.listaRegistros = resultados;

                this.setState(state);
                this.OcultarProgreso();
            })
            .catch(err => {
                this.MostrarMensajeError(this.nombrePagina + " - obtenerRegistros GruposUsuarios", err);
            });
    }

    public mostrarAgregar = () => {
        const state = Object.assign({}, this.state) as IStateAdministracionGruposUsuarios;
        state.campos.mostrarAgregar = true;

        this.setState(state);
    };

    public ocultarAgregar = (esRefrescar: boolean) => {
        const state = Object.assign({}, this.state) as IStateAdministracionGruposUsuarios;
        state.campos.mostrarAgregar = false;

        if (!esRefrescar) {
            this.setState(state);
        }
        else {
            const promesas: any[] = [];
            promesas.push(Funciones.ObtenerElementoPorRest(EAprobadores.getEndPointElementos()));

            this.MostrarProgreso();

            Promise.all(promesas)
                .then(([resultados]) => {
                    console.dir(resultados);
                    state.campos.listaRegistros = resultados;

                    this.setState(state);
                    this.OcultarProgreso();
                })
                .catch(err => {
                    this.MostrarMensajeError(this.nombrePagina + " - obtenerRegistros GruposUsuarios", err);
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
                    APROBADORES OFICIAL SEGURIDAD
                </div>

                <div className="col-xs-12 col-lg-12 col-md-12">
                    <dl className="data-marg-bandeja">
                        <dt className="text-desc-bandeja">
                            Los siguientes usuarios son los que se encuentran registrados en el sistema
                    </dt>
                    </dl>
                </div>

                <div className="col-xs-12 col-lg-12 col-md-12">
                    <div className="alinea-botones">
                        <button
                            type="button"
                            className="btn btn-primary btn80 rippledefault ml5 mb5 mt5 btn-w110"
                            onClick={this.mostrarAgregar}
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
                                        Usuario Aprobador
                                    </th>
                                    <th className="text-center">
                                        Cargo
                                    </th>
                                    <th className="text-center">
                                        Empresa
                                    </th>
                                    <th className="text-center">
                                        Grupo Permiso
                                    </th>
                                    <th className="text-center">
                                        Estado
                                    </th>
                                    <th className="text-center" />
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (this.state.campos.listaRegistros.length === 0 && !this.state.campos.mostrarAgregar) &&
                                    <tr>
                                        <td colSpan={4}>{ParametrosNoAdministrables.Mensajes.noSeHanEncontradoElementos}</td>
                                    </tr>
                                }
                                {
                                    this.state.campos.listaRegistros.map((registro: EAprobadores, i: number) => {
                                        return <RegistroGruposUsuarios
                                            key={i}
                                            eventoOcultar={this.ocultarAgregar}
                                            registro={registro}
                                        />
                                    })
                                }
                                {
                                    (this.state.campos.mostrarAgregar) &&
                                    <RegistroGruposUsuarios
                                        eventoOcultar={this.ocultarAgregar}
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

export default AdministracionGruposUsuarios;