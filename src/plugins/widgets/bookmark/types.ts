import { API } from "../../types";

export type Data = {
  row: number;
  col: number;
  selectedListId?: string
};

export type Props = API<Data>;

export const defaultData: Data = {
  row: 2,
  col: 4,
};
