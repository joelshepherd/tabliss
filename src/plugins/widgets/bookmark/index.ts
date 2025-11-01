import { Config } from "../../types";
import Bookmarks from "./Bookmarks";
import BookmarkSettings from "./BookmarkSettings";

const config: Config = {
  key: "widget/bookmarks",
  name: "Bookmarks",
  description: "Organize your bookmarks easily",
  dashboardComponent: Bookmarks,
  settingsComponent: BookmarkSettings,
};

export default config;

