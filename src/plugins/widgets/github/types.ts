import { API } from "../../types";

type Data = {
  username: string;
  showSummary: boolean;
};

export type Props = API<Data>;

export const defaultData: Data = {
  username: "",
  showSummary: false,
};
