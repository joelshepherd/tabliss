import React, { FC, useEffect, useState } from "react";

import { defaultData, Props } from "./types";
import { Bookmarks } from "webextension-polyfill";
import BookmarkTreeNode = Bookmarks.BookmarkTreeNode;

const BookmarksSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const [tree, setTree] = useState<BookmarkTreeNode>();
  useEffect(() => {
    browser.bookmarks.getTree().then((t) => setTree(t[0]));
  }, [0]);

  const items: React.JSX.Element[] = [];

  const descendTree = (tree: BookmarkTreeNode | undefined, pad: string) => {
    if (!tree || tree.url) {
      return;
    }

    items.push(
      <option
        value={tree.id}
        selected={tree.id === data.rootBookmark}
        dangerouslySetInnerHTML={{
          __html: pad + (tree.title || tree.id),
        }} />);

    if (tree.children) {
      for (const item of tree.children) {
        descendTree(item, pad + "&nbsp;&nbsp;&nbsp;");
      }
    }
  };

  descendTree(tree, "");

  return <div className="BookmarksSettings">
    <label>
      Root bookmark folder
      <select
        onChange={(evt) =>
          setData({ ...data, rootBookmark: evt.target.value })}>
        {items}
      </select>
    </label>
    <label>
      Maximum width (em)
      <input
        type="number"
        value={data.maxWidth}
        onChange={(event) =>
          setData({ ...data, maxWidth: Number(event.target.value) })
        }
        min={1}
      />
    </label>
    <label>
      <input
        type="checkbox"
        checked={data.wrap}
        onChange={(event) =>
          setData({ ...data, wrap: !data.wrap })
        }
        min={1}
      />
      Wrap long names
    </label>
  </div>;
};

export default BookmarksSettings;
