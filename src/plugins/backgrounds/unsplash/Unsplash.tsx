import React from "react";
import Backdrop from "../../../views/shared/Backdrop";
import { buildLink, fetchImages } from "./api";
import { defaultData, Props } from "./types";
import "./Unsplash.sass";
import UnsplashCredit from "./UnsplashCredit";
import { EffectCallback, useEffect, useMemo, useRef } from "react";
import { Cache } from "../../types";
import { useTime } from "../../../../src/hooks/useTime";

const Unsplash: React.FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
  setData,
}) => {
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Lag one frame behind to show the animation
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    setShow(true);
  }, [true]);

  function useRotatingCache<T>(
    fetch: () => Promise<T[]>,
    { cache, setCache }: Cache<RotatingCache<T>>,
    timeout: number,
    deps: unknown[],
  ): T | undefined {
    // Find cursor
    const time = useTime("absolute").getTime();
    const boot = useRef(true);
    const cursor: any = useMemo(() => {
      if (cache) {
        if (
          (timeout === 0 && boot.current) ||
          (timeout !== 0 && time > cache.rotated + timeout)
        ) {
          if (data.smoothTransition) {
            setShow(false);
            sleep(1050).then(() => {
              const cursor = cache.cursor + 1;
              setCache({ ...cache, cursor, rotated: Date.now() });
              boot.current = false;
              setShow(true);
              return cursor;
            });
          } else {
            const cursor = cache.cursor + 1;
            setCache({ ...cache, cursor, rotated: Date.now() });
            boot.current = false;
            return cursor;
          }
        }
        boot.current = false;
        return cache.cursor;
      }
      return 0;
    }, [cache, time, timeout]);

    // Fetch more when cursor reaches end
    useEffect(() => {
      if (cache && cursor >= cache.items.length - 1) {
        // fetch more
        fetch().then((items) =>
          setCache({
            ...cache,
            items: [...cache.items.slice(-10), ...items],
            cursor: 9,
          }),
        );
      }
    }, [cursor]);

    // Refresh of deps change
    useEffect(() => {
      if (!cache || !areDepsEqual(deps, cache.deps)) {
        fetch().then((items) =>
          setCache({ items, cursor: 0, rotated: Date.now(), deps }),
        );
      }
    }, [...deps, cache]);

    return cache ? cache.items[cursor] : undefined;
  }

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
      ? () => {
          if (data.smoothTransition) {
            setShow(false);
            setTimeout(function () {
              setCache({
                ...cache!,
                cursor: cache!.cursor + amount,
                rotated: Date.now(),
              });
              console.log("hello 1");
              setShow(true);
            }, 1050);
          } else {
            setCache({
              ...cache!,
              cursor: cache!.cursor + amount,
              rotated: Date.now(),
            });
          }
          console.log("Hellp 2");
        }
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
        ready={show}
        style={{ backgroundImage: url ? `url(${url})` : undefined }}
      />

      {item ? (
        <UnsplashCredit
          credit={item!.credit}
          paused={data.paused ?? false}
          onPause={handlePause}
          onPrev={go(-1)}
          onNext={go(1)}
        />
      ) : null}
    </div>
  );
};

/**
 * A cached effect that automatically reruns after the expires time or on deps change.
 */
function useCachedEffect(
  effect: EffectCallback,
  expires: Date | number,
  deps: unknown[],
) {
  const time = useTime("absolute");
  const prevDeps = useRef(deps);
  const prevExpires = useRef<Date | number>();

  useEffect(() => {
    const depsChanged = !areDepsEqual(prevDeps.current, deps);
    const expired = time >= expires && expires !== prevExpires.current;

    if (depsChanged || expired) {
      prevDeps.current = deps;
      prevExpires.current = expires;
      return effect();
    }
  }, [...deps, expires, time]);
}

type RotatingCache<Item> = {
  items: Item[];
  cursor: number;
  rotated: number;
  deps: unknown[];
};

/**
 * Implementation adapted from react's hook source.
 * Too bad they do not export it.
 */
function areDepsEqual(prevDeps: unknown[], nextDeps: unknown[]) {
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (Object.is(nextDeps[i], prevDeps[i])) {
      continue;
    }
    return false;
  }
  return true;
}

export default Unsplash;
