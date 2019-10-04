import { API } from '../../types';

type Data = {
  url: string;
  id: string;
  width: string;
  height: string;
};

export type Props = API<Data>;

export const defaultData: Data = {
  url: 'https://excuses.dev/it-works-on-my-computer',
  id: 'custom-iframe',
  width: '500px',
  height: '450px',
};
