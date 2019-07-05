import React, { FC } from 'react';

import { Props, defaultData } from './types';

const FontSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="FontSettings">
    <label>
      Family
      <input
        type="text"
        value={data.family}
        onChange={event => setData({ ...data, family: event.target.value })}
      />
    </label>

    <label>
      Size
      <input
        type="number"
        value={data.size}
        onChange={event =>
          setData({ ...data, size: Number(event.target.value) })
        }
      />
    </label>

    <label>
      Weight override
      <select
        value={data.weight}
        onChange={event =>
          setData({ ...data, weight: Number(event.target.value) })
        }
      >
        <option value={undefined}>None</option>
        <option value={100}>Thin</option>
        <option value={300}>Light</option>
        <option value={400}>Regular</option>
        <option value={500}>Medium</option>
        <option value={700}>Bold</option>
        <option value={900}>Black</option>
      </select>
    </label>

    <label>
      Colour
      <input
        type="color"
        value={data.colour}
        onChange={event => setData({ ...data, colour: event.target.value })}
      />
    </label>
  </div>
);

export default FontSettings;
