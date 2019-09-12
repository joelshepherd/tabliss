import React, { FC } from 'react';
import { useToggle } from '../../hooks';

type Props = {
  name: string;
};

const ToggleSection: FC<Props> = ({ name, children }) => {
  const [isOpen, toggleOpen] = useToggle();

  return (
    <>
      <p>
        <a onClick={toggleOpen}>
          {isOpen ? 'Close' : 'Open'} {name}
        </a>
      </p>

      {isOpen && children}
    </>
  );
};

export default ToggleSection;
