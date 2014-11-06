///<reference path='..\libs\bower_components\mithril\mithril.d.ts'/>
///<reference path='module.FullSize.ts'/>
///<reference path='data/data.Repository.ts'/>
///<reference path='data/data.ImageGallery.ts'/>
///<reference path='module.Gallery.ts'/>
var Index;
(function (Index) {
    var controller = (function () {
        function controller() {
            this.db = null;
            this.galleries = [];
            this.fullSize = new FullSize.controller();
            this.init();
        }
        controller.prototype.init = function () {
            var self = this;
            this.getData().then(function (x) {
                self.db = new data.Repository(x);
                var albums = self.db.galleriesAll();
                for (var i = 0; i < albums.length; i++) {
                    self.galleries.push(new Gallery.controller(new data.ImageGallery(albums[i]), {
                        onClick: function (gallery, index) {
                            self.fullSize.showContent(gallery, index);
                        }
                    }));
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
            m("div", FullSize.view(ctrl.fullSize)),
        ];
    }
    Index.view = view;
})(Index || (Index = {}));
//# sourceMappingURL=module.Index.js.map