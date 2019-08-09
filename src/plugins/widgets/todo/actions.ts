import { v4 as generateId } from 'uuid';

export function addTodo(contents: string) {
  return {
    type: 'ADD_TODO',
    data: {
      contents,
      id: generateId(),
      completed: false,
    },
  } as const;
}

export function completeTodo(id: string, completed = true) {
  return {
    type: 'COMPLETE_TODO',
    data: { id, completed },
  } as const;
}

export function removeTodo(id: string) {
  return {
    type: 'REMOVE_TODO',
    data: { id },
  } as const;
}

export function updateTodo(id: string, contents: string) {
  return {
    type: 'UPDATE_TODO',
    data: { id, contents },
  } as const;
}

export type Action =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof completeTodo>
  | ReturnType<typeof removeTodo>
  | ReturnType<typeof updateTodo>;
