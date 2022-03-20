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
}) => {
  // If legacy cache design, clear and let the new cache take over
  // Unfortunately, without the imaeg src being stored, I cannot migrate the old cache
  if (cache && "now" in cache) {
    cache = undefined;
  }

  // Get current item from rotating cache
  const item = useRotatingCache(
    () => {
      loader.push();
      return fetchImages(data).finally(loader.pop);
    },
    { cache, setCache },
    data.timeout * 1000,
    [data.by, data.collections, data.featured, data.search, data.topics],
  );

  // Populate cache with the next image
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

  return (
    <div className="Unsplash fullscreen">
      <Backdrop
        className="image fullscreen"
        ready={Boolean(url)}
        style={{ backgroundImage: url ? `url(${url})` : undefined }}
      />

      {item ? (
        <UnsplashCredit credit={item.credit} onPrev={go(-1)} onNext={go(1)} />
      ) : null}
    </div>
  );
};

export default Unsplash;
