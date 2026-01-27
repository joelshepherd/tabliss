import React, { FC } from "react";

import { useSavedReducer } from "../../../hooks";
import CollectionInput from "./CollectionInput";
import {
  addCollection,
  removeCollection,
  reorderCollection,
  updateCollection,
  addSublink,
  updateSublink,
  removeSublink,
  reorderSublink,
} from "./actions";
import { reducer } from "./reducer";
import { LinkCollection, Props, defaultData } from "./types";

const LinkCollectionsSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const saveCollections = (collections: LinkCollection[]) =>
    setData({ ...data, collections });
  const dispatch = useSavedReducer(reducer, data.collections, saveCollections);

  return (
    <div className="LinkCollectionsSettings">
      <label>
        Number of columns
        <input
          type="number"
          value={data.columns}
          onChange={(event) => {
            const value = Math.max(1, Math.min(12, Number(event.target.value)));
            setData({ ...data, columns: value });
          }}
          min={1}
          max={12}
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.visible}
          onChange={() => setData({ ...data, visible: !data.visible })}
        />
        Collections are always visible
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

      <hr />

      {data.collections.map((collection, index) => (
        <CollectionInput
          {...collection}
          key={collection.id}
          number={index + 1}
          onChange={(values) =>
            dispatch(updateCollection(index, { ...collection, ...values }))
          }
          onMoveUp={
            index !== 0
              ? () => dispatch(reorderCollection(index, index - 1))
              : undefined
          }
          onMoveDown={
            index !== data.collections.length - 1
              ? () => dispatch(reorderCollection(index, index + 1))
              : undefined
          }
          onRemove={() => dispatch(removeCollection(index))}
          onAddSublink={() => dispatch(addSublink(index))}
          onUpdateSublink={(sublinkIndex, sublink) =>
            dispatch(updateSublink(index, sublinkIndex, sublink))
          }
          onRemoveSublink={(sublinkIndex) =>
            dispatch(removeSublink(index, sublinkIndex))
          }
          onReorderSublink={(sublinkIndex, to) =>
            dispatch(reorderSublink(index, sublinkIndex, to))
          }
        />
      ))}

      <p style={{ marginTop: "0.5rem" }}>
        <button
          className="button button--primary"
          onClick={() => dispatch(addCollection())}
        >
          Add Collection
        </button>
      </p>
    </div>
  );
};

export default LinkCollectionsSettings;
