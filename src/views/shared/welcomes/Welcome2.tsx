import localForage from 'localforage';
import React, { FC, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { migrateStore } from '../../../store/actions';
import Modal from '../modal/Modal';
import { Version1Config, migrateVersion1 } from './migrate';

function getOldStore() {
  return localForage.createInstance({
    name: 'tabliss',
    storeName: 'state',
  });
}

const Welcome2: FC = () => {
  // Is v1 config active?
  const [v1Config, setV1Config] = useState<Version1Config>();

  // Layout effect so it does not block rendering
  useLayoutEffect(() => {
    const oldStore = getOldStore();

    Promise.all([
      oldStore.getItem('dashboard'),
      oldStore.getItem('settings'),
      oldStore.getItem('storage'),
    ]).then(([dashboard, settings, storage]) => {
      if (dashboard && settings && storage) {
        setV1Config({ dashboard, settings, storage } as any);
      }
    });
  }, []);

  const dispatch = useDispatch();

  if (!v1Config) {
    return null;
  }

  const handleMigrate = () => {
    const newState = migrateVersion1(v1Config);
    console.log(newState);
    dispatch(migrateStore(newState));
    setV1Config(undefined);
  };
  const handleClear = () => {
    // @todo Enable these when finished testing
    // const oldStore = getOldStore();
    // oldStore.clear();

    setV1Config(undefined);
  };

  return (
    <Modal>
      <h1>Welcome to Tabliss 2!</h1>
      <p>There are new features, yay!</p>

      <button onClick={handleMigrate}>Transfer settings</button>
      <button onClick={handleClear}>Start fresh</button>
    </Modal>
  );
};

export default Welcome2;
