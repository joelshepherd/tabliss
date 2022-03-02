import React from "react";
import { useObjectUrl, useRotatingCache } from "../../../hooks";
import Backdrop from "../../../views/shared/Backdrop";
import { getImage } from "./api";
import { defaultData, Props } from "./types";
import "./Unsplash.sass";
import UnsplashCredit from "./UnsplashCredit";

const Unsplash: React.FC<Props> = ({
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
    [data.by, data.collections, data.featured, data.search, data.topics],
  );

  const url = useObjectUrl(image && image.data);

  return (
    <div className="Unsplash fullscreen">
      <Backdrop
        className="image fullscreen"
        ready={Boolean(url)}
        style={{ backgroundImage: url ? `url(${url})` : undefined }}
      />

      {cache && <UnsplashCredit image={cache.now} />}
    </div>
  );
};

export default Unsplash;
