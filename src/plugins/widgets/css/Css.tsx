import React from 'react';

import { API } from '../../interfaces';

type Props = API<{ input: string }>;

const Css: React.FC<Props> = ({ data = { input: '' } }) => {
  React.useEffect(() => {
    const style = document.createElement('style');

    style.id = 'CustomCss';
    style.type = 'text/css';
    style.appendChild(document.createTextNode(data.input || ''));

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [data.input]);

  return null;
};

export default Css;
