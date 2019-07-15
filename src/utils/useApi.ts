import { useCallback } from 'react';
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
  const data = useSelector(state => state.profile.data[id]);
  const boundSetData = useCallback(
    (data: object) => dispatch(setData(id, data)),
    [dispatch, id],
  );

  // Loader
  const push = useCallback(() => dispatch(pushLoader()), [dispatch]);
  const pop = useCallback(() => dispatch(popLoader()), [dispatch]);

  return {
    cache,
    data,
    loader: { push, pop },
    setCache: boundSetCache,
    setData: boundSetData,
  };
}
