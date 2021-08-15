import React, { FC } from "react";

import { Props, defaultData } from "./types";

const daysList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const WorkHoursSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="WorkHoursSettings">
    <label>
      Start Time
      <input
        type="time"
        value={data.startTime}
        onChange={(event) => setData({ ...data, startTime: event.target.value})}
      />
    </label>
    <label>
      End Time
      <input
        type="time"
        value={data.endTime}
        onChange={(event) => setData({ ...data, endTime: event.target.value })}
      />
    </label>
    <label>Work days:</label>
    {daysList.map((day, index) =>
      <div key={day}>
        <label>
          <input type="checkbox"
          checked={data.days.includes(index)}
          onChange={
            event =>
              setData({
                ...data,
                days: event.target.checked ?
                  [...data.days, index] :
                  data.days.filter(day => day !== index)
              })
            }
          />
          {day}
        </label>
      </div>
    )}
  </div>
);

export default WorkHoursSettings;
