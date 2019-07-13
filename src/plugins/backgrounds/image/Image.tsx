import sample from 'lodash-es/sample';
import React, { FC, useEffect, useState } from 'react';

import { Props, defaultCache } from './types';
import './Image.sass';

const Image: FC<Props> = ({ cache = defaultCache }) => {
  if (!cache.images.length) {
    return <div className="Image default fullscreen" />;
  }

  const [url, setUrl] = useState<string>();
  useEffect(() => {
    setUrl(URL.createObjectURL(sample(cache.images)));

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [cache.images]);

  return (
    <div
      className="Image fullscreen"
      style={{ backgroundImage: `url(${url})` }}
    />
  );
};

export default Image;
