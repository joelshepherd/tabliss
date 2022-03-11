import { API } from "../../types";

type Data = {
  ip: string;
  city: string;
  country: string;
  displayCity: boolean;
  displayCountry: boolean;
  refreshInterval: number;
};

export type IpData = {
  ip: string;
  city: string;
  country: string;
  timestamp: number;
};

type Cache = IpData;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  ip: "Fetching IP data...",
  city: "",
  country: "",
  displayCity: true,
  displayCountry: true,
  refreshInterval: 5,
};
