import React, { useEffect, useState, FC } from "react";
import { defineMessages, useIntl } from "react-intl";
import { db } from "../../../db/state";
import { useValue } from "../../../lib/db/react";
import { Props, defaultData } from "./types";

const messages = defineMessages({
  days: {
    id: "plugins.timer.days",
    description: "Days translation",
    defaultMessage: "days",
  },
  hours: {
    id: "plugins.timer.hours",
    description: "Hours translation",
    defaultMessage: "hours",
  },
  minutes: {
    id: "plugins.timer.minutes",
    description: "Minutes translation",
    defaultMessage: "minutes",
  },
  seconds: {
    id: "plugins.timer.seconds",
    description: "Seconds translation",
    defaultMessage: "seconds",
  }
});

type TimeKeys = keyof typeof messages;

const Timer: FC<Props> = ({ data = defaultData }) => {
  const intl = useIntl();
  const locale = useValue(db, "locale");
  const numberFormatter = Intl.NumberFormat(locale);

  const calculateTimeLeft = () => {
    const difference = +new Date(data.date) - +new Date();
    let timeLeft: Record<TimeKeys, string> = {
      days: "",
      hours: "",
      minutes: "",
      seconds: ""
    };

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

  (Object.keys(timeLeft) as TimeKeys[]).forEach((interval: TimeKeys, index: number) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={index}>
        <>{timeLeft[interval]} {intl.formatMessage(messages[interval])}{" "}</>
      </span>,
    );
  });

  return (
    <div>
      <h4>{data.name}</h4>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
};

export default Timer;
