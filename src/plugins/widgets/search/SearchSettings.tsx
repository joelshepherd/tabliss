import * as React from 'react';
import { Engine, Settings } from './interfaces';
const engines: Engine[] = require('./engines.json');

interface Props extends Settings {
  onChange: (settings: Settings) => void;
}

const SearchSettings: React.StatelessComponent<Props> = ({
  engine = 'google',
  placeholder = '',
  suggestions = {
    active: false,
    quantity: 4,
  },
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
        checked={suggestions.active}
        onChange={() => {
            suggestions.active = !suggestions.active;

            return onChange({ suggestions });
          }
        }
      />
      {' '}
      Suggestions
    </label>

    {
      suggestions.active ?
        <label>
          Quantity
          <input
            type="number"
            value={suggestions.quantity}
            onChange={event => {
                suggestions.quantity = Number(event.target.value);

                return onChange({ suggestions });
              }
            }
          />
        </label>
      :
        null
    }
  </div>
);

export default SearchSettings;
