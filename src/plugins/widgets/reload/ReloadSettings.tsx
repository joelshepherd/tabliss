import * as React from 'react';
import { Settings } from '../../interfaces';

interface Props {
  input?: number;
  onChange: (settings: Settings) => void;
}

const ReloadSettings: React.StatelessComponent<Props> = ({ input = 1, onChange }) => {
  return (
    <div className="ReloadSettings">
      <label>
        Time between refreshes (minutes)
        <input type="number" min="0.1" max="300" value={input} onChange={event => onChange({ input: event.target.value })} />
      </label>
    </div>
  );
};

export default ReloadSettings;
