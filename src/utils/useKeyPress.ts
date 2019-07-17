import { useEffect } from 'react';

import { isInputEvent } from './isInputEvent';

export function useKeyPress(
  callback: (event: KeyboardEvent) => void,
  detectKeys: string[],
) {
  const handler = (event: KeyboardEvent) => {
    if (detectKeys.includes(event.key) && !isInputEvent(event)) {
      callback(event);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);
}
