export function setBackground(id: string) {
  return {
    type: 'SET_BACKGROUND',
    data: { id },
  } as const;
}

export function addWidget(type: string) {
  return {
    type: 'ADD_WIDGET',
    data: { type },
  } as const;
}

export function removeWidget(id: string) {
  return {
    type: 'REMOVE_WIDGET',
    data: { id },
  } as const;
}

export function setData(id: string, data: unknown) {
  return {
    type: 'SET_DATA',
    data: { id, data },
  } as const;
}

export type ProfileActions =
  | ReturnType<typeof setBackground>
  | ReturnType<typeof addWidget>
  | ReturnType<typeof removeWidget>
  | ReturnType<typeof setData>;
