/* eslint-disable no-undef */
chrome.action.disable();
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        // console.log(tab.url);
        // if tab url contains linkedin
        if (tab.url.includes("linkedin")) {
            // console.log("enable");
            chrome.action.enable(tabId);
        } else {
            // console.log("disable");
            chrome.action.disable(tabId);
        }
    }
});
