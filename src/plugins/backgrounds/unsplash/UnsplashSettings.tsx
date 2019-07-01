import React from 'react';
import { defaultProps } from './constants';
import { By, Props } from './interfaces';

const UnsplashSettings: React.FC<Props> = ({
  data = defaultProps,
  setData,
}) => {
  const updateData = (update: Partial<Props['data']>) =>
    setData({ ...data, ...update });

  return (
    <div className="UnsplashSettings">
      <label>
        Show a new photo
        <select
          value={data.timeout}
          onChange={event =>
            updateData({ timeout: Number(event.target.value) })
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
          onChange={() => updateData({ by: By.OFFICIAL })}
        />{' '}
        Official collection
      </label>

      <label>
        <input
          type="radio"
          checked={data.by === By.COLLECTIONS}
          onChange={() => updateData({ by: By.COLLECTIONS })}
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
            onChange={event => updateData({ collections: event.target.value })}
          />
        </label>
      )}

      <label>
        <input
          type="radio"
          checked={data.by === By.SEARCH}
          onChange={() => updateData({ by: By.SEARCH })}
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
              onChange={event => updateData({ search: event.target.value })}
            />
          </label>

          <label>
            <input
              type="checkbox"
              checked={data.featured}
              onChange={event => updateData({ featured: !data.featured })}
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
          onChange={event => updateData({ blur: Number(event.target.value) })}
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
          onChange={event => updateData({ darken: Number(event.target.value) })}
        />
      </label>
    </div>
  );
};

export default UnsplashSettings;
