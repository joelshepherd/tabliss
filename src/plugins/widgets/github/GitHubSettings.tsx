import React, { FC } from "react";

import { Props, defaultData } from "./types";

const GitHubSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="MessageSettings">
    <label>
      UserName
      <input
        type="text"
        value={data.username}
        onChange={(event) => setData({ ...data, username: event.target.value })}
      />
      <label>
        <input
          type="checkbox"
          checked={data.showSummary}
          onChange={(event) =>
            setData({ ...data, showSummary: !data.showSummary })
          }
        />{" "}
        Show summary overview
      </label>
    </label>
  </div>
);

export default GitHubSettings;
