import { BackgroundService } from "./types";
import { BookmarkService } from "./services/bookmarks";
import { WorkHoursService } from "./services/workhours";

const services: BackgroundService[] = [
  new BookmarkService(),
  new WorkHoursService(),
];

// Initialize all services
for (const svc of services) {
  try {
    void svc.init();
  } catch (e) {
    console.warn("Service init failed:", e);
  }
}

// Centralized message dispatcher
browser.runtime.onMessage.addListener(async (message, sender) => {
  for (const svc of services) {
    const res = await svc.onMessage(message, sender);
    if (typeof res !== "undefined") {
      return res;
    }
  }
  return true;
});
