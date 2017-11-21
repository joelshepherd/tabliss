import * as React from 'react';
import { Settings as SettingsInterface } from '../../../interfaces';

interface Props {
  latitude: number;
  longitude: number;
  mode: string;
  units: string;
  onChange: (settings: SettingsInterface) => void;
}

class WeatherSettings extends React.PureComponent<Props> {
  static defaultProps = {
    latitude: 0,
    longitude: 0,
    mode: 'corner',
    units: 'auto',
  };

  render() {
    return (
      <div>
        <label>
          Latitude
          <input
            type="text"
            value={this.props.latitude}
            onChange={event => this.props.onChange({ latitude: event.target.value })}
          />
        </label>

        <label>
          Longitude
          <input
            type="text"
            value={this.props.longitude}
            onChange={event => this.props.onChange({ longitude: event.target.value })}
          />
        </label>

        <p><button className="button--primary" onClick={this.currentLocation}>
          Use My Current Location
        </button></p>

        <label>
          <input
            type="radio"
            checked={this.props.units === 'auto'}
            onChange={event => this.props.onChange({ units: 'auto' })}
          />
          {' '}
          Automatic units (based on location)
        </label>

        <label>
          <input
            type="radio"
            checked={this.props.units === 'si'}
            onChange={event => this.props.onChange({ units: 'si' })}
          />
          {' '}
          Metric units
        </label>

        <label>
          <input
            type="radio"
            checked={this.props.units === 'us'}
            onChange={event => this.props.onChange({ units: 'us' })}
          />
          {' '}
          Imperial units
        </label>

        <label>
          <input
            type="checkbox"
            checked={this.props.mode === 'corner'}
            onChange={event => this.props.onChange({
              mode: event.target.checked ? 'corner' : 'centre'
            })}
          />
          Display on screen edge
        </label>

        <p><a href="https://darksky.net/poweredby/"  target="_blank" rel="noopener noreferrer">
          Powered by Dark Sky
        </a></p>
      </div>
    );
  }

  private currentLocation = () => {
    navigator.geolocation.getCurrentPosition(positon => {
      this.props.onChange({
        latitude: positon.coords.latitude,
        longitude: positon.coords.longitude,
      });
    });
  }
}

export default WeatherSettings;
