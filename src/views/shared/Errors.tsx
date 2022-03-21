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
        <h2 style={{ margin: 0 }}>Errors</h2>

        {errors.map((error, index) => (
          <div key={index} className="Widget">
            {error.message}
          </div>
        ))}
      </div>

      <p style={{ textAlign: "right" }}>
        <a
          href="https://tabliss.io/support.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit support
        </a>
      </p>
    </Modal>
  );
};

export default Errors;
