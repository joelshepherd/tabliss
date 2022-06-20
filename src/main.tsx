import React from "react";
import { createRoot } from "react-dom/client";
import { register as registerErrorHandler } from "./errorHandler";
import { register as registerServiceWorker } from "./serviceWorker";
import Root from "./views/Root";

// Register error handler
if (!DEV) {
  registerErrorHandler();
}

// Render app into root element
createRoot(document.getElementById("root")!).render(<Root />);

// Register service worker on web
if (!DEV && BUILD_TARGET === "web") {
  registerServiceWorker();
}
