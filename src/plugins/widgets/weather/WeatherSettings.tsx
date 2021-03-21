import React, { FC } from 'react';

import { Props, defaultData } from './types';
import LocationInput from './LocationInput';

const WeatherSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="WeatherSettings">
    <LocationInput
      latitude={data.latitude}
      longitude={data.longitude}
      onChange={location => setData({ ...data, ...location })}
    />

    <label>
      Name
      <input
        type="text"
        value={data.name}
        placeholder="Optional name"
        onChange={event => setData({ ...data, name: event.target.value })}
      />
    </label>

    <hr />

    <label>
      <input
        type="checkbox"
        checked={data.showDetails}
        onChange={() => setData({ ...data, showDetails: !data.showDetails })}
      />{' '}
      Show extended details
    </label>

    <label>
      <input
        type="radio"
        checked={data.units === 'si'}
        onChange={() => setData({ ...data, units: 'si' })}
      />{' '}
      Metric units (Fahrenheit)
    </label>

    <label>
      <input
        type="radio"
        checked={data.units === 'us'}
        onChange={() => setData({ ...data, units: 'us' })}
      />{' '}
      Imperial units (Celsius)
    </label>

    <label>
      <input
        type="radio"
        checked={data.units === 'standard'}
        onChange={() => setData({ ...data, units: 'standard' })}
      />{' '}
      Kelvin 
    </label>

    <p>
      <a
        href="https://openweathermap.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by OpenWeather
      </a>
    </p>
  </div>
);

export default WeatherSettings;
