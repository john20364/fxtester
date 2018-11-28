function FTViewDataManager () {
    function drawchart(idx, viewdata, viewmodel) {
        if (viewmodel.forexdata().length === 0) return;
//        let arr = viewmodel.forexdata();
//        let len = arr.length;
//        console.log(len);
//        console.log(arr[len-1].date);
        
        let c = viewdata.window[idx].canvas;
        let ctx = viewdata.window[idx].context;

        let dy = 10;
        let dx = 10;
        let height = c.height - 2 * dy;
        let width = c.width - 2 * dx;
        
        dx += 0.5;
        dy += 0.5;

        let cw = viewmodel.candleWidth(idx);
        let chw = cw;
        
        let number_of_candles = (width / (cw + chw)) | 0;

        // calculate highest and loweset values
        let highest = -1000;
        let lowest = 1000;
        
        for (let i=0; i < number_of_candles; i++) {
            let candle = viewmodel.forexdata()[viewmodel.candleIndex(idx) + i];
            if(candle.high > highest) highest = candle.high;
            if(candle.low < lowest) lowest = candle.low;
        }

        let yscaler = highest - lowest;
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(dx, dy, width,height);
        
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;

        // Draw the candles
        for (let i=0; i < number_of_candles; i++) {
            let candle = viewmodel.forexdata()[viewmodel.candleIndex(idx) + i];
            let open = Math.round(((candle.open-lowest)/yscaler) * height);
            let close = Math.round(((candle.close-lowest)/yscaler) * height);
            let high = Math.round(((candle.high-lowest)/yscaler) * height);
            let low = Math.round(((candle.low-lowest)/yscaler) * height);
            let xpos = i*(cw+chw);
            
            // draw body
            if (open === close) {
                // draw horizontial line
                ctx.beginPath();
                ctx.moveTo(dx+xpos, dy+open);
                ctx.lineTo(dx+xpos+cw, dy+open);
                ctx.stroke();
            } else {
                // draw candle
                
                if (open < close) {
                    // draw bulish body
                    ctx.fillStyle = colorToHexStr(50,205,50);
                    ctx.fillRect(dx+xpos, dy+open, cw, close-open);
                    ctx.beginPath();
                    ctx.strokeRect(dx+xpos, dy+open, cw, close-open);
                    ctx.closePath();

                    // draw upper shadow
                    ctx.beginPath();
                    ctx.moveTo(dx+xpos+cw/2, dy+high);
                    ctx.lineTo(dx+xpos+cw/2, dy+close);
                    ctx.stroke();

                    // draw lower shadow
                    ctx.beginPath();
                    ctx.moveTo(dx+xpos+cw/2, dy+low);
                    ctx.lineTo(dx+xpos+cw/2, dy+open);
                    ctx.stroke();
                } else {
                    // draw bearish body
                    ctx.fillStyle = colorToHexStr(255,0,0);
                    ctx.fillRect(dx+xpos, dy+close, cw, open-close);
                    ctx.beginPath();
                    ctx.strokeRect(dx+xpos, dy+open, cw, close-open);

                    // draw upper shadow
                    ctx.beginPath();
                    ctx.moveTo(dx+xpos+cw/2, dy+high);
                    ctx.lineTo(dx+xpos+cw/2, dy+open);
                    ctx.stroke();

                    // draw lower shadow
                    ctx.beginPath();
                    ctx.moveTo(dx+xpos+cw/2, dy+low);
                    ctx.lineTo(dx+xpos+cw/2, dy+close);
                    ctx.stroke();                }
            } 
            
        }
        
        ctx.restore();
    }
    
    FTViewDataManager.prototype.drawCharts = 
    function (viewdata, viewmodel) {
        if (viewmodel.forexdata === undefined) return;

        if (!viewmodel.isFullscreenByIndex(0) && !viewmodel.isFullscreenByIndex(1)) {
            // draw both charts !!
            drawchart(0, viewdata, viewmodel);
            drawchart(1, viewdata, viewmodel);

            if (viewmodel.isSubwindowIndex(0)) {
                // draw subwindow 0
            }
            if (viewmodel.isSubwindowIndex(1)) {
                // draw subwindow 1
            } 
        } else if (viewmodel.isFullscreenByIndex(0)) {
            // Draw chart 0
            drawchart(0, viewdata, viewmodel);

            if (viewmodel.isSubwindowIndex(0)) {
                // draw subwindow 0
            }
        } else if (viewmodel.isFullscreenByIndex(1)) {
            // Draw chart 1           
            drawchart(1, viewdata, viewmodel);

            if (viewmodel.isSubwindowIndex(1)) {
                // draw subwindow 1
            } 
        }
    }
}