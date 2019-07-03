import React from 'react';

import { Props, defaultData } from './types';

const Message: React.FC<Props> = ({ data = defaultData }) => (
  <div className="Message">
    <h3 style={{ whiteSpace: 'pre' }}>{data.message}</h3>
  </div>
);

export default Message;
