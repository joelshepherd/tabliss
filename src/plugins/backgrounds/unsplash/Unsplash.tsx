import React, { FC, useState } from "react";

import { useObjectUrl, useRotatingCache, getCacheRotator } from "../../../hooks";
import Backdrop from "../../../views/shared/Backdrop";
import { getImage } from "./api";
import { Props, defaultData } from "./types";
import UnsplashCredit from "./UnsplashCredit";
import { Icon } from "../../../views/shared";
import { useDebounceToggle } from "../../../hooks"
import { useFormatMessages } from "../../../hooks";
import { messages, reloadIconName } from "../common";

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

const UnsplashReloader: FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
}) => {
  const translated = useFormatMessages(messages);

  // Do not allow click more frequent than once in `delay` ms
  const [activeButton, debounseButton] = useDebounceToggle(true, 3000);

  const rotateCache = getCacheRotator(() => getImage(data, loader), { cache, setCache })

  const onClick = () => {
    if (activeButton) {
      debounseButton();
      rotateCache();
    }
  };

  return (
    <a
      className="on-hover"
      onClick={onClick}
      title={translated.reloadImgHint}
      style={{ filter: activeButton ? '' : 'brightness(70%)', }}
    >
      <Icon name={reloadIconName} />
    </a>
  );
};


export { Unsplash, UnsplashReloader };
