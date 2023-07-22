import React from "react";
import giphyLogo from "./giphy-logo.png";

type Props = {
  title?: string;
};

const Credit: React.FC<Props> = ({ title }) => (
  <div className="credit">
    <span>{title}</span>
  </div>
);

export default Credit;
