import { Data, Image } from "./types";
import { fetchBlockedImages } from "../../../db/action";

export const officialCollection = 1053828;

type Config = Pick<
  Data,
  "by" | "collections" | "featured" | "search" | "topics"
>;

export const fetchImages = async ({
  by,
  collections,
  topics,
  featured,
  search,
}: Config): Promise<Image[]> => {
  const url = "https://api.unsplash.com/photos/random";
  const params = new URLSearchParams();
  const headers = new Headers({
    Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
  });

  params.set("count", "10");

  switch (by) {
    case "collections":
      params.set("collections", collections);
      break;

    case "topics":
      params.set("topics", topics);
      params.set("orientation", "landscape");
      break;

    case "search":
      params.set("orientation", "landscape");
      if (featured) params.set("featured", "true");
      if (search) params.set("query", search);
      break;

    default:
      params.set("collections", String(officialCollection));
  }

  const res = await fetch(`${url}?${params}`, { headers, cache: "no-cache" });
  var body = await res.json();

  // Fetch blocked image hash-set from DB
  const blockedImages = fetchBlockedImages();
  
  var newBody: any = []
  var index  = 0

  for (let item of body){
    // Only use images which are not blocked
    if(!blockedImages.has(item.links.html)){
      newBody[index] = item
      index +=1   
     }
  }

  // Replace old body 
  body = newBody

  // TODO: validate types
  
  return body.map((item: any) => ({
    src: item.urls.raw,
    credit: {
      imageLink: item.links.html,
      location: item.location ? item.location.title : null,
      userName: item.user.name,
      userLink: item.user.links.html,
    },
  }));
};

/**
 * Build image link from raw
 * TODO: allow quality to be adjustable, possibly in combination with size
 */
export const buildLink = (src: string): string => {
  const url = new URL(src);
  url.searchParams.set("q", "85");
  url.searchParams.set(
    "w",
    String(calculateWidth(window.innerWidth, window.devicePixelRatio)),
  );
  return String(url);
};

/**
 * Calculate width to fetch image, tuned for Unsplash cache performance.
 */
export function calculateWidth(screenWidth = 1920, pixelRatio = 1): number {
  // Consider a minimum resolution too
  screenWidth = screenWidth * pixelRatio; // Find true resolution
  screenWidth = Math.max(screenWidth, 1920); // Lower limit at 1920
  screenWidth = Math.min(screenWidth, 3840); // Upper limit at 4K
  screenWidth = Math.ceil(screenWidth / 240) * 240; // Snap up to nearest 240px for improved caching
  return screenWidth;
}
