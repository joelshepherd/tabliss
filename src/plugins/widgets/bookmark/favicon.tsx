import React, { useState } from "react";
import { AlertIcon, GlobeIcon } from "../../../views/shared";
import { getFaviconIcon } from "./utils";

type Props = {
  url?: string;
  title?: string;
  className?: string;
};

export default function FaviconIcon({ url, title = "", className }: Props) {
  const [hasError, setHasError] = useState(false);

  // show GlobeIcon for missing URL or localhost
  if (!url || url.includes("localhost:")) {
    return <GlobeIcon />;
  }

  if (hasError) {
    return <AlertIcon />;
  }

  return (
    // render favicon and fallback to GlobeIcon on error
    <img
      src={getFaviconIcon(url)}
      alt={title}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
