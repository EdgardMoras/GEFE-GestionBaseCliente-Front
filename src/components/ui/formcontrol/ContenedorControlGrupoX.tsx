import * as React from "react";

export interface IPropsContenedorControlGrupoX {
    claseContenedor?: string;
    claseContenedorValor?: string;
    etiqueta: string;
    valor: string;
}

export class ContenedorControlGrupoX extends React.Component<IPropsContenedorControlGrupoX, {}>
{
    public render() {
        let clase: string = "colnew8"
        let claseValor: string = "text-desc-bandeja"

        if (this.props.claseContenedor) {
            clase = this.props.claseContenedor
        }
        if (this.props.claseContenedorValor) {
            claseValor = this.props.claseContenedorValor
        }

        return (
            <div className={clase}>
                <dl className="data-marg-bandeja">
                    <dd className="text-label-bandeja">{this.props.etiqueta}:</dd>
                    <dt className={claseValor}>{this.props.valor}</dt>
                </dl>
            </div>
        );
    }
}

export default ContenedorControlGrupoX;