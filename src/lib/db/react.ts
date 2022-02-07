import * as DB from "./db";
import React from "react";

export const useKey = <T, K extends keyof T>(
  db: DB.Database<T>,
  key: K,
): [T[K], (val: T[K]) => void] => {
  // TODO: Use react's state apis and do not duplicate memory
  const [state, setState] = React.useState(DB.get(db, key));
  React.useEffect(() => {
    setState(DB.get(db, key));
    return DB.listen(db, ([changeKey, val]) => {
      if (key === changeKey) {
        setState(val as T[K]);
      }
    });
  }, [db, key]);
  return [state, (val) => DB.put(db, key, val)];
};

export const useValue = <T, K extends keyof T>(
  db: DB.Database<T>,
  key: K,
): T[K] => {
  const [value] = useKey(db, key);
  return value;
};

export const useSelector = <
  T,
  S extends (get: <K extends keyof T>(key: K) => T[K]) => any,
>(
  db: DB.Database<T>,
  selector: S,
  deps: unknown[] = [],
): ReturnType<S> => {
  const listeners = React.useRef(new Map<keyof T, () => void>());

  const update = () => {
    // Execute selector
    const nextKeys = new Set<keyof T>();
    const nextState = selector((key) => {
      nextKeys.add(key);
      return DB.get(db, key);
    });

    // Update listeners
    // TODO: consider a functional iteration lib
    //       pipe(nextKeys.values(), filter(...), forEach(...))
    listeners.current.forEach((unsub, key) => {
      if (!nextKeys.has(key)) {
        listeners.current.delete(key);
        unsub();
      }
    });
    nextKeys.forEach((key) => {
      if (!listeners.current.has(key)) {
        const unsub = DB.listen(db, update);
        listeners.current.set(key, unsub);
      }
    });

    return nextState;
  };

  const [state, setState] = React.useState(update());

  React.useEffect(() => {
    setState(update());
  }, deps);

  return state;
};
