import React, { useEffect, useState, FC } from 'react';

import { Props, defaultData } from './types';

const Timer: FC<Props> = ({ data = defaultData }) => {

  const calculateTimeLeft = () => {
    const difference = +new Date(data.date) - +new Date();
    let timeLeft: any = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
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
        {data.name} :
      </h4>
      <h5>
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </h5>
    </div>
  );
};

export default Timer;
