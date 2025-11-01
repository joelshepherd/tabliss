import React, { useEffect, useRef, useState } from "react";
import { defaultData, Props } from "./types";
import { getTodayWorkSeconds } from "./handler";

const UPDATE_INTERVAL = 1000;

const WorkHours: React.FC<Props> = ({ data = defaultData }) => {
  const [seconds, setSeconds] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  const isWorkDay = (days: number[]): boolean =>
    days.includes(new Date().getDay());

  useEffect(() => {
    const poll = async () => {
      try {
        const res = await getTodayWorkSeconds();
        if (res && typeof res.seconds === "number") {
          setSeconds(res.seconds);
        }
      } catch {
        // ignore background not ready
      }
    };

    poll();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(poll, UPDATE_INTERVAL) as unknown as number;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const formatWorkTime = (totalSeconds: number): string => {
    const totalMinutes = Math.floor(totalSeconds / 60);
    if (data.showFormat === "minutes") {
      return `${totalMinutes}m`;
    }
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0) return `${minutes}m`;
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  };

  return (
    <div className="WorkHours">
      {isWorkDay(data.days) && (
        <>
          <h2>{formatWorkTime(seconds)}</h2>
        </>
      )}
    </div>
  );
};

export default WorkHours;
