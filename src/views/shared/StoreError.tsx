import React from "react";
import Modal from "./modal/Modal";

type Props = {
  onClose: () => void;
};

const StoreError: React.FC<Props> = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className="Settings">
        <h1 style={{ margin: 0, textAlign: "center", fontSize: "5em" }}>⚠️</h1>
        <h2 style={{ margin: 0, textAlign: "center" }}>Storage Error</h2>
        <p style={{ fontSize: "1.25em" }}>
          Something went wrong, and Tab Nine was unable to load or save your
          settings.
        </p>
        <p>
          This could be caused by updating the settings too quickly in a short
          amount of time, most likely through a color picker. Browsers only
          allow a certain amount of internal database updates in a 60 second
          time period. This is a limit imposed by your browser, and Tab Nine
          can't do anything about it.
        </p>
        <p>
          Additionally, this could also be caused by running in private browsing
          mode; low disk space or a corrupt browser profile can also be the
          problem.
        </p>
        <p>
          If you have settings saved with Tab Nine, it might be a temporary
          issue. Try restarting your browser and checking if your settings
          return.
        </p>
        <p>
          If you are concerned about losing your settings, you may be able to
          back-up your profile by exporting it in the system settings.
        </p>
        <p>
          If you're still having issues, you can get support by raising an issue
          on{" "}
          <a href="https://github.com/the-wright-jamie/tab-nine/issues">
            the GitHub page
          </a>
          .
        </p>
        <p>
          <b>
            Click anywhere off this pop-up to dismiss.
          </b>
        </p>
      </div>
    </Modal>
  );
};

export default StoreError;
