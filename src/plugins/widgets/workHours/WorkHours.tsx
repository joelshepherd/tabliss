import React, { FC } from "react";
import { useTime } from "../../../hooks";
import { Props, defaultData } from "./types";

const WorkHours: FC<Props> = ({data = defaultData}) => {
  const start = buildDateTime(data.startTime);
  const end = buildDateTime(data.endTime);
  const time = useTime();

 return (
   <div className="WorkHours">
     <h2>{hoursProgress(time, start, end)}</h2>
   </div>
 )
}

const hoursProgress = (current: Date, start: Date, end: Date): string => {
  if(current < start) return '0%';
  if(current > end) return '100%';

  const total = end.getTime() - start.getTime();
  const progress = current.getTime() - start.getTime();

  return `${Math.round((progress/total)*100)}%`;
}

const buildDateTime = (time: string): Date => {
  const [hours, minutes] = time.split(":");
  const dateTime = new Date();
  dateTime.setHours(Number(hours));
  dateTime.setMinutes(Number(minutes))
  dateTime.setSeconds(0);
  return dateTime;
}

export default WorkHours;
