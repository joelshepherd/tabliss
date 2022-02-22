import * as DB from "./db";

test("database init", () => {
  DB.init();
});

test("database put", () => {
  const db = DB.init();
  DB.put(db, "test", "test");
});

test("database get", () => {
  const db = DB.init();
  DB.put(db, "test", "test");
  expect(DB.get(db, "test")).toBe("test");
});

test("database prefix", () => {
  const db = DB.init();
  DB.put(db, "prefix/a", "a");
  DB.put(db, "prefix/b", "b");
  DB.put(db, "ignore", "c");
  const result = Array.from(DB.prefix(db, "prefix/"));
  expect(result).toHaveLength(2);
  expect(result).toContainEqual(["prefix/a", "a"]);
  expect(result).toContainEqual(["prefix/b", "b"]);
  expect(result).not.toContainEqual(["ignore", "c"]);
});

test("database del", () => {
  const db = DB.init();
  DB.put(db, "test", "test");
  DB.del(db, "test");
  expect(DB.get(db, "test")).toBeNull();
});

test("database listen", () => {
  const db = DB.init();
  const fn = jest.fn();
  DB.listen(db, fn);
  DB.put(db, "test", "test");
  expect(fn).toBeCalledWith(["test", "test"]);
});

test("database listen unsubscribe", () => {
  const db = DB.init();
  const fn = jest.fn();
  const unsub = DB.listen(db, fn);
  unsub();
  DB.put(db, "test", "test");
  expect(fn).not.toBeCalled();
});

test("database default data", () => {
  const db = DB.init({ test: "test" });
  expect(DB.get(db, "test")).toBe("test");
});

test("database atomic writes flush", () => {
  const db = DB.init();
  DB.atomic(db, (trx) => {
    DB.put(trx, "test", "test");
  });
  expect(DB.get(db, "test")).toBe("test");
});

test("database atomic writes do not flush on error", () => {
  const db = DB.init();
  expect(() =>
    DB.atomic(db, (trx) => {
      DB.put(trx, "test", "test");
      throw null;
    }),
  ).toThrow();
  expect(DB.get(db, "test")).toBeNull();
});

test("database atomic flushes deletes", () => {
  const db = DB.init();
  DB.put(db, "test", "test");
  DB.atomic(db, (trx) => {
    DB.del(trx, "test");
  });
  expect(DB.get(db, "test")).toBeNull();
});

test("database atom prefix search", () => {
  // TODO: consider not permitting a prefix search on a snapshop
  const db = DB.init();
  DB.put(db, "prefix/a", "a");
  DB.atomic(db, (trx) => {
    DB.put(trx, "prefix/b", "b");
    const result = Array.from(DB.prefix(trx, "prefix/"));
    expect(result).toHaveLength(2);
    expect(result).toContainEqual(["prefix/a", "a"]);
    expect(result).toContainEqual(["prefix/b", "b"]);
  });
});

test("database atomic prefix search duplicate", () => {
  // TODO: as above, consider not permitting prefix search on a snapshot
  const db = DB.init();
  DB.put(db, "test", "test");
  DB.atomic(db, (trx) => {
    DB.put(trx, "test", "atomic");
    const result = Array.from(DB.prefix(trx, "t"));
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(["test", "atomic"]);
  });
});
