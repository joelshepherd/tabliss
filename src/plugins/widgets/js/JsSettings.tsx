import * as React from 'react';
import { Settings } from '../../interfaces';

interface Props {
  input?: string;
  onChange: (settings: Settings) => void;
}

const JsSettings: React.StatelessComponent<Props> = ({ input = '', onChange }) => {
  return (
    <div className="JsSettings">
      <label>
        JavaScript Snippet
        <textarea
          rows={3}
          style={{ fontFamily: 'monospace' }}
          value={input}
          onChange={event => onChange({ input: event.target.value })}
        />
      </label>

      <p className="info">
        Warning: this functionality is intended for advanced users. Custom scripts may break at any time.
        The script will be run once. Event listener will stay registered even after rerunning(editing) the code.
      </p>
    </div>
  );
};

export default JsSettings;
