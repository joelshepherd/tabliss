import React, { FC } from "react";

import { useSavedReducer } from "../../../hooks";
import Input from "./Input";
import { addLink, removeLink, reorderLink, updateLink } from "./actions";
import { reducer } from "./reducer";
import { Link, Props, defaultData } from "./types";

const LinksSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const saveLinks = (links: Link[]) => setData({ ...data, links });
  const dispatch = useSavedReducer(reducer, data.links, saveLinks);

  return (
    <div className="LinksSettings grid-container">
      <div className="grid-container cell-1 cell-bg">
        <label className="cell-3 ">
          Number of columns
          <input
            type="number"
            value={data.columns}
            onChange={(event) =>
              setData({ ...data, columns: Number(event.target.value) })
            }
            min={1}
          />
        </label>
        <div className="cell-4">
          <label>
            <input
              type="checkbox"
              checked={data.visible}
              onChange={() => setData({ ...data, visible: !data.visible })}
            />
            Links are always visible
          </label>

          <label>
            <input
              type="checkbox"
              checked={data.linkOpenStyle}
              onChange={() =>
                setData({ ...data, linkOpenStyle: !data.linkOpenStyle })
              }
            />
            Links open in a new tab
          </label>
        </div>
      </div>
      <hr />

      {data.links.map((link, index) => (
        <Input
          {...link}
          key={index}
          number={index + 1}
          onChange={(values) =>
            dispatch(updateLink(index, { ...link, ...values }))
          }
          onMoveUp={
            index !== 0
              ? () => dispatch(reorderLink(index, index - 1))
              : undefined
          }
          onMoveDown={
            index !== data.links.length - 1
              ? () => dispatch(reorderLink(index, index + 1))
              : undefined
          }
          onRemove={() => dispatch(removeLink(index))}
        />
      ))}

      <p className="cell-1" style={{ marginTop: "0.5rem" }}>
        <button
          className="button button--primary"
          onClick={() => dispatch(addLink())}
        >
          Add link
        </button>
      </p>
    </div>
  );
};

export default LinksSettings;
