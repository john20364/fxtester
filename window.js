function Window (width, height) {
    let canvas = document.lastChild.appendChild(
        document.createElement('canvas'));
    let bkgndcolor = 0;

    let ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    ctx.fillRect(0, 0, width, height);
    
    Window.prototype.bkgndcolor = function (r,g,b) {
        bkgndcolor = colorToHexStr(r,g,b);
        ctx.fillStyle = bkgndcolor;
        ctx.fillRect(0, 0, width, height);
    }
}