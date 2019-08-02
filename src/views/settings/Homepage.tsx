import React, { FC } from 'react';

import { useToggle } from '../../hooks';

const Homepage: FC = () => {
  const [isOpen, toggleIsOpen] = useToggle();

  return (
    <div>
      {!isOpen && (
        <p>
          <a onClick={toggleIsOpen}>Open Tabliss when Firefox starts</a>
        </p>
      )}

      {isOpen && (
        <p>
          Tabliss no longer controls your homepage. If you would like Tabliss to
          open when you start Firefox, set your homepage to:
          <input type="text" value={window.location.href} readOnly={true} />
        </p>
      )}
    </div>
  );
};

export default Homepage;
