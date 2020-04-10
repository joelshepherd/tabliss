import React, { FC } from 'react';

import { Props, defaultData } from './types';
import { CustomInput } from 'reactstrap';

const NbaSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <CustomInput
    type="checkbox"
    id="nbaDisplayLogo"
    label="Display team logo"
    checked={data.displayLogo}
    onChange={() => setData({ ...data, displayLogo: !data.displayLogo })}
  />
);

export default NbaSettings;
