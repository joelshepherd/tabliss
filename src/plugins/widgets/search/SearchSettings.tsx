import React, { FC } from 'react';

import { engines } from './engines';
import { Props, defaultData } from './types';

const MAX_QUANTITY = 20;

const SearchSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="SearchSettings">
    <label>
      Placeholder
      <input
        type="text"
        value={data.placeholder}
        onChange={event =>
          setData({ ...data, placeholder: event.target.value })
        }
        placeholder="Type to search"
      />
    </label>

    <label>
      Search Provider
      <select
        onChange={event =>
          setData({ ...data, searchEngine: event.target.value })
        }
        value={data.searchEngine}
      >
        {engines.map(({ key, name }) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
      </select>
    </label>

    <label>
      Suggestions Provider
      <select
        onChange={event =>
          setData({ ...data, suggestionsEngine: event.target.value })
        }
        value={data.suggestionsEngine}
      >
        <option key="off" value="">
          Off
        </option>
        {engines
          .filter(({ suggest_url }) => Boolean(suggest_url))
          .map(({ key, name }) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
      </select>
    </label>

    {data.suggestionsEngine && (
      <label>
        Suggestion Quanitity
        <input
          type="number"
          min="1"
          max={MAX_QUANTITY}
          value={data.suggestionsQuantity}
          onChange={event =>
            setData({
              ...data,
              suggestionsQuantity: Number(event.target.value),
            })
          }
        />
      </label>
    )}
  </div>
);

export default SearchSettings;
