import { API } from "../../types";
import { Data, Image } from "./types";

export const officialCollection = 1053828;

type Config = Pick<Data, "by" | "collections" | "featured" | "search" | "topics">;

export async function getImage(
  config: Config,
  loader: API["loader"],
): Promise<Image> {
  // Fetch random image
  loader.push();
  const res = await fetchImageMeta(config);
  const data = await fetchImageData(res.urls.raw);
  loader.pop();

  return {
    data,
    image_link: res.links.html,
    location_title: res.location ? res.location.title : null,
    user_name: res.user.name,
    user_link: res.user.links.html,
  };
}

async function fetchImageMeta({ by, collections, topics, featured, search }: Config) {
  const url = "https://api.unsplash.com/photos/random";
  const params = new URLSearchParams();
  const headers = new Headers({
    Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
  });

  switch (by) {
    case "collections":
      params.set("collections", collections);
      break;

    case "topics":
      params.set("topics", topics);
      break;

    case "search":
      params.set("orientation", "landscape");
      if (featured) params.set("featured", "true");
      if (search) params.set("query", search);
      break;

    default:
      params.set("collections", String(officialCollection));
  }

  const res = await fetch(`${url}?${params}`, { headers });
  return res.json();
}

async function fetchImageData(url: string) {
  const quality = 85; // range [0-100]
  const width = calculateWidth(window.innerWidth);

  const params = new URLSearchParams({
    q: String(quality),
    w: String(width),
  });

  return await (await fetch(url + params)).blob();
}

/**
 * Calculate width to fetch image, tuned for Unsplash cache performance.
 */
export function calculateWidth(screenWidth: number = 1920): number {
  // Consider a minimum resolution too
  screenWidth = Math.max(screenWidth, 1920); // Lower limit at 1920
  screenWidth = Math.min(screenWidth, 3840); // Upper limit at 4K
  screenWidth = Math.ceil(screenWidth / 240) * 240; // Snap up to nearest 240px for improved caching
  return screenWidth;
}
