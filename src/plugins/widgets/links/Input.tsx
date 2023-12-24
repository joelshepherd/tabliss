import icons from "feather-icons/dist/icons.json";
import { FormattedMessage } from "react-intl";
import React, { FC } from "react";

import {
  IconButton,
  RemoveIcon,
  DownIcon,
  UpIcon,
} from "../../../views/shared";
import { Link } from "./types";

type Props = Link & {
  number: number;
  onChange: (values: Partial<Link>) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
};

const iconList = Object.keys(icons);

const Input: FC<Props> = (props) => (

  <div className="LinkInput">
    <h5>
      <div className="title--buttons">
        <IconButton onClick={props.onRemove} title="Remove link">
          <RemoveIcon />
        </IconButton>
        {props.onMoveDown && (
          <IconButton onClick={props.onMoveDown} title="Move link down">
            <DownIcon />
          </IconButton>
        )}
        {props.onMoveUp && (
          <IconButton onClick={props.onMoveUp} title="Move link up">
            <UpIcon />
          </IconButton>
        )}
      </div>

      {props.number <= 9 ? `Keyboard shortcut ${props.number}` : "Shortcut"}
    </h5>

    <label>
      <FormattedMessage
          id="plugins.links.URL"
          defaultMessage="URL"
          description="URL title"
        />
      <input
        type="url"
        value={props.url}
        onChange={(event) => props.onChange({ url: event.target.value })}
      />
    </label>

    <label><FormattedMessage
          id="plugins.links.name"
          defaultMessage="Name"
          description="Name title"
        /> <span className="text--grey"> 
        (<FormattedMessage
          id="plugins.optional"
          defaultMessage="optional"
          description="Optional title"
        />)</span>
      <input
        type="text"
        value={props.name}
        onChange={(event) => props.onChange({ name: event.target.value })}
      />
    </label>

    <label><FormattedMessage
          id="plugins.links.icon"
          defaultMessage="Icon"
          description="Icon title"
        /> <span className="text--grey"> 
        (<FormattedMessage
          id="plugins.optional"
          defaultMessage="optional"
          description="Optional title"
        />)</span>
      <select
        value={props.icon}
        onChange={(event) => props.onChange({ icon: event.target.value })}
      >
        <option value={""}><FormattedMessage
          id="plugins.links.none"
          defaultMessage="None"
          description="None title"
        /></option>
        <option value="_favicon"><FormattedMessage
          id="plugins.links.websiteIcon"
          defaultMessage="Website Icon"
          description="Website Icon title"
        /></option>
        <optgroup label="Feather Icons">
          {iconList.map((key) => (
            <option key={key}>{key}</option>
          ))}
        </optgroup>
      </select>
    </label>

    <hr />
  </div>
);

export default Input;
