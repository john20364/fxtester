let FXTester = {
    view:undefined,
    model:undefined,
    control:undefined
};

window.onload = function () {
    FXTester.view = new FTView();
    FXTester.model = new FTModel();
    FXTester.control = new FTControl(FXTester.view, FXTester.model);

    FXTester.model.getforexdata("2016");
};

window.onkeydown = (e) => FXTester.view.onkeydown(e);
window.onresize = function () {
    FXTester.view.onresize();
};