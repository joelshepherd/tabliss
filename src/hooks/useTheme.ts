import { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../store';
import { setTheme } from '../store/actions';

export function useTheme(theme: string = 'light') {
  const dispatch = useDispatch();

  const boundTheme = useSelector((state) => state.data.theme || theme);

  const boundSetTheme = useCallback(
    (theme: string) => dispatch(setTheme(theme)),
    [dispatch, theme],
  );

  return {
    theme: boundTheme,
    setTheme: boundSetTheme,
  };
}
