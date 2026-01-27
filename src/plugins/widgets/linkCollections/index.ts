import { Config } from "../../types";
import LinkCollections from "./LinkCollections";
import LinkCollectionsSettings from "./LinkCollectionsSettings";

const config: Config = {
  key: "widget/link-collections",
  name: "Link Collections",
  description: "Organize your links into collections.",
  dashboardComponent: LinkCollections,
  settingsComponent: LinkCollectionsSettings,
};

export default config;
