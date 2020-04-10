import React, { FC, useState, useEffect } from 'react';

import { useDebounce } from '../../../hooks';
import { Props, defaultData } from './types';
import LocationInput from './LocationInput';

const WeatherSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const [customName, setCustomName] = useState(data.name || '');
  const debouncedName = useDebounce(customName, 500);

  useEffect(() => {
    if (debouncedName) {
      setData({ ...data, name: debouncedName });
    }
  }, [debouncedName]);

  return (
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
          value={customName}
          placeholder="Optional name"
          onChange={event => setCustomName(event.target.value)}
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
          checked={data.units === 'auto'}
          onChange={() => setData({ ...data, units: 'auto' })}
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
};

export default WeatherSettings;
