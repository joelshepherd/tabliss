import { reducer } from './reducer';
import { addTodo, removeTodo, toggleTodo, updateTodo } from './actions';

describe('todo/reducer', () => {
  it('should add todo', () => {
    expect(reducer([], addTodo('Test todo'))).toEqual([
      {
        id: expect.any(String),
        contents: 'Test todo',
        completed: false,
      },
    ]);

    expect(
      reducer(
        [
          {
            id: '1234',
            contents: 'Existing todo',
            completed: true,
          },
        ],
        addTodo('Test todo'),
      ),
    ).toEqual([
      {
        id: '1234',
        contents: 'Existing todo',
        completed: true,
      },
      {
        id: expect.any(String),
        contents: 'Test todo',
        completed: false,
      },
    ]);
  });

  it('should remove todo', () => {
    expect(
      reducer(
        [
          {
            id: '1234',
            contents: 'Existing todo',
            completed: true,
          },
        ],
        removeTodo('1234'),
      ),
    ).toEqual([]);

    expect(
      reducer(
        [
          {
            id: '1234',
            contents: 'Existing todo',
            completed: true,
          },
          {
            id: '5678',
            contents: 'Second existing todo',
            completed: false,
          },
        ],
        removeTodo('1234'),
      ),
    ).toEqual([
      {
        id: '5678',
        contents: 'Second existing todo',
        completed: false,
      },
    ]);
  });

  it('should toggle todo', () => {
    expect(
      reducer(
        [
          {
            id: '1234',
            contents: 'Existing todo',
            completed: true,
          },
          {
            id: '5678',
            contents: 'Second existing todo',
            completed: false,
          },
        ],
        toggleTodo('1234'),
      ),
    ).toEqual([
      {
        id: '1234',
        contents: 'Existing todo',
        completed: false,
      },
      {
        id: '5678',
        contents: 'Second existing todo',
        completed: false,
      },
    ]);

    expect(
      reducer(
        [
          {
            id: '1234',
            contents: 'Existing todo',
            completed: true,
          },
          {
            id: '5678',
            contents: 'Second existing todo',
            completed: false,
          },
        ],
        toggleTodo('5678'),
      ),
    ).toEqual([
      {
        id: '1234',
        contents: 'Existing todo',
        completed: true,
      },
      {
        id: '5678',
        contents: 'Second existing todo',
        completed: true,
      },
    ]);
  });

  it('should update todo', () => {
    expect(
      reducer(
        [
          {
            id: '1234',
            contents: 'Existing todo',
            completed: true,
          },
          {
            id: '5678',
            contents: 'Second existing todo',
            completed: false,
          },
        ],
        updateTodo('1234', 'Existing todo: edited'),
      ),
    ).toEqual([
      {
        id: '1234',
        contents: 'Existing todo: edited',
        completed: true,
      },
      {
        id: '5678',
        contents: 'Second existing todo',
        completed: false,
      },
    ]);
  });

  it('should delete on empty update', () => {
    expect(
      reducer(
        [
          {
            id: '1234',
            contents: 'Existing todo',
            completed: true,
          },
          {
            id: '5678',
            contents: 'Second existing todo',
            completed: false,
          },
        ],
        updateTodo('5678', ''),
      ),
    ).toEqual([
      {
        id: '1234',
        contents: 'Existing todo',
        completed: true,
      },
    ]);
  });

  it('should throw on unknown action', () => {
    expect(() => reducer([], { type: 'UNKNOWN' } as any)).toThrow();
  });
});
