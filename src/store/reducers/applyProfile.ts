import { Actions } from '../actions';
import { profileSelector } from '../useProfile';
import { profile } from './profile';
import { RootState } from './types';

export function applyProfile(state: RootState, action: Actions): RootState {
  const currentProfile = profileSelector(state);
  const nextProfile = profile(currentProfile, action);

  return currentProfile === nextProfile
    ? state
    : {
        ...state,
        profiles: state.profiles.map(current =>
          current.id === nextProfile.id ? nextProfile : current,
        ),
      };
}
