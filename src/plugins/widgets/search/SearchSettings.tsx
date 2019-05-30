import * as React from 'react';
import { Engine, Settings } from './interfaces';
const engines: Engine[] = require('./engines.json');

const MAX_QUANTITY = 20;

interface Props extends Settings {
  onChange: (settings: Settings) => void;
}

const SearchSettings: React.StatelessComponent<Props> = ({
  searchEngine = 'google',
  placeholder = '',
  suggestionsEngine = 'google',
  suggestionsQuantity = 4,
  onChange,
}) => (
  <div className="SearchSettings">
    <label>
      Placeholder
      <input
        type="text"
        value={placeholder}
        onChange={event => onChange({ placeholder: event.target.value })}
        placeholder="Type to search"
      />
    </label>

    <label>
      Search Provider
      <select
        onChange={event => onChange({ searchEngine: event.target.value })}
        value={searchEngine}
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
        onChange={event => onChange({ suggestionsEngine: event.target.value })}
        value={suggestionsEngine}
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

    {suggestionsEngine && (
      <label>
        Suggestion Quanitity
        <input
          type="number"
          min="1"
          max={MAX_QUANTITY}
          value={suggestionsQuantity}
          onChange={event =>
            onChange({ suggestionsQuantity: Number(event.target.value) })
          }
        />
      </label>
    )}
  </div>
);

export default SearchSettings;
