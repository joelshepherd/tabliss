import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number) {
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
