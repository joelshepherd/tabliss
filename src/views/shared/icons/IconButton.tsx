import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
  title?: string;
}

const IconButton: FC<Props> = ({ children, primary, ...props }) => (
  <button
    className={`button--icon ${primary ? "button--primary" : ""}`}
    {...props}
  >
    {children}
  </button>
);

export default IconButton;
