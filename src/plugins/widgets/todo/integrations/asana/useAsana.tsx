import { useEffect } from 'react';

import { Action } from '../../actions';
import { request, oauthSettings } from './api';
import { getAccessToken } from '../../../../../lib/oauth';
import { useCachedEffect } from '../../../../../hooks';

type Data = {
  accessToken: string;
  expiresAt: number;
  workspaceId?: string;
};

export function useAsana(
  data: Data | undefined,
  setData: (data?: Data) => void,
  setTasks: (tasks: any[]) => void,
) {
  // Handle access code expiry
  useCachedEffect(
    () => {
      getAccessToken(oauthSettings).then(auth => setData({ ...data, ...auth }));
    },
    data ? data.expiresAt - 1000 : Number.MAX_SAFE_INTEGER,
    [],
  );

  // Can run some initial setup here
  useEffect(() => {
    if (data && data.accessToken && data.workspaceId) {
      request(
        `tasks?assignee=me&workspace=${data.workspaceId}`,
        data.accessToken,
      ).then(({ data }) =>
        setTasks(
          data.map((task: any) => ({
            id: task.gid,
            contents: task.name,
            completed: false,
          })),
        ),
      );
    }
  }, [data && data.accessToken, data && data.workspaceId]);

  return function listener(action: Action) {
    if (!data || !data.accessToken || !data.workspaceId) return;

    switch (action.type) {
      case 'ADD_TODO':
        // add task to asana
        request('tasks', data.accessToken, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              assignee: 'me',
              completed: action.data.completed,
              name: action.data.contents,
              workspace: data.workspaceId,
            },
          }),
        });
        break;

      case 'UPDATE_TODO':
        // add task to asana
        request(`tasks/${action.data.id}`, data.accessToken, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              name: action.data.contents,
            },
          }),
        });
        break;

      case 'REMOVE_TODO':
        request(`tasks/${action.data.id}`, data.accessToken, {
          method: 'delete',
        });
        break;
    }
  };
}
