function FTControl(viewobj, modelobj) {
    let view = viewobj;
    let model = modelobj;
    
    view.onchange(() => {
        
    });
    
    model.onchange(() => {
        console.log("model changed");
    });

    model.getdata("2017");
}