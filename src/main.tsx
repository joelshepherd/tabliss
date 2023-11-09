import React from "react";
import { createRoot } from "react-dom/client";
import { register as registerServiceWorker } from "./serviceWorker";
import Root from "./views/Root";

// Render app into root element
createRoot(document.getElementById("root")!).render(<Root />);

// Register service worker on web
if (!DEV && BUILD_TARGET === "web") {
  registerServiceWorker();
}
