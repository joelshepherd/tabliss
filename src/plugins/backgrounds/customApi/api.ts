import { Data } from "./types";

export function extractByPath(obj: unknown, path: string): string | undefined {
  const parts = path.split(/[\.\[\]]+/).filter(Boolean);
  let curr: unknown = obj;
  for (const part of parts) {
    if (curr === null || typeof curr !== "object") return undefined;
    curr = (curr as Record<string, unknown>)[part];
  }
  return typeof curr === "string" ? curr : undefined;
}

export async function fetchImageUrl(data: Data): Promise<string> {
  const { method, url, body, responseType, jsonPath } = data;

  const options: RequestInit = { method };
  if (method === "POST" && body) {
    options.body = body;
  }

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
  }

  if (responseType === "direct") {
    const text = await res.text();
    const trimmed = text.trim();
    if (!trimmed) throw new Error("Empty response body");
    return trimmed;
  }

  const json: unknown = await res.json();
  const extracted = extractByPath(json, jsonPath);
  if (!extracted) {
    throw new Error(`Could not extract image URL from JSON path: "${jsonPath}"`);
  }
  return extracted;
}
