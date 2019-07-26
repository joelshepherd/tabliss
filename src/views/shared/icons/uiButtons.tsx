import icons from 'feather-icons/dist/icons.json';
import React, { FC } from 'react';

import Icon from './Icon';

type Props = {};

// Actions
export const RemoveIcon: FC<Props> = () => <Icon svg={icons['trash-2']} />;

// Arrows
export const UpIcon: FC<Props> = () => <Icon svg={icons['arrow-up']} />;
export const DownIcon: FC<Props> = () => <Icon svg={icons['arrow-down']} />;

// Toggles
export const ExpandIcon: FC<Props> = () => <Icon svg={icons['plus']} />;
export const CollapseIcon: FC<Props> = () => <Icon svg={icons['minus']} />;
