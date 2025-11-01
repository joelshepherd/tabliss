import React, { FC } from "react";

import { useKeyPress, useSavedReducer, useToggle } from "../../../hooks";
import { Icon } from "../../../views/shared";
import { addTodo, removeTodo, toggleTodo, updateTodo } from "./actions";
import { reducer, State } from "./reducer";
import TodoList from "./TodoList";
import { defaultData, Props } from "./types";
import "./Todo.sass";

const Todo: FC<Props> = ({ data = defaultData, setData }) => {
  const [showCompleted, toggleShowCompleted] = useToggle();
  const [showMore, toggleShowMore] = useToggle();

  const setItems = (items: State) => setData({ ...data, items });
  const dispatch = useSavedReducer(reducer, data.items, setItems);

  const items = data.items.filter((item) => !item.completed || showCompleted);
  const show = !showMore ? data.show : undefined;

  const keyBind = data.keyBind ?? "T";
  useKeyPress(
    (event: KeyboardEvent) => {
      event.preventDefault();
      dispatch(addTodo());
    },
    [keyBind.toUpperCase(), keyBind.toLowerCase()],
  );

  return (
    <div className="Todo">
      <div className="todo-header">
        <div className="header-left">
          <h2 className="todo-title">Tasks</h2>
        </div>
        <div className="header-right">
          <a onClick={toggleShowCompleted} className="icon-button">
            <Icon name="filter" />
          </a>
          <a onClick={() => dispatch(addTodo())} className="icon-button fab">
            <Icon name="plus" />
          </a>
        </div>
      </div>

      <TodoList
        items={items}
        onToggle={(...args) => dispatch(toggleTodo(...args))}
        onUpdate={(...args) => dispatch(updateTodo(...args))}
        onRemove={(...args) => dispatch(removeTodo(...args))}
        show={show}
      />

      {!items.length && <span className="empty">Empty tasks</span>}

      {/* <button className="fab" onClick={() => dispatch(addTodo())}>
        <Icon name="plus" />
      </button> */}
    </div>
  );
};

export default Todo;
