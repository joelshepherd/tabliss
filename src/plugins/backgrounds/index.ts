import colour from "./colour";
import gradient from "./gradient";
import image from "./image";
import unsplash from "./unsplash";
import apod from "./apod";

export const backgroundConfigs = [colour, gradient, image, unsplash, apod];

backgroundConfigs.sort((a, b) => a.name.localeCompare(b.name));
