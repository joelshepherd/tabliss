import { Config } from "../../types";
import Bookmarks from "./Bookmarks";
import BookmarksSettings from "./BookmarksSettings";

const config: Config = {
  key: "widget/bookmarks",
  name: "Bookmarks",
  description: "Show your bookmarks",
  dashboardComponent: Bookmarks,
  settingsComponent: BookmarksSettings,
};

export default config;
