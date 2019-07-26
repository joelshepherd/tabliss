import React, { FC } from 'react';

import { useKeyPress } from '../../../utils/useKeyPress';
import { useToggle } from '../../../utils/useToggle';
import { Icon } from '../../../views/shared';
import Display from './Display';
import { Props, defaultData } from './types';
import './Links.sass';

const Links: FC<Props> = ({ data = defaultData }) => {
  const [visible, toggleVisible] = useToggle();

  useKeyPress(
    ({ key }) => {
      const index = Number(key) - 1;
      if (data.links[index]) {
        window.location.assign(data.links[index].url);
      }
    },
    ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  );

  return (
    <div
      className="Links"
      style={{ gridTemplateColumns: '1fr '.repeat(data.columns) }}
    >
      {data.visible || visible ? (
        data.links.map((link, index) => (
          <Display key={index} number={index + 1} {...link} />
        ))
      ) : (
        <a onClick={toggleVisible} title="Show quick links">
          <Icon name={'link-2'} />
        </a>
      )}
    </div>
  );
};

export default Links;
