import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

export function useDebounceToggle(defaultState: boolean, delay: number) {
  const [state, setState] = useState(defaultState);

  const debounce = () => {
    setState(false);
    setTimeout(() => setState(true), delay);
  };
  return [state, debounce] as const
}
