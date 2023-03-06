import * as React from "react";

export interface IPropsContenedorResultadoBusquedaTipoA {
    etiqueta: string;
    valor?: string;
    clase?: string;
}

export class ContenedorResultadoBusquedaTipoA extends React.Component<IPropsContenedorResultadoBusquedaTipoA, {}> {

    public render() {
        const clase = (this.props.clase? this.props.clase : "colnew10");

        return (
            <div className={clase}>
                <dl className="data-marg-bandeja">
                    <dd className="codigotxt">{this.props.etiqueta}:</dd>
                    <dt className="text-desc-bandeja">
                        {this.props.valor}</dt>
                </dl>
            </div>);
    }
}