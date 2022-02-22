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
 * Use a selector that reruns when the database changes.
 * @experimental may track keys in future
 */
export const useSelector = <T>(db: DB.Database, selector: () => T): T => {
  // return React.useSyncExternalStore(
  //   React.useCallback((listener) => DB.listen(db, listener), [db]),
  //   selector,
  // );
  const [state, setState] = React.useState(selector);
  React.useEffect(() => DB.listen(db, () => setState(selector())), [selector]);
  return state;
};

/**
 * Use a key from the database.
 * @experimental may be removed from core, may be kept if providers come in
 */
export const useKey = <T, K extends DB.Key<T>>(
  db: DB.Database<T>,
  key: K,
): [T[K], (val: T[K]) => void] => {
  return [useValue(db, key), (val) => DB.put(db, key, val)];
};
