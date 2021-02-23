chrome.runtime.onInstalled.addListener(function () {
    let contextMenuItem = {
        "id": "BetterChrome",
        "title": "Open links in new tab",
        "contexts": ["link"]
    };
    chrome.contextMenus.create(contextMenuItem);
    chrome.storage.sync.set({ newTab: true, scrollBut: true, pause: true, radio1: true, radio2: false });
});
// action when context menu is clicked
chrome.contextMenus.onClicked.addListener(function (clickData, tab) {
    if (clickData.menuItemId == "BetterChrome") {
        chrome.tabs.create({ url: clickData.linkUrl, index: tab.index + 1 });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["contextmenu.js"]
        });
    }
});
// detect when a tab is audible
let tab_playing;
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tabInfo) {
    if (changeInfo.audible == true) {
        if (tab_playing != undefined && tabID != tab_playing) {
            chrome.scripting.executeScript({
                target: { tabId: tab_playing },
                files: ["media.js"]
            });
        }
        tab_playing = tabId;
    }
});
// listen to messages from content scripts and injected scripts
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.mute == true) {
        let muteTabID = sender.tab.id;
        chrome.tabs.update(muteTabID, { muted: true });
    }
    else if (request.mute == false) {
        let muteTabID = sender.tab.id;
        chrome.tabs.update(muteTabID, { muted: false });
    }
    else if (request.script == true) {
        chrome.storage.sync.get("newTab", function (data) {
            if (data.newTab) {
                chrome.scripting.executeScript({
                    target: { tabId: sender.tab.id },
                    files: ["contextmenu.js"]
                });
            }
        });
    }
});


