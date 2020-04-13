import React, { FC } from 'react';
import { CustomInput } from 'reactstrap';

import LocationInput from './LocationInput';
import { defaultData, Props } from './types';

const WeatherSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <>
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

    <CustomInput
      type="checkbox"
      id="showExtendedDetails"
      checked={data.showDetails}
      label="Show extended details"
      onChange={() => setData({ ...data, showDetails: !data.showDetails })}
    />

    <br />

    <CustomInput
      type="radio"
      id="weatherUnitsAuto"
      checked={data.units === 'auto'}
      label="Automatic units (based on location)"
      onChange={() => setData({ ...data, units: 'auto' })}
    />

    <CustomInput
      type="radio"
      label="Metric units"
      id="weatherUnitsMetric"
      checked={data.units === 'si'}
      onChange={() => setData({ ...data, units: 'si' })}
    />

    <CustomInput
      type="radio"
      label="Imperial units"
      id="weatherUnitsImperial"
      checked={data.units === 'us'}
      onChange={() => setData({ ...data, units: 'us' })}
    />

    <br />

    <p>
      <a
        href="https://darksky.net/poweredby/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by Dark Sky
      </a>
    </p>
  </>
);

export default WeatherSettings;
