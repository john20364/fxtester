function FTView() {
    let viewdata = {
        window:[
            {canvas:undefined, context:undefined},
            {canvas:undefined, context:undefined}],
        subwindow:[
            {canvas:undefined, context:undefined},
            {canvas:undefined, context:undefined}]
    };
    
    let viewmodel = new FTViewModel();
    let viewmanager = new FTViewManager();
    let viewdatamanager = new FTViewDataManager();
    let handler = undefined;

    viewmodel.onchange((state, idx=0) => {
        switch (state) {
            case viewmodel.state.DATA_CHANGED:
                break;
            case viewmodel.state.SELECT:
                break;
            case viewmodel.state.TOGGLE_FULL_WINDOW:
                setViewToggleButtonState("0", viewmodel.isFullscreenByIndex(idx))
                break;
            case viewmodel.state.TOGGLE_SUB_WINDOW:
                setViewToggleButtonState("1", viewmodel.isSubwindowIndex(idx));
                break;
            case viewmodel.state.PERIOD_CHANGED:
                setPeriodButtonState(viewmodel.PeriodByIndex(idx));
                break;
        }
        draw();
        viewdatamanager.drawCharts(viewdata, viewmodel);
    });

    FTView.prototype.onkeydown = (e) => {
        switch (e.keyCode) {
            case LEFT_ARROW:
                viewmodel.prevCandle();
                break;
            case RIGHT_ARROW:
                viewmodel.nextCandle();
                break;
            case UP_ARROW:
                break;
            case DOWN_ARROW:
                break;
            case KEY_SPACE:
                viewmodel.nextCandle();
                break;
            case KEY_PLUS:
                viewmodel.increaseCandle();
                break;
            case KEY_MINUS:
                viewmodel.decreaseCandle();
                break;
        }
    }
    
    FTView.prototype.forexdata = (forexdata) => {
        viewmodel.setData(forexdata);
    }
    
    FTView.prototype.onresize = () => {
        draw();
        viewdatamanager.drawCharts(viewdata, viewmodel);
    }
    
    function draw () {
        let idx = viewmodel.viewIndexSelected();
        let fullscreen = viewmodel.isFullscreenByIndex(idx);
        let subwindow = viewmodel.isSubwindowIndex(idx);
        
        setPeriodButtonState(viewmodel.PeriodByIndex(idx));
        setViewToggleButtonState("0", fullscreen);
        setViewToggleButtonState("1", subwindow);
        
        viewmanager.drawWindows(viewdata, viewmodel);
    }

    FTView.prototype.onchange = function (callback) {
        handler = callback;
    }
    
    function doNotify () {
        if (handler !== undefined) handler();    
    }
    
    function menuitemclick(elm) {
        if (elm.dataset.group === "period") {
            viewmodel.setPeriod(parseInt(elm.id));
        } else if (elm.dataset.group === "view") {
            switch(elm.id) {
                case "0" :  // Full Window
                    viewmodel.togglefullwindow();
                    break;
                case "1" :  // Sub Window
                    viewmodel.togglesubwindow();
                    break;
            }
        }
    }

    function menubuttoncode(group, id, text) {
        let result = 
        '<div class="menuitemcontainer">'+
            '<div id="'+id+'" '+
            'data-group="'+group+'">'+
            text+
            '</div>'+
        '</div>';
        return result;
    }

    function addMenuOnclick() {
        let nodes = JCB._("menubar").childNodes;
        for (let i=0; i<nodes.length; i++) {
            if (nodes[i].className==="menuitemcontainer") {
                let node = nodes[i].childNodes[0];
                node.onclick = () => menuitemclick(node);
            }
        }
    }
    
    function createMenu() {
        let output = '';
        output += '<div id="menubar" class="menubar">';

        output += menubuttoncode("period", "0", "M1");
        output += menubuttoncode("period", "1", "M5");
        output += menubuttoncode("period", "2", "M15");
        output += menubuttoncode("period", "3", "M30");
        output += menubuttoncode("period", "4", "H1");
        output += menubuttoncode("period", "5", "H4");
        output += menubuttoncode("period", "6", "D1");
        output += menubuttoncode("period", "7", "W1");
        output += menubuttoncode("period", "8", "MN");

        output += '<div class="menuitemseparator"></div>';

        output += menubuttoncode("view", "0", "Full Win.");
        output += menubuttoncode("view", "1", "Ind. Win.");

        output += '</div>'; // menubar div

        document.body.innerHTML += output;
    }
    
    function createWindows() {
        let output = 
            '<canvas id="window1" class="window1"></canvas>'+
            '<canvas id="window2" class="window2"></canvas>'+
            '<canvas id="subwindow1" class="subwindow1"></canvas>'+
            '<canvas id="subwindow2" class="subwindow2"></canvas>';
        
        document.body.innerHTML += output;
        
        viewdata.window[0].canvas = JCB._("window1");
        viewdata.window[1].canvas = JCB._("window2");
        viewdata.subwindow[0].canvas = JCB._("subwindow1");
        viewdata.subwindow[1].canvas = JCB._("subwindow2");
        
        for (let i=0; i<2; i++) {
            viewdata.window[i].canvas.onclick = (e) => {
                viewmodel.selectview(i);
            }
            viewdata.subwindow[i].canvas.onclick = (e) => {
                viewmodel.selectview(i);
            }
        }
    }
    
    function setPeriodButtonState(period) {
        let nodes = JCB._("menubar").childNodes;
        for (let i=0; i<nodes.length; i++) {
            if (nodes[i].className==="menuitemcontainer") {
                let node = nodes[i].childNodes[0];
                if (node.dataset.group === "period") {
                    if (node.id === period.toString()) {
                        node.className = "selected";
                    } else {
                        node.className = "";
                    }
                }
            }
        }
    }

    function setViewToggleButtonState(id, selected) {
        let nodes = JCB._("menubar").childNodes;
        for (let i=0; i<nodes.length; i++) {
            if (nodes[i].className==="menuitemcontainer") {
                let node = nodes[i].childNodes[0];
                if (node.dataset.group === "view") {
                    if (node.id === id) {
                        node.className = (selected) ? "selected" : "";
                    }
                }
            }
        }
    }
    
    function initialize() {
        createMenu();
        createWindows();
        addMenuOnclick();
        draw();
    }
    
    initialize();
}