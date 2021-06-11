// generate table from storage
const tbody = document.getElementById("tbody");
function compare(a, b) {
    if (a.timestamp < b.timestamp) {
        return -1;
    }
    if (a.timestamp > b.timestamp) {
        return 1;
    }
    return 0;
}
chrome.storage.sync.get("reminder", function (data) {
    let sortedReminder = data.reminder.sort(compare);
    for (let i = 0; i < sortedReminder.length; i++) {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.setAttribute("scope", "row");
        th.textContent = i + 1;
        let date_time = document.createElement("td");
        date_time.textContent = new Date(data.reminder[i].timestamp);
        let content = document.createElement("td");
        content.textContent = data.reminder[i].text;
        let status = document.createElement("td");
        if (!data.reminder[i].pending) {
            status.innerHTML = "&#x2705Resolved";
        }
        else {
            status.innerHTML = "&#x2B55Pending";
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
        action.appendChild(deleteBut);
        tr.appendChild(th);
        tr.appendChild(date_time);
        tr.appendChild(content);
        tr.appendChild(status);
        tr.appendChild(action);
        tbody.appendChild(tr);
    }
});

// switches
const newTab = document.getElementById("newTab");
const scrollBut = document.getElementById("scroll");
const pause = document.getElementById("pause");
const radio1 = document.getElementById("radio1");
const radio2 = document.getElementById("radio2");
chrome.storage.sync.get(function (data) {
    newTab.checked = data.newTab;
    scrollBut.checked = data.scrollBut;
    pause.checked = data.pause;
    radio1.checked = data.radio1;
    radio2.checked = data.radio2;
    if (radio1.checked) {
        form2.setAttribute("style", "display:none");
    }
    else {
        form1.setAttribute("style", "display:none");
    }
});
newTab.addEventListener("input", function () {
    chrome.storage.sync.set({ newTab: newTab.checked });
});
scrollBut.addEventListener("input", function () {
    chrome.storage.sync.set({ scrollBut: scrollBut.checked });
});
pause.addEventListener("input", function () {
    chrome.storage.sync.set({ pause: pause.checked });
});

// pick time for reminder
const dateInput = document.getElementById("dateInput");
const content = document.getElementById("content");
const form1 = document.getElementById("form1");
form1.addEventListener("submit", function () {
    const date1 = new Date(dateInput.value);
    chrome.storage.sync.get({ reminder: [] }, function (data) {
        let remind = data.reminder;
        let futureTimestamp = Date.parse(date1);
        let pending;
        if (Date.now() > futureTimestamp) {
            pending = false;
        }
        else {
            pending = true;
        }
        remind.push({ timestamp: futureTimestamp, text: content.value, pending });
        chrome.storage.sync.set({ reminder: remind });
    });
});

// countdown for reminder
const day = document.getElementById("day");
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const contentCountdown = document.getElementById("contentCountdown");
const form2 = document.getElementById("form2");
form2.addEventListener("submit", function () {
    let addTime = day.value * 24 * 3600 * 1000 + hour.value * 3600 * 1000 + minute.value * 60 * 1000 + second.value * 1000;
    chrome.storage.sync.get({ reminder: [] }, function (data) {
        let remind = data.reminder;
        remind.push({ timestamp: Date.now() + addTime, text: contentCountdown.value, pending: true });
        chrome.storage.sync.set({ reminder: remind });
    });
});

//display one of the two input fields
radio1.addEventListener("change", function () {
    form2.setAttribute("style", "display:none");
    form1.removeAttribute("style");
    chrome.storage.sync.set({ radio1: true, radio2: false });
});
radio2.addEventListener("change", function () {
    form1.setAttribute("style", "display:none");
    form2.removeAttribute("style");
    chrome.storage.sync.set({ radio2: true, radio1: false });
});

const refresh = document.getElementById("refresh");
refresh.addEventListener("click", function () {
    chrome.tabs.query({}, function (tabs) {
        for (let i = 0; i < tabs.length; i++) {
            chrome.tabs.reload(tabs[i].id);
        }
    });
});

let focused = true;
window.addEventListener("focus", () => {
    focused = true;
});
window.addEventListener("blur", () => {
    focused = false;
});

const port = chrome.runtime.connect({ name: "option" });

let intervalID = setInterval(() => {
    chrome.storage.sync.get({ reminder: [] }, function (data) {
        let arrayCopy = data.reminder;
        for (let i = 0; i < arrayCopy.length; i++) {
            if (arrayCopy[i].timestamp <= Date.now() && arrayCopy[i].pending) {
                let notifOptions = {
                    type: "basic",
                    iconUrl: "images/d128.png",
                    title: "Reminder",
                    message: arrayCopy[i].text
                };
                chrome.notifications.create(notifOptions);
                if (!focused) {
                    location.reload();
                }
                arrayCopy[i].pending = false;
            }
        }
        chrome.storage.sync.set({ reminder: arrayCopy });
    });
}, 1000);



