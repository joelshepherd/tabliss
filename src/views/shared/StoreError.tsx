import React from "react";
import Button from "./Button";
import Modal from "./modal/Modal";

type Props = {
  onClose: () => void;
};

const StoreError: React.FC<Props> = ({ onClose }) => {
  return (
    <Modal>
      <div className="Settings">
        <h2 style={{ margin: 0 }}>Storage Error</h2>

        <p>
          Tabliss is unable to load or save settings. This is most commonly
          caused by private browsing mode, but permissions or disk space can
          also be an issue.
        </p>
        <p>
          If you have settings saved with Tabliss, this might be a temporary
          issue. Try restarting your browser and seeing if your settings return.
        </p>
        <p>
          Contact <a href="mailto:support@tabliss.io">support@tabliss.io</a> if
          you are unable to solve the issue. Extra technical information is
          available in the browser console.
        </p>

        <div className="Modal-footer">
          <Button primary onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default StoreError;
