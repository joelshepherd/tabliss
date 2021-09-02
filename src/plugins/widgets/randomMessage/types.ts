import { API } from "../../types";

type Data = { randomMessages: string[] };
type DataMessage = { message: string };

export type Props = API<Data>;
export type PropsDataMessage = API<DataMessage>;

export const defaultData: Data = { randomMessages: ["Text1;Text2"] };
