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
  suggestionsEngine = 'off',
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
      <select onChange={event => onChange({ searchEngine: event.target.value })} value={searchEngine}>
        {engines.map(({ key, name }) =>
          <option key={key} value={key}>{name}</option>
        )}
      </select>
    </label>

    <label>
      Suggestions Provider
      <select onChange={event => onChange({ suggestionsEngine: event.target.value })} value={suggestionsEngine}>
        <option key='off' value='off'>Off</option>

        {engines.map(({ key, name, suggestions_url }) => {
          if (!suggestions_url) {
            return;
          }

          return <option key={key} value={key}>{name}</option>;
        })}
      </select>
    </label>

    {
      suggestionsEngine !== 'off' ?
        <label>
          Quantity
          <input
            type="number"
            min="1"
            max={MAX_QUANTITY}
            value={suggestionsQuantity}
            onChange={event =>  onChange({ suggestionsQuantity: Number(event.target.value) })}
          />
        </label>
      :
        null
    }
  </div>
);

export default SearchSettings;
