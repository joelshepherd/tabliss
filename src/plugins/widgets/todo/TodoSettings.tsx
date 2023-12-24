import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Props, defaultData } from "./types";

const TodoSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="SearchSettings">
    <label>
      <FormattedMessage
          id="plugins.tasks.toShow"
          defaultMessage="Tasks to show"
          description="Tasks to show title"
        />
      <input
        type="number"
        min="0"
        onChange={(event) =>
          setData({ ...data, show: Number(event.target.value) })
        }
        placeholder="Number of todo items to show"
        value={data.show}
      />
    </label>

    <label>
      <FormattedMessage
          id="plugins.tasks.newTasksKeybind"
          defaultMessage="New task keybind"
          description="New task keybind title"
        />
      <input
        type="text"
        maxLength={1}
        onChange={(event) =>
          setData({ ...data, keyBind: event.target.value })
        }
        value={data.keyBind}
      />
    </label>
  </div>
);

export default TodoSettings;
