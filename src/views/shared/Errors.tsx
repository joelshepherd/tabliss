import React from "react";
import { ErrorContext } from "../../contexts/error";
import Modal from "./modal/Modal";

type Props = {
  onClose: () => void;
};

const Errors: React.FC<Props> = ({ onClose }) => {
  const { errors } = React.useContext(ErrorContext);
  return (
    <Modal onClose={onClose}>
      <div className="Settings">
        <a
          className="button button--primary"
          href="https://github.com/the-wright-jamie/tab-nine/issues"
          target="_blank"
          rel="noopener noreferrer"
          style={{ float: "right", fontSize: "1.1em" }}
        >
          Raise an issue on GitHub
        </a>
        <h2 style={{ margin: 0 }}>Errors</h2>
        {errors.map((error, index) => (
          <div key={index} className="Widget">
            {error.message}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default Errors;
