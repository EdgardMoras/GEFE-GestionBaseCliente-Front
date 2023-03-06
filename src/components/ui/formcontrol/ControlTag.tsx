import * as React from "react";

export interface IPropsControlTab {
    nombreControl: string,
    tags: string;
    eventoChange: (nombreControl: string, valores: string[]) => void;
}

export interface IStateControlTab {
    tags: string[],
    value: string
}

class ControlTag extends React.Component<IPropsControlTab, IStateControlTab>
{
    public ENTER_KEY = 13;
    public COMMA_KEY = 188;
    public BACKSPACE_KEY = 8;

    constructor(props: IPropsControlTab) {
        super(props);
        this.state = { tags: [], value: "" };
    }

    public componentDidMount() {
        let tags: any[] = [];

        if (this.props.tags.length > 0) {
            tags = this.props.tags.split(',');
        }

        this.setState({
            tags,
            value: ""
        });
    }

    public componentWillReceiveProps(nuevoProps: IPropsControlTab) {
        if (JSON.stringify(this.props) !== JSON.stringify(nuevoProps)) {
            let tags: any[] = [];

            if (nuevoProps.tags.length > 0) {
                tags = nuevoProps.tags.split(',');
            }

            this.setState({
                tags,
                value: ""
            });
        }
    }

    public handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { value }: any = e.target;
        this.setState({
            value
        });
    }

    public handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const key = e.keyCode;

        if (key === this.ENTER_KEY || key === this.COMMA_KEY) {
            this.addTag();
        }
    }

    /* public handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const key = e.keyCode;
        if (key === this.BACKSPACE_KEY && !this.state.value) {
            this.editPrevTag();
        }
    }*/

    public addTag = () => {
        const { tags, value } = this.state;

        if (!value) {
            return;
        }
        let tag = value.trim();

        tag = tag.replace(/,/g, "");

        if (!tag) {
            return;
        }

        this.setState({
            tags: [...tags, tag],
            value: ""
        });

        if (this.props.eventoChange) {
            this.props.eventoChange(this.props.nombreControl, [...tags, tag])
        }
    }

    /* public editPrevTag = () => {
        const { tags } = this.state;
        const tag = tags.pop();

        if (tag) {
            const listaSinUltimoElemento = tags.splice(-1, 1)
            this.setState({ value: tag });

            if (this.props.eventoChange) {
                this.props.eventoChange(this.props.nombreControl, listaSinUltimoElemento)
            }
        }
    }*/

    public eliminarTag = (tagAEliminar: string) => {

        const tags = this.state.tags.filter((tag: string) => {
            return tag !== tagAEliminar
        })

        this.setState({
            tags
        });
        
        if (this.props.eventoChange) {
            this.props.eventoChange(this.props.nombreControl, tags);
        }
    }

    public render() {

        return (
            <div className="row control-tag">
                <div className="col-xs-11 col-md-11 col-lg-11">
                    <input
                        autoComplete="off"
                        name="txtControl"
                        className="form-control"
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUp}
                    />
                </div>
                <i
                    className="col-xs-1 col-md-1 col-lg-1 fa fa-info-circle info"
                    data-toggle="tooltip"
                    data-html="true"
                    title="Presione Enter o , para agregar."
                    aria-hidden="true"
                />
                <div className="clearfix" />
                <div className="col-md-12">
                    <div className="tags">
                        {this.state.tags.map((tag, i) => (
                            <span key={tag + i} className="tag">
                                {tag}
                                <svg onClick={this.eliminarTag.bind(this, tag)} focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation" className="input-autocompletado-boton-eliminar">
                                    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                                </svg>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

}

export default ControlTag;