import React, { FC } from 'react';

import { Props, defaultData } from './types';

const IframeSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const { url, width, height, id } = data;

  return (
    <div className="IframeSettings">
      <label>
        URL
        <input
          type="url"
          value={url}
          onChange={e =>
            setData({
              url: e.target.value,
              width,
              height,
              id,
            })
          }
        />
      </label>

      <label>
        Custom ID
        <input
          type="text"
          value={id}
          onChange={e =>
            setData({
              id: e.target.value,
              height,
              width,
              url,
            })
          }
        />
      </label>

      <label>
        Width
        <input
          type="text"
          size={15}
          value={width}
          onChange={e =>
            setData({
              width: e.target.value,
              height,
              url,
              id,
            })
          }
        />
      </label>

      <label>
        Height
        <input
          type="text"
          size={15}
          value={data.height}
          onChange={e =>
            setData({
              height: e.target.value,
              width,
              url,
              id,
            })
          }
        />
      </label>

      <p className="info">
        Warning: this functionality is intended for advanced users. Iframes may
        break at any time. You can't style the contents of an iframe. Some
        websites may not be emendable
      </p>
    </div>
  );
};

export default IframeSettings;
