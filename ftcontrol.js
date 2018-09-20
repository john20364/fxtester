function FTControl(viewobj, modelobj) {
    let view = viewobj;
    let model = modelobj;
    
    view.onchange(() => {
    });
    
    model.onchange(() => {
        view.forexdata(model.data());
    });
}