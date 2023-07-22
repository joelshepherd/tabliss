import React from "react";

import Backdrop from "../../../views/shared/Backdrop";

import { defaultData, Props } from "./types";
import { getPicture } from "./api";
import ApodTitle from "./ApodTitle";
import "./Apod.sass";

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
    <div className="Apod fullscreen">
      <Backdrop
        className="picture fullscreen"
        ready={
          !!(picture?.media_type === "image"
            ? picture?.hdurl || picture?.url
            : picture?.thumbnail_url)
        }
        style={{
          backgroundImage: `url(${
            picture?.media_type === "image"
              ? picture?.hdurl || picture?.url
              : picture?.thumbnail_url
          })`,
        }}
      />

      {picture && data.showTitle && (
        <ApodTitle title={picture.title} copyright={picture.copyright} />
      )}
    </div>
  );
};

export default Unsplash;
