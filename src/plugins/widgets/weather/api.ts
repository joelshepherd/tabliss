import { API } from "../../types";
import { Conditions, Coordinates, Data } from "./types";

type Config = Pick<Data, "latitude" | "longitude" | "units">;

export async function getForecast(
  { latitude, longitude, units }: Config,
  loader: API["loader"],
): Promise<Conditions | undefined> {
  if (!latitude || !longitude) {
    return;
  }

  loader.push();

  const params = new URLSearchParams([
    ["latitude", String(latitude)],
    ["longitude", String(longitude)],
    ["hourly", "temperature_2m"],
    ["hourly", "apparent_temperature"],
    ["hourly", "relativehumidity_2m"],
    ["hourly", "precipitation"],
    ["hourly", "weathercode"],
    ["timeformat", "unixtime"],
    ["temperature_unit", units === "us" ? "fahrenheit" : "celsius"],
  ]);
  const url = `https://api.open-meteo.com/v1/forecast?${params}`;
  const res = await fetch(url);
  const body = await res.json();

  loader.pop();

  // Process results
  // TODO: validate response
  return {
    timestamp: Date.now(),
    conditions: body.hourly.time.map((timestamp: number, i: number) => ({
      timestamp,
      temperature: body.hourly.temperature_2m[i],
      apparentTemperature: body.hourly.apparent_temperature[i],
      humidity: body.hourly.relativehumidity_2m[i],
      precipitation: body.hourly.precipitation[i],
      weathercode: body.hourly.weathercode[i],
    })),
  };
}

export async function geocodeLocation(query: string): Promise<Coordinates> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1`;
  const res = await fetch(url);
  const data = await res.json();

  return {
    latitude: round(data.results[0].latitude),
    longitude: round(data.results[0].longitude),
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

function round(x: number, precision = 4): number {
  return Math.round(x * 10 ** precision) / 10 ** precision;
}
