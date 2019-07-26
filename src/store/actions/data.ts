import { BackgroundDisplay, WidgetDisplay } from '../reducers/data';

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

export function reorderWidget(id: string, to: number) {
  return {
    type: 'REORDER_WIDGET',
    data: { id, to },
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

export function setLocale(locale: string) {
  return {
    type: 'SET_LOCALE',
    data: { locale },
  } as const;
}

export function setTimeZone(timeZone?: string) {
  return {
    type: 'SET_TIME_ZONE',
    data: { timeZone },
  } as const;
}

export function setWidgetDisplay(id: string, display: Partial<WidgetDisplay>) {
  return {
    type: 'SET_WIDGET_DISPLAY',
    data: { id, display },
  } as const;
}

export type DataActions =
  | ReturnType<typeof setBackground>
  | ReturnType<typeof addWidget>
  | ReturnType<typeof removeWidget>
  | ReturnType<typeof reorderWidget>
  | ReturnType<typeof setData>
  | ReturnType<typeof setBackgroundDisplay>
  | ReturnType<typeof setLocale>
  | ReturnType<typeof setTimeZone>
  | ReturnType<typeof setWidgetDisplay>;
