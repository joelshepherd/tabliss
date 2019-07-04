import { API } from '../../interfaces';

export interface Conditions {
  alerts: Alert[];
  apparentTemperature: number;
  humidity: number;
  icon: ConditionIcon;
  precipProbability: number;
  temperature: number;
  precipType?: number;
  timestamp: number;
  units: string;
}

export interface Alert {
  title: string;
  description: string;
}

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

export type Data = {
  latitude?: number;
  longitude?: number;
  mode: string;
  units: string;
};

export type Cache = {
  conditions?: Conditions;
  details: boolean;
};

export type Props = API<Data, Cache>;

export const defaultCache: Cache = {
  details: false,
};

export const defaultData: Data = {
  mode: 'corner',
  units: 'auto',
};
