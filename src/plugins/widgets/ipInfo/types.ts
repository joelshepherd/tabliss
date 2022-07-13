import { API } from "../../types";

type Data = {
  displayCity: boolean;
  displayCountry: boolean;
};

export type IpData = {
  ip: string;
  city: string;
  country: string;
};

type Cache = IpData;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  displayCity: true,
  displayCountry: true,
};
