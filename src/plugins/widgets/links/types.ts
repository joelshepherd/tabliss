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
  linksNumbered: boolean;
};

export type Props = API<Data>;

export const defaultData = {
  columns: 1,
  links: [{ url: "https://tabliss.io" }],
  visible: true,
  linkOpenStyle: false,
  linksNumbered: false,
};
