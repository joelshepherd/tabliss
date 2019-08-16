import { backgroundConfigs } from './backgrounds';
import { widgetConfigs } from './widgets';

export { backgroundConfigs } from './backgrounds';
export { widgetConfigs } from './widgets';

const configs = [...backgroundConfigs, ...widgetConfigs];

export function getConfig(key: string) {
  const config = configs.find(config => config.key === key);

  if (!config) throw new Error(`Unable to find config for plugin: ${key}`);

  return config;
}
