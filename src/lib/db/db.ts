type Key = string;
type Val = unknown;
export type Change = [key: Key, val: Val];
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

type Prefix<T> = T extends `${infer P}${infer K}`
  ? K extends ""
    ? P
    : P | `${P}${Prefix<K>}`
  : string;
type KeyWithPrefix<T, P extends string> = T extends `${P}${infer K}`
  ? `${P}${K}`
  : never;
type KeyToTuple<T, K> = K extends keyof T ? [K, T[K]] : never;

/**
 * Iterate over key-value pairs for keys beginning with the prefix.
 */
export const prefix = <T, P extends Prefix<keyof T> | "">(
  db: Database<T>,
  prefix: P,
): IterableIterator<KeyToTuple<T, KeyWithPrefix<keyof T, P>>> => {
  // TODO: use with upcoming iterator helpers instead
  const iterator = db.cache[Symbol.iterator]();
  return {
    next: () => {
      let next: ReturnType<typeof iterator.next>;
      do {
        next = iterator.next();
        if (next.done) return next;
      } while (!next.value[0].startsWith(prefix));
      return { ...next, value: [next.value[0], next.value[1]] as any }; // TODO: types, maybe
    },
    [Symbol.iterator]() {
      return this;
    },
  };
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

/**
 * @experimental
 * this is almost certainly not the final form
 */
export const flush = (db: Database, changes: Change[]): void => {
  const keys = new Set<Key>();
  changes.forEach(([key, val]) => {
    if (val === null) db.cache.delete(key as string);
    else db.cache.set(key as string, val);
    keys.add(key);
  });
  // TODO: does this help? bonus is cache is populated before listeners fire, but does this help?
  // keys.forEach(key =>
};
/**
 * @experimental
 * get/set/etc would need to accept `Database|Transaction` for this to work
 * but i guess its good, cos listen shouldn't be available on a `Transaction`
 */
export const atomic = (db: Database, fn: (trx: Database) => void): void => {
  const trx = init();
  fn(trx);
  flush(db, Object.entries(trx.cache));
};
