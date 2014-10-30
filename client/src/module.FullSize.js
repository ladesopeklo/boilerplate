///<reference path='..\libs\bower_components\mithril\mithril.d.ts'/>
///<reference path='data/data.ImageGallery.ts'/>
var FullSize;
(function (FullSize) {
    var controller = (function () {
        function controller() {
        }
        controller.prototype.showContent = function (gallery, imageIndex) {
            this.imageGallery = gallery;
            this.imageGallery.init(imageIndex);
        };
        controller.prototype.renderImageContainer = function (imageUrl) {
            return m("div", { style: "width:100px;height:100px;border:1px solid red" }, [
                m("img", { src: imageUrl })
            ]);
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
            c.renderImageContainer(c.imageGallery.getImage("s100-c"))
        ]);
    }
    FullSize.view = view;
})(FullSize || (FullSize = {}));
