function Candle(open, high, low, close) {
    this.open = open;
    this.high = high;
    this.low = low;
    this.close = close;
    this.fillcolor = colorToHexStr(0,0,0);
    this.color = colorToHexStr(0,0,0);
    this.type = 1;
    
    Candle.prototype.getOpen = function() {
        return this.open;
    }

    Candle.prototype.getHigh = function() {
        return this.high;
    }

    Candle.prototype.getLow = function() {
        return this.low;
    }
    
    Candle.prototype.getClose = function() {
        return this.close;
    }
    
    Candle.prototype.draw = function(dimension,max, min,candle_width,index) {
        let ctx = dimension.context;
        let width = dimension.width;
        let height = dimension.height;
        
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.fillStyle = colorToHexStr(0,0,0);

        let p0=0;
        let p1=0;
        let scale=max-min;
        let dx=candle_width/2;

        // bullish candle
        if (this.close > this.open) {
            console.log('Bullish Candle');
            ctx.fillStyle = colorToHexStr(0,192,0);
            
            // Draw body
            p0=Math.round(((this.open-min)/scale)*height);
            p1=Math.round(((this.close-min)/scale)*height);

            ctx.fillRect(10, 
                         p0, 
                         candle_width, 
                         p1-p0);

            ctx.rect(10, 
                     p0, 
                     candle_width, 
                     p1-p0);
            ctx.stroke();
            
            // Draw low shadow
            p0=Math.round(((this.low-min)/scale)*height);
            p1=Math.round(((this.open-min)/scale)*height);
            
            ctx.beginPath();
            ctx.moveTo(10+dx,p0);
            ctx.lineTo(10+dx,p1);
            ctx.stroke();

            // Draw high shadow
            p0=Math.round(((this.close-min)/scale)*height);
            p1=Math.round(((this.high-min)/scale)*height);
            
            ctx.beginPath();
            ctx.moveTo(10+dx,p0);
            ctx.lineTo(10+dx,p1);
            ctx.stroke();
        } else 
        // Bearish candle
        if (this.close < this.open) {
            console.log('Bearish Candle');
            ctx.fillStyle = colorToHexStr(255,0,0);

            // Draw body
            p0=Math.round(((this.close-min)/scale)*height);
            p1=Math.round(((this.open-min)/scale)*height);

            ctx.fillRect(10, 
                         p0, 
                         candle_width, 
                         p1-p0);

            ctx.rect(10, 
                     p0, 
                     candle_width, 
                     p1-p0);
            ctx.stroke();

            // Draw low shadow
            p0=Math.round(((this.low-min)/scale)*height);
            p1=Math.round(((this.close-min)/scale)*height);
            
            ctx.beginPath();
            ctx.moveTo(10+dx,p0);
            ctx.lineTo(10+dx,p1);
            ctx.stroke();

            // Draw high shadow
            p0=Math.round(((this.open-min)/scale)*height);
            p1=Math.round(((this.high-min)/scale)*height);
            
            ctx.beginPath();
            ctx.moveTo(10+dx,p0);
            ctx.lineTo(10+dx,p1);
            ctx.stroke();
        }
        
        ctx.restore();
    }
    
    Candle.prototype.print = function() {
        console.log('OHLC: ',this.open, this.high, this.low, this.close);
    }
} 