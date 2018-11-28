function FTModel() {
    let data = undefined;
    let handler = undefined;
    
    FTModel.prototype.data = function () {
        return data;
    }
    
    FTModel.prototype.onchange = function (callback) {
        handler = callback;
    }
    
    function modelchanged () {
        
        if (handler !== undefined) handler();
    }
    
    FTModel.prototype.getforexdata = function (year) {
        let ajax = JCB.CreateAjaxObj("POST", "php/eurusd_m1.php");
        ajax.onreadystatechange = function() {
            if (JCB.isAjaxRequestReady(ajax)) {
                data = JSON.parse(ajax.responseText);
                modelchanged();
            }
        }

        ajax.send("date="+year+"-01-01&time=00:00&candles=1000");
    }
}