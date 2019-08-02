import { useEffect, useState } from 'react';

export function useObjectUrl(data?: Blob) {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    setUrl(data ? URL.createObjectURL(data) : undefined);

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
        setUrl(undefined);
      }
    };
  }, [data]);

  return url;
}

export function useObjectUrls(data: Blob[]) {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    setUrls(data.map(URL.createObjectURL));

    return () => {
      urls.map(URL.revokeObjectURL);
      setUrls([]);
    };
  }, [data]);

  return urls;
}
