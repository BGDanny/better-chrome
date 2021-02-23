const tbody = document.getElementById("tbody");
chrome.storage.sync.get("reminder", function (data) {
    for (let i = 0; i < data.reminder.length; i++) {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.setAttribute("scope", "row");
        th.textContent = i + 1;
        let date_time = document.createElement("td");
        date_time.textContent = new Date(data.reminder[i].timestamp);
        let content = document.createElement("td");
        content.textContent = data.reminder[i].text;
        let status = document.createElement("td");
        if (Date.now() > data.reminder[i].timestamp) {
            status.textContent = "Resolved";
        }
        else {
            status.textContent = "Pending";
        }
        let action = document.createElement("td");
        let deleteBut = document.createElement("button");
        deleteBut.setAttribute("type", "button");
        deleteBut.setAttribute("class", "btn btn-outline-danger");
        deleteBut.setAttribute("style", "color:black;")
        deleteBut.textContent = "Delete";
        deleteBut.addEventListener("click", function () {
            let updated_reminder = data.reminder;
            updated_reminder.splice(i, 1);
            chrome.storage.sync.set({ reminder: updated_reminder }, function () {
                location.reload();
            });
        });
        let archiveBut = document.createElement("button");
        archiveBut.setAttribute("type", "button");
        archiveBut.setAttribute("class", "btn btn-outline-success");
        archiveBut.setAttribute("style", "color:black;margin-left:10px;")
        archiveBut.textContent = "Archive";
        archiveBut.addEventListener("click", function () {

        });
        action.appendChild(deleteBut);
        action.appendChild(archiveBut);
        tr.appendChild(th);
        tr.appendChild(date_time);
        tr.appendChild(content);
        tr.appendChild(status);
        tr.appendChild(action);
        tbody.appendChild(tr);
    }
});
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
// let notifOptions = {
//     type: "basic",
//     iconUrl: "images/d128.png",
//     title: "Total reset",
//     message: "reset"
// };

// setTimeout(() => {
//     chrome.notifications.create(notifOptions);
// }, 10000);
// window.addEventListener('beforeunload', (event) => {
//     // Cancel the event as stated by the standard.
//     event.preventDefault();
//     // Older browsers supported custom message
//     event.returnValue = '';
// });
const dateInput = document.getElementById("dateInput");
const content = document.getElementById("content");
const submit = document.getElementById("submit");
submit.addEventListener("click", function () {
    if (dateInput.value.length > 0 && content.value.length > 0) {
        const date1 = new Date(dateInput.value);
        chrome.storage.sync.get({ reminder: [] }, function (data) {
            let remind = data.reminder;
            remind.push({ timestamp: Date.parse(date1), text: content.value });
            chrome.storage.sync.set({ reminder: remind });
        });
    }
});


