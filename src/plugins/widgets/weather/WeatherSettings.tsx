import React from 'react';
import { Settings } from './interfaces';
import LocationInput from './LocationInput';

interface Props extends Settings {
  onChange: (settings: Partial<Settings>) => void;
}

class WeatherSettings extends React.PureComponent<Props> {
  static defaultProps = {
    latitude: '',
    longitude: '',
    mode: 'corner',
    units: 'auto',
  };

  render() {
    return (
      <div className="WeatherSettings">
        <LocationInput
          latitude={this.props.latitude}
          longitude={this.props.longitude}
          onChange={location => this.props.onChange(location)}
        />

        <hr />

        <label>
          <input
            type="radio"
            checked={this.props.units === 'auto'}
            onChange={event => this.props.onChange({ units: 'auto' })}
          />{' '}
          Automatic units (based on location)
        </label>

        <label>
          <input
            type="radio"
            checked={this.props.units === 'si'}
            onChange={event => this.props.onChange({ units: 'si' })}
          />{' '}
          Metric units
        </label>

        <label>
          <input
            type="radio"
            checked={this.props.units === 'us'}
            onChange={event => this.props.onChange({ units: 'us' })}
          />{' '}
          Imperial units
        </label>

        <label>
          <input
            type="checkbox"
            checked={this.props.mode === 'corner'}
            onChange={event =>
              this.props.onChange({
                mode: event.target.checked ? 'corner' : 'centre',
              })
            }
          />
          Display on screen edge
        </label>

        <p>
          <a
            href="https://darksky.net/poweredby/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Dark Sky
          </a>
        </p>
      </div>
    );
  }
}

export default WeatherSettings;
