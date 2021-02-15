(function () {
    "use strict";
    //display lightning icon when hovering over link, click to open the link in a new tab
    let links = document.querySelectorAll("a");
    let show_icon = false;
    let div1 = document.getElementById("div1");
    if (div1) {
        div1.parentNode.removeChild(div1);
    }
    const div = document.createElement("div");
    const href = document.createElement("a");
    href.setAttribute("target", "_blank");
    href.append("\u26A1");
    href.id = "lightning";
    href.setAttribute("style", "text-decoration:none;");
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("mouseenter", function (event) {
            if (show_icon) {
                div.remove();
                show_icon = false;
            }
            let rect = this.getBoundingClientRect();
            div.setAttribute("style", `position:fixed;z-index:1;top:${rect.top - 5}px;left:${rect.right + 5}px;font-size:30px;`);
            href.setAttribute("href", this.getAttribute("href"));
            div.appendChild(href);
            document.documentElement.appendChild(div);
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
})();