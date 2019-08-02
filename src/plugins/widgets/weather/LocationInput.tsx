import React, { FC, FormEvent, useState } from 'react';

import { useToggle } from '../../../utils/useToggle';
import { Icon } from '../../../views/shared';
import { geocodeLocation, getCurrentLocation } from './api';
import { Coordinates } from './types';
import './LocationInput.sass';

type Props = {
  latitude?: number;
  longitude?: number;
  onChange: (coords: Coordinates) => void;
};

const GeocodeInput: FC<Props> = ({ onChange }) => {
  const [query, setQuery] = useState('');

  const handleGeocode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    geocodeLocation(query)
      .then(onChange)
      .catch(() => {
        alert('Unable to find location. Please try again later.');
      });
  };

  return (
    <form onSubmit={handleGeocode}>
      <div className="grid" style={{ gridTemplateColumns: '1fr auto' }}>
        <label htmlFor="LocationInput__query">Search for city</label>

        <div />

        <input
          id="LocationInput__query"
          placeholder="City or location"
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />

        <button type="submit" className="button--primary button--icon">
          <Icon name="search" />
        </button>
      </div>
    </form>
  );
};

const geolocationAvailable = 'geolocation' in navigator;

const CoordinateInput: FC<Props> = ({ latitude, longitude, onChange }) => {
  const handleLocate = () => {
    getCurrentLocation()
      .then(onChange)
      .catch(err => alert(`Cannot determine your location: ${err.message}`));
  };

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
          value={latitude}
          onChange={event => onChange({ latitude: Number(event.target.value) })}
        />

        <input
          id="LocationInput__longitude"
          type="text"
          value={longitude}
          onChange={event =>
            onChange({ longitude: Number(event.target.value) })
          }
        />

        {geolocationAvailable && (
          <button
            className="button--primary button--icon"
            onClick={handleLocate}
          >
            <Icon name="navigation" />
          </button>
        )}
      </div>
    </div>
  );
};

const LocationInput: FC<Props> = ({ onChange, ...props }) => {
  const hasCoordinates = props.longitude && props.latitude;
  const [lookUp, toggleLookUp] = useToggle(!hasCoordinates);

  const handleChange = (coords: Coordinates) => {
    onChange(coords);
    if (lookUp) toggleLookUp();
  };

  return (
    <div className="LocationInput">
      {lookUp ? (
        <GeocodeInput {...props} onChange={handleChange} />
      ) : (
        <CoordinateInput {...props} onChange={handleChange} />
      )}

      <a onClick={toggleLookUp}>
        {lookUp ? 'Enter coordinates' : 'Search for city'}
      </a>
    </div>
  );
};

export default LocationInput;
