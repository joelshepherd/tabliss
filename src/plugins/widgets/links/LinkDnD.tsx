import React, { FC } from 'react';

import { Link } from './types';
import DnD from '../../../views/shared/DnD';
import LinkInput from './Input';

interface DnDProps {
  data: Link[];
  move: (id: string, newPos: number) => void;
  remove: (id: string) => void;
  change: (index: number, link: Link, values: Partial<Link>) => void;
}

export const LinkDnD: FC<DnDProps> = ({ data, move, remove, change }) => {
  const items = data.map((item, i) => {
    return {
      ...item,
      index: i,
      id: `quick-links-dnd-${i}`,
    };
  });

  console.log(items);

  return (
    <DnD
      move={move}
      items={items}
      template={item => (
        <LinkInput
          {...item}
          key={item.id}
          number={item.index + 1}
          onChange={values => change(item.index, item, values)}
          onRemove={() => remove(item.index.toString())}
        />
      )}
    />
  );
};

export default LinkDnD;
