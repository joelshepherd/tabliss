import React, { useEffect, useState, FC } from "react";

import { useFormatMessages } from "../../../hooks";
import { Props, defaultData } from "./types";
import { useSelector } from "../../../store";

const Timer: FC<Props> = ({ data = defaultData }) => {
  const locale = useSelector((state) => state.data.locale);

  const numberFormatter = Intl.NumberFormat(locale);

  const calculateTimeLeft = () => {
    const difference = +new Date(data.date) - +new Date();
    let timeLeft: any = {};

    if (difference > 0) {
      timeLeft = {
        days: numberFormatter.format(
          Math.floor(difference / (1000 * 60 * 60 * 24)),
        ),
        hours: numberFormatter.format(
          Math.floor((difference / (1000 * 60 * 60)) % 24),
        ),
        minutes: numberFormatter.format(
          Math.floor((difference / 1000 / 60) % 60),
        ),
        seconds: numberFormatter.format(Math.floor((difference / 1000) % 60)),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents: any[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{' '}
      </span>,
    );
  });

  return (
    <div>
      <h4>
        {data.name}
      </h4>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
};

export default Timer;
