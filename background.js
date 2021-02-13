(function () {
    "use strict";
    let tab_playing = [];
    let video_playing = [];
    chrome.runtime.onInstalled.addListener(function () {
        let contextMenuItem = {
            "id": "BetterChrome",
            "title": "BetterChrome"
        };
        chrome.contextMenus.create(contextMenuItem);
        tab_playing = [];
        video_playing = [];
    })


    chrome.contextMenus.onClicked.addListener(function (clickData) {
        if (clickData.menuItemId === "BetterChrome") {
            execute();
        }
    });
    chrome.commands.onCommand.addListener(function () {
        execute();
    });
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


    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.video === "playing") {
            tab_playing.push(sender.tab.id);
            video_playing.push(request.id);
            if (tab_playing.length > 1 && sender.tab.id === tab_playing[tab_playing.length - 2] && request.id === video_playing[tab_playing.length - 2]) {
                tab_playing.pop();
                video_playing.pop();
            }
            if (tab_playing.length > 1) {
                chrome.tabs.sendMessage(tab_playing[tab_playing.length - 2], { pause: "true", id: video_playing[tab_playing.length - 2] });
            }
        }
        // else if (request.video === "ended") {
        //     let index = tab_playing.indexOf(sender.tab.id);
        //     while (index) {
        //         tab_playing.splice(index, 1);
        //         video_playing.splice(index, 1);
        //         index = tab_playing.indexOf(tabId);
        //     }
        // }
    });
    chrome.tabs.onRemoved.addListener(function (tabId) {

        let index = tab_playing.indexOf(tabId);
        while (index >= 0) {
            tab_playing.splice(index, 1);
            video_playing.splice(index, 1);
            index = tab_playing.indexOf(tabId);
        }
    });

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tabInfo) {
        console.log(tabId);
        console.log(changeInfo);
        console.log(tabInfo);
    })

})();