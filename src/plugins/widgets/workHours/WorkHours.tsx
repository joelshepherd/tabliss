import { subDays } from "date-fns";
import React, { FC } from "react";
import { useTime } from "../../../hooks";
import { defaultData, Props } from "./types";

const WorkHours: FC<Props> = ({ data = defaultData }) => {
  let start = buildDateTime(data.startTime);
  const end = buildDateTime(data.endTime);
  const time = useTime();

  if (start > end) {
    start = subDays(start, 1);
  }

  return (
    <div className="WorkHours">
      {isWorkDay(data.days) && (
        <>
          <h2>{hoursProgress(time, start, end)}%</h2>
        </>
      )}
    </div>
  );
};

const hoursProgress = (current: Date, start: Date, end: Date): number => {
  if (current < start) return 0;
  if (current > end) return 100;

  const total = end.getTime() - start.getTime();
  const progress = current.getTime() - start.getTime();

  return Math.floor((progress / total) * 100);
};

const buildDateTime = (time: string): Date => {
  const [hours, minutes] = time.split(":");
  const dateTime = new Date();
  dateTime.setHours(Number(hours));
  dateTime.setMinutes(Number(minutes));
  dateTime.setSeconds(0);
  return dateTime;
};

const isWorkDay = (days: number[]): boolean =>
  days.includes(new Date().getDay());

export default WorkHours;
