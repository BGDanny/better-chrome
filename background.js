// TODO: drag; add React
chrome.runtime.onInstalled.addListener(function () {
    let contextMenuItem = {
        id: "BetterChrome",
        title: "Search Google for link content",
        contexts: ["link"]
    };
    chrome.contextMenus.create(contextMenuItem);
    chrome.storage.sync.set({ newTab: true, scrollBut: true, pause: true, radio1: true, radio2: false, message: 0 });
    chrome.storage.local.set({ tab_playing: -1, optionPort: null });
    chrome.action.setBadgeBackgroundColor({ color: "#f54748" });
    chrome.alarms.create("reminder", { periodInMinutes: 0.1 });
});

// action when context menu is clicked
chrome.contextMenus.onClicked.addListener(function (clickData, tab) {
    if (clickData.menuItemId == "BetterChrome") {
        chrome.storage.local.get("contextMenu", function (data) {
            chrome.tabs.create({ url: `https://www.google.com/search?q=${data.contextMenu}`, index: tab.index + 1 });
        });
    }
});

// detect when a tab is audible
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tabInfo) {
    if (changeInfo.audible === true) {
        chrome.storage.local.get("tab_playing", data => {
            if (data.tab_playing !== -1 && tabId !== data.tab_playing) {
                chrome.scripting.executeScript({
                    target: { tabId: data.tab_playing },
                    files: ["media.js"]
                });
            }
            chrome.storage.local.set({ tab_playing: tabId });
        });
    }
});

// listen to messages from content scripts and injected scripts
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.mute === true) {
        let muteTabID = sender.tab.id;
        chrome.tabs.update(muteTabID, { muted: true });
    } else if (request.mute === false) {
        let muteTabID = sender.tab.id;
        chrome.tabs.update(muteTabID, { muted: false });
    } else if (request.popup === "running") {
        chrome.action.getBadgeText({}).then(text => {
            let msgNum = parseInt(text);
            chrome.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
                sendResponse({ title: tabs[0].title, id: tabs[0].id, msgCount: msgNum });
            }).catch(error => console.error(error));
        });
    }
    return true;
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "reminder") {
        chrome.storage.sync.get({ reminder: [] }, function (data) {
            let arrayCopy = data.reminder;
            let counter = 0;
            for (let i = 0; i < arrayCopy.length; i++) {
                if (arrayCopy[i].timestamp <= Date.now() && arrayCopy[i].pending) {
                    counter++;
                }
            }
            if (counter > 0) {
                chrome.action.setBadgeText({ text: counter.toString() });
            }
        });
    }
});

chrome.runtime.onConnect.addListener(port => {
    if (port.name === "option") {
        chrome.action.setBadgeText({ text: "" });
        chrome.alarms.clear("reminder", wasCleared => {
            if (!wasCleared) {
                console.error("Clearing alarm failed");
            }
        });
        let intervalID = setInterval(() => {
            chrome.storage.sync.get({ reminder: [] }, function (data) {
                let arrayCopy = data.reminder;
                for (let i = 0; i < arrayCopy.length; i++) {
                    if (arrayCopy[i].timestamp <= Date.now() && arrayCopy[i].pending) {
                        port.postMessage({ text: arrayCopy[i].text })
                        arrayCopy[i].pending = false;
                    }
                }
                chrome.storage.sync.set({ reminder: arrayCopy });
            });
        }, 1000);
        port.onDisconnect.addListener(() => {
            clearInterval(intervalID);
            chrome.alarms.create("reminder", { periodInMinutes: 0.1 });
        });
    }
});





