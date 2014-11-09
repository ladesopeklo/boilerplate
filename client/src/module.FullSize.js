///<reference path='..\libs\bower_components\mithril\mithril.d.ts'/>
///<reference path='data/data.ImageGallery.ts'/>
var FullSize;
(function (FullSize) {
    var controller = (function () {
        function controller(settings) {
            this.windowWidth = settings.windowWidth;
            this.windowHeight = settings.windowHeight;
        }
        controller.prototype.showContent = function (gallery, imageIndex) {
            this.imageGallery = gallery;
            this.imageGallery.init(imageIndex);
        };
        controller.prototype.heightCorrected = function () {
            return Math.ceil(this.windowHeight / 100) * 100;
        };
        return controller;
    })();
    FullSize.controller = controller;
    function view(c) {
        if (c.imageGallery === undefined) {
            return;
        }
        return m("div", { 'class': "module-fullsize" }, [
            m("div", c.imageGallery.name),
            m("div", [
                m("div", { onclick: c.imageGallery.next.bind(c.imageGallery) }, "next"),
                m("div", { onclick: c.imageGallery.prev.bind(c.imageGallery) }, "prev")
            ]),
            renderCurrentImage(c)
        ]);
    }
    FullSize.view = view;
    function renderCurrentImage(c) {
        var image = c.imageGallery.getCurrentImage();
        return m("div", { class: "image-wrap", style: "border:1px solid red" }, [
            m("img", { src: image.square(c.heightCorrected()) })
        ]);
    }
})(FullSize || (FullSize = {}));
