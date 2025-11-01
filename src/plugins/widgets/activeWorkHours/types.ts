import { API } from "../../types";

export type Data = {
  days: number[];
  dailyReset: boolean;
  showFormat: 'hours' | 'minutes';
};

export type WorkSession = {
  date: string; // YYYY-MM-DD format
  totalMinutes: number;
  lastActiveTime: number;
  isActive: boolean;
};

export type Props = API<Data>;

export const defaultData: Data = {
  days: [1, 2, 3, 4, 5],
  dailyReset: true,
  showFormat: 'hours',
};
