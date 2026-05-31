import colour from "./colour";
import customApi from "./customApi";
import giphy from "./giphy";
import gradient from "./gradient";
import image from "./image";
import unsplash from "./unsplash";

export const backgroundConfigs = [colour, customApi, giphy, gradient, image, unsplash];

backgroundConfigs.sort((a, b) => a.name.localeCompare(b.name));
