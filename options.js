const newTab = document.getElementById("newTab");
const scrollBut = document.getElementById("scroll");
const pause = document.getElementById("pause");
chrome.storage.sync.get(function (data) {
    newTab.checked = data.newTab;
    scrollBut.checked = data.scrollBut;
    pause.checked = data.pause;
})
newTab.addEventListener("input", function () {
    chrome.storage.sync.set({ newTab: newTab.checked });
});
scrollBut.addEventListener("input", function () {
    chrome.storage.sync.set({ scrollBut: scrollBut.checked });
});
pause.addEventListener("input", function () {
    chrome.storage.sync.set({ pause: pause.checked });
});