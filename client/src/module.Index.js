///<reference path='..\libs\bower_components\mithril\mithril.d.ts'/>
///<reference path='module.FullSize.ts'/>
///<reference path='data/data.Repository.ts'/>
///<reference path='data/data.ImageGallery.ts'/>
///<reference path='module.Gallery.ts'/>
///<reference path='windowZepto.ts'/>
var Index;
(function (Index) {
    var controller = (function () {
        function controller() {
            this.db = null;
            this.galleries = [];
            this.init();
        }
        controller.prototype.prepareGallery = function (album) {
            return new Gallery.controller(new data.ImageGallery(album));
        };
        controller.prototype.init = function () {
            var self = this;
            this.getData().then(function (x) {
                self.db = new data.Repository(x);
                var albums = self.db.galleriesAll();
                for (var i = 0; i < albums.length; i++) {
                    self.galleries.push(self.prepareGallery(albums[i]));
                }
            });
        };
        controller.prototype.getData = function () {
            return m.request({ method: "GET", url: "/data/repo.json" });
        };
        return controller;
    })();
    Index.controller = controller;
    function view(ctrl) {
        return [
            ctrl.galleries.map(function (item) {
                return m("div", Gallery.view(item));
            }),
        ];
    }
    Index.view = view;
})(Index || (Index = {}));
//# sourceMappingURL=module.Index.js.map