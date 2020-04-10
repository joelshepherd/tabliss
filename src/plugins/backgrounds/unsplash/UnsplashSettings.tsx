import React, { FC, useState, useEffect, useReducer } from 'react';

import { useDebounce } from '../../../hooks';
import { Props, defaultData } from './types';

const UnsplashSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const [collections, setCollection] = useState(data.collections);
  const [search, setSearch] = useState(data.search);
  const debouncedCollection = useDebounce(collections, 500);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedCollection) {
      setData({ ...data, collections: debouncedCollection });
    }
  }, [debouncedCollection]);

  useEffect(() => {
    if (debouncedSearch) {
      setData({ ...data, search: debouncedSearch });
    }
  }, [debouncedSearch]);

  return (
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
          <input
            placeholder="Collection ID number"
            type="text"
            value={collections}
            onChange={event => setCollection(event.target.value)}
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
            <input
              placeholder="Try landscapes or animals..."
              type="text"
              value={search}
              onChange={event => setSearch(event.target.value)}
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
};

export default UnsplashSettings;
