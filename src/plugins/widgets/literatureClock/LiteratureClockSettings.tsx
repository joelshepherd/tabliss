import React, { FC } from 'react';

import { Props, defaultData } from './types';
import { CustomInput } from 'reactstrap';

const LiteratureClockSettings: FC<Props> = ({
  data = defaultData,
  setData,
}) => (
  <div className="LiteratureClockSettings">
    <CustomInput
      type="checkbox"
      label="Display book and author"
      checked={data.showBookAndAuthor}
      onChange={() =>
        setData({ ...data, showBookAndAuthor: !data.showBookAndAuthor })
      }
    />

    <CustomInput
      type="checkbox"
      checked={data.centerText}
      label="Align text at center"
      onChange={() => setData({ ...data, centerText: !data.centerText })}
    />
  </div>
);

export default LiteratureClockSettings;
