import React from "react";
import { useRotatingCache } from "../../../hooks";
import Backdrop from "../../../views/shared/Backdrop";
import { buildLink, fetchImages } from "./api";
import { defaultData, Props } from "./types";
import "./Pexels.sass";
import PexelsCredit from "./PexelsCredit";

const Pexels: React.FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
  setData,
}) => {
  const item = useRotatingCache(
    () => {
      loader.push();
      return fetchImages(data).finally(loader.pop);
    },
    { cache, setCache },
    data.paused ? Number.MAX_SAFE_INTEGER : data.timeout * 1000,
    [data.by, data.search],
  );

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
    setData({ ...data, paused: !data.paused });
  };

  return (
    <div className="Pexels fullscreen">
      <Backdrop
        className="image fullscreen"
        ready={url !== null}
        style={{ backgroundImage: url ? `url(${url})` : undefined }}
      />

      {item ? (
        <PexelsCredit
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

export default Pexels;
