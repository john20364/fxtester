let FXVData = {
    window:[
        {canvas:undefined, context:undefined},
        {canvas:undefined, context:undefined}],
    subwindow:[
        {canvas:undefined, context:undefined},
        {canvas:undefined, context:undefined}]
};

function FTView() {
    let viewmodel = new FTViewModel();
    let handler = undefined;

    viewmodel.onchange((state, idx) => {
        updateScreen();
        switch (state) {
            case viewmodel.state.SELECT:
                break;
            case viewmodel.state.TOGGLE_FULL_WINDOW:
                if (viewmodel.isFullscreenByIndex(idx)) {
                    let id = 'view'+(idx+1);
                    let canvas = JCB._(id).childNodes[0].childNodes[0];
                    draw(canvas);
                }
                break;
            case viewmodel.state.TOGGLE_SUB_WINDOW:
            case viewmodel.state.PERIOD_CHANGED:
                break;
        }
    });

    function draw (canvas) {
        let ctx = canvas.getContext("2d");
        ctx.save();
//        console.log(canvas.attributes);
//        console.log("w",canvas.clientWidth, "h", canvas.clientHeight);
//        let w = canvas.width;
//        let h = canvas.height;
//        console.log("w",w, "h", h);
//        ctx.transform(1, 0, 0, -1, 0, canvas.clientHeight);
        ctx.fillRect(50,50,10,10);
        ctx.restore();
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
                node.onclick = () => {menuitemclick(node);};
            }
        }
    }
    
    function viewclick(view) {
        switch(view.id) {
            case "view1" :
                viewmodel.selectview(0);
                break;
            case "view2" :
                viewmodel.selectview(1);
                break;
        }
    }
    
    function addViewOnclick() {
        let view1 = JCB._("view1");
        let view2 = JCB._("view2");
        view1.onclick = () => {viewclick(view1);};
        view2.onclick = () => {viewclick(view2);};
    }
    
    function createMenu() {
        let output = '';
        output += '<div id=menubar class="menubar">';

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
        output += '<div class="headerspace"></div>'; // header space div

        return output;
    }
    
    FTView.prototype.updateViewData = function (data) {
        viewmodel.setData(data);
    }
    
    function createView() {
        let output = '';
        output +=
            '<div id="viewcontainer" class="viewcontainerrow">'+
                '<div id="view1">'+
                    '<div class="candleview1">'+
                        '<canvas class="canvasview"></canvas>'+
                    '</div>'+
                    '<div class="indicatorview1">'+
//                        '<canvas class="canvasview"></canvas>'+
                    '</div>'+
                '</div>'+
                '<div id="view2">'+
                    '<div class="candleview2">'+
                        '<canvas class="canvasview"></canvas>'+
                    '</div>'+
                    '<div class="indicatorview2">'+
//                        '<canvas class="canvasview"></canvas>'+
                    '</div>'+
                '</div>'+
            '</div>';
        return output;
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
        document.body.innerHTML += createMenu();
        addMenuOnclick();
        
        let node = document.body.appendChild(document.createElement('div'));
        node.id = "mainview";
        
        node.innerHTML += createView();
        addViewOnclick();

        updateScreen();
        
        // Check if subwindow is visible in the window
        // without focus
        let idx = viewmodel.viewIndexSelected();

        let subwindow = undefined;
        let view = undefined;
        if (idx === 0) {
            subwindow = viewmodel.isSubwindowIndex(1);
            view = JCB._("view2");
        } else {
            subwindow = viewmodel.isSubwindowIndex(0);
            view = JCB._("view1");
        }

        if (subwindow) {
            view.childNodes[0].style.height = '80%';
            view.childNodes[1].style.height = '20%';
        } else {
            view.childNodes[0].style.height = '100%';
            view.childNodes[1].style.height = '0%';
        }
    }
    
    initialize();
    
    function updateScreen() {
        let idx = viewmodel.viewIndexSelected();
        let selectedview = undefined;
        if (idx === 0) {
            JCB._("view1").className = "selected";
            JCB._("view2").className = "";
            selectedview = JCB._("view1");
        } else {
            JCB._("view1").className = "";
            JCB._("view2").className = "selected";
            selectedview = JCB._("view2");
        }
        
        let period = viewmodel.PeriodByIndex(idx);
        let fullscreen = viewmodel.isFullscreenByIndex(idx);
        let subwindow = viewmodel.isSubwindowIndex(idx);
        
        setPeriodButtonState(period);
        setViewToggleButtonState("0", fullscreen);
        setViewToggleButtonState("1", subwindow);

        if (fullscreen) {
            if (idx === 0) {
//                JCB._("view1").style.display = "block";
//                JCB._("view2").style.display = "none";
                JCB._("view1").style.width = "100%";
                JCB._("view2").style.width = "0%";
            } else {
//                JCB._("view1").style.display = "none";
//                JCB._("view2").style.display = "block";
                JCB._("view1").style.width = "0%";
                JCB._("view2").style.width = "100%";
            }
        } else {
//            JCB._("view1").style.display = "block";
//            JCB._("view2").style.display = "block";
            JCB._("view1").style.width = "50%";
            JCB._("view2").style.width = "50%";
        }
        
        if (subwindow) {
            selectedview.childNodes[0].style.height = '80%';
            selectedview.childNodes[1].style.height = '20%';
        } else {
            selectedview.childNodes[0].style.height = '100%';
            selectedview.childNodes[1].style.height = '0%';
        }
    }
}