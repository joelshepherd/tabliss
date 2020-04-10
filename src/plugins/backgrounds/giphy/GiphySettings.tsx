import React, { FC } from 'react';
import { CustomInput, FormGroup } from 'reactstrap';

import InputGroup from '../../../views/shared/bootstrap/InputGroup';
import { defaultData, Props } from './types';

const GiphySettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="GiphySettings">
    <InputGroup
      type="text"
      label="Tag"
      id="giphyTag"
      value={data.tag}
      onChange={event => setData({ ...data, tag: event.target.value })}
    />

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
