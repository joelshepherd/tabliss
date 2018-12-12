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
  active = false,
  quantity = 4,
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
      <select onChange={event => onChange({ searchEngine: event.target.value })} value={searchEngine}>
        {engines.map(({ key, name }) =>
          <option key={key} value={key}>{name}</option>
        )}
      </select>
    </label>

    <label>
      <input
        type="checkbox"
        checked={active}
        onChange={() => onChange({ active: !active })}
      />
      {' '}
      Suggestions
    </label>

    {
      active ?
        <label>
          Quantity
          <input
            type="number"
            value={quantity}
            onChange={event => {
                let newQuantity = Number(event.target.value);

                if (newQuantity < 1) {
                  newQuantity = 1;
                }

                if (newQuantity > MAX_QUANTITY) {
                  newQuantity = MAX_QUANTITY;
                }

                onChange({ quantity: newQuantity });
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
