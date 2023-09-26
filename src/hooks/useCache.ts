import { EffectCallback, useEffect, useMemo, useRef } from "react";
import { Cache } from "../plugins";
import { useTime } from "./useTime";

/**
 * A cached effect that automatically reruns after the expires time or on deps change.
 */
export function useCachedEffect(
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

export type RotatingCache<Item> = {
  items: Item[];
  cursor: number;
  rotated: number;
  deps: unknown[];
};

/**
 * A cache which rotates through a list of items
 */
export function useRotatingCache<T>(
  fetch: () => Promise<T[]>,
  { cache, setCache }: Cache<RotatingCache<T>>,
  timeout: number,
  deps: unknown[],
): T | undefined {
  console.log();
  // Find cursor
  const time = useTime("absolute").getTime();
  const boot = useRef(true);
  const cursor = useMemo(() => {
    if (cache) {
      if (
        (timeout === 0 && boot.current) ||
        (timeout !== 0 && time > cache.rotated + timeout)
      ) {
        const cursor = cache.cursor + 1;
        setCache({ ...cache, cursor, rotated: Date.now() });
        boot.current = false;
        return cursor;
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
