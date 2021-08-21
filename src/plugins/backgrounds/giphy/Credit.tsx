import React, { FC } from "react";

const giphyLogo = require("./giphy-logo.png").default;

type Props = {
  link?: string;
};

const Credit: FC<Props> = ({ link }) => (
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
