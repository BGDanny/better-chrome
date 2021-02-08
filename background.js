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