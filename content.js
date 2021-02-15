(function () {
    "use strict";
    //display lightning icon when hovering over link, click to open the link in a new tab
    let links = document.querySelectorAll("a");
    let show_icon = false;
    const div = document.createElement("div");
    div.id = "div1";
    const href = document.createElement("a");
    href.setAttribute("target", "_blank");
    href.append("\u26A1");
    href.id = "lightning";
    href.setAttribute("style", "text-decoration:none;");
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("mouseenter", function () {
            if (show_icon) {
                div.remove();
                show_icon = false;
            }
            let rect = this.getBoundingClientRect();
            console.log(rect.top);
            console.log(document.documentElement.scrollTop);
            div.setAttribute("style", `position:absolute;z-index:1;top:${rect.top + document.documentElement.scrollTop}px;left:${rect.right - 5 + document.documentElement.scrollLeft}px;font-size:30px;`);
            href.setAttribute("href", this.getAttribute("href"));
            div.appendChild(href);
            document.body.appendChild(div);
            show_icon = true;
        });
        div.addEventListener("mouseleave", function () {
            div.remove();
            show_icon = false;
        });
        document.addEventListener("click", function () {
            if (show_icon) {
                div.remove();
                show_icon = false;
            }
        })
    }
    //a button for scrolling up to the top
    const button_up = document.createElement("div");
    button_up.append("\u23EB");
    button_up.setAttribute("style", "position:fixed;bottom:100px;right:100px;cursor: pointer;font-size:60px;z-index:1;opacity:0.5;")
    const cancel_button = document.createElement("button");
    cancel_button.append("X");
    cancel_button.setAttribute("style", "position:fixed;bottom:165px;right:90px;border-radius:50%;cursor:pointer;z-index:1;opacity:0.5;");
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
    })
    //remove google ads
    const ads1 = document.getElementById("taw");
    if (ads1 && document.URL.indexOf("google")) {
        ads1.remove();
    }
    //pause previous video when a new video is played
    const video = document.querySelectorAll("video");

    for (let i = 0; i < video.length; i++) {
        video[i].addEventListener("playing", function () {
            if (!video[i].muted) {
                console.log("playing");
                chrome.runtime.sendMessage({ video: "playing", id: i });
            }

        });
        // video[i].addEventListener("ended", function () {
        //     chrome.runtime.sendMessage({ video: "ended", id: i });
        // })
    }
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.pause === true) {
            console.log(request.id);
            video[request.id].pause();
        }
    });

    document.documentElement.addEventListener("auxclick", function (e) {
        if (e.button === 1) {
            chrome.runtime.sendMessage({ script: true });
        }
    });

})();