import * as React from "react";

export interface IPropsContenedorBusquedaAvanzada {
    identificador?: string,
    titulo?: string
}

export class ContenedorBusquedaAvanzada extends React.Component<IPropsContenedorBusquedaAvanzada,{}> {

    public render() {
        const titulo = (this.props.titulo? this.props.titulo : "Búsqueda Avanzada");
        
        return (
            <div className="row">
                <div className="col-lg-12 col-md-12 col-xs-12">
                    <div className="panel-group" id={"accordion" + (this.props.identificador?this.props.identificador:"")} role="tablist" aria-multiselectable="true">
                        <div className="panel panel-default mb20">
                            <div className="panel-heading color30" role="tab" id={"headingOne" + (this.props.identificador?this.props.identificador:"")}>
                                <h4 className="panel-title">
                                    <a
                                        role="button"
                                        data-toggle="collapse"
                                        href={"#collapseOne" + (this.props.identificador?this.props.identificador:"")}
                                        aria-expanded="true"
                                        aria-controls={"collapseOne" + (this.props.identificador?this.props.identificador:"")}
                                    >
                                        { titulo }
                                </a>
                                </h4>
                            </div>
                            <div id={"collapseOne" + (this.props.identificador?this.props.identificador:"")} 
                                className="panel-collapse collapse mb10 in" 
                                role="tabpanel" 
                                aria-labelledby={"headingOne" + (this.props.identificador?this.props.identificador:"")} 
                                aria-expanded="false" >

                                <div className="panel-body">
                                    <div className="well-lg">
                                        <div className="row">
                                            {this.props.children}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}