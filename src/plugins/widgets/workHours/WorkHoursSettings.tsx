import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Props, defaultData } from "./types";

const daysList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const WorkHoursSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="WorkHoursSettings">
    <label>
      <FormattedMessage
          id="plugins.workHours.startTime"
          defaultMessage="Start time"
          description="Start time title"
        />
      <input
        type="time"
        value={data.startTime}
        onChange={(event) =>
          setData({ ...data, startTime: event.target.value })
        }
      />
    </label>
    <label>
      <FormattedMessage
          id="plugins.workHours.endTime"
          defaultMessage="End time"
          description="End time title"
        />
      <input
        type="time"
        value={data.endTime}
        onChange={(event) => setData({ ...data, endTime: event.target.value })}
      />
    </label>
    {daysList.map((day, index) => (
      <div key={day}>
        <label>
          <input
            type="checkbox"
            checked={data.days.includes(index)}
            onChange={(event) =>
              setData({
                ...data,
                days: event.target.checked
                  ? [...data.days, index]
                  : data.days.filter((day) => day !== index),
              })
            }
          />
          {day}
        </label>
      </div>
    ))}
  </div>
);

export default WorkHoursSettings;
