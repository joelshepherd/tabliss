import React from "react";
import { FormattedMessage } from "react-intl";
import { Icon } from "../../../views/shared";
import { Image } from "./types";

interface Props {
  credit: Image["credit"];
  paused: boolean;
  onPause: () => void;
  onPrev: (() => void) | null;
  onNext: (() => void) | null;
}

const PexelsCredit: React.FC<Props> = ({
  credit,
  paused,
  onPause,
  onPrev,
  onNext,
}) => (
  <div className="credit">
    <div className="photo">
      <a href={credit.photographerLink} rel="noopener noreferrer">
        {credit.photographerName}
      </a>
      {", "}
      <a href={credit.pexelsLink} rel="noopener noreferrer">
        <FormattedMessage
          id="plugins.pexels.pexelsLink"
          description="Pexels link text"
          defaultMessage="Pexels"
        />
      </a>
    </div>

    <div className="controls">
      <a className={onPrev ? "" : "hidden"} onClick={onPrev ?? undefined}>
        <Icon name="arrow-left" />
      </a>{" "}
      <a onClick={onPause}>
        <Icon name={paused ? "play" : "pause"} />
      </a>{" "}
      <a className={onNext ? "" : "hidden"} onClick={onNext ?? undefined}>
        <Icon name="arrow-right" />
      </a>
    </div>
  </div>
);

export default React.memo(PexelsCredit);
