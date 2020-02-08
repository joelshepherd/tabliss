import React, { FC } from 'react';
import { useRotatingCache } from '../../../hooks';
import Backdrop from '../../../views/shared/Backdrop';
import { getImage } from './api';
import { Props, defaultData, Image } from './types';
import UnsplashCredit from './UnsplashCredit';
import './Unsplash.sass';

const Unsplash: FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
}) => {
  const cacheArea = { cache, setCache };

  useRotatingCache(
    () =>
      getImage(data, loader).then(imageData => {
        var prevImages = Array<Image>();
        if (cache) var prevImages = cache.next.previous_images;
        if (prevImages.length > 3) prevImages.shift();
        return {
          currentImage: imageData,
          //cache the last 3 images
          previous_images: [...prevImages!, imageData],
        };
      }),
    cacheArea,
    data.timeout * 1000,
    [data.by, data.collections, data.featured, data.search],
  );

  const url = cache && URL.createObjectURL(cache.now.currentImage.data);
  return (
    <div className="Unsplash fullscreen">
      <Backdrop
        className="image fullscreen"
        style={{ backgroundImage: url && `url(${url})` }}
      />

      {cache && <UnsplashCredit image={cache.now.currentImage} />}
    </div>
  );
};

export default Unsplash;
