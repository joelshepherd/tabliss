import { Config } from "../../types";
import Js from "./Js";
import JsSettings from "./JsSettings";

const config: Config = {
  key: "widget/js",
  name: "Custom JS",
  description: "Program in your program.",
  dashboardComponent: Js,
  settingsComponent: JsSettings,
};

export default config;
