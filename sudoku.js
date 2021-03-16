let sudoku = document.createElement("iframe");
sudoku.setAttribute("src", "//widget.websudoku.com/?level=1");
sudoku.setAttribute("style", "width:200px;height:260px;position:fixed;bottom:160px;right:30px;z-index:999")
sudoku.setAttribute("scrolling", "no");
sudoku.setAttribute("frameborder", "0");
document.documentElement.appendChild(sudoku);
