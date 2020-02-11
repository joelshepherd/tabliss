import React, { FC } from 'react';
import { useRotatingCache, useObjectUrl } from '../../../hooks';
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

  const newCache = useRotatingCache(
    async () => {
      const fetchedData = await getImage(data, loader);
      var prevImages = Array<Image>();
      var cacheImages = cache && cache.next.previous_images;
      if (cacheImages) {
        if (cacheImages.length > 2)
          prevImages = cacheImages.slice(
            cacheImages.length - 2,
            cacheImages.length,
          );
        else prevImages = cacheImages;
      }

      return {
        currentImage: fetchedData,
        //cache the last 3 images
        previous_images: prevImages && [...prevImages, fetchedData],
      };
    },
    cacheArea,
    data.timeout * 1000,
    [data.by, data.collections, data.featured, data.search],
  );

  const url = useObjectUrl(newCache && newCache.currentImage.data);
  return (
    <div className="Unsplash fullscreen">
      <Backdrop
        className="image fullscreen"
        style={{ background: url && `url(${url})` }}
      />

      {cache && <UnsplashCredit image={cache.now.currentImage} />}
    </div>
  );
};

export default Unsplash;
