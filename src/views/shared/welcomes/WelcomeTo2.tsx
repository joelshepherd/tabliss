import localForage from "localforage";
import React, { FC, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { resetStore } from "../../../store/actions";
import Modal from "../modal/Modal";
import { Version1Config, migrateVersion1 } from "./migrate";
import Logo from "../Logo";

function getOldStore() {
  return localForage.createInstance({
    name: "tabliss",
    storeName: "state",
  });
}

const WelcomeTo2: FC = () => {
  // Is v1 config active?
  const [v1Config, setV1Config] = useState<Version1Config>();

  // Layout effect so it does not block rendering
  useLayoutEffect(() => {
    const oldStore = getOldStore();

    Promise.all([
      oldStore.getItem("dashboard"),
      oldStore.getItem("settings"),
      oldStore.getItem("storage"),
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
    dispatch(resetStore(migratedState));

    handleClear();
  };
  const handleClear = () => {
    getOldStore().clear();
    setV1Config(undefined);
  };

  return (
    <Modal>
      <Logo />
      <div className="Settings">
        <h2 style={{ textAlign: "center" }}>Welcome to Tabliss 2!</h2>
        <div style={{ fontSize: "1.1em" }}>
          <p>One year in the making, some new feature highlights:</p>
          <ul style={{ color: "#212121" }}>
            <li>Move widgets around the screen</li>
            <li>Add a widget multiple times</li>
            <li>Sync your settings</li>
            <li>Updates without refreshing</li>
            <li>New widgets and translations</li>
          </ul>
          <p>
            Your settings need to be migrated to Tabliss 2. Not everything
            <br />
            is 100% compatible, so I apologise if there is anything missing.
            <br />
            However I have tried my best to keep everything!
          </p>
          <button className="button--primary" onClick={handleMigrate}>
            Migrate your old settings
          </button>{" "}
          <button className="button--primary" onClick={handleClear}>
            Delete and start fresh
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WelcomeTo2;
