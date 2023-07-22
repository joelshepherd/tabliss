import React from "react";

import Backdrop from "../../../views/shared/Backdrop";

import { defaultData, Props } from "./types";
import { getPicture } from "./api";
import ApodTitle from "./ApodTitle";

const Unsplash: React.FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
}) => {
  const [picture, setPicture] = React.useState(cache);
  const mounted = React.useRef(false);
  React.useEffect(() => {
    getPicture(data, loader).then(setCache);
    if (mounted.current || !picture) getPicture(data, loader).then(setPicture);
    mounted.current = true;
  }, [data.customDate, data.date]);

  return (
    <div className="Unsplash fullscreen">
      <Backdrop
        className="image fullscreen"
        ready={true}
        style={{
          backgroundImage: `url(${
            picture?.media_type === "image"
              ? picture?.hdurl
              : picture?.thumbnail_url
          })`,
        }}
      />

      {picture && data.showTitle && <ApodTitle title={picture.title} />}
    </div>
  );
};

export default Unsplash;
