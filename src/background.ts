import browser from "webextension-polyfill";

if (BUILD_TARGET === "chromium") {
  const openNewTab = () => browser.tabs.create({ url: "chrome://newtab" });

  // Browser action click event
  browser.browserAction.onClicked.addListener(openNewTab);

  // Extension install event
  browser.runtime.onInstalled.addListener((details) => {
    if (details && details.reason && details.reason == "install") openNewTab();
  });
}
