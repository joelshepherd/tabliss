import { API } from '../../types';

type Data = {
  url: string;
  css: string;
  id: string;
  width: string;
  height: string;
};

export type Props = API<Data>;

export const defaultData: Data = {
  url: 'https://github.com/joelshepherd/tabliss/blob/master/README.md',
  css: '',
  id: 'custom-iframe',
  width: '100px',
  height: '100px',
};
