import React from "react";
import { createRoot } from "react-dom/client";
import { migrate } from "./db/migrate";
import { register as registerErrorHandler } from "./errorHandler";
import { register as registerServiceWorker } from "./serviceWorker";
import Root from "./views/Root";

// React 18 typescript support
import type {} from "react/next";
import type {} from "react-dom/next";

// Register error handler
if (!DEV) {
  registerErrorHandler();
}

// Check and migrate data
migrate();

// Render app into root element
createRoot(document.getElementById("root")!).render(<Root />);

// Register service worker on web
if (!DEV && BUILD_TARGET === "web") {
  registerServiceWorker();
}
