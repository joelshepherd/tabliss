// Browser action click event
chrome.browserAction.onClicked.addListener(function () {
  openNewTab();
});

// Extension install event
chrome.runtime.onInstalled.addListener(function (details) {
  if (details && details.reason && details.reason == 'install') {
    openNewTab();
  }
});

function openNewTab() {
  chrome.tabs.create({
    url: 'chrome://newtab',
  });
}
