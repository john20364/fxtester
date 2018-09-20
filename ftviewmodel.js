function FTViewModel() {
    this.state = Object.freeze(
        {SELECT:0,
         TOGGLE_FULL_WINDOW:1,
         TOGGLE_SUB_WINDOW:2,
         PERIOD_CHANGED:3,
         DATA_CHANGED:4});
    
    function ViewData () {
        this.candleidx = 0;
        this.candlewidth = 32;
        this.showsubwindow = false;
        this.showfullscreen = false;
        this.periodindex = 0;
        this.selected = false;
    };
    
    const MAX_CANDLE_WIDTH = 32;
    const MIN_CANDLE_WIDTH = 1;
    
    let views=[new ViewData(), new ViewData()];
    let handler = undefined;
    let forexdata = undefined;
    
    views[0].selected = true;
    views[0].showfullscreen = false;
    views[0].showsubwindow = true;
    views[1].showsubwindow = true;
    views[1].showfullscreen = false;
    
    FTViewModel.prototype.nextCandle = function () {
        let idx = this.viewIndexSelected();
        if (views[idx].candleidx === forexdata.length - 1) return;
        
        // TODO......
        // Depends on the period !!!!!
        views[idx].candleidx++;
        
        modelchanged(this.state.DATA_CHANGED);
//        console.log("nextcandle");
    }
    
    FTViewModel.prototype.prevCandle = function () {
        let idx = this.viewIndexSelected();
        if (views[idx].candleidx === 0) return;

        // TODO......
        // Depends on the period !!!!!
        views[idx].candleidx--;
        
        modelchanged(this.state.DATA_CHANGED);
//        console.log("prevcandle");
    }
    
    FTViewModel.prototype.increaseCandle = function () {
        let idx = this.viewIndexSelected();
        if (views[idx].candlewidth === MAX_CANDLE_WIDTH) return;
        views[idx].candlewidth *= 2;
        modelchanged(this.state.DATA_CHANGED);
    }

    FTViewModel.prototype.decreaseCandle = function () {
        let idx = this.viewIndexSelected();
        if (views[idx].candlewidth === MIN_CANDLE_WIDTH ) return;
        views[idx].candlewidth /= 2;
        modelchanged(this.state.DATA_CHANGED);
    }
    
    FTViewModel.prototype.setData = function (data) {
        forexdata = data;
        modelchanged(this.state.DATA_CHANGED, this.viewIndexSelected());
    }
    
    FTViewModel.prototype.forexdata = () => {
        return forexdata;
    }
    
    function modelchanged(state, index) {
        if (handler !== undefined) handler(state, index);
    }
    
    FTViewModel.prototype.candleWidth = function (idx) {
        return views[idx].candlewidth;
    }

    FTViewModel.prototype.candleIndex = function (idx) {
        return views[idx].candleidx;
    }

//    FTViewModel.prototype.setCandleIndex = function (idx, candleidx) {
//        views[idx].candleidx = candleidx;
//    }
    
    FTViewModel.prototype.selectview = function (index) {
        if (views[index].selected === true) return;
        
        // reset views
        for (let i=0; i<views.length; i++)
            views[i].selected = false;
        views[index].selected = true;
        modelchanged(this.state.SELECT, index);
    }
    
    FTViewModel.prototype.togglefullwindow = function () {
        let idx = this.viewIndexSelected();
        views[idx].showfullscreen = !views[idx].showfullscreen;
        modelchanged(this.state.TOGGLE_FULL_WINDOW, idx);
    }

    FTViewModel.prototype.togglesubwindow = function () {
        let idx = this.viewIndexSelected();
        views[idx].showsubwindow = !views[idx].showsubwindow;
        modelchanged(this.state.TOGGLE_SUB_WINDOW, idx);
    }
    
    FTViewModel.prototype.setPeriod = function (period) {
        let idx = this.viewIndexSelected();
        if (views[idx].periodindex === period) return;
        views[idx].periodindex = period;
        modelchanged(this.state.PERIOD_CHANGED, idx);
    }
    
    FTViewModel.prototype.onchange = function (callback) {
        handler = callback;
    }
    
    FTViewModel.prototype.viewIndexSelected = function () {
        for (let i=0; i<views.length; i++)
            if (views[i].selected)
                return i;
    }

    FTViewModel.prototype.PeriodByIndex = function (index) {
        return views[index].periodindex;
    }

    FTViewModel.prototype.isFullscreenByIndex = function (index) {
        return views[index].showfullscreen;
    }
    
    FTViewModel.prototype.isSubwindowIndex = function (index) {
        return views[index].showsubwindow;
    }
}