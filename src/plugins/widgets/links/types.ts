import { API } from "../../types";

export type Link = {
  name?: string;
  icon?: string;
  url: string;
};

export type Data = {
  columns: number;
  links: Link[];
  visible: boolean;
  linkOpenStyle: boolean;
};

export type Props = API<Data>;

export const defaultData = {
  columns: 1,
  links: [{ url: "https://tab-nine.xsfs.xyz" }],
  visible: true,
  linkOpenStyle: false,
};
