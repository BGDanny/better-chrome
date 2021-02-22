


chrome.runtime.onInstalled.addListener(function () {
    // tab_playing = [];
    // netease = [];
    let contextMenuItem = {
        "id": "BetterChrome",
        "title": "BetterChrome"
    };
    chrome.contextMenus.create(contextMenuItem);
    // chrome.tabs.query({ audible: true }, function (tabs) {
    //     for (let i = 0; i < tabs.length - 1; i++) {
    //         chrome.scripting.executeScript({
    //             target: { tabId: tabs[i].id },
    //             files: ["media.js"]
    //         });
    //     }
    // });
});

chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "BetterChrome") {
        execute();
    }
});
// chrome.commands.onCommand.addListener(function () {
//     execute();
// });
function execute() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["contextmenu.js"]
        });
    });
}
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     // console.log(sender.tab ?
//     //     "from a content script:" + sender.tab.url :
//     //     "from the extension");
//     if (request.ad === "removeAds") {
//         chrome.scripting.insertCSS({
//             target: {sender.tab.id},
// files:[""]
//         });
//     }
// });
let tab_playing = [];
let muted = [];

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tabInfo) {
    if (changeInfo.audible == true) {
        if (tab_playing.length > 1) {
            tab_playing.shift();
        }
        tab_playing.push(tabId);
        if (tab_playing.length > 1 && tab_playing[0] !== tab_playing[1]) {
            chrome.scripting.executeScript({
                target: { tabId: tab_playing[0] },
                files: ["media.js"]
            });
        }
    }
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
    let muteID = muted.indexOf(activeInfo.tabId);
    if (muteID >= 0) {
        chrome.tabs.update(activeInfo.tabId, { muted: false });
        muted.splice(muteID, 1);
    }
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.mute == true) {
        let muteTabID = tab_playing[0];
        chrome.tabs.update(muteTabID, { muted: true });
        muted.push(muteTabID);
    }
    else if (request.script == true) {
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            files: ["contextmenu.js"]
        });
    }
});

chrome.tabs.onRemoved.addListener(function (tabId) {
    let index = tab_playing.indexOf(tabId);
    while (index >= 0) {
        tab_playing.splice(index, 1);
        index = tab_playing.indexOf(tabId);
    }
});
