import React, { FC } from "react";

import { Props, defaultData } from "./types";

const RandomMessageSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="RandomMessageSettings">
    <label>
      Messages (separet by semicolon)
      <textarea
        rows={3}
        value={data.randomMessages[0]}
        onChange={(event) => {
          //console.log(event.target.value);
          setData({ randomMessages: [event.target.value] })
        }}
      />
    </label>
  </div>
);

export default RandomMessageSettings;
