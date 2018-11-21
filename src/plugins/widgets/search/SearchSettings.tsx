import * as React from 'react';
import { Engine, Settings } from './interfaces';
const engines: Engine[] = require('./engines.json');

interface Props extends Settings {
  onChange: (settings: Settings) => void;
}

const SearchSettings: React.StatelessComponent<Props> = ({
  engine = 'google',
  placeholder = '',
  suggestions = false,
  onChange,
}) => (
  <div className="SearchSettings">
    <p>
      <label>
        Placeholder
        <input
          type="text"
          value={placeholder}
          onChange={event => onChange({ placeholder: event.target.value })}
          placeholder="Type to search"
        />
      </label>
    </p>

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
        checked={suggestions}
        onChange={() => onChange({ suggestions: !suggestions })}
      />
      {' '}
      Suggestions
    </label>
  </div>
);

export default SearchSettings;
