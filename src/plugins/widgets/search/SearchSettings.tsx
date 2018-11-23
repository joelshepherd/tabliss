import * as React from 'react';
import { Engine, Settings } from './interfaces';
const engines: Engine[] = require('./engines.json');

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 20;

interface Props extends Settings {
  onChange: (settings: Settings) => void;
}

const SearchSettings: React.StatelessComponent<Props> = ({
  engine = 'google',
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

                if (newQuantity < MIN_QUANTITY) {
                  newQuantity = MIN_QUANTITY;
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
