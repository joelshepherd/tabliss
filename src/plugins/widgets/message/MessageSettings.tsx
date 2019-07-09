import React, { FC } from 'react';

import { Props, defaultData } from './types';

const MessageSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="MessageSettings">
    <label>
      Message
      <textarea
        rows={3}
        value={data.message}
        onChange={event => setData({ message: event.target.value })}
      />
    </label>
  </div>
);

export default MessageSettings;
