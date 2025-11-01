export function getBaseUrl(inputUrl: string) {
  try {
    const url = new URL(inputUrl);
    return `${url.protocol}//${url.host}`;
  } catch (err) {
    return null;
  }
}

export function getHost(inputUrl: string) {
  try {
    const url = new URL(inputUrl);
    return `${url.host}`;
  } catch (err) {
    return null;
  }
}

export function getFaviconIcon(rawUrl: string) {
  // let url = getBaseUrl(rawUrl);

  // // TODO: fix this
  // return url ? `https://www.google.com/s2/favicons?domain=${url}&sz=64` : "";
  const url = getBaseUrl(rawUrl);
  
  return url ? `https://www.google.com/s2/favicons?sz=128&domain_url=${url}` : "";
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
