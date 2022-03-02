import React, { FC } from "react";

import { useCachedEffect } from "../../../hooks";

import { Props, defaultData } from "./types";
import { getIpInfo } from "./api";
import { MINUTES } from "../../../utils"

const IpInfo: FC<Props> = ({ cache, data = defaultData, setCache, loader }) => {
  const refreshInterval = data.refreshInterval * MINUTES;

  useCachedEffect(
    () => {
      getIpInfo(loader).then(setCache);
    },
    cache ? cache.timestamp + refreshInterval : 0,
    [],
  );

  if (!cache) {
    return null;
  }

  return (
    <div className="IpInfo">
      {cache.ip ? cache.ip : data.ip}

      {data.displayCity && (cache.city ? ", " + cache.city : data.city)}

      {data.displayCountry &&
        (cache.country ? ", " + cache.country : data.country)}
    </div>
  );
};

export default IpInfo;
