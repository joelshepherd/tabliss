import { Config } from "../../types";
import { Colour, createReloader } from "./Colour";
import ColourSettings from "./ColourSettings";

const config: Config = {
  key: "background/colour",
  name: "Solid Colour",
  description: "Add a splash of colour.",
  dashboardComponent: Colour,
  reloader: createReloader,
  settingsComponent: ColourSettings,
};

export default config;
