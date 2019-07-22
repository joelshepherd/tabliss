import localForage from 'localforage';
import React, { FC, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { migrateStore } from '../../../store/actions';
import Modal from '../modal/Modal';
import { Version1Config, migrateVersion1 } from './migrate';
import Logo from '../Logo';

function getOldStore() {
  return localForage.createInstance({
    name: 'tabliss',
    storeName: 'state',
  });
}

const WelcomeTo2: FC = () => {
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
    const migratedState = migrateVersion1(v1Config);
    dispatch(migrateStore(migratedState));

    handleClear();
  };
  const handleClear = () => {
    getOldStore().clear();
    setV1Config(undefined);
  };

  return (
    <Modal>
      <Logo />
      <h2>Welcome to Tabliss 2!</h2>

      <p>
        Hot new features, straight out of the <del>kitchen</del> code:
      </p>
      <ul>
        <li>Reposition your widgets around the screen</li>
        <li>Sync your settings between computers</li>
        <li>Add the same widget twice</li>
      </ul>

      <p>
        As part of the update, you will need to transfer your old settings from
        Tabliss 1 to Tabliss 2.
      </p>

      <button onClick={handleMigrate}>Transfer your old settings</button>
      <button onClick={handleClear}>Start again, fresh</button>
    </Modal>
  );
};

export default WelcomeTo2;
