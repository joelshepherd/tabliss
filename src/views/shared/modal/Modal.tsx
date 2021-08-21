import React, { FC } from "react";

import "./Modal.css";

const Modal: FC = ({ children }) => {
  return (
    <div className="Modal-container">
      <div className="Modal">{children}</div>
    </div>
  );
};

export default Modal;
