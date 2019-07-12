import { useEffect, useState } from 'react';

export function useObjectUrl(data?: Blob) {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    setUrl(data ? URL.createObjectURL(data) : undefined);

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [data]);

  return url;
}
