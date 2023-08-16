import { API } from "../../types";

type Data = {
  username: string;
  showSummary: boolean;
  linkToUser: boolean;
};

export type Props = API<Data>;

export const defaultData: Data = {
  username: "",
  showSummary: false,
  linkToUser: false,
};
