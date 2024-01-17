import colour from "./colour";
import giphy from "./giphy";
import gradient from "./gradient";
import image from "./image";
import online from "./online";
import unsplash from "./unsplash";

export const backgroundConfigs = [colour, giphy, gradient, image, online, unsplash];

backgroundConfigs.sort((a, b) => a.name.localeCompare(b.name));
