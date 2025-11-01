import {
  GetAllBookmarkResponse,
  GetBookmarkItemsResponse,
  BookmarkOrderChanges,
} from "../../../background/services/bookmarks";
import { delay } from "./utils";

const bookmarkItemTestData = [
  {
    id: "5",
    title:
      "Make GNOME Desktop Look Like MacOS (NEW) || GNOME Customization 2025 - YouTube",
    url: "https://www.youtube.com/watch?v=rPAqwBzHcw4",
    index: 0,
  },
  {
    id: "30",
    title: "C++ Tutorial",
    url: "https://www.w3schools.com/cpp/default.asp",
    index: 13,
  },

  {
    id: "33",
    title: "C# Tutorial (C Sharp)",
    url: "https://hjsadhfjksahd.com",
    index: 16,
  },
];

async function sendMessageToBackground<T = any>(
  message: any,
  fallbackData: any,
): Promise<T> {
  // The API already returns a promise. You don't need to wrap it.

  if (BUILD_TARGET !== "web") return browser.runtime.sendMessage(message);

  return fallbackData;
}
export async function getAllBookmarks() {
  return await sendMessageToBackground<GetAllBookmarkResponse[]>(
    {
      type: "GET_ALL_BOOKMARKS",
    },
    [],
  );
}

export async function getBookmarkItems(id: string) {
  return await sendMessageToBackground<GetBookmarkItemsResponse[]>(
    {
      type: "GET_BOOKMARK_ITEMS",
      id,
    },
    bookmarkItemTestData,
  );
}

export async function moveChangedBookmarks(changes: BookmarkOrderChanges[]) {
  return await sendMessageToBackground<Boolean>(
    {
      type: "MOVE_BOOKMARKS",
      changes,
    },
    false,
  );
}

export async function updateBookmarkItem(item: GetBookmarkItemsResponse) {
  return await sendMessageToBackground<GetBookmarkItemsResponse>(
    {
      type: "UPDATE_BOOKMARK_ITEM",
      item,
    },
    item,
  );
}

// REMOVE_BOOKMARKS

export async function removeBookmarks(id: string) {
  return await sendMessageToBackground<boolean>(
    {
      type: "REMOVE_BOOKMARKS",
      id,
    },
    true,
  );
}
