import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useDispatch } from 'react-redux';

import Crashed from '../components/crashed/Crashed';
import { capture as captureException } from '../errorHandler';
import { API } from '../plugins';
import { setData } from '../store/actions/profile';
import { setCache } from '../store/reducers/cache';
import { useSelector } from '../store/store';

type Props = {
  id: string;
  Component: React.ComponentType<API>;
  data: object;
};

const Plugin: React.FC<Props> = ({ id, Component, data }) => {
  // Plugin API this
  const api = useApi(id);
  const props: API = {
    ...api,
    data,
  };

  return <Component {...props} />;
};

export default withErrorBoundary(Plugin, Crashed, captureException);

function useApi(id: string) {
  const dispatch = useDispatch();

  // Cache
  const cache = useSelector(state => state.cache[id]);
  const boundSetCache = React.useCallback(
    (cache: object) => dispatch(setCache(id, cache)),
    [dispatch, id],
  );

  // Data
  const boundSetData = React.useCallback(
    (data: object) => dispatch(setData(id, data)),
    [dispatch, id],
  );

  return {
    cache,
    setCache: boundSetCache,
    setData: boundSetData,
  };
}
