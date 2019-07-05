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

    <hr />

    <label>
      <input
        type="radio"
        checked={data.units === 'auto'}
        onChange={event => setData({ ...data, units: 'auto' })}
      />{' '}
      Automatic units (based on location)
    </label>

    <label>
      <input
        type="radio"
        checked={data.units === 'si'}
        onChange={() => setData({ ...data, units: 'si' })}
      />{' '}
      Metric units
    </label>

    <label>
      <input
        type="radio"
        checked={data.units === 'us'}
        onChange={() => setData({ ...data, units: 'us' })}
      />{' '}
      Imperial units
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

export default WeatherSettings;
