import { API } from "../../types";

export interface Data {
  method: "GET" | "POST";
  url: string;
  body: string;
  responseType: "image" | "direct" | "json";
  jsonPath: string;
  timeout: number;
  paused: boolean;
}

export interface CacheData {
  url: string;
  fetchedAt: number;
}

export type Props = API<Data, CacheData | undefined>;

export const defaultData: Data = {
  method: "GET",
  url: "",
  body: "",
  responseType: "direct",
  jsonPath: "",
  timeout: 0,
  paused: false,
};
