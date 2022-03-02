import React from "react";
import "./Modal.css";

const Modal: React.FC = ({ children }) => {
  return (
    <div className="Modal-container">
      <div className="Modal">{children}</div>
    </div>
  );
};

export default Modal;
