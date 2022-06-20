import React from "react";
import { usePushError } from "../../../api";
import { getIpInfo } from "./api";
import { defaultData, Props } from "./types";

const IpInfo: React.FC<Props> = ({
  cache,
  data = defaultData,
  setCache,
  loader,
}) => {
  const pushError = usePushError();
  React.useEffect(() => {
    getIpInfo(loader).then(setCache).catch(pushError);
  }, []);

  if (!cache) {
    return null;
  }

  const info = [cache.ip];
  if (data.displayCity) info.push(cache.city);
  if (data.displayCountry) info.push(cache.country);

  return <div className="IpInfo">{info.join(", ")}</div>;
};

export default IpInfo;
