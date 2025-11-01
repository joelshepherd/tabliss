import React, { FC } from "react";

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

const WorkHoursSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const resetWorkHours = () => {
    localStorage.removeItem("workHours_session");
    window.location.reload(); // Refresh to reset the widget
  };

  return (
    <div className="WorkHoursSettings">
      <label>
        <input
          type="checkbox"
          checked={data.dailyReset}
          onChange={(event) =>
            setData({ ...data, dailyReset: event.target.checked })
          }
        />
        Reset work hours daily
      </label>
      
      <label>
        Display format
        <select
          value={data.showFormat}
          onChange={(event) =>
            setData({ ...data, showFormat: event.target.value as 'hours' | 'minutes' })
          }
        >
          <option value="hours">Hours and minutes</option>
          <option value="minutes">Minutes only</option>
        </select>
      </label>

      <div>
        <strong>Work days:</strong>
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

      <div style={{ marginTop: '20px' }}>
        <button 
          type="button" 
          onClick={resetWorkHours}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset Work Hours
        </button>
        <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
          This will clear all tracked work hours and restart the timer.
        </small>
      </div>
    </div>
  );
};

export default WorkHoursSettings;
