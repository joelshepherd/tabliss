import React from "react";
import { DebounceInput } from "../../shared";
import { defaultData, Props } from "./types";

const OnlineSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="OnlineSettings">
    <label>
      Image URL
      <DebounceInput
        type="text"
        value={data.url}
        onChange={(value) => setData({ url: value })}
        wait={1000}
      />
    </label>
  </div>
);

export default OnlineSettings;
