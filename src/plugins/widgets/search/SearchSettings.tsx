import * as React from 'react';
import { Engine, Settings } from './interfaces';
const engines: Engine[] = require('./engines.json');

const MAX_QUANTITY = 20;

interface Props extends Settings {
  onChange: (settings: Settings) => void;
}

const SearchSettings: React.StatelessComponent<Props> = ({
  engine = 'google',
  placeholder = '',
  suggestionsActive = false,
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
      Provider
      <select onChange={event => onChange({ engine: event.target.value })} value={engine}>
        {engines.map(({ key, name }) =>
          <option key={key} value={key}>{name}</option>
        )}
      </select>
    </label>

    <label>
      <input
        type="checkbox"
        checked={suggestionsActive}
        onChange={() => onChange({ suggestionsActive: !suggestionsActive })}
      />
      {' '}
      Suggestions
    </label>

    {
      suggestionsActive ?
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
