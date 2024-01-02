import React from "react";
import Backdrop from "../../../views/shared/Backdrop";
import "./Online.sass";
import { defaultData, Props } from "./types";

const Online: React.FC<Props> = ({ data = defaultData }) => {
  const url = data.url;

  if (!url) return <div className="Online default fullscreen" />;

  return (
    <Backdrop
      className="Online fullscreen"
      style={{ backgroundImage: url ? `url(${url})` : undefined }}
    />
  );
};

export default Online;
