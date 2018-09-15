function Candles(data) {
    let jsondata = JSON.parse(data);
    let max_quotation = -1000;
    let min_quotation = 1000;

    for (let i=0; i<jsondata.candles.length; i++) {
        let candle = jsondata.candles[i];
        
        if (candle.high > max_quotation)
            max_quotation = candle.high;
        
        if (candle.low < min_quotation)
            min_quotation = candle.low;
        
//        console.log("date",candle.date,"time",candle.time);
    } 
    
    let scale = max_quotation - min_quotation;
    let fillcolor = colorToHexStr(0,0,0);
    let color = colorToHexStr(0,0,0);

        
    Candles.prototype.draw = function (dimension) {
        let delta = (dimension.width / jsondata.candles.length) | 0;
        let dx = (delta / 2) | 0;
        let candle_width = delta - dx;
        console.log('delta',delta,"dx",dx,
                    "candle_width",candle_width);
        
        let ctx = dimension.context;
        let width = dimension.width;
        let height = dimension.height;
        let min = min_quotation;
        
        for (let i=0; i<jsondata.candles.length; i++) {
            let candle = jsondata.candles[i];

            ctx.save();
            ctx.strokeStyle = color;
            ctx.fillStyle = colorToHexStr(0,0,0);
            ctx.lineWidth = 1;

            let p0=0;
            let p1=0;

            let xpos = i * delta;
            let xpos2 = xpos + ((candle_width / 2) | 0);
            
            // Try to eliminate blur
            xpos += 0.5;
            xpos2 += 0.5;
            
            // Draw horizontal line if open and close are equal
            if (candle.open === candle.close) {
                p0=Math.round(((candle.open-min)/scale)*height);
                ctx.beginPath();
                ctx.moveTo(xpos,p0+0.5);
                ctx.lineTo(xpos+candle_width,p0+0.5);
                ctx.stroke();
            }
            
            // bullish candle
            if (candle.close > candle.open) {
//                console.log('Bullish Candle');
                ctx.fillStyle = colorToHexStr(50,205,50);

                // Draw body
                p0=Math.round(((candle.open-min)/scale)*height);
                p1=Math.round(((candle.close-min)/scale)*height);

                ctx.fillRect(xpos, 
                             p0, 
                             candle_width, 
                             p1-p0);

                ctx.rect(xpos, 
                         p0, 
                         candle_width, 
                         p1-p0);
                
                ctx.stroke();

                // Draw low shadow
                p0=Math.round(((candle.low-min)/scale)*height);
                p1=Math.round(((candle.open-min)/scale)*height);

                ctx.beginPath();
                ctx.moveTo(xpos2,p0);
                ctx.lineTo(xpos2,p1);
                ctx.stroke();

                // Draw high shadow
                p0=Math.round(((candle.close-min)/scale)*height);
                p1=Math.round(((candle.high-min)/scale)*height);

                ctx.beginPath();
                ctx.moveTo(xpos2,p0);
                ctx.lineTo(xpos2,p1);
                ctx.stroke();
            } else 
            // Bearish candle
            if (candle.close < candle.open) {
//                console.log('Bearish Candle');
                ctx.fillStyle = colorToHexStr(255,0,0);

                // Draw body
                p0=Math.round(((candle.close-min)/scale)*height);
                p1=Math.round(((candle.open-min)/scale)*height);

                ctx.fillRect(xpos, 
                             p0, 
                             candle_width, 
                             p1-p0);

                ctx.rect(xpos, 
                         p0, 
                         candle_width, 
                         p1-p0);
                ctx.stroke();

                // Draw low shadow
                p0=Math.round(((candle.low-min)/scale)*height);
                p1=Math.round(((candle.close-min)/scale)*height);

                ctx.beginPath();
                ctx.moveTo(xpos2,p0);
                ctx.lineTo(xpos2,p1);
                ctx.stroke();

                // Draw high shadow
                p0=Math.round(((candle.open-min)/scale)*height);
                p1=Math.round(((candle.high-min)/scale)*height);

                ctx.beginPath();
                ctx.moveTo(xpos2,p0);
                ctx.lineTo(xpos2,p1);
                ctx.stroke();
            }

            ctx.restore();
        } 
    }
}
