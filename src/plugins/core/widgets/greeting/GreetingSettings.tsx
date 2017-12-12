import * as React from 'react';
import { Settings } from '../../../interfaces';

interface Props {
  name?: string;
  onChange: (settings: Settings) => void;
}

class GreetingSettings extends React.PureComponent<Props> {
  static defaultProps = {
    name: '',
  };

  render() {
    return (
      <div className="GreetingSettings">
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
