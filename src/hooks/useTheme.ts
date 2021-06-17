import { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../store';
import { setTheme } from '../store/actions';

export function useTheme() {
  const dispatch = useDispatch();

  const boundTheme = useSelector((state) => state.data.theme||null);

  const boundSetTheme = useCallback(
    (theme: string) => dispatch(setTheme(theme)),
    [dispatch],
  );

  return {
    theme: boundTheme,
    setTheme: boundSetTheme,
  };
}
