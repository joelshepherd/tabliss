export interface Settings {
  latitude: number | string;
  longitude: number | string;
  mode: string;
  units: string;
}

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
