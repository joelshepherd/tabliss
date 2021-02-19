import { API } from '../../types';

import { IpData } from './types';


export async function getIpInfo(loader: API['loader']): Promise<IpData> {
  loader.push();

  const data = await fetch('https://www.gogeoip.com/json/?user')
    .then((res) => res.json())
    .finally(() => loader.pop());

  return {
    ip: data && data.network && data.network.ip,
    city: data && data.location && data.location.city,
    country: data && data.location && data.location.country.name,
    timestamp: Date.now()
  };
}
