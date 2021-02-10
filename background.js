chrome.runtime.onInstalled.addListener(function () {
    let contextMenuItem = {
        "id": "BetterChrome",
        "title": "BetterChrome"
    };
    chrome.contextMenus.create(contextMenuItem);
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