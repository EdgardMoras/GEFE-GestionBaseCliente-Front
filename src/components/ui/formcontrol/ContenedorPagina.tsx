
import * as React from "react";

export class ContenedorPagina extends React.Component {
    public render() {
        return (
            <div className="container container-full aquitoy">
                <div className="page-container">
                    <div className="main-content body-full">
                        <div className="content contentTG left-sidebar-toggle">
                            <div className="container container-full">
                                {this.props.children}
                            </div>
                        </div>
                    </div>

                </div>
            </div>);
    }
}