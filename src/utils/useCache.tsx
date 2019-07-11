import { useEffect, useRef } from 'react';

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
