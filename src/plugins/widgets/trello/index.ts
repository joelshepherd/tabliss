import { Config } from "../../types";
import  Trello  from "./Trello";
import TrelloSettings from "./TrelloSettings";

const config: Config = {
    key: "widget/trello",
    name: "Trello",
    description: "Display your Trello board.",
    dashboardComponent: Trello,
    settingsComponent: TrelloSettings
};

export default config;