import { API } from "../../types";
import { JokeAPICategory, JokeAPIResponse } from "./types";

const url = "https://v2.jokeapi.dev/joke";

export async function getJoke(
  categories: Set<JokeAPICategory>,
  includeNSFW?: boolean,
) {
  const safeModeUrlParameter = includeNSFW ? "" : "safe-mode";
  const categoriesUrlParameter = Array.from(categories).join(",");

  const res = await fetch(
    `${url}/${categoriesUrlParameter}?${safeModeUrlParameter}`,
  );
  const body: JokeAPIResponse = await res.json();

  return {
    ...body,
    timestamp: Date.now(),
  };
}
