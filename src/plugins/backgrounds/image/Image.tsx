import React, { FC, useEffect, useState } from "react";

import Backdrop from "../../../views/shared/Backdrop";
import { Props, defaultCache } from "./types";
import "./Image.sass";

function pickItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

const Image: FC<Props> = ({ cache = defaultCache }) => {
  if (!cache.length) {
    return <div className="Image default fullscreen" />;
  }

  const [url, setUrl] = useState<string>();
  useEffect(() => {
    setUrl(URL.createObjectURL(pickItem(cache)));

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [cache]);

  return (
    <Backdrop
      className="Image fullscreen"
      ready={Boolean(url)}
      style={{ backgroundImage: url && `url(${url})` }}
    />
  );
};

export default Image;
