import { Quote } from "./types";

const apiEndpoint =
  "https://raw.githubusercontent.com/lbngoc/literature-clock/master/docs/times";

// Get current time code
export function getTimeCode(time: Date) {
  const hour = time.getHours().toString().padStart(2, "0");
  const minute = time.getMinutes().toString().padStart(2, "0");

  return `${hour}:${minute}`;
}

// Get quote by time code
export async function getQuoteByTimeCode(timeCode: string): Promise<Quote> {
  const res = await fetch(`${apiEndpoint}/${timeCode}.json`, { mode: "cors" });
  const body: any[] = await res.json();

  if (res.status === 429) {
    return {
      title: "Too many requests at this time",
    };
  }

  return body[Math.floor(Math.random() * body.length)];
}
