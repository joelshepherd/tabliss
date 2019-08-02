import { useEffect, useRef } from 'react';
import { useTime } from './useTime';

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
  const rotateCache = () => {
    const rotatedCache = {
      ...cache!,
      now: cache!.next,
      rotated: Date.now(),
    };
    setCache(rotatedCache);

    Promise.resolve(create()).then(next => setCache({ ...rotatedCache, next }));
  };

  // Special case for changing every new tab
  useEffect(() => {
    if (cache && timeout === 0) {
      rotateCache();
    }
  }, [timeout]);

  // Rotate cache on timeout
  const time = useTime().getTime();
  useEffect(() => {
    if (cache && timeout !== 0 && time > cache.rotated + timeout) {
      rotateCache();
    }
  }, [time, timeout]);

  // On dependency change, refresh all
  useEffect(() => {
    if (!cache || !areDepsEqual(deps, cache.deps)) {
      Promise.all([create(), create()]).then(([now, next]) =>
        setCache({ now, next, rotated: Date.now(), deps }),
      );
    }
  }, [...deps, cache]);

  return cache ? cache.now : undefined;
}

export function useCachedEffect(
  effect: () => void | (() => void),
  expires: Date | number,
  deps: unknown[],
) {
  const time = useTime();
  const prevDeps = useRef(deps);

  useEffect(() => {
    const depsChanged = !areDepsEqual(prevDeps.current, deps);
    const expired = time >= expires;

    if (depsChanged || expired) {
      prevDeps.current = deps;
      return effect();
    }
  }, [...deps, time]);
}
