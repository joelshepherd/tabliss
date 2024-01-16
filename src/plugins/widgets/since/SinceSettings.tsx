import { format } from "date-fns";
import React, { FC } from "react";
import { defaultData, Props } from "./types";

function formatDate(time: number): string {
  return format(time, "yyyy-MM-dd");
}

function formatTime(time: number): string {
  return format(time, "HH:mm:ss");
}

function buildDateObject(time: number, timeStr: string): Date {
  return new Date(`${formatDate(time)} ${timeStr || "00:00:00"}`);
}

const SinceSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="CssSettings">
    <label>
      What
      <input
        type="text"
        value={data.title || ""}
        onChange={(event) => setData({ ...data, title: event.target.value })}
      />
    </label>

    <label>
      When
      <label>
        Date
        <input
          type="date"
          value={formatDate(data.time)}
          onChange={(event) =>
            setData({
              ...data,
              time: (event.target.value
                ? new Date(event.target.value)
                : new Date()
              ).getTime(),
            })
          }
        />
      </label>
      <label>
        Time
        <input
          type="time"
          value={formatTime(data.time)}
          onChange={(event) => {
            setData({
              ...data,
              time: buildDateObject(data.time, event.target.value).getTime(),
            });
          }}
        />
      </label>
    </label>
  </div>
);

export default SinceSettings;
