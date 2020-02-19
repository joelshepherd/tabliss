import React, { FC } from 'react';

import { Props, defaultData } from './types';
import { CustomInput } from 'reactstrap';

const NbaSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <CustomInput
    id="nbaDisplayLogo"
    type="checkbox"
    checked={data.displayLogo}
    onChange={() => setData({ ...data, displayLogo: !data.displayLogo })}
    label="Display team logo"
  />
);

export default NbaSettings;
