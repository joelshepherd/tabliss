import * as React from 'react';
import { Settings } from '../../interfaces';
import Time from './Time';

interface Props {
  hour12?: boolean;
  onChange: (settings: Settings) => void;
}

class TimeSettings extends React.Component<Props> {
  static defaultProps = Time.defaultProps;

  render() {
    return (
      <div>
        <label>
          <input
            type="radio"
            checked={this.props.hour12 === undefined}
            onChange={event => this.props.onChange({ hour12: undefined })}
          />
          {' '}
          Locale default
        </label>

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
