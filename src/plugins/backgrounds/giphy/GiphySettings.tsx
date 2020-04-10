import React, { FC } from 'react';

import { Props, defaultData } from './types';

const GiphySettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="GiphySettings">
    <label>
      Tag (separate multiple tags with a comma ',')
      <input
        type="text"
        value={data.tag}
        onChange={event => setData({ ...data, tag: event.target.value })}
      />
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.nsfw}
        onChange={event => setData({ ...data, nsfw: !data.nsfw })}
      />{' '}
      Allow NSFW
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.expand}
        onChange={event => setData({ ...data, expand: !data.expand })}
      />{' '}
      Stretch to fill screen
    </label>
  </div>
);

export default GiphySettings;
