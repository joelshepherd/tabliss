import { ProfileState } from './reducers/profile';
import { RootState } from './reducers/types';
import { useSelector } from './store';

export function profileSelector(state: RootState) {
  const profile = state.profiles.find(
    profile => profile.id === state.settings.profileId,
  );

  if (!profile) {
    throw new Error('Cannot find the active profile');
  }

  return profile;
}

export function useProfile<T>(selector: (profile: ProfileState) => T) {
  return selector(useSelector(profileSelector));
}
