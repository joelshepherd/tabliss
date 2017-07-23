export function changeSettings(component: any, settings: any) {
  return {
    type: 'CHANGE_SETTINGS',
    payload: {
      component,
      settings
    },
  };
}
