import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

export interface Identifiable {
  id: string;
}

/* function Topics(matche: RouteComponentProps<Identifiable>) {
  return (
    <div>
      <h3 id="pruebaxd">ID: {matche.match.params.id}</h3>
    </div>
  );
} */

class Topics extends React.Component<RouteComponentProps<Identifiable>, {}> {
  constructor(props: RouteComponentProps<Identifiable>) {
    super(props);
  }

  public render() {
    return (
      <div>
        <h3 id="pruebaxd">ID: {this.props.match.params.id}</h3>
      </div>
    );
  }
}

export default Topics;

/* export interface IProps {
  misParametros: RouteComponentProps<Identifiable>;
}

export interface IState {
  id: string;
}

export interface Identifiable {
  id: string;
}

function MensajeSeleccione() {
  return (
    <div>
      <h2>
        <h3>Please select a topic.</h3>
      </h2>
    </div>
  );
}

class Topics extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <h2>Topics</h2>
        <ul>
          <li>
            <Link to={`${this.props.misParametros.match.url}/rendering`}>
              Rendering with React
            </Link>
          </li>
          <li>
            <Link to={`${this.props.misParametros.match.url}/components`}>
              Components
            </Link>
          </li>
          <li>
            <Link to={`${this.props.misParametros.match.url}/props-v-state`}>
              Props v. State
            </Link>
          </li>
        </ul>

        <Route
          exact={true}
          path={this.props.misParametros.match.path}
          render={MensajeSeleccione}
        />
      </div>
    );
  }
}

export default Topics;



<Route path={`${parametros.path}/:topicId`} component={Topic} />

function Topic({ match }) {
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );
}
*/
