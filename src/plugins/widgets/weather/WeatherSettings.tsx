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

    <hr />

    <CustomInput
      type="checkbox"
      checked={data.showDetails}
      onChange={() => setData({ ...data, showDetails: !data.showDetails })}
      label="Show extended details"
    />

    <br />

    <CustomInput
      type="radio"
      checked={data.units === 'auto'}
      onChange={() => setData({ ...data, units: 'auto' })}
      label="Automatic units (based on location)"
    />

    <CustomInput
      type="radio"
      checked={data.units === 'si'}
      onChange={() => setData({ ...data, units: 'si' })}
      label="Metric units"
    />

    <CustomInput
      type="radio"
      checked={data.units === 'us'}
      onChange={() => setData({ ...data, units: 'us' })}
      label="Imperial units"
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
