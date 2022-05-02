import { Config } from "../../types";
import BitcoinWidget from "./Bitcoin";

const config: Config = {
  key: "widget/bitcoin",
  name: "Bitcoin Mempool",
  description: "Get the current block height.",
  dashboardComponent: BitcoinWidget,
};

export default config;
