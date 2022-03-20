import { RotatingCache } from "../../../hooks";
import { API } from "../../types";

type By = "official" | "collections" | "search" | "topics";

export interface Data {
  by: By;
  collections: string;
  featured: boolean;
  search: string;
  topics: string;
  timeout: number;
}

export interface Image {
  src: string;
  credit: {
    imageLink: string;
    location?: string;
    userName: string;
    userLink: string;
  };
}

type Cache = RotatingCache<Image>;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  by: "official",
  collections: "",
  featured: false,
  search: "",
  topics: "bo8jQKTaE0Y",
  timeout: 900,
};
