import { API } from '../../types';

export interface Conditions {
  alerts: {
    title: string;
    description: string;
  }[];
  apparentTemperature: number;
  humidity: number;
  icon: ConditionIcon;
  precipProbability: number;
  temperature: number;
  precipType?: number;
  timestamp: number;
  units: string;
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
  showDetails: boolean;
  latitude?: number;
  longitude?: number;
  units: string;
};

export type Cache = Conditions | undefined;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  showDetails: false,
  units: 'auto',
};
