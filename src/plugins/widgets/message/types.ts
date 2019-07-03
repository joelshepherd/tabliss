import { API } from '../../interfaces';

type Data = { message: string };

export type Props = API<Data>;

export const defaultData: Data = { message: 'Write something fun' };
