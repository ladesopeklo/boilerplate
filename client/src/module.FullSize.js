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
        controller.prototype.handleKeyDown = function (e) {
            if (!this.imageGallery) {
                return;
            }
            if (e.keyCode === 39) {
                this.imageGallery.next();
                m.redraw();
            }
            if (e.keyCode === 37) {
                this.imageGallery.prev();
                m.redraw();
            }
            if (e.keyCode === 27) {
                this.imageGallery = undefined;
                m.redraw();
            }
        };
        controller.prototype.heightCorrected = function () {
            return Math.ceil(this.windowHeight / 100) * 100;
        };
        controller.prototype.actionNext = function (element, isInitialized, context) {
            if (!isInitialized) {
            }
            this.imageGallery.next();
        };
        controller.prototype.imageLoad = function (element, isInitialized, context) {
            if (!isInitialized) {
                $(element).css("opacity", 0);
                $(element).bind("load", function () {
                    $(element).css("opacity", 1);
                });
            }
        };
        return controller;
    })();
    FullSize.controller = controller;
    function view(c) {
        if (!c.imageGallery) {
            return;
        }
        return m("div", { 'class': "module-fullsize" }, [
            renderCurrentImage(c),
            m("div", { 'class': "actions" }, [
                m("div", { 'class': "container_12" }, [
                    m("div", { 'class': "grid_1" }, prevButton(c)),
                    m("div", { 'class': "grid_10" }, m("div", c.imageGallery.name)),
                    m("div", { 'class': "grid_1" }, nextButton(c))
                ]),
            ]),
        ]);
    }
    FullSize.view = view;
    function nextButton(c) {
        return m("div", { 'class': "next", config: c.actionNext.bind(c) }, "next");
    }
    function prevButton(c) {
        return m("div", { 'class': "prev", onclick: c.imageGallery.prev.bind(c.imageGallery) }, "prev");
    }
    function renderCurrentImage(c) {
        var image = c.imageGallery.getCurrentImage();
        return m("div", {
            'class': "image-wrap",
            style: "border:1px solid green"
        }, [
            m("img", {
                src: image.square(c.heightCorrected()),
                config: c.imageLoad,
                style: "border:1px solid red"
            })
        ]);
    }
})(FullSize || (FullSize = {}));
//# sourceMappingURL=module.FullSize.js.map