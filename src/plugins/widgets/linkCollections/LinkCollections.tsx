import React, { FC } from "react";

import { useKeyPress, useToggle } from "../../../hooks";
import { Icon } from "../../../views/shared";
import CollectionDisplay from "./CollectionDisplay";
import { Props, defaultData } from "./types";
import { isValidUrl } from "./utils";
import "./LinkCollections.sass";

const LinkCollections: FC<Props> = ({ data = defaultData }) => {
  const [visible, toggleVisible] = useToggle();

  useKeyPress(
    ({ key }) => {
      const index = Number(key) - 1;
      const collection = data.collections[index];
      if (collection && collection.url && isValidUrl(collection.url)) {
        data.linkOpenStyle
          ? window.open(collection.url, "_blank", "noopener,noreferrer")
          : window.location.assign(collection.url);
      }
    },
    ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  );

  return (
    <div
      className="LinkCollections"
      style={{
        gridTemplateColumns:
          data.visible || visible ? "1fr ".repeat(data.columns) : "1fr",
        textAlign: data.columns > 1 ? "left" : "inherit",
      }}
    >
      {data.visible || visible ? (
        data.collections.map((collection, index) => (
          <CollectionDisplay
            key={collection.id}
            number={index + 1}
            linkOpenStyle={data.linkOpenStyle}
            {...collection}
          />
        ))
      ) : (
        <a onClick={toggleVisible} title="Show link collections">
          <Icon name="link-2" />
        </a>
      )}
    </div>
  );
};

export default LinkCollections;
