import { Config } from "../../types";
import Joke from "./Joke";
import JokeSettings from "./JokeSettings";

const config: Config = {
  key: "widget/joke",
  name: "Jokes",
  description: "Some amusement or laughter",
  dashboardComponent: Joke,
  settingsComponent: JokeSettings,
};

export default config;
