import * as React from 'react';
import { Settings } from './interfaces';

interface Props extends Settings {
  onChange: (settings: Partial<Settings>) => void;
}

const TodoSettings: React.StatelessComponent<Props> = ({
  show = 3,
  textAlign,
  onChange,
}) => (
  <div className="SearchSettings">
    <p>
      <label>
        Tasks to show
        <input
          type="number"
          min="1"
          onChange={event => onChange({ show: Number(event.target.value) })}
          placeholder="Number of todo items to show"
          value={show}
        />
      </label>
    </p>

    <p>
      <label>
        <input
          type="radio"
          checked={textAlign === 'inherit'}
          onChange={() => onChange({ textAlign: 'inherit' })}
        />

        Default text align
      </label>

      <label>
        <input
          type="radio"
          checked={textAlign === 'left'}
          onChange={() => onChange({ textAlign: 'left' })}
        />

        Left text align
      </label>
    </p>
  </div>
);

export default TodoSettings;
