import { Bookmarks } from "webextension-polyfill/namespaces/bookmarks";
import { BackgroundService } from "../types";

export interface GetAllBookmarkResponse {
  name: string;
  id: string;
}

export interface GetBookmarkItemsResponse {
  id: string;
  title: string;
  index?: number;
  url?: string;
  children?: GetBookmarkItemsResponse[];
}

export interface BookmarkOrderChanges {
  id: string;
  newIndex: number;
}

async function getAllFolderNames(
  tree?: Bookmarks.BookmarkTreeNode[],
  path: string = "",
): Promise<GetAllBookmarkResponse[]> {
  if (!tree) {
    tree = await browser.bookmarks.getTree();
  }

  let results: GetAllBookmarkResponse[] = [];

  for (const element of tree) {
    if (element.children) {
      const folderPath = path ? `${path}/${element.title}` : element.title;

      results.push({ name: folderPath, id: element.id });

      const childResults = await getAllFolderNames(
        element.children,
        folderPath,
      );
      results = results.concat(childResults);
    }
  }

  return results;
}

async function getBookmarkItems(
  tree: Bookmarks.BookmarkTreeNode[],
): Promise<GetBookmarkItemsResponse[]> {
  let data: GetBookmarkItemsResponse[] = [];

  for (const i of tree) {
    let d: GetBookmarkItemsResponse = {
      id: i.id,
      title: i.title,
      url: i.url,
      index: i.index,
    };

    if (i.children) d.children = await getBookmarkItems(i.children);
    data.push(d);
  }

  return data;
}

async function moveBookmarks(changes: BookmarkOrderChanges[]) {
  for (const change of changes) {
    try {
      await browser.bookmarks.move(change.id, { index: change.newIndex });
      return true;
    } catch (err) {
      console.warn("Failed to move bookmark:", change.id, err);
      return false;
    }
  }
}

async function updateBookmark(item: GetBookmarkItemsResponse) {
  let res = await browser.bookmarks.update(item.id, {
    title: item.title,
    url: item.url,
  });
  let d: GetBookmarkItemsResponse = {
    id: res.id,
    title: res.title,
    url: res.url,
    index: res.index,
  };

  return d;
}

async function removeBookmarks(id: string) {
  await browser.bookmarks.removeTree(id);
  return true;
}

export class BookmarkService implements BackgroundService {
  init(): void {
    // forward bookmark created/removed events to front-end
    browser.bookmarks.onCreated.addListener((id, bookmark) => {
      browser.runtime.sendMessage({
        type: "BOOKMARK_CREATED_DELETED",
        bookmark,
      });
    });
    browser.bookmarks.onRemoved.addListener((id, bookmark) => {
      browser.runtime.sendMessage({
        type: "BOOKMARK_CREATED_DELETED",
        bookmark,
      });
    });
  }

  async onMessage(message: any): Promise<any | undefined> {
    switch (message?.type) {
      case "GET_ALL_BOOKMARKS": {
        let bookmarks = await getAllFolderNames();
        return bookmarks.slice(1, bookmarks.length);
      }
      case "GET_BOOKMARK_ITEMS": {
        let tree = await browser.bookmarks.getSubTree(message.id);
        if (tree.length) return await getBookmarkItems(tree[0].children!!);
        return [];
      }
      case "MOVE_BOOKMARKS": {
        return await moveBookmarks(message.changes);
      }
      case "UPDATE_BOOKMARK_ITEM": {
        let item = message.item as GetBookmarkItemsResponse;
        return await updateBookmark(item);
      }
      case "REMOVE_BOOKMARKS": {
        return await removeBookmarks(message.id);
      }
    }
    return undefined;
  }
}