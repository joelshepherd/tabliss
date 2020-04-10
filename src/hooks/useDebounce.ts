import React, { useState, useEffect } from 'react';

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValued] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValued(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}
