import { API } from "../../types";

export type Gif = {
  data: Blob;
  link: string;
};

export type Data = {
  expand: boolean;
  nsfw: boolean;
  tag: string;
};

export type Cache = Gif;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  expand: false,
  nsfw: false,
  tag: "pattern",
};
