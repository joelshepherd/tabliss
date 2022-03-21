import React from "react";
import Button from "./Button";
import Modal from "./modal/Modal";

type Props = {
  onClose: () => void;
};

const StoreError: React.FC<Props> = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className="Settings">
        <h2 style={{ margin: 0 }}>Storage Error</h2>

        <p style={{ fontSize: "1.25em" }}>
          Tabliss is unable to load or save settings. This is most commonly
          caused by private browsing mode; but permissions, disk space, or a
          corrupt browser profile can also cause issues.
        </p>
        <p>
          If you have settings saved with Tabliss, this might be a temporary
          issue. Try restarting your browser and checking if your settings return.
        </p>
        <p>
          Contact <a href="mailto:support@tabliss.io">support@tabliss.io</a> if
          you are unable to solve the issue. Extra technical information is
          available in the browser console.
        </p>
      </div>
    </Modal>
  );
};

export default StoreError;
