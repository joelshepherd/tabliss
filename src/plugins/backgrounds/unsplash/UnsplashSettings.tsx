import React from 'react';
import { defaultData } from './constants';
import { By, Props } from './interfaces';

const UnsplashSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
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
        <option value="900">Every 15 minutes</option>
        <option value="3600">Every hour</option>
        <option value="86400">Every day</option>
        <option value={Number.MAX_SAFE_INTEGER}>Pause</option>
      </select>
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === By.OFFICIAL}
        onChange={() => setData({ ...data, by: By.OFFICIAL })}
      />{' '}
      Official collection
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === By.COLLECTIONS}
        onChange={() => setData({ ...data, by: By.COLLECTIONS })}
      />{' '}
      Custom collection
    </label>

    {data.by === By.COLLECTIONS && (
      <label>
        Collection
        <input
          placeholder="Collection ID number"
          type="text"
          value={data.collections}
          onChange={event =>
            setData({ ...data, collections: event.target.value })
          }
        />
      </label>
    )}

    <label>
      <input
        type="radio"
        checked={data.by === By.SEARCH}
        onChange={() => setData({ ...data, by: By.SEARCH })}
      />{' '}
      Custom search
    </label>

    {data.by === By.SEARCH && (
      <div>
        <label>
          Tags
          <input
            placeholder="Try landscapes or animals..."
            type="text"
            value={data.search}
            onChange={event => setData({ ...data, search: event.target.value })}
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

    <label>
      Blur <br />
      <input
        type="range"
        min="0"
        max="50"
        step="5"
        value={data.blur}
        onChange={event =>
          setData({ ...data, blur: Number(event.target.value) })
        }
      />
    </label>

    <label>
      Darken <br />
      <input
        type="range"
        min="0"
        max="100"
        step="10"
        value={data.darken}
        onChange={event =>
          setData({ ...data, darken: Number(event.target.value) })
        }
      />
    </label>
  </div>
);

export default UnsplashSettings;
