export function addProfile(name: string) {
  return {
    type: 'ADD_PROFILE',
    data: { name },
  } as const;
}

export function updateProfile(id: string, name: string) {
  return {
    type: 'UPDATE_PROFILE',
    data: { id, name },
  } as const;
}

export function removeProfile(id: string) {
  return {
    type: 'REMOVE_DATA',
    data: { id },
  } as const;
}

export function setProfile(id: string) {
  return {
    type: 'SET_PROFILE',
    data: { id },
  } as const;
}

export function setBackground(id: string) {
  return {
    type: 'SET_BACKGROUND',
    data: { id },
  } as const;
}

export function addWidget(key: string) {
  return {
    type: 'ADD_WIDGET',
    data: { key },
  } as const;
}

export function removeWidget(key: string) {
  return {
    type: 'REMOVE_WIDGET',
    data: { key },
  } as const;
}

export function setPluginState(id: string, state: unknown) {
  return {
    type: 'SET_PLUGIN_STATE',
    data: { id, state },
  } as const;
}

export type ProfileActions =
  | ReturnType<typeof addProfile>
  | ReturnType<typeof updateProfile>
  | ReturnType<typeof removeProfile>
  | ReturnType<typeof setProfile>
  | ReturnType<typeof setBackground>
  | ReturnType<typeof addWidget>
  | ReturnType<typeof removeWidget>
  | ReturnType<typeof setPluginState>;
