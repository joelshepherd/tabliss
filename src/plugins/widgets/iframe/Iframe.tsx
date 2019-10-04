import React, { FC } from 'react';

import { Props, defaultData } from './types';

const Iframe: FC<Props> = ({ data = defaultData }) => (
  <iframe
    src={data.url}
    style={{ width: data.width, height: data.height, border: 'none' }}
    id={data.id}
  />
);

export default Iframe;
