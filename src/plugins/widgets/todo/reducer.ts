import { Action } from "./actions";

type Todo = {
  id: string;
  contents: string;
  completed: boolean;
  completedAt: string | null;
};

export type State = Todo[];

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat(action.data);

    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.data.id);

    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.data.id
          ? { ...todo, completed: !todo.completed, completedAt: todo.completed ? null : new Date().toISOString() }
          : todo,
      );

    case "UPDATE_TODO":
      if (action.data.contents === "") {
        return state.filter((todo) => todo.id !== action.data.id);
      }

      return state.map((todo) =>
        todo.id === action.data.id
          ? { ...todo, contents: action.data.contents }
          : todo,
      );

    default:
      throw new Error("Unknown action");
  }
}
