import { Data, Conditions } from './types';
import { API } from '../../interfaces';

const apiEndpoint = process.env.API_ENDPOINT!;

type Config = Pick<Data, 'latitude' | 'longitude' | 'units'>;

export async function getForecast(
  { latitude, longitude, units }: Config,
  loader: API['loader'],
): Promise<Conditions | undefined> {
  if (!latitude || !longitude) {
    return undefined;
  }

  loader.push();

  const url = `${apiEndpoint}/forecast?latitude=${latitude}&longitude=${longitude}&units=${units}`;
  const res = await (await fetch(url)).json();

  loader.pop();

  return {
    ...res.data,
    apparentTemperature: Math.round(res.data.apparentTemperature),
    humidity: Math.round(res.data.humidity * 100),
    precipProbability: Math.round(res.data.precipProbability * 100),
    temperature: Math.round(res.data.temperature),
    timestamp: Date.now(),
  };
}
