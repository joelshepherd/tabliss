import React, { FC, useState, useEffect, ChangeEvent } from 'react';

import { getAccessToken } from '../../../../../lib/oauth';
import { SettingsProps } from '../types';
import { oauthSettings, request, Workspace } from './api';

type Data = {
  accessToken: string;
  expiresAt: number;
  workspaceId?: string;
};

type Props = SettingsProps<Data>;

const UnauthenticatedSettings: FC<Props> = ({ setData }) => {
  const handleLogin = () => {
    getAccessToken(oauthSettings, true).then(setData);
  };

  return <button onClick={handleLogin}>Login with Asana</button>;
};

const AuthenticatedSettings: FC<Required<Props>> = ({ data, setData }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  useEffect(() => {
    request('workspaces', data.accessToken)
      .then(body => body.data)
      .then(setWorkspaces);
  }, []);

  const handleLogout = () => setData();
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) =>
    setData({
      ...data,
      workspaceId: event.target.value,
    });

  return (
    <>
      <h5>Asana Settings</h5>
      <label>
        Workspace
        <select value={data.workspaceId || ''} onChange={handleChange}>
          <option disabled value="">
            Select workspace
          </option>
          {workspaces.map(workspace => (
            <option key={workspace.gid} value={workspace.gid}>
              {workspace.name}
            </option>
          ))}
        </select>
      </label>

      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

const AsanaSettings: FC<Props> = props => {
  if (props.data && props.data.accessToken) {
    // Defined manually because TypeScript
    // does not realise data is not null when spreading
    return <AuthenticatedSettings data={props.data} setData={props.setData} />;
  }

  return <UnauthenticatedSettings {...props} />;
};

export default AsanaSettings;
