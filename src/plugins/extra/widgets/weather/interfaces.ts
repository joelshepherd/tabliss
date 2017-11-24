export interface Settings {
  latitude: number;
  longitude: number;
  mode: string;
  units: string;
}

export interface Conditions {
  alerts: Alert[];
  apparentTemperature: number;
  humidity: number;
  icon: string;
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
