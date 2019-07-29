import React, { FC } from 'react';

import { useRotatingCache } from '../../../utils/useCache';
import { useObjectUrl } from '../../../utils/useObjectUrl';
import Backdrop from '../../../views/shared/Backdrop';
import { getImage } from './api';
import { Props, defaultData } from './types';
import UnsplashCredit from './UnsplashCredit';
import './Unsplash.sass';

const Unsplash: FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
}) => {
  const cacheArea = { cache, setCache };
  const image = useRotatingCache(
    () => getImage(data, loader),
    cacheArea,
    data.timeout * 1000,
    [data.by, data.collections, data.featured, data.search],
  );

  const url = useObjectUrl(image && image.data);

  return (
    <div className="Unsplash fullscreen">
      <Backdrop
        className="image fullscreen"
        style={{ backgroundImage: url && `url(${url})` }}
      />

      {cache && <UnsplashCredit image={cache.now} />}
    </div>
  );
};

export default Unsplash;
