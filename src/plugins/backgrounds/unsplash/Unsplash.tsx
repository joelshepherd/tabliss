import React, { FC } from "react";

import { useObjectUrl, useRotatingCache, getCacheRotator } from "../../../hooks";
import Backdrop from "../../../views/shared/Backdrop";
import { getImage } from "./api";
import { Props, defaultData } from "./types";
import UnsplashCredit from "./UnsplashCredit";
import { Icon } from "../../../views/shared";
import { useSelector } from "../../../store";

import "./Unsplash.sass";


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
        ready={Boolean(url)}
        style={{ backgroundImage: url && `url(${url})` }}
      />

      {cache && <UnsplashCredit image={cache.now} />}
    </div>
  );
};

export function createReloader(title: string, iconName: string) {
  const UnsplashReloader: FC<Props> = ({
    cache,
    data = defaultData,
    loader,
    setCache,
  }) => {
    const rotateCache = getCacheRotator(() => getImage(data, loader), { cache, setCache })

    return (
      <a
        className="on-hover"
        onClick={rotateCache}
        title={title}
      >
        <Icon name={iconName} />
      </a>
    );
  };

  return UnsplashReloader;
}

export { Unsplash };
