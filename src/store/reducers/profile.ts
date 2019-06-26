import { v4 as generateId } from 'uuid';

import { ProfileActions } from '../actions/profile';

export interface ProfileState {
  id: string;
  name: string;
  background: {
    id: string;
  };
  widgets: {
    id: string;
    position: [number, number];
  }[];
  storage: {
    id: string;
    type: string;
    data: unknown;
  }[];
}

const backgroundId = generateId();
const timeId = generateId();
const greetingId = generateId();

export const defaultProfile: Pick<
  ProfileState,
  'background' | 'storage' | 'widgets'
> = {
  background: { id: backgroundId },
  widgets: [
    {
      id: timeId,
      position: [1, 1],
    },
    {
      id: greetingId,
      position: [1, 1],
    },
  ],
  storage: [
    {
      id: backgroundId,
      type: 'background/unsplash',
      data: {},
    },
    {
      id: timeId,
      type: 'widget/time',
      data: {},
    },
    {
      id: greetingId,
      type: 'widget/greeting',
      data: {},
    },
  ],
};

const initialState: ProfileState = {
  ...defaultProfile,
  id: '00000000-0000-0000-0000-000000000000',
  name: 'Default',
};

export function profile(
  state: ProfileState,
  action: ProfileActions,
): ProfileState {
  switch (action.type) {
    case 'SET_BACKGROUND':
      return {
        ...state,
        background: { id: action.data.id },
      };

    case 'ADD_WIDGET':
      const [existing] = state.storage
        .filter(storage => storage.type === action.data.type)
        .filter(
          storage =>
            !state.widgets.map(widget => widget.id).includes(storage.id),
        );

      if (existing) {
        return {
          ...state,
          widgets: state.widgets.concat({
            id: existing.id,
            position: [1, 1],
          }),
        };
      }

      const id = generateId();
      return {
        ...state,
        storage: state.storage.concat({
          id,
          type: action.data.type,
          data: {},
        }),
        widgets: state.widgets.concat({
          id,
          position: [1, 1],
        }),
      };

    case 'REMOVE_WIDGET':
      // @todo Should we remove all but the last version of the storage?
      return {
        ...state,
        widgets: state.widgets.filter(widget => widget.id === action.data.id),
      };

    // @todo Reorder widget?

    case 'SET_DATA':
      return {
        ...state,
        storage: state.storage.map(storage =>
          storage.id === action.data.id
            ? { ...storage, data: action.data.data }
            : storage,
        ),
      };
  }

  return state;
}
