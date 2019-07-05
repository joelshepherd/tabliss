import React, { FC, useEffect, useState } from 'react';

import { getGif } from './api';
import { Props, defaultData } from './types';
import Credit from './Credit';
import './Giphy.sass';

const Giphy: FC<Props> = ({ cache, data = defaultData, setCache, loader }) => {
  const [gif, setGif] = useState(cache);
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    const config = { tag: data.tag, nsfw: data.nsfw };
    if (url) getGif(config, loader).then(setGif);
    getGif(config, loader).then(setCache);
  }, [data.tag, data.nsfw]);

  if (!gif) return null;

  useEffect(() => {
    setUrl(URL.createObjectURL(gif.data));
    return () => URL.revokeObjectURL(url!);
  }, [gif]);

  return (
    <div className="Giphy fullscreen">
      <div
        className="gif fullscreen"
        style={{
          backgroundImage: url ? `url(${url})` : undefined,
          backgroundSize: data.expand ? 'cover' : undefined,
        }}
      />
      <Credit link={gif.link} />
    </div>
  );
};

export default Giphy;
