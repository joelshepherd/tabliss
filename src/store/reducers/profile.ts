import { ProfileActions } from '../actions/profile';

interface Profile {
  id: string;
  name: string;
  background: string;
  widgets: string[];
  storage: {
    key: string;
    position: [0 | 1 | 2, 0 | 1 | 2];
    data: unknown;
  }[];
}

export interface ProfileState {
  activeProfileId: string;
  profiles: Profile[];
}

const defaultProfileId = '00000000-0000-0000-0000-000000000000';
const defaultProfile = {
  id: defaultProfileId,
  name: 'Default',
  background: 'background/unsplash',
  widgets: [],
  storage: [],
};

const initialState: ProfileState = {
  activeProfileId: defaultProfileId,
  profiles: [defaultProfile],
};

export function profile(
  state = initialState,
  action: ProfileActions,
): ProfileState {
  // Update current profile helper function
  const updateProfile = (fn: (profile: Profile) => Profile): ProfileState => ({
    ...state,
    profiles: state.profiles.map(profile =>
      profile.id === state.activeProfileId ? fn(profile) : profile,
    ),
  });

  switch (action.type) {
    case 'SET_PROFILE':
      return {
        ...state,
        activeProfileId: action.data.id,
      };

    case 'SET_BACKGROUND':
      return updateProfile(profile => ({
        ...profile,
        backgroundId: action.data.id,
      }));

    case 'ADD_WIDGET':
      return updateProfile(profile => ({
        ...profile,
        widgets: profile.widgets.concat(action.data.key),
      }));

    case 'REMOVE_WIDGET':
      return updateProfile(profile => ({
        ...profile,
        widgets: profile.widgets.filter(widget => action.data.key),
      }));

    // reorder widget

    case 'SET_PLUGIN_STATE':
      return updateProfile(profile => profile);
  }

  return state;
}
