export function addProfile(name: string) {
  return {
    type: 'ADD_PROFILE',
    data: { name },
  } as const;
}

export function removeProfile(id: string) {
  return {
    type: 'REMOVE_PROFILE',
    data: { id },
  } as const;
}

export function setProfile(id: string, name: string) {
  return {
    type: 'SET_PROFILE',
    data: { id, name },
  } as const;
}

export type ProfilesActions =
  | ReturnType<typeof addProfile>
  | ReturnType<typeof removeProfile>
  | ReturnType<typeof setProfile>;
