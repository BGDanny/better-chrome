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
//a button for scrolling up to the top
const button_up = document.createElement("div");
button_up.append("\u23EB");
button_up.setAttribute("style", "position:fixed;bottom:100px;right:100px;cursor: pointer;font-size:60px;z-index:1;")
const cancel_button = document.createElement("button");
cancel_button.append("X");
cancel_button.setAttribute("style", "position:fixed;bottom:165px;right:90px;border-radius:50%;cursor:pointer;z-index:1;");
cancel_button.setAttribute("id", "cancel");
document.addEventListener("scroll", function () {
    document.documentElement.appendChild(button_up);
    document.documentElement.appendChild(cancel_button);
});
button_up.addEventListener("click", function () {
    window.scrollTo(0, 0);
});
cancel_button.addEventListener("click", function () {
    button_up.remove();
    cancel_button.remove();
})


