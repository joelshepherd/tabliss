import sample from 'lodash-es/sample';
import React from 'react';

import { Props } from './types';
import './Image.sass';

const Image: React.FC<Props> = ({ data: { images = [] } }) => {
  if (!images.length) {
    return <div className="Image default fullscreen" />;
  }

  const url = React.useMemo(() => {
    if (url) URL.revokeObjectURL(url);
    return URL.createObjectURL(sample(images));
  }, [images]);

  return (
    <div
      className="Image fullscreen"
      style={{ backgroundImage: `url(${url})` }}
    />
  );
};

export default Image;
