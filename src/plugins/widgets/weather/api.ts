import { API } from '../../types';
import { Data, Conditions, Coordinates } from './types';

const apiEndpoint = process.env.API_ENDPOINT!;
const geocodeEndpoint = 'https://nominatim.openstreetmap.org';

type Config = Pick<Data, 'latitude' | 'longitude' | 'units'>;

export async function getForecast(
  { latitude, longitude, units }: Config,
  loader: API['loader'],
): Promise<Conditions | undefined> {
  if (!latitude || !longitude) {
    return;
  }

  if(units == "si"){
    units = "metric";
  } else if( units == "us") {
    units = "imperial";
  } else if( units == "standard" ) {
    units = "standard";
  } else {
    units = "metric";
  }

  loader.push();

  const url = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&exclude=minutely,hourly,daily,alerts&appid=${apiEndpoint}`;
  const res = await fetch(url);
  const body = await res.json();

  loader.pop();

  return {
    ...body.data,
    apparentTemperatureHigh: Math.round(body.data.feels_like.day),
    apparentTemperatureLow: Math.round(body.data.feels_like.night),
    humidity: Math.round(body.data.humidity),
    precipProbability: Math.round(body.data.pop),
    temperatureHigh: Math.round(body.data.temp.day),
    temperatureLow: Math.round(body.data.temp.night),
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
