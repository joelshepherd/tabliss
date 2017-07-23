import * as React from 'react';
import GreetingSettings from './GreetingSettings';

interface Props {
  name?: string;
}

class Greeting extends React.Component<Props> {
  static title = 'Greeting';
  static type = 'widget';
  static settings = GreetingSettings;
  static defaultProps = GreetingSettings.defaultProps;

  render() {
    return (
      <div className="Greeting">
        <h1>Hi {this.props.name}</h1>
      </div>
    );
  }
}

export default Greeting;
