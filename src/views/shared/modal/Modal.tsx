import React, { FC } from 'react';

import './styles.css';

const Modal: FC = ({ children }) => {
  return (
    <div className="modal-container">
      <div className="modal">{children}</div>
    </div>
  );
};

export default Modal;
