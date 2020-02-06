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
        return {
          currentImage: imageData,
          previous_images: [
            ...cache!.now.previous_images,
            imageData.image_link,
          ],
        };
      }),
    cacheArea,
    data.timeout * 1000,
    [data.by, data.collections, data.featured, data.search],
  );
  const url = URL.createObjectURL(cache!.now.currentImage.data);

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
