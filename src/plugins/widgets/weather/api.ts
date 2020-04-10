import { API } from '../../types';
import { Data, Conditions, Coordinates } from './types';

const apiEndpoint = process.env.API_ENDPOINT!;
const geocodeEndpoint = 'https://nominatim.openstreetmap.org';

type Config = Pick<Data, 'latitude' | 'longitude' | 'units' | 'name'>;

export async function getForecast(
  { latitude, longitude, units, name }: Config,
  loader: API['loader'],
): Promise<Conditions | undefined> {
  if (!latitude || !longitude) {
    return;
  }

  loader.push();

  const url = `${apiEndpoint}/forecast?latitude=${latitude}&longitude=${longitude}&units=${units}`;
  const res = await fetch(url);
  const body = await res.json();

  loader.pop();

  return {
    ...body.data,
    name,
    apparentTemperatureHigh: Math.round(body.data.apparentTemperatureHigh),
    apparentTemperatureLow: Math.round(body.data.apparentTemperatureLow),
    apparentTemperature: Math.round(body.data.apparentTemperature),
    humidity: Math.round(body.data.humidity * 100),
    precipProbability: Math.round(body.data.precipProbability * 100),
    temperatureHigh: Math.round(body.data.temperatureHigh),
    temperatureLow: Math.round(body.data.temperatureLow),
  };
}

export async function geocodeLocation(query: string): Promise<Coordinates> {
  const url = `${geocodeEndpoint}/search.php?format=json&q=${query}`;
  const res = await fetch(url);
  const data = await res.json();

  return {
    latitude: Number(data[0].lat),
    longitude: Number(data[0].lon),
  };
}

export function getCurrentLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      reject,
    ),
  );
}
