function FTModel() {
    let handler = undefined;
    
    FTModel.prototype.onchange = function (callback) {
        handler = callback;
    }
    
    function modelchanged () {
        
        if (handler !== undefined) handler();
    }
    
    function printjson(data) {
        let node = document.lastChild.appendChild(
            document.createElement('div'));

        let log = data; 

        log = log.replace(/[[]/g, "[<br/>");
        log = log.replace(/,/g, ",<br/>");
        log = log.replace(/},/g, "},<br/>");

        node.innerHTML = log;
    }

    FTModel.prototype.getdata = function (year) {
        var ajax = JCB.CreateAjaxObj("POST", "php/eurusd_m1.php");
        ajax.onreadystatechange = function() {
            if (JCB.isAjaxRequestReady(ajax)) {

//                console.log(ajax.responseText);
                let data = JSON.parse(ajax.responseText);
                console.log(data);
                modelchanged();
            }
        }

        ajax.send("date=2017-01-01&time=00:00&candles=100000");
    }
}