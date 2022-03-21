import React from "react";

type ErrorAPI = {
  errors: ErrorItem[];
  push: (error: ErrorItem) => void;
};

type ErrorItem = {
  message: string;
};

type ErrorState = {
  errors: ErrorItem[];
};

export const ErrorContext = React.createContext<ErrorAPI>(null as any);

const ErrorProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<ErrorState>({ errors: [] });
  const push = React.useCallback(
    (error: ErrorItem) =>
      setState((state) => ({ ...state, errors: state.errors.concat(error) })),
    [],
  );

  return (
    <ErrorContext.Provider value={{ ...state, push }}>
      {children}
    </ErrorContext.Provider>
  );
};

/** Push error to the error log */
export const usePushError = (): ErrorAPI["push"] =>
  React.useContext(ErrorContext).push;

export default ErrorProvider;
