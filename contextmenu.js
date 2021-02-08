links = document.querySelectorAll("a");
show_icon = false;
// href.setAttribute("target", "_blank");
// href.id = "lightning";
// href.setAttribute("style", "text-decoration:none;");
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("mouseenter", function (event) {
        if (show_icon) {
            div.remove();
            show_icon = false;
        }
        div.setAttribute("style", `position:fixed;z-index:1;top:${event.clientY - 30}px;left:${event.clientX + 30}px;font-size:30px;`);
        href.setAttribute("href", links[i].getAttribute("href"));
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