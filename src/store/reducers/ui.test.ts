import {
  popLoader,
  pushLoader,
  setStoreError,
  toggleFocus,
  toggleSettings,
} from '../actions';
import { ui } from './ui';

const state = {
  focus: false,
  loaders: 0,
  settings: false,
};

describe('ui() reducer', () => {
  it('should toggle focus', () => {
    expect(ui({ ...state, focus: false }, toggleFocus())).toEqual({
      ...state,
      focus: true,
    });

    expect(ui({ ...state, focus: true }, toggleFocus())).toEqual({
      ...state,
      focus: false,
    });
  });

  it('should toggle settings', () => {
    expect(ui({ ...state, settings: false }, toggleSettings())).toEqual({
      ...state,
      settings: true,
    });

    expect(ui({ ...state, settings: true }, toggleSettings())).toEqual({
      ...state,
      settings: false,
    });
  });

  it('should increment and decrement loader', () => {
    expect(ui({ ...state, loaders: 0 }, pushLoader())).toEqual({
      ...state,
      loaders: 1,
    });

    expect(ui({ ...state, loaders: 5 }, popLoader())).toEqual({
      ...state,
      loaders: 4,
    });
  });

  it('should set store error', () => {
    const error = new Error('Test message');

    expect(ui(state, setStoreError(error))).toEqual({
      ...state,
      storeError: error,
    });

    expect(ui({ ...state, storeError: error }, setStoreError())).toEqual(state);
  });
});
