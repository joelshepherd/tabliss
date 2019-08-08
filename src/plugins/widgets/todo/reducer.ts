import { Action } from './actions';

type Todo = {
  id: string;
  contents: string;
  completed: boolean;
};

export type State = Todo[];

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [action.data, ...state];

    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.data.id);

    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.data.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      );

    case 'UPDATE_TODO':
      return state.map(todo =>
        todo.id === action.data.id
          ? { ...todo, contents: action.data.contents }
          : todo,
      );

    default:
      throw new Error('Unknown action');
  }
}
