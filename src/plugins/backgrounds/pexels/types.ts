import { RotatingCache } from "../../../hooks";
import { API } from "../../types";

type By = "curated" | "search";

export interface Data {
  by: By;
  search: string;
  paused?: boolean;
  timeout: number;
}

export interface Image {
  src: string;
  credit: {
    photographerName: string;
    photographerLink: string;
    pexelsLink: string;
  };
}

type Cache = RotatingCache<Image>;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  by: "curated",
  search: "",
  paused: false,
  timeout: 900,
};