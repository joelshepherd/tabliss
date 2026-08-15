import { Data, Image } from "./types";

type Config = Pick<Data, "by" | "search">;

export const fetchImages = async ({ by, search }: Config): Promise<Image[]> => {
  const headers = new Headers({
    Authorization: PEXELS_API_KEY,
  });

  let url: string;
  const params = new URLSearchParams();
  params.set("per_page", "15");

  if (by === "search" && search) {
    url = "https://api.pexels.com/v1/search";
    params.set("query", search);
  } else {
    url = "https://api.pexels.com/v1/curated";
  }

  const res = await fetch(`${url}?${params}`, { headers, cache: "no-cache" });
  const body = await res.json();

  // TODO: validate types  

  return body.photos.map((photo: any) => ({
    src: photo.src.original,
    credit: {
      photographerName: photo.photographer,
      photographerLink: photo.photographer_url,
      pexelsLink: photo.url,
    },
  }));
};

/**  
 * Pexels supports resizing via query params on the original image URL.  
 */
export const buildLink = (src: string): string => {
  const url = new URL(src);
  url.searchParams.set("auto", "compress");
  url.searchParams.set("cs", "tinysrgb");
  url.searchParams.set("w", String(window.innerWidth * window.devicePixelRatio));
  return String(url);
};