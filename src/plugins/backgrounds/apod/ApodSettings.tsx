import React from "react";
import "./ApodSettings.sass";
import { DebounceInput } from "../../shared";
import { ApodDate, defaultData, Props } from "./types";
import { format } from "date-fns";

const maxDate = format(new Date(), "yyyy-MM-dd");

const UnsplashSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="ApodSettings">
    <label>
      Date of the picture
      <select
        value={data.date}
        onChange={(event) =>
          setData({ ...data, date: event.target.value as ApodDate })
        }
      >
        <option value="today">Today</option>
        <option value="custom">Custom date</option>
      </select>
    </label>

    {data.date === "custom" && (
      <label>
        Date
        <DebounceInput
          type="date"
          value={data.customDate}
          min="1995-06-16"
          max={maxDate}
          className="date"
          onChange={(value) => setData({ ...data, customDate: value })}
          wait={500}
        />
      </label>
    )}

    <label>
      <input
        type="checkbox"
        checked={data.showTitle}
        onChange={(event) => setData({ ...data, showTitle: !data.showTitle })}
      />{" "}
      Show title
    </label>
  </div>
);

export default UnsplashSettings;
