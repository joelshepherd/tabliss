import React from 'react';

interface Props {
  onClick: () => void;
  title: string;
}

const IconButton: React.StatelessComponent<Props> = props => (
  <button className="button--icon" {...props}>
    {props.children}
  </button>
);

export default IconButton;
