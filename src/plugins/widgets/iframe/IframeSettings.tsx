import React, { FC } from 'react';

import { Props, defaultData } from './types';

const IframeSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const { url, width, height, id, css } = data;

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
              css,
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
              css,
            })
          }
        />
      </label>

      <label>
        CSS Snippet
        <textarea
          rows={3}
          style={{ fontFamily: 'monospace' }}
          value={css}
          onChange={e =>
            setData({
              css: e.target.value,
              height,
              width,
              url,
              id,
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
              css,
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
              css,
              id,
            })
          }
        />
      </label>

      <p className="info">
        Warning: this functionality is intended for advanced users. Iframes may
        break at any time.
      </p>
    </div>
  );
};

export default IframeSettings;
