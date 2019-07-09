import React, { FC } from 'react';

import { Props, defaultData } from './types';

const Message: FC<Props> = ({ data = defaultData }) => (
  <div className="Message">
    <h3 style={{ whiteSpace: 'pre' }}>{data.message}</h3>
  </div>
);

export default Message;
