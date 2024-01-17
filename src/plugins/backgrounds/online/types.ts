import { API } from "../../types";

export type Data = {
    url?: string;
};

export type Props = API<Data>;

export const defaultData: Data = {};
