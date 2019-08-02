import React, { FC } from 'react';

import './Logo.css';

const tablissLogo = require('./tabliss.svg');

const Logo: FC = () => (
  <h1 className="Logo">
    <i dangerouslySetInnerHTML={{ __html: tablissLogo }} />
  </h1>
);

export default Logo;
