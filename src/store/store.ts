import { ProfilesState } from './reducers/profiles';

export type RootState = {
  // This gets synced
  profiles: ProfilesState;

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
