import { Config } from "../../types";
import Html from "./Html";
import HtmlSettings from "./HtmlSettings";

const config: Config = {
  key: "widget/html",
  name: "Custom HTML",
  description: "Add static HTML (advanced users).",
  dashboardComponent: Html,
  settingsComponent: HtmlSettings,
};

export default config;
