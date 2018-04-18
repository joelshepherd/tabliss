import * as React from 'react';
import { Settings } from '../../interfaces';

interface Props {
  input?: string;
  onChange: (settings: Settings) => void;
}

const CssSettings: React.StatelessComponent<Props> = ({ input, onChange }) => {
  return (
    <div className="CssSettings">
      <label>
        CSS Snippet
        <textarea
          rows={3}
          value={input || ''}
          onChange={event => onChange({ input: event.target.value })}
        />
      </label>

      <p className="info">
        Warning: this functionality is intended for advanced users.
        Custom styles may break at any time.
      </p>
    </div>
  );
};

export default CssSettings;
