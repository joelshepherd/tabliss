type Key = string;
type Val = unknown;
type Change = [key: Key, val: Val];
type Listener = (change: Change) => void;
type Unsubscribe = () => void;

type Shape = Record<Key, Val>;

export interface Database<T = Shape> {
  cache: Map<string, unknown>;
  listeners: Set<Listener>;
}

/**
 * Init a new database.
 */
export const init = <T = Shape>(def?: T): Database<T> => {
  const cache = new Map(def ? Object.entries(def) : []);
  const cacheListener = ([key, val]: Change) => {
    if (val === null) cache.delete(key);
    else cache.set(key, val);
  };
  return { cache, listeners: new Set([cacheListener]) };
};

/**
 * Get a value from a key in the database.
 */
export const get = <T, K extends keyof T>(db: Database<T>, key: K): T[K] => {
  // WARNING: These types are lying to you.
  //          There could easily be invalid data saved in localstorage.
  return (db.cache.get(key as string) ?? null) as T[K];
};

/**
 * Put a value into a key in the database.
 */
export const put = <T, K extends keyof T>(
  db: Database<T>,
  key: K,
  val: T[K] | null,
): void => {
  if (val === null) db.cache.delete(key as string);
  else db.cache.set(key as string, val);
  // TODO: Check key types
  db.listeners.forEach((listener) => listener([key as string, val]));
};

/**
 * Delete a key from the database.
 */
export const del = <T, K extends keyof T>(db: Database<T>, key: K): void => {
  put(db, key, null);
};

/**
 * Listen to changes in the database.
 */
export const listen = (db: Database, listener: Listener): Unsubscribe => {
  db.listeners.add(listener);
  return () => db.listeners.delete(listener);
};
