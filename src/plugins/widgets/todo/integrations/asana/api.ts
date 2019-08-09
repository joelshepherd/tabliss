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

export async function request(
  path: string,
  accessCode: string,
  init?: RequestInit,
) {
  const res = await fetch(`https://app.asana.com/api/1.0/${path}`, {
    ...init,
    headers: {
      ...(init ? init.headers : {}),
      Authorization: `Bearer ${accessCode}`,
    },
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return await res.json();
}
