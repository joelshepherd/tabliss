import { ProfileState } from './reducers/profile';

export type RootState = {
  // This gets synced
  profiles: ProfileState;

  // Settings saved in the browser
  settings: {
    profileId: string;
    locale?: string;
    timezone?: string;
  };

  // Controlled the user interface
  ui: {
    focus: boolean;
    pending: number;
    settings: boolean;
  };
};
