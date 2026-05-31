import React from "react";
import Backdrop from "../../../views/shared/Backdrop";
import { fetchImageUrl } from "./api";
import { defaultData, Props } from "./types";
import "./CustomApi.sass";

const CustomApi: React.FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
}) => {
  const [error, setError] = React.useState<string | null>(null);
  const boot = React.useRef(true);

  React.useEffect(() => {
    if (!data.url) return;
    if (data.responseType === "image") return;

    let shouldFetch: boolean;
    if (!cache) {
      shouldFetch = true;
    } else if (data.paused) {
      shouldFetch = false;
    } else if (data.timeout === 0) {
      shouldFetch = boot.current;
    } else {
      shouldFetch = Date.now() > cache.fetchedAt + data.timeout * 1000;
    }

    boot.current = false;

    if (!shouldFetch) return;

    setError(null);
    loader.push();
    fetchImageUrl(data)
      .then((url) => setCache({ url, fetchedAt: Date.now() }))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Fetch failed");
      })
      .finally(loader.pop);
  }, [
    cache,
    data.url,
    data.method,
    data.body,
    data.responseType,
    data.jsonPath,
    data.timeout,
    data.paused,
  ]);

  const imageUrl =
    data.responseType === "image" ? data.url || null : cache?.url ?? null;

  return (
    <div className="CustomApi fullscreen">
      <Backdrop
        className="CustomApi__image fullscreen"
        ready={imageUrl !== null}
        style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }}
      />
      {error && !imageUrl && (
        <div className="CustomApi__error">
          <p>Custom API error</p>
          <p className="CustomApi__error-message">{error}</p>
        </div>
      )}
    </div>
  );
};

export default CustomApi;
