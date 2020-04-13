import React, { FC } from 'react';
import { CustomInput, FormGroup } from 'reactstrap';

import { Props, defaultData } from './types';
import { DebounceInput } from '../../shared';

const GiphySettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="GiphySettings">
    <DebounceInput
      type="text"
      label="Tag"
      id="giphyTag"
      value={data.tag}
      onChange={(value) => setData({ ...data, tag: value })}
      wait={500}
    />
    <p className="info">Separate multiple tags with a commas</p>

    <FormGroup>
      <CustomInput
        type="checkbox"
        id="allowNsfw"
        label="Allow NSFW"
        checked={data.nsfw}
        onChange={() => setData({ ...data, nsfw: !data.nsfw })}
      />

      <CustomInput
        type="checkbox"
        id="strechFillScreen"
        checked={data.expand}
        label="Stretch to fill screen"
        onChange={() => setData({ ...data, expand: !data.expand })}
      />
    </FormGroup>
  </div>
);

export default GiphySettings;
