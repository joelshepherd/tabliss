import { ComponentType } from 'react';

import { Dispatch } from '../types';

export type SettingsProps<Data> = {
  data?: Data;
  setData: (data?: Data) => void;
};

export type IntegrationConfig = {
  key: string;
  name: string;
  middleware: Middleware<any>;
  settingsComponent: ComponentType<SettingsProps<any>>;
};

export type Next = (next: Dispatch) => Dispatch;
export type Middleware<Data> = (
  props: SettingsProps<Data> & { dispatch: Dispatch },
) => Next;
