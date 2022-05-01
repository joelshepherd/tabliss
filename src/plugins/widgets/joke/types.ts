import { API } from "../../types";
import categories from "./categories";

type JokeAPIType = "single" | "twopart";

type BaseJokeAPIResponse = {
  error: boolean;
  category: JokeAPICategory;
  type: JokeAPIType;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
};

export interface SingleJokeAPIResponse extends BaseJokeAPIResponse {
  joke: string;
}

export interface TwoPartJokeAPIResponse extends BaseJokeAPIResponse {
  setup: string;
  delivery: string;
}

export type JokeAPIResponse =
  | SingleJokeAPIResponse
  | TwoPartJokeAPIResponse
  | JokeApiErrorResponse;

export type JokeApiErrorResponse = {
  error: boolean;
  internalError: boolean;
  code: number;
  message: string;
  causedBy: string[];
  additionalInfo: string;
  timestamp: number;
};

export function isSingleJoke(
  joke: JokeAPIResponse,
): joke is SingleJokeAPIResponse {
  return !joke.error && (joke as SingleJokeAPIResponse).type === "single";
}

export function isTwoPartJoke(
  joke: JokeAPIResponse,
): joke is TwoPartJokeAPIResponse {
  return !joke.error && (joke as TwoPartJokeAPIResponse).type === "twopart";
}

export function isJokeError(
  joke: JokeAPIResponse,
): joke is JokeApiErrorResponse {
  return joke.error;
}

export type JokeAPICategory = typeof categories[number]["key"];
export type Data = {
  category: JokeAPICategory;
  includeNSFW?: boolean;
};

export type Cache = JokeAPIResponse;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  category: "any",
  includeNSFW: false,
};
