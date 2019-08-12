import { replaceTodos } from '../../actions';
import { Middleware } from '../types';
import { Task, createRequest } from './api';

type Data = {
  accessToken: string;
  expiresAt: number;
  workspaceId?: string;
};

const middleware: Middleware<Data> = ({ data, dispatch, setData }) => {
  if (!data || !data.accessToken || !data.workspaceId) {
    return next => next;
  }

  const request = createRequest(data.accessToken, accessToken =>
    setData({ ...data, accessToken }),
  );

  // fetch latest from asana
  request<Task[]>(
    `tasks?assignee=me&workspace=${
      data.workspaceId
    }&opt_fields=gid,name,completed`,
  ).then(({ data }) =>
    dispatch(
      replaceTodos(
        data.map(task => ({
          id: task.gid,
          contents: task.name,
          completed: task.completed,
        })),
      ),
    ),
  );

  return next => action => {
    switch (action.type) {
      case 'ADD_TODO':
        request('tasks', {
          method: 'POST',
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

      case 'COMPLETE_TODO':
        request(`tasks/${action.data.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              completed: action.data.completed,
            },
          }),
        });
        break;

      case 'UPDATE_TODO':
        request(`tasks/${action.data.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              name: action.data.contents,
            },
          }),
        });
        break;

      case 'REMOVE_TODO':
        request(`tasks/${action.data.id}`, { method: 'DELETE' });
        break;
    }

    return next(action);
  };
};

export default middleware;
