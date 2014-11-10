///<reference path='..\libs\bower_components\mithril\mithril.d.ts'/>
///<reference path='data/data.ImageGallery.ts'/>
///<reference path='data/data.Repository.ts'/>
///<reference path='def/zepto.d.ts'/>
///<reference path='module.FullSize.ts'/>
///<reference path='windowZepto.ts'/>
var Gallery;
(function (Gallery) {
    var controller = (function () {
        function controller(imageGallery) {
            this.name = imageGallery.name;
            this.images = imageGallery.images;
            this.imageGallery = imageGallery;
            this.fullSize = this.prepareFullScreen();
        }
        controller.prototype.prepareFullScreen = function () {
            var x = WindowZepto.getInstance(), fullSize = new FullSize.controller({
                windowWidth: x.width,
                windowHeight: x.height
            });
            $(document).bind("keydown", function (e) {
                fullSize.handleKeyDown(e);
            });
            return fullSize;
        };
        controller.prototype.click = function (index) {
            this.fullSize.showContent(this.imageGallery, index);
        };
        controller.prototype.renderImage = function (image, index) {
            return m("span", { style: "border:1px solid red" }, [
                m("img", { src: image.square(200), onclick: this.click.bind(this, index) })
            ]);
        };
        return controller;
    })();
    Gallery.controller = controller;
    function view(controller) {
        return m("div", [
            m("div", controller.name),
            controller.images.map(function (item, i) {
                return controller.renderImage(item, i);
            }),
            m("div", FullSize.view(controller.fullSize)),
        ]);
    }
    Gallery.view = view;
})(Gallery || (Gallery = {}));
//# sourceMappingURL=module.Gallery.js.map