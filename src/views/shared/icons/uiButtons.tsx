import React, { FC } from 'react';

import Icon from './Icon';

type Props = {};

// Actions
export const RemoveIcon: FC<Props> = () => <Icon name="trash-2" />;

// Arrows
export const UpIcon: FC<Props> = () => <Icon name="arrow-up" />;
export const DownIcon: FC<Props> = () => <Icon name="arrow-down" />;

// Toggles
export const ExpandIcon: FC<Props> = () => <Icon name="plus" />;
export const CollapseIcon: FC<Props> = () => <Icon name="minus" />;
