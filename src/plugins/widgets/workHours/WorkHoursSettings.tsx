import React, { FC } from "react";

import { Props, defaultData } from "./types";

const WorkHoursSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="WorkHoursSettings">
    <label>
      Start Time
      <input
        type="time"
        value={data.startTime}
        onChange={(event) => setData({ startTime: event.target.value, endTime: data.endTime })}
      />
    </label>
    <label>
      End Time
      <input
        type="time"
        value={data.endTime}
        onChange={(event) => setData({ startTime: data.startTime, endTime: event.target.value })}
      />
    </label>
  </div>
);

export default WorkHoursSettings;
