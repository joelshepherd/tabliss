import React from "react";
import { FormattedMessage } from "react-intl";
import { Icon } from "../../../views/shared";
import { Image } from "./types";

export const UTM =
  "?utm_source=Start&utm_medium=referral&utm_campaign=api-credit";

interface Props {
  credit: Image["credit"];
  onPrev: (() => void) | null;
  onNext: (() => void) | null;
}

const UnsplashCredit: React.FC<Props> = ({ credit, onPrev, onNext }) => (
  <div className="credit">
    <span style={{ float: "right" }}>{credit.location}</span>{" "}
    {onPrev ? (
      <a onClick={onPrev}>
        <Icon name="arrow-left" />
      </a>
    ) : null}
    {onNext ? (
      <a onClick={onNext}>
        <Icon name="arrow-right" />
      </a>
    ) : null}{" "}
    <a href={credit.imageLink + UTM} rel="noopener noreferrer">
      <FormattedMessage
        id="plugins.unsplash.photoLink"
        description="Photo link text"
        defaultMessage="Photo"
      />
    </a>
    {", "}
    <a href={credit.userLink + UTM} rel="noopener noreferrer">
      {credit.userName}
    </a>
    {", "}
    <a href={"https://unsplash.com/" + UTM} rel="noopener noreferrer">
      Unsplash
    </a>
  </div>
);

export default React.memo(UnsplashCredit);
