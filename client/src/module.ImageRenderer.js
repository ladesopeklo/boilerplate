///<reference path='data/data.ImageInterface.ts'/>
var ImageRenderer;
(function (ImageRenderer) {
    var controller = (function () {
        function controller(settings) {
            this.width = settings.width;
        }
        controller.prototype.render = function (imageData) {
            this.imageData = imageData;
            return this;
        };
        return controller;
    })();
    ImageRenderer.controller = controller;
    function view(ctrl) {
        return m("div", { style: "border:1px solid red" }, [
            m("img", { src: ctrl.imageData.square(ctrl.width) })
        ]);
    }
    ImageRenderer.view = view;
})(ImageRenderer || (ImageRenderer = {}));
