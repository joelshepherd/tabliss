import { FC, useEffect } from 'react';
import { Props, defaultData } from './types';

const Reload: FC<Props> = ({ data = defaultData }) => {
  useEffect(() => {
    const id = setTimeout(location.reload, data.timeout * 60000);
    return () => clearTimeout(id);
  }, [data.timeout]);

  return null;
};

export default Reload;
