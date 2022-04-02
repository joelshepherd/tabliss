import React, { FC } from "react";

import { useKeyPress, useSavedReducer, useToggle } from "../../../hooks";
import { DownIcon, Icon, UpIcon, ExpandIcon } from "../../../views/shared";
import { addTodo, removeTodo, toggleTodo, updateTodo } from "./actions";
import { reducer, State } from "./reducer";
import TodoList from "./TodoList";
import { defaultData, Props } from "./types";

const Todo: FC<Props> = ({ data = defaultData, setData }) => {
  const [showCompleted, toggleShowCompleted] = useToggle();
  const [showMore, toggleShowMore] = useToggle();

  const setItems = (items: State) => setData({ ...data, items });
  const dispatch = useSavedReducer(reducer, data.items, setItems);

  const items = data.items.filter((item) => !item.completed || showCompleted);
  const show = !showMore ? data.show : undefined;

  const keyBind = data.keyBind ?? "T";
  useKeyPress(
    () => dispatch(addTodo()),
    [keyBind.toUpperCase(), keyBind.toLowerCase()],
  );

  return (
    <div className="Todo">
      <TodoList
        items={items}
        onToggle={(...args) => dispatch(toggleTodo(...args))}
        onUpdate={(...args) => dispatch(updateTodo(...args))}
        onRemove={(...args) => dispatch(removeTodo(...args))}
        show={show}
      />

      <div>
        <a onClick={() => dispatch(addTodo())}>
          <ExpandIcon />
        </a>{" "}
        <a onClick={toggleShowCompleted}>
          <Icon name={showCompleted ? "check-circle" : "circle"} />
        </a>{" "}
        {items.length > data.show && (
          <a onClick={toggleShowMore}>{showMore ? <UpIcon /> : <DownIcon />}</a>
        )}
      </div>
    </div>
  );
};

export default Todo;
