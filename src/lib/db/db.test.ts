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

test.todo("storage");
