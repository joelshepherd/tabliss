import React from "react";

type UiState = {
  pending: number;
  settings: boolean;
  maxsettings:boolean;
};

type UiContext = UiState & {
  pushLoader: () => void;
  popLoader: () => void;
  toggleSettings: () => void;
  maximizeSettings:() => void;
};

export const UiContext = React.createContext({} as unknown as UiContext);

const UiProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<UiState>({
    pending: 0,
    settings: false,
    maxsettings:false,
  });

  const methods = React.useMemo(
    () => ({
      pushLoader: () =>
        setState((state) => ({ ...state, pending: state.pending + 1 })),
      popLoader: () =>
        setState((state) => ({ ...state, pending: state.pending - 1 })),
      toggleSettings: () =>
        setState((state) => ({ ...state, settings: !state.settings })),
      maximizeSettings: () =>
        setState((state) => ({ ...state, maxsettings: !state.maxsettings })),
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
