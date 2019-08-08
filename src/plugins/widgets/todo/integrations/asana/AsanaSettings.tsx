import React, { FC, useState, useEffect, ChangeEvent } from 'react';

import { getAccessToken } from '../../../../../lib/oauth';
import { request } from './api';

type Data = {
  accessToken: string;
  expiresAt: number;
  workspaceId?: string;
};

type Props = {
  data?: Data;
  setData: (data?: Data) => void;
};

const oauthSettings = {
  authority: 'https://app.asana.com/api/1.0',
  client_id: '1134637450518855',
  interactive: false,
  redirect_uri: 'https://s3.amazonaws.com/tabliss-identity/callback.html',
  response_type: 'token',
  scope: 'default profile',
};

const UnauthenticatedSettings: FC<Props> = ({ setData }) => {
  const handleLogin = () => {
    getAccessToken(oauthSettings, true).then(setData);
  };

  return <button onClick={handleLogin}>Login with Asana</button>;
};

type Workspace = {
  gid: string;
  name: string;
};

const AuthenticatedSettings: FC<Props> = ({ data, setData }) => {
  // @todo Fix the prop types
  if (!data) return null;

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  useEffect(() => {
    request('workspaces', data.accessToken)
      .then(body => setWorkspaces(body.data))
      .catch(() => setData());
  }, []);

  const handleLogout = () => setData();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, workspaceId: event.target.value });
  };

  return (
    <>
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
    return <AuthenticatedSettings {...props} />;
  }

  return <UnauthenticatedSettings {...props} />;
};

export default AsanaSettings;
