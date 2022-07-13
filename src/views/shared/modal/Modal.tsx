import React from "react";
import "./Modal.css";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal: React.FC<Props> = ({ children, onClose }) => {
  return (
    <div className="Modal-container" onClick={onClose}>
      <div className="Modal" onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
