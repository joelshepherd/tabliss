import React, { FC } from 'react';

import { Props, defaultData } from './types';
import { Label, Input } from 'reactstrap';

const MessageSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="MessageSettings">
    <Input
      type="textarea"
      rows={3}
      value={data.messages[0]}
      onChange={event => setData({ messages: [event.target.value] })}
    />
  </div>
);

export default MessageSettings;
