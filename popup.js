const refresh = document.getElementById("refresh");
refresh.addEventListener("click", function () {
    chrome.tabs.query({}, function (tabs) {
        for (let i = 0; i < tabs.length; i++) {
            chrome.tabs.reload(tabs[i].id);
        }
    });
})