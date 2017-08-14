import * as React from 'react';
import { Settings } from '../../interfaces';

interface Props {
  hour12: boolean;
  onChange: (settings: Settings) => void;
}

class TimeSettings extends React.PureComponent<Props> {
  static defaultProps = {
    hour12: false,
  };

  render() {
    return (
      <div>
        <label>
          <input
            type="radio"
            checked={this.props.hour12 === true}
            onChange={event => this.props.onChange({ hour12: true })}
          />
          {' '}
          12-hour time
        </label>

        <label>
          <input
            type="radio"
            checked={this.props.hour12 === false}
            onChange={event => this.props.onChange({ hour12: false })}
          />
          {' '}
          24-hour time
        </label>
      </div>
    );
  }
}

export default TimeSettings;
