import { Config } from "../../types";
import { Notes } from "./Notes";

const config: Config = {
  key: "widget/notes",
  name: "Notes",
  description: "Jot something down.",
  dashboardComponent: Notes,
};

export default config;
