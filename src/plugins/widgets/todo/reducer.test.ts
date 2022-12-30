import { reducer } from "./reducer";
import { addTodo, removeTodo, toggleTodo, updateTodo } from "./actions";

describe("todo/reducer", () => {
  it("should add todo", () => {
    expect(reducer([], addTodo("Test todo"))).toEqual([
      {
        id: expect.any(String),
        contents: "Test todo",
        completed: false,
        completedAt: null,
      },
    ]);

    expect(
      reducer(
        [
          {
            id: "1234",
            contents: "Existing todo",
            completed: true,
            completedAt: "2022-30-12T12:44:38",
          },
        ],
        addTodo("Test todo"),
      ),
    ).toEqual([
      {
        id: "1234",
        contents: "Existing todo",
        completed: true,
        completedAt: "2022-30-12T12:44:38",
      },
      {
        id: expect.any(String),
        contents: "Test todo",
        completed: false,
        completedAt: null,
      },
    ]);
  });

  it("should remove todo", () => {
    expect(
      reducer(
        [
          {
            id: "1234",
            contents: "Existing todo",
            completed: true,
            completedAt: "2022-30-12T12:44:38",
          },
        ],
        removeTodo("1234"),
      ),
    ).toEqual([]);

    expect(
      reducer(
        [
          {
            id: "1234",
            contents: "Existing todo",
            completed: true,
            completedAt: "2022-30-12T12:44:38",
          },
          {
            id: "5678",
            contents: "Second existing todo",
            completed: false,
            completedAt: null,
          },
        ],
        removeTodo("1234"),
      ),
    ).toEqual([
      {
        id: "5678",
        contents: "Second existing todo",
        completed: false,
        completedAt: null,
      },
    ]);
  });

  it("should toggle todo", () => {
    expect(
      reducer(
        [
          {
            id: "1234",
            contents: "Existing todo",
            completed: true,
            completedAt: "2022-30-12T12:44:38",
          },
          {
            id: "5678",
            contents: "Second existing todo",
            completed: false,
            completedAt: null,
          },
        ],
        toggleTodo("1234"),
      ),
    ).toEqual([
      {
        id: "1234",
        contents: "Existing todo",
        completed: false,
        completedAt: null,
      },
      {
        id: "5678",
        contents: "Second existing todo",
        completed: false,
        completedAt: null,
      },
    ]);

    expect(
      reducer(
        [
          {
            id: "1234",
            contents: "Existing todo",
            completed: true,
            completedAt: "2022-30-12T12:44:38",
          },
          {
            id: "5678",
            contents: "Second existing todo",
            completed: false,
            completedAt: null,
          },
        ],
        toggleTodo("5678"),
      ),
    ).toEqual([
      {
        id: "1234",
        contents: "Existing todo",
        completed: true,
        completedAt: "2022-30-12T12:44:38",
      },
      {
        id: "5678",
        contents: "Second existing todo",
        completed: true,
        completedAt: expect.stringMatching(/[0-9TZ:-]+/),
      },
    ]);
  });

  it("should update todo", () => {
    expect(
      reducer(
        [
          {
            id: "1234",
            contents: "Existing todo",
            completed: true,
            completedAt: "2022-30-12T12:44:38",
          },
          {
            id: "5678",
            contents: "Second existing todo",
            completed: false,
            completedAt: null
          },
        ],
        updateTodo("1234", "Existing todo: edited"),
      ),
    ).toEqual([
      {
        id: "1234",
        contents: "Existing todo: edited",
        completed: true,
        completedAt: "2022-30-12T12:44:38"
      },
      {
        id: "5678",
        contents: "Second existing todo",
        completed: false,
        completedAt: null,
      },
    ]);
  });

  it("should delete on empty update", () => {
    expect(
      reducer(
        [
          {
            id: "1234",
            contents: "Existing todo",
            completed: true,
            completedAt: "2022-30-12T12:44:38",
          },
          {
            id: "5678",
            contents: "Second existing todo",
            completed: false,
            completedAt: null,
          },
        ],
        updateTodo("5678", ""),
      ),
    ).toEqual([
      {
        id: "1234",
        contents: "Existing todo",
        completed: true,
        completedAt: "2022-30-12T12:44:38"
      },
    ]);
  });

  it("should throw on unknown action", () => {
    expect(() => reducer([], { type: "UNKNOWN" } as any)).toThrow();
  });
});
