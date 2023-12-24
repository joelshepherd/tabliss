import React from "react";
import { FormattedMessage } from "react-intl";

const Persist: React.FC = () => {
  const [error, setError] = React.useState(false);
  const [persisted, setPersisted] = React.useState(true); // Hide until we know otherwise

  React.useEffect(() => {
    if (navigator.storage) navigator.storage.persisted().then(setPersisted);
  }, []);

  if (persisted) return null;

  const handleClick = () => {
    navigator.storage
      .persist()
      .then((persisted) =>
        persisted ? setPersisted(persisted) : setError(true),
      );
  };

  return (
    <div className="Widget" style={{ textAlign: "center" }}>
      <h4><FormattedMessage
          id="settings.persist.title"
          defaultMessage="Persist Settings"
          description="Persist Settings title"
        /></h4>
      <p>
      <FormattedMessage
          id="settings.persist.description"
          defaultMessage="Would you like Tabliss to ask your browser to save your setting
          permanently?"
          description="Persist Settings description"
        />
        
      </p>
      {error ? (
        <p><FormattedMessage
        id="settings.persist.error"
        defaultMessage="Could not persist settings at this time."
        description="Persist Settings error"
      /></p>
      ) : (
        <button className="button button--primary" onClick={handleClick}>
          <FormattedMessage
          id="settings.persist.button"
          defaultMessage="Persist Settings"
          description="Persist Settings button"
        />
        </button>
      )}
    </div>
  );
};

export default Persist;
