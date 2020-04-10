import { API } from '../../types';

export type Coordinates = {
  latitude?: number;
  longitude?: number;
};

type ConditionIcon =
  | 'clear-day'
  | 'clear-night'
  | 'rain'
  | 'snow'
  | 'sleet'
  | 'wind'
  | 'fog'
  | 'cloudy'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night';

export interface Conditions {
  alerts: {
    title: string;
    description: string;
  }[];
  apparentTemperatureHigh: number;
  apparentTemperatureLow: number;
  expiresAt: number;
  humidity: number;
  icon: ConditionIcon;
  precipProbability: number;
  temperatureHigh: number;
  temperatureLow: number;
  precipType?: number;
  units: string;
  name?: string;
}

export type Data = Coordinates & {
  name?: string;
  showDetails: boolean;
  units: string;
};

export type Cache = Conditions | undefined;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  showDetails: false,
  units: 'auto',
};
