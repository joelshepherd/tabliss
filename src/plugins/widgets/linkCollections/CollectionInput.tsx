import icons from "feather-icons/dist/icons.json";
import React, { FC, useState } from "react";

import {
  IconButton,
  RemoveIcon,
  DownIcon,
  UpIcon,
  ExpandIcon,
  CollapseIcon,
} from "../../../views/shared";
import { LinkCollection, SubLink } from "./types";
import SubLinkInput from "./SubLinkInput";
import { sanitizeName, VALIDATION } from "./utils";

type Props = LinkCollection & {
  number: number;
  onChange: (values: Partial<LinkCollection>) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
  onAddSublink: () => void;
  onUpdateSublink: (index: number, sublink: SubLink) => void;
  onRemoveSublink: (index: number) => void;
  onReorderSublink: (index: number, to: number) => void;
};

const iconList = Object.keys(icons);

const CollectionInput: FC<Props> = (props) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [sublinksExpanded, setSublinksExpanded] = useState(true);

  return (
    <div className="CollectionInput">
      <h5>
        <div className="title--buttons">
          <IconButton
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
          </IconButton>
          <IconButton onClick={props.onRemove} title="Remove collection">
            <RemoveIcon />
          </IconButton>
          {props.onMoveDown && (
            <IconButton onClick={props.onMoveDown} title="Move collection down">
              <DownIcon />
            </IconButton>
          )}
          {props.onMoveUp && (
            <IconButton onClick={props.onMoveUp} title="Move collection up">
              <UpIcon />
            </IconButton>
          )}
        </div>

        Collection {props.number}
      </h5>

      {isExpanded && (
        <>
          <label>
            URL <span className="text--grey">(optional, for parent link)</span>
            <input
              type="url"
              value={props.url || ""}
              maxLength={VALIDATION.MAX_URL_LENGTH}
              onChange={(event) =>
                props.onChange({ url: event.target.value.trim() })
              }
            />
          </label>

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

          <div style={{ marginTop: "1rem" }}>
            <h6>
              <div className="title--buttons">
                <IconButton
                  onClick={() => setSublinksExpanded(!sublinksExpanded)}
                  title={sublinksExpanded ? "Collapse sublinks" : "Expand sublinks"}
                >
                  {sublinksExpanded ? <CollapseIcon /> : <ExpandIcon />}
                </IconButton>
              </div>
              Sublinks ({props.sublinks.length})
            </h6>

            {sublinksExpanded && (
              <>
                {props.sublinks.map((sublink, index) => (
                  <SubLinkInput
                    {...sublink}
                    key={sublink.id}
                    onChange={(values) =>
                      props.onUpdateSublink(index, { ...sublink, ...values })
                    }
                    onMoveUp={
                      index !== 0
                        ? () => props.onReorderSublink(index, index - 1)
                        : undefined
                    }
                    onMoveDown={
                      index !== props.sublinks.length - 1
                        ? () => props.onReorderSublink(index, index + 1)
                        : undefined
                    }
                    onRemove={() => props.onRemoveSublink(index)}
                  />
                ))}

                <p style={{ marginTop: "0.5rem", marginLeft: "1rem" }}>
                  <button
                    className="button button--secondary"
                    onClick={props.onAddSublink}
                  >
                    Add Sublink
                  </button>
                </p>
              </>
            )}
          </div>
        </>
      )}

      <hr />
    </div>
  );
};

export default CollectionInput;
