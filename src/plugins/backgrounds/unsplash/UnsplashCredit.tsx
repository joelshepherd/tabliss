import React from "react";
import { FormattedMessage } from "react-intl";
import { Image } from "./types";

export const UNSPLASH_UTM =
  "?utm_source=Start&utm_medium=referral&utm_campaign=api-credit";

interface Props {
  image: Image;
}

const UnsplashCredit: React.FC<Props> = ({ image }) => (
  <div className="credit">
    <span style={{ float: "right" }}>{image.location_title}</span>

    <a href={image.image_link + UNSPLASH_UTM} rel="noopener noreferrer">
      <FormattedMessage
        id="plugins.unsplash.photoLink"
        description="Photo link text"
        defaultMessage="Photo"
      />
    </a>
    {" / "}
    <a href={image.user_link + UNSPLASH_UTM} rel="noopener noreferrer">
      {image.user_name}
    </a>
    {" / "}
    <a href={"https://unsplash.com/" + UNSPLASH_UTM} rel="noopener noreferrer">
      Unsplash
    </a>
  </div>
);

export default React.memo(UnsplashCredit);
