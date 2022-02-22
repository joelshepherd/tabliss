import React from "react";
import ReactDOM from "react-dom";
import { register as registerErrorHandler } from "./errorHandler";
import { register as registerServiceWorker } from "./serviceWorker";
import Root from "./views/Root";

// React 18 typescript support
import type {} from "react/next";
import type {} from "react-dom/next";

// Register error handler
if (process.env.NODE_ENV === "production") {
  registerErrorHandler();
}

// Render app into root element
ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);

// Register service worker on web
if (
  process.env.NODE_ENV === "production" &&
  process.env.BUILD_TARGET === "web"
) {
  registerServiceWorker();
}
