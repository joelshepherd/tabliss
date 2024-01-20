import { Config } from "../../types";
import CustomText from "./CustomText";
import CustomTextSettings from "./CustomTextSettings";

const config: Config = {
  key: "widget/customText",
  name: "Custom Text",
  description: "Custom text from set",
  dashboardComponent: CustomText,
  settingsComponent: CustomTextSettings,
};

export default config;
