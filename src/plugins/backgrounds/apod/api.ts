import { API } from "../../types";
import { Image, Data } from "./types";
import { format } from "date-fns";

type Config = Data;

const formatDateForApi = (date: string): string => {
  return format(new Date(date), "yyyy-MM-dd");
};

export async function getPicture(
  data: Config,
  loader: API["loader"],
): Promise<Image> {
  const url = "https://api.nasa.gov/planetary/apod";
  const params = new URLSearchParams();

  params.set("api_key", NASA_API_KEY);
  params.set("thumbs", "true");

  if (data.date === "custom" && data.customDate) {
    params.set("date", formatDateForApi(data.customDate));
  }

  loader.push();
  const res = await fetch(`${url}?${params}`);
  const json = await res.json();

  loader.pop();

  return json;
}
