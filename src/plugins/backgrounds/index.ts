import colour from "./colour";
import gradient from "./gradient";
import image from "./image";
import unsplash from "./unsplash";

export const backgroundConfigs = [colour, gradient, image, unsplash];

backgroundConfigs.sort((a, b) => a.name.localeCompare(b.name));
