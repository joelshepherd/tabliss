import { Info } from 'luxon';
import * as React from 'react';
import { Settings } from '../../../interfaces';
const timezones: string[] = require('./timezones.json');

interface Props {
  mode: string;
  hour12: boolean;
  showDate: boolean;
  timezone?: string;
  onChange: (settings: Settings) => void;
}

class TimeSettings extends React.PureComponent<Props> {
  static defaultProps = {
    mode: 'digital',
    hour12: false,
    showDate: false,
  };

  render() {
    return (
      <div className="TimeSettings">
        <label>
          <input
            type="radio"
            checked={this.props.mode === 'analogue'}
            onChange={() => this.props.onChange({ mode: 'analogue' })}
          />
          {' '}
          Analogue
        </label>

        <label>
          <input
            type="radio"
            checked={this.props.mode === 'digital' && this.props.hour12}
            onChange={() => this.props.onChange({
              mode: 'digital',
              hour12: true,
            })}
          />
          {' '}
          12-hour digital
        </label>

        <label>
          <input
            type="radio"
            checked={this.props.mode === 'digital' && ! this.props.hour12}
            onChange={() => this.props.onChange({
              mode: 'digital',
              hour12: false,
            })}
          />
          {' '}
          24-hour digital
        </label>

        <label>
          <input
            type="checkbox"
            checked={this.props.showDate}
            onChange={() => this.props.onChange({ showDate: ! this.props.showDate })}
          />
          {' '}
          Display the date
        </label>

        {Info.features().zones && (
          <label>
            Timezone

            <select
              value={this.props.timezone}
              onChange={event => this.props.onChange({ timezone: event.target.value})}
            >
              <option value={''}>Browser default</option>
              {timezones.map(timezone =>
                <option key={timezone} value={timezone}>{timezone.replace('_', ' ')}</option>
              )}
            </select>
          </label>
        )}
      </div>
    );
  }
}

export default TimeSettings;
