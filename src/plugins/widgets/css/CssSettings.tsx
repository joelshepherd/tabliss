import React from 'react';

import { API } from '../../interfaces';

type Props = API<{ input: string }>;

const CssSettings: React.FC<Props> = ({ data, setData }) => {
  return (
    <div className="CssSettings">
      <label>
        CSS Snippet
        <textarea
          rows={3}
          style={{ fontFamily: 'monospace' }}
          value={data ? data.input : ''}
          onChange={event => setData({ input: event.target.value })}
        />
      </label>

      <p className="info">
        Warning: this functionality is intended for advanced users. Custom
        styles may break at any time.
      </p>
    </div>
  );
};

export default CssSettings;
