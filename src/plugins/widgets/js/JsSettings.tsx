import React, { FC } from 'react';

import { Props, defaultData } from './types';

const JsSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="JsSettings">
    <label>
      JavaScript Snippet
      <textarea
        rows={3}
        style={{ fontFamily: 'monospace' }}
        value={data.input}
        onChange={event => setData({ input: event.target.value })}
      />
    </label>

    <p className="info">
      Warning: this functionality is intended for advanced users. Custom scripts
      may break at any time. The snippet will run once after the dashboard has
      loaded. Be careful of persisting event listeners when editing the snippet.
    </p>
  </div>
);

export default JsSettings;
