import React, { FC } from "react";
import "./Analogue.sass";

type Props = {
  showMinutes: boolean;
  showSeconds: boolean;
  time: Date;
};

const Analogue: FC<Props> = ({ time, showMinutes, showSeconds }) => {
  const hoursAngle = time.getHours() * 30 + time.getMinutes() * 0.5;
  const minutesAngle = time.getHours() * 360 + time.getMinutes() * 6;
  const secondsAngle =
    time.getHours() * 360 + time.getMinutes() * 360 + time.getSeconds() * 6;

  return (
    <div className="Time Analogue">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" className="bezel theme-stroke" />

        <line
          x1="50"
          y1="50"
          x2="50"
          y2="30"
          className="hours theme-stroke"
          style={{ transform: `rotate(${hoursAngle}deg)` }}
        />

        {showMinutes && (
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="15"
            className="minutes theme-stroke"
            style={{ transform: `rotate(${minutesAngle}deg)` }}
          />
        )}

        {showSeconds && (
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="10"
            className="seconds theme-stroke"
            style={{ transform: `rotate(${secondsAngle}deg)` }}
          />
        )}

        <circle cx="50" cy="50" r="3" className="cap theme-fill" />
      </svg>
    </div>
  );
};

export default Analogue;
