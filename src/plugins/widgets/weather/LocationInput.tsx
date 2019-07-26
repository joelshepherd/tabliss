import React from 'react';

import { Icon } from '../../../views/shared';
import './LocationInput.sass';

interface Props {
  latitude?: number;
  longitude?: number;
  onChange: (location: { latitude?: number; longitude?: number }) => void;
}

interface State {
  lookup: boolean;
  query: string;
}

class LocationInput extends React.PureComponent<Props, State> {
  state: State = {
    lookup: !(this.props.latitude && this.props.longitude),
    query: '',
  };

  render() {
    // Lookup mode
    if (this.state.lookup) {
      return (
        <div className="LocationInput">
          <form
            onSubmit={event => {
              event.preventDefault();
              this.geocodeLocation();
            }}
          >
            <div className="grid" style={{ gridTemplateColumns: '1fr auto' }}>
              <label htmlFor="LocationInput__query">Search for city</label>

              <div />

              <input
                id="LocationInput__query"
                placeholder="City or location"
                type="text"
                value={this.state.query}
                onChange={event => this.setState({ query: event.target.value })}
              />

              <button type="submit" className="button--primary button--icon">
                <Icon name="search" />
              </button>
            </div>
          </form>

          <a onClick={() => this.setState({ lookup: false })}>
            Enter coordinates
          </a>
        </div>
      );
    }

    // Coordinates mode
    const geolocationAvailable = 'geolocation' in navigator;

    return (
      <div className="LocationInput">
        <div
          className="grid"
          style={{
            gridTemplateColumns: geolocationAvailable
              ? '1fr 1fr auto'
              : '1fr 1fr',
          }}
        >
          <label htmlFor="LocationInput__latitude">Latitude</label>

          <label htmlFor="LocationInput__longitude">Longitude</label>

          {geolocationAvailable && <div />}

          <input
            id="LocationInput__latitude"
            type="text"
            value={this.props.latitude}
            onChange={event =>
              this.props.onChange({ latitude: Number(event.target.value) })
            }
          />

          <input
            id="LocationInput__longitude"
            type="text"
            value={this.props.longitude}
            onChange={event =>
              this.props.onChange({ longitude: Number(event.target.value) })
            }
          />

          {geolocationAvailable && (
            <button
              className="button--primary button--icon"
              onClick={this.getCurrentLocation}
            >
              <Icon name="navigation" />
            </button>
          )}
        </div>

        <a onClick={() => this.setState({ lookup: true })}>Search for city</a>
      </div>
    );
  }

  private getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      positon =>
        this.props.onChange({
          latitude: positon.coords.latitude,
          longitude: positon.coords.longitude,
        }),
      error => alert('Unable to determine your location.'),
    );
  };

  private geocodeLocation = () => {
    fetch(
      `https://nominatim.openstreetmap.org/search.php?format=json&q=${
        this.state.query
      }`,
    )
      .then(res => res.json())
      .then(data =>
        this.props.onChange({
          latitude: Number(Number(data[0].lat).toFixed(4)),
          longitude: Number(Number(data[0].lon).toFixed(4)),
        }),
      )
      .then(() => this.setState({ lookup: false, query: '' }))
      .catch(() => {
        alert('Unable to determine location. Please try again later.');
        this.setState({ lookup: false });
      });
  };
}

export default LocationInput;
