import { API } from "../../types";

export type Coordinates = {
  latitude?: number;
  longitude?: number;
};

export interface Conditions {
  timestamp: number;
  conditions: {
    timestamp: number;
    temperature: number;
    apparentTemperature: number;
    humidity: number;
    precipitation: number;
    weathercode: number;
  }[];
}

export type Data = Coordinates & {
  name?: string;
  showDetails: boolean;
  units: "auto" | "si" | "us"; // `auto` has been removed, but may still be present in settings
};

export type Cache = Conditions | undefined;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  showDetails: false,
  units: "auto",
};
