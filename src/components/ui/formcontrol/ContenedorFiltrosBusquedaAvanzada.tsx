import * as React from "react";

export class ContenedorFiltrosBusquedaAvanzada extends React.Component {
    public render() {
        return (
            <div>
                <div className="col-xs-3 col-sm-1 col-md-1 col-lg-1">
                    <div className="floatright" role="tab" id="filtro2">
                        <label className="text-label" />
                        <div className="btn btn-default filtroavanzado" data-toggle="collapse" data-target="#filtro" aria-expanded="true" aria-controls="filtro">
                            <i className="fa fa-filter" aria-hidden="true" />
                        </div>
                    </div>
                </div>
                <div className="clearfix" />

                <div className="col-md-12">
                    <div id="filtro" className="panel-collapse collapse mb10 filtroav" role="tabpanel" aria-labelledby="filtro2" aria-expanded="false">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}