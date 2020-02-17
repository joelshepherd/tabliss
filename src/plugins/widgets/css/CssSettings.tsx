import React, { FC } from 'react';

import { Props, defaultData } from './types';
import { Label, Input, Alert } from 'reactstrap';

const CssSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="CssSettings">
    <Label for="CustomCssTextarea">CSS Snippet</Label>
    <Input
      type="textarea"
      id="CustomCssTextarea"
      rows={3}
      style={{ fontFamily: 'monospace' }}
      value={data.input}
      onChange={event => setData({ input: event.target.value })}
    />

    <Alert color="warning">
      Warning: this functionality is intended for advanced users. Custom styles
      may break at any time.
    </Alert>
  </div>
);

export default CssSettings;
