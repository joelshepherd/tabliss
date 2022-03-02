import React from "react";
import giphyLogo from "./giphy-logo.png";

type Props = {
  link?: string;
};

const Credit: React.FC<Props> = ({ link }) => (
  <div className="credit">
    <a
      href={link || "https://giphy.com/"}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={giphyLogo} />
    </a>
  </div>
);

export default Credit;
