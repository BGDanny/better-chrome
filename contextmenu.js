(function () {
    //display lightning icon when hovering over link, click to open the link in a new tab
    let links = document.querySelectorAll("a");
    let show_icon = false;
    const div = document.createElement("div");
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
            let font_size = rect.height;
            if (font_size > 30) {
                font_size = 30;
            }
            div.setAttribute("style", `position:absolute;z-index:999;top:${rect.top + document.documentElement.scrollTop}px;left:${rect.right - 5 + document.documentElement.scrollLeft}px;font-size:${font_size}px;`);
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

    // links = document.querySelectorAll("a");
    // show_icon = false;
    // for (let i = 0; i < links.length; i++) {
    //     links[i].addEventListener("mouseenter", function () {
    //         if (show_icon) {
    //             div.remove();
    //             show_icon = false;
    //         }
    //         let rect = this.getBoundingClientRect();
    //         let font_size = rect.height;
    //         if (font_size > 30) {
    //             font_size = 30;
    //         }
    //         div.setAttribute("style", `position:absolute;z-index:1;top:${rect.top + document.documentElement.scrollTop}px;left:${rect.right - 3 + document.documentElement.scrollLeft}px;font-size:${font_size}px;`);
    //         href.setAttribute("href", this.getAttribute("href"));
    //         div.appendChild(href);
    //         document.body.appendChild(div);
    //         show_icon = true;
    //     });
    //     div.addEventListener("mouseleave", function () {
    //         div.remove();
    //         show_icon = false;
    //     });
    //     document.addEventListener("click", function () {
    //         if (show_icon) {
    //             div.remove();
    //             show_icon = false;
    //         }
    //     })
    // }
})();