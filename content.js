let links = document.getElementsByTagName("a");
for (let i = 0; i < links.length; i++) {
    if (!links[i].getAttribute("href").startsWith("#")) {
        links[i].setAttribute("target", "_blank");
    }
}