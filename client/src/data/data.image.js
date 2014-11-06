///<reference path='data.ImageInterface.ts'/>
var data;
(function (_data) {
    var GoogleImage = (function () {
        function GoogleImage(data) {
            this.url = new gData.PhotoUrl(data.u, null, null);
        }
        GoogleImage.prototype.getUrl = function (size) {
            return this.url.get(size || "s130-c");
        };
        GoogleImage.prototype.square = function (size) {
            return this.url.get("s" + size + "-c");
        };
        GoogleImage.prototype.toJson = function () {
        };
        return GoogleImage;
    })();
    _data.GoogleImage = GoogleImage;
})(data || (data = {}));
var gData;
(function (gData) {
    var PhotoUrl = (function () {
        function PhotoUrl(url, width, height) {
            this.width = width || 1920;
            this.height = height || -1;
            this.url = url;
            this.urlParts = this.url.split("/");
            this.placeholderIndex = this.urlParts.length - 2;
        }
        PhotoUrl.prototype.get = function (size) {
            var setSize = size || "s75";
            if (size === -1) {
                setSize = "w" + this.width;
            }
            this.urlParts[this.placeholderIndex] = setSize;
            return this.urlParts.join("/");
        };
        return PhotoUrl;
    })();
    gData.PhotoUrl = PhotoUrl;
})(gData || (gData = {}));
