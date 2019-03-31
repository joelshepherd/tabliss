import * as React from 'react';
import './LocationInput.sass';
const navigationIcon = require('feather-icons/dist/icons/navigation.svg').default;
const searchIcon = require('feather-icons/dist/icons/search.svg').default;

interface Props {
  latitude: number|string;
  longitude: number|string;
  onChange: (location: { latitude?: number|string, longitude?: number|string }) => void;
}

interface State {
  lookup: boolean;
  query: string;
}

class LocationInput extends React.PureComponent<Props, State> {
  state: State = {
    lookup: ! (this.props.latitude && this.props.longitude),
    query: '',
  };

  render() {
    // Lookup mode
    if (this.state.lookup) {
      return (
        <div className="LocationInput">
            <form onSubmit={event => { event.preventDefault(); this.geocodeLocation(); }}>
              <div className="grid" style={{ gridTemplateColumns: '1fr auto' }}>
                <label htmlFor="LocationInput__query">
                  Search for city
                </label>

                <div />

                <input
                  id="LocationInput__query"
                  placeholder="City or location"
                  type="text"
                  value={this.state.query}
                  onChange={event => this.setState({ query: event.target.value })}
                />

                <button type="submit" className="button--primary button--icon">
                  <i dangerouslySetInnerHTML={{ __html: searchIcon }} />
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
        <div className="grid" style={{ gridTemplateColumns: geolocationAvailable ? '1fr 1fr auto' : '1fr 1fr' }}>
          <label htmlFor="LocationInput__latitude">
            Latitude
          </label>

          <label htmlFor="LocationInput__longitude">
            Longitude
          </label>

          {geolocationAvailable && <div />}

          <input
            id="LocationInput__latitude"
            type="text"
            value={this.props.latitude}
            onChange={event => this.props.onChange({ latitude: event.target.value })}
          />

          <input
            id="LocationInput__longitude"
            type="text"
            value={this.props.longitude}
            onChange={event => this.props.onChange({ longitude: event.target.value })}
          />

          {geolocationAvailable &&
            <button className="button--primary button--icon" onClick={this.getCurrentLocation}>
              <i dangerouslySetInnerHTML={{ __html: navigationIcon }} />
            </button>
          }
        </div>

        <a onClick={() => this.setState({ lookup: true })}>
          Search for city
        </a>
      </div>
    );
  }

  private getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      positon => this.props.onChange({
        latitude: positon.coords.latitude,
        longitude: positon.coords.longitude,
      }),
      error => alert('Unable to determine your location.'),
    );
  }

  private geocodeLocation = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.query}`)
      .then(res => res.json())
      .then(data => this.props.onChange({
        latitude: data.results[0].geometry.location.lat.toFixed(4),
        longitude: data.results[0].geometry.location.lng.toFixed(4),
      }))
      .then(() => this.setState({ lookup: false, query: '' }))
      .catch(() => {
        alert('Unable to determine location. Please try again later.');
        this.setState({ lookup: false });
      });
  }
}

export default LocationInput;
