import React from 'react';
import { Settings } from '../../interfaces';

interface Props {
  mode: string;
  hour12: boolean;
  showDate: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  timezone?: string;
  onChange: (settings: Settings) => void;
}

class TimeSettings extends React.PureComponent<Props> {
  static defaultProps: Partial<Props> = {
    mode: 'digital',
    hour12: false,
    showDate: false,
    showMinutes: true,
    showSeconds: false,
  };

  render() {
    return (
      <div className="TimeSettings">
        <label>
          <input
            type="radio"
            checked={this.props.mode === 'analogue'}
            onChange={() => this.props.onChange({ mode: 'analogue' })}
          />{' '}
          Analogue
        </label>

        <label>
          <input
            type="radio"
            checked={this.props.mode === 'digital' && this.props.hour12}
            onChange={() =>
              this.props.onChange({
                mode: 'digital',
                hour12: true,
              })
            }
          />{' '}
          12-hour digital
        </label>

        <label>
          <input
            type="radio"
            checked={this.props.mode === 'digital' && !this.props.hour12}
            onChange={() =>
              this.props.onChange({
                mode: 'digital',
                hour12: false,
              })
            }
          />{' '}
          24-hour digital
        </label>

        <label>
          <input
            type="checkbox"
            checked={this.props.showSeconds}
            onChange={() =>
              this.props.onChange({ showSeconds: !this.props.showSeconds })
            }
          />{' '}
          Display seconds
        </label>

        <label>
          <input
            type="checkbox"
            checked={this.props.showMinutes}
            onChange={() =>
              this.props.onChange({ showMinutes: !this.props.showMinutes })
            }
          />{' '}
          Display minutes
        </label>

        <label>
          <input
            type="checkbox"
            checked={this.props.showDate}
            onChange={() =>
              this.props.onChange({ showDate: !this.props.showDate })
            }
          />{' '}
          Display the date
        </label>
      </div>
    );
  }
}

export default TimeSettings;
