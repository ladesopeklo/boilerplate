///<reference path='..\libs\bower_components\mithril\mithril.d.ts'/>
///<reference path='data/data.ImageGallery.ts'/>
///<reference path='data/data.Repository.ts'/>
var Gallery;
(function (Gallery) {
    var controller = (function () {
        function controller(imageGallery, settings) {
            this.settings = settings || {};
            this.name = imageGallery.name;
            this.images = imageGallery.images;
            this.imageGallery = imageGallery;
        }
        controller.prototype.click = function (gallery, image) {
            this.settings.onClick(gallery, image);
        };
        controller.prototype.renderImage = function (image, index) {
            return m("span", { style: "border:1px solid red" }, [
                m("img", { src: image.square(200), onclick: this.click.bind(this, this.imageGallery, index) })
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
                //					return m("img", {src: item.getUrl(), onclick: controller.click.bind(controller, controller.imageGallery, i)});
            })
        ]);
    }
    Gallery.view = view;
})(Gallery || (Gallery = {}));
