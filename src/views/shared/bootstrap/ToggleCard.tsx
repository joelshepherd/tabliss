import React, { FC } from 'react';

import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

import { useToggle } from '../../../hooks';

interface ToggleCardProps {
  defaultState?: boolean;
  description?: string;
  title: string;
}

/**
 * Card with togglable contents. Title, description and defaultState can all be set through props. The children will be displayed as the contents of an open card.
 */
const ToggleCard: FC<ToggleCardProps> = ({
  title,
  description,
  defaultState,
  children,
}) => {
  const [isOpen, toggleIsOpen] = useToggle(defaultState || false);

  return (
    <Card>
      {!isOpen && (
        <CardBody onClick={toggleIsOpen}>
          <CardTitle>
            <h4>{title}</h4>
          </CardTitle>
          {description && <CardText>{description}</CardText>}
        </CardBody>
      )}

      {isOpen && (
        <CardBody>
          <CardTitle onClick={toggleIsOpen}>
            <h4>{title}</h4>
          </CardTitle>
          {children}
        </CardBody>
      )}
    </Card>
  );
};

export default ToggleCard;
