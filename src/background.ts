function openNewTab() {
  chrome.tabs.create({
    url: "chrome://newtab",
  });
}

if (process.env.BUILD_TARGET === "chromium") {
  // Browser action click event
  chrome.browserAction.onClicked.addListener(openNewTab);

  // Extension install event
  chrome.runtime.onInstalled.addListener((details) => {
    if (details && details.reason && details.reason == "install") openNewTab();
  });
}
