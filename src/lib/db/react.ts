import React from "react";
import * as DB from "./db";

/** Use a value from the database. */
export const useValue = <T, K extends DB.Key<T>>(
  db: DB.Database<T>,
  key: K,
): T[K] => {
  return React.useSyncExternalStore(
    React.useCallback(
      (listener) =>
        DB.listen(db, ([changeKey]) => {
          if (changeKey === key) listener();
        }),
      [db, key],
    ),
    React.useCallback(() => DB.get(db, key), [db, key]),
  );
};

/**
 * Use a key from the database.
 * @unstable may be removed from core, may be kept if providers come in
 */
export const useKey = <T, K extends DB.Key<T>>(
  db: DB.Database<T>,
  key: K,
): [T[K], (val: T[K]) => void] => {
  return [useValue(db, key), (val) => DB.put(db, key, val)];
};

// @experimental
// export const useSelector = <
//   T,
//   S extends (get: <K extends DB.Key<T>>(key: K) => T[K]) => any,
// >(
//   db: DB.Database<T>,
//   selector: S,
//   deps: unknown[] = [],
// ): ReturnType<S> => {
//   const listeners = React.useRef(new Map<keyof T, () => void>());

//   const update = () => {
//     // Execute selector
//     const nextKeys = new Set<keyof T>();
//     const nextState = selector((key) => {
//       nextKeys.add(key);
//       return DB.get(db, key);
//     });

//     // Update listeners
//     // TODO: consider a functional iteration lib
//     //       pipe(nextKeys.values(), filter(...), forEach(...))
//     listeners.current.forEach((unsub, key) => {
//       if (!nextKeys.has(key)) {
//         listeners.current.delete(key);
//         unsub();
//       }
//     });
//     nextKeys.forEach((key) => {
//       if (!listeners.current.has(key)) {
//         const unsub = DB.listen(db, update);
//         listeners.current.set(key, unsub);
//       }
//     });

//     return nextState;
//   };

//   const [state, setState] = React.useState(update());

//   React.useEffect(() => {
//     setState(update());
//   }, deps);

//   return state;
// };
