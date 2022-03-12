import React from "react";
import { DebounceInput } from "../../shared";
import { defaultData, Props } from "./types";

const GitHubSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="MessageSettings">
    <label>
      GitHub Username
      <DebounceInput
        type="text"
        value={data.username}
        onChange={(username) => setData({ ...data, username })}
      />
    </label>
    {/* <label>
      <input
        type="checkbox"
        checked={data.showSummary}
        onChange={(event) =>
          setData({ ...data, showSummary: !data.showSummary })
        }
      />{" "}
      Show summary overview
    </label>*/}
  </div>
);

export default GitHubSettings;
