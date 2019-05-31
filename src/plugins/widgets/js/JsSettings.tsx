import React from 'react';
import { Settings } from '../../interfaces';

interface Props {
  input?: string;
  onChange: (settings: Settings) => void;
}

const JsSettings: React.StatelessComponent<Props> = ({
  input = '',
  onChange,
}) => {
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
        Warning: this functionality is intended for advanced users. Custom
        scripts may break at any time. The snippet will run once after the
        dashboard has loaded. Be careful of persisting event listeners when
        editing the snippet.
      </p>
    </div>
  );
};

export default JsSettings;
