import React, { FC } from 'react';

import { Props, defaultData } from './types';

const QuoteSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="RssSettings">
    <label>
      URL
      <input
        type="url"
        value={data.url}
        onChange={event => setData({ url: event.target.value })}
      />
    </label>
  </div>
);

export default QuoteSettings;
