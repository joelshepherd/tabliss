import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { API } from '../plugins';
import { useSelector } from '../store';
import { pushLoader, popLoader, setData, setCache } from '../store/actions';

export function useApi(id: string): API {
  const dispatch = useDispatch();

  // Cache
  const cache = useSelector(state => state.cache[id]);
  const boundSetCache = useCallback(
    (cache: object) => dispatch(setCache(id, cache)),
    [dispatch, id],
  );

  // Data
  const data = useSelector(state => state.data.data[id]);
  const boundSetData = useCallback(
    (data: object) => dispatch(setData(id, data)),
    [dispatch, id],
  );

  // Loader
  const loader = useMemo(
    () => ({
      push: () => dispatch(pushLoader()),
      pop: () => dispatch(popLoader()),
    }),
    [dispatch],
  );

  return {
    cache,
    data,
    loader,
    setCache: boundSetCache,
    setData: boundSetData,
  };
}
