import React, { FC, useState, useEffect } from 'react';

import { useDebounce } from '../../../hooks';
import { Props, defaultData } from './types';

const GiphySettings: FC<Props> = ({ data = defaultData, setData }) => {
  const [tag, setTag] = useState(data.tag);
  const debouncedTag = useDebounce(tag, 500);

  useEffect(() => {
    if (debouncedTag) {
      setData({ ...data, tag: debouncedTag });
    }
  }, [debouncedTag]);

  return (
    <div className="GiphySettings">
      <label>
        Tag
        <input
          type="text"
          value={tag}
          onChange={event => setTag(event.target.value)}
        />
      </label>
      <p className="info">Separate multiple tags with a commas</p>

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
