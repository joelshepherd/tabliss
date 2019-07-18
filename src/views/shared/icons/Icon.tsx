import React, { FC } from 'react';

type Props = {
  svg: string;
};

const Icon: FC<Props> = ({ svg }) => (
  <i dangerouslySetInnerHTML={{ __html: svg }} />
);

export default Icon;
