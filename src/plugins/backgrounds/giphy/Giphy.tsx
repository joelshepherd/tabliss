import React from 'react';

import { getGif } from './api';
import { Props, defaultData } from './types';

const Giphy: React.FC<Props> = ({ data = defaultData }) => {
  const [url, setUrl] = React.useState<string>();
  React.useEffect(() => {
    getGif(data.tag, data.nsfw).then(gif => {
      setUrl(URL.createObjectURL(gif.data));
    });
  }, [data]);

  return (
    <div className="Giphy fullscreen">
      <div
        className="gif fullscreen"
        style={{
          backgroundImage: url ? `url(${url})` : undefined,
          backgroundSize: data.expand ? 'cover' : undefined,
        }}
      />
    </div>
  );
};

export default Giphy;
