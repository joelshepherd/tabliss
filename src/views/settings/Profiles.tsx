import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../store';
import { switchProfile, addProfile } from '../../store/actions';

const Profiles: FC = () => {
  const profileId = useSelector(state => state.settings.profileId);
  const profiles = useSelector(state => state.profiles);

  const dispatch = useDispatch();
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) =>
      dispatch(switchProfile(event.target.value)),
    [dispatch],
  );
  const onAdd = useCallback(
    () => dispatch(addProfile(prompt('Profile Name') || 'New Profile')),
    [dispatch],
  );

  return (
    <div>
      <label>
        Current Profile
        <select value={profileId} onChange={onChange}>
          {profiles.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <button onClick={onAdd}>Add Profile</button>
    </div>
  );
};

export default Profiles;
