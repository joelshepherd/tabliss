import React, { FC } from "react";

import { Props, defaultData } from "./types";

const NbaSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="NbaSettings">
    <label>
      <input
        type="checkbox"
        checked={data.displayLogo}
        onChange={() => setData({ ...data, displayLogo: !data.displayLogo })}
      />{" "}
      Display team logo
    </label>
  </div>
);

export default NbaSettings;
