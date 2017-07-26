export * from './action';
export * from './dashboard';
export * from './plugins';

export const RESET_ALL = 'RESET_ALL';

export function resetAll() {
  return {
    type: RESET_ALL,
  };
}
