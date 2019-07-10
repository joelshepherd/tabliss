import { BackgroundDisplay, WidgetDisplay } from '../reducers/profile';

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

export function setBackgroundDisplay(
  id: string,
  display: Partial<BackgroundDisplay>,
) {
  return {
    type: 'SET_BACKGROUND_DISPLAY',
    data: { id, display },
  } as const;
}

export function setWidgetDisplay(id: string, display: Partial<WidgetDisplay>) {
  return {
    type: 'SET_WIDGET_DISPLAY',
    data: { id, display },
  } as const;
}

export type ProfileActions =
  | ReturnType<typeof setBackground>
  | ReturnType<typeof addWidget>
  | ReturnType<typeof removeWidget>
  | ReturnType<typeof setData>
  | ReturnType<typeof setBackgroundDisplay>
  | ReturnType<typeof setWidgetDisplay>;
