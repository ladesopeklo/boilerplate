///<reference path='..\libs\bower_components\mithril\mithril.d.ts'/>
///<reference path='data/data.ImageGallery.ts'/>
///<reference path='module.ImageRenderer.ts'/>
var FullSize;
(function (FullSize) {
    var controller = (function () {
        function controller() {
        }
        controller.prototype.showContent = function (gallery, imageIndex) {
            this.imageGallery = gallery;
            this.imageGallery.init(imageIndex);
            this.imageRenderer = new ImageRenderer.controller();
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
            ImageRenderer.view(c.imageRenderer.render(c.imageGallery.getCurrentImage()))
        ]);
    }
    FullSize.view = view;
})(FullSize || (FullSize = {}));
