import React from "react";
import { useRotatingCache } from "../../../hooks";
import Backdrop from "../../../views/shared/Backdrop";
import { buildLink, fetchImages } from "./api";
import { defaultData, Props } from "./types";
import "./Unsplash.sass";
import UnsplashCredit from "./UnsplashCredit";

const Unsplash: React.FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
  setData,
}) => {
  // If legacy cache design, clear and let the new cache take over
  // Unfortunately, without the image src being stored, I cannot migrate the old cache
  if (cache && "now" in cache) {
    cache = undefined;
  }

  // Migrate old pause setting
  React.useEffect(() => {
    if (data.timeout === Number.MAX_SAFE_INTEGER) {
      setData({
        ...data,
        paused: true,
        timeout: defaultData.timeout,
      });
    }
  }, []);

  // Get current item from rotating cache
  const item = useRotatingCache(
    () => {
      loader.push();
      return fetchImages(data).finally(loader.pop);
    },
    { cache, setCache },
    data.paused ? Number.MAX_SAFE_INTEGER : data.timeout * 1000,
    [data.by, data.collections, data.featured, data.search, data.topics],
  );

  // Populate browser cache with the next image
  React.useEffect(() => {
    if (cache && cache.items[cache.cursor + 1]) {
      const next = new Image();
      next.src = buildLink(cache.items[cache.cursor + 1].src);
      next.onload = loader.pop;
      next.onerror = loader.pop;
      loader.push();
    }
  }, [cache]);

  const url = item ? buildLink(item.src) : null;

  const go = (amount: number) =>
    cache && cache.items[cache.cursor + amount]
      ? () =>
          setCache({
            ...cache!,
            cursor: cache!.cursor + amount,
            rotated: Date.now(),
          })
      : null;

  const handlePause = () => {
    setData({
      ...data,
      paused: !data.paused,
    });
  };

  return (
    <div className="Unsplash fullscreen">
      <Backdrop
        className="image fullscreen"
        ready={url !== null}
        style={{ backgroundImage: url ? `url(${url})` : undefined }}
      />

      {item ? (
        <UnsplashCredit
          credit={item.credit}
          paused={data.paused ?? false}
          onPause={handlePause}
          onPrev={go(-1)}
          onNext={go(1)}
        />
      ) : null}
    </div>
  );
};

export default Unsplash;
