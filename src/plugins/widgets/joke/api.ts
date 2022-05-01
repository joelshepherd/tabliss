import { API } from "../../types";
import { JokeAPICategory, JokeAPIResponse } from "./types";

const url = "https://v2.jokeapi.dev/joke";

export async function getJoke(
  loader: API["loader"],
  category?: JokeAPICategory,
  includeNSFW?: boolean,
) {
  loader.push();

  const safeModeUrlParameter = includeNSFW ? "" : "safe-mode";

  const res = await fetch(`${url}/${category}?${safeModeUrlParameter}`);
  const body: JokeAPIResponse = await res.json();

  loader.pop();

  return body;
}
