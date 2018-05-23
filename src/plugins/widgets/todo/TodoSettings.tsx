import * as React from 'react';
import { Settings } from './interfaces';

interface Props extends Settings {
  onChange: (settings: Settings) => void;
}

const TodoSettings: React.StatelessComponent<Props> = ({
  show = 3,
  onChange,
}) => (
  <div className="SearchSettings">
    <p>
      <label>
        Default number to show
        <input
          type="number"
          value={show}
          onChange={event => onChange({ show: Number(event.target.value) })}
          placeholder="Number of todo items to show"
        />
      </label>
    </p>
  </div>
);

export default TodoSettings;
