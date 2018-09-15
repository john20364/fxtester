function FTViewModel() {
    function ViewData () {
        this.showsubwindow = false;
        this.showfullscreen = false;
        this.periodindex = 0;
        this.selected = false;
    };
    
    let views=[new ViewData(), new ViewData()];
    let handler = undefined;

    views[0].selected = true;
    views[0].showfullscreen = true;
    
    function modelchanged() {
        if (handler !== undefined) handler();
    }
    
    FTViewModel.prototype.selectview = function (index) {
        if (views[index].selected === true) return;
        
        // reset views
        for (let i=0; i<views.length; i++)
            views[i].selected = false;
        views[index].selected = true;
        modelchanged();
    }
    
    FTViewModel.prototype.togglefullwindow = function () {
        let idx = this.viewIndexSelected();
        views[idx].showfullscreen = !views[idx].showfullscreen;
        modelchanged();
    }

    FTViewModel.prototype.togglesubwindow = function () {
        let idx = this.viewIndexSelected();
        views[idx].showsubwindow = !views[idx].showsubwindow;
        modelchanged();
    }
    
    FTViewModel.prototype.setPeriod = function (period) {
        let idx = this.viewIndexSelected();
        if (views[idx].periodindex === period) return;
        views[idx].periodindex = period;
        modelchanged();
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