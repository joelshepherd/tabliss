export type Key<T = any> = keyof T & string;
export type Val = unknown;
export type Change = [key: Key, val: Val];
export type Listener = (change: Change) => void;
export type Unsubscribe = () => void;

type Shape = Record<Key, Val>;

export interface Database<T = any> extends Snapshot<T> {
  listeners: Set<Listener>;
}

interface Snapshot<T> extends Iterable<[Key, Val]> {
  cache: Map<Key, Val>;
  parent: Snapshot<T> | null;
}

/**
 * Init a new database.
 */
export const init = <T = Shape>(def?: T): Database<T> => {
  return {
    listeners: new Set(),
    ...snapshot(def ? snapshot(null, Object.entries(def)) : null),
  };
};

/**
 * Get a value from a key in the database.
 * WARNING: These types can lie to you. Without schema support, invalid data may be saved in storage.
 */
export const get = <T, K extends Key<T>>(db: Snapshot<T>, key: K): T[K] => {
  // @ts-ignore
  if (db.cache.has(key)) return db.cache.get(key);
  if (db.parent) return get(db.parent, key);
  // @ts-ignore
  return undefined;
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
): Generator<PrefixEntries<T, P>> {
  for (const [key, val] of db.cache) {
    if (key.startsWith(path)) {
      if (seen.has(key)) continue;
      seen.add(key);
      // @ts-ignore
      yield [key, val];
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
  db.cache.set(key, val);
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
  if ("listeners" in db) {
    // TODO: This is here because of the interaction with def data, consider changing
    db.cache.delete(key);
    db.listeners.forEach((listener) => listener([key, undefined]));
  } else {
    db.cache.set(key, undefined);
  }
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
  fn: (snap: Snapshot<T>) => void,
): void => {
  const snap = snapshot(db);
  fn(snap);
  commit(db, snap.cache.entries());
};

const snapshot = <T>(
  parent: Snapshot<T> | null = null,
  changes?: Iterable<Change>,
): Snapshot<T> => {
  const cache = new Map(changes);
  return {
    cache,
    parent,
    [Symbol.iterator]: cache[Symbol.iterator].bind(cache),
  };
};

const commit = (db: Database, changes: Iterable<Change>): void => {
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
type PrefixKeys<T, P extends string> = T extends `${P}${infer K}`
  ? `${P}${K}`
  : never;
type KeyEntries<T, K> = K extends keyof T ? [K, T[K]] : never;
type PrefixEntries<T, P extends Prefix<keyof T> | ""> = KeyEntries<
  T,
  PrefixKeys<keyof T, P>
>;
