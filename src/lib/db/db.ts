export type Key<T = any> = keyof T & string;
export type Val = unknown;
export type Change = [key: Key, val: Val];
export type Listener = (change: Change) => void;
export type Unsubscribe = () => void;

type Shape = Record<Key, Val>;

// TODO: implement iterable interface
export interface Database<T = any> extends Snapshot<T> {
  listeners: Set<Listener>;
}

interface Snapshot<T> {
  cache: Map<Key, Val>;
  parent: Snapshot<T> | null;
}

/**
 * Init a new database.
 */
export const init = <T = Shape>(def?: T): Database<T> => {
  return {
    cache: new Map(),
    listeners: new Set(),
    parent: def
      ? {
          cache: new Map(Object.entries(def)),
          parent: null,
        }
      : null,
  };
};

/**
 * Get a value from a key in the database.
 * WARNING: These types can lie to you. Without schema support, invalid data may be saved in storage.
 */
export const get = <T, K extends Key<T>>(db: Snapshot<T>, key: K): T[K] => {
  if (db.cache.has(key)) return db.cache.get(key) as any;
  if (db.parent) return get(db.parent, key);
  return undefined as any;
  // TODO: consider throwing, may require tombstones to work correctly
  // throw new NotFoundError(key);
};

/**
 * Iterate over key-value pairs for keys beginning with the prefix.
 */
export const prefix = function* <T, P extends Prefix<keyof T> | "">(
  db: Snapshot<T>,
  path: P,
  seen: Set<string> = new Set(),
): IterableIterator<KeyToTuple<T, KeyWithPrefix<keyof T, P>>> {
  for (const [key, val] of db.cache) {
    if (key.startsWith(path)) {
      if (!seen.has(key)) {
        seen.add(key);
        // Probably a waste of time (and the ts compiler's time) to remove this `any`
        yield [key, val] as any;
      }
    }
  }
  if (db.parent) yield* prefix(db.parent, path, seen);
};

/**
 * Put a value into a key in the database.
 */
export const put = <T, K extends Key<T>>(
  db: Snapshot<T> | Database<T>,
  key: K,
  val: T[K] | undefined,
): void => {
  if (val === undefined && "listeners" in db) db.cache.delete(key);
  else db.cache.set(key, val);
  if ("listeners" in db)
    db.listeners.forEach((listener) => listener([key, val]));
};

/**
 * Delete a key from the database.
 */
export const del = <T, K extends Key<T>>(
  db: Snapshot<T> | Database<T>,
  key: K,
): void => {
  put(db, key, undefined);
};

/**
 * Listen to changes in the database.
 */
export const listen = (db: Database, listener: Listener): Unsubscribe => {
  db.listeners.add(listener);
  return () => db.listeners.delete(listener);
};

/**
 * Commits all writes or none if an error is thrown in provided function.
 * does provide atomic writes
 * does provide write isolation
 * does not provide read isolation
 * @experimental
 */
export const atomic = <T>(
  db: Database<T>,
  fn: (trx: Snapshot<T>) => void,
): void => {
  const trx = snapshot(db);
  fn(trx);
  commit(db, trx.cache.entries());
};

const snapshot = <T>(parent: Snapshot<T> | null = null): Snapshot<T> => {
  return {
    cache: new Map(),
    parent,
  };
};

const commit = (db: Database, changes: IterableIterator<Change>): void => {
  for (const [key, val] of changes) {
    put(db, key, val);
  }
};

// Types for prefix function
type Prefix<T> = T extends `${infer P}${infer K}`
  ? K extends ""
    ? P
    : P | `${P}${Prefix<K>}`
  : string;
type KeyWithPrefix<T, P extends string> = T extends `${P}${infer K}`
  ? `${P}${K}`
  : never;
type KeyToTuple<T, K> = K extends keyof T ? [K, NoUndefined<T[K]>] : never;
type NoUndefined<T> = T extends undefined ? never : T;
