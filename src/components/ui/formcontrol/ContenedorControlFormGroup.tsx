import * as React from "react";

export interface IPropsContenedorControlFormGroup {
    esObligatorio?: boolean;
    etiqueta: string;
}

export class ContenedorControlFormGroup extends React.Component<IPropsContenedorControlFormGroup, {}>
{
    public render() {
        let etiqueta: string = this.props.etiqueta;

        if (etiqueta.trim().length !== 0 && etiqueta !== "*LabelSinEtiqueta*") {
            etiqueta += ":";
        }

        return (
            <div className="form-group">
                {
                    (etiqueta.trim().length !== 0) &&
                    <label className="text-label">
                        {
                            (etiqueta !== "*LabelSinEtiqueta*") &&
                            etiqueta
                        }
                        {
                            (this.props.esObligatorio) ? (<span className="important"> (*)</span>) : ('')
                        }

                    </label>
                }

                {this.props.children}
            </div>
        );
    }
}

export default ContenedorControlFormGroup;