import { API } from "../../types";

type Data = {
  rootBookmark: string;
  maxWidth: number;
  wrap: boolean;
};

export type Props = API<Data>;

export const defaultData: Data = {
  rootBookmark: "",
  maxWidth: 30,
  wrap: true,
};
