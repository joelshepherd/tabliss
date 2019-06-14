export function setLocale(locale: string) {
  return {
    type: 'SET_LOCALE',
    data: { locale },
  } as const;
}

type SettingsActions = ReturnType<typeof setLocale>;

export type SettingsState = {
  locale?: string;
};

const initialState: SettingsState = {};

export function settings(
  state = initialState,
  action: SettingsActions,
): SettingsState {
  switch (action.type) {
    case 'SET_LOCALE':
      return {
        ...state,
        locale: action.data.locale,
      };

    default:
      return state;
  }
}
