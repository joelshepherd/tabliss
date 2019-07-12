import { useEffect, useRef } from 'react';
import { useTime } from './useTime';

export function useExpiry(
  effect: () => void | (() => void),
  expires: Date | number,
  deps: unknown[],
) {
  const first = useRef(true);

  useEffect(() => {
    const booted = !first.current;
    first.current = false;

    if (booted || Date.now() >= expires) {
      return effect();
    }
  }, deps);
}

export type RotatingCache<Item> = {
  now: Item;
  next: Item;
  rotated: number;
  deps: unknown[];
};

function areDepsEqual(prevDeps: unknown[], nextDeps: unknown[]) {
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (Object.is(nextDeps[i], prevDeps[i])) {
      continue;
    }
    return false;
  }
  return true;
}

export function useRotatingCache<T>(
  create: () => T | Promise<T>,
  {
    cache,
    setCache,
  }: {
    cache?: RotatingCache<T>;
    setCache: (cache: RotatingCache<T>) => void;
  },
  timeout: number,
  deps: unknown[],
): T | undefined {
  // On dependency change, refresh all
  useEffect(() => {
    if (!cache || !areDepsEqual(deps, cache.deps)) {
      Promise.all([create(), create()]).then(([now, next]) =>
        setCache({ now, next, rotated: Date.now(), deps }),
      );
    }
  }, deps);

  // On timeout, rotate to the next image
  const time = useTime().getTime();
  const loadingNext = useRef(false);

  if (cache && time > cache.rotated + timeout && !loadingNext.current) {
    const rotatedCache = {
      ...cache,
      now: cache.next,
      rotated: Date.now(),
    };
    setCache(rotatedCache);

    loadingNext.current = true;
    Promise.resolve(create()).then(next => {
      setCache({ ...rotatedCache, next });

      // Don't keep rotation going if set to change on every new tab
      if (timeout !== 0) loadingNext.current = false;
    });
  }

  return cache ? cache.now : undefined;
}
