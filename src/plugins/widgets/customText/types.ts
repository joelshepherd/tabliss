import { API } from "../../types";

type Data = {
  text: string;
  separator: string;
  strings: string[];
};

export type Props = API<Data>;

export const defaultData: Data = {text: "", strings: [""], separator: ";"};
