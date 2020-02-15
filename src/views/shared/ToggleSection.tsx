import React, { FC } from 'react';
import { useToggle } from '../../hooks';
import { CardLink } from 'reactstrap';

type Props = {
  name: string;
};

const ToggleSection: FC<Props> = ({ name, children }) => {
  const [isOpen, toggleOpen] = useToggle();

  return (
    <CardLink href="#" onClick={toggleOpen}>
      {isOpen ? 'Close' : 'Open'} {name}
    </CardLink>
  );
};

export default ToggleSection;
