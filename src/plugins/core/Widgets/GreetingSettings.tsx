import * as React from 'react';
import { Settings } from '../../interfaces';
import Greeting from './Greeting';

interface Props {
  name?: string;
  onChange: (settings: Settings) => void;
}

class GreetingSettings extends React.Component<Props> {
  static defaultProps = Greeting.defaultProps;

  render() {
    return (
      <div>
        <label>
          Name
          <input
            type="text"
            value={this.props.name}
            onChange={event => this.props.onChange({ name: event.target.value })}
          />
        </label>
      </div>
    );
  }
}

export default GreetingSettings;
