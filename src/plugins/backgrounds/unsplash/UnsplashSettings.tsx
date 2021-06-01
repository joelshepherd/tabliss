import React, { FC } from 'react';

import { Props, defaultData } from './types';
import { DebounceInput } from '../../shared';

const UnsplashSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="UnsplashSettings">
    <label>
      Show a new photo
      <select
        value={data.timeout}
        onChange={event =>
          setData({ ...data, timeout: Number(event.target.value) })
        }
      >
        <option value="0">Every new tab</option>
        <option value="300">Every 5 minutes</option>
        <option value="900">Every 15 minutes</option>
        <option value="3600">Every hour</option>
        <option value="86400">Every day</option>
        <option value={Number.MAX_SAFE_INTEGER}>Pause</option>
      </select>
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === 'official'}
        onChange={() => setData({ ...data, by: 'official' })}
      />{' '}
      Official collection
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === 'collections'}
        onChange={() => setData({ ...data, by: 'collections' })}
      />{' '}
      Custom collection
    </label>

    {data.by === 'collections' && (
      <label>
        Collection
        <DebounceInput
          type="text"
          value={data.collections}
          placeholder="Collection ID number"
          onChange={value => setData({ ...data, collections: value })}
          wait={500}
        />
      </label>
    )}

    <label>
      <input
        type="radio"
        checked={data.by === 'topics'}
        onChange={() => setData({ ...data, by: 'topics' })}
      />{' '}
      Custom topic
    </label>

    {data.by === 'topics' && (
      <label>
        Topic
        <DebounceInput
          type="text"
          value={data.topics}
          placeholder="Topic ID number"
          onChange={value => setData({ ...data, topics: value })}
          wait={500}
        />
      </label>
    )}

    <label>
      <input
        type="radio"
        checked={data.by === 'search'}
        onChange={() => setData({ ...data, by: 'search' })}
      />{' '}
      Custom search
    </label>

    {data.by === 'search' && (
      <div>
        <label>
          Tags
          <DebounceInput
            type="text"
            value={data.search}
            placeholder="Try landscapes or animals..."
            onChange={value => setData({ ...data, search: value })}
            wait={500}
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={data.featured}
            onChange={event => setData({ ...data, featured: !data.featured })}
          />{' '}
          Only featured images
        </label>
      </div>
    )}
  </div>
);

export default UnsplashSettings;
