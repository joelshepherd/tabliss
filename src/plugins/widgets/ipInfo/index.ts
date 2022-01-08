import { Config } from "../../types";
import IpInfo from "./IpInfo";
import IpInfoSettings from "./IpInfoSettings";

const config: Config = {
  key: "widget/ipInfo",
  name: "IP Info",
  description: "Displays data on your IP and location",
  dashboardComponent: IpInfo,
  settingsComponent: IpInfoSettings,
};

export default config;
