import { backgroundConfigs } from "./backgrounds";
import { widgetConfigs } from "./widgets";
import Unknown from "./widgets/unknown/Unknown";
import UnknownSettings from "./widgets/unknown/UnknownSettings";

export { backgroundConfigs } from "./backgrounds";
export { widgetConfigs } from "./widgets";

const configs = [...backgroundConfigs, ...widgetConfigs];

export function getConfig(key: string) {
  const config = configs.find((config) => config.key === key);

  console.log(config);

  if (!config) {
    console.warn(`Unable to find config for plugin: ${key}`);
    return {
      key: "widget/unknown",
      name: "Unknown Widget",
      description: `Something went wrong while loading '${key}'`,
      dashboardComponent: Unknown,
      settingsComponent: UnknownSettings,
      supportsBackdrop: false,
    };
  }

  return config;
}
