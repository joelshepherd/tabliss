import { API } from "../../types";

export type ApodDate = "today" | "custom";

export interface Data {
  date: ApodDate;
  customDate?: string;
  showTitle: boolean;
}

export interface Image {
  url: string;
  hdurl: string;

  title: string;
  date: Date;
  media_type: string;
  explanation: string;
  thumbnail_url: string;
}

type Cache = Image;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  date: "today",
  showTitle: true,
};
