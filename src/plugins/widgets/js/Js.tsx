import { FC, useEffect } from 'react';

import { Props, defaultData } from './types';

const Js: FC<Props> = ({ data = defaultData }) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.id = 'CustomJs';
    script.type = 'text/javascript';
    script.appendChild(document.createTextNode(data.input));

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data.input]);

  return null;
};

export default Js;
