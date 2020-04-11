import React, { FC } from 'react';

import Icon from './Icon';

type Props = {
  className?: string;
  onClick?: Function;
};

// Actions
export const RemoveIcon: FC<Props> = (props) => (
  <Icon name="trash-2" {...props} />
);

// Arrows
export const UpIcon: FC<Props> = (props) => <Icon name="arrow-up" {...props} />;
export const DownIcon: FC<Props> = (props) => (
  <Icon name="arrow-down" {...props} />
);

// Toggles
export const ExpandIcon: FC<Props> = (props) => <Icon name="plus" {...props} />;
export const CollapseIcon: FC<Props> = (props) => (
  <Icon name="minus" {...props} />
);
