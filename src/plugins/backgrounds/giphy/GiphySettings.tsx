import React, { FC } from "react";

import { Props, defaultData } from "./types";
import { DebounceInput } from "../../shared";

const GiphySettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="GiphySettings grid-container">
    <div className="cell-2">
      <label>
        Tag
        <DebounceInput
          type="text"
          value={data.tag}
          onChange={(value) => setData({ ...data, tag: value })}
          wait={500}
        />
      </label>
      <p className="info">Separate multiple tags with a comma</p>
    </div>
    <div className="cell-2">
    <label>
      <input
        type="checkbox"
        checked={data.nsfw}
        onChange={(event) => setData({ ...data, nsfw: !data.nsfw })}
      />{" "}
      Allow NSFW
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.expand}
        onChange={(event) => setData({ ...data, expand: !data.expand })}
      />{" "}
      Stretch to fill screen
    </label>
    </div>
  </div>
);

export default GiphySettings;
