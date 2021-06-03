chrome.runtime.sendMessage({ popup: "running" }, function (message) {
    // const msg = document.getElementById("msg");
    // let msgNum = message.popupText.length;
    // if (msgNum == 1) {
    //     msg.textContent = `You have 1 new message`;
    // } else if (msgNum > 1) {
    //     msg.textContent = `You have ${msgNum} new messages`;
    // }
    // for (let i = 0; i < msgNum; i++) {
    //     const table1 = document.getElementById("table1");
    //     let tr = document.createElement("tr");
    //     let td = document.createElement("td");
    //     td.textContent = message.popupText[i];
    //     tr.appendChild(td);
    //     table1.appendChild(tr);
    // }
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

