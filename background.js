chrome.runtime.onInstalled.addListener(function () {
    let contextMenuItem = {
        id: "BetterChrome",
        title: "Search Google for link content",
        contexts: ["link"]
    };
    chrome.contextMenus.create(contextMenuItem);
    chrome.storage.sync.set({ newTab: true, scrollBut: true, pause: true, radio1: true, radio2: false });
    chrome.action.setBadgeBackgroundColor({ color: "#FF0000" });
});
// action when context menu is clicked
chrome.contextMenus.onClicked.addListener(function (clickData, tab) {
    if (clickData.menuItemId == "BetterChrome") {
        chrome.storage.sync.get("contextMenu", function (data) {
            chrome.tabs.create({ url: `https://www.google.com/search?q=${data.contextMenu}`, index: tab.index + 1 });
            chrome.storage.sync.remove("contextMenu");
        });
    }
});
// detect when a tab is audible
let tab_playing;
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tabInfo) {
    if (changeInfo.audible == true) {
        if (typeof tab_playing != "undefined" && tabId != tab_playing) {
            chrome.scripting.executeScript({
                target: { tabId: tab_playing },
                files: ["media.js"]
            });
        }
        tab_playing = tabId;
    }
});

let intervalID = null;
let popupText = [];

// listen to messages from content scripts and injected scripts
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.mute == true) {
        let muteTabID = sender.tab.id;
        chrome.tabs.update(muteTabID, { muted: true });
    } else if (request.mute == false) {
        let muteTabID = sender.tab.id;
        chrome.tabs.update(muteTabID, { muted: false });
    } else if (request.optionPage == "running") {
        if (intervalID != null) {
            clearInterval(intervalID);
        }
    }
});

chrome.tabs.onRemoved.addListener(function (tabId) {
    chrome.storage.sync.get(function (data) {
        if (data.optionID == tabId) {
            intervalID = setInterval(() => {
                let arrayCopy = data.reminder;
                for (let i = 0; i < arrayCopy.length; i++) {
                    if (arrayCopy[i].timestamp <= Date.now() && arrayCopy[i].pending) {
                        arrayCopy[i].pending = false;
                        popupText.push(arrayCopy[i].text);
                    }
                }
                console.log("1");
                if (popupText.length != 0) {
                    console.log("2");
                    chrome.action.setBadgeText({ text: popupText.length.toString() });
                }
                chrome.storage.sync.set({ reminder: arrayCopy });
            }, 10000);
        }
    });
});





