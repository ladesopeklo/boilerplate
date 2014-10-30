///<reference path='data.image.ts'/>
var data;
(function (data) {
    var ImageGallery = (function () {
        function ImageGallery(d) {
            var images = d.images || [];
            this.images = [];
            this.name = d.name;
            for (var i = 0; i < images.length; i++) {
                this.images.push(new data.Image(images[i]));
            }
            this.activeImageIndex = 0;
        }
        ImageGallery.prototype.init = function (index) {
            this.activeImageIndex = index;
        };
        ImageGallery.prototype.next = function () {
            this.activeImageIndex++;
            if (this.activeImageIndex === this.images.length) {
                this.activeImageIndex = 0;
            }
        };
        ImageGallery.prototype.prev = function () {
            this.activeImageIndex--;
            if (this.activeImageIndex < 0) {
                this.activeImageIndex = this.images.length - 1;
            }
        };
        ImageGallery.prototype.getImage = function (resolution) {
            return this.images[this.activeImageIndex].getUrl(resolution);
        };
        ImageGallery.prototype.toJson = function () {
        };
        return ImageGallery;
    })();
    data.ImageGallery = ImageGallery;
})(data || (data = {}));
