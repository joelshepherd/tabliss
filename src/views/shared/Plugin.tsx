import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { capture as captureException } from "../../errorHandler";
import { useApi } from "../../hooks";
import { API } from "../../plugins";
import Crashed from "./Crashed";

type Props = {
  id: string;
  component: React.ComponentType<API<any, any>>;
};

const Plugin: React.FC<Props> = ({ id, component: Component }) => {
  // Create plugin API
  const api = useApi(id);

  return <Component {...api} />;
};

export default withErrorBoundary(Plugin, {
  FallbackComponent: Crashed,
  onError: captureException,
});
