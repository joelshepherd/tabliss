import { WidgetPosition } from '../reducers/profile';

export function setBackground(type: string) {
  return {
    type: 'SET_BACKGROUND',
    data: { type },
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

export function setData(id: string, data: object) {
  return {
    type: 'SET_DATA',
    data: { id, data },
  } as const;
}

export function setPosition(id: string, position: WidgetPosition) {
  return {
    type: 'SET_POSITION',
    data: { id, position },
  } as const;
}

export function setBlur(blur: number) {
  return {
    type: 'SET_BLUR',
    data: { blur },
  } as const;
}

export function setLuminosity(luminosity: number) {
  return {
    type: 'SET_LUMINOSITY',
    data: { luminosity },
  } as const;
}

export type ProfileActions =
  | ReturnType<typeof setBackground>
  | ReturnType<typeof addWidget>
  | ReturnType<typeof removeWidget>
  | ReturnType<typeof setData>
  | ReturnType<typeof setPosition>
  | ReturnType<typeof setBlur>
  | ReturnType<typeof setLuminosity>;
