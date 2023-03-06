import * as React from "react";

export interface IPropsContenedorControlMostrarTipoA {
    claseContenedor?: string;
    etiqueta: string;
    esCol6?: boolean;
    esValorMultilinea?: boolean;
    valor: string;
}

export class ContenedorControlMostrarTipoA extends React.Component<IPropsContenedorControlMostrarTipoA, {}>
{
    public render() {
        let etiqueta: string = this.props.etiqueta;

        if (etiqueta.length !== 0) {
            etiqueta += ":";
        }

        if (this.props.claseContenedor) {
            return (
                <div className={this.props.claseContenedor}>
                    <dl className="data-marg-bandeja">
                        <dd className="text-label-bandeja">{etiqueta}</dd>
                        <dt className={this.props.esValorMultilinea ? "text-desc-bandeja2" : "text-desc-bandeja"}>{this.props.valor}{this.props.children}</dt>
                    </dl>
                </div>

            );
        }
        return (
            <div className={this.props.esCol6 ? "col-md-6 col-sm-6 col-xs-6" : "col-md-12 col-sm-12 col-xs-12"}>
                <dl className="data-marg-bandeja">
                    <dd className="text-label-bandeja">{etiqueta}</dd>
                    <dt className={this.props.esValorMultilinea ? "text-desc-bandeja2" : "text-desc-bandeja"}>{this.props.valor}{this.props.children}</dt>
                </dl>
            </div>

        );
    }
}

export default ContenedorControlMostrarTipoA;