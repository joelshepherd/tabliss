import { API } from '../../types';

export type Palette = {
  palette: Array<Array<Number>>;
  timestamp: number;
};

type Data = {
  palette?: Array<Array<Number>>;
};

type Cache = Palette;

export type Props = API<Data, Cache>;

export type ColorProps = {
  displayColor: Array<Number>;
};

export const defaultData: Data = {};
