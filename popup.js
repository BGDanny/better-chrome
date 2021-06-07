chrome.runtime.sendMessage({ popup: "running" }, function (message) {
    const msg = document.getElementById("msg");
    let msgNum = message.msgCount;
    if (msgNum === 1) {
        msg.textContent = `You have 1 new message in the option page`;
    } else if (msgNum > 1) {
        msg.textContent = `You have ${msgNum} new messages in the option page`;
    }
    const title_field = document.getElementById("title");
    title_field.placeholder = message.title;
    const changeTitle = document.getElementById("changeTitle");
    changeTitle.addEventListener("click", function () {
        chrome.tabs.sendMessage(message.id, { title: title_field.value });
    });
});

let sudoku = document.getElementById("sudoku");
function sudokuPop() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["sudoku.js"]
        });
    });
}
sudoku.addEventListener("click", sudokuPop);

