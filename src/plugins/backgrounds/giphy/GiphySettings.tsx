import React from 'react';

import { Props, defaultData } from './types';

const GiphySettings: React.FC<Props> = ({ data = defaultData, setData }) => {
  return (
    <div className="GiphySettings">
      <label>
        Tag
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
};

export default GiphySettings;
