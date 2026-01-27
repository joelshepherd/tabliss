import icons from "feather-icons/dist/icons.json";
import React, { FC } from "react";

import {
  IconButton,
  RemoveIcon,
  DownIcon,
  UpIcon,
} from "../../../views/shared";
import { SubLink } from "./types";
import { sanitizeName, VALIDATION } from "./utils";

type Props = SubLink & {
  onChange: (values: Partial<SubLink>) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
};

const iconList = Object.keys(icons);

const SubLinkInput: FC<Props> = (props) => (
  <div className="SubLinkInput" style={{ marginLeft: "1rem" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
      <div className="title--buttons">
        {props.onMoveUp && (
          <IconButton onClick={props.onMoveUp} title="Move sublink up">
            <UpIcon />
          </IconButton>
        )}
        {props.onMoveDown && (
          <IconButton onClick={props.onMoveDown} title="Move sublink down">
            <DownIcon />
          </IconButton>
        )}
        <IconButton onClick={props.onRemove} title="Remove sublink">
          <RemoveIcon />
        </IconButton>
      </div>
      <span className="text--grey">Sublink</span>
    </div>

    <label>
      Name
      <input
        type="text"
        value={props.name}
        maxLength={VALIDATION.MAX_NAME_LENGTH}
        onChange={(event) =>
          props.onChange({ name: sanitizeName(event.target.value) })
        }
        required
      />
    </label>

    <label>
      URL
      <input
        type="url"
        value={props.url}
        maxLength={VALIDATION.MAX_URL_LENGTH}
        onChange={(event) =>
          props.onChange({ url: event.target.value.trim() })
        }
        required
      />
    </label>

    <label>
      Icon <span className="text--grey">(optional)</span>
      <select
        value={props.icon || ""}
        onChange={(event) => props.onChange({ icon: event.target.value })}
      >
        <option value="">None</option>
        <option value="_favicon">Website Icon</option>
        <optgroup label="Feather Icons">
          {iconList.map((key) => (
            <option key={key}>{key}</option>
          ))}
        </optgroup>
      </select>
    </label>
  </div>
);

export default SubLinkInput;
