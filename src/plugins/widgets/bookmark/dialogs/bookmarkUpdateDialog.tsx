import React, { useState, useCallback, useEffect } from "react";
import Modal from "react-modal";
import "./model.sass";
import { GetBookmarkItemsResponse } from "../../../../background/services/bookmarks";


// export interface BookmarkModalEditResponse {
//   name?: string;
//   id?: string;
//   url?: string;
// }

export default function BookmarkUpdateDialog({
  data,
  isOpen,
  onClose,
}: {
  data?: GetBookmarkItemsResponse;
  isOpen: boolean;
  onClose?: (data?: GetBookmarkItemsResponse) => void;
}) {
  const [modalData, setModalData] = useState<GetBookmarkItemsResponse>({
    id: "-1",
    title: "",
    url: "",
  });

  useEffect(() => {
    console.log({ data });
    if (data) setModalData(data);
  }, [data]);

  function onModalClose(success: boolean) {
    if (onClose) {
      success ? onClose(modalData) : onClose();

      return;
    }

    console.log("Modal close listener not added yet");
  }

  function update(data: any) {
    setModalData((p) => {
      return { ...p, ...data };
    });
  }
  return (
    <Modal
      className="modal"
      overlayClassName="modal-overlay"
      isOpen={isOpen}
      onRequestClose={() => onModalClose(false)}
    >
      <div className="modal-title">
        <span>Update Bookmark</span>
      </div>

      <div className="modal-content">
        <div className="form-input">
          <label>Name</label>
          <input
            autoFocus
            value={modalData.title}
            type="text"
            onChange={(e) => update({ title: e.target.value })}
          />
        </div>

        <div className="form-input">
          <label>URL</label>
          <input
            value={modalData.url}
            type="text"
            onChange={(e) => update({ url: e.target.value })}
          />
        </div>
      </div>

      <div className="modal-buttons">
        <button
          onClick={() => {
            onModalClose(false);
          }}
        >
          Cancel
        </button>
        <button
          className="primary"
          onClick={() => {
            onModalClose(true);
          }}
        >
          Update
        </button>
      </div>
    </Modal>
  );
}
