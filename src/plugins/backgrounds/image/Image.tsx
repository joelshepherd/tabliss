import React from "react";
import { useObjectUrl } from "../../../hooks";
import Backdrop from "../../../views/shared/Backdrop";
import "./Image.sass";
import { defaultCache, Props } from "./types";

const Image: React.FC<Props> = ({ cache = defaultCache }) => {
  const index = React.useMemo(
    () => Math.floor(Math.random() * cache.length),
    [cache.length],
  );
  const url = useObjectUrl(cache[index]);

  if (!url) return <div className="Image default fullscreen" />;

  return (
    <Backdrop
      className="Image fullscreen"
      style={{ backgroundImage: url ? `url(${url})` : undefined }}
    />
  );
};

export default Image;
