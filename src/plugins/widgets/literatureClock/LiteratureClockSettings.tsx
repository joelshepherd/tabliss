import React, { FC } from "react";

import { Props, defaultData } from "./types";

const LiteratureClockSettings: FC<Props> = ({
  data = defaultData,
  setData,
}) => (
  <div className="LiteratureClockSettings">
    <label>
      <input
        type="checkbox"
        checked={data.showBookAndAuthor}
        onChange={() =>
          setData({ ...data, showBookAndAuthor: !data.showBookAndAuthor })
        }
      />{" "}
      Display book and author
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.centerText}
        onChange={() => setData({ ...data, centerText: !data.centerText })}
      />{" "}
      Align text at center
    </label>
  </div>
);

export default LiteratureClockSettings;
