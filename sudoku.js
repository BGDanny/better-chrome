(function () {
    let sudoku = document.createElement("iframe");
    sudoku.setAttribute("src", "//widget.websudoku.com/?level=1");
    sudoku.setAttribute("style", "width:200px;height:260px;position:fixed;bottom:160px;right:30px;z-index:999")
    sudoku.setAttribute("scrolling", "no");
    sudoku.setAttribute("frameborder", "0");
    document.documentElement.appendChild(sudoku);
    let hideButton = document.createElement("button");
    hideButton.setAttribute("type", "button");
    hideButton.textContent = ">";
    hideButton.setAttribute("style", "position:fixed;right:230px;bottom:400px;")
    document.documentElement.appendChild(hideButton);
    let showButton = document.createElement("button");
    showButton.setAttribute("type", "button");
    showButton.textContent = "<";
    showButton.setAttribute("style", "display:none;");
    document.documentElement.appendChild(showButton);
    hideButton.addEventListener("click", function () {
        sudoku.setAttribute("style", "display:none");
        hideButton.setAttribute("style", "display:none");
        showButton.setAttribute("style", "position:fixed;right:0px;bottom:400px;");
    });
    showButton.addEventListener("click", function () {
        sudoku.setAttribute("style", "width:200px;height:260px;position:fixed;bottom:160px;right:30px;z-index:999");
        hideButton.setAttribute("style", "position:fixed;right:230px;bottom:400px;");
        showButton.setAttribute("style", "display:none");
    });
})();
