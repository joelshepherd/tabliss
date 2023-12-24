import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useSavedReducer } from "../../../hooks";
import Input from "./Input";
import { addLink, removeLink, reorderLink, updateLink } from "./actions";
import { reducer } from "./reducer";
import { Link, Props, defaultData } from "./types";

const LinksSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const saveLinks = (links: Link[]) => setData({ ...data, links });
  const dispatch = useSavedReducer(reducer, data.links, saveLinks);

  return (
    <div className="LinksSettings">
      <label>
      <FormattedMessage
          id="plugins.links.numberOfColumns"
          defaultMessage="Number of columns"
          description="Number of columns title"
        />
        <input
          type="number"
          value={data.columns}
          onChange={(event) =>
            setData({ ...data, columns: Number(event.target.value) })
          }
          min={1}
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.visible}
          onChange={() => setData({ ...data, visible: !data.visible })}
        />
        <FormattedMessage
          id="plugins.links.areAlwaysVisible"
          defaultMessage="Links are always visible"
          description="Links are always visible title"
        />
        
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.linkOpenStyle}
          onChange={() =>
            setData({ ...data, linkOpenStyle: !data.linkOpenStyle })
          }
        />
        <FormattedMessage
          id="plugins.links.openInANewTab"
          defaultMessage="Links open in a new tab"
          description="Links open in a new tab title"
        />
      </label>

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

      <p style={{ marginTop: "0.5rem" }}>
        <button
          className="button button--primary"
          onClick={() => dispatch(addLink())}
        >
          <FormattedMessage
          id="plugins.links.AddLink"
          defaultMessage="Add link"
          description="Add link title"
        />
          
        </button>
      </p>
    </div>
  );
};

export default LinksSettings;
