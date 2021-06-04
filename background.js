// TODO: Debug autopause; popup message; drag
chrome.runtime.onInstalled.addListener(function () {
    let contextMenuItem = {
        id: "BetterChrome",
        title: "Search Google for link content",
        contexts: ["link"]
    };
    chrome.contextMenus.create(contextMenuItem);
    chrome.storage.sync.set({ newTab: true, scrollBut: true, pause: true, radio1: true, radio2: false, message: 0 });
    chrome.storage.local.set({ tab_playing: -1 });
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
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tabInfo) {
    if (changeInfo.audible === true) {
        chrome.storage.local.get("tab_playing", data => {
            if (data.tab_playing !== -1 && tabId !== data.tab_playing) {
                console.log(tabInfo.title);
                chrome.scripting.executeScript({
                    target: { tabId: data.tab_playing },
                    files: ["media.js"]
                });
            }
            chrome.storage.local.set({ tab_playing: tabId });
        });
    }
});

// let intervalID = null;
// let popupText = [];

// listen to messages from content scripts and injected scripts
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.mute === true) {
        let muteTabID = sender.tab.id;
        chrome.tabs.update(muteTabID, { muted: true });
    } else if (request.mute === false) {
        let muteTabID = sender.tab.id;
        chrome.tabs.update(muteTabID, { muted: false });
        // } else if (request.optionPage == "running") {
        //     if (intervalID != null) {
        //         clearInterval(intervalID);
        //     }
    } else if (request.popup === "running") {
        // sendResponse({ popupText });
        // chrome.action.setBadgeText({ text: "" });
        // chrome.storage.sync.set({ message: 0 }, function () {
        //     popupText = [];
        // });
        console.log("running");
        chrome.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
            sendResponse({ title: tabs[0].title, id: tabs[0].id });
        }).catch(error => console.log(error));
    }
    return true;
});

// chrome.tabs.onRemoved.addListener(function (tabId) {
//     if (tabId === tab_playing) {
//         tab_playing = -1;
//     }
//     // chrome.storage.sync.get(function (data) {
//     //     if (data.optionID == tabId) {
//     //         intervalID = setInterval(() => {
//     //             let arrayCopy = data.reminder;
//     //             for (let i = 0; i < arrayCopy.length; i++) {
//     //                 if (arrayCopy[i].timestamp <= Date.now() && arrayCopy[i].pending) {
//     //                     arrayCopy[i].pending = false;
//     //                     popupText.push(arrayCopy[i].text);
//     //                 }
//     //             }
//     //             let messageLength = popupText.length;
//     //             if (messageLength != data.message && messageLength > 0) {
//     //                 chrome.action.setBadgeText({ text: messageLength.toString() });
//     //             }
//     //             chrome.storage.sync.set({ reminder: arrayCopy, message: messageLength });
//     //         }, 10000);
//     //     }
//     // });
// });





