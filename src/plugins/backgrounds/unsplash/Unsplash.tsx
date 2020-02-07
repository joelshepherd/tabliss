import React, { FC } from 'react';
import { useRotatingCache } from '../../../hooks';
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

  useRotatingCache(
    () =>
      getImage(data, loader).then(imageData => {
        let prevImages = cache!.now.previous_images;
        return {
          currentImage: imageData,
          previous_images:
            prevImages.length > 0
              ? prevImages.length > 2
                ? [...cache!.now.previous_images.slice(1, 3), imageData.id]
                : [...cache!.now.previous_images, imageData.id]
              : [''],
        };
      }),
    cacheArea,
    data.timeout * 1000,
    [data.by, data.collections, data.featured, data.search],
  );

  const url = cache ? URL.createObjectURL(cache.now.currentImage.data) : '';

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
