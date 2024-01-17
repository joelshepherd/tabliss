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

  const ip = data.maskIP ? cache.ip.split('.').map((s, i) => i > 0 && i < 3 ? s.replace(/[\d]+/, '*') : s).join('.') : cache.ip;
  const info = [ip];
  if (data.displayCity) info.push(cache.city);
  if (data.displayCountry) info.push(cache.country);

  return <div className="IpInfo">{info.join(", ")}</div>;
};

export default IpInfo;
