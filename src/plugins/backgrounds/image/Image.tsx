import sample from 'lodash-es/sample';
import React, { FC, useEffect, useState } from 'react';

import { Props, defaultData } from './types';
import './Image.sass';

const Image: FC<Props> = ({ data = defaultData }) => {
  if (!data.images.length) {
    return <div className="Image default fullscreen" />;
  }

  const [url, setUrl] = useState<string>();
  useEffect(() => {
    setUrl(URL.createObjectURL(sample(data.images)));

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [data.images]);

  return (
    <div
      className="Image fullscreen"
      style={{ backgroundImage: `url(${url})` }}
    />
  );
};

export default Image;
