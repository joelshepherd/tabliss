import { getAccessToken } from '../../../../../lib/oauth';

export type Task = {
  gid: string;
  name: string;
  completed: boolean;
};

export type Workspace = {
  gid: string;
  name: string;
};

export const oauthSettings = {
  authority: 'https://app.asana.com/api/1.0',
  client_id: '1134637450518855',
  redirect_uri: 'https://s3.amazonaws.com/tabliss-identity/callback.html',
  response_type: 'token',
  scope: 'default profile',
};

class HttpError extends Error {
  constructor(public status: number, public statusText: string) {
    super(`${status} - ${statusText}`);
  }
}

export async function request<Data = any>(
  path: string,
  accessToken: string,
  init?: RequestInit,
): Promise<{ data: Data }> {
  init = init || {};

  const res = await fetch(`https://app.asana.com/api/1.0/${path}`, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new HttpError(res.status, res.statusText);
  }

  return await res.json();
}

export function createRequest(
  accessToken: string,
  onAccessToken: (accessToken: string) => void,
) {
  return async <Data = any>(path: string, init?: RequestInit) => {
    try {
      return await request<Data>(path, accessToken, init);
    } catch (err) {
      // See if we can attempt a token refresh
      if (err instanceof HttpError && err.status === 401) {
        const auth = await getAccessToken(oauthSettings, false);
        const res = await request<Data>(path, auth.accessToken, init);
        onAccessToken(auth.accessToken);
        return res;
      }

      throw err;
    }
  };
}
