import React, { FC, useEffect, useState } from 'react';

import { useObjectUrl } from '../../../utils/useObjectUrl';
import Backdrop from '../../../views/shared/Backdrop';
import { getGif } from './api';
import { Props, defaultData } from './types';
import Credit from './Credit';
import './Giphy.sass';

const Giphy: FC<Props> = ({ cache, data = defaultData, setCache, loader }) => {
  const [gif, setGif] = useState(cache);

  useEffect(() => {
    const config = { tag: data.tag, nsfw: data.nsfw };
    if (url) getGif(config, loader).then(setGif);
    getGif(config, loader).then(setCache);
  }, [data.tag, data.nsfw]);

  const url = useObjectUrl(gif && gif.data);

  if (!gif) return null;

  return (
    <div className="Giphy fullscreen">
      <Backdrop
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
