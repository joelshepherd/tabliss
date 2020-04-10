import React, { FC } from 'react';

import ToggleCard from '../shared/bootstrap/ToggleCard';

const Homepage: FC = () => (
  <ToggleCard title="Open Tabliss when Firefox starts">
    <>
      <p>
        Tabliss no longer controls your homepage. If you would like Tabliss to
        open when you start Firefox, set your homepage to:
      </p>

      <code>{window.location.href}</code>
    </>
  </ToggleCard>
);

export default Homepage;
