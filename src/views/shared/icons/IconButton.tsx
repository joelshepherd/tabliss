import React, { FC } from 'react';

interface Props {
  onClick: () => void;
  title: string;
}

const IconButton: FC<Props> = ({ children, ...props }) => (
  <button className="button--icon" {...props}>
    {children}
  </button>
);

export default IconButton;
