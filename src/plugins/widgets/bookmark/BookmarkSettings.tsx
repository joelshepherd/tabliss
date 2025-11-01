import React, { FC, useEffect, useState } from "react";

import { Props, defaultData } from "./types";
import { getAllBookmarks, getBookmarkItems } from "./handler";
import { GetAllBookmarkResponse } from "../../../background/services/bookmarks";


const BookmarkSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const [bookmarks, setBookmarks] = useState<GetAllBookmarkResponse[]>([]);
  function onBookmarkChange(id: string) {
    setData({ ...data, selectedListId: id });
  }

  useEffect(() => {
    loadBookmarks();
  }, []);

  async function loadBookmarks() {
    const res = await getAllBookmarks();
    setBookmarks(res);
  }

  function onColsChange(event: React.ChangeEvent<HTMLInputElement>) {
    let cols = parseInt(event.target.value);
    if (cols < 2) cols = 2;
    if (cols > 7) cols = 7;
    setData({ ...data, col: cols });
  }

  function onRowsChange(event: React.ChangeEvent<HTMLInputElement>) {
    let rows = parseInt(event.target.value);
    if (rows < 2) rows = 2;
    if (rows > 6) rows = 6;
    setData({ ...data, row: rows });
  }

  return (
    <div className="BookmarkSettings">
      <select
        value={data.selectedListId}
        onChange={(event) => onBookmarkChange(event.target.value)}
      >
        <option value="">All</option>
        {bookmarks.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <label>
        Rows
        <input type="number" value={data.row} onChange={onRowsChange} />
      </label>

      <label>
        Cols
        <input type="number" value={data.col} onChange={onColsChange} />
      </label>
    </div>
  );
};

export default BookmarkSettings;
