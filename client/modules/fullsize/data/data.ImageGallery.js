///<reference path='data.ImageInterface.ts'/>
///<reference path='data.GoogleImage.ts'/>
var data;
(function (data) {
    var ImageGallery = (function () {
        function ImageGallery(rawData) {
            this.imagesCount = 0;
            this.circular = false;
            var images = rawData.images || [];
            this.images = [];
            this.name = rawData.name;
            for (var i = 0; i < images.length; i++) {
                this.images.push(new data.GoogleImage(images[i]));
            }
            this.activeImageIndex = 0;
            this.imagesCount = this.images.length;
        }
        ImageGallery.prototype.init = function (index) {
            this.activeImageIndex = index;
        };
        ImageGallery.prototype.getIndex = function (offset) {
            var index = this.activeImageIndex + offset;
            if (index === this.images.length) {
                if (!this.circular) {
                    return this.activeImageIndex;
                }
                index = 0;
            }
            if (index < 0) {
                if (!this.circular) {
                    return this.activeImageIndex;
                }
                index = this.images.length - 1;
            }
            return index;
        };
        ImageGallery.prototype.next = function () {
            this.activeImageIndex = this.getIndex(1);
        };
        ImageGallery.prototype.prev = function () {
            this.activeImageIndex = this.getIndex(-1);
        };
        ImageGallery.prototype.isOnFirstPosition = function () {
            return this.activeImageIndex === 0;
        };
        ImageGallery.prototype.getCurrentIndex = function () {
            return this.activeImageIndex;
        };
        ImageGallery.prototype.getCurrentImage = function () {
            return this.images[this.activeImageIndex];
        };
        return ImageGallery;
    })();
    data.ImageGallery = ImageGallery;
})(data || (data = {}));
//# sourceMappingURL=data.ImageGallery.js.map