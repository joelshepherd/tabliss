import { API } from "../../types";

export type Data = {
  startTime: string;
  endTime: string;
}

export type Props = API<Data>

export const defaultData: Data = {
  startTime: "09:00",
  endTime: "17:00"
}
