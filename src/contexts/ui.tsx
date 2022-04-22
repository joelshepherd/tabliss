import React from "react";

type UiState = {
  errors: boolean;
  pending: number;
  settings: boolean;
};

type UiContext = UiState & {
  pushLoader: () => void;
  popLoader: () => void;
  toggleErrors: () => void;
  toggleSettings: () => void;
};

export const UiContext = React.createContext({} as unknown as UiContext);

const UiProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [state, setState] = React.useState<UiState>({
    errors: false,
    pending: 0,
    settings: false,
  });

  const methods = React.useMemo(
    () => ({
      pushLoader: () =>
        setState((state) => ({ ...state, pending: state.pending + 1 })),
      popLoader: () =>
        setState((state) => ({ ...state, pending: state.pending - 1 })),
      toggleErrors: () =>
        setState((state) => ({ ...state, errors: !state.errors })),
      toggleSettings: () =>
        setState((state) => ({ ...state, settings: !state.settings })),
    }),
    [],
  );

  return (
    <UiContext.Provider value={{ ...state, ...methods }}>
      {children}
    </UiContext.Provider>
  );
};

export default UiProvider;
