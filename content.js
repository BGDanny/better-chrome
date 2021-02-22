
//a button for scrolling up to the top
chrome.storage.sync.get("scrollBut", function (data) {
    if (data.scrollBut) {
        const button_up = document.createElement("div");
        button_up.append("\u23EB");
        button_up.setAttribute("style", "position:fixed;bottom:100px;right:100px;cursor: pointer;font-size:60px;z-index:999;opacity:0.5;")
        const cancel_button = document.createElement("button");
        cancel_button.append("X");
        cancel_button.setAttribute("style", "position:fixed;bottom:165px;right:90px;border-radius:50%;cursor:pointer;z-index:999;opacity:0.5;");
        cancel_button.setAttribute("id", "cancel");
        document.addEventListener("scroll", function () {
            if (document.documentElement.scrollTop > 2000) {
                document.documentElement.appendChild(button_up);
                document.documentElement.appendChild(cancel_button);
            }
            else {
                button_up.remove();
                cancel_button.remove();
            }
        });
        button_up.addEventListener("click", function () {
            window.scrollTo(0, 0);
        });
        cancel_button.addEventListener("click", function () {
            button_up.remove();
            cancel_button.remove();
            button_up.setAttribute("style", "display:none;");
            cancel_button.setAttribute("style", "display:none;");
        });
    }

});


//remove google ads
const ads1 = document.getElementById("taw");
if (ads1 && document.URL.indexOf("google")) {
    ads1.remove();
}

document.documentElement.addEventListener("auxclick", function (e) {
    if (e.button === 1) {
        chrome.runtime.sendMessage({ script: true });
    }
});


