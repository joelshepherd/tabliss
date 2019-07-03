import React, { useState } from 'react';

import { isInputEvent } from '../../../utils';
import Display from './Display';
import { Props, defaultData } from './types';
import './Links.sass';
const linkIcon = require('feather-icons/dist/icons/link-2.svg');

const Links: React.FC<Props> = ({ data = defaultData }) => {
  const [visible, setVisible] = useState(false);

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
        <a onClick={() => setVisible(true)} title="Show quick links">
          <i dangerouslySetInnerHTML={{ __html: linkIcon }} />
        </a>
      )}
    </div>
  );
};

// const onKeyDown = (event: KeyboardEvent) => {
//   // Check for input focus
//   if (isInputEvent(event)) {
//     return;
//   }

//   const key = event.keyCode - 49; // Starting at 1
//   if (this.props.links[key]) {
//     window.location.assign(this.props.links[key].url);
//   }
// };

export default Links;
