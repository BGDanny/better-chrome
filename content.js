let links = document.getElementsByTagName("a");
let show_icon = false;
const div = document.createElement("div");
const href = document.createElement("a");
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("mouseenter", function (event) {
        if (show_icon) {
            document.documentElement.removeChild(div);
            show_icon = false;
        }
        div.setAttribute("style", `position:fixed;z-index:1;top:${event.clientY - 20}px;left:${event.clientX + 20}px;width:80px;height:80px;font-size:20px;`);
        href.setAttribute("href", links[i].getAttribute("href"));
        href.setAttribute("target", "_blank");
        if (href.textContent !== "\u26A1") {
            href.append("\u26A1");
        }
        div.appendChild(href);
        document.documentElement.appendChild(div);
        show_icon = true;

    });
    div.addEventListener("mouseleave", function () {
        div.remove();
        show_icon = false;
    });
    // links[i].addEventListener("mouseleave", function () {
    //     setTimeout(function () {
    //         if (!hover[i]) {
    //             div.removeChild(href);
    //         }
    //     }, 500);

    // });
}