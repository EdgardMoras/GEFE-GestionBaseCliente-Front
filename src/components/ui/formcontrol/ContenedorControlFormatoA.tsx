import * as React from "react";
import { ContenedorControlFormGroup } from './ContenedorControlFormGroup';

export interface IPropsContenedorControlFormatoA {
    esObligatorio?: boolean;
    etiqueta: string;
    claseContenedor?: string;
}

export class ContenedorControlFormatoA extends React.Component<IPropsContenedorControlFormatoA, {}>
{
    public render() {
        let clase: string = "col-xs-12 col-sm-6 col-md-4 col-lg-4"

        if (this.props.claseContenedor) {
            clase = this.props.claseContenedor
        }

        return (
            <div className={clase}>
                <ContenedorControlFormGroup etiqueta={this.props.etiqueta} esObligatorio={this.props.esObligatorio} children={this.props.children} />
            </div>
        );
    }
}

export default ContenedorControlFormatoA;