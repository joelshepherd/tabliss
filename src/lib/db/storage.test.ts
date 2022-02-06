import * as DB from "./db";
import * as Storage from "./storage";

test("storage local init", () => {
  const db = DB.init();
  Storage.local(db, "test");
});

// TODO: Fix the jsdom issue with storage event listeners not firing
test.skip("storage local push changes to database", (done) => {
  const db = DB.init();
  Storage.local(db, "test");
  localStorage.setItem("test/test", "test");
  setTimeout(() => {
    expect(DB.get(db, "test")).toBe("test");
  });
  setTimeout(done);
});

test("storage restore with invalid data", () => {
  localStorage.setItem("test/invalid/json", "undefined");
  const db = DB.init();
  Storage.local(db, "test");
  expect(DB.get(db, "invalid/json")).toBeNull();
});
