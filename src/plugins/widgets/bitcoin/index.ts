import { Config } from "../../types";
import BitcoinWidget from "./Bitcoin";
import BitcoinSettings from "./BitcoinSettings";

const config: Config = {
  key: "widget/bitcoin",
  name: "Bitcoin Mempool",
  description: "Get the current block height.",
  dashboardComponent: BitcoinWidget,
  settingsComponent: BitcoinSettings,
};

export default config;
