import { Data, Image } from "./types";

export const officialCollection = 1053828;

type Config = Pick<
  Data,  
  "by" | "collections" | "featured" | "search" | "topics"
>;

export const fetchImages = async ({
  by,
  collections,
  lastBlockedImage,
  blockedImages,
  topics,
  featured,
  search,
  
}: Data): Promise<Image[]> => {
  const url = "https://api.unsplash.com/photos/random";
  const params = new URLSearchParams();
  const headers = new Headers({
    Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
  });

  // Count could be increased, since we are blocking images. Although we need to think about rate-limit 
  // implications 
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
  
  if(blockedImages != undefined || lastBlockedImage!= undefined){

    var newBody: any = []
    var index  = 0
    for(let item of body){
      if(blockedImages.has(item.id) == false && lastBlockedImage != item.id){
        newBody[index] = item
        index += 1
      }
    }
    body = newBody
  }

  // TODO: validate types
  
  return body.map((item: any) => ({
    src: item.urls.raw,
    credit: {
      imageID: item.id,
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
