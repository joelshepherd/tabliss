import { JokeAPICategory, JokeAPIResponse } from "./types";

const url = "https://v2.jokeapi.dev/joke";

export async function getJoke(
  categories: Set<JokeAPICategory>,
  locale: string,
) {
  const languageUrlParameter = `lang=${locale}`;
  const safeModeUrlParameter = "safe-mode";
  const categoriesUrlParameter = Array.from(categories).join(",");

  const res = await fetch(
    // Note: We will always ask jokeapi to return safe jokes for everyone.
    // This is to comply with content policies (i.e. Hate speech) for all platforms.
    `${url}/${categoriesUrlParameter}?${safeModeUrlParameter}&${languageUrlParameter}`,
  );
  const body: JokeAPIResponse = await res.json();

  return {
    ...body,
    timestamp: Date.now(),
  };
}
