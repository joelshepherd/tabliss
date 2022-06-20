import { API } from "../../types";

type Data = {
  hour12: boolean;
  mode: "analogue" | "digital";
  showDate: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  showDayPeriod?: boolean;
  timeZone: string | null;
  name?: string;
};

export type Props = API<Data>;

export const defaultData: Data = {
  mode: "digital",
  hour12: false,
  showDate: false,
  showMinutes: true,
  showSeconds: false,
  showDayPeriod: true,
  timeZone: null,
};
