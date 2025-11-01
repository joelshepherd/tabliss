import React, { FC, useEffect, useMemo, useState } from "react";
import { Props, defaultData } from "./types";
import "./bookmark.sass";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  getAllBookmarks,
  getBookmarkItems,
  moveChangedBookmarks,
  removeBookmarks,
  updateBookmarkItem,
} from "./handler";
import { getFaviconIcon } from "./utils";
import { ReactSortable } from "react-sortablejs";
import { EditIcon, GlobeIcon, RemoveIcon } from "../../../views/shared";
import BookmarkUpdateDialog from "./dialogs/bookmarkUpdateDialog";
import FaviconIcon from "./favicon";
import { GetBookmarkItemsResponse } from "../../../background/services/bookmarks";

const Bookmarks: FC<Props> = ({ data = defaultData }) => {
  const [originalOrder, setOriginalOrder] = useState<
    GetBookmarkItemsResponse[]
  >([]);
  const [bookmarkItems, setBookmarkItems] = useState<
    GetBookmarkItemsResponse[]
  >([]);

  const [selectedBookmark, setSelectedBookmark] = useState<
    GetBookmarkItemsResponse | undefined
  >();

  let perPage = data.row * data.col;

  useEffect(() => {
    loadItems();
  }, [data]);

  async function loadItems() {
    let id = data.selectedListId ? data.selectedListId : "0";

    let d = await getBookmarkItems(id);
    setBookmarkItems(d);
    setOriginalOrder(d);
  }

  const bookmarks = useMemo(() => {
    let items: GetBookmarkItemsResponse[][] = [];

    if (!perPage) perPage = 1;

    let slideCount = Math.ceil(bookmarkItems.length / perPage);

    for (let index = 0; index < slideCount; index++) {
      let _items: GetBookmarkItemsResponse[] = [];
      for (
        let index2 = index * perPage;
        index2 < index * perPage + perPage;
        index2++
      ) {
        const element = bookmarkItems[index2];
        if (!element) break;
        _items.push(element);
      }

      items.push(_items);
    }

    return items;
  }, [bookmarkItems]);


  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return '<span class="' + className + '">' + "</span>";
    },
  };

  async function detectOrderChanges(
    oldList: GetBookmarkItemsResponse[],
    newList: GetBookmarkItemsResponse[],
  ) {
    const changes: { id: string; newIndex: number }[] = [];

    newList.forEach((item, index) => {
      if (item.id !== oldList[index]?.id) {
        changes.push({ id: item.id, newIndex: index });
      }
    });

    if (changes.length > 0) {
      let response = await moveChangedBookmarks(changes);
    }
  }

  useEffect(() => {
    detectOrderChanges(originalOrder, bookmarkItems);
  }, [bookmarkItems]);

  function onEditBookmark(item: GetBookmarkItemsResponse) {
    setSelectedBookmark(item);
  }

  async function onEditModalClose(data?: GetBookmarkItemsResponse) {
    setSelectedBookmark(undefined);
    if (data) {
      const res = await updateBookmarkItem(data);

      setBookmarkItems((prev) => {
        const index = prev.findIndex((v) => v.id === res.id);
        if (index === -1) return prev; // nothing to update

        // create a new array copy
        const newItems = [...prev];
        newItems[index] = res;

        // keep originalOrder in sync after update
        setOriginalOrder(newItems);
        return newItems;
      });
    }
  }

  async function onRemoveBookmarks(data: GetBookmarkItemsResponse) {
    const text = `Do you really want to remove ( ${data.title} ) permanently.\nThis action can't be undone!`;
    if (!confirm(text)) return;

    const isRemoved = await removeBookmarks(data.id);
    if (!isRemoved) return;

    setBookmarkItems((prev) => {
      const index = prev.findIndex((v) => v.id === data.id);
      if (index === -1) return prev; // nothing to remove

      const newItems = [...prev];
      newItems.splice(index, 1);

      // keep originalOrder in sync after a remove
      setOriginalOrder(newItems);

      return newItems;
    });
  }

  return (
    <div className="bookmark-container">
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        allowTouchMove={false}
        simulateTouch={false}
      >
        {bookmarks.map((items, i) => (
          <SwiperSlide key={i}>
            <ReactSortable
              ghostClass="blue-background-class"
              className="grid"
              style={{ gridTemplateColumns: `repeat(${data.col}, auto)` }}
              list={items}
              setList={(newList) => {
                setBookmarkItems((prev) => {
                  const updated = [...prev];
                  // replace only the items of the current slide
                  const start = i * perPage;
                  for (let j = 0; j < newList.length; j++) {
                    updated[start + j] = newList[j];
                  }
                  return updated;
                });
              }}
              group={"group-" + i}
              animation={150}
              easing="cubic-bezier(1, 0, 0, 1)"
            >
              {items.map((item, i2) => (
                <div className="grid-item" key={i2}>
                  <div
                    className="icon left"
                    onClick={() => onRemoveBookmarks(item)}
                  >
                    <RemoveIcon />
                  </div>
                  <div
                    className="icon right"
                    onClick={() => onEditBookmark(item)}
                  >
                    <EditIcon />
                  </div>

                  {item.url ? (
                    <a href={item.url}>
                      <div className="icon-box">
                        <FaviconIcon url={item.url} />
                      </div>
                    </a>
                  ) : (
                    <div className="icon-box">
                      {item.children && (
                        <div className="folder">
                          {item.children.slice(0, 9).map((item2, i3) => (
                            <FaviconIcon key={i3} url={item2.url} />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <span>
                    <strong>
                      {item.children &&
                        item.children.length > 9 &&
                        `+${item.children.length - 9}`}
                    </strong>{" "}
                    {item.title}
                  </span>
                </div>
              ))}
            </ReactSortable>
          </SwiperSlide>
        ))}
      </Swiper>

      <BookmarkUpdateDialog
        data={selectedBookmark}
        isOpen={selectedBookmark != undefined}
        onClose={onEditModalClose}
      />
    </div>
  );
};

export default Bookmarks;
