function FTViewManager () {
    FTViewManager.prototype.drawWindows = function (viewdata, viewmodel) {

        // Both windows are visible
        if (!viewmodel.isFullscreenByIndex(0) && !viewmodel.isFullscreenByIndex(1)) {
            for (let i=0; i<2; i++) {
                viewdata.window[i].canvas.style.width = (window.innerWidth / 2)+"px";
                viewdata.window[i].canvas.width = window.innerWidth / 2;
                if (viewmodel.isSubwindowIndex(i)) {
                    viewdata.window[i].canvas.style.height = "500px";
                    viewdata.window[i].canvas.height = 500;

                    viewdata.subwindow[i].canvas.style.width = 
                        (window.innerWidth / 2)+"px";
                    viewdata.subwindow[i].canvas.width = window.innerWidth / 2;
                    viewdata.subwindow[i].canvas.style.height = "100px";
                    viewdata.subwindow[i].canvas.height = 100;

                    viewdata.subwindow[i].context = 
                        setupCanvas(viewdata.subwindow[i].canvas);
                } else {
                    viewdata.window[i].canvas.style.height = "600px";
                    viewdata.window[i].canvas.height = 600;

                    viewdata.subwindow[i].canvas.style.width = "0px";
                    viewdata.subwindow[i].canvas.width = 0;
                    viewdata.subwindow[i].canvas.style.height = "0px";
                    viewdata.subwindow[i].canvas.height = 0;
                }

                viewdata.window[i].context = 
                    setupCanvas(viewdata.window[i].canvas);
            }
        } else if (viewmodel.isFullscreenByIndex(0)) {
            viewdata.window[0].canvas.style.width = (window.innerWidth)+"px";
            viewdata.window[0].canvas.width = window.innerWidth;
            viewdata.window[1].canvas.style.width = "0px";
            viewdata.window[1].canvas.width = 0;

            if (viewmodel.isSubwindowIndex(0)) {
                viewdata.window[0].canvas.style.height = "500px";
                viewdata.window[0].canvas.height = 500;

                viewdata.subwindow[0].canvas.style.width = (window.innerWidth)+"px";
                viewdata.subwindow[0].canvas.width = window.innerWidth;
                viewdata.subwindow[1].canvas.style.width = "0px";
                viewdata.subwindow[1].canvas.width = 0;

                viewdata.subwindow[0].canvas.style.height = "100px";
                viewdata.subwindow[0].canvas.height = 100;
                viewdata.subwindow[1].canvas.style.height = "0px";
                viewdata.subwindow[1].canvas.height = 0;

                viewdata.subwindow[0].context =
                    setupCanvas(viewdata.subwindow[0].canvas);

            } else {
                viewdata.window[0].canvas.style.height = "600px";
                viewdata.window[0].canvas.height = 600;

                viewdata.subwindow[0].canvas.style.width = "0px";
                viewdata.subwindow[0].canvas.width = 0;
                viewdata.subwindow[1].canvas.style.width = "0px";
                viewdata.subwindow[1].canvas.width = 0;

                viewdata.subwindow[0].canvas.style.height = "0px";
                viewdata.subwindow[0].canvas.height = 0;
                viewdata.subwindow[1].canvas.style.height = "0px";
                viewdata.subwindow[1].canvas.height = 0;
            }
            
            viewdata.window[0].context = 
                setupCanvas(viewdata.window[0].canvas);

        } else if (viewmodel.isFullscreenByIndex(1)) {
            viewdata.window[1].canvas.style.width = (window.innerWidth)+"px";
            viewdata.window[1].canvas.width = window.innerWidth;
            viewdata.window[0].canvas.style.width = "0px";
            viewdata.window[0].canvas.width = 0;

            if (viewmodel.isSubwindowIndex(1)) {
                viewdata.window[1].canvas.style.height = "500px";
                viewdata.window[1].canvas.height = 500;

                viewdata.subwindow[1].canvas.style.width = (window.innerWidth)+"px";
                viewdata.subwindow[1].canvas.width = window.innerWidth;
                viewdata.subwindow[0].canvas.style.width = "0px";
                viewdata.subwindow[0].canvas.width = 0;

                viewdata.subwindow[1].canvas.style.height = "100px";
                viewdata.subwindow[1].canvas.height = 100;
                viewdata.subwindow[0].canvas.style.height = "0px";
                viewdata.subwindow[0].canvas.height = 0;

                viewdata.subwindow[1].context = 
                    setupCanvas(viewdata.subwindow[1].canvas);
            } else {
                viewdata.window[1].canvas.style.height = "600px";
                viewdata.window[1].canvas.height = 600;

                viewdata.subwindow[1].canvas.style.width = "0px";
                viewdata.subwindow[1].canvas.width = 0;
                viewdata.subwindow[0].canvas.style.width = "0px";
                viewdata.subwindow[0].canvas.width = 0;

                viewdata.subwindow[1].canvas.style.height = "0px";
                viewdata.subwindow[1].canvas.height = 0;
                viewdata.subwindow[0].canvas.style.height = "0px";
                viewdata.subwindow[0].canvas.height = 0;
            }

            viewdata.window[1].context = 
                setupCanvas(viewdata.window[1].canvas);
        }
        
        // Test data
        //-----------------------------------------------------
        viewdata.window[0].context.fillStyle = "#000000";
        viewdata.window[0].context.fillRect(10.5, 10.5, 50, 50);
        viewdata.window[1].context.fillStyle = "#000000";
        viewdata.window[1].context.fillRect(10.5, 10.5, 50, 50);
        viewdata.subwindow[0].context.fillStyle = "#000000";
        viewdata.subwindow[0].context.fillRect(10.5, 10.5, 50, 50);
        viewdata.subwindow[1].context.fillStyle = "#000000";
        viewdata.subwindow[1].context.fillRect(10.5, 10.5, 50, 50);
        //-----------------------------------------------------
        
        // focus rectangle
        let color1 = undefined;
        let color2 = undefined;
        
        if (viewmodel.viewIndexSelected() === 0) {
            color1 = "#000080";
            color2 = "#808080";
        } else {
            color1 = "#808080";
            color2 = "#000080";
        }
        
        let linewidth = 4;
        
        let c = viewdata.window[0].canvas;
        let ctx = viewdata.window[0].context;
        ctx.strokeStyle = color1;
        ctx.lineWidth = linewidth;
        ctx.beginPath();
        ctx.strokeRect(0,0,c.width,c.height);

        c = viewdata.subwindow[0].canvas;
        ctx = viewdata.subwindow[0].context;
        ctx.strokeStyle = color1;
        ctx.lineWidth = linewidth;
        ctx.beginPath();
        ctx.strokeRect(0,0,c.width,c.height);
        
        c = viewdata.window[1].canvas;
        ctx = viewdata.window[1].context;
        ctx.strokeStyle = color2;
        ctx.lineWidth = linewidth;
        ctx.beginPath();
        ctx.strokeRect(0,0,c.width,c.height);

        c = viewdata.subwindow[1].canvas;
        ctx = viewdata.subwindow[1].context;
        ctx.strokeStyle = color2;
        ctx.lineWidth = linewidth;
        ctx.beginPath();
        ctx.strokeRect(0,0,c.width,c.height);
    }
}