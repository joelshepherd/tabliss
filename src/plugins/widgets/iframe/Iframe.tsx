import React, { FC } from 'react';

import { Props, defaultData } from './types';

const Iframe: FC<Props> = ({ data = defaultData }) => (
  <iframe
    src={data.url}
    style={{ width: data.width, height: data.height, border: 'none' }}
    id={data.id}
    onLoad={e => {
      const style = document.createElement('style');
      style.textContent = data.css;

      let IframeDom: any =
        document.getElementById(data.id) || document.createElement('iframe');
      console.log(IframeDom);
      IframeDom.document.body.appendChild(style);
    }}
  />
);

export default Iframe;
